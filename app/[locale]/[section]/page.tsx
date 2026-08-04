import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/json-ld'
import { SectionPage } from '@/components/section-page'
import { localized, sectionPages, sectionSlugs, type SectionSlug } from '@/lib/content'
import { isLocale, type Locale } from '@/lib/i18n'
import { getPublishedCmsPage } from '@/lib/cms'
import { absoluteUrl, buildPageMetadata, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const homeLabels: Record<Locale, string> = {
  en: 'Home',
  zh: '首页',
  fr: 'Accueil',
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; section: string }>
}): Promise<Metadata> {
  const params = await props.params
  if (!isLocale(params.locale)) return {}

  const locale = params.locale as Locale
  const cms = await getPublishedCmsPage(params.section)
  const known = sectionSlugs.includes(params.section as SectionSlug)

  if (!known && !cms) return {}

  const page = known ? sectionPages[params.section as SectionSlug] : null
  const title = cms?.seoTitle[locale] || (page ? localized(page.eyebrow, locale) : '')
  const description = cms?.seoDescription[locale] || (page ? localized(page.intro, locale) : '')

  return buildPageMetadata({
    locale,
    slug: params.section,
    title,
    description,
  })
}

export default async function Page(props: {
  params: Promise<{ locale: string; section: string }>
}) {
  const params = await props.params
  if (!isLocale(params.locale)) notFound()

  const locale = params.locale as Locale
  const cms = await getPublishedCmsPage(params.section)
  const known = sectionSlugs.includes(params.section as SectionSlug)

  if (!known && !cms) notFound()

  const page = known ? sectionPages[params.section as SectionSlug] : null
  const title = cms?.seoTitle[locale] || (page ? localized(page.eyebrow, locale) : params.section)
  const description = cms?.seoDescription[locale] || (page ? localized(page.intro, locale) : '')
  const url = absoluteUrl(locale, params.section)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: title,
          description,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          inLanguage: locale === 'en' ? 'en-CA' : locale === 'zh' ? 'zh-CN' : 'fr-CA',
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: homeLabels[locale],
              item: absoluteUrl(locale),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: title,
              item: url,
            },
          ],
        }}
      />
      <SectionPage
        locale={locale}
        section={known ? (params.section as SectionSlug) : 'about'}
        cms={cms}
        businessToolsEnabled={process.env.PHASE3_BUSINESS_TOOLS_ENABLED === 'true'}
      />
    </>
  )
}
