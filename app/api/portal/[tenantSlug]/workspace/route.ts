import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import { getPortalMembershipAccess, isPhase4Enabled } from '@/lib/portal-auth'

export async function GET(_: Request, context: { params: Promise<{ tenantSlug: string }> }) {
  if (!isPhase4Enabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const { tenantSlug } = await context.params
  const access = await getPortalMembershipAccess(tenantSlug, 'READ')
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status })
  const { tenant, membership } = access
  const prisma = await getPrisma()
  const [projects, documents, quotations, comments] = await Promise.all([
    prisma.portalProject.findMany({ where: { tenantId: tenant.id }, orderBy: { updatedAt: 'desc' } }),
    prisma.portalDocument.findMany({
      where: { tenantId: tenant.id, visibility: { not: 'NEXUS_ONLY' }, status: { not: 'ARCHIVED' } },
      select: { id: true, projectId: true, name: true, contentType: true, sizeBytes: true, category: true, visibility: true, status: true, verifiedAt: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    }),
    tenant.type === 'CLIENT' ? prisma.portalQuotation.findMany({ where: { tenantId: tenant.id, status: { not: 'DRAFT' } }, orderBy: [{ number: 'desc' }, { version: 'desc' }], include: { decisions: { orderBy: { createdAt: 'desc' } } } }) : Promise.resolve([]),
    prisma.portalComment.findMany({ where: { tenantId: tenant.id, internal: false }, orderBy: { createdAt: 'desc' }, take: 100 }),
  ])
  return NextResponse.json({ tenant, membership: { id: membership.id, role: membership.role }, projects, documents, quotations, comments })
}
