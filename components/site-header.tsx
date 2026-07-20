import Link from 'next/link'
import { ArrowUpRight, MapPin, Menu } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import { LocaleSwitcher } from '@/components/locale-switcher'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>

const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const navigation = [
  { slug: 'products', label: t('Solutions', '解决方案', 'Solutions') },
  { slug: 'industries', label: t('Industries', '行业', 'Secteurs') },
  { slug: 'assembly-centre', label: t('How We Deliver', '交付方式', 'Notre approche') },
  { slug: 'projects', label: t('Projects', '项目', 'Projets') },
  { slug: 'suppliers', label: t('Partners', '合作伙伴', 'Partenaires') },
  { slug: 'news', label: t('Insights', '洞察', 'Perspectives') },
  { slug: 'about', label: t('About', '关于我们', 'À propos') },
]

const copy = {
  utility: t(
    'Global technology. Coordinated for Canadian delivery.',
    '全球技术，加拿大本地化协调与交付。',
    'Technologies mondiales. Coordination pour une livraison au Canada.',
  ),
  location: t('Canada · China · Global Network', '加拿大 · 中国 · 全球网络', 'Canada · Chine · Réseau mondial'),
  cta: t('Start a Project', '启动项目', 'Démarrer un projet'),
  menu: t('Menu', '菜单', 'Menu'),
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]

  return (
    <>
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-8xl items-center justify-between gap-4 px-5 py-2.5 text-[0.72rem] sm:px-8 lg:px-12">
          <span>{localized(copy.utility)}</span>
          <span className="hidden items-center gap-2 text-white/65 md:flex">
            <MapPin className="h-3.5 w-3.5" /> {localized(copy.location)}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[86px] max-w-8xl items-center justify-between gap-5 px-5 py-3 sm:px-8 lg:px-12">
          <div className="shrink-0">
            <BrandMark href={`/${locale}`} />
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-5 xl:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/${item.slug}`}
                className="whitespace-nowrap text-[0.83rem] font-semibold text-slate-700 transition hover:text-ink"
              >
                {localized(item.label)}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <LocaleSwitcher locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-[#164e72]"
            >
              {localized(copy.cta)} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <details className="relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-ink">
              <Menu className="h-4 w-4" /> {localized(copy.menu)}
            </summary>
            <div className="absolute right-0 top-[calc(100%+12px)] w-[min(88vw,340px)] rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
              <div className="grid gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${locale}/${item.slug}`}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-ink"
                  >
                    {localized(item.label)}
                  </Link>
                ))}
              </div>
              <div className="mt-3 border-t border-slate-200 pt-4">
                <LocaleSwitcher locale={locale} />
                <Link
                  href={`/${locale}/contact`}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
                >
                  {localized(copy.cta)} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </details>
        </div>
      </header>
    </>
  )
}
