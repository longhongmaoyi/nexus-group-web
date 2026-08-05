import type { Metadata } from 'next'
import { DocumentLanguage } from '@/components/document-language'
import { HomePage } from '@/components/home-page'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getPublishedCmsPage } from '@/lib/cms'
import { homeCopy, localized } from '@/lib/content'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: localized(homeCopy.heroTitle, 'en'),
    description: localized(homeCopy.heroBody, 'en'),
    alternates: { canonical: '/', languages: { en: '/en', 'zh-CN': '/zh', fr: '/fr' } },
  }
}

export default async function RootPage() {
  const cms = await getPublishedCmsPage('home')
  return <><DocumentLanguage locale="en" /><SiteHeader locale="en" /><HomePage locale="en" cms={cms} /><SiteFooter locale="en" /></>
}
