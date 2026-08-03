import { NextResponse } from 'next/server'

import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { isPhase4AdminEnabled, writePortalAudit } from '@/lib/portal-auth'

export async function POST(request: Request) {
  if (!isPhase4AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const admin = await getAdminSession()
  if (admin?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `admin-portal-comment:${admin.sub}`), 60, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many comments' }, { status: 429 })
  const body = await request.json()
  const projectId = String(body.projectId || '')
  const text = String(body.body || '').trim().slice(0, 5000)
  const internal = body.internal === true
  if (!projectId || !text) return NextResponse.json({ error: 'Project and comment are required' }, { status: 400 })
  const prisma = await getPrisma()
  const project = await prisma.portalProject.findUnique({ where: { id: projectId } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const comment = await prisma.portalComment.create({ data: { tenantId: project.tenantId, projectId, adminUserId: admin.sub, body: text, internal } })
  await writePortalAudit({ tenantId: project.tenantId, adminUserId: admin.sub, action: internal ? 'INTERNAL_COMMENT_CREATED' : 'COMMENT_CREATED', entityType: 'PortalComment', entityId: comment.id })
  return NextResponse.json(comment, { status: 201 })
}
