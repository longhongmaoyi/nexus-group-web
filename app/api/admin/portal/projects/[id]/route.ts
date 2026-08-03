import type { PortalProjectStatus } from '@prisma/client'
import { NextResponse } from 'next/server'

import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { isPhase4AdminEnabled, writePortalAudit } from '@/lib/portal-auth'

const statuses = new Set<PortalProjectStatus>(['INTAKE', 'PLANNING', 'QUOTING', 'APPROVAL', 'DELIVERY', 'COMPLETED', 'ON_HOLD'])

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isPhase4AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const admin = await getAdminSession()
  if (admin?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `admin-portal-project:${admin.sub}`), 60, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  const body = await request.json()
  const status = String(body.status || '') as PortalProjectStatus
  if (!statuses.has(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  const prisma = await getPrisma()
  const project = await prisma.portalProject.findUnique({ where: { id: (await context.params).id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const updated = await prisma.portalProject.update({ where: { id: project.id }, data: { status } })
  await writePortalAudit({ tenantId: project.tenantId, adminUserId: admin.sub, action: 'PROJECT_STATUS_CHANGED', entityType: 'PortalProject', entityId: project.id, metadata: { from: project.status, to: status } })
  return NextResponse.json(updated)
}
