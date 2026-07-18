import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SectionPage } from '@/components/section-page'
import { localized, sectionPages, sectionSlugs, type SectionSlug } from '@/lib/content'
import { isLocale, locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.flatMap((locale) => sectionSlugs.map((section) => ({ locale, section })))
}

export function generateMetadata({ params }: { params: { locale: string; section: string } }): Metadata {
  if (!isLocale(params.locale) || !sectionSlugs.includes(params.section as SectionSlug)) return {}
  const page = sectionPages[params.section as SectionSlug]
  return {
    title: localized(page.eyebrow, params.locale as Locale),
    description: localized(page.intro, params.locale as Locale),
  }
}

export default function Page({ params }: { params: { locale: string; section: string } }) {
  if (!isLocale(params.locale) || !sectionSlugs.includes(params.section as SectionSlug)) notFound()
  return <SectionPage locale={params.locale} section={params.section as SectionSlug} />
}
