import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { HomePage } from '@/components/home-page'
import { JsonLd } from '@/components/json-ld'
import { homeCopy, localized } from '@/lib/content'
import { isLocale, type Locale } from '@/lib/i18n'
import { getPublishedCmsPage } from '@/lib/cms'
import { absoluteUrl, buildPageMetadata, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params
  if (!isLocale(params.locale)) return {}
  const locale = params.locale as Locale
  return buildPageMetadata({ locale, title: localized(homeCopy.heroTitle, locale), description: localized(homeCopy.heroBody, locale) })
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale as Locale
  const cms = await getPublishedCmsPage('home')
  const title = localized(homeCopy.heroTitle, locale)
  const description = localized(homeCopy.heroBody, locale)
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${absoluteUrl(locale)}#webpage`, url: absoluteUrl(locale), name: title, description, isPartOf: { '@id': `${SITE_URL}/#website` }, inLanguage: locale === 'en' ? 'en-CA' : locale === 'zh' ? 'zh-CN' : 'fr-CA' }} />
      <HomePage locale={locale} cms={cms} />
    </>
  )
}
