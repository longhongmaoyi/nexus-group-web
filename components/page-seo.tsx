import { JsonLd } from '@/components/json-ld'
import type { Locale } from '@/lib/i18n'
import { absoluteUrl, SITE_URL } from '@/lib/seo'

const homeLabels: Record<Locale, string> = { en: 'Home', zh: '首页', fr: 'Accueil' }

export function PageSeo({ locale, slug, title, description }: { locale: Locale; slug: string; title: string; description: string }) {
  const url = absoluteUrl(locale, slug)
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: locale === 'en' ? 'en-CA' : locale === 'zh' ? 'zh-CN' : 'fr-CA',
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeLabels[locale], item: absoluteUrl(locale) },
          { '@type': 'ListItem', position: 2, name: title, item: url },
        ],
      }} />
    </>
  )
}
