import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { hashPassword } from '@/lib/auth-core.mjs'
import { getPrisma } from '@/lib/prisma'
import { createOpaqueToken, normalizePortalEmail } from '@/lib/portal-auth-core.mjs'
import { isPhase4AdminEnabled, queuePortalAccessEmail } from '@/lib/portal-auth'

async function authorized() {
  const session = await getAdminSession()
  return session?.role === 'ADMIN' ? session : null
}

export async function GET() {
  if (!isPhase4AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!await authorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const prisma = await getPrisma()
  return NextResponse.json(await prisma.portalTenant.findMany({ include: { memberships: { include: { user: { select: { id: true, email: true, name: true, status: true } } } }, _count: { select: { projects: true, documents: true, quotations: true } } }, orderBy: { createdAt: 'desc' } }))
}

export async function POST(request: Request) {
  if (!isPhase4AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const admin = await authorized()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `admin-portal-tenant:${admin.sub}`), 20, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  try {
    const body = await request.json()
    const name = String(body.name || '').trim().slice(0, 180)
    const slug = String(body.slug || '').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
    const type = body.type === 'SUPPLIER' ? 'SUPPLIER' : 'CLIENT'
    const email = normalizePortalEmail(body.email)
    const userName = String(body.userName || '').trim().slice(0, 180)
    const locale = ['en', 'zh', 'fr'].includes(body.locale) ? body.locale : 'en'
    if (!name || !slug || !userName) throw new Error('Tenant, slug and owner name are required.')
    const prisma = await getPrisma()
    const result = await prisma.$transaction(async (tx) => {
      const tenant = await tx.portalTenant.create({ data: { name, slug, type } })
      const user = await tx.portalUser.upsert({ where: { email }, create: { email, name: userName, locale, passwordHash: hashPassword(createOpaqueToken()) }, update: {} })
      await tx.portalMembership.create({ data: { tenantId: tenant.id, userId: user.id, role: 'OWNER' } })
      if (type === 'SUPPLIER') {
        await tx.supplier.create({ data: { companyName: name, email, contactName: userName, portalTenantId: tenant.id } })
      }
      await tx.portalAuditEvent.create({ data: { tenantId: tenant.id, adminUserId: admin.sub, action: 'TENANT_CREATED', entityType: 'PortalTenant', entityId: tenant.id } })
      return { tenant, user }
    })
    await queuePortalAccessEmail({ userId: result.user.id, email, locale, purpose: 'INVITE' })
    return NextResponse.json({ tenant: result.tenant, invited: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Tenant creation failed' }, { status: 400 })
  }
}
