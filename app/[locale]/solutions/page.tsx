import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SolutionsPage } from '@/components/solutions-page'
import { PageSeo } from '@/components/page-seo'
import { solutionsCopy } from '@/lib/consolidated-site-content'
import { isLocale, type Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const slug = 'solutions'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale as Locale
  return buildPageMetadata({ locale, slug, title: solutionsCopy.title[locale], description: solutionsCopy.intro[locale] })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  const title = solutionsCopy.title[locale]
  const description = solutionsCopy.intro[locale]
  return (
    <>
      <PageSeo locale={locale} slug={slug} title={title} description={description} />
      <SolutionsPage locale={locale} />
    </>
  )
}
