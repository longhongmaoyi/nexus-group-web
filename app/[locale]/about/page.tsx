import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { InformationPage } from '@/components/information-page'
import { PageSeo } from '@/components/page-seo'
import { aboutPageData } from '@/lib/consolidated-site-content'
import { isLocale, type Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const slug = 'about'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale as Locale
  return buildPageMetadata({ locale, slug, title: aboutPageData.title[locale], description: aboutPageData.intro[locale] })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  const title = aboutPageData.title[locale]
  const description = aboutPageData.intro[locale]
  return (
    <>
      <PageSeo locale={locale} slug={slug} title={title} description={description} />
      <InformationPage locale={locale} page={aboutPageData} />
    </>
  )
}
