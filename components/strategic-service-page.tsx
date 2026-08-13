import Link from 'next/link'
import { ArrowUpRight, Check, Phone } from 'lucide-react'

import type { Locale } from '@/lib/i18n'
import type { StrategicPage } from '@/lib/strategic-pages'

export function StrategicServicePage({ locale, page }: { locale: Locale; page: StrategicPage }) {
  const text = <T,>(value: Record<Locale, T>) => value[locale]
  return (
    <main className="min-h-screen bg-cream text-ink">
      <section className="relative overflow-hidden bg-ink pb-20 pt-40 text-white">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(61,147,184,.28),transparent_62%)]" />
        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p className="eyebrow text-brand-frost">{text(page.eyebrow)}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{text(page.title)}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72">{text(page.intro)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}${page.primaryHref}`} className="premium-button-light">{text(page.primaryLabel)}<ArrowUpRight className="h-4 w-4" /></Link>
            <Link href={`/${locale}${page.secondaryHref}`} className="premium-button-ghost"><Phone className="h-4 w-4" />{text(page.secondaryLabel)}</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <p className="premium-eyebrow">{text(page.audienceTitle)}</p>
        <div className="mt-7 grid gap-px bg-black/10 md:grid-cols-2">
          {page.audience.map((item) => <div key={text(item)} className="flex gap-3 bg-white p-5 sm:p-6"><Check className="mt-1 h-4 w-4 shrink-0 text-brand" /><p className="leading-7 text-slate-700">{text(item)}</p></div>)}
        </div>
      </section>
      <section className="border-y border-black/10 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-6 md:grid-cols-2">
            {page.sections.map((section, index) => (
              <article key={text(section.title)} className={index === page.sections.length - 1 && page.sections.length % 2 === 1 ? 'border border-slate-200 bg-[#f8faf9] p-6 sm:p-8 md:col-span-2' : 'border border-slate-200 bg-[#f8faf9] p-6 sm:p-8'}>
                <span className="text-xs font-black tracking-[0.18em] text-brand">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{text(section.title)}</h2>
                <p className="mt-5 max-w-3xl leading-8 text-slate-600">{text(section.body)}</p>
                <div className="mt-6 grid gap-3">{section.points.map((point) => <p key={text(point)} className="flex items-start gap-3 text-sm leading-6 text-slate-700"><Check className="mt-1 h-4 w-4 shrink-0 text-brand" />{text(point)}</p>)}</div>
              </article>
            ))}
          </div>
          {page.note ? <div className="mt-8 border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">{text(page.note)}</div> : null}
        </div>
      </section>
      <section className="bg-brand px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em]">{text(page.primaryLabel)}</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}${page.primaryHref}`} className="premium-button-light">{text(page.primaryLabel)}<ArrowUpRight className="h-4 w-4" /></Link>
            <Link href={`/${locale}${page.secondaryHref}`} className="premium-button-ghost">{text(page.secondaryLabel)}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
