import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { InquiryLandingPage } from '@/components/inquiry-landing-page'
import { isLocale, type Locale } from '@/lib/i18n'

const mode = 'supplier' as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale as Locale
  const titles = {
    call: { en: 'Book a 15-minute call', zh: '预约 15 分钟通话', fr: 'Réserver un appel de 15 minutes' },
    supplier: { en: 'Supplier application', zh: '供应商申请', fr: 'Candidature fournisseur' },
    partner: { en: 'Canadian project partner application', zh: '加拿大项目伙伴申请', fr: 'Candidature partenaire de projet au Canada' },
  } as const
  return { title: titles[mode][locale], robots: { index: true, follow: true } }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  return <InquiryLandingPage locale={rawLocale as Locale} mode={mode} />
}
