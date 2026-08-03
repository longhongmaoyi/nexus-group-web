import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const organizationKey = 'nexus'
const releaseName = 'Release A reviewed planning assumptions 2026-08-03'
const disclaimers = {
  en: 'Planning estimate only—not a quotation, offer, professional opinion, tax/customs advice, permit, certification or approval. Percentages are editable budgeting allowances, not verified rates. Duties and taxes depend on tariff classification, origin, value for duty, importer status and destination. Engineering and compliance allowances do not replace project-specific work by qualified professionals or decisions by authorities. Only a separate written quotation issued by an authorized NEXUS representative can state a price, scope, exclusions, taxes, validity period and acceptance terms.',
  zh: '仅供规划估算——不构成报价、要约、专业意见、税务或海关建议、许可、认证或批准。百分比是可编辑的预算预留，并非经核实的适用税率。关税和税费取决于税则归类、原产地、完税价格、进口商身份及目的地。工程与合规预留不能替代合格专业人士针对具体项目的工作或主管机构的决定。只有由 NEXUS 授权代表另行出具的书面报价，方可载明价格、范围、排除项、税费、有效期及接受条款。',
  fr: 'Estimation de planification seulement — ni devis, offre, avis professionnel, conseil fiscal ou douanier, permis, certification ou approbation. Les pourcentages sont des provisions budgétaires modifiables, et non des taux vérifiés. Les droits et taxes dépendent du classement tarifaire, de l’origine, de la valeur en douane, du statut de l’importateur et de la destination. Les provisions d’ingénierie et de conformité ne remplacent pas le travail propre au projet de professionnels qualifiés ni les décisions des autorités. Seul un devis écrit distinct émis par un représentant NEXUS autorisé peut préciser le prix, la portée, les exclusions, les taxes, la période de validité et les modalités d’acceptation.',
}

async function main() {
  const existing = await prisma.costAssumptionVersion.findFirst({ where: { organizationKey, name: releaseName } })
  if (existing) {
    console.log(`Release A cost assumption version already exists: v${existing.version}.`)
    return
  }
  const active = await prisma.costAssumptionVersion.findFirst({
    where: { organizationKey, active: true },
    orderBy: { version: 'desc' },
  })
  if (!active) throw new Error('No active cost assumption version exists. Run phase3:seed first.')
  const latest = await prisma.costAssumptionVersion.aggregate({ where: { organizationKey }, _max: { version: true } })
  const created = await prisma.$transaction(async (tx) => {
    await tx.costAssumptionVersion.updateMany({ where: { organizationKey, active: true }, data: { active: false } })
    return tx.costAssumptionVersion.create({
      data: {
        organizationKey,
        version: (latest._max.version || 0) + 1,
        name: releaseName,
        currency: active.currency,
        assumptions: active.assumptions,
        disclaimerEn: disclaimers.en,
        disclaimerZh: disclaimers.zh,
        disclaimerFr: disclaimers.fr,
        active: true,
      },
    })
  })
  console.log(`Release A cost assumption version activated: v${created.version}. Numerical allowances were preserved unchanged.`)
}

main().finally(() => prisma.$disconnect())
