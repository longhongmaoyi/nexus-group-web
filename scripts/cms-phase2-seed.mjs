import { PrismaClient } from '@prisma/client'
import { extractMediaReferences } from '../lib/cms-media-core.mjs'

const prisma = new PrismaClient()
const l = (en, zh, fr) => ({ en, zh, fr })

const templates = [
  {
    key: 'nexus-hero',
    name: 'NEXUS hero',
    description: 'A protected, brand-aligned hero with one primary action.',
    sectionType: 'HERO',
    content: {
      eyebrow: l('CANADA × GLOBAL INNOVATION', '加拿大 × 全球创新', 'CANADA × INNOVATION MONDIALE'),
      title: l('Global capability. Built for Canadian business.', '全球能力，为加拿大商业而建。', 'Des capacités mondiales, conçues pour les entreprises canadiennes.'),
      body: l('Connect a Canadian business need with verified global technology, local coordination and accountable delivery.', '将加拿大商业需求与经过验证的全球技术、本地协调和可靠交付连接起来。', 'Reliez un besoin canadien à une technologie mondiale vérifiée, une coordination locale et une livraison responsable.'),
      ctaLabel: l('Start a project', '启动项目', 'Démarrer un projet'),
      ctaHref: '/en/contact',
      items: [],
    },
  },
  {
    key: 'three-feature-grid',
    name: 'Three-feature grid',
    description: 'Three concise cards for capabilities, sectors or customer outcomes.',
    sectionType: 'FEATURE_GRID',
    content: {
      eyebrow: l('NEXUS CAPABILITIES', 'NEXUS 能力', 'CAPACITÉS NEXUS'),
      title: l('A controlled path from need to delivery.', '从需求到交付的可控路径。', 'Un parcours maîtrisé, du besoin à la livraison.'),
      body: l('Keep each card focused on one clear customer outcome.', '每张卡片聚焦一个清晰的客户成果。', 'Chaque carte met l’accent sur un résultat client clair.'),
      items: [
        { title: l('Assess', '评估', 'Évaluer'), body: l('Define the business need and site.', '明确商业需求与场地。', 'Définir le besoin et le site.') },
        { title: l('Adapt', '适配', 'Adapter'), body: l('Coordinate Canadian requirements.', '协调加拿大要求。', 'Coordonner les exigences canadiennes.') },
        { title: l('Deliver', '交付', 'Livrer'), body: l('Manage local execution and support.', '管理本地执行与支持。', 'Gérer l’exécution locale et le soutien.') },
      ],
    },
  },
  {
    key: 'project-cta',
    name: 'Project assessment CTA',
    description: 'A compact closing action for qualified project enquiries.',
    sectionType: 'CTA',
    content: {
      eyebrow: l('START WITH CLARITY', '从清晰开始', 'COMMENCEZ AVEC CLARTÉ'),
      title: l('Tell us what your organization needs to build or improve.', '告诉我们您的组织需要建设或改进什么。', 'Dites-nous ce que votre organisation doit construire ou améliorer.'),
      body: l('Share your location, intended use, budget range and target schedule.', '分享您的地点、预期用途、预算范围和目标时间。', 'Partagez le lieu, l’usage prévu, le budget et l’échéancier cible.'),
      ctaLabel: l('Start your assessment', '开始评估', 'Commencer l’évaluation'),
      ctaHref: '/en/contact',
      items: [],
    },
  },
]

try {
  for (const template of templates) {
    await prisma.cmsSectionTemplate.upsert({
      where: { key: template.key },
      create: { ...template, system: true },
      update: {
        name: template.name,
        description: template.description,
        sectionType: template.sectionType,
        content: template.content,
        system: true,
      },
    })
  }

  const pages = await prisma.cmsPage.findMany({
    include: { publications: { take: 1 } },
  })
  let backfilled = 0
  for (const page of pages) {
    if (!page.publishedSnapshot || page.publications.length) continue
    const publication = await prisma.cmsPublication.create({
      data: {
        pageId: page.id,
        version: 1,
        snapshot: page.publishedSnapshot,
        note: 'Backfilled from the Phase 1 published snapshot',
      },
    })
    const snapshot = page.publishedSnapshot
    const references = extractMediaReferences(snapshot?.sections)
    if (references.length) {
      const assets = await prisma.mediaAsset.findMany({
        where: { id: { in: [...new Set(references.map((item) => item.assetId))] } },
        select: { id: true },
      })
      const valid = new Set(assets.map((asset) => asset.id))
      const validReferences = references.filter((item) => valid.has(item.assetId))
      if (validReferences.length) {
        await prisma.mediaReference.createMany({
          data: validReferences.map((item) => ({
            assetId: item.assetId,
            pageId: page.id,
            publicationId: publication.id,
            source: 'PUBLISHED',
            sectionKey: item.sectionKey,
            fieldPath: item.fieldPath,
          })),
        })
      }
    }
    backfilled += 1
  }
  console.log(`Seeded ${templates.length} controlled templates; backfilled ${backfilled} publication histories.`)
} finally {
  await prisma.$disconnect()
}
