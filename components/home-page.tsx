'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Heart,
  Home,
  Leaf,
  Sun,
  Users,
} from 'lucide-react'

import { InquiryForm } from '@/components/inquiry-form'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
type IconType = typeof Home

const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const copy = {
  heroEyebrow: t('Thoughtful modular living', '用心打造的模块化生活', 'Un habitat modulaire pensé avec soin'),
  heroTitle: t('We make communities simpler, smarter, and more beautiful.', '让社区更简单、更智慧、更美好。', 'Nous rendons les collectivités plus simples, plus intelligentes et plus belles.'),
  heroBody: t(
    'NEXUS Life Group creates welcoming modular spaces that help people live more comfortably, connect more naturally, and feel at home in their surroundings.',
    'NEXUS Life Group 打造温暖宜人的模块化空间，让人们住得更舒适、连接更自然，并在环境中感到安心自在。',
    'NEXUS Life Group crée des espaces modulaires accueillants qui permettent de vivre plus confortablement, de se rapprocher naturellement et de se sentir chez soi.'
  ),
  heroPrimary: t('Explore better living', '探索更美好的生活', 'Explorer un meilleur mode de vie'),
  heroSecondary: t('Talk with our team', '与我们沟通', 'Parler avec notre équipe'),
  promiseEyebrow: t('A simple idea', '一个简单的理念', 'Une idée simple'),
  promiseTitle: t('A better life can be this simple.', '更好的生活，可以如此简单。', 'Une vie meilleure peut être aussi simple.'),
  promiseBody: t(
    'We believe good homes and shared spaces should feel calm, useful and connected to nature. Modular design gives us a practical way to create that feeling with care.',
    '我们相信，美好的家和共享空间应当宁静、实用，并与自然相连。模块化设计让我们能够以务实的方式，用心创造这种体验。',
    'Nous croyons que les maisons et les espaces partagés doivent être calmes, utiles et liés à la nature. La conception modulaire offre une façon concrète de créer cette expérience avec soin.'
  ),
  livingEyebrow: t('Spaces for real life', '为真实生活打造的空间', 'Des espaces pour la vraie vie'),
  livingTitle: t('Designed around the moments that matter.', '围绕重要生活时刻而设计。', 'Conçus autour des moments qui comptent.'),
  processEyebrow: t('Our approach', '我们的方式', 'Notre approche'),
  processTitle: t('Thoughtful from the first conversation to everyday life.', '从第一次沟通到日常生活，都充满用心。', 'Une attention présente dès la première conversation et dans la vie quotidienne.'),
  assuranceEyebrow: t('Practical, not complicated', '务实，而不复杂', 'Concret, sans complication'),
  assuranceTitle: t('Beautiful communities begin with practical choices.', '美好的社区，始于务实的选择。', 'Les belles collectivités commencent par des choix concrets.'),
  assuranceBody: t(
    'We help make modular living easier to understand and easier to plan. Every project is shaped around its people, place and everyday needs—with the appropriate local coordination along the way.',
    '我们让模块化生活更容易理解，也更容易规划。每个项目都围绕人、地点和日常需求展开，并在过程中进行适当的本地协调。',
    'Nous rendons l’habitat modulaire plus facile à comprendre et à planifier. Chaque projet est façonné autour des personnes, du lieu et des besoins quotidiens, avec une coordination locale adaptée.'
  ),
  inquiryEyebrow: t('Let’s begin simply', '从简单开始', 'Commençons simplement'),
  inquiryTitle: t('Tell us about the place you want to create.', '告诉我们您想打造怎样的空间。', 'Parlez-nous du lieu que vous souhaitez créer.'),
  inquiryBody: t(
    'Whether you are exploring a home, a small community, a retreat or a shared space, we would be glad to start with a practical conversation.',
    '无论您正在探索住宅、小型社区、度假空间还是共享空间，我们都愿意从一次务实的沟通开始。',
    'Que vous exploriez une maison, une petite collectivité, un lieu de retraite ou un espace partagé, nous serions heureux de commencer par une conversation concrète.'
  ),
}

const values: Array<{ icon: IconType; title: Localized; body: Localized }> = [
  {
    icon: Home,
    title: t('Simpler living', '更简单的生活', 'Une vie plus simple'),
    body: t('Comfortable, well-considered spaces made for everyday routines.', '为日常生活打造舒适、周到的空间。', 'Des espaces confortables et réfléchis pour le quotidien.'),
  },
  {
    icon: Sun,
    title: t('Smarter modular solutions', '更智慧的模块化方案', 'Des solutions modulaires plus intelligentes'),
    body: t('Practical design choices that make building and living feel more straightforward.', '让建设与居住更轻松直接的实用设计选择。', 'Des choix de conception concrets qui simplifient la construction et la vie.'),
  },
  {
    icon: Users,
    title: t('Better communities', '更美好的社区', 'De meilleures collectivités'),
    body: t('Places that invite connection, belonging and a shared sense of home.', '鼓励连接、归属感和共同家园感的场所。', 'Des lieux qui favorisent le lien, l’appartenance et le sentiment d’être chez soi.'),
  },
  {
    icon: Leaf,
    title: t('Naturally beautiful', '自然之美', 'Naturellement beaux'),
    body: t('Architecture and outdoor spaces that sit gently within their environment.', '与周边环境自然融合的建筑与户外空间。', 'Une architecture et des espaces extérieurs qui s’intègrent doucement à leur environnement.'),
  },
]

const waysOfLiving: Array<{ key: string; title: Localized; eyebrow: Localized; description: Localized; note: Localized; image: string }> = [
  {
    key: 'home',
    title: t('A place to come home to', '一个想回去的家', 'Un lieu où rentrer'),
    eyebrow: t('Everyday homes', '日常住宅', 'Maisons du quotidien'),
    description: t('Warm, adaptable homes and smaller living spaces designed around comfort, light and daily life.', '温暖、灵活的住宅与小型生活空间，围绕舒适、光线和日常生活而设计。', 'Des maisons chaleureuses et adaptables, pensées autour du confort, de la lumière et de la vie quotidienne.'),
    note: t('More attainable options begin with thoughtful planning.', '更多可负担选择，始于周到规划。', 'Des options plus accessibles commencent par une planification attentive.'),
    image: '/images/project-cabin.jpg',
  },
  {
    key: 'retreat',
    title: t('Space to slow down', '让生活慢下来的空间', 'Un espace pour ralentir'),
    eyebrow: t('Cabins & retreats', '小屋与度假空间', 'Chalets et retraites'),
    description: t('Cabins and hospitality spaces that bring people closer to nature without giving up everyday comfort.', '让人们更亲近自然、同时不失日常舒适的小屋与旅居空间。', 'Des chalets et lieux d’accueil qui rapprochent de la nature sans renoncer au confort quotidien.'),
    note: t('Good design should make the landscape feel even more present.', '好的设计，应当让自然景观更加鲜活。', 'Un bon design devrait rendre le paysage encore plus présent.'),
    image: '/images/tourism.jpg',
  },
  {
    key: 'community',
    title: t('More room for belonging', '更多归属感的空间', 'Plus de place pour l’appartenance'),
    eyebrow: t('Shared communities', '共享社区', 'Collectivités partagées'),
    description: t('Small community spaces and flexible housing ideas that make connection feel easy and natural.', '让连接变得轻松自然的小型社区空间与灵活住房构想。', 'Des espaces communautaires et des idées d’habitat souples qui rendent le lien simple et naturel.'),
    note: t('A community becomes stronger when everyday life has room to happen together.', '当日常生活有空间可以一起发生，社区就会更强大。', 'Une collectivité devient plus forte lorsque la vie quotidienne peut s’y dérouler ensemble.'),
    image: '/images/nexus-community-gathering-v1.png',
  },
]

const approach = [
  { number: '01', title: t('Listen first', '先倾听', 'Écouter d’abord'), body: t('We start with the people, place and feeling you want to create.', '我们从您希望创造的人、地点和感受开始。', 'Nous commençons par les personnes, le lieu et l’ambiance que vous souhaitez créer.') },
  { number: '02', title: t('Plan with care', '用心规划', 'Planifier avec soin'), body: t('We shape a practical modular direction around daily life, site conditions and priorities.', '我们围绕日常生活、场地条件和重点，形成务实的模块化方向。', 'Nous définissons une orientation modulaire concrète selon la vie quotidienne, le site et les priorités.') },
  { number: '03', title: t('Bring it to life', '让它成为现实', 'Donner vie au projet'), body: t('We coordinate the right steps to move a good idea toward a real, usable place.', '我们协调合适步骤，让好想法走向真实、可使用的空间。', 'Nous coordonnons les bonnes étapes pour faire passer une idée à un lieu réel et utilisable.') },
]

export function HomePage({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]
  const [activeLiving, setActiveLiving] = useState(0)
  const active = waysOfLiving[activeLiving]

  return (
    <main className="bg-[#fbfaf6]">
      <section className="overflow-hidden bg-[#e8eee6]">
        <div className="mx-auto grid max-w-8xl gap-10 px-5 py-10 sm:px-8 lg:min-h-[680px] lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-12 lg:py-16">
          <div className="relative z-10 max-w-2xl lg:py-10">
            <span className="inline-flex rounded-full border border-[#315b4d]/20 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#315b4d]">
              {localized(copy.heroEyebrow)}
            </span>
            <h1 className="community-display mt-7 text-5xl leading-[1.01] text-[#1d352e] sm:text-6xl lg:text-[4.65rem]">
              {localized(copy.heroTitle)}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#51645d]">{localized(copy.heroBody)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#living" className="inline-flex items-center gap-2 rounded-full bg-[#315b4d] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#24463a]">
                {localized(copy.heroPrimary)} <ArrowRight className="h-4 w-4" />
              </a>
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full border border-[#315b4d]/20 bg-white/80 px-6 py-3.5 text-sm font-bold text-[#315b4d] transition hover:border-[#315b4d]/45 hover:bg-white">
                {localized(copy.heroSecondary)}
              </Link>
            </div>
            <div className="mt-11 flex items-center gap-3 text-sm text-[#51645d]">
              <Heart className="h-5 w-5 shrink-0 text-[#66895e]" />
              <span>{t('Designed for real life, not a distant future.', '为真实生活而设计，而非遥远的未来。', 'Conçus pour la vraie vie, pas pour un avenir lointain.')[locale]}</span>
            </div>
          </div>

          <div className="relative min-h-[390px] lg:min-h-[560px]">
            <div className="absolute inset-0 overflow-hidden rounded-[2.4rem] shadow-lift">
              <Image src="/images/nexus-community-hero-v1.png" alt={t('A warm modular community within a natural setting', '自然环境中的温暖模块化社区', 'Une collectivité modulaire chaleureuse dans un cadre naturel')[locale]} fill priority quality={90} className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(29,53,46,.28),transparent_48%,rgba(18,34,29,.15))]" />
            </div>
            <div className="absolute -bottom-4 left-4 right-4 rounded-3xl border border-white/60 bg-[#fffdf8]/90 p-5 shadow-soft backdrop-blur sm:left-7 sm:right-auto sm:max-w-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#66895e]">{t('NEXUS Life Group', 'NEXUS Life Group', 'NEXUS Life Group')[locale]}</p>
              <p className="mt-2 text-lg font-semibold leading-7 text-[#1d352e]">{t('Comfort, connection and a stronger sense of home.', '舒适、连接与更强的家园感。', 'Confort, lien et un sentiment plus fort d’être chez soi.')[locale]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf6] py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="community-eyebrow">{localized(copy.promiseEyebrow)}</p>
            <h2 className="community-title mt-4">{localized(copy.promiseTitle)}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#64736c]">{localized(copy.promiseBody)}</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon
              return <article key={value.title.en} className="rounded-[1.75rem] border border-[#dbe3d9] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e8eee6] text-[#52735b]"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-6 text-xl font-semibold text-[#1d352e]">{localized(value.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-[#64736c]">{localized(value.body)}</p>
              </article>
            })}
          </div>
        </div>
      </section>

      <section id="living" className="scroll-mt-24 bg-[#f0f3ec] py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:items-end">
            <div>
              <p className="community-eyebrow">{localized(copy.livingEyebrow)}</p>
              <h2 className="community-title mt-4 max-w-xl">{localized(copy.livingTitle)}</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#64736c]">{t('Choose a way of living to explore the feeling and everyday value behind it. The focus is not on a catalogue—it is on creating places that feel good to be in.', '选择一种生活方式，探索它背后的感受与日常价值。重点不是产品目录，而是创造让人愿意停留的空间。', 'Choisissez une manière de vivre pour explorer le sentiment et la valeur quotidienne qui l’animent. Il ne s’agit pas d’un catalogue, mais de lieux où il fait bon vivre.')[locale]}</p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[0.34fr_0.66fr]">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
              {waysOfLiving.map((item, index) => <button key={item.key} type="button" onClick={() => setActiveLiving(index)} className={`min-w-[210px] rounded-2xl border px-5 py-5 text-left transition lg:min-w-0 ${activeLiving === index ? 'border-[#315b4d] bg-[#315b4d] text-white shadow-soft' : 'border-[#d6e0d3] bg-white text-[#315b4d] hover:border-[#7a9b7a]'}`}>
                <span className={`text-xs font-bold uppercase tracking-[0.15em] ${activeLiving === index ? 'text-[#c8dfbd]' : 'text-[#66895e]'}`}>{localized(item.eyebrow)}</span>
                <span className="mt-2 block text-lg font-semibold">{localized(item.title)}</span>
                <ChevronRight className="mt-4 h-4 w-4" />
              </button>)}
            </div>
            <article className="overflow-hidden rounded-[2.25rem] border border-[#d6e0d3] bg-white shadow-soft">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={active.image} alt={localized(active.title)} fill quality={90} className="object-cover transition duration-500" sizes="(max-width: 1024px) 100vw, 60vw" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(17,42,34,.68)_100%)]" />
                <p className="absolute bottom-6 left-6 right-6 text-2xl font-semibold leading-8 text-white sm:text-3xl">{localized(active.title)}</p>
              </div>
              <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
                <p className="text-base leading-8 text-[#5f7068]">{localized(active.description)}</p>
                <div className="rounded-2xl bg-[#e8eee6] p-5 text-sm font-medium leading-7 text-[#315b4d]">{localized(active.note)}</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#315b4d] py-20 text-white lg:py-28">
        <div className="mx-auto grid max-w-8xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.39fr_0.61fr] lg:items-center lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c8dfbd]">{localized(copy.processEyebrow)}</p>
            <h2 className="community-title mt-4 text-white">{localized(copy.processTitle)}</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/72">{t('Modular living is practical when it is guided by the right questions, the right people and a clear path forward.', '当模块化生活由正确的问题、合适的人和清晰的方向引导时，它就会变得务实。', 'L’habitat modulaire devient concret lorsqu’il est guidé par les bonnes questions, les bonnes personnes et une voie claire.')[locale]}</p>
            <Link href={`/${locale}/assembly-centre`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#e6f0df] hover:text-white">{t('Learn how we work', '了解我们的工作方式', 'Découvrir notre approche')[locale]} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {approach.map((step) => <article key={step.number} className="rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-6"><p className="text-xs font-bold tracking-[0.18em] text-[#c8dfbd]">{step.number}</p><h3 className="mt-6 text-xl font-semibold">{localized(step.title)}</h3><p className="mt-3 text-sm leading-7 text-white/70">{localized(step.body)}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf6] py-20 lg:py-28">
        <div className="mx-auto grid max-w-8xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-center lg:px-12">
          <div className="relative min-h-[380px] overflow-hidden rounded-[2.4rem] shadow-lift">
            <Image src="/images/project-lake.jpg" alt={t('Modular homes in a peaceful natural setting', '宁静自然环境中的模块化住宅', 'Des maisons modulaires dans un cadre naturel paisible')[locale]} fill quality={90} className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(21,49,39,.6),transparent_65%)]" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-[#fffdf8]/90 p-5 text-[#315b4d] backdrop-blur"><Leaf className="h-5 w-5 text-[#66895e]" /><p className="mt-3 text-sm font-semibold leading-6">{t('A home should feel like part of its surroundings—not separate from them.', '家应当成为环境的一部分，而不是与环境分离。', 'Une maison devrait faire partie de son environnement, et non s’en dissocier.')[locale]}</p></div>
          </div>
          <div>
            <p className="community-eyebrow">{localized(copy.assuranceEyebrow)}</p>
            <h2 className="community-title mt-4">{localized(copy.assuranceTitle)}</h2>
            <p className="mt-6 text-base leading-8 text-[#64736c]">{localized(copy.assuranceBody)}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[t('Thoughtful planning', '周到规划', 'Planification attentive'), t('Beautiful, adaptable spaces', '美观、灵活的空间', 'Des espaces beaux et adaptables'), t('Local project coordination', '本地项目协调', 'Coordination locale du projet'), t('A clear next step', '清晰的下一步', 'Une prochaine étape claire')].map((item) => <div key={item.en} className="flex items-center gap-3 rounded-2xl border border-[#dbe3d9] bg-white p-4 text-sm font-semibold text-[#315b4d]"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#66895e]" />{localized(item)}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#dbe3d9] bg-[#e8eee6] py-20 lg:py-28">
        <div className="mx-auto grid max-w-8xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.42fr_0.58fr] lg:px-12">
          <div>
            <p className="community-eyebrow">{localized(copy.inquiryEyebrow)}</p>
            <h2 className="community-title mt-4">{localized(copy.inquiryTitle)}</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#64736c]">{localized(copy.inquiryBody)}</p>
          </div>
          <InquiryForm locale={locale} />
        </div>
      </section>
    </main>
  )
}
