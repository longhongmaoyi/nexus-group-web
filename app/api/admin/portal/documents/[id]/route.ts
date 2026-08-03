import type { PortalDocumentStatus } from '@prisma/client'
import { NextResponse } from 'next/server'

import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { isPhase4AdminEnabled, writePortalAudit } from '@/lib/portal-auth'

const statuses = new Set<PortalDocumentStatus>(['VERIFIED', 'REJECTED', 'ARCHIVED'])

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isPhase4AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const admin = await getAdminSession()
  if (admin?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `admin-portal-document:${admin.sub}`), 60, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  const body = await request.json()
  const status = String(body.status || '') as PortalDocumentStatus
  if (!statuses.has(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  const prisma = await getPrisma()
  const document = await prisma.portalDocument.findUnique({ where: { id: (await context.params).id }, include: { tenant: { include: { supplier: true } } } })
  if (!document) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const publish = body.publish === true
  if (publish && (status !== 'VERIFIED' || document.tenant.type !== 'SUPPLIER' || document.tenant.supplier?.verificationStatus !== 'VERIFIED' || !document.tenant.supplier.approved)) {
    return NextResponse.json({ error: 'Only verified documents from verified suppliers can enter the library' }, { status: 400 })
  }
  const supplierId = document.tenant.supplier?.id || null
  const productId = body.productId ? String(body.productId) : null
  if (productId && !await prisma.product.findUnique({ where: { id: productId }, select: { id: true } })) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  const updated = await prisma.portalDocument.update({ where: { id: document.id }, data: {
    status, verifiedByAdminId: status === 'VERIFIED' ? admin.sub : null, verifiedAt: status === 'VERIFIED' ? new Date() : null,
    supplierId, productId, visibility: publish ? 'SHARED' : document.visibility,
    libraryPublishedAt: publish ? new Date() : null,
  } })
  await writePortalAudit({ tenantId: document.tenantId, adminUserId: admin.sub, action: publish ? 'DOCUMENT_LIBRARY_PUBLISHED' : `DOCUMENT_${status}`, entityType: 'PortalDocument', entityId: document.id, metadata: { supplierId, productId } })
  return NextResponse.json(updated)
}
