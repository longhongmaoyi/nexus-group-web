import { notFound } from 'next/navigation'
import { DocumentLanguage } from '@/components/document-language'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { isLocale, type Locale } from '@/lib/i18n'

export default async function LocaleLayout(props: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const params = await props.params

  const {
    children
  } = props;

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
