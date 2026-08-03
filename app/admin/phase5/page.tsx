import Link from 'next/link'
import { AdminPhase5Console } from '@/components/admin-phase5-console'
import { requireAdmin } from '@/lib/admin-auth'
import { isPhase5AdminEnabled } from '@/lib/phase5-core.mjs'

export const dynamic = 'force-dynamic'

export default async function Phase5Page() {
  const session = await requireAdmin()
  return <main className="min-h-screen bg-slate-100 px-5 py-8 text-ink sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><header className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">NEXUS PHASE 5</p><h1 className="mt-2 text-4xl font-bold tracking-tight">Operating centre</h1><p className="mt-2 text-sm text-slate-500">Signed in as {session.email}. CRM, delivery, compliance, partners, tasks, analytics and reporting.</p></div><Link href="/admin" className="portal-secondary">CMS dashboard</Link></header>{isPhase5AdminEnabled() ? <AdminPhase5Console /> : <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-7 text-amber-950"><strong>Phase 5 administration is disabled.</strong><p className="mt-2 text-sm">Apply and validate the additive migration before enabling PHASE5_ADMIN_ENABLED.</p></div>}</div></main>
}
