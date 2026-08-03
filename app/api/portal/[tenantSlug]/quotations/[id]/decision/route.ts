import { NextResponse } from 'next/server'
import { isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { getPortalMembershipAccess, isPhase4Enabled, writePortalAudit } from '@/lib/portal-auth'
import { tenantScope, validateQuoteDecision } from '@/lib/portal-tenant-core.mjs'

export async function POST(request: Request, context: { params: Promise<{ tenantSlug: string; id: string }> }) {
  if (!isPhase4Enabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const { tenantSlug, id } = await context.params
  const access = await getPortalMembershipAccess(tenantSlug, 'APPROVE_QUOTE')
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status })
  const { tenant, membership, session } = access
  const limit = await enforceRateLimit(requestFingerprint(request, `portal-quote-decision:${session.user.id}`), 10, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many decisions' }, { status: 429 })
  try {
    const input = validateQuoteDecision(await request.json())
    const prisma = await getPrisma()
    const quote = await prisma.portalQuotation.findFirst({ where: { ...tenantScope(tenant.id, id), status: 'SENT', validUntil: { gt: new Date() } } })
    if (!quote) return NextResponse.json({ error: 'Quotation is unavailable or expired' }, { status: 404 })
    const result = await prisma.$transaction(async (tx) => {
      const claimed = await tx.portalQuotation.updateMany({
        where: { id: quote.id, tenantId: tenant.id, status: 'SENT', validUntil: { gt: new Date() } },
        data: { status: input.decision },
      })
      if (claimed.count !== 1) throw new Error('Quotation was already decided.')
      return tx.portalQuoteDecision.create({ data: { quotationId: quote.id, membershipId: membership.id, ...input } })
    })
    await writePortalAudit({ tenantId: tenant.id, portalUserId: session.user.id, action: `QUOTATION_${input.decision}`, entityType: 'PortalQuotation', entityId: quote.id })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Decision failed' }, { status: 400 })
  }
}
