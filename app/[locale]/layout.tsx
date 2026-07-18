import { notFound } from 'next/navigation'
import { DocumentLanguage } from '@/components/document-language'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { isLocale, locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale as Locale
  return (
    <>
      <DocumentLanguage locale={locale} />
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
    </>
  )
}
