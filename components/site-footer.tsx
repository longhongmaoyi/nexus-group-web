import Link from 'next/link'
import { ArrowUpRight, Leaf } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const groups = [
  { title: t('Explore', '探索', 'Explorer'), links: [{ slug: 'products', label: t('Homes & Spaces', '住宅与空间', 'Maisons et espaces') }, { slug: 'industries', label: t('Communities', '社区', 'Collectivités') }, { slug: 'projects', label: t('Stories', '故事', 'Histoires') }] },
  { title: t('NEXUS Life Group', 'NEXUS Life Group', 'NEXUS Life Group'), links: [{ slug: 'assembly-centre', label: t('Our Approach', '我们的方式', 'Notre approche') }, { slug: 'about', label: t('About us', '关于我们', 'À propos') }, { slug: 'contact', label: t('Talk with us', '与我们沟通', 'Parlons-en') }] },
]

const copy = {
  body: t('We create practical modular spaces that bring more comfort, connection and beauty into everyday life.', '我们打造务实的模块化空间，为日常生活带来更多舒适、连接与美好。', 'Nous créons des espaces modulaires concrets qui apportent confort, lien et beauté à la vie quotidienne.'),
  promise: t('We make communities simpler, smarter, and more beautiful.', '让社区更简单、更智慧、更美好。', 'Nous rendons les collectivités plus simples, plus intelligentes et plus belles.'),
  legal: t('Project requirements and approvals are confirmed for each location, intended use and site condition.', '项目要求与审批将根据每个地点、用途和场地条件确认。', 'Les exigences et approbations sont confirmées selon chaque lieu, usage et condition de site.'),
  contact: t('Begin a conversation', '开始沟通', 'Commencer une conversation'),
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]
  return <footer className="border-t border-[#d6e0d3] bg-[#1d352e] text-white">
    <div className="mx-auto grid max-w-8xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.25fr_1fr_0.95fr] lg:px-12 lg:py-14">
      <div>
        <div className="inline-flex rounded-xl bg-[#fffdf9] px-3 py-2"><BrandMark href={`/${locale}`} /></div>
        <p className="mt-5 max-w-lg text-sm leading-7 text-white/68">{localized(copy.body)}</p>
        <div className="mt-5 flex max-w-lg items-start gap-3 text-sm leading-6 text-[#dbe8d6]"><Leaf className="mt-0.5 h-5 w-5 shrink-0 text-[#b6d38d]" />{localized(copy.promise)}</div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        {groups.map((group) => <div key={group.title.en}><h3 className="text-sm font-bold">{localized(group.title)}</h3><div className="mt-4 grid gap-2.5">{group.links.map((item) => <Link key={item.slug} href={`/${locale}/${item.slug}`} className="text-sm text-white/60 transition hover:text-white">{localized(item.label)}</Link>)}</div></div>)}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b6d38d]">NEXUS Life Group</p>
        <h3 className="mt-4 text-2xl font-semibold leading-8">{localized(copy.promise)}</h3>
        <p className="mt-4 text-sm leading-6 text-white/60">{localized(copy.legal)}</p>
        <Link href={`/${locale}/contact`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#e2efd8] transition hover:text-white">{localized(copy.contact)} <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </div>
    <div className="border-t border-white/10"><div className="mx-auto flex max-w-8xl flex-col gap-2 px-5 py-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span>© {new Date().getFullYear()} NEXUS Life Group. All rights reserved.</span><span>English default · 中文 · Français</span></div></div>
  </footer>
}
