import Link from 'next/link'
import { Download, Filter, Inbox } from 'lucide-react'
import { requireAdmin } from '@/lib/admin-auth'
import { getPrisma } from '@/lib/prisma'
import {
  isPhase3AdminEnabled,
  LEAD_STATUSES,
  LEAD_TYPES,
  NEXUS_ORGANIZATION_KEY,
} from '@/lib/phase3-core.mjs'

export const dynamic = 'force-dynamic'

export default async function LeadsPage(
  props: { searchParams: Promise<{ status?: string; type?: string; q?: string }> }
) {
  const searchParams = await props.searchParams
  await requireAdmin()
  const enabled = isPhase3AdminEnabled()
  const prisma = await getPrisma()
  const query = String(searchParams.q || '').trim().slice(0, 100)
  const status = LEAD_STATUSES.includes(String(searchParams.status || '').toUpperCase())
    ? String(searchParams.status).toUpperCase()
    : ''
  const type = LEAD_TYPES.includes(String(searchParams.type || '').toUpperCase())
    ? String(searchParams.type).toUpperCase()
    : ''
  const leads = enabled ? await prisma.businessLead.findMany({
    where: {
      organizationKey: NEXUS_ORGANIZATION_KEY,
      ...(status ? { status: status as never } : {}),
      ...(type ? { type: type as never } : {}),
      ...(query ? { OR: [{ reference: { contains: query, mode: 'insensitive' } }, { contactName: { contains: query, mode: 'insensitive' } }, { contactEmail: { contains: query, mode: 'insensitive' } }] } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 250,
  }) : []
  return (
    <main className="min-h-screen bg-slate-100 px-5 py-8 text-ink sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">NEXUS BUSINESS TOOLS</p><h1 className="mt-2 text-4xl font-bold">Leads</h1></div><div className="flex gap-2"><Link href="/admin" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold">CMS</Link><Link href="/api/admin/business-tools/leads/export" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"><Download className="h-4 w-4" />CSV</Link></div></header>
        {!enabled ? <div className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-7"><strong>Phase 3 admin tools are disabled.</strong><p className="mt-2 text-sm">Set PHASE3_ADMIN_TOOLS_ENABLED=true only during the approved rollout.</p></div> : <>
          <form className="mt-8 grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 sm:grid-cols-[1fr_auto_auto_auto]">
            <input name="q" defaultValue={query} placeholder="Reference, name or email" className="rounded-xl border border-slate-300 px-4 py-2" />
            <select name="status" defaultValue={status} className="rounded-xl border border-slate-300 px-4 py-2"><option value="">All statuses</option>{LEAD_STATUSES.map((item) => <option key={item}>{item}</option>)}</select>
            <select name="type" defaultValue={type} className="rounded-xl border border-slate-300 px-4 py-2"><option value="">All types</option>{LEAD_TYPES.map((item) => <option key={item}>{item}</option>)}</select>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2 text-sm font-bold text-white"><Filter className="h-4 w-4" />Filter</button>
          </form>
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
            {leads.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{['Reference', 'Contact', 'Type', 'Status', 'Priority', 'Created'].map((item) => <th key={item} className="px-5 py-4">{item}</th>)}</tr></thead><tbody>{leads.map((lead) => <tr key={lead.id} className="border-t border-slate-100 hover:bg-slate-50"><td className="px-5 py-4 font-bold"><Link href={`/admin/leads/${lead.id}`} className="text-[#26688f]">{lead.reference}</Link></td><td className="px-5 py-4">{lead.contactName}<span className="block text-xs text-slate-500">{lead.contactEmail}</span></td><td className="px-5 py-4">{lead.type}</td><td className="px-5 py-4">{lead.status}</td><td className="px-5 py-4">{lead.priority}</td><td className="px-5 py-4">{lead.createdAt.toLocaleDateString()}</td></tr>)}</tbody></table></div> : <div className="p-10 text-center text-slate-500"><Inbox className="mx-auto h-8 w-8" /><p className="mt-3">No leads match these filters.</p></div>}
          </div>
        </>}
      </div>
    </main>
  )
}
