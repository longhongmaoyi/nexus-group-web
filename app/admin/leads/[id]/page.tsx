import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FileDown, Mail } from 'lucide-react'
import { AdminLeadEditor } from '@/components/admin-lead-editor'
import { requireAdmin } from '@/lib/admin-auth'
import { getPrisma } from '@/lib/prisma'
import { isPhase3AdminEnabled, NEXUS_ORGANIZATION_KEY } from '@/lib/phase3-core.mjs'

export const dynamic = 'force-dynamic'

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  requireAdmin()
  if (!isPhase3AdminEnabled()) notFound()
  const prisma = await getPrisma()
  const [lead, admins] = await Promise.all([
    prisma.businessLead.findFirst({
      where: { id: params.id, organizationKey: NEXUS_ORGANIZATION_KEY },
      include: { owner: true, estimates: { orderBy: { createdAt: 'desc' } }, activities: { orderBy: { createdAt: 'desc' }, include: { actorAdmin: true } }, emailMessages: { orderBy: { createdAt: 'desc' } } },
    }),
    prisma.adminUser.findMany({ orderBy: { email: 'asc' }, select: { id: true, email: true, name: true } }),
  ])
  if (!lead) notFound()
  const items = [
    ['Type', lead.type], ['Sector', lead.sector], ['Project type', lead.projectType], ['Intended use', lead.intendedUse],
    ['Location', [lead.municipality, lead.province, lead.country].filter(Boolean).join(', ')], ['Size / capacity', lead.sizeCapacity],
    ['Budget', lead.budgetRange], ['Timeline', lead.targetTimeline], ['Site readiness', lead.siteReadiness], ['Compliance needs', lead.complianceNeeds],
  ]
  return (
    <main className="min-h-screen bg-slate-100 px-5 py-8 text-ink sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-5"><div><Link href="/admin/leads" className="text-sm font-bold text-[#26688f]">← All leads</Link><h1 className="mt-3 text-4xl font-bold">{lead.reference}</h1><p className="mt-2 text-slate-500">{lead.contactName} · {lead.contactEmail}</p></div><div className="flex flex-wrap gap-2">{(['en', 'zh', 'fr'] as const).map((locale) => <a key={locale} href={`/api/admin/business-tools/leads/${lead.id}/brief?locale=${locale}`} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold"><FileDown className="h-4 w-4" />PDF {locale.toUpperCase()}</a>)}</div></header>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
        <div className="space-y-6"><section className="rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-bold">Project information</h2><dl className="mt-5 grid gap-4 sm:grid-cols-2">{items.map(([label, value]) => <div key={label}><dt className="text-xs font-bold uppercase text-slate-400">{label}</dt><dd className="mt-1 text-sm leading-6">{value || '-'}</dd></div>)}</dl><div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-7 whitespace-pre-wrap">{lead.notes}</div></section><AdminLeadEditor leadId={lead.id} initialStatus={lead.status} initialPriority={lead.priority} initialOwnerId={lead.ownerAdminId || ''} admins={admins} /></div>
        <div className="space-y-6"><section className="rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-bold">Activity timeline</h2><div className="mt-5 space-y-4">{lead.activities.map((activity) => <article key={activity.id} className="border-l-2 border-slate-200 pl-4"><p className="text-sm font-bold">{activity.kind.replaceAll('_', ' ')}</p>{activity.body && <p className="mt-1 text-sm leading-6 text-slate-600">{activity.body}</p>}<p className="mt-1 text-xs text-slate-400">{activity.createdAt.toLocaleString()} {activity.actorAdmin ? `· ${activity.actorAdmin.email}` : ''}</p></article>)}</div></section><section className="rounded-3xl border border-slate-200 bg-white p-6"><h2 className="flex items-center gap-2 text-lg font-bold"><Mail className="h-5 w-5" />Email outbox</h2><div className="mt-4 space-y-3">{lead.emailMessages.map((email) => <div key={email.id} className="rounded-2xl bg-slate-50 p-4 text-sm"><strong>{email.status}</strong><span className="block mt-1 text-slate-500">{email.recipient} · {email.templateKey}</span>{email.lastError && <span className="mt-1 block text-red-700">{email.lastError}</span>}</div>)}</div></section></div>
      </div>
    </div></main>
  )
}
