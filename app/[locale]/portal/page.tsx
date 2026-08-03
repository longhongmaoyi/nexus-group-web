import { notFound, redirect } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { isPhase4Enabled, requirePortalSession } from '@/lib/portal-auth'

export const dynamic = 'force-dynamic'
export default async function PortalHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale) || !isPhase4Enabled()) notFound()
  const session = await requirePortalSession(locale)
  const membership = session.user.memberships.find((item) => item.active && item.tenant.active)
  if (membership) redirect(`/${locale}/portal/${membership.tenant.slug}`)
  return <main className="min-h-screen bg-slate-50 px-5 pb-20 pt-44"><div className="mx-auto max-w-xl rounded-3xl bg-white p-8"><h1 className="text-3xl font-semibold">No active workspace</h1><p className="mt-3 text-slate-600">Contact NEXUS to restore organization access.</p></div></main>
}
