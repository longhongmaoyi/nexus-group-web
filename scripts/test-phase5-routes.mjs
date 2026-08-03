import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const base = process.env.PHASE5_TEST_BASE_URL || 'http://localhost:3105'
const email = process.env.PHASE5_TEST_ADMIN_EMAIL
const password = process.env.PHASE5_TEST_ADMIN_PASSWORD
const ids = { tenantIds: [], projectIds: [], leadIds: [], complianceIds: [], partnerIds: [], taskIds: [] }
const check = (condition, message) => { if (!condition) throw new Error(message) }

async function api(path, options = {}) {
  const response = await fetch(`${base}${path}`, options)
  let json = null
  if ((response.headers.get('content-type') || '').includes('application/json')) json = await response.json()
  return { response, json }
}

try {
  check(email && password, 'Disposable Phase 5 administrator credentials are required')
  const stamp = Date.now()
  const nexusTenant = await prisma.portalTenant.create({ data: { organizationKey: 'nexus', slug: `p5-nexus-${stamp}`, name: 'Phase 5 Nexus Test', type: 'CLIENT' } }); ids.tenantIds.push(nexusTenant.id)
  const foreignTenant = await prisma.portalTenant.create({ data: { organizationKey: 'foreign-test', slug: `p5-foreign-${stamp}`, name: 'Phase 5 Foreign Test', type: 'CLIENT' } }); ids.tenantIds.push(foreignTenant.id)
  const project = await prisma.portalProject.create({ data: { tenantId: nexusTenant.id, reference: `P5-${stamp}`, title: 'Phase 5 Route Test' } }); ids.projectIds.push(project.id)
  const foreignProject = await prisma.portalProject.create({ data: { tenantId: foreignTenant.id, reference: `P5F-${stamp}`, title: 'Foreign Route Test' } }); ids.projectIds.push(foreignProject.id)
  const lead = await prisma.businessLead.create({ data: { organizationKey: 'nexus', reference: `P5L-${stamp}`, contactName: 'Phase 5 Test', contactEmail: `phase5-${stamp}@example.ca`, consent: true } }); ids.leadIds.push(lead.id)
  const login = await api('/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json', origin: base }, body: JSON.stringify({ email, password }) })
  check(login.response.status === 200, `Login failed: ${login.response.status}`)
  const cookie = login.response.headers.get('set-cookie')?.split(';')[0]
  check(cookie, 'Admin cookie missing')
  const headers = { 'content-type': 'application/json', origin: base, cookie }
  const overview = await api('/api/admin/phase5', { headers: { cookie } })
  check(overview.response.status === 200 && overview.json.leads.some((x) => x.id === lead.id), 'Phase 5 overview failed')
  const wrongOrigin = await api('/api/admin/phase5', { method: 'POST', headers: { ...headers, origin: 'https://invalid.example' }, body: JSON.stringify({ action: 'updateLead', id: lead.id, status: 'NEW' }) })
  check(wrongOrigin.response.status === 403, 'Same-origin protection failed')
  const leadUpdate = await api('/api/admin/phase5', { method: 'POST', headers, body: JSON.stringify({ action: 'updateLead', id: lead.id, status: 'QUALIFYING', priority: 'HIGH', portalProjectId: project.id, nextAction: 'Route test follow-up' }) })
  check(leadUpdate.response.status === 200, `Lead update failed: ${leadUpdate.json?.error}`)
  const isolation = await api('/api/admin/phase5', { method: 'POST', headers, body: JSON.stringify({ action: 'updateLead', id: lead.id, status: 'QUALIFYING', priority: 'HIGH', portalProjectId: foreignProject.id }) })
  check(isolation.response.status === 400, 'Cross-organization project link was not blocked')
  const projectUpdate = await api('/api/admin/phase5', { method: 'POST', headers, body: JSON.stringify({ action: 'updateProject', id: project.id, status: 'PLANNING', priority: 'NORMAL', budgetAmount: 100000, currency: 'CAD' }) })
  check(projectUpdate.response.status === 200, 'Project/finance update failed')
  const unsafePublic = await api('/api/admin/phase5', { method: 'POST', headers, body: JSON.stringify({ action: 'createCompliance', jurisdiction: 'Ontario', projectUse: 'Residential', requirement: 'Test', publicVisible: true }) })
  check(unsafePublic.response.status === 400, 'Incomplete public compliance record was accepted')
  const compliance = await api('/api/admin/phase5', { method: 'POST', headers, body: JSON.stringify({ action: 'createCompliance', jurisdiction: 'Ontario', projectUse: 'Residential', category: 'PERMITTING', requirement: 'Local authority review required', projectId: project.id, publicVisible: false }) })
  check(compliance.response.status === 200, 'Private compliance creation failed'); ids.complianceIds.push(compliance.json.id)
  const partner = await api('/api/admin/phase5', { method: 'POST', headers, body: JSON.stringify({ action: 'createPartner', name: 'Phase 5 Test Partner', category: 'ENGINEERING', region: 'Ontario', capabilities: 'Route testing', active: true }) })
  check(partner.response.status === 200, 'Partner creation failed'); ids.partnerIds.push(partner.json.id)
  const task = await api('/api/admin/phase5', { method: 'POST', headers, body: JSON.stringify({ action: 'createTask', title: 'Phase 5 route task', priority: 'URGENT', projectId: project.id, complianceRecordId: compliance.json.id, notify: false }) })
  check(task.response.status === 200, 'Task creation failed'); ids.taskIds.push(task.json.id)
  const csv = await api('/api/admin/phase5/reports?format=csv', { headers: { cookie } })
  check(csv.response.status === 200 && csv.response.headers.get('content-type')?.includes('text/csv'), 'CSV report failed')
  const pdf = await api('/api/admin/phase5/reports?format=pdf', { headers: { cookie } })
  check(pdf.response.status === 200 && pdf.response.headers.get('content-type') === 'application/pdf', 'PDF report failed')
  const ai = await api('/api/admin/phase5/ai-review', { method: 'POST', headers, body: '{}' })
  check(ai.response.status === 404 && ai.json.requiresHumanReview === true, 'Disabled AI boundary failed')
  const publicRoute = await fetch(`${base}/en/compliance`)
  check(publicRoute.status === 404, 'Public Compliance Centre should be disabled')
  console.log('PHASE5 ROUTES: PASS')
} finally {
  const admin = email ? await prisma.adminUser.findUnique({ where: { email } }) : null
  if (ids.taskIds.length) await prisma.internalTask.deleteMany({ where: { id: { in: ids.taskIds } } })
  if (ids.complianceIds.length) await prisma.complianceRecord.deleteMany({ where: { id: { in: ids.complianceIds } } })
  if (ids.partnerIds.length) await prisma.localPartner.deleteMany({ where: { id: { in: ids.partnerIds } } })
  if (ids.leadIds.length) { await prisma.leadActivity.deleteMany({ where: { leadId: { in: ids.leadIds } } }); await prisma.businessLead.deleteMany({ where: { id: { in: ids.leadIds } } }) }
  if (admin) await prisma.auditLog.deleteMany({ where: { actorAdminId: admin.id } })
  if (ids.projectIds.length) await prisma.portalProject.deleteMany({ where: { id: { in: ids.projectIds } } })
  if (ids.tenantIds.length) await prisma.portalTenant.deleteMany({ where: { id: { in: ids.tenantIds } } })
  if (admin) await prisma.adminUser.delete({ where: { id: admin.id } })
  await prisma.$disconnect()
}
