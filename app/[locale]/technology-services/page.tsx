import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StrategicServicePage } from '@/components/strategic-service-page'
import { isLocale, type Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { strategicPages } from '@/lib/strategic-pages'

const slug = 'technology-services'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale as Locale
  const page = strategicPages[slug]
  return buildPageMetadata({
    locale,
    slug,
    title: page.title[locale],
    description: page.intro[locale],
  })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  return <StrategicServicePage locale={locale} page={strategicPages[slug]} />
}
