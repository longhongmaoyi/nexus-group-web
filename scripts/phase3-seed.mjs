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
  en: 'Planning estimate only—not a quotation, offer, professional opinion, tax/customs advice, permit, certification or approval. Percentages are editable budgeting allowances, not verified rates. Duties and taxes depend on tariff classification, origin, value for duty, importer status and destination. Engineering and compliance allowances do not replace project-specific work by qualified professionals or decisions by authorities. Only a separate written quotation issued by an authorized NEXUS representative can state a price, scope, exclusions, taxes, validity period and acceptance terms.',
  zh: '仅供规划估算——不构成报价、要约、专业意见、税务或海关建议、许可、认证或批准。百分比是可编辑的预算预留，并非经核实的适用税率。关税和税费取决于税则归类、原产地、完税价格、进口商身份及目的地。工程与合规预留不能替代合格专业人士针对具体项目的工作或主管机构的决定。只有由 NEXUS 授权代表另行出具的书面报价，方可载明价格、范围、排除项、税费、有效期及接受条款。',
  fr: 'Estimation de planification seulement — ni devis, offre, avis professionnel, conseil fiscal ou douanier, permis, certification ou approbation. Les pourcentages sont des provisions budgétaires modifiables, et non des taux vérifiés. Les droits et taxes dépendent du classement tarifaire, de l’origine, de la valeur en douane, du statut de l’importateur et de la destination. Les provisions d’ingénierie et de conformité ne remplacent pas le travail propre au projet de professionnels qualifiés ni les décisions des autorités. Seul un devis écrit distinct émis par un représentant NEXUS autorisé peut préciser le prix, la portée, les exclusions, les taxes, la période de validité et les modalités d’acceptation.',
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
