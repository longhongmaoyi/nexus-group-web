import Link from 'next/link'
import { ArrowUpRight, ChevronDown, LayoutDashboard, Menu } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import { LocaleSwitcher } from '@/components/locale-switcher'
import type { Locale } from '@/lib/i18n'
import { isPhase5PublicComplianceEnabled } from '@/lib/phase5-core.mjs'

type Localized = Record<Locale, string>
const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const primary = [
  { slug: 'products', label: t('Solutions', '解决方案', 'Solutions') },
  { slug: 'assembly-centre', label: t('How We Deliver', '交付方式', 'Notre approche') },
  { slug: 'buyer-resources', label: t('Resources', '资源', 'Ressources') },
  { slug: 'about', label: t('About', '关于', 'À propos') },
]

const secondary = [
  { slug: 'industries', label: t('Industries', '行业', 'Secteurs') },
  { slug: 'projects', label: t('Projects & Proof', '项目与证据', 'Projets et preuves') },
  { slug: 'technology-services', label: t('Technology Services', '技术服务', 'Services technologiques') },
  { slug: 'suppliers', label: t('Suppliers', '供应商', 'Fournisseurs') },
  { slug: 'news', label: t('Guides & Insights', '指南与洞察', 'Guides et analyses') },
  { slug: 'contact', label: t('Contact', '联系', 'Contact') },
]

const copy = {
  more: t('More', '更多', 'Plus'),
  menu: t('Menu', '菜单', 'Menu'),
  portal: t('Client Portal', '客户门户', 'Portail client'),
  start: t('Start a Project', '启动项目', 'Démarrer un projet'),
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]
  const moreLinks = isPhase5PublicComplianceEnabled()
    ? [...secondary, { slug: 'compliance', label: t('Compliance Centre', '合规中心', 'Centre de conformité') }]
    : secondary
  const mobileLinks = [...primary, ...moreLinks]

  return (
    <header className="absolute inset-x-0 top-0 z-[100] isolate overflow-visible border-b border-white/15 bg-[linear-gradient(180deg,rgba(7,13,15,.94),rgba(7,13,15,.84))] text-white">
      <div className="relative z-[110] mx-auto flex min-h-[76px] max-w-[1760px] items-center gap-1.5 overflow-visible px-3 py-3 sm:min-h-[82px] sm:gap-3 sm:px-8 lg:px-12">
        <BrandMark href={`/${locale}`} adaptive compactOnMobile />

        <nav className="relative z-[120] ml-auto hidden items-center gap-6 overflow-visible xl:flex" aria-label="Primary navigation">
          {primary.map((item) => (
            <Link key={item.slug} href={`/${locale}/${item.slug}`} className="text-sm font-semibold text-white/76 transition hover:text-white">
              {localized(item.label)}
            </Link>
          ))}
          <details className="group relative z-[130] overflow-visible">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-white/76 transition hover:text-white">
              {localized(copy.more)}
              <ChevronDown className="h-3.5 w-3.5 transition group-open:rotate-180" />
            </summary>
            <div className="absolute right-0 top-full z-[200] mt-4 w-72 border border-black/10 bg-[#f4f1e9] p-2 text-[#11191b] shadow-2xl">
              {moreLinks.map((item) => (
                <Link key={item.slug} href={`/${locale}/${item.slug}`} className="block px-4 py-3 text-sm font-semibold transition hover:bg-[#e3e0d7] hover:text-[#176b96]">
                  {localized(item.label)}
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 xl:ml-0">
          <div className="lg:hidden"><LocaleSwitcher locale={locale} dark compact /></div>
          <div className="hidden rounded-full bg-white/95 text-[#11191b] lg:block"><LocaleSwitcher locale={locale} /></div>

          <Link
            href={`/${locale}/portal`}
            aria-label={localized(copy.portal)}
            className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 border border-white/35 px-2 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-white/10 sm:px-4"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden 2xl:inline">{localized(copy.portal)}</span>
          </Link>

          <Link href={`/${locale}/contact`} className="inline-flex min-h-10 items-center gap-1.5 bg-white px-2.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[#11191b] transition hover:bg-[#75bfe8] sm:gap-2 sm:px-4 sm:text-xs sm:tracking-[0.1em]">
            <span className="hidden sm:inline">{localized(copy.start)}</span>
            <span className="sm:hidden">{localized(t('Start', '启动', 'Démarrer'))}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <details className="group border-t border-white/12 bg-[#06191d]/96 xl:hidden">
        <summary className="mx-auto flex min-h-11 max-w-[1760px] cursor-pointer list-none items-center justify-between px-4 text-xs font-bold uppercase tracking-[0.14em] text-white/82 sm:px-8 lg:px-12">
          <span className="inline-flex items-center gap-2"><Menu className="h-4 w-4" />{localized(copy.menu)}</span>
          <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
        </summary>
        <nav className="mx-auto grid max-w-[1760px] grid-cols-2 gap-px bg-white/10 px-3 pb-3 sm:grid-cols-3 sm:px-8 lg:px-12" aria-label="Mobile navigation">
          {mobileLinks.map((item) => (
            <Link key={item.slug} href={`/${locale}/${item.slug}`} className="min-w-0 bg-[#06191d] px-3 py-3 text-sm font-semibold leading-5 text-white/78 transition hover:bg-white/10 hover:text-white">
              {localized(item.label)}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  )
}
