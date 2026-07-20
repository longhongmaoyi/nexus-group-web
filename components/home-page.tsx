import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Factory,
  FileCheck2,
  Globe2,
  GraduationCap,
  Handshake,
  HardHat,
  Home,
  Hotel,
  MapPinned,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'

import { HeroSlideshow } from '@/components/hero-slideshow'
import { InquiryForm } from '@/components/inquiry-form'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
type IconType = typeof Globe2

const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const copy = {
  heroEyebrow: t('Canada × Global Innovation', '加拿大 × 全球创新', 'Canada × Innovation mondiale'),
  heroTitle1: t('Global Innovation.', '全球创新。', 'Innovation mondiale.'),
  heroTitle2: t('Canadian Execution.', '加拿大落地执行。', 'Exécution canadienne.'),
  heroBody: t(
    'NEXUS GROUP helps Canadian businesses, developers and institutions discover, evaluate, adapt and deploy innovative modular infrastructure, technology and business solutions from China and other global markets.',
    'NEXUS 集团帮助加拿大企业、开发商和机构从中国及其他全球市场发现、评估、本地化并落地创新的模块化基础设施、技术及商业解决方案。',
    'NEXUS GROUP aide les entreprises, promoteurs et institutions du Canada à découvrir, évaluer, adapter et déployer des solutions modulaires, technologiques et commerciales provenant de Chine et d’autres marchés mondiaux.',
  ),
  primaryCta: t('Start Your Assessment', '开始项目评估', 'Commencer l’évaluation'),
  secondaryCta: t('Explore Solutions', '探索解决方案', 'Explorer les solutions'),
  trust: [
    t('Global Resource Network', '全球资源网络', 'Réseau mondial'),
    t('Supplier & System Verification', '供应商与系统核验', 'Vérification des fournisseurs'),
    t('Project-Specific Compliance', '项目专项合规', 'Conformité propre au projet'),
    t('Canadian Delivery Support', '加拿大本地交付支持', 'Soutien à la livraison au Canada'),
  ],
  sectorsEyebrow: t('Who We Help', '我们服务的客户', 'Nos clients'),
  sectorsTitle: t('Business solutions designed around real operating needs.', '围绕真实运营需求设计的商业解决方案。', 'Des solutions conçues autour des besoins réels des opérations.'),
  sectorsBody: t(
    'We begin with the client’s business challenge—not with a product catalogue.',
    '我们从客户的业务挑战出发，而不是从产品目录出发。',
    'Nous partons du défi d’affaires du client, et non d’un simple catalogue.',
  ),
  processEyebrow: t('The NEXUS Delivery Model', 'NEXUS 交付模式', 'Le modèle de livraison NEXUS'),
  processTitle: t('From business problem to operating solution.', '从业务问题到可运营的解决方案。', 'Du problème d’affaires à une solution opérationnelle.'),
  processBody: t(
    'NEXUS serves as the coordination bridge between Canadian clients, global manufacturers, local professionals, logistics providers and project sites.',
    'NEXUS 是加拿大客户、全球制造商、本地专业人士、物流服务商与项目现场之间的协调桥梁。',
    'NEXUS agit comme pont de coordination entre les clients canadiens, les fabricants mondiaux, les professionnels locaux, la logistique et les sites de projet.',
  ),
  launchEyebrow: t('Recommended Launch Focus', '建议首发重点', 'Priorités de lancement'),
  launchTitle: t('Three clear solutions that demonstrate immediate value.', '三类能够立即体现价值的清晰解决方案。', 'Trois solutions claires qui démontrent une valeur immédiate.'),
  complianceEyebrow: t('Canada Compliance Centre', '加拿大合规中心', 'Centre de conformité Canada'),
  complianceTitle: t('A transparent pathway through requirements, documentation and approvals.', '清晰透明地协调要求、文件与审批流程。', 'Un parcours transparent à travers les exigences, les documents et les approbations.'),
  complianceBody: t(
    'NEXUS coordinates project-specific compliance through qualified Canadian professionals, testing and certification organizations, licensed trades, municipalities and responsible authorities. Requirements are confirmed according to jurisdiction, intended use, product configuration and site conditions.',
    'NEXUS 通过合格的加拿大专业人士、检测认证机构、持牌工种、市政部门及主管机构协调项目专项合规。具体要求依据司法辖区、预期用途、产品配置及现场条件确认。',
    'NEXUS coordonne la conformité propre à chaque projet avec des professionnels canadiens qualifiés, des organismes d’essai et de certification, des métiers autorisés, les municipalités et les autorités responsables.',
  ),
  complianceDisclaimer: t(
    'NEXUS manages and documents the pathway. Licences, permits, professional seals, certifications and inspection records are issued by the responsible qualified party or authority—not automatically by NEXUS.',
    'NEXUS 负责管理并记录流程。许可证、许可、专业盖章、认证及检查记录由相应的合格专业方或主管机构签发，并非由 NEXUS 自动签发。',
    'NEXUS gère et documente le parcours. Les licences, permis, sceaux professionnels, certifications et rapports d’inspection sont délivrés par la partie qualifiée ou l’autorité responsable.',
  ),
  platformEyebrow: t('Platform Roadmap', '平台路线图', 'Feuille de route'),
  platformTitle: t('The website becomes a project decision platform—not only a brochure.', '让网站成为项目决策平台，而不只是宣传册。', 'Le site devient une plateforme de décision de projet, pas seulement une brochure.'),
  projectsEyebrow: t('Project Evidence', '项目证据', 'Preuves de projet'),
  projectsTitle: t('Clear status. Verified information. Measurable results.', '状态清晰、信息可核验、结果可衡量。', 'Statut clair, information vérifiée et résultats mesurables.'),
  partnersEyebrow: t('Integrated Partner Ecosystem', '一体化合作生态', 'Écosystème intégré de partenaires'),
  partnersTitle: t('Global capability connected to Canadian responsibility.', '全球能力与加拿大本地责任体系相连接。', 'Capacité mondiale reliée à la responsabilité canadienne.'),
  assessmentEyebrow: t('Start With the Facts', '从事实开始', 'Commencer par les faits'),
  assessmentTitle: t('Tell us what your organization needs to build, improve or deploy.', '告诉我们您的机构需要建设、改进或部署什么。', 'Dites-nous ce que votre organisation doit construire, améliorer ou déployer.'),
  assessmentBody: t(
    'The guided intake captures the information required for a useful first review, including sector, jurisdiction, site, capacity, budget, timeline and commercial model.',
    '引导式表单收集首次有效评估所需的信息，包括行业、辖区、场地、容量、预算、时间及合作模式。',
    'Le formulaire guidé recueille les renseignements nécessaires à une première analyse utile : secteur, juridiction, site, capacité, budget, échéancier et modèle commercial.',
  ),
}

const sectors: Array<{ icon: IconType; title: Localized; body: Localized; needs: Localized }> = [
  {
    icon: HardHat,
    title: t('Mining & Remote Operations', '采矿与偏远运营', 'Mines et opérations éloignées'),
    body: t('Workforce camps, offices, dining, sanitation, storage, utilities and digital connectivity.', '工人营地、办公室、餐饮、卫生、仓储、公用系统及数字连接。', 'Camps de travailleurs, bureaux, restauration, installations sanitaires, entreposage et connectivité.'),
    needs: t('Keep remote teams safe, productive and supported.', '保障偏远团队安全、高效并获得持续支持。', 'Soutenir des équipes éloignées, sécuritaires et productives.'),
  },
  {
    icon: Building2,
    title: t('Construction', '建筑施工', 'Construction'),
    body: t('Relocatable site offices, worker facilities, temporary accommodation and project technology.', '可迁移现场办公室、工人设施、临时住宿及项目技术系统。', 'Bureaux de chantier relocalisables, installations pour travailleurs et technologies de projet.'),
    needs: t('Deploy infrastructure without distracting the core project team.', '部署配套基础设施，不分散核心项目团队精力。', 'Déployer l’infrastructure sans détourner l’équipe du projet principal.'),
  },
  {
    icon: GraduationCap,
    title: t('Education & Student Housing', '教育与学生住宿', 'Éducation et logement étudiant'),
    body: t('Student residences, micro-apartments, shared spaces and phased campus expansion.', '学生公寓、微型住宅、共享空间及分阶段校园扩建。', 'Résidences étudiantes, micro-logements, espaces communs et expansion par phases.'),
    needs: t('Help institutions solve accommodation pressure through partnerships.', '通过合作帮助教育机构缓解住宿压力。', 'Aider les établissements à répondre à la pression sur le logement.'),
  },
  {
    icon: Home,
    title: t('Residential Development', '住宅开发', 'Développement résidentiel'),
    body: t('Cabins, small homes, multi-unit concepts and adaptable living systems.', '小屋、小型住宅、多单元方案及可适应居住系统。', 'Chalets, petites maisons, concepts multiunités et systèmes résidentiels adaptables.'),
    needs: t('Create repeatable solutions with a managed delivery pathway.', '通过可管理的交付路径打造可复制方案。', 'Créer des solutions reproductibles avec un parcours de livraison géré.'),
  },
  {
    icon: Hotel,
    title: t('Commercial & Hospitality', '商业与酒店旅游', 'Commerce et hôtellerie'),
    body: t('Kiosks, retail units, modular offices, tourism cabins and operating technology.', '商业亭、零售单元、模块化办公室、旅游小屋及运营技术。', 'Kiosques, commerces, bureaux modulaires, unités touristiques et technologies d’exploitation.'),
    needs: t('Turn a business concept into a deployable operating space.', '把商业构想转化为可部署的运营空间。', 'Transformer un concept d’affaires en espace opérationnel déployable.'),
  },
  {
    icon: Code2,
    title: t('IT & Digital Transformation', 'IT 与数字化转型', 'TI et transformation numérique'),
    body: t('Web platforms, CRM, automation, cloud systems, AI workflows and managed support.', '网站平台、CRM、自动化、云系统、AI 工作流及托管支持。', 'Plateformes web, CRM, automatisation, nuage, flux d’IA et soutien géré.'),
    needs: t('Connect physical projects with secure digital operations.', '把实体项目与安全的数字化运营连接起来。', 'Relier les projets physiques à des opérations numériques sécurisées.'),
  },
]

const process: Array<{ icon: IconType; key: string; title: Localized; body: Localized }> = [
  { icon: ClipboardCheck, key: '01', title: t('Assess', '评估', 'Évaluer'), body: t('Define the business problem, site, capacity, budget and target outcome.', '明确业务问题、场地、容量、预算及目标成果。', 'Définir le problème, le site, la capacité, le budget et le résultat visé.') },
  { icon: Search, key: '02', title: t('Source', '寻源', 'Rechercher'), body: t('Identify suitable global products, factories, systems and technology partners.', '识别合适的全球产品、工厂、系统及技术伙伴。', 'Identifier les produits, usines, systèmes et partenaires technologiques adaptés.') },
  { icon: BadgeCheck, key: '03', title: t('Verify', '核验', 'Vérifier'), body: t('Review capability, quality, documentation, references and commercial risk.', '审查能力、质量、文件、案例及商业风险。', 'Examiner la capacité, la qualité, les documents, les références et les risques.') },
  { icon: ShieldCheck, key: '04', title: t('Canadianize', '加拿大本地化', 'Adapter au Canada'), body: t('Coordinate project-specific design, compliance and qualified local partners.', '协调项目专项设计、合规及合格本地伙伴。', 'Coordonner la conception, la conformité et les partenaires locaux qualifiés.') },
  { icon: Truck, key: '05', title: t('Deliver', '交付', 'Livrer'), body: t('Manage import, logistics, assembly, installation and commissioning.', '管理进口、物流、组装、安装及调试。', 'Gérer l’importation, la logistique, l’assemblage, l’installation et la mise en service.') },
  { icon: Wrench, key: '06', title: t('Support', '支持', 'Soutenir'), body: t('Coordinate warranties, spare parts, IT, service and lifecycle support.', '协调质保、备件、IT、服务及全生命周期支持。', 'Coordonner les garanties, pièces, TI, services et soutien du cycle de vie.') },
]

const launchSolutions = [
  {
    image: '/images/hero-slide-02.jpg',
    title: t('Remote Workforce Infrastructure', '偏远员工基础设施', 'Infrastructure pour main-d’œuvre éloignée'),
    body: t('Integrated accommodation, site offices and supporting facilities for mining, construction and remote operations.', '面向采矿、建筑和偏远运营的一体化住宿、现场办公室及配套设施。', 'Hébergement, bureaux et installations intégrés pour les mines, la construction et les opérations éloignées.'),
  },
  {
    image: '/images/hero-slide-03.jpg',
    title: t('Student Accommodation Partnerships', '学生住宿合作项目', 'Partenariats de logement étudiant'),
    body: t('Phased housing programs developed with institutions, landowners, investors and local delivery partners.', '与教育机构、土地所有者、投资方及本地交付伙伴共同开发分阶段住宿项目。', 'Programmes de logement par phases avec établissements, propriétaires, investisseurs et partenaires locaux.'),
  },
  {
    image: '/images/hero-slide-01.jpg',
    title: t('Commercial Deployment Kits', '商业快速部署方案', 'Solutions commerciales déployables'),
    body: t('Configurable kiosks, retail spaces, offices, hospitality units and optional digital operating systems.', '可配置商业亭、零售空间、办公室、酒店单元及可选数字运营系统。', 'Kiosques, commerces, bureaux, unités d’hôtellerie et systèmes numériques configurables.'),
  },
]

const complianceAreas: Array<{ icon: IconType; title: Localized; body: Localized }> = [
  { icon: BriefcaseBusiness, title: t('Business & Operating Authority', '商业与运营许可', 'Autorité commerciale'), body: t('Corporate registration, tax, insurance, contracts, local licences and sector-specific permissions.', '公司注册、税务、保险、合同、本地执照及行业专项许可。', 'Immatriculation, fiscalité, assurance, contrats, licences locales et autorisations sectorielles.') },
  { icon: Globe2, title: t('Import & Customs', '进口与海关', 'Importation et douanes'), body: t('Importer setup, tariff classification, origin, customs records and product-specific import requirements.', '进口商设置、税则归类、原产地、海关记录及产品专项进口要求。', 'Configuration de l’importateur, classement tarifaire, origine, dossiers douaniers et exigences propres au produit.') },
  { icon: PackageCheck, title: t('Product Conformity', '产品符合性', 'Conformité du produit'), body: t('Applicable testing, certification marks, factory records, material reports and manuals.', '适用检测、认证标志、工厂记录、材料报告及说明书。', 'Essais applicables, marques de certification, dossiers d’usine, rapports de matériaux et manuels.') },
  { icon: FileCheck2, title: t('Canadian Design Responsibility', '加拿大设计责任', 'Responsabilité de conception'), body: t('Qualified review for structure, climate loads, fire, energy, accessibility, foundations and site conditions.', '针对结构、气候荷载、防火、能效、无障碍、基础及现场条件的合格审查。', 'Examen qualifié de la structure, des charges climatiques, du feu, de l’énergie, de l’accessibilité et du site.') },
  { icon: MapPinned, title: t('Site & Municipal Approvals', '场地与市政审批', 'Approbations du site'), body: t('Zoning, development, building, servicing, environmental, transport, fire and occupancy reviews as applicable.', '根据项目需要进行分区、开发、建筑、市政服务、环境、运输、消防及占用审查。', 'Zonage, développement, bâtiment, services, environnement, transport, incendie et occupation selon le projet.') },
  { icon: CheckCircle2, title: t('Inspection & Handover Dossier', '检查与交付档案', 'Inspection et remise'), body: t('Issued permits, professional seals, inspection records, commissioning, warranties and operating manuals.', '已签发许可、专业盖章、检查记录、调试、质保及运营手册。', 'Permis délivrés, sceaux professionnels, inspections, mise en service, garanties et manuels.') },
]

const platformModules = [
  t('Canada Compliance Centre', '加拿大合规中心', 'Centre de conformité Canada'),
  t('Project Intake Wizard', '项目引导表单', 'Assistant d’admission de projet'),
  t('Landed-Cost & Timeline Estimator', '落地成本与时间估算器', 'Estimateur de coût rendu et d’échéancier'),
  t('Verified Document Library', '核验文件资料库', 'Bibliothèque de documents vérifiés'),
  t('Canadian Partner Directory', '加拿大合作伙伴目录', 'Répertoire de partenaires canadiens'),
  t('Verified Projects & Case Studies', '核验项目与案例研究', 'Projets vérifiés et études de cas'),
]

const projectStatuses = [
  { label: t('Verified Projects', '已核验项目', 'Projets vérifiés'), body: t('Real client-approved scope, location, specifications, responsibilities, timeline and results.', '经客户认可的真实范围、地点、规格、责任、时间及成果。', 'Portée, emplacement, spécifications, responsabilités, échéancier et résultats approuvés.') },
  { label: t('Projects in Development', '开发中项目', 'Projets en développement'), body: t('Active opportunities with a clearly stated stage and no suggestion of completion.', '明确标注当前阶段的在推进机会，不暗示已经完成。', 'Occasions actives avec une étape clairement indiquée, sans laisser croire à leur achèvement.') },
  { label: t('Design Concepts', '设计概念', 'Concepts de design'), body: t('Exploratory ideas visibly labelled as concepts, not presented as delivered work.', '清晰标注为概念的探索性方案，不作为已交付项目展示。', 'Idées exploratoires clairement identifiées comme concepts et non comme projets livrés.') },
]

const partners = [
  { icon: Factory, label: t('Global manufacturers', '全球制造商', 'Fabricants mondiaux') },
  { icon: FileCheck2, label: t('Canadian engineers & architects', '加拿大工程师与建筑师', 'Ingénieurs et architectes canadiens') },
  { icon: BadgeCheck, label: t('Testing & certification organizations', '检测与认证机构', 'Organismes d’essai et de certification') },
  { icon: Truck, label: t('Logistics & transportation partners', '物流与运输伙伴', 'Partenaires logistiques et transport') },
  { icon: Wrench, label: t('Licensed contractors & trades', '持牌承包商与工种', 'Entrepreneurs et métiers autorisés') },
  { icon: Code2, label: t('Technology & IT partners', '技术与 IT 伙伴', 'Partenaires technologiques et TI') },
]

export function HomePage({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]

  return (
    <main>
      <section className="relative min-h-[720px] overflow-hidden bg-ink text-white">
        <HeroSlideshow />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,27,43,.98)_0%,rgba(7,27,43,.9)_40%,rgba(7,27,43,.45)_68%,rgba(7,27,43,.2)_100%)]" />
        <div className="relative mx-auto flex min-h-[720px] max-w-8xl flex-col justify-between px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-[780px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
              <Sparkles className="h-4 w-4" /> {localized(copy.heroEyebrow)}
            </span>
            <h1 className="mt-7 text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-[5.35rem]">
              <span className="block">{localized(copy.heroTitle1)}</span>
              <span className="block text-white/88">{localized(copy.heroTitle2)}</span>
            </h1>
            <p className="mt-7 max-w-[720px] text-base leading-8 text-white/72 sm:text-lg">{localized(copy.heroBody)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-[#26688f] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1e5879]">
                {localized(copy.primaryCta)} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink">
                {localized(copy.secondaryCta)}
              </Link>
            </div>
          </div>

          <div className="mt-14 grid overflow-hidden rounded-3xl border border-white/15 bg-black/25 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
            {copy.trust.map((item, index) => {
              const icons = [Globe2, BadgeCheck, ShieldCheck, Truck]
              const Icon = icons[index]
              return (
                <div key={item.en} className="flex items-center gap-3 border-white/15 px-5 py-5 sm:border-r last:border-r-0">
                  <Icon className="h-6 w-6 text-[#a8c36b]" />
                  <span className="text-sm font-semibold">{localized(item)}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="industries" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="eyebrow">{localized(copy.sectorsEyebrow)}</p>
            <h2 className="section-title">{localized(copy.sectorsTitle)}</h2>
            <p className="section-copy">{localized(copy.sectorsBody)}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sectors.map((sector) => {
              const Icon = sector.icon
              return (
                <article key={sector.title.en} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#26688f]/30 hover:shadow-lift">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eef5f8] text-[#26688f]"><Icon className="h-6 w-6" /></span>
                    <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#26688f]" />
                  </div>
                  <h3 className="mt-7 text-xl font-bold tracking-tight text-ink">{localized(sector.title)}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#26688f]">{localized(sector.needs)}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{localized(sector.body)}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="delivery" className="relative overflow-hidden bg-ink py-20 text-white lg:py-28">
        <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#26688f]/25 blur-3xl" />
        <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="eyebrow text-[#a8c36b]">{localized(copy.processEyebrow)}</p>
              <h2 className="section-title text-white">{localized(copy.processTitle)}</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/65 lg:justify-self-end">{localized(copy.processBody)}</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {process.map((step) => {
              const Icon = step.icon
              return (
                <article key={step.key} className="rounded-3xl border border-white/12 bg-white/[0.055] p-6 backdrop-blur transition hover:bg-white/[0.09]">
                  <div className="flex items-center justify-between"><Icon className="h-7 w-7 text-[#a8c36b]" /><span className="text-xs font-bold text-white/35">{step.key}</span></div>
                  <h3 className="mt-8 text-lg font-bold">{localized(step.title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">{localized(step.body)}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="solutions" className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="eyebrow">{localized(copy.launchEyebrow)}</p>
            <h2 className="section-title">{localized(copy.launchTitle)}</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {launchSolutions.map((solution, index) => (
              <article key={solution.title.en} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={solution.image} alt={localized(solution.title)} fill quality={100} className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.13em] text-white backdrop-blur">0{index + 1}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold tracking-tight text-ink">{localized(solution.title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{localized(solution.body)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="compliance" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">{localized(copy.complianceEyebrow)}</p>
              <h2 className="section-title">{localized(copy.complianceTitle)}</h2>
              <p className="section-copy">{localized(copy.complianceBody)}</p>
              <div className="mt-7 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
                <strong className="block">Important</strong>
                <span className="mt-1 block">{localized(copy.complianceDisclaimer)}</span>
              </div>
              <Link href={`/${locale}/assembly-centre`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#26688f]">
                {localized(t('View the delivery process', '查看交付流程', 'Voir le processus de livraison'))} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {complianceAreas.map((area, index) => {
                const Icon = area.icon
                return (
                  <article key={area.title.en} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#26688f] shadow-sm"><Icon className="h-5 w-5" /></span><span className="text-xs font-black text-slate-300">0{index + 1}</span></div>
                    <h3 className="mt-6 text-lg font-bold text-ink">{localized(area.title)}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{localized(area.body)}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="eyebrow">{localized(copy.platformEyebrow)}</p>
              <h2 className="section-title">{localized(copy.platformTitle)}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {platformModules.map((module, index) => (
                <div key={module.en} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eef5f8] text-xs font-black text-[#26688f]">{index + 1}</span>
                  <span className="text-sm font-bold text-ink">{localized(module)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="eyebrow">{localized(copy.projectsEyebrow)}</p>
            <h2 className="section-title">{localized(copy.projectsTitle)}</h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {projectStatuses.map((item, index) => (
              <article key={item.label.en} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className={`inline-flex rounded-full px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.13em] ${index === 0 ? 'bg-emerald-50 text-emerald-800' : index === 1 ? 'bg-blue-50 text-blue-800' : 'bg-slate-100 text-slate-700'}`}>{localized(item.label)}</span>
                <p className="mt-6 text-sm leading-7 text-slate-600">{localized(item.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="bg-ink py-20 text-white lg:py-24">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="eyebrow text-[#a8c36b]">{localized(copy.partnersEyebrow)}</p>
              <h2 className="section-title text-white">{localized(copy.partnersTitle)}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => {
                const Icon = partner.icon
                return (
                  <div key={partner.label.en} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                    <Icon className="h-5 w-5 shrink-0 text-[#a8c36b]" />
                    <span className="text-sm font-semibold text-white/80">{localized(partner.label)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="assessment" className="bg-cream py-20 lg:py-28">
        <div className="mx-auto grid max-w-8xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:px-12">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">{localized(copy.assessmentEyebrow)}</p>
            <h2 className="section-title">{localized(copy.assessmentTitle)}</h2>
            <p className="section-copy">{localized(copy.assessmentBody)}</p>
            <div className="mt-8 space-y-3">
              {[t('A qualified first conversation', '高质量的首次沟通', 'Une première conversation qualifiée'), t('A preliminary project pathway', '初步项目路径', 'Un parcours préliminaire'), t('Clear next actions and responsibilities', '清晰的下一步与责任', 'Des prochaines étapes et responsabilités claires')].map((item) => (
                <div key={item.en} className="flex items-center gap-3 text-sm font-semibold text-slate-700"><CheckCircle2 className="h-5 w-5 text-forest" />{localized(item)}</div>
              ))}
            </div>
          </div>
          <InquiryForm locale={locale} />
        </div>
      </section>
    </main>
  )
}
