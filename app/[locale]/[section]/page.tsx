import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SectionPage } from '@/components/section-page'
import { localized, sectionPages, sectionSlugs, type SectionSlug } from '@/lib/content'
import { isLocale, type Locale } from '@/lib/i18n'
import { getPublishedCmsPage } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { locale: string; section: string } }): Promise<Metadata> {
  if (!isLocale(params.locale) || !sectionSlugs.includes(params.section as SectionSlug)) return {}
  const page = sectionPages[params.section as SectionSlug]
  const cms = await getPublishedCmsPage(params.section)
  return {
    title: cms?.seoTitle[params.locale as Locale] || localized(page.eyebrow, params.locale as Locale),
    description: cms?.seoDescription[params.locale as Locale] || localized(page.intro, params.locale as Locale),
  }
}

export default async function Page({ params }: { params: { locale: string; section: string } }) {
  if (!isLocale(params.locale) || !sectionSlugs.includes(params.section as SectionSlug)) notFound()
  const cms = await getPublishedCmsPage(params.section)
  return <SectionPage locale={params.locale} section={params.section as SectionSlug} cms={cms} />
}
