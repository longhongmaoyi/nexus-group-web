'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Factory,
  FileCheck2,
  Globe2,
  GraduationCap,
  HardHat,
  Home,
  Hotel,
  MapPinned,
  PackageCheck,
  Search,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'

import { InquiryForm } from '@/components/inquiry-form'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
type IconType = typeof Globe2

const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const copy = {
  heroEyebrow: t('Canada × Global Business Solutions', '加拿大 × 全球商业解决方案', 'Canada × Solutions d’affaires mondiales'),
  heroTitle1: t('Global Capability.', '全球能力。', 'Capacité mondiale.'),
  heroTitle2: t('Built for Canadian Business.', '服务加拿大商业。', 'Conçue pour les entreprises canadiennes.'),
  heroBody: t(
    'From modular infrastructure and global sourcing to digital transformation, NEXUS connects Canadian organizations with innovative international solutions and manages the path from discovery to local delivery.',
    '从模块化基础设施和全球寻源到数字化转型，NEXUS 把加拿大机构与全球创新方案连接起来，并管理从发现到本地交付的完整路径。',
    'De l’infrastructure modulaire à l’approvisionnement mondial et à la transformation numérique, NEXUS relie les organisations canadiennes aux solutions internationales et gère le parcours jusqu’à la livraison locale.',
  ),
  primaryCta: t('Start Your Project Assessment', '开始项目评估', 'Commencer l’évaluation du projet'),
  secondaryCta: t('Explore Our Solutions', '探索解决方案', 'Explorer nos solutions'),
  modelEyebrow: t('The NEXUS Business Model', 'NEXUS 商业模式', 'Le modèle NEXUS'),
  modelTitle: t('One accountable bridge from business need to operating solution.', '从业务需求到运营方案的一体化责任桥梁。', 'Un pont responsable du besoin d’affaires à la solution opérationnelle.'),
  sectorsEyebrow: t('Solutions by Operating Need', '按运营需求提供方案', 'Solutions selon le besoin opérationnel'),
  sectorsTitle: t('Choose the problem your organization needs to solve.', '选择您的机构需要解决的问题。', 'Choisissez le problème que votre organisation doit résoudre.'),
  processEyebrow: t('How We Deliver', '我们的交付方式', 'Notre approche'),
  processTitle: t('A structured six-stage delivery and evidence system.', '结构化六阶段交付与证明体系。', 'Un système structuré de livraison et de preuves en six étapes.'),
  complianceEyebrow: t('Canada Compliance Centre', '加拿大合规中心', 'Centre de conformité Canada'),
  complianceTitle: t('Understand the approval pathway before committing to a product.', '在决定产品之前先了解审批路径。', 'Comprendre le parcours d’approbation avant de choisir un produit.'),
  proofEyebrow: t('Evidence Before Claims', '先有证据，再做声明', 'Des preuves avant les affirmations'),
  proofTitle: t('Every opportunity is shown with a clear and honest status.', '每个机会都以清晰、真实的状态展示。', 'Chaque occasion est présentée avec un statut clair et honnête.'),
  assessmentEyebrow: t('Start With the Facts', '从事实开始', 'Commencer par les faits'),
  assessmentTitle: t('Tell us what your organization needs to build, improve or deploy.', '告诉我们您的机构需要建设、改进或部署什么。', 'Dites-nous ce que votre organisation doit construire, améliorer ou déployer.'),
}

const modelSteps: Array<{ icon: IconType; title: Localized; body: Localized }> = [
  { icon: Users, title: t('Canadian Business Need', '加拿大业务需求', 'Besoin d’affaires canadien'), body: t('A real operating, housing, infrastructure or digital challenge.', '真实的运营、住宿、基础设施或数字化挑战。', 'Un défi réel d’exploitation, de logement, d’infrastructure ou numérique.') },
  { icon: ClipboardCheck, title: t('NEXUS Assessment', 'NEXUS 评估', 'Évaluation NEXUS'), body: t('Location, use, capacity, site, budget, timeline and commercial model.', '地点、用途、容量、场地、预算、时间及合作模式。', 'Emplacement, usage, capacité, site, budget, échéancier et modèle commercial.') },
  { icon: Search, title: t('Global Discovery', '全球发现', 'Découverte mondiale'), body: t('Products, factories, technology, expertise and partnership options.', '产品、工厂、技术、专业能力及合作选择。', 'Produits, usines, technologies, expertise et options de partenariat.') },
  { icon: BadgeCheck, title: t('Verification', '核验', 'Vérification'), body: t('Capability, quality, documents, references and commercial risk.', '能力、质量、文件、案例及商业风险。', 'Capacité, qualité, documents, références et risques commerciaux.') },
  { icon: ShieldCheck, title: t('Canadian Adaptation', '加拿大本地化', 'Adaptation canadienne'), body: t('Qualified design, compliance, permitting and local delivery coordination.', '合格设计、合规、许可及本地交付协调。', 'Conception qualifiée, conformité, permis et coordination locale.') },
  { icon: Wrench, title: t('Delivery & Support', '交付与支持', 'Livraison et soutien'), body: t('Import, assembly, installation, commissioning, IT and lifecycle service.', '进口、组装、安装、调试、IT 及全生命周期服务。', 'Importation, assemblage, installation, mise en service, TI et soutien du cycle de vie.') },
]

const sectors: Array<{
  key: string
  icon: IconType
  title: Localized
  short: Localized
  headline: Localized
  description: Localized
  solutions: Localized[]
  approvals: Localized[]
  image: string
}> = [
  {
    key: 'mining', icon: HardHat,
    title: t('Remote Operations', '偏远运营', 'Opérations éloignées'),
    short: t('Mining, resources and remote construction', '采矿、资源及偏远施工', 'Mines, ressources et construction éloignée'),
    headline: t('Complete environments for teams working far from cities.', '为远离城市工作的团队打造完整环境。', 'Des environnements complets pour les équipes loin des villes.'),
    description: t('NEXUS coordinates accommodation, dining, sanitation, site offices, storage, utilities, connectivity and lifecycle support as one operational system.', 'NEXUS 将住宿、餐饮、卫生、现场办公室、仓储、公用系统、连接及生命周期支持整合为一个运营体系。', 'NEXUS coordonne l’hébergement, la restauration, les installations sanitaires, les bureaux, l’entreposage, les services, la connectivité et le soutien.'),
    solutions: [t('Workforce accommodation and camp facilities', '员工住宿与营地设施', 'Hébergement et installations de camp'), t('Site offices, storage and support buildings', '现场办公室、仓储及配套建筑', 'Bureaux, entreposage et bâtiments de soutien'), t('Connectivity, security and digital operations', '连接、安全及数字化运营', 'Connectivité, sécurité et opérations numériques')],
    approvals: [t('Land use, site and building review', '土地用途、场地及建筑审查', 'Examen du terrain, du site et du bâtiment'), t('Fire, occupancy, utilities and public-health requirements', '消防、占用、公用设施及公共卫生要求', 'Exigences incendie, occupation, services et santé publique'), t('Transportation, worker safety and inspection records', '运输、员工安全及检查记录', 'Transport, sécurité des travailleurs et inspections')],
    image: '/images/industrial.jpg',
  },
  {
    key: 'education', icon: GraduationCap,
    title: t('Education & Housing', '教育与住宿', 'Éducation et logement'),
    short: t('Student residences and institutional expansion', '学生公寓与机构扩建', 'Résidences étudiantes et expansion institutionnelle'),
    headline: t('Accommodation partnerships that let institutions focus on education.', '让教育机构专注教学的住宿合作方案。', 'Des partenariats de logement qui permettent aux établissements de se concentrer sur l’éducation.'),
    description: t('NEXUS can structure phased accommodation programs with schools, colleges, universities, landowners, investors and local delivery partners.', 'NEXUS 可与学校、学院、大学、土地所有者、投资方及本地伙伴共同构建分阶段住宿项目。', 'NEXUS peut structurer des programmes de logement par phases avec établissements, propriétaires, investisseurs et partenaires locaux.'),
    solutions: [t('Student residences and micro-apartments', '学生公寓与微型住宅', 'Résidences et micro-logements'), t('Shared kitchens, study and community spaces', '共享厨房、学习及社区空间', 'Cuisines, études et espaces communs'), t('Digital resident and facility-management systems', '数字化住户与设施管理系统', 'Systèmes numériques de gestion')],
    approvals: [t('Zoning, development and building review', '分区、开发及建筑审查', 'Zonage, développement et bâtiment'), t('Fire, accessibility and occupancy requirements', '消防、无障碍及占用要求', 'Incendie, accessibilité et occupation'), t('Institutional, tenancy, privacy and operating requirements', '机构、租赁、隐私及运营要求', 'Exigences institutionnelles, locatives et de confidentialité')],
    image: '/images/community.jpg',
  },
  {
    key: 'construction', icon: Building2,
    title: t('Construction Infrastructure', '施工基础设施', 'Infrastructure de construction'),
    short: t('Fast, relocatable support for project sites', '快速、可迁移的项目现场支持', 'Soutien rapide et relocalisable'),
    headline: t('Deploy site infrastructure without distracting the core project team.', '部署现场基础设施，不分散核心项目团队精力。', 'Déployer l’infrastructure sans détourner l’équipe du projet principal.'),
    description: t('Reusable offices, worker facilities, temporary accommodation, storage, access control and project technology can be delivered as one coordinated package.', '可重复使用的办公室、员工设施、临时住宿、仓储、门禁及项目技术可作为一个协调方案交付。', 'Bureaux réutilisables, installations, hébergement temporaire, entreposage, contrôle d’accès et technologie livrés comme un ensemble coordonné.'),
    solutions: [t('Relocatable site offices and meeting rooms', '可迁移现场办公室与会议室', 'Bureaux et salles relocalisables'), t('Worker welfare, storage and security units', '员工福利、仓储及安保单元', 'Unités de bien-être, stockage et sécurité'), t('Project portals, access control and connectivity', '项目门户、门禁及连接', 'Portails, contrôle d’accès et connectivité')],
    approvals: [t('Temporary-use and site permissions', '临时用途及场地许可', 'Autorisations temporaires et de site'), t('Building, fire, electrical and plumbing requirements', '建筑、消防、电气及给排水要求', 'Exigences bâtiment, incendie, électricité et plomberie'), t('Transport, lifting, safety and occupancy records', '运输、吊装、安全及占用记录', 'Transport, levage, sécurité et occupation')],
    image: '/images/industrial.jpg',
  },
  {
    key: 'commercial', icon: Hotel,
    title: t('Commercial Growth', '商业增长', 'Croissance commerciale'),
    short: t('Retail, food, office, tourism and hospitality', '零售、餐饮、办公、旅游及酒店', 'Commerce, restauration, bureaux et tourisme'),
    headline: t('Turn a business concept into a deployable operating space.', '把商业构想转化为可部署运营空间。', 'Transformer un concept d’affaires en espace opérationnel déployable.'),
    description: t('NEXUS connects modular spaces, equipment layouts, utilities, local installation and optional digital operating systems.', 'NEXUS 将模块化空间、设备布局、公用系统、本地安装及可选数字运营系统连接起来。', 'NEXUS relie espaces modulaires, équipements, services, installation locale et systèmes numériques.'),
    solutions: [t('Coffee, food and retail units', '咖啡、餐饮及零售单元', 'Unités café, restauration et commerce'), t('Offices, showrooms and hospitality cabins', '办公室、展厅及酒店小屋', 'Bureaux, salles d’exposition et cabines'), t('POS, booking, Wi-Fi and business automation', 'POS、预订、Wi-Fi 及商业自动化', 'PDV, réservation, Wi-Fi et automatisation')],
    approvals: [t('Business, zoning and building permissions', '商业、分区及建筑许可', 'Autorisations commerciales, zonage et bâtiment'), t('Fire, accessibility and occupancy requirements', '消防、无障碍及占用要求', 'Incendie, accessibilité et occupation'), t('Food, signage, equipment and utility approvals where applicable', '适用的食品、标识、设备及公用设施审批', 'Approbations alimentaires, affichage, équipement et services')],
    image: '/images/commercial.jpg',
  },
  {
    key: 'residential', icon: Home,
    title: t('Housing & Communities', '住房与社区', 'Logement et collectivités'),
    short: t('Modular living and community-use facilities', '模块化居住与社区设施', 'Habitation modulaire et installations communautaires'),
    headline: t('Adaptable living systems delivered through a managed Canadian pathway.', '通过受管理的加拿大路径交付适应性居住系统。', 'Des systèmes résidentiels adaptables livrés par un parcours canadien géré.'),
    description: t('NEXUS connects selected global systems with site review, Canadian professional coordination, import, assembly, installation and support.', 'NEXUS 将精选全球系统与场地审查、加拿大专业协调、进口、组装、安装及支持连接起来。', 'NEXUS relie les systèmes mondiaux sélectionnés à l’examen du site, aux professionnels canadiens, à l’importation, à l’assemblage et au soutien.'),
    solutions: [t('Small homes, cabins and backyard studios', '小型住宅、小屋及后院工作室', 'Petites maisons, chalets et studios'), t('Multi-unit and community-use concepts', '多单元及社区用途概念', 'Concepts multiunités et communautaires'), t('Smart-home, energy and facility systems', '智能家居、能源及设施系统', 'Maison intelligente, énergie et installations')],
    approvals: [t('Zoning, development and building permits', '分区、开发及建筑许可', 'Zonage, développement et permis'), t('Professional design, product conformity and utilities', '专业设计、产品符合性及公用设施', 'Conception, conformité du produit et services'), t('Inspections, occupancy, warranty and consumer requirements', '检查、占用、质保及消费者要求', 'Inspections, occupation, garantie et consommation')],
    image: '/images/modular-living.jpg',
  },
  {
    key: 'digital', icon: Code2,
    title: t('Digital Transformation', '数字化转型', 'Transformation numérique'),
    short: t('IT systems for projects and business operations', '项目及企业运营 IT 系统', 'Systèmes TI pour projets et opérations'),
    headline: t('Connect physical infrastructure with secure digital operations.', '把实体基础设施与安全数字化运营连接起来。', 'Relier l’infrastructure physique aux opérations numériques sécurisées.'),
    description: t('NEXUS provides websites, platforms, CRM, supplier portals, automation, cloud systems, AI workflows and managed technical support.', 'NEXUS 提供网站、平台、CRM、供应商门户、自动化、云系统、AI 工作流及托管技术支持。', 'NEXUS fournit sites, plateformes, CRM, portails fournisseurs, automatisation, nuage, IA et soutien géré.'),
    solutions: [t('Web platforms, portals and CRM', '网站平台、门户及 CRM', 'Plateformes web, portails et CRM'), t('Automation, cloud and AI-enabled workflows', '自动化、云及 AI 工作流', 'Automatisation, nuage et flux alimentés par l’IA'), t('Cybersecurity coordination and managed support', '网络安全协调及托管支持', 'Coordination cybersécurité et soutien géré')],
    approvals: [t('Privacy, consent and data-governance requirements', '隐私、同意及数据治理要求', 'Confidentialité, consentement et gouvernance'), t('Software licensing and intellectual-property controls', '软件许可及知识产权控制', 'Licences logicielles et propriété intellectuelle'), t('Accessibility, security and sector-specific records obligations', '无障碍、安全及行业记录义务', 'Accessibilité, sécurité et dossiers sectoriels')],
    image: '/images/hero.jpg',
  },
]

const deliveryStages: Array<{ icon: IconType; key: string; title: Localized; body: Localized; evidence: Localized }> = [
  { icon: ClipboardCheck, key: '01', title: t('Assess', '评估', 'Évaluer'), body: t('Define the problem, location, use, capacity, site, budget and outcome.', '明确问题、地点、用途、容量、场地、预算及成果。', 'Définir le problème, le lieu, l’usage, la capacité, le site, le budget et le résultat.'), evidence: t('Project brief and preliminary responsibility matrix', '项目简报与初步责任矩阵', 'Dossier de projet et matrice préliminaire') },
  { icon: Search, key: '02', title: t('Discover', '发现', 'Découvrir'), body: t('Identify suitable global products, factories, technology and expertise.', '识别合适的全球产品、工厂、技术及专业能力。', 'Identifier les produits, usines, technologies et expertises appropriés.'), evidence: t('Longlist, comparison and sourcing rationale', '候选清单、比较及寻源依据', 'Liste, comparaison et justification') },
  { icon: BadgeCheck, key: '03', title: t('Verify', '核验', 'Vérifier'), body: t('Review capability, quality, documents, references and commercial risk.', '审查能力、质量、文件、案例及商业风险。', 'Examiner capacité, qualité, documents, références et risques.'), evidence: t('Supplier and product verification record', '供应商与产品核验记录', 'Dossier de vérification') },
  { icon: ShieldCheck, key: '04', title: t('Canadianize', '加拿大本地化', 'Adapter au Canada'), body: t('Coordinate qualified design, product conformity, permits and local partners.', '协调合格设计、产品符合性、许可及本地伙伴。', 'Coordonner conception qualifiée, conformité, permis et partenaires locaux.'), evidence: t('Project-specific compliance and design dossier', '项目专项合规与设计档案', 'Dossier de conformité et conception') },
  { icon: Truck, key: '05', title: t('Deliver', '交付', 'Livrer'), body: t('Manage import, assembly, transport, installation, inspection and commissioning.', '管理进口、组装、运输、安装、检查及调试。', 'Gérer importation, assemblage, transport, installation, inspection et mise en service.'), evidence: t('Inspection, installation and commissioning records', '检查、安装及调试记录', 'Dossiers d’inspection, installation et mise en service') },
  { icon: Wrench, key: '06', title: t('Support', '支持', 'Soutenir'), body: t('Coordinate warranty, parts, maintenance, upgrades, IT and lifecycle service.', '协调质保、备件、维护、升级、IT 及生命周期服务。', 'Coordonner garantie, pièces, entretien, mises à niveau, TI et cycle de vie.'), evidence: t('Warranty, service and lifecycle register', '质保、服务及生命周期登记表', 'Registre de garantie, service et cycle de vie') },
]

const complianceCategories = [
  { icon: MapPinned, title: t('Land Use & Site', '土地用途与场地', 'Usage du sol et site'), body: t('Zoning, development, servicing, environmental and site-access considerations.', '分区、开发、市政服务、环境及场地通行因素。', 'Zonage, développement, services, environnement et accès.') },
  { icon: FileCheck2, title: t('Design Responsibility', '设计责任', 'Responsabilité de conception'), body: t('Qualified architecture and engineering for structure, climate loads, fire, energy and accessibility.', '合格建筑与工程审查结构、气候荷载、防火、能效及无障碍。', 'Architecture et ingénierie qualifiées pour structure, climat, incendie, énergie et accessibilité.') },
  { icon: PackageCheck, title: t('Product Conformity', '产品符合性', 'Conformité du produit'), body: t('Testing, certification marks, listings, factory records and field evaluation where permitted.', '检测、认证标志、名录、工厂记录及允许情况下的现场评估。', 'Essais, marques, inscriptions, dossiers d’usine et évaluations sur place.') },
  { icon: Globe2, title: t('Import & Transport', '进口与运输', 'Importation et transport'), body: t('Importer setup, customs, classification, origin, freight and oversize transport requirements.', '进口商设置、海关、归类、原产地、货运及超限运输要求。', 'Importateur, douanes, classement, origine, fret et transport hors gabarit.') },
  { icon: ShieldCheck, title: t('Permits & Inspections', '许可与检查', 'Permis et inspections'), body: t('Building, fire, electrical, plumbing, gas, occupancy and other project-specific reviews.', '建筑、消防、电气、给排水、燃气、占用及其他项目专项审查。', 'Bâtiment, incendie, électricité, plomberie, gaz, occupation et autres examens.') },
  { icon: CheckCircle2, title: t('Handover Evidence', '交付证明', 'Preuves de remise'), body: t('Issued permits, professional seals, inspection records, commissioning, warranties and manuals.', '已签发许可、专业盖章、检查记录、调试、质保及手册。', 'Permis, sceaux, inspections, mise en service, garanties et manuels.') },
]

const projectStatuses = [
  { title: t('Verified Projects', '已核验项目', 'Projets vérifiés'), body: t('Client-approved facts, scope, location, responsibilities, timeline and measurable results.', '客户认可的事实、范围、地点、责任、时间及可衡量成果。', 'Faits approuvés, portée, emplacement, responsabilités, échéancier et résultats.') },
  { title: t('Projects in Development', '开发中项目', 'Projets en développement'), body: t('Active opportunities with a clearly stated stage and no suggestion of completion.', '明确当前阶段的在推进机会，不暗示已完成。', 'Occasions actives avec une étape clairement indiquée, sans prétendre être terminées.') },
  { title: t('Design Concepts', '设计概念', 'Concepts de design'), body: t('Exploratory ideas visibly labelled as concepts—not presented as delivered NEXUS work.', '清晰标注为概念的探索性方案，不作为 NEXUS 已交付项目。', 'Idées exploratoires clairement identifiées comme concepts, non comme projets livrés.') },
]

export function HomePage({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]
  const [sectorIndex, setSectorIndex] = useState(0)
  const [stageIndex, setStageIndex] = useState(0)
  const activeSector = sectors[sectorIndex]
  const activeStage = deliveryStages[stageIndex]
  const SectorIcon = activeSector.icon
  const StageIcon = activeStage.icon

  return (
    <main>
      <section className="overflow-hidden bg-[#f4f6f7]">
        <div className="mx-auto grid min-h-[690px] max-w-8xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-12 lg:py-16">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.17em] text-ink shadow-sm">
              {localized(copy.heroEyebrow)}
            </span>
            <h1 className="mt-7 text-5xl font-semibold leading-[0.97] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[5.35rem]">
              <span className="block">{localized(copy.heroTitle1)}</span>
              <span className="block text-[#2b83b4]">{localized(copy.heroTitle2)}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">{localized(copy.heroBody)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-[#2b83b4] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#236f99]">
                {localized(copy.primaryCta)} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-bold text-ink transition hover:border-ink/35">
                {localized(copy.secondaryCta)}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[t('Global Network', '全球网络', 'Réseau mondial'), t('Verified Capability', '能力核验', 'Capacité vérifiée'), t('Canadian Coordination', '加拿大协调', 'Coordination canadienne'), t('Lifecycle Support', '生命周期支持', 'Soutien du cycle de vie')].map((item, index) => (
                <div key={item.en} className="rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
                  <span className="text-xs font-black text-[#2b83b4]">0{index + 1}</span>
                  <p className="mt-2 text-sm font-bold text-ink">{localized(item)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-ink shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image src={activeSector.image} alt={localized(activeSector.title)} fill priority quality={100} className="object-cover transition duration-700" sizes="(max-width: 1024px) 100vw, 48vw" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(7,27,43,.94)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.15em] text-[#8dc8e8]">
                  <SectorIcon className="h-5 w-5" /> {localized(activeSector.title)}
                </div>
                <h2 className="mt-4 max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">{localized(activeSector.headline)}</h2>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:absolute lg:-bottom-5 lg:-left-5 lg:right-5 lg:mt-0">
              {sectors.map((sector, index) => {
                const Icon = sector.icon
                return (
                  <button key={sector.key} type="button" onClick={() => setSectorIndex(index)} aria-label={localized(sector.title)} className={`grid min-h-14 place-items-center rounded-2xl border transition ${sectorIndex === index ? 'border-[#2b83b4] bg-[#2b83b4] text-white shadow-soft' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-ink'}`}>
                    <Icon className="h-5 w-5" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <p className="eyebrow text-[#8dc8e8]">{localized(copy.modelEyebrow)}</p>
            <h2 className="section-title text-white">{localized(copy.modelTitle)}</h2>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {modelSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title.en} className="relative rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                  <div className="flex items-center justify-between"><Icon className="h-6 w-6 text-[#8dc8e8]" /><span className="text-xs font-black text-white/30">0{index + 1}</span></div>
                  <h3 className="mt-6 text-lg font-bold">{localized(step.title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">{localized(step.body)}</p>
                  {index < modelSteps.length - 1 && <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 text-white/25 xl:block" />}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr]">
            <div>
              <p className="eyebrow">{localized(copy.sectorsEyebrow)}</p>
              <h2 className="section-title">{localized(copy.sectorsTitle)}</h2>
              <div className="mt-8 space-y-2">
                {sectors.map((sector, index) => {
                  const Icon = sector.icon
                  return (
                    <button key={sector.key} type="button" onClick={() => setSectorIndex(index)} className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${sectorIndex === index ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-white text-ink hover:border-slate-400'}`}>
                      <span className="flex items-center gap-3"><Icon className={`h-5 w-5 ${sectorIndex === index ? 'text-[#8dc8e8]' : 'text-forest'}`} /><span><strong className="block text-sm">{localized(sector.title)}</strong><span className={`mt-1 block text-xs ${sectorIndex === index ? 'text-white/50' : 'text-slate-500'}`}>{localized(sector.short)}</span></span></span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-slate-50">
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image src={activeSector.image} alt={localized(activeSector.title)} fill quality={100} className="object-cover" sizes="(max-width: 1024px) 100vw, 64vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"><span className="text-xs font-black uppercase tracking-[0.16em] text-[#8dc8e8]">{localized(activeSector.title)}</span><h3 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight">{localized(activeSector.headline)}</h3></div>
              </div>
              <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">
                <div><p className="text-base leading-8 text-slate-600">{localized(activeSector.description)}</p><Link href={`/${locale}/industries`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2b83b4]">{t('Explore sector pathway', '探索行业路径', 'Explorer le parcours sectoriel')[locale]} <ArrowRight className="h-4 w-4" /></Link></div>
                <div className="grid gap-4">
                  <div className="rounded-3xl bg-white p-5"><h4 className="text-sm font-bold text-ink">{t('Solution components', '方案组成', 'Composantes de solution')[locale]}</h4><ul className="mt-3 space-y-2">{activeSector.solutions.map((item) => <li key={item.en} className="flex gap-2 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-forest" />{localized(item)}</li>)}</ul></div>
                  <div className="rounded-3xl bg-white p-5"><h4 className="text-sm font-bold text-ink">{t('Approval areas to confirm', '需确认的审批领域', 'Domaines à confirmer')[locale]}</h4><ul className="mt-3 space-y-2">{activeSector.approvals.map((item) => <li key={item.en} className="flex gap-2 text-sm leading-6 text-slate-600"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#2b83b4]" />{localized(item)}</li>)}</ul></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f1e9] py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr]">
            <div>
              <p className="eyebrow">{localized(copy.processEyebrow)}</p>
              <h2 className="section-title">{localized(copy.processTitle)}</h2>
              <p className="section-copy">{t('Select a stage to see what happens and which evidence should exist before the project advances.', '选择阶段，了解推进前的工作与应有证明。', 'Sélectionnez une étape pour voir les actions et les preuves requises avant d’avancer.')[locale]}</p>
              <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3">
                {deliveryStages.map((stage, index) => <button key={stage.key} type="button" onClick={() => setStageIndex(index)} className={`rounded-2xl border px-3 py-3 text-xs font-black transition ${stageIndex === index ? 'border-ink bg-ink text-white' : 'border-ink/10 bg-white text-slate-500 hover:border-ink/30'}`}>{stage.key}</button>)}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.25rem] border border-ink/10 bg-white shadow-soft">
              <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
                <div className="bg-ink p-7 text-white sm:p-9"><StageIcon className="h-9 w-9 text-[#8dc8e8]" /><span className="mt-8 block text-xs font-black tracking-[0.17em] text-white/35">STAGE {activeStage.key}</span><h3 className="mt-3 text-4xl font-bold tracking-tight">{localized(activeStage.title)}</h3></div>
                <div className="p-7 sm:p-9"><p className="text-lg leading-8 text-slate-600">{localized(activeStage.body)}</p><div className="mt-7 rounded-3xl bg-slate-50 p-6"><p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">{t('Evidence before advancing', '推进前的证明', 'Preuves avant de progresser')[locale]}</p><p className="mt-3 font-bold leading-7 text-ink">{localized(activeStage.evidence)}</p></div><Link href={`/${locale}/assembly-centre`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#2b83b4]">{t('Open the full interactive delivery system', '打开完整互动交付体系', 'Ouvrir le système interactif complet')[locale]} <ArrowRight className="h-4 w-4" /></Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end"><div><p className="eyebrow text-[#8dc8e8]">{localized(copy.complianceEyebrow)}</p><h2 className="section-title text-white">{localized(copy.complianceTitle)}</h2></div><p className="max-w-3xl text-base leading-8 text-white/62">{t('NEXUS coordinates project-specific requirements through qualified professionals, certification organizations, licensed trades, municipalities and responsible authorities. Final requirements depend on jurisdiction, intended use, product configuration and site conditions.', 'NEXUS 通过合格专业人士、认证机构、持牌工种、市政部门及主管机构协调项目专项要求。最终要求取决于辖区、用途、产品配置及场地条件。', 'NEXUS coordonne les exigences propres au projet avec les professionnels, organismes de certification, métiers autorisés, municipalités et autorités responsables.')[locale]}</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{complianceCategories.map((item, index) => { const Icon = item.icon; return <div key={item.title.en} className="rounded-3xl border border-white/10 bg-white/[0.055] p-6"><div className="flex items-center justify-between"><Icon className="h-7 w-7 text-[#8dc8e8]" /><span className="text-xs font-black text-white/25">0{index + 1}</span></div><h3 className="mt-7 text-xl font-bold">{localized(item.title)}</h3><p className="mt-3 text-sm leading-7 text-white/58">{localized(item.body)}</p></div>})}</div>
          <div className="mt-8 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6 text-sm leading-7 text-amber-50"><strong>{t('Important:', '重要说明：', 'Important :')[locale]}</strong> {t('NEXUS manages and documents the pathway. Licences, permits, professional seals, certifications and inspection records are issued by the responsible qualified party or authority—not automatically by NEXUS.', 'NEXUS 管理并记录流程。执照、许可、专业盖章、认证及检查记录由相应合格方或主管机构签发，并非由 NEXUS 自动签发。', 'NEXUS gère et documente le parcours. Les licences, permis, sceaux, certifications et inspections sont délivrés par les parties ou autorités responsables.')[locale]}</div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl"><p className="eyebrow">{localized(copy.proofEyebrow)}</p><h2 className="section-title">{localized(copy.proofTitle)}</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">{projectStatuses.map((status, index) => <div key={status.title.en} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7"><span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-black ${index === 0 ? 'bg-emerald-100 text-emerald-800' : index === 1 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>0{index + 1}</span><h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">{localized(status.title)}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{localized(status.body)}</p></div>)}</div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">{[
            [Factory, t('Global manufacturers', '全球制造商', 'Fabricants mondiaux')],
            [FileCheck2, t('Canadian engineers', '加拿大工程师', 'Ingénieurs canadiens')],
            [BadgeCheck, t('Testing organizations', '检测机构', 'Organismes d’essai')],
            [Truck, t('Logistics partners', '物流伙伴', 'Partenaires logistiques')],
            [Wrench, t('Licensed trades', '持牌工种', 'Métiers autorisés')],
            [Code2, t('Technology partners', '技术伙伴', 'Partenaires technologiques')],
          ].map(([Icon, label]) => { const PartnerIcon = Icon as IconType; const partnerLabel = label as Localized; return <div key={partnerLabel.en} className="rounded-2xl border border-slate-200 bg-white p-4 text-center"><PartnerIcon className="mx-auto h-5 w-5 text-[#2b83b4]" /><p className="mt-3 text-xs font-bold text-slate-600">{localized(partnerLabel)}</p></div> })}</div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#f4f6f7] py-20 lg:py-28">
        <div className="mx-auto grid max-w-8xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.42fr_0.58fr] lg:px-12">
          <div><p className="eyebrow">{localized(copy.assessmentEyebrow)}</p><h2 className="section-title">{localized(copy.assessmentTitle)}</h2><p className="section-copy">{t('The guided intake captures sector, jurisdiction, site, capacity, budget, timeline and the preferred commercial model so the first conversation is useful.', '引导式表单收集行业、辖区、场地、容量、预算、时间及合作模式，使首次沟通更有效。', 'Le formulaire recueille secteur, juridiction, site, capacité, budget, échéancier et modèle commercial pour rendre la première conversation utile.')[locale]}</p><div className="mt-8 space-y-3">{[t('A qualified first conversation', '高质量首次沟通', 'Une première conversation qualifiée'), t('A preliminary project and compliance pathway', '初步项目与合规路径', 'Un parcours préliminaire de projet et conformité'), t('Clear next actions and responsibilities', '明确下一步与责任', 'Des prochaines étapes et responsabilités claires')].map((item) => <div key={item.en} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-bold text-ink shadow-sm"><CheckCircle2 className="h-5 w-5 text-forest" />{localized(item)}</div>)}</div></div>
          <InquiryForm locale={locale} />
        </div>
      </section>
    </main>
  )
}
