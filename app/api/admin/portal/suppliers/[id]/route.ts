import { NextResponse } from 'next/server'

import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { isPhase4AdminEnabled, writePortalAudit } from '@/lib/portal-auth'

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isPhase4AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const admin = await getAdminSession()
  if (admin?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `admin-portal-supplier:${admin.sub}`), 30, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  const prisma = await getPrisma()
  const supplier = await prisma.supplier.findUnique({ where: { id: (await context.params).id } })
  if (!supplier?.portalTenantId) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await request.json()
  const verify = body.verified === true
  const updated = await prisma.supplier.update({ where: { id: supplier.id }, data: { approved: verify, verificationStatus: verify ? 'VERIFIED' : 'REJECTED', verifiedAt: verify ? new Date() : null, verifiedByAdminId: verify ? admin.sub : null } })
  await writePortalAudit({ tenantId: supplier.portalTenantId, adminUserId: admin.sub, action: verify ? 'SUPPLIER_VERIFIED' : 'SUPPLIER_REJECTED', entityType: 'Supplier', entityId: supplier.id })
  return NextResponse.json(updated)
}
