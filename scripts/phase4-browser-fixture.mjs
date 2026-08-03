import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth-core.mjs'

const prisma = new PrismaClient()
const fixture = 'phase4-responsive-check'
const email = `${fixture}@example.test`
const password = 'ResponsivePortal2026'
const adminEmail = `${fixture}-admin@example.test`
const adminPassword = 'ResponsiveAdmin2026'

async function cleanup() {
  const tenants = await prisma.portalTenant.findMany({ where: { slug: { startsWith: fixture } }, select: { id: true } })
  const tenantIds = tenants.map(t => t.id)
  const users = await prisma.portalUser.findMany({ where: { email }, select: { id: true } })
  const userIds = users.map(u => u.id)
  if (tenantIds.length) {
    await prisma.portalQuoteDecision.deleteMany({ where: { quotation: { tenantId: { in: tenantIds } } } })
    await prisma.portalComment.deleteMany({ where: { tenantId: { in: tenantIds } } })
    await prisma.portalAuditEvent.deleteMany({ where: { tenantId: { in: tenantIds } } })
    await prisma.portalDocument.deleteMany({ where: { tenantId: { in: tenantIds } } })
    await prisma.portalQuotation.deleteMany({ where: { tenantId: { in: tenantIds } } })
    await prisma.portalProject.deleteMany({ where: { tenantId: { in: tenantIds } } })
    await prisma.supplier.deleteMany({ where: { portalTenantId: { in: tenantIds } } })
    await prisma.portalMembership.deleteMany({ where: { tenantId: { in: tenantIds } } })
  }
  if (userIds.length) {
    await prisma.portalSession.deleteMany({ where: { userId: { in: userIds } } })
    await prisma.portalAuthToken.deleteMany({ where: { userId: { in: userIds } } })
    await prisma.portalUser.deleteMany({ where: { id: { in: userIds } } })
  }
  if (tenantIds.length) await prisma.portalTenant.deleteMany({ where: { id: { in: tenantIds } } })
  await prisma.emailOutbox.deleteMany({ where: { recipient: email } })
  const admins = await prisma.adminUser.findMany({ where: { email: adminEmail }, select: { id: true } })
  const adminIds = admins.map(admin => admin.id)
  if (adminIds.length) {
    await prisma.auditLog.deleteMany({ where: { OR: [{ actorAdminId: { in: adminIds } }, { entityId: { in: adminIds } }] } })
    await prisma.adminUser.deleteMany({ where: { id: { in: adminIds } } })
  }
}

if (process.argv[2] === 'cleanup') {
  await cleanup()
  console.log('Phase 4 responsive fixture cleaned.')
} else {
  await cleanup()
  await prisma.adminUser.create({ data: { email: adminEmail, name: 'Responsive Admin Tester', role: 'ADMIN', passwordHash: hashPassword(adminPassword) } })
  const user = await prisma.portalUser.create({ data: { email, name: 'Responsive Portal Tester', passwordHash: hashPassword(password), status: 'ACTIVE', emailVerifiedAt: new Date(), locale: 'en' } })
  const client = await prisma.portalTenant.create({ data: { slug: `${fixture}-client`, name: 'Northstar Client', type: 'CLIENT' } })
  const supplier = await prisma.portalTenant.create({ data: { slug: `${fixture}-supplier`, name: 'Aurora Supplier', type: 'SUPPLIER' } })
  await prisma.portalMembership.createMany({ data: [{ tenantId: client.id, userId: user.id, role: 'MANAGER' }, { tenantId: supplier.id, userId: user.id, role: 'OWNER' }] })
  const clientProject = await prisma.portalProject.create({ data: { tenantId: client.id, reference: 'PX-RESP-001', title: 'Northern housing delivery', description: 'Responsive client dashboard verification.', status: 'APPROVAL' } })
  await prisma.portalProject.create({ data: { tenantId: supplier.id, reference: 'PX-RESP-002', title: 'Product documentation review', description: 'Responsive supplier dashboard verification.', status: 'PLANNING' } })
  await prisma.portalQuotation.create({ data: { tenantId: client.id, projectId: clientProject.id, number: 'Q-RESP-001', version: 2, title: 'Modular delivery proposal', currency: 'CAD', totalAmount: '245000.00', lineItems: [{ description: 'Local visual check', amount: 245000 }], status: 'SENT', sentAt: new Date(), validUntil: new Date(Date.now() + 7 * 86_400_000) } })
  await prisma.portalComment.create({ data: { tenantId: client.id, projectId: clientProject.id, body: 'Engineering allowance review is ready for client feedback.', internal: false } })
  console.log(JSON.stringify({ email, password, adminEmail, adminPassword, clientSlug: client.slug, supplierSlug: supplier.slug }))
}

await prisma.$disconnect()
