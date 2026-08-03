import { head } from '@vercel/blob'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'

import { isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { getPortalMembershipAccess, isPhase4Enabled, writePortalAudit } from '@/lib/portal-auth'
import { PORTAL_MAX_UPLOAD_BYTES, validatePortalUpload } from '@/lib/portal-auth-core.mjs'
import { getPortalBlobConfig } from '@/lib/portal-blob-core.mjs'
import { tenantScope } from '@/lib/portal-tenant-core.mjs'

const contentTypes = [
  'application/pdf', 'image/jpeg', 'image/png', 'image/webp',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]

export async function POST(request: Request, context: { params: Promise<{ tenantSlug: string }> }) {
  const portalBlob = getPortalBlobConfig()
  if (!isPhase4Enabled() || !portalBlob) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const { tenantSlug } = await context.params
  try {
    const body = await request.json() as HandleUploadBody
    const response = await handleUpload({
      token: portalBlob.token,
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!isSameOrigin(request)) throw new Error('Invalid origin')
        const access = await getPortalMembershipAccess(tenantSlug, 'UPLOAD')
        if (!access.ok) throw new Error(access.error)
        const { tenant, session } = access
        const limit = await enforceRateLimit(requestFingerprint(request, `portal-upload:${session.user.id}`), 20, 60 * 60_000)
        if (!limit.allowed) throw new Error('Too many uploads')
        if (!pathname.startsWith(`portal/${tenant.slug}/`) || !/^portal\/[a-z0-9-]+\/[a-zA-Z0-9][a-zA-Z0-9._-]{0,180}$/.test(pathname)) throw new Error('Invalid upload path')
        const payload = JSON.parse(clientPayload || '{}')
        const file = validatePortalUpload(payload)
        const projectId = String(payload.projectId || '') || null
        const category = String(payload.category || 'GENERAL').trim().slice(0, 80)
        if (projectId) {
          const prisma = await getPrisma()
          if (!await prisma.portalProject.findFirst({ where: tenantScope(tenant.id, projectId), select: { id: true } })) throw new Error('Project not found')
        }
        return {
          allowedContentTypes: contentTypes,
          maximumSizeInBytes: PORTAL_MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
          allowOverwrite: false,
          tokenPayload: JSON.stringify({ ...file, tenantId: tenant.id, uploaderId: session.user.id, projectId, category }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = JSON.parse(tokenPayload || '{}')
        const file = validatePortalUpload(payload)
        const details = await head(blob.url, { token: portalBlob.token, storeId: portalBlob.storeId })
        const prisma = await getPrisma()
        const document = await prisma.portalDocument.create({ data: {
          tenantId: String(payload.tenantId), uploaderId: String(payload.uploaderId),
          projectId: payload.projectId ? String(payload.projectId) : null,
          name: file.name, pathname: blob.pathname, url: blob.url,
          contentType: details.contentType || file.contentType, sizeBytes: details.size,
          category: String(payload.category || 'GENERAL'), visibility: 'TENANT', status: 'PENDING',
        } })
        await writePortalAudit({ tenantId: document.tenantId, portalUserId: document.uploaderId, action: 'DOCUMENT_UPLOADED', entityType: 'PortalDocument', entityId: document.id, metadata: { category: document.category, sizeBytes: document.sizeBytes } })
      },
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 400 })
  }
}
