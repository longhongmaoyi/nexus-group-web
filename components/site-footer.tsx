import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { homeCopy, localized, navigation } from '@/lib/content'
import type { Locale } from '@/lib/i18n'

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto grid max-w-8xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.15fr_1.25fr_0.8fr] lg:px-12 lg:py-12">
        <div>
          <div className="inline-flex rounded-xl bg-white px-3 py-2 shadow-sm">
            <BrandMark href={`/${locale}`} />
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
            {localized(homeCopy.heroBody, locale)}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold">NEXUS GROUP</h3>
            <div className="mt-4 grid gap-2">
              {navigation.slice(0, 4).map((item) => (
                <Link key={item.slug} href={`/${locale}/${item.slug}`} className="text-sm text-white/65 transition hover:text-white">{localized(item.label, locale)}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">Platform</h3>
            <div className="mt-4 grid gap-2">
              {navigation.slice(4).map((item) => (
                <Link key={item.slug} href={`/${locale}/${item.slug}`} className="text-sm text-white/65 transition hover:text-white">{localized(item.label, locale)}</Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold">Canada · Global</h3>
          <p className="mt-4 text-sm leading-6 text-white/65">Contact information will be confirmed before production launch.</p>
          <Link href={`/${locale}/contact`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#a8c36b]">{localized(homeCopy.contactCta, locale)} <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-8xl flex-col gap-2 px-5 py-4 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} NEXUS GROUP. All rights reserved.</span>
          <span>English default · 中文 · Français</span>
        </div>
      </div>
    </footer>
  )
}
