import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { PrismaClient } from '@prisma/client'

import { hashPassword } from '../lib/auth-core.mjs'
import { hashOpaqueToken } from '../lib/portal-auth-core.mjs'

const base = process.env.PHASE4_TEST_BASE_URL || 'http://localhost:3104'
const origin = new URL(base).origin
const prisma = new PrismaClient()
const tag = `phase4-${Date.now()}-${randomBytes(3).toString('hex')}`
const password = 'SecurePortal2026'
const adminPassword = 'SecureAdminPortal2026'
const created = { tenantIds: [], userIds: [], supplierIds: [], adminId: '', rateKeysBefore: new Set(), emails: [] }

async function call(path, options, status) {
  const response = await fetch(new URL(path, base), options)
  assert.equal(response.status, status, `${path} returned ${response.status}: ${await response.clone().text()}`)
  return response
}
async function login(email, suppliedPassword = password, ip = email) {
  const response = await call('/api/portal/auth/login', { method: 'POST', headers: { origin, 'content-type': 'application/json', 'x-forwarded-for': ip }, body: JSON.stringify({ email, password: suppliedPassword }) }, 200)
  const cookie = response.headers.get('set-cookie')?.split(';')[0]
  assert.ok(cookie?.startsWith('nexus_portal_session='))
  assert.match(response.headers.get('set-cookie') || '', /HttpOnly/i)
  assert.match(response.headers.get('set-cookie') || '', /SameSite=Strict/i)
  return cookie
}

async function seed() {
  created.rateKeysBefore = new Set((await prisma.rateLimitBucket.findMany({ select: { key: true } })).map(x => x.key))
  const adminEmail = `${tag}-admin@example.test`; created.emails.push(adminEmail)
  const admin = await prisma.adminUser.create({ data: { email: adminEmail, name: 'Phase 4 Admin', role: 'ADMIN', passwordHash: hashPassword(adminPassword) } })
  created.adminId = admin.id
  const clientA = await prisma.portalTenant.create({ data: { slug: `${tag}-client-a`, name: 'Phase 4 Client A', type: 'CLIENT' } })
  const clientB = await prisma.portalTenant.create({ data: { slug: `${tag}-client-b`, name: 'Phase 4 Client B', type: 'CLIENT' } })
  const supplierTenant = await prisma.portalTenant.create({ data: { slug: `${tag}-supplier`, name: 'Phase 4 Supplier', type: 'SUPPLIER' } })
  created.tenantIds.push(clientA.id, clientB.id, supplierTenant.id)
  const users = await Promise.all([
    ['manager', 'ACTIVE'], ['viewer', 'ACTIVE'], ['supplier', 'ACTIVE'], ['pending', 'PENDING_VERIFICATION'],
  ].map(async ([kind, status]) => {
    const email = `${tag}-${kind}@example.test`; created.emails.push(email)
    return prisma.portalUser.create({ data: { email, name: `Phase 4 ${kind}`, status, emailVerifiedAt: status === 'ACTIVE' ? new Date() : null, passwordHash: hashPassword(password) } })
  }))
  const [manager, viewer, supplierUser, pending] = users; created.userIds.push(...users.map(u => u.id))
  await prisma.portalMembership.createMany({ data: [
    { tenantId: clientA.id, userId: manager.id, role: 'MANAGER' }, { tenantId: clientA.id, userId: viewer.id, role: 'VIEWER' },
    { tenantId: supplierTenant.id, userId: supplierUser.id, role: 'OWNER' }, { tenantId: clientB.id, userId: pending.id, role: 'MEMBER' },
  ] })
  const projectA = await prisma.portalProject.create({ data: { tenantId: clientA.id, reference: `${tag}-PA`, title: 'Client A Project', description: 'Tenant boundary test' } })
  const projectB = await prisma.portalProject.create({ data: { tenantId: clientB.id, reference: `${tag}-PB`, title: 'Client B Project' } })
  const quote = await prisma.portalQuotation.create({ data: { tenantId: clientA.id, projectId: projectA.id, createdByAdminId: admin.id, number: `${tag}-Q`, version: 1, title: 'Safe local quotation', currency: 'CAD', totalAmount: '1000.00', lineItems: [{ description: 'Test', amount: 1000 }], status: 'SENT', sentAt: new Date(), validUntil: new Date(Date.now() + 86_400_000) } })
  const supplier = await prisma.supplier.create({ data: { companyName: 'Phase 4 Supplier', email: supplierUser.email, portalTenantId: supplierTenant.id } }); created.supplierIds.push(supplier.id)
  const document = await prisma.portalDocument.create({ data: { tenantId: supplierTenant.id, uploaderId: supplierUser.id, supplierId: supplier.id, name: 'phase4-test.pdf', pathname: `${tag}/phase4-test.pdf`, url: `https://example.test/${tag}/phase4-test.pdf`, contentType: 'application/pdf', sizeBytes: 128, category: 'CERTIFICATION' } })
  const rawVerification = randomBytes(32).toString('base64url')
  await prisma.portalAuthToken.create({ data: { userId: pending.id, kind: 'EMAIL_VERIFICATION', tokenHash: hashOpaqueToken(rawVerification), expiresAt: new Date(Date.now() + 3_600_000) } })
  return { admin, clientA, clientB, supplierTenant, manager, viewer, supplierUser, pending, projectA, projectB, quote, supplier, document, rawVerification }
}

async function cleanup() {
  if (!created.tenantIds.length) return
  await prisma.portalQuoteDecision.deleteMany({ where: { quotation: { tenantId: { in: created.tenantIds } } } })
  await prisma.portalComment.deleteMany({ where: { tenantId: { in: created.tenantIds } } })
  await prisma.portalAuditEvent.deleteMany({ where: { tenantId: { in: created.tenantIds } } })
  await prisma.portalDocument.deleteMany({ where: { tenantId: { in: created.tenantIds } } })
  await prisma.portalQuotation.deleteMany({ where: { tenantId: { in: created.tenantIds } } })
  await prisma.portalProject.deleteMany({ where: { tenantId: { in: created.tenantIds } } })
  await prisma.supplier.deleteMany({ where: { id: { in: created.supplierIds } } })
  await prisma.portalMembership.deleteMany({ where: { tenantId: { in: created.tenantIds } } })
  await prisma.portalSession.deleteMany({ where: { userId: { in: created.userIds } } })
  await prisma.portalAuthToken.deleteMany({ where: { userId: { in: created.userIds } } })
  await prisma.portalUser.deleteMany({ where: { id: { in: created.userIds } } })
  await prisma.portalTenant.deleteMany({ where: { id: { in: created.tenantIds } } })
  await prisma.emailOutbox.deleteMany({ where: { recipient: { in: created.emails } } })
  await prisma.auditLog.deleteMany({ where: { OR: [{ actorAdminId: created.adminId }, { entityId: created.adminId }] } })
  if (created.adminId) await prisma.adminUser.deleteMany({ where: { id: created.adminId } })
  const newRateKeys = (await prisma.rateLimitBucket.findMany({ select: { key: true } })).map(x => x.key).filter(key => !created.rateKeysBefore.has(key))
  if (newRateKeys.length) await prisma.rateLimitBucket.deleteMany({ where: { key: { in: newRateKeys } } })
}

async function main() {
  const f = await seed()
  const managerCookie = await login(f.manager.email, password, '10.40.0.1')
  const auth = { cookie: managerCookie }
  for (const locale of ['en', 'zh', 'fr']) await call(`/${locale}/portal/${f.clientA.slug}`, { headers: auth }, 200)
  const workspace = await call(`/api/portal/${f.clientA.slug}/workspace`, { headers: auth }, 200).then(r => r.json())
  assert.equal(workspace.tenant.id, f.clientA.id)
  assert.equal(workspace.documents.some(d => 'url' in d || 'pathname' in d), false, 'Storage URL leaked from workspace response')
  await call(`/api/portal/${f.clientB.slug}/workspace`, { headers: auth }, 403)
  await call(`/api/portal/${f.clientA.slug}/projects`, { method: 'POST', headers: { ...auth, origin: 'https://evil.example', 'content-type': 'application/json' }, body: JSON.stringify({ title: 'Blocked origin' }) }, 403)
  const project = await call(`/api/portal/${f.clientA.slug}/projects`, { method: 'POST', headers: { ...auth, origin, 'content-type': 'application/json' }, body: JSON.stringify({ title: 'Manager-created project', description: 'Local integration check' }) }, 201).then(r => r.json())
  await call(`/api/portal/${f.clientA.slug}/comments`, { method: 'POST', headers: { ...auth, origin, 'content-type': 'application/json' }, body: JSON.stringify({ projectId: project.id, body: 'Manager-visible update' }) }, 201)
  await call(`/api/portal/${f.clientA.slug}/quotations/${f.quote.id}/decision`, { method: 'POST', headers: { ...auth, origin, 'content-type': 'application/json' }, body: JSON.stringify({ decision: 'APPROVED', comment: 'Approved locally' }) }, 200)

  const viewerCookie = await login(f.viewer.email, password, '10.40.0.2')
  await call(`/api/portal/${f.clientA.slug}/projects`, { method: 'POST', headers: { cookie: viewerCookie, origin, 'content-type': 'application/json' }, body: JSON.stringify({ title: 'Viewer must not create' }) }, 403)
  const supplierCookie = await login(f.supplierUser.email, password, '10.40.0.3')
  await call(`/api/portal/${f.supplierTenant.slug}/quotations/${f.quote.id}/decision`, { method: 'POST', headers: { cookie: supplierCookie, origin, 'content-type': 'application/json' }, body: JSON.stringify({ decision: 'APPROVED' }) }, 403)

  await call('/api/portal/auth/verify', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify({ token: f.rawVerification }) }, 200)
  await call('/api/portal/auth/verify', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify({ token: f.rawVerification }) }, 400)
  await call('/api/portal/auth/request-reset', { method: 'POST', headers: { origin, 'content-type': 'application/json', 'x-forwarded-for': '10.40.0.4' }, body: JSON.stringify({ email: f.manager.email }) }, 200)
  await call('/api/portal/auth/request-reset', { method: 'POST', headers: { origin, 'content-type': 'application/json', 'x-forwarded-for': '10.40.0.5' }, body: JSON.stringify({ email: `${tag}-unknown@example.test` }) }, 200)
  const resetMessage = await prisma.emailOutbox.findFirstOrThrow({ where: { recipient: f.manager.email, templateKey: 'PORTAL_RESET_V1' }, orderBy: { createdAt: 'desc' } })
  const resetToken = new URL(resetMessage.textBody.match(/https?:\/\/\S+/)?.[0] || '').searchParams.get('token')
  assert.ok(resetToken)
  const newPassword = 'UpdatedPortal2026'
  await call('/api/portal/auth/reset', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify({ token: resetToken, password: newPassword }) }, 200)
  await call('/api/portal/auth/reset', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify({ token: resetToken, password: newPassword }) }, 400)
  auth.cookie = await login(f.manager.email, newPassword, '10.40.0.6')

  const adminLogin = await call('/api/admin/login', { method: 'POST', headers: { origin, 'content-type': 'application/json', 'x-forwarded-for': '10.40.0.7' }, body: JSON.stringify({ email: f.admin.email, password: adminPassword }) }, 200)
  const adminCookie = adminLogin.headers.get('set-cookie')?.split(';')[0]; assert.ok(adminCookie)
  const adminHeaders = { cookie: adminCookie, origin, 'content-type': 'application/json' }
  await call('/api/admin/portal/overview', { headers: { cookie: adminCookie } }, 200)
  await call(`/api/admin/portal/projects/${f.projectA.id}`, { method: 'PATCH', headers: adminHeaders, body: JSON.stringify({ status: 'DELIVERY' }) }, 200)
  await call('/api/admin/portal/comments', { method: 'POST', headers: adminHeaders, body: JSON.stringify({ projectId: f.projectA.id, body: 'Admin delivery update', internal: false }) }, 201)
  await call(`/api/admin/portal/suppliers/${f.supplier.id}`, { method: 'PATCH', headers: adminHeaders, body: JSON.stringify({ verified: true }) }, 200)
  await call(`/api/admin/portal/documents/${f.document.id}`, { method: 'PATCH', headers: adminHeaders, body: JSON.stringify({ status: 'VERIFIED', publish: true }) }, 200)
  const library = await call('/api/portal/library', { headers: auth }, 200).then(r => r.json())
  assert.ok(library.some(d => d.id === f.document.id), 'Verified supplier document missing from library')
  const auditCount = await prisma.portalAuditEvent.count({ where: { tenantId: { in: created.tenantIds } } })
  assert.ok(auditCount >= 7, `Expected audit events, found ${auditCount}`)

  for (let attempt = 0; attempt < 9; attempt += 1) {
    const status = attempt === 8 ? 429 : 401
    await call('/api/portal/auth/login', { method: 'POST', headers: { origin, 'content-type': 'application/json', 'x-forwarded-for': '10.40.0.99' }, body: JSON.stringify({ email: 'nobody@example.test', password: 'WrongPassword2026' }) }, status)
  }
  console.log(JSON.stringify({ locales: '3/3', tenantIsolation: 'PASS', viewerRbac: 'PASS', supplierRbac: 'PASS', sameOrigin: 'PASS', oneTimeTokens: 'PASS', resetFlow: 'PASS', rateLimit: 'PASS', adminOperations: 'PASS', auditEvents: auditCount, privateMetadata: 'PASS', temporaryData: 'cleanup pending' }, null, 2))
}

try { await main() } finally { await cleanup(); await prisma.$disconnect(); console.log('Phase 4 temporary records cleaned.') }
