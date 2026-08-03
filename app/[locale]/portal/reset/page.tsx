import { notFound } from 'next/navigation'
import { PortalResetForm } from '@/components/portal-auth-forms'
import { isLocale } from '@/lib/i18n'
import { isPhase4Enabled } from '@/lib/portal-auth'

export const dynamic = 'force-dynamic'
export default async function PortalResetPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ token?: string }> }) {
  const { locale } = await params
  if (!isLocale(locale) || !isPhase4Enabled()) notFound()
  return <PortalResetForm locale={locale} token={(await searchParams).token} />
}
