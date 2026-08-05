import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'

import { solutionSections, solutionsCopy } from '@/lib/consolidated-site-content'
import type { Locale } from '@/lib/i18n'

export function SolutionsPage({ locale }: { locale: Locale }) {
  const text = (value: Record<Locale, string>) => value[locale]
  const labels = solutionsCopy.labels
  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#11191b]">
      <section className="relative overflow-hidden bg-[#082328] pb-20 pt-40 text-white">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(45,130,176,.28),transparent_62%)]" />
        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p className="eyebrow text-[#b8d683]">{text(solutionsCopy.eyebrow)}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{text(solutionsCopy.title)}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72">{text(solutionsCopy.intro)}</p>
          <Link href={`/${locale}/contact`} className="premium-button-light mt-8">{text(solutionsCopy.cta)}<ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
      <nav className="sticky top-0 z-40 border-b border-black/10 bg-[#f4f1e9]/95 backdrop-blur" aria-label={text(solutionsCopy.title)}>
        <div className="mx-auto flex max-w-[1320px] gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12">
          {solutionSections.map((section) => <a key={section.id} href={`#${section.id}`} className="shrink-0 border border-black/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition hover:border-[#176b96] hover:text-[#176b96]">{text(section.title)}</a>)}
        </div>
      </nav>
      <section id="industries" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <p className="premium-eyebrow">{text(solutionsCopy.industriesTitle)}</p>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{text(solutionsCopy.industriesBody)}</p>
        <div className="mt-8 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {solutionSections.map((section) => <a key={section.id} href={`#${section.id}`} className="bg-white p-5 transition hover:bg-[#eef4f6]"><p className="font-semibold">{text(section.title)}</p><p className="mt-2 text-sm leading-6 text-slate-600">{text(section.summary)}</p></a>)}
        </div>
      </section>
      <div className="border-t border-black/10">
        {solutionSections.map((section, index) => (
          <section key={section.id} id={section.id} className={`scroll-mt-24 px-5 py-16 sm:px-8 lg:px-12 lg:py-24 ${index % 2 ? 'bg-white' : 'bg-[#f4f1e9]'}`}>
            <div className="mx-auto max-w-[1320px]">
              <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
                <div><p className="text-xs font-bold tracking-[0.18em] text-[#176b96]">{String(index + 1).padStart(2, '0')}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{text(section.title)}</h2></div>
                <p className="max-w-3xl text-lg leading-8 text-slate-600">{text(section.summary)}</p>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {[
                  [labels.bestFor, section.bestFor], [labels.firstInfo, section.firstInfo], [labels.costDrivers, section.costDrivers],
                  [labels.delays, section.delays], [labels.nexus, section.nexus], [labels.local, section.local],
                ].map(([label, items]) => (
                  <article key={text(label as Record<Locale,string>)} className="border border-slate-200 bg-[#f8faf9] p-5 sm:p-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#176b96]">{text(label as Record<Locale,string>)}</h3>
                    <div className="mt-4 grid gap-3">{(items as Array<Record<Locale,string>>).map((entry) => <p key={text(entry)} className="flex items-start gap-3 text-sm leading-6 text-slate-700"><Check className="mt-1 h-4 w-4 shrink-0 text-[#176b96]" />{text(entry)}</p>)}</div>
                  </article>
                ))}
              </div>
              <Link href={`/${locale}/contact#project-inquiry`} className="premium-button-dark mt-8">{text(solutionsCopy.cta)}<ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
