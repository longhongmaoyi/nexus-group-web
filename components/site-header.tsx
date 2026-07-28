import Link from 'next/link'
import { ArrowUpRight, Menu } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import { LocaleSwitcher } from '@/components/locale-switcher'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const navigation = [
  { slug: 'products', label: t('Homes & Spaces', '住宅与空间', 'Maisons et espaces') },
  { slug: 'industries', label: t('Communities', '社区', 'Collectivités') },
  { slug: 'assembly-centre', label: t('Our Approach', '我们的方式', 'Notre approche') },
  { slug: 'projects', label: t('Stories', '故事', 'Histoires') },
  { slug: 'about', label: t('About', '关于我们', 'À propos') },
]

const copy = {
  utility: t('Thoughtful modular living for Canada.', '为加拿大打造用心的模块化生活。', 'Un habitat modulaire pensé avec soin pour le Canada.'),
  cta: t('Talk with us', '与我们沟通', 'Parlons-en'),
  menu: t('Menu', '菜单', 'Menu'),
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]

  return (
    <>
      <div className="bg-[#315b4d] text-white">
        <div className="mx-auto max-w-8xl px-5 py-2 text-center text-[0.7rem] font-medium tracking-wide sm:px-8 lg:px-12">
          {localized(copy.utility)}
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-[#dce5db] bg-[#fffdf9]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-8xl items-center justify-between gap-5 px-5 py-3 sm:px-8 lg:px-12">
          <div className="shrink-0 origin-left scale-[0.84] sm:scale-[0.9] lg:scale-100"><BrandMark href={`/${locale}`} /></div>
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
            {navigation.map((item) => <Link key={item.slug} href={`/${locale}/${item.slug}`} className="text-[0.8rem] font-semibold text-[#50645a] transition hover:text-[#1d352e]">{localized(item.label)}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            <LocaleSwitcher locale={locale} />
            <Link href={`/${locale}/contact`} className="hidden items-center gap-2 rounded-full bg-[#315b4d] px-5 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#24463a] sm:inline-flex">{localized(copy.cta)} <ArrowUpRight className="h-4 w-4" /></Link>
            <details className="relative xl:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#d6e0d3] px-4 py-2.5 text-xs font-bold text-[#315b4d]"><Menu className="h-4 w-4" /> {localized(copy.menu)}</summary>
              <div className="absolute right-0 top-14 w-80 rounded-3xl border border-[#d6e0d3] bg-[#fffdf9] p-3 shadow-lift">
                {navigation.map((item) => <Link key={item.slug} href={`/${locale}/${item.slug}`} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#50645a] hover:bg-[#edf2ea] hover:text-[#1d352e]">{localized(item.label)}</Link>)}
                <Link href={`/${locale}/contact`} className="mt-2 flex items-center justify-between rounded-2xl bg-[#315b4d] px-4 py-3 text-sm font-bold text-white">{localized(copy.cta)} <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </details>
          </div>
        </div>
      </header>
    </>
  )
}
