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
  const limit = await enforceRateLimit(requestFingerprint(request, `admin-portal-quote-send:${admin.sub}`), 30, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  const prisma = await getPrisma()
  const quote = await prisma.portalQuotation.findUnique({ where: { id: (await context.params).id } })
  if (!quote) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await request.json()
  if (body.action !== 'SEND' || quote.status !== 'DRAFT') return NextResponse.json({ error: 'Only draft quotations can be sent' }, { status: 400 })
  const validUntil = new Date(body.validUntil)
  if (Number.isNaN(validUntil.getTime()) || validUntil <= new Date()) return NextResponse.json({ error: 'Future validity date required' }, { status: 400 })
  const updated = await prisma.portalQuotation.update({ where: { id: quote.id }, data: { status: 'SENT', sentAt: new Date(), validUntil } })
  await writePortalAudit({ tenantId: quote.tenantId, adminUserId: admin.sub, action: 'QUOTATION_SENT', entityType: 'PortalQuotation', entityId: quote.id })
  return NextResponse.json(updated)
}
