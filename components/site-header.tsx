import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import { LocaleSwitcher } from '@/components/locale-switcher'
import type { Locale } from '@/lib/i18n'
import { isPhase5PublicComplianceEnabled } from '@/lib/phase5-core.mjs'

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
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]
  const visibleNavigation = isPhase5PublicComplianceEnabled()
    ? [...navigation, { slug: 'compliance', label: t('Compliance', '合规中心', 'Conformité') }]
    : navigation

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-[linear-gradient(180deg,rgba(3,17,21,.76),rgba(3,17,21,.22))] text-white">
      <div className="mx-auto flex min-h-[76px] max-w-[1760px] items-center justify-between gap-3 px-5 py-2.5 sm:px-8 lg:px-12">
        <div className="flex shrink-0 items-center gap-4">
          <BrandMark href={`/${locale}`} adaptive />
          <span className="hidden max-w-32 border-l border-white/25 pl-4 text-[0.72rem] font-medium leading-[1.35] text-white/78 2xl:block">{localized(copy.tagline)}</span>
        </div>

        <nav className="hidden items-center gap-3 xl:flex 2xl:gap-5" aria-label="Primary navigation">
          {visibleNavigation.map((item, index) => (
            <Link key={`${item.slug}-${index}`} href={`/${locale}/${item.slug}`} className="whitespace-nowrap text-[0.94rem] font-semibold text-white/86 transition hover:text-white 2xl:text-base">
              {localized(item.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full bg-white/95 text-[#0b2528] lg:block"><LocaleSwitcher locale={locale} /></div>
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-1.5 rounded-full border border-white/45 bg-white/8 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#0b2528] sm:px-4">
            {localized(copy.cta)} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      <nav className="mx-auto flex max-w-[1760px] gap-6 overflow-x-auto px-5 pb-3 text-sm font-semibold text-white/84 sm:px-8 lg:px-12 xl:hidden" aria-label="Primary navigation">
        {visibleNavigation.map((item, index) => (
          <Link key={`${item.slug}-compact-${index}`} href={`/${locale}/${item.slug}`} className="shrink-0 whitespace-nowrap transition hover:text-white">
            {localized(item.label)}
          </Link>
        ))}
      </nav>
    </header>
  )
}
