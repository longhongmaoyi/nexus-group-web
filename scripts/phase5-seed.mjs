import { PrismaClient } from '@prisma/client'
import { COMPLIANCE_CATEGORIES, PARTNER_CATEGORIES, PHASE5_ORGANIZATION_KEY } from '../lib/phase5-core.mjs'

const prisma = new PrismaClient()
try {
  const [admins, leads, projects, compliance, partners, tasks] = await Promise.all([
    prisma.adminUser.count(),
    prisma.businessLead.count({ where: { organizationKey: PHASE5_ORGANIZATION_KEY } }),
    prisma.portalProject.count({ where: { tenant: { organizationKey: PHASE5_ORGANIZATION_KEY } } }),
    prisma.complianceRecord.count({ where: { organizationKey: PHASE5_ORGANIZATION_KEY } }),
    prisma.localPartner.count({ where: { organizationKey: PHASE5_ORGANIZATION_KEY } }),
    prisma.internalTask.count({ where: { organizationKey: PHASE5_ORGANIZATION_KEY } }),
  ])
  console.log(JSON.stringify({ ok: true, defaults: { complianceCategories: COMPLIANCE_CATEGORIES, partnerCategories: PARTNER_CATEGORIES }, records: { admins, leads, projects, compliance, partners, tasks }, note: 'Phase 5 defaults are controlled in code; no placeholder production records were inserted.' }))
} finally {
  await prisma.$disconnect()
}
