import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SectionPage } from '@/components/section-page'
import { localized, sectionPages, sectionSlugs, type SectionSlug } from '@/lib/content'
import { isLocale, type Locale } from '@/lib/i18n'
import { getPublishedCmsPage } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export async function generateMetadata(props: { params: Promise<{ locale: string; section: string }> }): Promise<Metadata> {
  const params = await props.params
  if (!isLocale(params.locale)) return {}
  const cms = await getPublishedCmsPage(params.section)
  const known = sectionSlugs.includes(params.section as SectionSlug)
  if (!known && !cms) return {}
  const page = known ? sectionPages[params.section as SectionSlug] : null
  return {
    title: cms?.seoTitle[params.locale as Locale] || (page ? localized(page.eyebrow, params.locale as Locale) : ''),
    description: cms?.seoDescription[params.locale as Locale] || (page ? localized(page.intro, params.locale as Locale) : ''),
  }
}

export default async function Page(props: { params: Promise<{ locale: string; section: string }> }) {
  const params = await props.params
  if (!isLocale(params.locale)) notFound()
  const cms = await getPublishedCmsPage(params.section)
  const known = sectionSlugs.includes(params.section as SectionSlug)
  if (!known && !cms) notFound()
  return <SectionPage locale={params.locale} section={known ? params.section as SectionSlug : 'about'} cms={cms} businessToolsEnabled={process.env.PHASE3_BUSINESS_TOOLS_ENABLED === 'true'} />
}
