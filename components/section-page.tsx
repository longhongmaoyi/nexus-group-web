'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  HardHat,
  PackageCheck,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'

import { InquiryForm } from '@/components/inquiry-form'
import { BusinessIntakeWizard } from '@/components/business-intake-wizard'
import { conceptProjects, homeCopy, localized, sectionPages, type SectionSlug } from '@/lib/content'
import type { CmsPageSnapshot } from '@/lib/cms-types'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
type IconType = typeof Globe2

const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const common = {
  select: t('Select a stage to view responsibilities and evidence', '选择阶段查看责任与证明文件', 'Sélectionnez une étape pour voir les responsabilités et les preuves'),
  nexusCoordinates: t('What NEXUS coordinates', 'NEXUS 协调内容', 'Ce que NEXUS coordonne'),
  clientInputs: t('Information required from the client', '客户需提供的信息', 'Renseignements requis du client'),
  evidence: t('Typical evidence and documents', '典型证明与文件', 'Preuves et documents typiques'),
  outcome: t('Stage outcome', '阶段成果', 'Résultat de l’étape'),
  projectSpecific: t(
    'Requirements are project-specific and must be confirmed by the responsible authority, qualified professional or certification organization.',
    '具体要求因项目而异，必须由主管机构、合格专业人士或认证机构确认。',
    'Les exigences sont propres au projet et doivent être confirmées par l’autorité, le professionnel qualifié ou l’organisme de certification responsable.',
  ),
}

const assemblyStages: Array<{
  key: string
  icon: IconType
  title: Localized
  summary: Localized
  coordinates: Localized[]
  inputs: Localized[]
  documents: Localized[]
  outcome: Localized
}> = [
  {
    key: '01',
    icon: ClipboardCheck,
    title: t('Assessment & Delivery Strategy', '评估与交付策略', 'Évaluation et stratégie de livraison'),
    summary: t(
      'Define the operating need, jurisdiction, site, capacity, budget, schedule and preferred commercial model before selecting a product.',
      '在选择产品之前，明确运营需求、司法辖区、场地、容量、预算、时间及合作模式。',
      'Définir le besoin opérationnel, la juridiction, le site, la capacité, le budget, l’échéancier et le modèle commercial avant de choisir un produit.',
    ),
    coordinates: [
      t('Project discovery workshop and preliminary feasibility review', '项目发现研讨与初步可行性审查', 'Atelier de découverte et faisabilité préliminaire'),
      t('Responsibility matrix for the client, NEXUS, manufacturer and local partners', '客户、NEXUS、制造商及本地伙伴责任矩阵', 'Matrice des responsabilités du client, de NEXUS, du fabricant et des partenaires'),
      t('Preliminary cost, risk and delivery-path assumptions', '初步成本、风险及交付路径假设', 'Hypothèses préliminaires de coût, de risque et de livraison'),
    ],
    inputs: [
      t('Location, intended use and required capacity', '地点、预期用途及所需容量', 'Emplacement, usage prévu et capacité requise'),
      t('Site ownership, access, utilities and target completion date', '场地权属、通行、公用设施及目标完工日期', 'Propriété du site, accès, services et date cible'),
      t('Budget range and purchase, contract or joint-venture preference', '预算范围及采购、合同或合资偏好', 'Budget et préférence achat, contrat ou coentreprise'),
    ],
    documents: [
      t('Project brief', '项目简报', 'Dossier de projet'),
      t('Preliminary responsibility matrix', '初步责任矩阵', 'Matrice préliminaire des responsabilités'),
      t('Initial risk and requirements register', '初步风险与要求登记表', 'Registre initial des risques et exigences'),
    ],
    outcome: t('A qualified project pathway before resources are committed.', '在投入资源前形成合格的项目路径。', 'Un parcours de projet qualifié avant d’engager des ressources.'),
  },
  {
    key: '02',
    icon: Globe2,
    title: t('Global Sourcing & Import', '全球寻源与进口', 'Approvisionnement mondial et importation'),
    summary: t(
      'Identify suitable systems and manufacturers, verify commercial capability and prepare a controlled import pathway into Canada.',
      '识别合适系统与制造商，核验商业能力，并规划受控的加拿大进口路径。',
      'Identifier les systèmes et fabricants adaptés, vérifier leur capacité commerciale et préparer une importation contrôlée au Canada.',
    ),
    coordinates: [
      t('Supplier discovery, capability review and commercial comparison', '供应商发现、能力审查及商业比较', 'Recherche de fournisseurs, examen des capacités et comparaison commerciale'),
      t('Sample, inspection, packaging and shipping requirements', '样品、检验、包装及运输要求', 'Exigences d’échantillons, d’inspection, d’emballage et d’expédition'),
      t('Customs broker, freight, insurance and delivery sequencing', '报关、货运、保险及交付排序', 'Courtier en douane, fret, assurance et séquencement de livraison'),
    ],
    inputs: [
      t('Approved technical and commercial specification', '已批准技术与商业规格', 'Spécification technique et commerciale approuvée'),
      t('Delivery address, access limitations and receiving plan', '交付地址、通行限制及收货计划', 'Adresse de livraison, restrictions d’accès et plan de réception'),
      t('Buyer and importer-of-record responsibilities', '买方与进口商责任', 'Responsabilités de l’acheteur et de l’importateur officiel'),
    ],
    documents: [
      t('Supplier verification record and purchase specification', '供应商核验记录与采购规格', 'Dossier de vérification et spécification d’achat'),
      t('Commercial invoice, packing list and origin records', '商业发票、装箱单及原产地记录', 'Facture commerciale, liste de colisage et documents d’origine'),
      t('Tariff classification and product-specific import records', '税则归类及产品专项进口记录', 'Classement tarifaire et documents d’importation propres au produit'),
    ],
    outcome: t('A verified supply and logistics plan with traceable documentation.', '形成可追溯文件支持的核验供应与物流计划。', 'Un plan d’approvisionnement et de logistique vérifié et traçable.'),
  },
  {
    key: '03',
    icon: Boxes,
    title: t('Canadian Assembly & Quality Control', '加拿大组装与质量控制', 'Assemblage canadien et contrôle qualité'),
    summary: t(
      'Receive, inspect, assemble and finish imported systems under a documented Canadian quality process.',
      '在有记录的加拿大质量流程下接收、检验、组装并完成进口系统。',
      'Recevoir, inspecter, assembler et finir les systèmes importés selon un processus qualité canadien documenté.',
    ),
    coordinates: [
      t('Receiving inspection, damage reporting and material traceability', '收货检验、损坏报告及材料追溯', 'Inspection de réception, rapport de dommages et traçabilité'),
      t('Assembly sequence, qualified trades and quality checkpoints', '组装顺序、合格工种及质量检查点', 'Séquence d’assemblage, métiers qualifiés et points de contrôle'),
      t('Factory issue resolution, replacement parts and change control', '工厂问题解决、替换件及变更控制', 'Résolution des problèmes d’usine, pièces de remplacement et contrôle des changements'),
    ],
    inputs: [
      t('Approved drawings, manuals and bill of materials', '已批准图纸、手册及物料清单', 'Plans, manuels et nomenclature approuvés'),
      t('Site-delivery sequence and finishing requirements', '现场交付顺序及饰面要求', 'Séquence de livraison et exigences de finition'),
      t('Required inspection hold points', '所需检验停检点', 'Points d’arrêt d’inspection requis'),
    ],
    documents: [
      t('Receiving and damage report', '收货与损坏报告', 'Rapport de réception et dommages'),
      t('Assembly quality checklist and photo record', '组装质量清单及照片记录', 'Liste de contrôle qualité et dossier photo'),
      t('Material, component and corrective-action records', '材料、部件及纠正措施记录', 'Dossiers des matériaux, composants et actions correctives'),
    ],
    outcome: t('A documented, inspected and site-ready assembled system.', '形成有记录、经检验并可运往现场的组装系统。', 'Un système assemblé, inspecté, documenté et prêt pour le site.'),
  },
  {
    key: '04',
    icon: ShieldCheck,
    title: t('Design, Compliance & Certification Coordination', '设计、合规与认证协调', 'Coordination de conception, conformité et certification'),
    summary: t(
      'Coordinate the project-specific pathway for design responsibility, product conformity, permits and inspections.',
      '协调设计责任、产品符合性、许可及检查的项目专项路径。',
      'Coordonner le parcours propre au projet pour la conception, la conformité du produit, les permis et les inspections.',
    ),
    coordinates: [
      t('Qualified Canadian architecture and engineering review', '合格的加拿大建筑与工程审查', 'Examen par des professionnels canadiens qualifiés'),
      t('Testing, certification or field-evaluation pathway where applicable', '适用情况下的检测、认证或现场评估路径', 'Parcours d’essai, de certification ou d’évaluation sur place, selon le cas'),
      t('Municipal, fire, electrical, plumbing, gas and occupancy coordination', '市政、消防、电气、给排水、燃气及占用协调', 'Coordination municipale, incendie, électricité, plomberie, gaz et occupation'),
    ],
    inputs: [
      t('Exact project location, use and occupancy', '准确项目地点、用途及占用类型', 'Emplacement, usage et occupation exacts'),
      t('Complete drawings, calculations, specifications and product records', '完整图纸、计算书、规格及产品记录', 'Plans, calculs, spécifications et dossiers de produit complets'),
      t('Site, foundation, climate-load and utility information', '场地、基础、气候荷载及公用设施信息', 'Renseignements sur le site, les fondations, les charges climatiques et les services'),
    ],
    documents: [
      t('Professional review and sealed documents where required', '按要求提供专业审查及盖章文件', 'Examen professionnel et documents scellés lorsque requis'),
      t('Test reports, certificates, listings or evaluation records', '测试报告、证书、认证名录或评估记录', 'Rapports d’essai, certificats, inscriptions ou évaluations'),
      t('Permit applications, review comments and approvals', '许可申请、审查意见及批准文件', 'Demandes de permis, commentaires d’examen et approbations'),
    ],
    outcome: t('A transparent compliance dossier issued by the responsible qualified parties and authorities.', '由相应合格专业方和主管机构签发的透明合规档案。', 'Un dossier de conformité transparent délivré par les parties qualifiées et autorités responsables.'),
  },
  {
    key: '05',
    icon: Truck,
    title: t('Site Delivery, Installation & Commissioning', '现场交付、安装与调试', 'Livraison, installation et mise en service'),
    summary: t(
      'Coordinate site readiness, transportation, lifting, installation, service connections, inspection and operational handover.',
      '协调现场准备、运输、吊装、安装、服务连接、检查及运营移交。',
      'Coordonner la préparation du site, le transport, le levage, l’installation, les raccordements, l’inspection et la remise opérationnelle.',
    ),
    coordinates: [
      t('Site-readiness and foundation confirmation', '现场准备及基础确认', 'Confirmation de la préparation du site et des fondations'),
      t('Transportation, oversize permits, crane and unloading plan', '运输、超限许可、吊车及卸货计划', 'Transport, permis hors gabarit, grue et plan de déchargement'),
      t('Installation sequence, licensed trades, inspections and commissioning', '安装顺序、持牌工种、检查及调试', 'Séquence d’installation, métiers autorisés, inspections et mise en service'),
    ],
    inputs: [
      t('Approved site plan and delivery access', '已批准场地计划及交付通道', 'Plan de site approuvé et accès de livraison'),
      t('Foundation, utility and civil-work completion records', '基础、公用设施及土建完成记录', 'Dossiers d’achèvement des fondations, services et travaux civils'),
      t('Site safety plan and responsible contractor contacts', '现场安全计划及责任承包商联系人', 'Plan de sécurité et contacts des entrepreneurs responsables'),
    ],
    documents: [
      t('Delivery and lifting plan', '交付与吊装计划', 'Plan de livraison et de levage'),
      t('Installation checklists and inspection records', '安装清单及检查记录', 'Listes d’installation et dossiers d’inspection'),
      t('Commissioning, deficiency and occupancy records', '调试、缺陷及占用记录', 'Dossiers de mise en service, déficiences et occupation'),
    ],
    outcome: t('An installed, inspected and commissioned operating environment.', '形成已安装、经检查并完成调试的运营环境。', 'Un environnement opérationnel installé, inspecté et mis en service.'),
  },
  {
    key: '06',
    icon: Wrench,
    title: t('After-sales & Lifecycle Support', '售后与全生命周期支持', 'Après-vente et soutien du cycle de vie'),
    summary: t(
      'Maintain a clear service channel for warranty administration, spare parts, maintenance, upgrades and digital support.',
      '为质保管理、备件、维护、升级及数字支持保持清晰服务渠道。',
      'Maintenir un canal clair pour les garanties, les pièces, l’entretien, les mises à niveau et le soutien numérique.',
    ),
    coordinates: [
      t('Warranty responsibility and service-escalation matrix', '质保责任及服务升级矩阵', 'Matrice des garanties et de l’escalade de service'),
      t('Spare-parts planning, preventive maintenance and technical support', '备件规划、预防性维护及技术支持', 'Planification des pièces, entretien préventif et soutien technique'),
      t('Performance review, upgrades and lifecycle documentation', '性能审查、升级及生命周期文件', 'Examen du rendement, mises à niveau et documentation du cycle de vie'),
    ],
    inputs: [
      t('Handover acceptance and responsible operator contacts', '移交验收及责任运营方联系人', 'Acceptation de la remise et contacts de l’exploitant'),
      t('Operating conditions, service history and issue evidence', '运营条件、服务历史及问题证据', 'Conditions d’exploitation, historique de service et preuves des problèmes'),
      t('Required response level and maintenance program', '所需响应级别及维护计划', 'Niveau de réponse requis et programme d’entretien'),
    ],
    documents: [
      t('Warranty register and service procedures', '质保登记表及服务程序', 'Registre des garanties et procédures de service'),
      t('Operations, maintenance and spare-parts manuals', '运营、维护及备件手册', 'Manuels d’exploitation, d’entretien et de pièces'),
      t('Service tickets, corrective actions and upgrade records', '服务工单、纠正措施及升级记录', 'Billets de service, actions correctives et dossiers de mise à niveau'),
    ],
    outcome: t('A supported asset with traceable service and lifecycle records.', '形成具有可追溯服务及生命周期记录的受支持资产。', 'Un actif soutenu avec des dossiers de service et de cycle de vie traçables.'),
  },
]

const sectionContext: Partial<Record<SectionSlug, {
  icon: IconType
  heading: Localized
  points: Localized[]
  evidence: Localized[]
  outcome: Localized
}>> = {
  about: {
    icon: Users,
    heading: t('How NEXUS creates value', 'NEXUS 如何创造价值', 'Comment NEXUS crée de la valeur'),
    points: [
      t('Translate Canadian business needs into a structured global search brief', '把加拿大业务需求转化为结构化全球寻源简报', 'Traduire les besoins canadiens en mandat mondial structuré'),
      t('Connect global capability with accountable Canadian delivery partners', '把全球能力与负责的加拿大交付伙伴连接起来', 'Relier la capacité mondiale à des partenaires canadiens responsables'),
      t('Manage commercial, technical, logistical and digital coordination', '管理商业、技术、物流及数字化协调', 'Gérer la coordination commerciale, technique, logistique et numérique'),
    ],
    evidence: [t('Team and partner profiles', '团队与伙伴资料', 'Profils de l’équipe et des partenaires'), t('Defined responsibility matrix', '明确责任矩阵', 'Matrice des responsabilités'), t('Verified case studies as they become available', '逐步发布核验案例', 'Études de cas vérifiées au fur et à mesure')],
    outcome: t('A credible Canada–global integration platform with transparent responsibilities.', '形成责任透明、可信的加拿大全球整合平台。', 'Une plateforme d’intégration Canada–monde crédible et transparente.'),
  },
  products: {
    icon: PackageCheck,
    heading: t('How solutions should be evaluated', '如何评估解决方案', 'Comment évaluer les solutions'),
    points: [t('Intended use and operating environment', '预期用途与运营环境', 'Usage prévu et environnement'), t('Technical configuration, transport format and site compatibility', '技术配置、运输形式及场地兼容性', 'Configuration, transport et compatibilité du site'), t('Documentation status and Canadian service scope', '文件状态及加拿大服务范围', 'État des documents et services canadiens')],
    evidence: [t('Specifications and drawings', '规格与图纸', 'Spécifications et plans'), t('Material and factory records', '材料与工厂记录', 'Dossiers de matériaux et d’usine'), t('Clear assumptions, exclusions and warranty scope', '明确假设、排除项及质保范围', 'Hypothèses, exclusions et garanties claires')],
    outcome: t('A comparable, documented solution rather than an unqualified product listing.', '形成可比较、有文件支持的解决方案，而非未经核验的产品列表。', 'Une solution comparable et documentée, et non une simple fiche produit.'),
  },
  industries: {
    icon: HardHat,
    heading: t('Start with the operating problem', '从运营问题出发', 'Commencer par le problème opérationnel'),
    points: [t('Identify the client’s operational bottleneck', '识别客户运营瓶颈', 'Identifier le goulot opérationnel'), t('Define capacity, environment, safety and service expectations', '明确容量、环境、安全及服务要求', 'Définir capacité, environnement, sécurité et service'), t('Build a sector-specific delivery and compliance pathway', '建立行业专项交付与合规路径', 'Créer un parcours sectoriel de livraison et conformité')],
    evidence: [t('Sector requirement checklist', '行业要求清单', 'Liste d’exigences sectorielles'), t('Recommended solution architecture', '建议解决方案架构', 'Architecture recommandée'), t('Commercial model and implementation roadmap', '商业模式与实施路线图', 'Modèle commercial et feuille de route')],
    outcome: t('A solution designed around business performance, not a generic catalogue.', '围绕业务绩效设计的解决方案，而非通用目录。', 'Une solution fondée sur la performance, pas sur un catalogue générique.'),
  },
  projects: {
    icon: Building2,
    heading: t('Every project needs a visible status', '每个项目都需明确状态', 'Chaque projet doit afficher son statut'),
    points: [t('Verified project', '已核验项目', 'Projet vérifié'), t('Project in development', '开发中项目', 'Projet en développement'), t('Design concept', '设计概念', 'Concept de design')],
    evidence: [t('Client-approved scope and location', '客户认可的范围与地点', 'Portée et emplacement approuvés'), t('Timeline, responsibilities and specifications', '时间、责任及规格', 'Échéancier, responsabilités et spécifications'), t('Measured operational or commercial results', '可衡量运营或商业成果', 'Résultats opérationnels ou commerciaux mesurés')],
    outcome: t('A trustworthy portfolio that never presents a concept as completed work.', '形成可信作品集，绝不把概念当作已完工项目。', 'Un portfolio crédible qui ne présente jamais un concept comme livré.'),
  },
  suppliers: {
    icon: BadgeCheck,
    heading: t('Qualified partner onboarding', '合格伙伴入驻', 'Intégration de partenaires qualifiés'),
    points: [t('Company, factory and export capability review', '公司、工厂及出口能力审查', 'Examen de l’entreprise, de l’usine et de l’exportation'), t('Structured product and document submission', '结构化产品与文件提交', 'Soumission structurée des produits et documents'), t('Project matching and Canadian market-readiness review', '项目匹配及加拿大市场准备度审查', 'Jumelage de projets et préparation au marché canadien')],
    evidence: [t('Business and factory records', '企业与工厂记录', 'Dossiers d’entreprise et d’usine'), t('Test reports, certificates and quality procedures', '测试报告、证书及质量程序', 'Rapports, certificats et procédures qualité'), t('References, capacity and after-sales commitment', '案例、产能及售后承诺', 'Références, capacité et engagement après-vente')],
    outcome: t('A curated partner ecosystem based on evidence, capability and accountability.', '形成基于证据、能力及责任的精选伙伴生态。', 'Un écosystème sélectionné selon les preuves, capacités et responsabilités.'),
  },
  news: {
    icon: FileCheck2,
    heading: t('Publish useful, source-based intelligence', '发布有用且有来源的洞察', 'Publier des analyses utiles et sourcées'),
    points: [t('Canadian market and policy developments', '加拿大市场与政策动态', 'Évolutions du marché et des politiques'), t('Global product and technology evaluation', '全球产品与技术评估', 'Évaluation mondiale des produits et technologies'), t('Practical project-delivery lessons', '实用项目交付经验', 'Leçons pratiques de livraison')],
    evidence: [t('Named author and publication date', '作者与发布日期', 'Auteur et date de publication'), t('Source links and technical review where needed', '来源链接及必要技术审查', 'Sources et examen technique au besoin'), t('Clear distinction between fact, guidance and opinion', '清楚区分事实、指导及观点', 'Distinction claire entre fait, conseil et opinion')],
    outcome: t('A trusted knowledge centre rather than a generic company-news feed.', '形成可信知识中心，而非普通公司新闻流。', 'Un centre de connaissances crédible plutôt qu’un fil d’actualités générique.'),
  },
}

function List({ items, locale }: { items: Localized[]; locale: Locale }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item.en} className="flex gap-3 text-sm leading-6 text-slate-600">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
          <span>{item[locale]}</span>
        </li>
      ))}
    </ul>
  )
}

export function SectionPage({ locale, section, cms, businessToolsEnabled = false }: { locale: Locale; section: SectionSlug; cms?: CmsPageSnapshot | null; businessToolsEnabled?: boolean }) {
  const staticPage = sectionPages[section]
  const hero = cms?.sections.find((item) => item.key === 'hero')?.content
  const cmsBlocks = cms?.sections.filter((item) => item.key !== 'hero' && item.enabled).map((item) => ({
    title: item.content.title,
    body: item.content.body,
  }))
  const page = {
    eyebrow: hero?.eyebrow || cms?.label || staticPage.eyebrow,
    title: hero?.title || staticPage.title,
    intro: hero?.body || staticPage.intro,
    blocks: cmsBlocks?.length ? cmsBlocks : staticPage.blocks,
  }
  const [active, setActive] = useState(0)
  const isAssembly = section === 'assembly-centre'
  const isProjects = section === 'projects'
  const enhancement = sectionContext[section]
  const EnhancementIcon = enhancement?.icon

  const activeAssembly = assemblyStages[active] ?? assemblyStages[0]
  const activeBlock = page.blocks[active] ?? page.blocks[0]

  const quickFacts = useMemo(() => {
    if (isAssembly) {
      return [
        t('6 coordinated delivery stages', '六个协调交付阶段', '6 étapes coordonnées'),
        t('Project-specific compliance', '项目专项合规', 'Conformité propre au projet'),
        t('Traceable handover evidence', '可追溯交付证据', 'Preuves de remise traçables'),
      ]
    }

    if (section === 'privacy') {
      return [
        t('Purpose-limited use', '限定目的使用', 'Utilisation limitée aux finalités'),
        t('Defined retention', '明确保留期限', 'Conservation définie'),
        t('Access and correction', '访问与更正', 'Accès et rectification'),
      ]
    }

    return [
      t('Clear responsibilities', '责任清晰', 'Responsabilités claires'),
      t('Evidence-based decisions', '基于证据的决策', 'Décisions fondées sur des preuves'),
      t('Qualified next action', '合格的下一步', 'Prochaine action qualifiée'),
    ]
  }, [isAssembly, section])

  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(45,130,176,.28),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-8xl gap-10 px-5 pb-16 pt-36 sm:px-8 lg:grid-cols-[1fr_0.42fr] lg:items-end lg:px-12 lg:pb-24 lg:pt-40">
          <div>
            <p className="eyebrow text-[#8dc8e8]">{localized(page.eyebrow, locale)}</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {localized(page.title, locale)}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">{localized(page.intro, locale)}</p>
          </div>

          <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
              {isAssembly ? common.select[locale] : t('What this page establishes', '本页面说明内容', 'Ce que cette page établit')[locale]}
            </p>
            <div className="mt-4 space-y-3">
              {quickFacts.map((fact, index) => (
                <div key={fact.en} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 text-sm font-semibold">
                  <span className="text-[#8dc8e8]">0{index + 1}</span>
                  <span>{fact[locale]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isProjects ? (
        <section className="bg-[#f4f1e9] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1760px]">
            <div className="flex flex-col gap-5 border-b border-black/15 pb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="premium-eyebrow">{t('Status-led portfolio', '状态导向项目组合', 'Portfolio guidé par le statut')[locale]}</p>
                <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-[#11191b] sm:text-5xl lg:text-6xl">
                  {t('A clear distinction between direction and delivered evidence.', '清晰区分项目方向与交付证据。', 'Une distinction claire entre orientation et preuves de livraison.')[locale]}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em]">
                <span className="border border-black/20 px-3 py-2">{t('Verified Project', '已核验项目', 'Projet vérifié')[locale]}</span>
                <span className="border border-black/20 px-3 py-2">{t('In Development', '开发中', 'En développement')[locale]}</span>
                <span className="bg-[#11191b] px-3 py-2 text-white">{t('Design Concept', '设计概念', 'Concept de design')[locale]}</span>
              </div>
            </div>

            <div className="mt-10 grid gap-x-5 gap-y-12 md:grid-cols-2">
              {conceptProjects.map((project, index) => (
                <article key={project.title.en} className={index % 3 === 0 ? 'md:col-span-2' : ''}>
                  <div className={`group relative overflow-hidden bg-[#11191b] ${index % 3 === 0 ? 'aspect-[1.75/1]' : 'aspect-[1.25/1]'}`}>
                    <Image src={project.image} alt={localized(project.title, locale)} fill quality={92} sizes={index % 3 === 0 ? '100vw' : '(max-width: 768px) 100vw, 50vw'} className="object-cover transition duration-700 ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/5 to-black/5" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                      <span className="inline-flex bg-[#f4f1e9] px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#11191b]">{t('Design Concept', '设计概念', 'Concept de design')[locale]}</span>
                      <div className="mt-4 flex items-end justify-between gap-5">
                        <div>
                          <h3 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{localized(project.title, locale)}</h3>
                          <p className="mt-2 text-sm text-white/66">{localized(project.meta, locale)}</p>
                        </div>
                        <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 sm:grid"><ArrowRight className="h-4 w-4" /></span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 grid gap-6 border-t border-black/15 pt-10 lg:grid-cols-[0.66fr_0.34fr] lg:items-end">
              <div>
                <p className="premium-eyebrow">{t('Evidence standard', '证据标准', 'Norme de preuve')[locale]}</p>
                <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{enhancement?.outcome[locale]}</h2>
              </div>
              <Link href={`/${locale}/contact`} className="premium-button-dark justify-self-start lg:justify-self-end">
                {localized(homeCopy.contactCta, locale)} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      ) : isAssembly ? (
        <section className="bg-[#f3f1e9] py-16 lg:py-24">
          <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
            <div className="max-w-4xl">
              <p className="eyebrow">{t('Interactive Delivery System', '互动交付体系', 'Système de livraison interactif')[locale]}</p>
              <h2 className="section-title">{t('Every stage has defined inputs, responsibilities, evidence and outcomes.', '每个阶段都有明确输入、责任、证明及成果。', 'Chaque étape comporte des intrants, responsabilités, preuves et résultats définis.')[locale]}</h2>
              <p className="section-copy">{common.select[locale]}</p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {assemblyStages.map((stage, index) => {
                const Icon = stage.icon
                const selected = active === index
                return (
                  <button
                    key={stage.key}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-pressed={selected}
                    className={`group rounded-[2rem] border p-6 text-left transition duration-300 sm:p-7 ${selected ? 'border-ink bg-ink text-white shadow-lift' : 'border-ink/10 bg-white text-ink hover:-translate-y-1 hover:border-ink/25 hover:shadow-soft'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`grid h-12 w-12 place-items-center rounded-2xl ${selected ? 'bg-white/10 text-[#8dc8e8]' : 'bg-[#e8efec] text-forest'}`}>
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className={`text-xs font-black tracking-[0.16em] ${selected ? 'text-white/45' : 'text-slate-400'}`}>{stage.key}</span>
                    </div>
                    <h3 className="mt-7 text-xl font-bold tracking-tight">{stage.title[locale]}</h3>
                    <p className={`mt-3 text-sm leading-7 ${selected ? 'text-white/62' : 'text-slate-600'}`}>{stage.summary[locale]}</p>
                    <span className={`mt-6 inline-flex items-center gap-2 text-xs font-bold ${selected ? 'text-[#8dc8e8]' : 'text-forest'}`}>
                      {t('View stage details', '查看阶段详情', 'Voir les détails')[locale]} <ChevronRight className="h-4 w-4" />
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 overflow-hidden rounded-[2.25rem] border border-ink/10 bg-white shadow-soft">
              <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
                <div className="bg-ink p-7 text-white sm:p-9">
                  <span className="text-xs font-black tracking-[0.18em] text-[#8dc8e8]">STAGE {activeAssembly.key}</span>
                  <h3 className="mt-5 text-3xl font-bold tracking-tight">{activeAssembly.title[locale]}</h3>
                  <p className="mt-5 text-sm leading-7 text-white/65">{activeAssembly.summary[locale]}</p>
                  <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">{common.outcome[locale]}</p>
                    <p className="mt-3 text-base font-semibold leading-7">{activeAssembly.outcome[locale]}</p>
                  </div>
                </div>

                <div className="grid gap-8 p-7 sm:p-9 md:grid-cols-2">
                  <div>
                    <h4 className="font-bold text-ink">{common.nexusCoordinates[locale]}</h4>
                    <List items={activeAssembly.coordinates} locale={locale} />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">{common.clientInputs[locale]}</h4>
                    <List items={activeAssembly.inputs} locale={locale} />
                  </div>
                  <div className="md:col-span-2 rounded-3xl bg-slate-50 p-6">
                    <h4 className="font-bold text-ink">{common.evidence[locale]}</h4>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {activeAssembly.documents.map((document) => (
                        <div key={document.en} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700">
                          <FileCheck2 className="mb-3 h-5 w-5 text-forest" />
                          {document[locale]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950">
              <strong>{t('Compliance note:', '合规说明：', 'Note de conformité :')[locale]}</strong> {common.projectSpecific[locale]}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
              <div>
                <p className="eyebrow">{t('Explore the Details', '探索详细内容', 'Explorer les détails')[locale]}</p>
                <h2 className="section-title">{t('Clear information. Useful next actions.', '信息清晰，行动明确。', 'Information claire. Actions utiles.')[locale]}</h2>
                <p className="section-copy">{t('Select a topic to understand what it means, what evidence supports it and how NEXUS moves it forward.', '选择主题，了解其含义、支持证据及 NEXUS 如何推进。', 'Sélectionnez un sujet pour comprendre sa signification, ses preuves et la façon dont NEXUS le fait avancer.')[locale]}</p>

                <div className="mt-7 space-y-3">
                  {page.blocks.map((block, index) => (
                    <button
                      key={localized(block.title, locale)}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm font-bold transition ${active === index ? 'border-ink bg-ink text-white' : 'border-ink/10 bg-white text-ink hover:border-ink/25'}`}
                    >
                      <span><span className="mr-3 opacity-45">{String(index + 1).padStart(2, '0')}</span>{localized(block.title, locale)}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-ink/10 bg-white p-7 shadow-soft sm:p-9">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e8efec] text-sm font-black text-forest">{String(active + 1).padStart(2, '0')}</span>
                <h3 className="mt-7 text-3xl font-bold tracking-tight text-ink">{localized(activeBlock.title, locale)}</h3>
                <p className="mt-4 text-base leading-8 text-slate-600">{localized(activeBlock.body, locale)}</p>

                {enhancement && (
                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-6">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-forest shadow-sm">
                          {EnhancementIcon && <EnhancementIcon className="h-5 w-5" />}
                        </span>
                        <h4 className="font-bold text-ink">{enhancement.heading[locale]}</h4>
                      </div>
                      <List items={enhancement.points} locale={locale} />
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-6">
                      <h4 className="font-bold text-ink">{common.evidence[locale]}</h4>
                      <List items={enhancement.evidence} locale={locale} />
                    </div>
                    <div className="md:col-span-2 rounded-3xl bg-ink p-6 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">{common.outcome[locale]}</p>
                      <p className="mt-3 text-lg font-semibold leading-8">{enhancement.outcome[locale]}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {section === 'contact' ? (
              <div className="mt-14 max-w-5xl">{businessToolsEnabled ? <BusinessIntakeWizard locale={locale} /> : <InquiryForm locale={locale} />}</div>
            ) : section !== 'privacy' ? (
              <div className="mt-14 rounded-[2.25rem] bg-ink p-8 text-white sm:p-10 lg:flex lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">{localized(homeCopy.ctaTitle, locale)}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/62">{localized(homeCopy.ctaBody, locale)}</p>
                </div>
                <Link href={`/${locale}/contact`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2b83b4] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 lg:mt-0">
                  {localized(homeCopy.contactCta, locale)} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      )}
    </main>
  )
}
