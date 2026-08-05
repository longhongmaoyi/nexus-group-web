import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { InformationPage } from '@/components/information-page'
import { PageSeo } from '@/components/page-seo'
import { deliveryPageData } from '@/lib/consolidated-site-content'
import { isLocale, type Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const slug = 'assembly-centre'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale as Locale
  return buildPageMetadata({ locale, slug, title: deliveryPageData.title[locale], description: deliveryPageData.intro[locale] })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  const title = deliveryPageData.title[locale]
  const description = deliveryPageData.intro[locale]
  return (
    <>
      <PageSeo locale={locale} slug={slug} title={title} description={description} />
      <InformationPage locale={locale} page={deliveryPageData} />
    </>
  )
}
