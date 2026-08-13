import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'

import type { InformationPageData } from '@/lib/consolidated-site-content'
import type { Locale } from '@/lib/i18n'

export function InformationPage({ locale, page }: { locale: Locale; page: InformationPageData }) {
  const text = (value: Record<Locale, string>) => value[locale]
  return (
    <main className="min-h-screen bg-cream text-ink">
      <section className="relative overflow-hidden bg-ink pb-20 pt-40 text-white">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(61,147,184,.28),transparent_62%)]" />
        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p className="eyebrow text-brand-frost">{text(page.eyebrow)}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{text(page.title)}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72">{text(page.intro)}</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="border-l-4 border-brand bg-white p-6 shadow-soft sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{text(page.calloutTitle)}</p>
          <p className="mt-4 max-w-5xl text-lg leading-8 text-slate-700">{text(page.calloutBody)}</p>
        </div>
      </section>
      <section className="border-y border-black/10 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-5 md:grid-cols-2">
          {page.sections.map((section, index) => (
            <article key={text(section.title)} className="border border-slate-200 bg-[#f8faf9] p-6 sm:p-8">
              <span className="text-xs font-black tracking-[0.18em] text-brand">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{text(section.title)}</h2>
              <p className="mt-5 leading-8 text-slate-600">{text(section.body)}</p>
              <div className="mt-6 grid gap-3">{section.points.map((point) => <p key={text(point)} className="flex items-start gap-3 text-sm leading-6 text-slate-700"><Check className="mt-1 h-4 w-4 shrink-0 text-brand" />{text(point)}</p>)}</div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-brand px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.045em]">{text(page.ctaTitle)}</h2>
          <Link href={`/${locale}${page.ctaHref}`} className="premium-button-light shrink-0">{text(page.ctaLabel)}<ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  )
}
