import { NextResponse } from 'next/server'

import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { asJson } from '@/lib/cms'
import { getPrisma } from '@/lib/prisma'
import { isPhase4AdminEnabled, writePortalAudit } from '@/lib/portal-auth'

export async function POST(request: Request) {
  if (!isPhase4AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const admin = await getAdminSession()
  if (admin?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `admin-portal-quote:${admin.sub}`), 30, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  try {
    const body = await request.json()
    const tenantId = String(body.tenantId || '')
    const projectId = String(body.projectId || '')
    const title = String(body.title || '').trim().slice(0, 180)
    const currency = String(body.currency || 'CAD').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3)
    const total = Number(body.totalAmount)
    const send = body.send === true
    const validUntil = body.validUntil ? new Date(body.validUntil) : null
    if (!tenantId || !projectId || title.length < 3 || !currency || !Number.isFinite(total) || total < 0) throw new Error('Complete quotation details are required.')
    if (send && (!validUntil || validUntil <= new Date())) throw new Error('Sent quotations require a future validity date.')
    const prisma = await getPrisma()
    const project = await prisma.portalProject.findFirst({ where: { id: projectId, tenantId }, include: { tenant: true } })
    if (!project || project.tenant.type !== 'CLIENT') throw new Error('Client project not found.')
    const number = String(body.number || `Q-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`).trim().slice(0, 80)
    const latest = await prisma.portalQuotation.findFirst({ where: { tenantId, number }, orderBy: { version: 'desc' }, select: { version: true } })
    const quote = await prisma.portalQuotation.create({ data: {
      tenantId, projectId, createdByAdminId: admin.sub, number, version: (latest?.version || 0) + 1,
      title, currency, totalAmount: total.toFixed(2),
      lineItems: asJson([{ description: title, amount: total }]),
      assumptions: body.assumptions ? asJson({ text: String(body.assumptions).slice(0, 5000) }) : undefined,
      exclusions: body.exclusions ? asJson({ text: String(body.exclusions).slice(0, 5000) }) : undefined,
      status: send ? 'SENT' : 'DRAFT', validUntil, sentAt: send ? new Date() : null,
    } })
    await writePortalAudit({ tenantId, adminUserId: admin.sub, action: send ? 'QUOTATION_SENT' : 'QUOTATION_DRAFTED', entityType: 'PortalQuotation', entityId: quote.id, metadata: { number, version: quote.version } })
    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Quotation failed' }, { status: 400 })
  }
}
