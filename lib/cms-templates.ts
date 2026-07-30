import type { CmsSectionDraft } from '@/lib/cms-types'

const localized = (en: string, zh: string, fr: string) => ({ en, zh, fr })

export type SystemSectionTemplate = {
  key: string
  name: string
  description: string
  section: CmsSectionDraft
}

export const systemSectionTemplates: SystemSectionTemplate[] = [
  {
    key: 'nexus-hero',
    name: 'NEXUS hero',
    description: 'A protected, brand-aligned hero with one primary action.',
    section: {
      key: 'hero',
      type: 'HERO',
      position: 0,
      enabled: true,
      content: {
        eyebrow: localized('CANADA × GLOBAL INNOVATION', '加拿大 × 全球创新', 'CANADA × INNOVATION MONDIALE'),
        title: localized('Global capability. Built for Canadian business.', '全球能力，为加拿大商业而建。', 'Des capacités mondiales, conçues pour les entreprises canadiennes.'),
        body: localized(
          'Connect a Canadian business need with verified global technology, local coordination and accountable delivery.',
          '将加拿大商业需求与经过验证的全球技术、本地协调和可靠交付连接起来。',
          'Reliez un besoin d’affaires canadien à une technologie mondiale vérifiée, une coordination locale et une livraison responsable.',
        ),
        ctaLabel: localized('Start a project', '启动项目', 'Démarrer un projet'),
        ctaHref: '/en/contact',
        items: [],
      },
    },
  },
  {
    key: 'three-feature-grid',
    name: 'Three-feature grid',
    description: 'Three concise cards for capabilities, sectors or customer outcomes.',
    section: {
      key: 'capabilities',
      type: 'FEATURE_GRID',
      position: 0,
      enabled: true,
      content: {
        eyebrow: localized('NEXUS CAPABILITIES', 'NEXUS 能力', 'CAPACITÉS NEXUS'),
        title: localized('A controlled path from need to delivery.', '从需求到交付的可控路径。', 'Un parcours maîtrisé, du besoin à la livraison.'),
        body: localized(
          'Keep each card focused on one clear customer outcome.',
          '每张卡片聚焦一个清晰的客户成果。',
          'Chaque carte met l’accent sur un résultat client clair.',
        ),
        items: [
          { title: localized('Assess', '评估', 'Évaluer'), body: localized('Define the business need and site.', '明确商业需求与场地。', 'Définir le besoin et le site.') },
          { title: localized('Adapt', '适配', 'Adapter'), body: localized('Coordinate Canadian requirements.', '协调加拿大要求。', 'Coordonner les exigences canadiennes.') },
          { title: localized('Deliver', '交付', 'Livrer'), body: localized('Manage local execution and support.', '管理本地执行与支持。', 'Gérer l’exécution locale et le soutien.') },
        ],
      },
    },
  },
  {
    key: 'six-step-process',
    name: 'Six-step delivery process',
    description: 'The approved NEXUS delivery sequence.',
    section: {
      key: 'delivery-process',
      type: 'PROCESS',
      position: 0,
      enabled: true,
      content: {
        eyebrow: localized('HOW NEXUS WORKS', 'NEXUS 如何运作', 'COMMENT NEXUS FONCTIONNE'),
        title: localized('From business problem to operating solution.', '从商业问题到可运营解决方案。', 'Du problème d’affaires à la solution opérationnelle.'),
        body: localized('A transparent sequence with defined responsibilities.', '职责清晰、过程透明。', 'Une séquence transparente avec des responsabilités définies.'),
        items: ['Assess', 'Source', 'Verify', 'Canadianize', 'Deliver', 'Support'].map((title) => ({
          title: localized(title, title, title),
          body: localized('Define inputs, evidence and the next decision.', '明确输入、证据与下一步决策。', 'Définir les données, les preuves et la prochaine décision.'),
        })),
      },
    },
  },
  {
    key: 'project-cta',
    name: 'Project assessment CTA',
    description: 'A compact closing action for qualified project enquiries.',
    section: {
      key: 'project-assessment',
      type: 'CTA',
      position: 0,
      enabled: true,
      content: {
        eyebrow: localized('START WITH CLARITY', '从清晰开始', 'COMMENCEZ AVEC CLARTÉ'),
        title: localized('Tell us what your organization needs to build or improve.', '告诉我们您的组织需要建设或改进什么。', 'Dites-nous ce que votre organisation doit construire ou améliorer.'),
        body: localized(
          'Share your location, intended use, budget range and target schedule.',
          '分享您的地点、预期用途、预算范围和目标时间。',
          'Partagez le lieu, l’usage prévu, la fourchette budgétaire et l’échéancier cible.',
        ),
        ctaLabel: localized('Start your assessment', '开始评估', 'Commencer l’évaluation'),
        ctaHref: '/en/contact',
        items: [],
      },
    },
  },
]
