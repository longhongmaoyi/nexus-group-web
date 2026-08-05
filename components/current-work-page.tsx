import Link from 'next/link'
import { ArrowUpRight, Factory, Map, PackageCheck, Truck } from 'lucide-react'
import type { Locale } from '@/lib/i18n'

const t = (en: string, zh: string, fr: string) => ({ en, zh, fr })
const copy = {
  eyebrow: t('CURRENT WORK', '当前项目', 'TRAVAUX EN COURS'),
  title: t('We are currently delivering our first projects.', '我们目前正在交付首批项目。', 'Nous livrons actuellement nos premiers projets.'),
  intro: t('Here is how we work, and what we’re building right now. This page does not pretend that NEXUS Life has a long completed-project portfolio. It shows the current pipeline, the evidence we can publish and the work happening behind the scenes.', '这里说明我们的工作方式，以及目前正在建设什么。本页面不会假装 NEXUS Life 已拥有庞大的已完成项目作品集。它展示当前项目管线、可以公开的证据及幕后进行的工作。', 'Voici notre façon de travailler et ce que nous construisons actuellement. Cette page ne prétend pas que NEXUS Life possède un long portefeuille terminé. Elle présente le pipeline, les preuves publiables et le travail en coulisses.'),
  honesty: t('Concept images may explain a direction. They are never presented as completed client work. Client names, locations, contracts and project details are published only when confirmed and approved for public use.', '概念图片可以说明方向，但不会被当作已完成的客户项目。客户名称、地点、合同及项目详情只有在确认并获准公开后才会发布。', 'Les images conceptuelles peuvent expliquer une direction. Elles ne sont jamais présentées comme des travaux clients terminés. Les noms, lieux, contrats et détails ne sont publiés qu’après confirmation et autorisation.'),
  pipeline: t('Current project pipeline', '当前项目管线', 'Pipeline actuel'),
  behind: t('What we will publish behind the scenes', '我们将发布哪些幕后内容', 'Ce que nous publierons en coulisses'),
  cta: t('See How We Deliver', '查看交付方式', 'Voir notre approche'),
}
const pipeline = [
  [t('First-project coordination','首批项目协调','Coordination des premiers projets'), t('Current stage: active project coordination','当前阶段：项目协调进行中','Étape actuelle : coordination active'), t('Public details are limited while the client, location, scope and permissions are confirmed. The next publishable milestone will be a dated factory, shipping or site record.','在客户、地点、范围及许可确认期间，公开详情有限。下一个可发布节点将是带日期的工厂、运输或现场记录。','Les détails restent limités pendant la confirmation du client, du lieu, de la portée et des autorisations. Le prochain jalon sera un dossier daté d’usine, de transport ou de site.')],
  [t('Supplier and document review','供应商及文件审查','Examen fournisseur et documents'), t('Current stage: evidence and scope checks','当前阶段：证据及范围核查','Étape actuelle : vérification des preuves et de la portée'), t('We are organising supplier identity, drawings, specifications, test records, packing information, responsibilities and open questions.','我们正在整理供应商身份、图纸、规格、测试记录、包装信息、责任及待决问题。','Nous organisons l’identité du fournisseur, les plans, spécifications, essais, emballage, responsabilités et questions ouvertes.')],
  [t('Delivery and site planning','交付及场地规划','Planification de la livraison et du site'), t('Current stage: dependencies being mapped','当前阶段：正在梳理依赖关系','Étape actuelle : cartographie des dépendances'), t('Transport, receiving, storage, foundations, utilities, lifting, trades and inspection points are tracked as connected decisions.','运输、收货、储存、基础、公用设施、吊装、工种及检查点被作为相互关联的决策跟踪。','Transport, réception, stockage, fondations, services, levage, métiers et inspections sont suivis comme des décisions liées.')],
]
const behind = [
  [Factory,t('Factory visits','工厂访问','Visites d’usine'),t('Publishing next: dated photographs and notes on production areas, materials, quality records, drawing control, packing and loading.','即将发布：带日期的生产区域、材料、质量记录、图纸控制、包装及装载照片和说明。','À publier : photos datées et notes sur la production, les matériaux, la qualité, les plans, l’emballage et le chargement.')],
  [Truck,t('Shipping logistics','运输物流','Logistique d’expédition'),t('Publishing next: dimensions, weights, packing lists, loading sequence, damage prevention, route constraints and receiving plans.','即将发布：尺寸、重量、装箱单、装载顺序、防损、路线限制及收货计划。','À publier : dimensions, poids, listes, séquence de chargement, prévention des dommages, contraintes et réception.')],
  [Map,t('Site preparation','场地准备','Préparation du site'),t('Publishing next: site access, foundations, utilities, crane area, storage, local trades and inspection points.','即将发布：场地通行、基础、公用设施、吊车区域、储存、本地工种及检查点。','À publier : accès, fondations, services, zone de grue, stockage, métiers locaux et inspections.')],
  [PackageCheck,t('Handover evidence','移交证据','Preuves de remise'),t('Publishing when available: inspections, approved changes, manuals, warranties, parts, deficiencies and lessons learned.','在可用时发布：检查、获批变更、手册、质保、备件、缺陷及经验教训。','À publier lorsque disponible : inspections, changements, manuels, garanties, pièces, déficiences et leçons.')],
] as const

export function CurrentWorkPage({ locale }: { locale: Locale }) {
  const text = (value: Record<Locale,string>) => value[locale]
  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#11191b]">
      <section className="relative overflow-hidden bg-[#082328] pb-20 pt-40 text-white">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(45,130,176,.28),transparent_62%)]" />
        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p className="eyebrow text-[#b8d683]">{text(copy.eyebrow)}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{text(copy.title)}</h1>
          <p className="mt-7 max-w-4xl text-lg leading-8 text-white/72">{text(copy.intro)}</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="border-l-4 border-[#176b96] bg-white p-6 text-lg leading-8 text-slate-700 shadow-soft sm:p-8">{text(copy.honesty)}</div></section>
      <section className="border-y border-black/10 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1320px]"><p className="premium-eyebrow">{text(copy.pipeline)}</p><div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pipeline.map(([title,stage,body], index) => <article key={text(title)} className="border border-slate-200 bg-[#f8faf9] p-6"><span className="text-xs font-bold tracking-[0.18em] text-[#176b96]">{String(index+1).padStart(2,'0')}</span><h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">{text(title)}</h2><p className="mt-4 text-sm font-bold text-[#176b96]">{text(stage)}</p><p className="mt-4 leading-7 text-slate-600">{text(body)}</p></article>)}
        </div></div>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <p className="premium-eyebrow">{text(copy.behind)}</p><div className="mt-8 grid gap-5 md:grid-cols-2">
          {behind.map(([Icon,title,body]) => <article key={text(title)} className="border border-slate-200 bg-white p-6 sm:p-7"><Icon className="h-6 w-6 text-[#176b96]" /><h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{text(title)}</h2><p className="mt-4 leading-7 text-slate-600">{text(body)}</p></article>)}
        </div>
      </section>
      <section className="bg-[#082328] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto flex max-w-[1320px] flex-col gap-7 lg:flex-row lg:items-center lg:justify-between"><p className="max-w-4xl text-lg leading-8 text-white/72">{text(t('This page will be updated with approved photographs, dated milestones, delivery records, the exact role NEXUS performed and lessons learned. We will not fill the gap with invented case studies.','本页面将更新获准公开的照片、带日期的节点、交付记录、NEXUS 实际承担的角色及经验教训。我们不会用虚构案例填补空白。','Cette page sera mise à jour avec des photos autorisées, des jalons datés, des dossiers de livraison, le rôle exact de NEXUS et les leçons. Nous ne comblerons pas le vide par des cas inventés.'))}</p><Link href={`/${locale}/assembly-centre`} className="premium-button-light shrink-0">{text(copy.cta)}<ArrowUpRight className="h-4 w-4" /></Link></div></section>
    </main>
  )
}
