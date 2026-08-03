import { get } from '@vercel/blob'
import { NextResponse } from 'next/server'

import { getPrisma } from '@/lib/prisma'
import { getPortalMembershipAccess, isPhase4Enabled, writePortalAudit } from '@/lib/portal-auth'
import { tenantScope } from '@/lib/portal-tenant-core.mjs'

export async function GET(_: Request, context: { params: Promise<{ tenantSlug: string; id: string }> }) {
  if (!isPhase4Enabled() || !process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const { tenantSlug, id } = await context.params
  const access = await getPortalMembershipAccess(tenantSlug, 'READ')
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status })

  const prisma = await getPrisma()
  const document = await prisma.portalDocument.findFirst({
    where: { ...tenantScope(access.tenant.id, id), visibility: { not: 'NEXUS_ONLY' }, status: { not: 'ARCHIVED' } },
    select: { id: true, tenantId: true, pathname: true, name: true },
  })
  if (!document) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const blob = await get(document.pathname, { access: 'private' })
  if (!blob || blob.statusCode !== 200) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await writePortalAudit({ tenantId: document.tenantId, portalUserId: access.session.user.id, action: 'DOCUMENT_DOWNLOADED', entityType: 'PortalDocument', entityId: document.id })
  const encodedName = encodeURIComponent(document.name).replace(/'/g, '%27')
  return new Response(blob.stream, {
    headers: {
      'content-type': blob.blob.contentType,
      'content-length': String(blob.blob.size),
      'content-disposition': `attachment; filename*=UTF-8''${encodedName}`,
      'cache-control': 'private, no-store',
      'x-content-type-options': 'nosniff',
    },
  })
}
