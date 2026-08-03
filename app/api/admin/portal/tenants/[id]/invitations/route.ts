import type { PortalMembershipRole } from '@prisma/client'
import { NextResponse } from 'next/server'

import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { hashPassword } from '@/lib/auth-core.mjs'
import { getPrisma } from '@/lib/prisma'
import { createOpaqueToken, normalizePortalEmail } from '@/lib/portal-auth-core.mjs'
import { isPhase4AdminEnabled, queuePortalAccessEmail } from '@/lib/portal-auth'

const roles = new Set<PortalMembershipRole>(['OWNER', 'MANAGER', 'MEMBER', 'VIEWER'])

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isPhase4AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const admin = await getAdminSession()
  if (admin?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `admin-portal-invite:${admin.sub}`), 30, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many invitations' }, { status: 429 })
  try {
    const { id } = await context.params
    const body = await request.json()
    const email = normalizePortalEmail(body.email)
    const name = String(body.name || '').trim().slice(0, 180)
    const role = String(body.role || 'MEMBER') as PortalMembershipRole
    const locale = ['en', 'zh', 'fr'].includes(body.locale) ? body.locale : 'en'
    if (!name || !roles.has(role)) throw new Error('Name and valid role are required.')
    const prisma = await getPrisma()
    const result = await prisma.$transaction(async (tx) => {
      const tenant = await tx.portalTenant.findUnique({ where: { id } })
      if (!tenant || !tenant.active) throw new Error('Tenant not found.')
      const user = await tx.portalUser.upsert({ where: { email }, create: { email, name, locale, passwordHash: hashPassword(createOpaqueToken()) }, update: {} })
      const membership = await tx.portalMembership.upsert({ where: { tenantId_userId: { tenantId: id, userId: user.id } }, create: { tenantId: id, userId: user.id, role }, update: { role, active: true } })
      await tx.portalAuditEvent.create({ data: { tenantId: id, adminUserId: admin.sub, action: 'MEMBER_INVITED', entityType: 'PortalMembership', entityId: membership.id, metadata: { role, email } } })
      return { user }
    })
    await queuePortalAccessEmail({ userId: result.user.id, email, locale, purpose: 'INVITE' })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invitation failed' }, { status: 400 })
  }
}
