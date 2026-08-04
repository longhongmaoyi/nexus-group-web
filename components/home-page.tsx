'use client'

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Globe2,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react'

import { MotionProductCard } from '@/components/motion-product-card'
import type { CmsPageSnapshot } from '@/lib/cms-types'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
type RevealStyle = CSSProperties & { '--reveal-delay'?: string }

const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const copy = {
  heroEyebrow: t('Canada–Global Project Integration', '加拿大全球项目整合', 'Intégration de projets Canada–Monde'),
  heroTitle: t('Global Capability. Built for Canadian Business.', '全球能力，为加拿大企业而建。', 'Capacité mondiale. Conçue pour les entreprises canadiennes.'),
  heroBody: t(
    'NEXUS connects qualified global supply with Canadian coordination, compliance pathways, site delivery and long-term support.',
    'NEXUS 将优质全球供应能力与加拿大协调、合规路径、现场交付及长期支持相连接。',
    'NEXUS relie un approvisionnement mondial qualifié à la coordination canadienne, aux parcours de conformité, à la livraison et au soutien à long terme.',
  ),
  start: t('Start a Project', '启动项目', 'Démarrer un projet'),
  explore: t('Explore Solutions', '探索解决方案', 'Explorer les solutions'),
  solutionsEyebrow: t('Integrated Solution Platform', '一体化解决方案平台', 'Plateforme de solutions intégrées'),
  solutionsTitle: t('Built around the way your operation needs to work.', '围绕您的运营需求而打造。', 'Conçu selon les besoins réels de vos opérations.'),
  solutionsBody: t(
    'Six focused pathways connect modular environments, operational infrastructure and technology services to a controlled Canadian delivery process.',
    '六条专注路径，将模块化环境、运营基础设施及技术服务连接至受控的加拿大交付流程。',
    'Six parcours relient les environnements modulaires, les infrastructures opérationnelles et les services technologiques à une livraison canadienne maîtrisée.',
  ),
  storiesEyebrow: t('Application Stories', '应用场景', 'Scénarios d’application'),
  storiesTitle: t('A system is only valuable when it fits the site, the people and the operating brief.', '系统只有在适合场地、人员与运营要求时才真正有价值。', 'Un système n’a de valeur que s’il répond au site, aux personnes et au mandat opérationnel.'),
  processEyebrow: t('Coordinated Delivery', '协同交付', 'Livraison coordonnée'),
  processTitle: t('One accountable pathway from first brief to lifecycle support.', '从初步需求到全生命周期支持的一体化责任路径。', 'Un parcours responsable, du premier mandat au soutien du cycle de vie.'),
  projectsEyebrow: t('Project Portfolio', '项目组合', 'Portfolio de projets'),
  projectsTitle: t('Ideas are labelled honestly. Delivery evidence comes first.', '诚实标注构想，以交付证据为先。', 'Les idées sont clairement identifiées. Les preuves de livraison passent d’abord.'),
  projectsBody: t(
    'NEXUS distinguishes verified work, projects in development and design concepts so every portfolio claim can be understood in context.',
    'NEXUS 清晰区分已核验项目、开发中项目及设计概念，确保每项项目表述都有明确背景。',
    'NEXUS distingue les projets vérifiés, en développement et les concepts afin que chaque référence soit comprise dans son contexte.',
  ),
  viewProjects: t('Explore Projects', '探索项目', 'Explorer les projets'),
  finalTitle: t('Bring us the operating challenge.', '把您的运营挑战交给我们。', 'Confiez-nous votre défi opérationnel.'),
  finalBody: t(
    'We will help define the requirements, identify the right supply pathway and coordinate the next qualified step.',
    '我们将协助明确需求、识别合适的供应路径，并协调下一步合格行动。',
    'Nous vous aiderons à définir les exigences, choisir la bonne voie d’approvisionnement et coordonner la prochaine étape qualifiée.',
  ),
}

const heroLines: Record<Locale, string[]> = {
  en: ['Global Capability.', 'Built for Canadian Business.'],
  zh: ['全球能力。', '为加拿大企业而建。'],
  fr: ['Capacité mondiale.', 'Conçue pour les entreprises canadiennes.'],
}

// Restored from the pre-premium homepage hero in 3b4f0c6/41ad0b1.
const heroSlides = [
  {
    image: '/images/nexus-lakeside-community-hero-v1.jpg',
    label: t('Living together, naturally', '自然相伴，共同生活', 'Vivre ensemble, naturellement'),
  },
  {
    image: '/images/hero-slide-02.jpg',
    label: t('Spaces made for real life', '为真实生活打造的空间', 'Des espaces faits pour la vraie vie'),
  },
  {
    image: '/images/hero-slide-03.jpg',
    label: t('Modular design with a human heart', '以人为本的模块化设计', 'Un design modulaire profondément humain'),
  },
] as const

const HERO_AUTOPLAY_MS = 5000

const products = [
  {
    title: t('Modular Living', '模块化生活', 'Habitat modulaire'),
    description: t('Adaptable living environments for private, shared and destination settings.', '面向私人、共享及目的地场景的灵活生活空间。', 'Des espaces de vie adaptables aux contextes privés, partagés et de destination.'),
    facts: [t('Cabins, compact homes and multi-unit configurations', '小屋、紧凑型住宅及多单元配置', 'Chalets, habitations compactes et configurations multiunités'), t('Site, utilities and code pathway confirmed per project', '场地、公用设施及规范路径按项目确认', 'Site, services et parcours réglementaire confirmés par projet')],
    image: '/images/modular-living.jpg',
    href: 'products',
  },
  {
    title: t('Industrial & Remote Operations', '工业与偏远地区运营', 'Opérations industrielles et éloignées'),
    description: t('Coordinated environments for workforce accommodation and remote-site operations.', '面向劳动力住宿及偏远现场运营的协同空间。', 'Des environnements coordonnés pour l’hébergement des équipes et les opérations en régions éloignées.'),
    facts: [t('Accommodation, office and support-space planning', '住宿、办公及配套空间规划', 'Planification des logements, bureaux et espaces de soutien'), t('Capacity and logistics defined from the operating brief', '根据运营要求定义容量与物流', 'Capacité et logistique définies selon le mandat')],
    image: '/images/industrial.jpg',
    href: 'industries',
  },
  {
    title: t('Tourism & Hospitality', '旅游与酒店', 'Tourisme et hôtellerie'),
    description: t('Guest-focused modular environments shaped around the destination and service model.', '围绕目的地与服务模式打造以宾客为中心的模块化空间。', 'Des environnements modulaires centrés sur l’expérience client, adaptés à la destination et au modèle de service.'),
    facts: [t('Cabins, suites and shared amenity concepts', '小屋、套房及共享配套概念', 'Chalets, suites et concepts d’espaces communs'), t('Configuration and finishes selected for each project', '配置与饰面按项目选择', 'Configuration et finitions choisies pour chaque projet')],
    image: '/images/tourism.jpg',
    href: 'industries',
  },
  {
    title: t('Commercial Solutions', '商业解决方案', 'Solutions commerciales'),
    description: t('Compact, configurable spaces for customer service, retail and workplace use.', '面向客户服务、零售及办公用途的紧凑可配置空间。', 'Des espaces compacts et configurables pour le service, le commerce et le travail.'),
    facts: [t('Kiosk, office and modular workspace formats', '商业亭、办公室及模块化工作空间', 'Formats kiosque, bureau et espace de travail modulaire'), t('Brand, equipment and utility needs coordinated early', '前期协调品牌、设备及公用设施需求', 'Marque, équipements et services coordonnés en amont')],
    image: '/images/commercial.jpg',
    href: 'products',
  },
  {
    title: t('Community Infrastructure', '社区基础设施', 'Infrastructures communautaires'),
    description: t('Flexible environments planned for community, public-service and shared uses.', '面向社区、公共服务及共享用途规划的灵活空间。', 'Des environnements flexibles pour les usages communautaires, publics et partagés.'),
    facts: [t('Program and accessibility needs defined with stakeholders', '与利益相关方共同定义功能及无障碍需求', 'Programme et accessibilité définis avec les parties prenantes'), t('Authority and professional review remain project-specific', '主管机构及专业审查按项目进行', 'Examens des autorités et professionnels propres au projet')],
    image: '/images/community.jpg',
    href: 'industries',
  },
  {
    title: t('Technology Services', '技术服务', 'Services technologiques'),
    description: t('Digital coordination and operational tools that support the project and its lifecycle.', '支持项目及其全生命周期的数字化协调与运营工具。', 'Coordination numérique et outils opérationnels au service du projet et de son cycle de vie.'),
    facts: [t('Structured documents, workflows and project visibility', '结构化文件、工作流程及项目可视性', 'Documents structurés, flux de travail et visibilité du projet'), t('Services scoped to the client and operating environment', '服务范围依据客户及运营环境确定', 'Services définis selon le client et l’environnement opérationnel')],
    image: '/images/hero-slide-03.jpg',
    href: 'about',
  },
]

const stories = [
  {
    number: '01',
    title: t('Remote Workforce Camp', '偏远地区劳动力营地', 'Camp pour travailleurs en région éloignée'),
    body: t('A coordinated mix of accommodation, shared services and operational spaces can be shaped around headcount, rotation, location and site logistics.', '可根据人员规模、轮班制度、地点及现场物流，协调住宿、共享服务与运营空间的组合。', 'Un ensemble coordonné d’hébergement, de services partagés et d’espaces opérationnels peut être adapté aux effectifs, rotations, lieux et contraintes logistiques.'),
    facts: [t('Occupancy and room mix defined from the client brief', '入住规模及房型组合依据客户需求确定', 'Occupation et composition définies selon le mandat client'), t('Transport, foundations and utilities reviewed for the site', '针对场地审查运输、基础及公用设施', 'Transport, fondations et services examinés pour le site'), t('Compliance evidence coordinated with responsible parties', '与责任方协调合规证明', 'Preuves de conformité coordonnées avec les parties responsables')],
    image: '/images/project-workforce.jpg',
  },
  {
    number: '02',
    title: t('Modular Resort or Hospitality Unit', '模块化度假村或酒店单元', 'Unité modulaire de villégiature ou d’hôtellerie'),
    body: t('Guest units and shared amenities can be configured around the landscape, operating season, service model and desired guest experience.', '宾客单元与共享配套可围绕景观、运营季节、服务模式及预期宾客体验进行配置。', 'Les unités et espaces communs peuvent être configurés selon le paysage, la saison d’exploitation, le modèle de service et l’expérience recherchée.'),
    facts: [t('Unit planning responds to the destination concept', '单元规划响应目的地概念', 'Planification adaptée au concept de destination'), t('Material and finish selections remain project-specific', '材料与饰面选择按项目确定', 'Matériaux et finitions propres au projet'), t('Local planning and permit requirements are confirmed before delivery', '交付前确认当地规划及许可要求', 'Exigences locales de planification et permis confirmés avant livraison')],
    image: '/images/project-lake-hd-v1.jpg',
  },
  {
    number: '03',
    title: t('Commercial Kiosk or Modular Workspace', '商业亭或模块化工作空间', 'Kiosque commercial ou espace de travail modulaire'),
    body: t('A compact business space can bring together brand, customer flow, equipment, staff needs and service connections in one coordinated brief.', '紧凑型商业空间可在一个协同需求中整合品牌、客流、设备、员工需求及服务连接。', 'Un espace commercial compact peut réunir la marque, le parcours client, les équipements, les besoins du personnel et les raccordements dans un même mandat.'),
    facts: [t('Layout follows the intended operation and customer journey', '布局依据预期运营及客户动线', 'Aménagement fondé sur l’exploitation et le parcours client'), t('Equipment and utility loads are confirmed by the project team', '设备及公用设施负载由项目团队确认', 'Équipements et charges de services confirmés par l’équipe projet'), t('Signage, accessibility and approvals are location-specific', '标识、无障碍及审批要求因地点而异', 'Signalétique, accessibilité et approbations propres au lieu')],
    image: '/images/project-kiosk.jpg',
  },
]

const process = [
  { title: t('Assess', '评估', 'Évaluer'), body: t('Define the need, site, jurisdiction and responsibility map.', '明确需求、场地、司法辖区及责任矩阵。', 'Définir le besoin, le site, la juridiction et les responsabilités.'), icon: ClipboardCheck },
  { title: t('Source', '寻源', 'Approvisionner'), body: t('Identify and evaluate suitable systems and supply partners.', '识别并评估合适的系统与供应伙伴。', 'Identifier et évaluer les systèmes et partenaires adaptés.'), icon: Globe2 },
  { title: t('Import & Assemble', '进口与组装', 'Importer et assembler'), body: t('Coordinate logistics, receiving, assembly and quality records.', '协调物流、收货、组装及质量记录。', 'Coordonner la logistique, la réception, l’assemblage et les dossiers qualité.'), icon: Boxes },
  { title: t('Compliance', '合规', 'Conformité'), body: t('Coordinate project-specific reviews, documentation and approvals.', '协调项目专项审查、文件及审批。', 'Coordonner les examens, documents et approbations propres au projet.'), icon: ShieldCheck },
  { title: t('Install', '安装', 'Installer'), body: t('Plan site readiness, delivery, installation and handover.', '规划场地准备、交付、安装及移交。', 'Planifier le site, la livraison, l’installation et la remise.'), icon: Truck },
  { title: t('Support', '支持', 'Soutenir'), body: t('Maintain a clear channel for service and lifecycle records.', '建立清晰的服务及生命周期记录渠道。', 'Maintenir un canal clair pour le service et les dossiers du cycle de vie.'), icon: Wrench },
]

export function HomePage({ locale, cms }: { locale: Locale; cms?: CmsPageSnapshot | null }) {
  const localized = (value: Localized) => value[locale]
  const cmsSection = (key: string) => cms?.sections.find((section) => section.key === key && section.enabled)?.content
  const heroContent = cmsSection('hero')
  const categoryContent = cmsSection('categories')
  const featuredContent = cmsSection('featured')
  const closingContent = cmsSection('closing')
  const cmsImages = categoryContent?.items?.filter((item) => item.image).map((item) => item.image!) || []
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer: number | undefined

    const updateAutoplay = () => {
      if (timer) window.clearInterval(timer)
      if (reducedMotion.matches || heroPaused) return

      timer = window.setInterval(() => {
        setActiveHeroSlide((current) => (current + 1) % heroSlides.length)
      }, HERO_AUTOPLAY_MS)
    }

    updateAutoplay()
    reducedMotion.addEventListener('change', updateAutoplay)

    return () => {
      reducedMotion.removeEventListener('change', updateAutoplay)
      if (timer) window.clearInterval(timer)
    }
  }, [heroPaused])

  const changeHeroSlide = (next: number) => {
    setActiveHeroSlide((next + heroSlides.length) % heroSlides.length)
  }

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="overflow-hidden bg-[#f4f1e9] text-[#11191b]">
      <section
        className="relative flex min-h-[720px] items-end overflow-hidden bg-[#101719] text-white sm:min-h-[760px] lg:min-h-[680px]"
        role="region"
        aria-roledescription="carousel"
        aria-label={localized(t('NEXUS featured environments', 'NEXUS 精选环境', 'Environnements NEXUS en vedette'))}
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        onFocusCapture={() => setHeroPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHeroPaused(false)
        }}
      >
        {heroSlides.map((item, index) => (
          <Image
            key={item.image}
            src={item.image}
            alt={localized(item.label)}
            fill
            priority={index === 0}
            quality={95}
            sizes="100vw"
            aria-hidden={index !== activeHeroSlide}
            className={`object-cover object-[62%_center] transition-opacity duration-1000 ease-in-out lg:object-center ${
              index === activeHeroSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,14,16,.92)_0%,rgba(8,14,16,.7)_43%,rgba(8,14,16,.16)_76%),linear-gradient(180deg,rgba(8,14,16,.62)_0%,transparent_32%,rgba(8,14,16,.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/25" />

        <div className="relative mx-auto w-full max-w-[1760px] px-5 pb-9 pt-36 sm:px-8 sm:pb-11 lg:px-12 lg:pb-8 lg:pt-20">
          <div className="max-w-5xl" data-reveal>
            <p className="mb-6 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white/66">
              <span className="h-px w-10 bg-[#4ba3d3]" /> {localized(copy.heroEyebrow)}
            </p>
            <h1 className="max-w-[16ch] text-[clamp(3.2rem,6vw,6.5rem)] font-semibold leading-[0.91] tracking-[-0.065em]" aria-label={localized(copy.heroTitle)}>
              {heroLines[locale].map((line, index) => (
                <span key={line} className="mask-line" aria-hidden="true">
                  <span style={{ transitionDelay: `${120 + index * 110}ms` }}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">{localized(copy.heroBody)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="premium-button-light">{localized(copy.start)} <ArrowUpRight className="h-4 w-4" /></Link>
              <Link href={`/${locale}/products`} className="premium-button-ghost">{localized(copy.explore)} <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>

          <div className="absolute right-12 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
            <span className="text-xs font-bold">{String(activeHeroSlide + 1).padStart(2, '0')}</span>
            <div className="h-20 w-px bg-white/25">
              <div className="w-px bg-white transition-all duration-700" style={{ height: `${((activeHeroSlide + 1) / heroSlides.length) * 100}%` }} />
            </div>
            <span className="text-xs text-white/55">{String(heroSlides.length).padStart(2, '0')}</span>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => changeHeroSlide(activeHeroSlide - 1)}
                aria-label={localized(t('Previous hero image', '上一张主图', 'Image précédente'))}
                className="grid h-11 w-11 touch-manipulation place-items-center rounded-full border border-white/40 bg-black/10 transition hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => changeHeroSlide(activeHeroSlide + 1)}
                aria-label={localized(t('Next hero image', '下一张主图', 'Image suivante'))}
                className="grid h-11 w-11 touch-manipulation place-items-center rounded-full border border-white/40 bg-black/10 transition hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/22 pt-5 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-white/52">
            <span>Global Supply / Canadian Coordination</span>
            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => changeHeroSlide(activeHeroSlide - 1)}
                aria-label={localized(t('Previous hero image', '上一张主图', 'Image précédente'))}
                className="grid h-11 w-11 touch-manipulation place-items-center rounded-full border border-white/40 text-white transition hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <span aria-live="polite" className="min-w-9 text-center text-white/75">
                {activeHeroSlide + 1}/{heroSlides.length}
              </span>
              <button
                type="button"
                onClick={() => changeHeroSlide(activeHeroSlide + 1)}
                aria-label={localized(t('Next hero image', '下一张主图', 'Image suivante'))}
                className="grid h-11 w-11 touch-manipulation place-items-center rounded-full border border-white/40 text-white transition hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <a href="#solutions" className="hidden items-center gap-3 transition hover:text-white lg:flex">{localized(copy.explore)} <ArrowDown className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section id="solutions" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1760px]">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-end" data-reveal>
            <p className="premium-eyebrow">01 / {localized(copy.solutionsEyebrow)}</p>
            <div>
              <h2 className="premium-heading">{localized(copy.solutionsTitle)}</h2>
              <p className="premium-copy">{localized(copy.solutionsBody)}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-px bg-[#c8c6bf] md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <div key={product.title.en} data-reveal style={{ '--reveal-delay': `${Math.min(index, 2) * 80}ms` } as RevealStyle}>
                <MotionProductCard
                  number={String(index + 1).padStart(2, '0')}
                  title={localized(product.title)}
                  description={localized(product.description)}
                  facts={product.facts.map(localized)}
                  image={cmsImages[index] || product.image}
                  href={`/${locale}/${product.href}`}
                  cta={localized(t('View solution', '查看解决方案', 'Voir la solution'))}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#11191b] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1760px]">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]" data-reveal>
            <p className="premium-eyebrow text-[#75bfe8]">02 / {localized(copy.storiesEyebrow)}</p>
            <h2 className="premium-heading max-w-5xl text-white">{localized(copy.storiesTitle)}</h2>
          </div>

          <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
            {stories.map((story, index) => (
              <article key={story.number} className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16" data-reveal>
                <div className={`relative aspect-[1.36/1] overflow-hidden bg-black ${index % 2 ? 'lg:order-2' : ''}`}>
                  <Image src={story.image} alt={localized(story.title)} fill quality={92} sizes="(max-width: 1024px) 100vw, 50vw" className="story-image object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute left-5 top-5 border border-white/35 bg-black/20 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] backdrop-blur-sm">Application / {story.number}</span>
                </div>
                <div className={index % 2 ? 'lg:order-1 lg:pr-12' : 'lg:pl-2'}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#75bfe8]">{localized(t('Qualified solution profile', '合格解决方案概况', 'Profil de solution qualifié'))}</p>
                  <h3 className="mt-5 max-w-[16ch] text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl">{localized(story.title)}</h3>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/65">{localized(story.body)}</p>
                  <ul className="mt-8 divide-y divide-white/12 border-y border-white/12">
                    {story.facts.map((fact, factIndex) => (
                      <li key={fact.en} className="flex gap-4 py-4 text-sm leading-6 text-white/78">
                        <span className="text-[#75bfe8]">0{factIndex + 1}</span> {localized(fact)}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/contact`} className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white hover:text-[#75bfe8]">
                    {localized(copy.start)} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e7e5de] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1760px]">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-end" data-reveal>
            <p className="premium-eyebrow">03 / {localized(copy.processEyebrow)}</p>
            <div>
              <h2 className="premium-heading">{localized(copy.processTitle)}</h2>
              <Link href={`/${locale}/assembly-centre`} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#176b96] hover:text-[#11191b]">
                {localized(t('Explore delivery details', '探索交付详情', 'Explorer la livraison'))} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <ol className="delivery-timeline mt-14 grid gap-0 lg:mt-20 lg:grid-cols-6" data-reveal>
            {process.map((step, index) => {
              const Icon = step.icon
              return (
                <li key={step.title.en} className="relative border-l border-[#a7aaa6] pb-10 pl-8 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-7 lg:pt-10">
                  <span className="absolute -left-[5px] top-0 h-[9px] w-[9px] rounded-full bg-[#176b96] lg:-top-[5px] lg:left-0" />
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-[#176b96]" />
                    <span className="text-[0.65rem] font-bold tracking-[0.18em] text-black/35">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">{localized(step.title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/58">{localized(step.body)}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="bg-[#f4f1e9] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1760px] gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-20">
          <div data-reveal>
            <p className="premium-eyebrow">04 / {localized(copy.projectsEyebrow)}</p>
            <h2 className="premium-heading mt-6">{localized(copy.projectsTitle)}</h2>
            <p className="premium-copy">{localized(copy.projectsBody)}</p>
            <Link href={`/${locale}/projects`} className="premium-button-dark mt-8">{localized(copy.viewProjects)} <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <Link href={`/${locale}/projects`} className="group relative aspect-[1.3/1] overflow-hidden bg-[#11191b]" data-reveal>
            <Image src={featuredContent?.image || '/images/project-lake-hd-v1.jpg'} alt={localized(featuredContent?.title || t('Lakefront modular retreat design concept', '湖畔模块化度假区设计概念', 'Concept de retraite modulaire au bord du lac'))} fill quality={92} sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <span className="inline-flex bg-[#f4f1e9] px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#11191b]">{localized(t('Design Concept', '设计概念', 'Concept de design'))}</span>
              <div className="mt-4 flex items-end justify-between gap-6">
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.04em]">{localized(featuredContent?.title || t('Lakefront Modular Retreat', '湖畔模块化度假区', 'Retraite modulaire au bord du lac'))}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/65"><MapPin className="h-4 w-4" /> Canada / Proposed application</p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/35 transition group-hover:bg-white group-hover:text-black"><ArrowUpRight className="h-5 w-5" /></span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#176b96] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.2),transparent_62%)]" />
        <div className="relative mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-[0.66fr_0.34fr] lg:items-end" data-reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">NEXUS / Project Intake</p>
            <h2 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{localized(closingContent?.title || copy.finalTitle)}</h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-8 text-white/75">{localized(closingContent?.body || copy.finalBody)}</p>
            <Link href={`/${locale}/contact`} className="premium-button-light mt-8">{localized(copy.start)} <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
