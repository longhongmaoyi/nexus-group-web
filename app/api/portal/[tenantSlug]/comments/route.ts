import { NextResponse } from 'next/server'
import { isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { getPortalMembershipAccess, isPhase4Enabled, writePortalAudit } from '@/lib/portal-auth'
import { tenantScope, validatePortalCommentInput } from '@/lib/portal-tenant-core.mjs'

export async function POST(request: Request, context: { params: Promise<{ tenantSlug: string }> }) {
  if (!isPhase4Enabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const { tenantSlug } = await context.params
  const access = await getPortalMembershipAccess(tenantSlug, 'COMMENT')
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status })
  const { tenant, session } = access
  const limit = await enforceRateLimit(requestFingerprint(request, `portal-comment:${session.user.id}`), 30, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many comments' }, { status: 429 })
  try {
    const input = validatePortalCommentInput(await request.json())
    const prisma = await getPrisma()
    if (input.projectId) {
      const project = await prisma.portalProject.findFirst({ where: tenantScope(tenant.id, input.projectId), select: { id: true } })
      if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    if (input.quotationId) {
      const quote = await prisma.portalQuotation.findFirst({ where: tenantScope(tenant.id, input.quotationId), select: { id: true } })
      if (!quote) return NextResponse.json({ error: 'Quotation not found' }, { status: 404 })
    }
    const comment = await prisma.portalComment.create({ data: { tenantId: tenant.id, portalUserId: session.user.id, ...input } })
    await writePortalAudit({ tenantId: tenant.id, portalUserId: session.user.id, action: 'COMMENT_CREATED', entityType: 'PortalComment', entityId: comment.id })
    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Comment failed' }, { status: 400 })
  }
}
