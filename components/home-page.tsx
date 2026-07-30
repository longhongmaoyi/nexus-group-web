'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Boxes,
  Building2,
  ChevronLeft,
  ChevronRight,
  Factory,
  Globe2,
  Heart,
  Home,
  Hotel,
  Leaf,
  MapPin,
  Play,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'

import type { Locale } from '@/lib/i18n'
import type { CmsPageSnapshot } from '@/lib/cms-types'

type Localized = Record<Locale, string>
type IconType = typeof Home

const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const copy = {
  title: t('Building Spaces. Creating Life.', '构筑空间，创造生活。', 'Bâtir des espaces. Créer la vie.'),
  body: t(
    'Thoughtfully designed modular spaces that make everyday life simpler, more connected, and closer to nature.',
    '用心设计的模块化空间，让日常生活更简单、更紧密，也更亲近自然。',
    'Des espaces modulaires soigneusement conçus pour une vie plus simple, plus connectée et plus proche de la nature.',
  ),
  story: t('Discover Our Story', '了解我们的故事', 'Découvrir notre histoire'),
  categories: t('Spaces for every way of life', '适合每一种生活方式的空间', 'Des espaces pour chaque mode de vie'),
  numbers: t('NEXUS at a Glance', 'NEXUS 概览', 'NEXUS en bref'),
  ecosystem: t('Our Connected Ecosystem', '我们的协同生态', 'Notre écosystème intégré'),
  ecosystemBody: t(
    'From global capability to local service, every step is coordinated around the people who will use the space.',
    '从全球能力到本地服务，每一步都围绕空间使用者进行协调。',
    'De la capacité mondiale au service local, chaque étape est coordonnée autour des personnes qui utiliseront l’espace.',
  ),
  featured: t('Featured Concept', '精选概念项目', 'Concept en vedette'),
  closingTitle: t('One Platform. Endless Possibilities.', '一个平台，无限可能。', 'Une plateforme. Des possibilités infinies.'),
  closingBody: t(
    'For a better future, together.',
    '携手共创更美好的未来。',
    'Ensemble, pour un avenir meilleur.',
  ),
  partner: t('Start a Conversation', '开始沟通', 'Commencer une conversation'),
}

const heroSlides = [
  { image: '/images/nexus-lakeside-community-hero-v1.jpg', label: t('Living together, naturally', '自然相伴，共同生活', 'Vivre ensemble, naturellement') },
  { image: '/images/hero-slide-02.jpg', label: t('Spaces made for real life', '为真实生活打造的空间', 'Des espaces faits pour la vraie vie') },
  { image: '/images/hero-slide-03.jpg', label: t('Modular design with a human heart', '以人为本的模块化设计', 'Un design modulaire profondément humain') },
]

const values: Array<{ icon: IconType; title: Localized; body: Localized }> = [
  { icon: Leaf, title: t('Sustainable', '可持续', 'Durable'), body: t('Better for the planet', '更友好地对待地球', 'Meilleur pour la planète') },
  { icon: ShieldCheck, title: t('Reliable', '可靠', 'Fiable'), body: t('Built for real life', '为真实生活而建', 'Conçu pour la vraie vie') },
  { icon: Boxes, title: t('Flexible', '灵活', 'Flexible'), body: t('Adaptable by design', '设计灵活可适应', 'Adaptable par conception') },
  { icon: Users, title: t('Inclusive', '包容', 'Inclusif'), body: t('For every community', '服务每个社区', 'Pour chaque collectivité') },
  { icon: Sparkles, title: t('Thoughtful', '用心', 'Réfléchi'), body: t('Beautifully considered', '每处细节皆经思考', 'Pensé dans les moindres détails') },
]

const categories: Array<{ icon: IconType; title: Localized; body: Localized; image: string; href: string }> = [
  { icon: Home, title: t('Living', '居住', 'Habitat'), body: t('Homes for modern life', '现代生活住宅', 'Des maisons pour la vie moderne'), image: '/images/modular-living.jpg', href: 'products' },
  { icon: Hotel, title: t('Tourism', '旅游', 'Tourisme'), body: t('Spaces for travel and hospitality', '旅游与旅居空间', 'Espaces de voyage et d’accueil'), image: '/images/tourism.jpg', href: 'industries' },
  { icon: Building2, title: t('Business', '商业', 'Affaires'), body: t('Commercial spaces that grow with you', '与业务共同成长的商业空间', 'Des espaces commerciaux évolutifs'), image: '/images/commercial.jpg', href: 'products' },
  { icon: Wrench, title: t('Work', '工作', 'Travail'), body: t('Workspaces that support people', '支持团队的工作空间', 'Des espaces qui soutiennent les équipes'), image: '/images/industrial.jpg', href: 'industries' },
  { icon: Heart, title: t('Wellness', '康养', 'Bien-être'), body: t('Spaces for health and care', '健康与关怀空间', 'Des espaces de santé et de soins'), image: '/images/project-cabin.jpg', href: 'products' },
  { icon: Users, title: t('Community', '社区', 'Collectivité'), body: t('Places for connection and belonging', '连接与归属的场所', 'Des lieux de lien et d’appartenance'), image: '/images/nexus-community-evening-v1.jpg', href: 'industries' },
]

const metrics = [
  { value: '3', label: t('Languages', '网站语言', 'Langues') },
  { value: '5', label: t('Delivery stages', '交付阶段', 'Étapes de livraison') },
  { value: '6', label: t('Lifestyle pathways', '生活方式路径', 'Parcours de vie') },
  { value: '1', label: t('Connected approach', '协同方式', 'Approche intégrée') },
  { value: 'CA', label: t('Canadian coordination', '加拿大协调', 'Coordination canadienne') },
  { value: '∞', label: t('Room to adapt', '灵活拓展', 'Possibilités d’adaptation') },
]

const ecosystem: Array<{ icon: IconType; title: Localized }> = [
  { icon: Globe2, title: t('Global sourcing', '全球寻源', 'Approvisionnement mondial') },
  { icon: Factory, title: t('Product integration', '产品集成', 'Intégration produit') },
  { icon: Boxes, title: t('Canadian assembly', '加拿大组装', 'Assemblage canadien') },
  { icon: Truck, title: t('Local delivery', '本地交付', 'Livraison locale') },
  { icon: Heart, title: t('Ongoing care', '持续支持', 'Soutien continu') },
]

const closingValues = [
  t('Global vision. Local understanding.', '全球视野，本地理解。', 'Vision mondiale. Compréhension locale.'),
  t('Designed for different ways of living.', '为多元生活方式而设计。', 'Conçu pour différentes façons de vivre.'),
  t('Built with sustainability in mind.', '兼顾可持续理念。', 'Conçu dans un esprit de durabilité.'),
  t('Technology that supports better living.', '科技赋能美好生活。', 'La technologie au service d’une vie meilleure.'),
  t('People and communities at the centre.', '以人为本，以社区为核心。', 'Les personnes et les collectivités au centre.'),
]

export function HomePage({ locale, cms }: { locale: Locale; cms?: CmsPageSnapshot | null }) {
  const localized = (value: Localized) => value[locale]
  const localHref = (href: string) => href.replace(/^\/(en|zh|fr)(?=\/|$)/, `/${locale}`)
  const cmsSection = (key: string) => cms?.sections.find((section) => section.key === key && section.enabled)?.content
  const heroContent = cmsSection('hero')
  const categoriesContent = cmsSection('categories')
  const metricsContent = cmsSection('metrics')
  const ecosystemContent = cmsSection('ecosystem')
  const featuredContent = cmsSection('featured')
  const closingContent = cmsSection('closing')
  const pageCopy = {
    ...copy,
    title: heroContent?.title || copy.title,
    body: heroContent?.body || copy.body,
    story: heroContent?.ctaLabel || copy.story,
    categories: categoriesContent?.title || copy.categories,
    numbers: metricsContent?.title || copy.numbers,
    ecosystem: ecosystemContent?.title || copy.ecosystem,
    ecosystemBody: ecosystemContent?.body || copy.ecosystemBody,
    featured: featuredContent?.title || copy.featured,
    closingTitle: closingContent?.title || copy.closingTitle,
    closingBody: closingContent?.body || copy.closingBody,
    partner: closingContent?.ctaLabel || copy.partner,
  }
  const slides = heroContent?.items?.length
    ? heroContent.items.filter((item) => item.image).map((item) => ({ image: item.image!, label: item.title }))
    : heroSlides
  const categoryCards = categoriesContent?.items?.length
    ? categoriesContent.items.filter((item) => item.image).map((item, index) => ({
        icon: categories[index % categories.length].icon,
        title: item.title,
        body: item.body,
        image: item.image!,
        href: item.href?.replace(/^\/(en|zh|fr)\//, '') || categories[index % categories.length].href,
      }))
    : categories
  const metricCards = metricsContent?.items?.length
    ? metricsContent.items.map((item) => ({ value: item.value || '—', label: item.title }))
    : metrics
  const ecosystemCards = ecosystemContent?.items?.length
    ? ecosystemContent.items.map((item, index) => ({ icon: ecosystem[index % ecosystem.length].icon, title: item.title }))
    : ecosystem
  const closingCards = closingContent?.items?.length ? closingContent.items.map((item) => item.title) : closingValues
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 5000)
    return () => window.clearInterval(timer)
  }, [slides.length])

  const changeSlide = (next: number) => setSlide((next + slides.length) % slides.length)

  return (
    <main className="bg-white">
      <section className="relative min-h-[680px] overflow-hidden bg-[#071b21] text-white lg:min-h-[610px]">
        {slides.map((item, index) => (
          <Image
            key={item.image}
            src={item.image}
            alt={localized(item.label)}
            fill
            priority={index === 0}
            quality={95}
            sizes="100vw"
            className={`object-cover object-[62%_center] transition-opacity duration-1000 lg:object-center ${index === slide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,22,25,.88)_0%,rgba(5,22,25,.65)_36%,rgba(5,22,25,.16)_72%,rgba(5,22,25,.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,16,20,.54)_0%,transparent_27%,transparent_58%,rgba(3,16,20,.82)_100%)]" />

        <div className="relative mx-auto flex min-h-[680px] max-w-[1760px] flex-col justify-end px-5 pb-7 pt-32 sm:px-8 lg:min-h-[610px] lg:px-12 lg:pt-28">
          <div className="mb-auto max-w-2xl pt-5 lg:pt-2">
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[4rem]">
              {localized(pageCopy.title)}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/82 sm:text-lg">{localized(pageCopy.body)}</p>
            <Link href={localHref(heroContent?.ctaHref || `/${locale}/about`)} className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-white transition hover:text-[#b8d683]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#173b34] shadow-lg"><Play className="ml-0.5 h-4 w-4 fill-current" /></span>
              {localized(pageCopy.story)}
            </Link>
          </div>

          <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 sm:right-8 lg:flex lg:right-12">
            <span className="text-xs font-bold">{String(slide + 1).padStart(2, '0')}</span>
            <div className="h-20 w-px bg-white/25"><div className="w-px bg-white transition-all duration-700" style={{ height: `${((slide + 1) / heroSlides.length) * 100}%` }} /></div>
            <span className="text-xs text-white/55">{String(slides.length).padStart(2, '0')}</span>
            <div className="mt-2 flex gap-2">
              <button onClick={() => changeSlide(slide - 1)} aria-label="Previous hero image" className="grid h-8 w-8 place-items-center rounded-full border border-white/30 hover:bg-white/10"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => changeSlide(slide + 1)} aria-label="Next hero image" className="grid h-8 w-8 place-items-center rounded-full border border-white/30 hover:bg-white/10"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title.en} className="flex items-center gap-3 px-3 py-2">
                  <Icon className="h-6 w-6 shrink-0 text-[#b8d683]" />
                  <div><p className="text-sm font-semibold">{localized(item.title)}</p><p className="mt-0.5 text-[0.7rem] text-white/58">{localized(item.body)}</p></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white pb-8 pt-5">
        <div className="mx-auto max-w-[1760px] px-5 sm:px-8 lg:px-12">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-sm font-bold text-[#0b2528]">{localized(pageCopy.categories)}</h2>
            <Link href={`/${locale}/products`} className="text-xs font-semibold text-[#5e735b] hover:text-[#0b2528]">{t('View all solutions', '查看全部方案', 'Voir toutes les solutions')[locale]} →</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categoryCards.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.title.en} href={`/${locale}/${item.href}`} className="group relative min-h-[180px] overflow-hidden rounded-xl bg-[#0b2528] shadow-sm">
                  <Image src={item.image} alt={localized(item.title)} fill quality={88} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 16vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,23,.18),rgba(4,20,23,.83))]" />
                  <div className="absolute inset-0 flex flex-col p-4 text-white">
                    <Icon className="h-5 w-5 text-[#d2e5ad]" />
                    <div className="mt-auto">
                      <p className="text-base font-semibold">{localized(item.title)}</p>
                      <p className="mt-1 text-xs leading-5 text-white/68">{localized(item.body)}</p>
                    </div>
                    <span className="absolute bottom-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-white text-[#0b2528] transition group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#fbfcfa] py-10">
        <div className="mx-auto grid max-w-[1760px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.2fr_1.25fr] lg:px-12">
          <div>
            <h2 className="text-sm font-bold text-[#0b2528]">{localized(pageCopy.numbers)}</h2>
            <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-7">
              {metricCards.map((item) => <div key={item.label.en}><p className="text-2xl font-semibold tracking-tight text-[#0b2528]">{item.value}</p><p className="mt-1 text-[0.68rem] leading-4 text-slate-500">{localized(item.label)}</p></div>)}
            </div>
            <Link href={`/${locale}/about`} className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#b8c5b4] px-4 py-2 text-xs font-semibold text-[#29473c] hover:bg-[#edf2e8]">
              {t('Discover More', '了解更多', 'En découvrir davantage')[locale]} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="border-y border-slate-200 py-8 lg:border-x lg:border-y-0 lg:px-8 lg:py-0">
            <h2 className="text-sm font-bold text-[#0b2528]">{localized(pageCopy.ecosystem)}</h2>
            <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">{localized(pageCopy.ecosystemBody)}</p>
            <div className="mt-8 flex items-start justify-between gap-1">
              {ecosystemCards.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.title.en} className="relative flex flex-1 flex-col items-center text-center">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-[#cbd5c6] bg-white text-[#506b52]"><Icon className="h-4 w-4" /></span>
                    <p className="mt-2 text-[0.62rem] font-semibold leading-4 text-[#42574c]">{localized(item.title)}</p>
                    {index < ecosystemCards.length - 1 && <span className="absolute left-[64%] top-5 h-px w-[72%] bg-[#cbd5c6]" />}
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#0b2528]">{localized(pageCopy.featured)}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-[1.15fr_0.85fr] sm:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={featuredContent?.image || '/images/project-lake-hd-v1.jpg'} alt={localized(featuredContent?.title || t('Lakeview Retreat design concept', '湖景度假区设计概念', 'Concept du refuge Lakeview'))} fill quality={92} className="object-cover" sizes="(max-width: 1024px) 100vw, 22vw" />
              </div>
              <div>
                <p className="text-base font-semibold text-[#0b2528]">{localized(featuredContent?.title || t('Lakeview Retreat', '湖景度假区', 'Refuge Lakeview'))}</p>
                <p className="mt-1 text-xs font-medium text-[#5f745d]">{t('Modular community · Design concept', '模块化社区 · 设计概念', 'Collectivité modulaire · Concept')[locale]}</p>
                <p className="mt-3 flex items-center gap-1.5 text-[0.7rem] text-slate-500"><MapPin className="h-3 w-3" /> {t('Canada · Proposed', '加拿大 · 拟建', 'Canada · Projet proposé')[locale]}</p>
                <p className="mt-3 text-xs leading-5 text-slate-500">{localized(featuredContent?.body || t('A nature-connected modular retreat designed around comfort, belonging and the landscape.', '围绕舒适、归属与自然景观打造的模块化度假社区。', 'Une retraite modulaire liée à la nature, pensée autour du confort et de l’appartenance.'))}</p>
                <Link href={localHref(featuredContent?.ctaHref || `/${locale}/projects`)} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#b8c5b4] px-4 py-2 text-xs font-semibold text-[#29473c] hover:bg-[#edf2e8]">{localized(featuredContent?.ctaLabel || t('View Concept', '查看概念', 'Voir le concept'))} <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#071b21] text-white">
        <Image src="/images/nexus-community-evening-v1.jpg" alt={t('Neighbours gathering in a modular community', '邻里在模块化社区中相聚', 'Des voisins réunis dans une collectivité modulaire')[locale]} fill quality={90} className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,23,.92),rgba(4,20,23,.68)_45%,rgba(4,20,23,.76))]" />
        <div className="relative mx-auto grid min-h-[260px] max-w-[1760px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-center lg:px-12">
          <div>
            <h2 className="text-3xl font-semibold leading-tight">{localized(pageCopy.closingTitle)}</h2>
            <p className="mt-3 text-sm text-white/65">{localized(pageCopy.closingBody)}</p>
            <Link href={localHref(closingContent?.ctaHref || `/${locale}/contact`)} className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-xs font-semibold hover:bg-white hover:text-[#0b2528]">{localized(pageCopy.partner)} <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {closingCards.map((item, index) => {
              const Icon = [Globe2, Users, Leaf, Boxes, Heart][index]
              return <div key={item.en} className="border-l border-white/18 pl-4"><Icon className="h-5 w-5 text-[#c7df95]" /><p className="mt-4 text-xs font-semibold leading-5 text-white/82">{localized(item)}</p></div>
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
