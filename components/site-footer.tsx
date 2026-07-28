import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const groups = [
  { title: t('Explore', '探索', 'Explorer'), links: [{ slug: 'products', label: t('Living Spaces', '生活空间', 'Espaces de vie') }, { slug: 'industries', label: t('Solutions', '解决方案', 'Solutions') }, { slug: 'projects', label: t('Projects', '项目', 'Projets') }] },
  { title: t('NEXUS', 'NEXUS', 'NEXUS'), links: [{ slug: 'assembly-centre', label: t('How We Deliver', '交付方式', 'Notre approche') }, { slug: 'suppliers', label: t('Partners', '合作伙伴', 'Partenaires') }, { slug: 'news', label: t('News', '新闻', 'Actualités') }, { slug: 'about', label: t('About Us', '关于我们', 'À propos') }] },
]

const copy = {
  body: t('Thoughtfully designed modular spaces for living, working, travelling and building stronger communities.', '为生活、工作、旅行和更美好社区而用心设计的模块化空间。', 'Des espaces modulaires soigneusement conçus pour vivre, travailler, voyager et renforcer les collectivités.'),
  title: t('Building Spaces. Creating Life.', '构筑空间，创造生活。', 'Bâtir des espaces. Créer la vie.'),
  contact: t('Get in Touch', '联系我们', 'Nous contacter'),
  legal: t('Project requirements and approvals are confirmed for each location, use and site condition.', '项目要求与审批将根据地点、用途和场地条件确认。', 'Les exigences et approbations sont confirmées selon le lieu, l’usage et les conditions du site.'),
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]
  return (
    <footer className="border-t border-white/10 bg-[#06191d] text-white">
      <div className="mx-auto grid max-w-[1760px] gap-9 px-5 py-10 sm:px-8 lg:grid-cols-[1.2fr_1fr_0.8fr] lg:px-12">
        <div>
          <div className="inline-flex rounded-lg bg-white px-2 py-1"><BrandMark href={`/${locale}`} /></div>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/58">{localized(copy.body)}</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          {groups.map((group) => <div key={group.title.en}><h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#b8d683]">{localized(group.title)}</h3><div className="mt-3 grid gap-2">{group.links.map((item) => <Link key={item.slug} href={`/${locale}/${item.slug}`} className="text-sm text-white/58 hover:text-white">{localized(item.label)}</Link>)}</div></div>)}
        </div>
        <div>
          <p className="text-xl font-semibold">{localized(copy.title)}</p>
          <p className="mt-3 text-xs leading-5 text-white/45">{localized(copy.legal)}</p>
          <Link href={`/${locale}/contact`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#cde2a6] hover:text-white">{localized(copy.contact)} <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="border-t border-white/10"><div className="mx-auto flex max-w-[1760px] flex-col gap-2 px-5 py-4 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span>© {new Date().getFullYear()} NEXUS LIFE GROUP. All rights reserved.</span><span>English · 中文 · Français</span></div></div>
    </footer>
  )
}
