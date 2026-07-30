import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HomePage } from '@/components/home-page'
import { homeCopy, localized } from '@/lib/content'
import { isLocale, type Locale } from '@/lib/i18n'
import { getPublishedCmsPage } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params
  if (!isLocale(params.locale)) return {}
  const locale = params.locale as Locale
  const cms = await getPublishedCmsPage('home')
  return {
    title: cms?.seoTitle[locale] || localized(homeCopy.heroTitle, locale),
    description: cms?.seoDescription[locale] || localized(homeCopy.heroBody, locale),
    alternates: {
      languages: { en: '/en', 'zh-CN': '/zh', fr: '/fr' },
    },
  }
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params
  if (!isLocale(params.locale)) notFound()
  const cms = await getPublishedCmsPage('home')
  return <HomePage locale={params.locale} cms={cms} />
}
