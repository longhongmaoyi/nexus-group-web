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
  heroEyebrow: t('Modular construction coordination in Canada', '加拿大模块化建设协调', 'Coordination de construction modulaire au Canada'),
  heroTitle: t('From factory planning to a working Canadian site.', '从工厂规划到可投入使用的加拿大现场。', 'De la planification en usine à un site canadien opérationnel.'),
  heroBody: t(
    'NEXUS Life helps buyers plan and coordinate modular workforce camps, commercial kiosks, multi-unit buildings and remote-site facilities. We connect supplier information, shipping, site preparation, assembly and local project requirements. We do not replace architects, engineers, inspectors or licensed trades.',
    'NEXUS Life 帮助买家规划及协调模块化工人营地、商业售卖亭、多单元建筑及偏远场地设施。我们连接供应商信息、运输、场地准备、组装及本地项目要求。我们不会取代建筑师、工程师、检查人员或持牌工种。',
    'NEXUS Life aide les acheteurs à planifier et coordonner des camps de travailleurs, kiosques commerciaux, bâtiments multiunités et installations éloignées. Nous relions les renseignements fournisseurs, le transport, le site, l’assemblage et les exigences locales. Nous ne remplaçons pas les architectes, ingénieurs, inspecteurs ou métiers autorisés.',
  ),
  start: t('Discuss a Project', '讨论项目', 'Discuter d’un projet'),
  bookCall: t('Book a 15-min Call', '预约 15 分钟通话', 'Réserver un appel de 15 min'),
  explore: t('Explore Solutions', '探索解决方案', 'Explorer les solutions'),
  solutionsEyebrow: t('Start with what the building must do', '从建筑需要完成的任务开始', 'Commencer par la fonction du bâtiment'),
  solutionsTitle: t('Start with what the building must do.', '先明确建筑需要完成什么任务。', 'Commencez par ce que le bâtiment doit accomplir.'),
  solutionsBody: t(
    'A modular project should begin with the people, operation, site and delivery constraints—not a product catalogue. Choose the project type closest to your need. Each section explains the questions that must be answered before reliable pricing can begin.',
    '模块化项目应从人员、运营、场地及交付限制开始，而不是从产品目录开始。选择最接近您需求的项目类型。每个部分都会说明在可靠报价开始前必须回答的问题。',
    'Un projet modulaire doit commencer par les personnes, l’exploitation, le site et les contraintes de livraison, pas par un catalogue. Choisissez le type le plus proche de votre besoin. Chaque section explique les questions à régler avant un prix fiable.',
  ),
  storiesEyebrow: t('How the operating brief changes the answer', '运营简报如何改变方案', 'Comment le dossier d’exploitation change la réponse'),
  storiesTitle: t('The same modular system will not suit every site—or every operator.', '同一套模块化系统不会适合所有场地或所有运营方。', 'Le même système modulaire ne convient pas à tous les sites ni à tous les exploitants.'),
  processEyebrow: t('How the work moves', '工作如何推进', 'Comment le travail avance'),
  processTitle: t('Six clear steps from the first brief to handover.', '从首次简报到移交的六个清晰步骤。', 'Six étapes claires, du premier dossier à la remise.'),
  projectsEyebrow: t('Current Work', '当前项目', 'Travaux en cours'),
  projectsTitle: t('We are delivering our first projects—and showing the work honestly.', '我们正在交付首批项目，并如实展示工作。', 'Nous livrons nos premiers projets et montrons le travail honnêtement.'),
  projectsBody: t(
    'See the current pipeline, how we work and the factory, shipping and site-preparation evidence we will publish as it becomes available.',
    '查看当前项目管线、我们的工作方式，以及在可用时将发布的工厂、运输及场地准备证据。',
    'Consultez le pipeline, notre méthode et les preuves d’usine, de transport et de préparation du site publiées lorsqu’elles deviennent disponibles.',
  ),
  viewProjects: t('See Current Work', '查看当前项目', 'Voir les travaux en cours'),
  finalTitle: t('Have a site, a budget, or a rough operating need?', '已有场地、预算或初步运营需求？', 'Avez-vous un site, un budget ou un besoin opérationnel initial?'),
  finalBody: t(
    'Share the location, intended use, approximate capacity, budget range and target date. We will identify the missing information and a sensible next step.',
    '请提供地点、用途、大致容量、预算范围及目标日期。我们将识别缺失信息并提出合理的下一步。',
    'Indiquez le lieu, l’usage, la capacité approximative, le budget et la date cible. Nous identifierons les renseignements manquants et une prochaine étape réaliste.',
  ),
}

const heroLines: Record<Locale, string[]> = {
  en: ['From factory planning', 'to a working Canadian site.'],
  zh: ['从工厂规划', '到可投入使用的加拿大现场。'],
  fr: ['De la planification en usine', 'à un site canadien opérationnel.'],
}

// Restored from the pre-premium homepage hero in 3b4f0c6/41ad0b1.
const heroSlides = [
  {
    image: '/images/community.jpg',
    label: t('Living together, naturally', '自然相伴，共同生活', 'Vivre ensemble, naturellement'),
  },
  {
    image: '/images/modular-living.jpg',
    label: t('Spaces made for real life', '为真实生活打造的空间', 'Des espaces faits pour la vraie vie'),
  },
  {
    image: '/images/commercial.jpg',
    label: t('Modular design with a human heart', '以人为本的模块化设计', 'Un design modulaire profondément humain'),
  },
] as const

const HERO_AUTOPLAY_MS = 5000

const products = [
  {
    title: t('Workforce Camps', '工人营地', 'Camps de travailleurs'),
    description: t('Accommodation and support facilities planned around headcount, shifts, climate, utilities and site access.', '围绕人数、班次、气候、公用设施及场地通行规划住宿及配套设施。', 'Hébergement et soutien planifiés selon les effectifs, quarts, climat, services et accès.'),
    facts: [t('Rooms, dining, laundry, medical and operating support', '房间、餐饮、洗衣、医疗及运营配套', 'Chambres, restauration, buanderie, médical et soutien'), t('Transport, utilities, maintenance and expansion planned together', '运输、公用设施、维护及扩建同步规划', 'Transport, services, entretien et expansion planifiés ensemble')],
    image: '/images/industrial.jpg',
    href: 'solutions#workforce-camps',
  },
  {
    title: t('Commercial Kiosks', '商业售卖亭', 'Kiosques commerciaux'),
    description: t('Coffee, food, retail and service units planned around equipment, customer flow, staff movement, utilities and approvals.', '围绕设备、顾客动线、员工移动、公用设施及审批规划咖啡、餐饮、零售和服务单元。', 'Unités de café, restauration, commerce et service planifiées selon équipements, flux, services et approbations.'),
    facts: [t('Equipment and workflow confirmed before the shell', '在外壳定稿前确认设备及工作流程', 'Équipements et flux confirmés avant l’enveloppe'), t('Site services and approvals remain location-specific', '场地公用设施及审批取决于地点', 'Services et approbations propres au lieu')],
    image: '/images/commercial.jpg',
    href: 'solutions#commercial-kiosks',
  },
  {
    title: t('Multi-Unit Buildings', '多单元建筑', 'Bâtiments multiunités'),
    description: t('Repeated units planned with structure, fire separation, services, foundations and delivery sequence.', '把可重复单元与结构、防火分隔、公用设施、基础及交付顺序一起规划。', 'Unités répétées planifiées avec structure, séparation incendie, services, fondations et livraison.'),
    facts: [t('Unit mix, circulation and accessibility defined early', '尽早明确单元组合、流线及无障碍', 'Combinaison, circulation et accessibilité définies tôt'), t('Connections, crane sequence and inspections coordinated together', '连接、吊装顺序及检查同步协调', 'Connexions, grue et inspections coordonnées ensemble')],
    image: '/images/community.jpg',
    href: 'solutions#multi-unit-buildings',
  },
  {
    title: t('Remote Operations', '偏远地区运营', 'Opérations éloignées'),
    description: t('Offices, accommodation, change facilities, storage and support buildings for mining, energy and construction sites.', '面向矿业、能源及建筑现场的办公室、住宿、更衣、仓储及配套建筑。', 'Bureaux, hébergement, vestiaires, stockage et soutien pour les mines, l’énergie et la construction.'),
    facts: [t('Operating use, hazards and site access defined first', '先明确运营用途、风险及场地通行', 'Usage, risques et accès définis d’abord'), t('Freight, utilities, maintenance and backup systems planned together', '运输、公用设施、维护及备用系统同步规划', 'Fret, services, entretien et secours planifiés ensemble')],
    image: '/images/industrial.jpg',
    href: 'solutions#remote-operations',
  },
  {
    title: t('Tourism & Modular Living', '旅游及模块化生活', 'Tourisme et habitat modulaire'),
    description: t('Cabins, guest accommodation and shared facilities planned around occupancy, operations, utilities and seasonal use.', '围绕入住、运营、公用设施及季节性使用规划小屋、客房及共享设施。', 'Chalets, hébergement et installations communes planifiés selon occupation, exploitation, services et saison.'),
    facts: [t('Guest, resident and staff needs shape the unit mix', '宾客、住户及员工需求决定单元组合', 'Les besoins des usagers façonnent la combinaison'), t('Site servicing and operating approvals confirmed per project', '场地服务及运营审批按项目确认', 'Services et approbations confirmés par projet')],
    image: '/images/tourism.jpg',
    href: 'solutions#tourism-hospitality',
  },
  {
    title: t('Community Facilities', '社区设施', 'Installations communautaires'),
    description: t('Education, administration, housing and public-serving facilities planned around users, accessibility and maintenance.', '围绕使用者、无障碍及维护规划教育、行政、住房及公共服务设施。', 'Installations d’éducation, d’administration, de logement et de service public planifiées selon les usagers, l’accessibilité et l’entretien.'),
    facts: [t('Community purpose and governance come first', '社区目标及治理优先', 'L’objectif et la gouvernance viennent d’abord'), t('Local participation, service and long-term operation stay visible', '本地参与、服务及长期运营保持清晰', 'Participation locale, service et fonctionnement restent visibles')],
    image: '/images/community.jpg',
    href: 'solutions#community-facilities',
  },
]

const stories = [
  {
    number: '01',
    title: t('Remote Workforce Camp', '偏远地区劳动力营地', 'Camp pour travailleurs en région éloignée'),
    body: t('A coordinated mix of accommodation, shared services and operational spaces can be shaped around headcount, rotation, location and site logistics.', '可根据人员规模、轮班制度、地点及现场物流，协调住宿、共享服务与运营空间的组合。', 'Un ensemble coordonné d’hébergement, de services partagés et d’espaces opérationnels peut être adapté aux effectifs, rotations, lieux et contraintes logistiques.'),
    facts: [t('Occupancy and room mix defined from the client brief', '入住规模及房型组合依据客户需求确定', 'Occupation et composition définies selon le mandat client'), t('Transport, foundations and utilities reviewed for the site', '针对场地审查运输、基础及公用设施', 'Transport, fondations et services examinés pour le site'), t('Compliance evidence coordinated with responsible parties', '与责任方协调合规证明', 'Preuves de conformité coordonnées avec les parties responsables')],
    image: '/images/industrial.jpg',
  },
  {
    number: '02',
    title: t('Modular Resort or Hospitality Unit', '模块化度假村或酒店单元', 'Unité modulaire de villégiature ou d’hôtellerie'),
    body: t('Guest units and shared amenities can be configured around the landscape, operating season, service model and desired guest experience.', '宾客单元与共享配套可围绕景观、运营季节、服务模式及预期宾客体验进行配置。', 'Les unités et espaces communs peuvent être configurés selon le paysage, la saison d’exploitation, le modèle de service et l’expérience recherchée.'),
    facts: [t('Unit planning responds to the destination concept', '单元规划响应目的地概念', 'Planification adaptée au concept de destination'), t('Material and finish selections remain project-specific', '材料与饰面选择按项目确定', 'Matériaux et finitions propres au projet'), t('Local planning and permit requirements are confirmed before delivery', '交付前确认当地规划及许可要求', 'Exigences locales de planification et permis confirmés avant livraison')],
    image: '/images/tourism.jpg',
  },
  {
    number: '03',
    title: t('Commercial Kiosk or Modular Workspace', '商业亭或模块化工作空间', 'Kiosque commercial ou espace de travail modulaire'),
    body: t('A compact business space can bring together brand, customer flow, equipment, staff needs and service connections in one coordinated brief.', '紧凑型商业空间可在一个协同需求中整合品牌、客流、设备、员工需求及服务连接。', 'Un espace commercial compact peut réunir la marque, le parcours client, les équipements, les besoins du personnel et les raccordements dans un même mandat.'),
    facts: [t('Layout follows the intended operation and customer journey', '布局依据预期运营及客户动线', 'Aménagement fondé sur l’exploitation et le parcours client'), t('Equipment and utility loads are confirmed by the project team', '设备及公用设施负载由项目团队确认', 'Équipements et charges de services confirmés par l’équipe projet'), t('Signage, accessibility and approvals are location-specific', '标识、无障碍及审批要求因地点而异', 'Signalétique, accessibilité et approbations propres au lieu')],
    image: '/images/commercial.jpg',
  },
]

const process = [
  {
    title: t("Tell us what you're building", '告诉我们您要建设什么', 'Dites-nous ce que vous construisez'),
    body: t('We start with the location, intended use, capacity, budget range, target date and site conditions. We also flag what is still unknown.', '我们先确认地点、用途、容量、预算范围、目标日期及场地条件，同时标出仍不明确的事项。', 'Nous commençons par le lieu, l’usage, la capacité, le budget, la date cible et les conditions du site, puis nous relevons les inconnues.'),
    icon: ClipboardCheck,
  },
  {
    title: t('Check the supplier and the drawings', '核查供应商与图纸', 'Vérifier le fournisseur et les plans'),
    body: t('We review the manufacturer, past work, drawings, documents, exclusions and what the quote actually includes.', '我们审查制造商、过往项目、图纸、文件、排除项，以及报价实际包含的内容。', 'Nous examinons le fabricant, ses réalisations, les plans, les documents, les exclusions et le contenu réel du devis.'),
    icon: Globe2,
  },
  {
    title: t('Price the whole job', '核算项目总成本', 'Chiffrer le projet au complet'),
    body: t('We look beyond the factory price and map freight, customs, inland transport, assembly and site work.', '我们不只看工厂价格，还会梳理运费、清关、内陆运输、组装及现场施工成本。', 'Nous allons au-delà du prix usine et recensons le fret, les douanes, le transport intérieur, l’assemblage et les travaux sur site.'),
    icon: Boxes,
  },
  {
    title: t('Plan the move', '规划运输', 'Planifier le transport'),
    body: t('We confirm module dimensions, packing, loading, delivery routes, unloading needs and access to the site.', '我们确认模块尺寸、包装、装载、运输路线、卸货需求及现场通行条件。', 'Nous confirmons les dimensions, l’emballage, le chargement, l’itinéraire, le déchargement et l’accès au site.'),
    icon: ShieldCheck,
  },
  {
    title: t('Prepare the site and assembly team', '准备场地与组装团队', 'Préparer le site et l’équipe d’assemblage'),
    body: t('We connect factory information with the people handling foundations, utilities, lifting, installation, inspections and finishing.', '我们把工厂信息与负责基础、公用设施、吊装、安装、检查及收尾工作的团队连接起来。', 'Nous relions les données de l’usine aux équipes responsables des fondations, services, levage, installation, inspections et finitions.'),
    icon: Truck,
  },
  {
    title: t('Hand over and follow up', '移交并持续跟进', 'Remettre le projet et assurer le suivi'),
    body: t('We track final documents, open items, spare parts, warranties and supplier follow-up after the building is in use.', '建筑投入使用后，我们继续跟踪最终文件、未结事项、备件、保修及供应商后续工作。', 'Après la mise en service, nous suivons les documents finaux, les points ouverts, les pièces, les garanties et les échanges avec le fournisseur.'),
    icon: Wrench,
  },
]

export function HomePage({ locale, cms }: { locale: Locale; cms?: CmsPageSnapshot | null }) {
  const localized = (value: Localized) => value[locale]
  const cmsSection = (key: string) => cms?.sections.find((section) => section.key === key && section.enabled)?.content
  const heroContent = cmsSection('hero')
  const categoryContent = cmsSection('categories')
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
    <main className="overflow-hidden bg-cream text-ink">
      <section
        className="relative flex min-h-[720px] items-end overflow-hidden bg-ink text-white sm:min-h-[760px] lg:min-h-[680px]"
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
              <span className="h-px w-10 bg-brand" /> {localized(copy.heroEyebrow)}
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
              <Link href={`/${locale}/book-a-call`} className="premium-button-ghost">{localized(copy.bookCall)} <ArrowRight className="h-4 w-4" /></Link>
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
            <span>{localized(t('Global supply / Canadian coordination', '全球供应 / 加拿大协调', 'Approvisionnement mondial / coordination canadienne'))}</span>
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
            <p className="premium-eyebrow text-brand-frost">02 / {localized(copy.storiesEyebrow)}</p>
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
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-frost">{localized(t('What the project would need', '项目真正需要什么', 'Ce dont le projet aurait besoin'))}</p>
                  <h3 className="mt-5 max-w-[16ch] text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl">{localized(story.title)}</h3>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/65">{localized(story.body)}</p>
                  <ul className="mt-8 divide-y divide-white/12 border-y border-white/12">
                    {story.facts.map((fact, factIndex) => (
                      <li key={fact.en} className="flex gap-4 py-4 text-sm leading-6 text-white/78">
                        <span className="text-brand-frost">0{factIndex + 1}</span> {localized(fact)}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/contact`} className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white hover:text-brand-frost">
                    {localized(copy.start)} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8e6de] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1760px]">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-end" data-reveal>
            <p className="premium-eyebrow">03 / {localized(copy.processEyebrow)}</p>
            <div>
              <h2 className="premium-heading">{localized(copy.processTitle)}</h2>
              <Link href={`/${locale}/assembly-centre`} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand hover:text-ink">
                {localized(t('Explore delivery details', '探索交付详情', 'Explorer la livraison'))} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <ol className="delivery-timeline mt-14 grid gap-0 lg:mt-20 lg:grid-cols-6" data-reveal>
            {process.map((step, index) => {
              const Icon = step.icon
              return (
                <li key={step.title.en} className="relative border-l border-[#a7aaa6]/40 pb-10 pl-8 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-7 lg:pt-10">
                  <span className="absolute -left-[5px] top-0 h-[9px] w-[9px] rounded-full bg-brand lg:-top-[5px] lg:left-0" />
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-brand" />
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

      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1760px] gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-20">
          <div data-reveal>
            <p className="premium-eyebrow">04 / {localized(copy.projectsEyebrow)}</p>
            <h2 className="premium-heading mt-6">{localized(copy.projectsTitle)}</h2>
            <p className="premium-copy">{localized(copy.projectsBody)}</p>
            <Link href={`/${locale}/projects`} className="premium-button-dark mt-8">{localized(copy.viewProjects)} <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <Link href={`/${locale}/projects`} className="group relative aspect-[1.3/1] overflow-hidden bg-ink" data-reveal>
            <Image src="/images/industrial.jpg" alt={localized(t('Current modular project coordination', '当前模块化项目协调', 'Coordination actuelle de projets modulaires'))} fill quality={92} sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <span className="inline-flex bg-cream px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink">{localized(t('Current Work', '当前项目', 'Travaux en cours'))}</span>
              <div className="mt-4 flex items-end justify-between gap-6">
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.04em]">{localized(t('First Projects in Delivery', '首批项目交付中', 'Premiers projets en livraison'))}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/65"><MapPin className="h-4 w-4" />{localized(t('Factory review / shipping / site preparation', '工厂审查 / 运输 / 场地准备', 'Usine / transport / préparation du site'))}</p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/35 transition group-hover:bg-white group-hover:text-black"><ArrowUpRight className="h-5 w-5" /></span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-dark px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
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
