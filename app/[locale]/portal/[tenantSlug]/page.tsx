import { notFound } from 'next/navigation'
import { PortalDashboard } from '@/components/portal-dashboard'
import { isLocale } from '@/lib/i18n'
import { isPhase4Enabled, requirePortalMembership } from '@/lib/portal-auth'

export const dynamic = 'force-dynamic'
export default async function TenantPortalPage({ params }: { params: Promise<{ locale: string; tenantSlug: string }> }) {
  const { locale, tenantSlug } = await params
  if (!isLocale(locale) || !isPhase4Enabled()) notFound()
  await requirePortalMembership(tenantSlug, 'READ', locale)
  return <PortalDashboard locale={locale} tenantSlug={tenantSlug} />
}
