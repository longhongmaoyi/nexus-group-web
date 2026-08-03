import Link from 'next/link'
import { AdminPortalConsole } from '@/components/admin-portal-console'
import { requireAdmin } from '@/lib/admin-auth'
import { isPhase4AdminEnabled } from '@/lib/portal-auth'

export const dynamic = 'force-dynamic'
export default async function AdminPortalPage() {
  const session = await requireAdmin()
  return <main className="min-h-screen bg-slate-100 px-5 py-8 text-ink sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><header className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">NEXUS PHASE 4</p><h1 className="mt-2 text-4xl font-bold tracking-tight">Portal operations</h1><p className="mt-2 text-sm text-slate-500">Signed in as {session.email}. Client and supplier access remains feature-flag controlled.</p></div><Link href="/admin" className="portal-secondary">CMS dashboard</Link></header>{isPhase4AdminEnabled() ? <AdminPortalConsole /> : <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-7 text-amber-950"><strong>Phase 4 portal administration is disabled.</strong><p className="mt-2 text-sm">Apply and validate the additive migration before enabling this flag in any environment.</p></div>}</div></main>
}
