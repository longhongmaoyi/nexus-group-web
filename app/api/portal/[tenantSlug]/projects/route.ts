import { NextResponse } from 'next/server'
import { isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { getPortalMembershipAccess, isPhase4Enabled, writePortalAudit } from '@/lib/portal-auth'
import { validatePortalProjectInput } from '@/lib/portal-tenant-core.mjs'

export async function POST(request: Request, context: { params: Promise<{ tenantSlug: string }> }) {
  if (!isPhase4Enabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const { tenantSlug } = await context.params
  const access = await getPortalMembershipAccess(tenantSlug, 'COMMENT')
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status })
  const { tenant, session } = access
  const limit = await enforceRateLimit(requestFingerprint(request, `portal-project:${session.user.id}`), 10, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  try {
    const input = validatePortalProjectInput(await request.json())
    const prisma = await getPrisma()
    const project = await prisma.portalProject.create({ data: { tenantId: tenant.id, reference: `PX-${Date.now().toString(36).toUpperCase()}`, ...input } })
    await writePortalAudit({ tenantId: tenant.id, portalUserId: session.user.id, action: 'PROJECT_CREATED', entityType: 'PortalProject', entityId: project.id })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Project creation failed' }, { status: 400 })
  }
}
