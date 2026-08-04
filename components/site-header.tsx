import Link from 'next/link'
import { ArrowUpRight, ChevronDown, LayoutDashboard } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import { LocaleSwitcher } from '@/components/locale-switcher'
import type { Locale } from '@/lib/i18n'
import { isPhase5PublicComplianceEnabled } from '@/lib/phase5-core.mjs'

type Localized = Record<Locale, string>
const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const primary = [
  { slug: 'products', label: t('Solutions', '解决方案', 'Solutions') },
  { slug: 'assembly-centre', label: t('How We Deliver', '交付方式', 'Notre approche') },
  { slug: 'projects', label: t('Projects', '项目', 'Projets') },
  { slug: 'about', label: t('About', '关于', 'À propos') },
]

const secondary = [
  { slug: 'industries', label: t('Industries', '行业', 'Secteurs') },
  { slug: 'suppliers', label: t('Suppliers', '供应商', 'Fournisseurs') },
  { slug: 'news', label: t('Innovation & News', '创新与新闻', 'Innovation et actualités') },
  { slug: 'contact', label: t('Contact', '联系', 'Contact') },
]

const copy = {
  more: t('More', '更多', 'Plus'),
  portal: t('Portal', '门户', 'Portail'),
  start: t('Start a Project', '启动项目', 'Démarrer un projet'),
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]
  const moreLinks = isPhase5PublicComplianceEnabled()
    ? [...secondary, { slug: 'compliance', label: t('Compliance Centre', '合规中心', 'Centre de conformité') }]
    : secondary

  return (
    <header className="absolute inset-x-0 top-0 z-50 overflow-x-hidden border-b border-white/15 bg-[linear-gradient(180deg,rgba(7,13,15,.76),rgba(7,13,15,.2))] text-white">
      <div className="mx-auto flex min-h-[82px] max-w-[1760px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <BrandMark href={`/${locale}`} adaptive />

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {primary.map((item) => (
            <Link key={item.slug} href={`/${locale}/${item.slug}`} className="text-sm font-semibold text-white/76 transition hover:text-white">
              {localized(item.label)}
            </Link>
          ))}
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-white/76 transition hover:text-white">
              {localized(copy.more)} <ChevronDown className="h-3.5 w-3.5 transition group-open:rotate-180" />
            </summary>
            <div className="absolute left-1/2 top-8 w-60 -translate-x-1/2 border border-black/10 bg-[#f4f1e9] p-2 text-[#11191b] shadow-2xl">
              {moreLinks.map((item) => (
                <Link key={item.slug} href={`/${locale}/${item.slug}`} className="block px-4 py-3 text-sm font-semibold transition hover:bg-[#e3e0d7] hover:text-[#176b96]">
                  {localized(item.label)}
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full bg-white/95 text-[#11191b] lg:block"><LocaleSwitcher locale={locale} /></div>
          <Link href={`/${locale}/portal`} className="inline-flex min-h-10 items-center gap-2 border border-white/35 px-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-white/10 sm:px-4">
            <LayoutDashboard className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{localized(copy.portal)}</span>
          </Link>
          <Link href={`/${locale}/contact`} className="inline-flex min-h-10 items-center gap-2 bg-white px-3 text-xs font-bold uppercase tracking-[0.1em] text-[#11191b] transition hover:bg-[#75bfe8] sm:px-4">
            <span className="hidden sm:inline">{localized(copy.start)}</span><span className="sm:hidden">{localized(t('Start', '启动', 'Démarrer'))}</span> <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <nav className="mx-auto flex w-full max-w-full items-center gap-6 overflow-x-auto px-5 pb-3 text-xs font-semibold text-white/78 sm:px-8 lg:px-12 xl:hidden" aria-label="Primary navigation">
        {primary.map((item) => (
          <Link key={item.slug} href={`/${locale}/${item.slug}`} className="shrink-0 whitespace-nowrap hover:text-white">{localized(item.label)}</Link>
        ))}
        {moreLinks.map((item) => (
          <Link key={item.slug} href={`/${locale}/${item.slug}`} className="shrink-0 whitespace-nowrap hover:text-white">{localized(item.label)}</Link>
        ))}
        <span className="shrink-0 lg:hidden"><LocaleSwitcher locale={locale} dark /></span>
      </nav>
    </header>
  )
}
