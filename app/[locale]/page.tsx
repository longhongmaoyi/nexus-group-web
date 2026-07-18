import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HomePage } from '@/components/home-page'
import { homeCopy, localized } from '@/lib/content'
import { isLocale, type Locale } from '@/lib/i18n'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {}
  const locale = params.locale as Locale
  return {
    title: localized(homeCopy.heroTitle, locale),
    description: localized(homeCopy.heroBody, locale),
    alternates: {
      languages: { en: '/en', 'zh-CN': '/zh', fr: '/fr' },
    },
  }
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  return <HomePage locale={params.locale} />
}
