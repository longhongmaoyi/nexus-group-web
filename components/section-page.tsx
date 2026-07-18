import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { InquiryForm } from '@/components/inquiry-form'
import { homeCopy, localized, sectionPages, type SectionSlug } from '@/lib/content'
import type { Locale } from '@/lib/i18n'

export function SectionPage({ locale, section }: { locale: Locale; section: SectionSlug }) {
  const page = sectionPages[section]
  return (
    <main>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-8xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="eyebrow text-[#a8c36b]">{localized(page.eyebrow, locale)}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">{localized(page.title, locale)}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">{localized(page.intro, locale)}</p>
        </div>
      </section>
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {page.blocks.map((block, index) => (
              <article key={localized(block.title, locale)} className="rounded-4xl border border-ink/10 bg-white p-7 shadow-sm sm:p-8">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-nexus-100 text-sm font-black text-forest">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-7 text-2xl font-bold tracking-tight text-ink">{localized(block.title, locale)}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{localized(block.body, locale)}</p>
                <CheckCircle2 className="mt-8 h-5 w-5 text-forest" />
              </article>
            ))}
          </div>
          {section === 'contact' ? (
            <div className="mt-14 max-w-4xl"><InquiryForm locale={locale} /></div>
          ) : (
            <div className="mt-14 rounded-4xl bg-ink p-8 text-white sm:p-10 lg:flex lg:items-center lg:justify-between">
              <div><h2 className="text-3xl font-bold tracking-tight">{localized(homeCopy.ctaTitle, locale)}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/62">{localized(homeCopy.ctaBody, locale)}</p></div>
              <Link href={`/${locale}/contact`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-white lg:mt-0">{localized(homeCopy.contactCta, locale)} <ArrowRight className="h-4 w-4" /></Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
