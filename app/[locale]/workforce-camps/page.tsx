import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StrategicServicePage } from '@/components/strategic-service-page'
import { isLocale, type Locale } from '@/lib/i18n'
import { strategicPages } from '@/lib/strategic-pages'

const slug = 'workforce-camps'
const siteUrl = 'https://www.nexuslife.ca'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale as Locale
  const page = strategicPages[slug]
  return {
    title: page.title[locale],
    description: page.intro[locale],
    alternates: {
      canonical: `${siteUrl}/${locale}/${slug}`,
      languages: {
        'en-CA': `${siteUrl}/en/${slug}`,
        'zh-CN': `${siteUrl}/zh/${slug}`,
        'fr-CA': `${siteUrl}/fr/${slug}`,
        'x-default': `${siteUrl}/en/${slug}`,
      },
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  return <StrategicServicePage locale={locale} page={strategicPages[slug]} />
}
