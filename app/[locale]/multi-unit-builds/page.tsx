import { notFound, permanentRedirect } from 'next/navigation'
import { isLocale } from '@/lib/i18n'

export default async function LegacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  permanentRedirect(`/${locale}/solutions#multi-unit-buildings`)
}
