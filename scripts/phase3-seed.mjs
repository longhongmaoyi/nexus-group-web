import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const organizationKey = 'nexus'

const costAssumptions = {
  freightPct: 12,
  dutyPct: 6,
  taxPct: 5,
  inlandTransportPct: 4,
  installationPct: 18,
  engineeringPct: 8,
  contingencyPct: 10,
  marginPct: 0,
}

const stages = [
  ['discovery', 'Discovery', '需求探索', 'Découverte', 1, 3, null],
  ['design', 'Design', '设计', 'Conception', 3, 8, null],
  ['supplier-verification', 'Supplier verification', '供应商核验', 'Vérification du fournisseur', 2, 4, 'preproduction'],
  ['certification-testing', 'Certification and testing', '认证与测试', 'Certification et essais', 4, 12, 'preproduction'],
  ['production', 'Production', '生产', 'Production', 6, 16, null],
  ['shipping', 'Shipping', '国际运输', 'Transport maritime', 4, 8, 'delivery'],
  ['site-works', 'Site works', '场地工程', 'Travaux de site', 4, 12, 'delivery'],
  ['customs', 'Customs', '清关', 'Douanes', 1, 3, null],
  ['installation', 'Installation', '安装', 'Installation', 2, 8, null],
  ['commissioning', 'Inspection and commissioning', '验收与调试', 'Inspection et mise en service', 1, 4, null],
].map(([key, labelEn, labelZh, labelFr, minWeeks, maxWeeks, parallelGroup]) => ({
  key, labelEn, labelZh, labelFr, minWeeks, maxWeeks, parallelGroup,
}))

const costDisclaimer = {
  en: 'This planning estimate is indicative only and is not a quotation, offer, or guarantee. Actual costs depend on design, jurisdiction, supplier terms, exchange rates, duties, taxes, site conditions, professional services, permits, and market conditions.',
  zh: '本规划估算仅供参考，不构成报价、要约或保证。实际成本取决于设计、司法辖区、供应商条款、汇率、关税、税费、场地条件、专业服务、许可及市场情况。',
  fr: 'Cette estimation est indicative seulement et ne constitue ni un devis, ni une offre, ni une garantie. Les coûts réels dépendent de la conception, du territoire, des fournisseurs, des taux de change, des droits, des taxes, du site, des services professionnels, des permis et du marché.',
}
const timelineDisclaimer = {
  en: 'This timeline is an early planning range. Duration depends on jurisdiction, design completeness, approvals, testing, supplier capacity, transport, customs, site readiness, weather, inspections, and other project-specific conditions.',
  zh: '本时间表为早期规划范围。项目工期取决于司法辖区、设计完整度、审批、测试、供应商产能、运输、清关、场地准备、天气、检查及其他项目特定条件。',
  fr: 'Cet échéancier constitue une première fourchette. La durée dépend du territoire, de la conception, des approbations, des essais, du fournisseur, du transport, des douanes, du site, de la météo et des inspections.',
}

async function main() {
  const existingCost = await prisma.costAssumptionVersion.findFirst({ where: { organizationKey } })
  if (!existingCost) {
    await prisma.costAssumptionVersion.create({
      data: {
        organizationKey, version: 1, name: 'NEXUS initial planning assumptions', currency: 'CAD',
        assumptions: costAssumptions, disclaimerEn: costDisclaimer.en, disclaimerZh: costDisclaimer.zh,
        disclaimerFr: costDisclaimer.fr, active: true,
      },
    })
  }
  const existingTimeline = await prisma.timelineAssumptionVersion.findFirst({ where: { organizationKey } })
  if (!existingTimeline) {
    await prisma.timelineAssumptionVersion.create({
      data: {
        organizationKey, version: 1, name: 'NEXUS initial planning timeline', stages, uncertaintyPct: 20,
        disclaimerEn: timelineDisclaimer.en, disclaimerZh: timelineDisclaimer.zh,
        disclaimerFr: timelineDisclaimer.fr, active: true,
      },
    })
  }
  const [costCount, timelineCount] = await Promise.all([
    prisma.costAssumptionVersion.count({ where: { organizationKey } }),
    prisma.timelineAssumptionVersion.count({ where: { organizationKey } }),
  ])
  console.log(`Phase 3 seed complete. Cost versions: ${costCount}; timeline versions: ${timelineCount}.`)
}

main().finally(() => prisma.$disconnect())
