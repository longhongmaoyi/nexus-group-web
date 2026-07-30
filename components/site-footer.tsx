import Link from 'next/link'
import { Mail, MapPin, MessageCircle } from 'lucide-react'

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
  contact: t('Contact Us', '联系我们', 'Nous contacter'),
  director: t('Director', '董事', 'Directeur'),
  generalManager: t('General Manager', '总经理', 'Directeur général'),
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]
  return (
    <footer className="border-t border-white/10 bg-[#06191d] text-white">
      <div className="mx-auto grid max-w-[1760px] gap-9 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.75fr_1.35fr] lg:px-12">
        <div>
          <BrandMark href={`/${locale}`} adaptive />
          <p className="mt-4 max-w-lg text-base leading-7 text-white/64">{localized(copy.body)}</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          {groups.map((group) => <div key={group.title.en}><h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#b8d683]">{localized(group.title)}</h3><div className="mt-3 grid gap-2.5">{group.links.map((item) => <Link key={item.slug} href={`/${locale}/${item.slug}`} className="text-[0.94rem] text-white/64 hover:text-white">{localized(item.label)}</Link>)}</div></div>)}
        </div>
        <div className="lg:border-l lg:border-white/10 lg:pl-8">
          <h2 className="text-xl font-semibold">{localized(copy.contact)}</h2>
          <div className="mt-4 grid gap-5">
            <address className="not-italic">
              <p className="text-base font-semibold text-white">Mr. Lin Jian</p>
              <p className="mt-0.5 text-sm font-medium text-[#b8d683]">{localized(copy.director)}</p>
              <div className="mt-2.5 grid gap-1.5 text-sm leading-5 text-white/68">
                <a href="mailto:leo@nexuslife.ca" className="flex items-start gap-2 hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d683]" /><span>leo@nexuslife.ca</span></a>
                <a href="https://wa.me/14168463253" target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-white"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d683]" /><span>+1 416 846 3253</span></a>
                <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d683]" /><span>125 Cartmel Drive, Markham, Ontario, Canada, L3S 1K8</span></p>
              </div>
            </address>
            <address className="border-t border-white/10 pt-4 not-italic">
              <p className="text-base font-semibold text-white">Satya Sharma</p>
              <p className="mt-0.5 text-sm font-medium text-[#b8d683]">{localized(copy.generalManager)}</p>
              <div className="mt-2.5 grid gap-1.5 text-sm leading-5 text-white/68">
                <a href="mailto:satya@nexuslife.ca" className="flex items-start gap-2 hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d683]" /><span>satya@nexuslife.ca</span></a>
                <a href="https://wa.me/919517149685" target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-white"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d683]" /><span>+91 9517149685</span></a>
                <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d683]" /><span>Yiwu International Trade City, Zhejiang, China</span></p>
              </div>
            </address>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10"><div className="mx-auto flex max-w-[1760px] flex-col gap-2 px-5 py-4 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span>© {new Date().getFullYear()} NEXUS LIFE GROUP. All rights reserved.</span><span>English · 中文 · Français</span></div></div>
    </footer>
  )
}
