import Link from 'next/link'
import { ArrowUpRight, Menu } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import { LocaleSwitcher } from '@/components/locale-switcher'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const navigation = [
  { slug: 'products', label: t('Living Spaces', '生活空间', 'Espaces de vie') },
  { slug: 'industries', label: t('Solutions', '解决方案', 'Solutions') },
  { slug: 'projects', label: t('Projects', '项目', 'Projets') },
  { slug: 'news', label: t('Innovation', '创新', 'Innovation') },
  { slug: 'about', label: t('Sustainability', '可持续发展', 'Durabilité') },
  { slug: 'about', label: t('About Us', '关于我们', 'À propos') },
  { slug: 'news', label: t('News', '新闻', 'Actualités') },
  { slug: 'contact', label: t('Contact', '联系', 'Contact') },
]

const copy = {
  tagline: t('Building Spaces. Creating Life.', '构筑空间，创造生活。', 'Bâtir des espaces. Créer la vie.'),
  cta: t('Get in Touch', '联系我们', 'Nous contacter'),
  menu: t('Menu', '菜单', 'Menu'),
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/12 bg-[linear-gradient(180deg,rgba(3,17,21,.72),rgba(3,17,21,.18))] text-white">
      <div className="mx-auto flex min-h-[88px] max-w-[1760px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <div className="flex shrink-0 items-center gap-4">
          <div className="rounded-lg bg-white/95 px-2 py-1 shadow-sm"><BrandMark href={`/${locale}`} /></div>
          <span className="hidden max-w-28 border-l border-white/25 pl-4 text-[0.62rem] font-medium leading-4 text-white/76 lg:block">{localized(copy.tagline)}</span>
        </div>

        <nav className="hidden items-center gap-5 2xl:flex" aria-label="Primary navigation">
          {navigation.map((item, index) => (
            <Link key={`${item.slug}-${index}`} href={`/${locale}/${item.slug}`} className="text-[0.72rem] font-medium text-white/78 transition hover:text-white">
              {localized(item.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full bg-white/95 text-[#0b2528] sm:block"><LocaleSwitcher locale={locale} /></div>
          <Link href={`/${locale}/contact`} className="hidden items-center gap-2 rounded-full border border-white/45 bg-white/8 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#0b2528] sm:inline-flex">
            {localized(copy.cta)} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <details className="relative 2xl:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/35 bg-black/15 px-4 py-2.5 text-xs font-semibold"><Menu className="h-4 w-4" /> {localized(copy.menu)}</summary>
            <div className="absolute right-0 top-14 w-80 rounded-2xl border border-white/15 bg-[#0b2528] p-3 shadow-lift">
              <div className="mb-2 rounded-xl bg-white text-[#0b2528] sm:hidden"><LocaleSwitcher locale={locale} /></div>
              {navigation.map((item, index) => <Link key={`${item.slug}-${index}`} href={`/${locale}/${item.slug}`} className="block rounded-xl px-4 py-3 text-sm font-medium text-white/72 hover:bg-white/8 hover:text-white">{localized(item.label)}</Link>)}
              <Link href={`/${locale}/contact`} className="mt-2 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#0b2528]">{localized(copy.cta)} <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
