import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CurrentWorkPage } from '@/components/current-work-page'
import { PageSeo } from '@/components/page-seo'
import { isLocale, type Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const slug = 'projects'
const copy = {
  en: { title: 'Current Modular Projects and Delivery Process', description: 'NEXUS Life is delivering its first projects. See the current pipeline, delivery process and behind-the-scenes evidence as it becomes publishable.' },
  zh: { title: '当前模块化项目及交付流程', description: 'NEXUS Life 正在交付首批项目。查看当前项目管线、交付流程及逐步公开的幕后证据。' },
  fr: { title: 'Projets modulaires en cours et processus de livraison', description: 'NEXUS Life livre ses premiers projets. Consultez le pipeline, le processus et les preuves publiables au fil de l’avancement.' },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale as Locale
  return buildPageMetadata({ locale, slug, title: copy[locale].title, description: copy[locale].description })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  return (
    <>
      <PageSeo locale={locale} slug={slug} title={copy[locale].title} description={copy[locale].description} />
      <CurrentWorkPage locale={locale} />
    </>
  )
}
