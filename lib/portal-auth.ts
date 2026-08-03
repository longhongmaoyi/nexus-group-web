import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { PortalMembershipRole, PortalTokenKind } from '@prisma/client'

import { hashPassword, verifyPassword } from '@/lib/auth-core.mjs'
import { asJson } from '@/lib/cms'
import { getPrisma } from '@/lib/prisma'
import {
  canPortal,
  createOpaqueToken,
  hashOpaqueToken,
  isActivePortalSession,
  isUsablePortalToken,
  validatePortalPassword,
} from '@/lib/portal-auth-core.mjs'

export const PORTAL_COOKIE = 'nexus_portal_session'
const SESSION_MS = 12 * 60 * 60 * 1000

export const isPhase4Enabled = () => process.env.PHASE4_PORTALS_ENABLED === 'true'
export const isPhase4AdminEnabled = () => process.env.PHASE4_PORTAL_ADMIN_ENABLED === 'true'

export async function authenticatePortalUser(email: string, password: string) {
  const prisma = await getPrisma()
  const user = await prisma.portalUser.findUnique({ where: { email } })
  if (!user || user.status !== 'ACTIVE' || !verifyPassword(password, user.passwordHash)) return null
  return user
}

export async function createPortalSession(userId: string) {
  const prisma = await getPrisma()
  const token = createOpaqueToken()
  const expiresAt = new Date(Date.now() + SESSION_MS)
  await prisma.portalSession.create({ data: { userId, tokenHash: hashOpaqueToken(token), expiresAt } })
  const cookieStore = await cookies()
  cookieStore.set(PORTAL_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  })
}

export async function getPortalSession() {
  if (!isPhase4Enabled()) return null
  const token = (await cookies()).get(PORTAL_COOKIE)?.value
  if (!token) return null
  const prisma = await getPrisma()
  const session = await prisma.portalSession.findUnique({
    where: { tokenHash: hashOpaqueToken(token) },
    include: {
      user: {
        include: {
          memberships: { where: { active: true }, include: { tenant: true } },
        },
      },
    },
  })
  return isActivePortalSession(session) ? session : null
}

export async function requirePortalSession(locale = 'en') {
  const session = await getPortalSession()
  if (!session) redirect(`/${locale}/portal/login`)
  return session
}

export async function getPortalMembershipAccess(tenantSlug: string, action: string) {
  const session = await getPortalSession()
  if (!session) return { ok: false as const, status: 401 as const, error: 'Unauthorized' }
  const membership = session.user.memberships.find((value) => value.tenant.slug === tenantSlug && value.tenant.active)
  if (!membership || !canPortal(membership.role, action, membership.tenant.type)) {
    return { ok: false as const, status: 403 as const, error: 'Forbidden' }
  }
  return { ok: true as const, session, membership, tenant: membership.tenant }
}

export async function requirePortalMembership(tenantSlug: string, action: string, locale = 'en') {
  const access = await getPortalMembershipAccess(tenantSlug, action)
  if (!access.ok) {
    if (access.status === 401) redirect(`/${locale}/portal/login`)
    redirect(`/${locale}/portal`)
  }
  return access
}

export async function revokePortalSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(PORTAL_COOKIE)?.value
  if (token) {
    const prisma = await getPrisma()
    await prisma.portalSession.updateMany({
      where: { tokenHash: hashOpaqueToken(token), revokedAt: null },
      data: { revokedAt: new Date() },
    })
  }
  cookieStore.set(PORTAL_COOKIE, '', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', expires: new Date(0) })
}

export async function issuePortalAuthToken(userId: string, kind: PortalTokenKind) {
  const prisma = await getPrisma()
  const rawToken = createOpaqueToken()
  const expiresAt = new Date(Date.now() + (kind === 'PASSWORD_RESET' ? 60 : 24 * 60) * 60_000)
  const record = await prisma.$transaction(async (tx) => {
    await tx.portalAuthToken.updateMany({ where: { userId, kind, usedAt: null }, data: { usedAt: new Date() } })
    return tx.portalAuthToken.create({ data: { userId, kind, tokenHash: hashOpaqueToken(rawToken), expiresAt } })
  })
  return { rawToken, record }
}

export async function queuePortalAccessEmail(input: { userId: string; email: string; locale: string; purpose: 'INVITE' | 'RESET' }) {
  const prisma = await getPrisma()
  const { rawToken, record } = await issuePortalAuthToken(input.userId, 'PASSWORD_RESET')
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nexuslife.ca'
  const locale = ['en', 'zh', 'fr'].includes(input.locale) ? input.locale : 'en'
  const link = `${base}/${locale}/portal/reset?token=${encodeURIComponent(rawToken)}`
  const subjects = {
    en: input.purpose === 'INVITE' ? 'Set up your NEXUS portal account' : 'Reset your NEXUS portal password',
    zh: input.purpose === 'INVITE' ? '设置您的 NEXUS 门户账户' : '重置您的 NEXUS 门户密码',
    fr: input.purpose === 'INVITE' ? 'Configurez votre compte portail NEXUS' : 'Réinitialisez votre mot de passe NEXUS',
  }
  const subject = subjects[locale as keyof typeof subjects]
  await prisma.emailOutbox.create({ data: {
    dedupeKey: `portal:${record.id}:${input.purpose.toLowerCase()}`,
    templateKey: `PORTAL_${input.purpose}_V1`, locale, recipient: input.email, subject,
    textBody: `${subject}\n\n${link}\n\nThis single-use link expires in 60 minutes.`,
    htmlBody: `<p>${subject}</p><p><a href="${link}">Continue securely</a></p><p>This single-use link expires in 60 minutes.</p>`,
  } })
}

export async function consumeVerificationToken(rawToken: string) {
  const prisma = await getPrisma()
  return prisma.$transaction(async (tx) => {
    const record = await tx.portalAuthToken.findUnique({ where: { tokenHash: hashOpaqueToken(rawToken) }, include: { user: true } })
    if (!isUsablePortalToken(record, 'EMAIL_VERIFICATION') || record?.user.status === 'SUSPENDED') throw new Error('Verification link is invalid or expired.')
    await tx.portalAuthToken.update({ where: { id: record.id }, data: { usedAt: new Date() } })
    return tx.portalUser.update({ where: { id: record.userId }, data: { status: 'ACTIVE', emailVerifiedAt: new Date() } })
  })
}

export async function resetPortalPassword(rawToken: string, password: string) {
  const prisma = await getPrisma()
  return prisma.$transaction(async (tx) => {
    const record = await tx.portalAuthToken.findUnique({ where: { tokenHash: hashOpaqueToken(rawToken) }, include: { user: true } })
    if (!isUsablePortalToken(record, 'PASSWORD_RESET') || record?.user.status === 'SUSPENDED') throw new Error('Reset link is invalid or expired.')
    const passwordHash = hashPassword(validatePortalPassword(password))
    await tx.portalAuthToken.update({ where: { id: record.id }, data: { usedAt: new Date() } })
    await tx.portalSession.updateMany({ where: { userId: record.userId, revokedAt: null }, data: { revokedAt: new Date() } })
    return tx.portalUser.update({ where: { id: record.userId }, data: { passwordHash, status: 'ACTIVE', emailVerifiedAt: new Date() } })
  })
}

export async function writePortalAudit(input: {
  tenantId: string
  portalUserId?: string | null
  adminUserId?: string | null
  action: string
  entityType: string
  entityId?: string | null
  metadata?: Record<string, unknown>
}) {
  const prisma = await getPrisma()
  return prisma.portalAuditEvent.create({ data: {
    tenantId: input.tenantId,
    portalUserId: input.portalUserId || null,
    adminUserId: input.adminUserId || null,
    action: input.action.slice(0, 120),
    entityType: input.entityType.slice(0, 80),
    entityId: input.entityId?.slice(0, 120) || null,
    metadata: input.metadata ? asJson(input.metadata) : undefined,
  } })
}

export function roleAllows(role: PortalMembershipRole, action: string, tenantType: string) {
  return canPortal(role, action, tenantType)
}
