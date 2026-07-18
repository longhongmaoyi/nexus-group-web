import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { homeCopy, localized, navigation } from '@/lib/content'
import type { Locale } from '@/lib/i18n'

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <>
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-5 py-2.5 text-[0.72rem] sm:px-8 lg:px-12">
          <span>{localized(homeCopy.utility, locale)}</span>
          <span className="hidden items-center gap-2 text-white/70 md:flex"><MapPin className="h-3.5 w-3.5" /> Canada · Global</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[86px] max-w-8xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <BrandMark href={`/${locale}`} />
          <nav className="hidden items-center gap-4 xl:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link key={item.slug} href={`/${locale}/${item.slug}`} className="text-[0.78rem] font-semibold text-slate-700 transition hover:text-forest">
                {localized(item.label, locale)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LocaleSwitcher locale={locale} />
            <Link href={`/${locale}/contact`} className="hidden items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-forest sm:inline-flex">
              {localized(homeCopy.contactCta, locale)} <ArrowUpRight className="h-4 w-4" />
            </Link>
            <details className="relative xl:hidden">
              <summary className="cursor-pointer list-none rounded-full border border-slate-200 px-4 py-2 text-xs font-bold">Menu</summary>
              <div className="absolute right-0 top-12 w-72 rounded-3xl border border-slate-200 bg-white p-3 shadow-lift">
                {navigation.map((item) => (
                  <Link key={item.slug} href={`/${locale}/${item.slug}`} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-forest">
                    {localized(item.label, locale)}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
      </header>
    </>
  )
}
