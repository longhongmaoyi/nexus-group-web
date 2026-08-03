import { notFound, redirect } from 'next/navigation'
import { PortalLoginForm } from '@/components/portal-auth-forms'
import { isLocale } from '@/lib/i18n'
import { getPortalSession, isPhase4Enabled } from '@/lib/portal-auth'

export const dynamic = 'force-dynamic'
export default async function PortalLoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale) || !isPhase4Enabled()) notFound()
  const session = await getPortalSession()
  if (session) redirect(`/${locale}/portal`)
  return <PortalLoginForm locale={locale} />
}
