import Link from 'next/link'
import { AdminBusinessConfig } from '@/components/admin-business-config'
import { requireAdmin } from '@/lib/admin-auth'
import { getActiveAssumptions } from '@/lib/business-tools'
import { isPhase3AdminEnabled } from '@/lib/phase3-core.mjs'

export const dynamic = 'force-dynamic'

export default async function BusinessToolsPage() {
  const session = await requireAdmin()
  const enabled = isPhase3AdminEnabled()
  const active = enabled ? await getActiveAssumptions() : { cost: null, timeline: null }
  return <main className="min-h-screen bg-slate-100 px-5 py-8 text-ink sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><header className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">NEXUS BUSINESS TOOLS</p><h1 className="mt-2 text-4xl font-bold">Planning configuration</h1><p className="mt-2 text-sm text-slate-500">Signed in as {session.email}. Admin role is required to create a new active version.</p></div><div className="flex gap-2"><Link href="/admin/leads" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Leads</Link><Link href="/admin" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold">CMS</Link></div></header>{enabled ? <div className="mt-8"><AdminBusinessConfig cost={active.cost} timeline={active.timeline} /></div> : <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-7"><strong>Phase 3 admin tools are disabled.</strong></div>}</div></main>
}
