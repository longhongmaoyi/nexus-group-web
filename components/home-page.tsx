import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  Globe2,
  Handshake,
  Leaf,
  MapPinned,
  PackageCheck,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'
import {
  conceptProjects,
  deliverySteps,
  homeCopy,
  localized,
  metrics,
  solutionCards,
} from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { HeroSlideshow } from '@/components/hero-slideshow'

const trustIcons = [PackageCheck, ShieldCheck, Snowflake, Globe2]
const stepIcons = [Globe2, Boxes, BadgeCheck, Truck, Wrench]

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <main>
      <section className="relative min-h-[690px] overflow-hidden bg-ink text-white">
        <HeroSlideshow />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,27,43,.97)_0%,rgba(7,27,43,.84)_34%,rgba(7,27,43,.34)_67%,rgba(7,27,43,.16)_100%)]" />
        <div className="relative mx-auto flex min-h-[690px] max-w-8xl flex-col justify-between px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur"><Sparkles className="h-4 w-4" /> {localized(homeCopy.heroEyebrow, locale)}</span>
            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[5.6rem]">{localized(homeCopy.heroTitle, locale)}</h1>
            <p className="mt-7 max-w-2xl text-xl font-medium leading-8 text-white/90 sm:text-2xl">{localized(homeCopy.heroSubtitle, locale)}</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">{localized(homeCopy.heroBody, locale)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#819e48]">{localized(homeCopy.primaryCta, locale)} <ArrowRight className="h-4 w-4" /></Link>
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink">{localized(homeCopy.secondaryCta, locale)}</Link>
            </div>
          </div>
          <div className="mt-14 grid overflow-hidden rounded-3xl border border-white/15 bg-black/25 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
            {homeCopy.trust.map((item, index) => {
              const Icon = trustIcons[index]
              return <div key={item.en} className="flex items-center gap-3 border-white/15 px-5 py-5 sm:border-r last:border-r-0"><Icon className="h-6 w-6 text-[#a8c36b]" /><span className="text-sm font-semibold">{localized(item, locale)}</span></div>
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="eyebrow">{localized(homeCopy.solutionsEyebrow, locale)}</p>
            <h2 className="section-title">{localized(homeCopy.solutionsTitle, locale)}</h2>
            <p className="section-copy">{localized(homeCopy.solutionsBody, locale)}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {solutionCards.map((card) => (
              <Link href={`/${locale}/products#${card.slug}`} key={card.slug} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden"><Image src={card.image} alt={localized(card.title, locale)} fill quality={100} className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 20vw" /></div>
                <div className="p-5">
                  <h3 className="text-lg font-bold tracking-tight text-ink">{localized(card.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{localized(card.description, locale)}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-forest">{localized(homeCopy.learnMore, locale)} <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 text-white lg:py-28">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-forest/20 blur-3xl" />
        <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow text-[#a8c36b]">{localized(homeCopy.assemblyEyebrow, locale)}</p>
              <h2 className="section-title text-white">{localized(homeCopy.assemblyTitle, locale)}</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/65 lg:justify-self-end">{localized(homeCopy.assemblyBody, locale)}</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {deliverySteps.map((step, index) => {
              const Icon = stepIcons[index]
              return <div key={step.key} className="rounded-3xl border border-white/12 bg-white/[0.055] p-6 backdrop-blur transition hover:bg-white/[0.09]">
                <div className="flex items-center justify-between"><Icon className="h-7 w-7 text-[#a8c36b]" /><span className="text-xs font-bold text-white/35">{step.key}</span></div>
                <h3 className="mt-8 text-xl font-bold">{localized(step.title, locale)}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{localized(step.body, locale)}</p>
              </div>
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto grid max-w-8xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:px-12">
          <div>
            <p className="eyebrow">{localized(homeCopy.footprintEyebrow, locale)}</p>
            <h2 className="section-title">{localized(homeCopy.footprintTitle, locale)}</h2>
            <p className="section-copy">{localized(homeCopy.footprintBody, locale)}</p>
            <div className="mt-9 grid grid-cols-2 gap-3">
              {[MapPinned, Users, Handshake, Leaf].map((Icon, index) => (
                <div key={index} className="rounded-2xl border border-ink/10 bg-white p-4"><Icon className="h-6 w-6 text-forest" /><p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-600">{['Canada', 'Global Team', 'Partner Network', 'Sustainable Vision'][index]}</p></div>
              ))}
            </div>
          </div>
          <div className="rounded-4xl bg-white p-6 shadow-soft sm:p-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {metrics.map((metric) => <div key={metric.value + metric.label.en} className="rounded-3xl bg-slate-50 p-5 text-center"><strong className="text-4xl font-semibold tracking-tight text-ink">{metric.value}</strong><span className="mt-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{localized(metric.label, locale)}</span></div>)}
            </div>
            <div className="mt-5 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(112,138,61,.18),transparent_35%),linear-gradient(135deg,#f7f9f7,#e9efeb)] p-7 sm:p-9">
              <div className="grid gap-4 sm:grid-cols-3">
                {[['Global Sourcing', Globe2], ['Canada Assembly', Building2], ['Local Delivery', Truck]].map(([label, Icon]) => {
                  const IconComponent = Icon as typeof Globe2
                  return <div key={String(label)} className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm"><IconComponent className="h-5 w-5 text-forest" /></span><span className="text-sm font-bold text-ink">{String(label)}</span></div>
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl"><p className="eyebrow">{localized(homeCopy.projectsEyebrow, locale)}</p><h2 className="section-title">{localized(homeCopy.projectsTitle, locale)}</h2></div>
            <Link href={`/${locale}/projects`} className="inline-flex items-center gap-2 text-sm font-bold text-ink">{localized(homeCopy.viewAll, locale)} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {conceptProjects.map((project) => <article key={project.title.en} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="relative aspect-[16/10] overflow-hidden"><Image src={project.image} alt={localized(project.title, locale)} fill quality={100} className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.13em] text-ink backdrop-blur">Concept</span></div>
              <div className="p-5"><h3 className="text-lg font-bold text-ink">{localized(project.title, locale)}</h3><p className="mt-2 text-sm text-slate-500">{localized(project.meta, locale)}</p></div>
            </article>)}
          </div>
          <p className="mt-6 text-xs leading-5 text-slate-500">{localized(homeCopy.projectsNote, locale)}</p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto grid max-w-8xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
          <div className="max-w-4xl"><p className="eyebrow">{localized(homeCopy.supplierEyebrow, locale)}</p><h2 className="section-title">{localized(homeCopy.supplierTitle, locale)}</h2><p className="section-copy">{localized(homeCopy.supplierBody, locale)}</p></div>
          <Link href={`/${locale}/suppliers`} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-forest">{localized(homeCopy.supplierCta, locale)} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-8xl px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow text-[#a8c36b]">NEXUS GROUP</p>
              <h2 className="section-title text-white">{localized(homeCopy.ctaTitle, locale)}</h2>
              <p className="mt-4 text-base leading-7 text-white/70">{localized(homeCopy.ctaBody, locale)}</p>
            </div>
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#819e48]">{localized(homeCopy.secondaryCta, locale)} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
