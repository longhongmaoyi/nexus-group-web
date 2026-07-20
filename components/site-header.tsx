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
  {
    slug: 'assembly-centre',
    label: t('Delivery & Compliance', '交付与合规', 'Livraison et conformité'),
  },
  { slug: 'projects', label: t('Projects', '项目', 'Projets') },
  { slug: 'suppliers', label: t('Partners', '合作伙伴', 'Partenaires') },
  { slug: 'about', label: t('About', '关于我们', 'À propos') },
]

const copy = {
  utility: t(
    'Global capability. Coordinated for Canadian delivery.',
    '全球能力，加拿大本地化协调与交付。',
    'Capacité mondiale. Coordination pour une livraison au Canada.',
  ),
  location: t(
    'Canada · China · Global Network',
    '加拿大 · 中国 · 全球网络',
    'Canada · Chine · Réseau mondial',
  ),
  cta: t('Start a Project', '启动项目', 'Démarrer un projet'),
  menu: t('Menu', '菜单', 'Menu'),
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]

  return (
    <>
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-5 py-2 text-[0.7rem] tracking-wide sm:px-8 lg:px-12">
          <span>{localized(copy.utility)}</span>
          <span className="hidden items-center gap-2 text-white/65 md:flex">
            <MapPin className="h-3.5 w-3.5" /> {localized(copy.location)}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[76px] max-w-8xl items-center justify-between gap-5 px-5 py-3 sm:px-8 lg:px-12">
          <div className="shrink-0 origin-left scale-[0.92] lg:scale-100">
            <BrandMark href={`/${locale}`} />
          </div>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/${item.slug}`}
                className="group relative py-2 text-[0.8rem] font-semibold text-slate-700 transition hover:text-ink"
              >
                <span>{localized(item.label)}</span>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#173b58] sm:inline-flex"
            >
              {localized(copy.cta)} <ArrowUpRight className="h-4 w-4" />
            </Link>

            <details className="relative xl:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-bold">
                <Menu className="h-4 w-4" /> {localized(copy.menu)}
              </summary>
              <div className="absolute right-0 top-14 w-80 rounded-3xl border border-slate-200 bg-white p-3 shadow-lift">
                {navigation.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${locale}/${item.slug}`}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-ink"
                  >
                    {localized(item.label)}
                  </Link>
                ))}
                <Link
                  href={`/${locale}/contact`}
                  className="mt-2 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-white"
                >
                  {localized(copy.cta)} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </details>
          </div>
        </div>
      </header>
    </>
  )
}
