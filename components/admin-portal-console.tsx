'use client'

import Link from 'next/link'
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Building2, CheckCircle2, FileCheck2, FileText, FolderKanban, History, Loader2, MailPlus, MessageSquare, Plus, RefreshCw, ShieldCheck, Users } from 'lucide-react'

type Tenant = { id: string; name: string; slug: string; type: 'CLIENT' | 'SUPPLIER'; active: boolean; memberships: Array<{ id: string; role: string; user: { email: string; name: string; status: string } }> }
type Project = { id: string; tenantId: string; reference: string; title: string; status: string; tenant: { name: string; slug: string; type: string } }
type Quote = { id: string; number: string; version: number; title: string; totalAmount: string | null; currency: string; status: string; tenant: { name: string }; project: { title: string } }
type DocumentItem = { id: string; tenantId: string; name: string; category: string; sizeBytes: number; status: string; libraryPublishedAt: string | null; tenant: { name: string; type: string } }
type Supplier = { id: string; companyName: string; verificationStatus: string; approved: boolean; portalTenantId: string | null }
type Product = { id: string; titleEn: string; sku: string | null; category: string }
type Audit = { id: string; action: string; entityType: string; createdAt: string; tenant: { name: string } }
type Overview = { tenants: Tenant[]; projects: Project[]; quotations: Quote[]; documents: DocumentItem[]; suppliers: Supplier[]; products: Product[]; audits: Audit[] }

async function request<T>(url: string, options?: RequestInit) {
  const response = await fetch(url, options); const body = await response.json()
  if (!response.ok) throw new Error(body.error || 'Request failed')
  return body as T
}
const json = (method: string, body: Record<string, unknown>): RequestInit => ({ method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })

export function AdminPortalConsole() {
  const [data, setData] = useState<Overview | null>(null)
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const load = useCallback(async () => { try { setData(await request('/api/admin/portal/overview')); setError('') } catch (value) { setError(value instanceof Error ? value.message : 'Unable to load') } }, [])
  useEffect(() => { void load() }, [load])
  async function mutate(key: string, action: () => Promise<unknown>, success: string) { setBusy(key); setError(''); setMessage(''); try { await action(); setMessage(success); await load() } catch (value) { setError(value instanceof Error ? value.message : 'Request failed') } finally { setBusy('') } }
  async function formAction(event: FormEvent<HTMLFormElement>, key: string, url: string, body: (form: FormData) => Record<string, unknown>, success: string) { event.preventDefault(); const form = event.currentTarget; const values = new FormData(form); await mutate(key, () => request(url, json('POST', body(values))), success); form.reset() }
  const clientProjects = useMemo(() => data?.projects.filter((p) => p.tenant.type === 'CLIENT') || [], [data])
  if (!data) return <div className="mt-8 flex items-center gap-3 rounded-3xl bg-white p-8"><Loader2 className="h-5 w-5 animate-spin" />{error || 'Loading portal operations…'}</div>

  return <div className="mt-8 space-y-6">
    {(error || message) && <p role="status" className={`rounded-2xl px-5 py-4 text-sm ${error ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'}`}>{error || message}</p>}
    <div className="grid gap-6 xl:grid-cols-2">
      <AdminPanel icon={<Building2 />} title="Create client or supplier workspace">
        <form onSubmit={(e) => void formAction(e, 'tenant', '/api/admin/portal/tenants', (f) => ({ name: f.get('name'), slug: f.get('slug'), type: f.get('type'), email: f.get('email'), userName: f.get('userName'), locale: f.get('locale') }), 'Workspace created and invitation queued.')} className="grid gap-3 sm:grid-cols-2">
          <input className="portal-input" name="name" required placeholder="Organization name" /><input className="portal-input" name="slug" required pattern="[a-z0-9-]+" placeholder="secure-slug" />
          <select className="portal-input" name="type"><option value="CLIENT">Client</option><option value="SUPPLIER">Supplier</option></select><select className="portal-input" name="locale"><option value="en">English</option><option value="zh">中文</option><option value="fr">Français</option></select>
          <input className="portal-input" name="userName" required placeholder="Owner name" /><input className="portal-input" name="email" type="email" required placeholder="Owner email" />
          <button disabled={busy === 'tenant'} className="portal-primary sm:col-span-2"><Plus className="h-4 w-4" />Create and invite owner</button>
        </form>
      </AdminPanel>
      <AdminPanel icon={<MailPlus />} title="Invite or update a member">
        <form onSubmit={(e) => { const tenantId = String(new FormData(e.currentTarget).get('tenantId') || ''); void formAction(e, 'invite', `/api/admin/portal/tenants/${tenantId}/invitations`, (f) => ({ name: f.get('name'), email: f.get('email'), role: f.get('role'), locale: f.get('locale') }), 'Member invitation queued.') }} className="grid gap-3 sm:grid-cols-2">
          <select className="portal-input sm:col-span-2" name="tenantId" required>{data.tenants.map(t => <option key={t.id} value={t.id}>{t.name} ({t.type})</option>)}</select>
          <input className="portal-input" name="name" required placeholder="Member name" /><input className="portal-input" name="email" type="email" required placeholder="Member email" />
          <select className="portal-input" name="role"><option>VIEWER</option><option>MEMBER</option><option>MANAGER</option><option>OWNER</option></select><select className="portal-input" name="locale"><option value="en">English</option><option value="zh">中文</option><option value="fr">Français</option></select>
          <button disabled={busy === 'invite' || !data.tenants.length} className="portal-primary sm:col-span-2"><Users className="h-4 w-4" />Invite member</button>
        </form>
      </AdminPanel>
    </div>

    <AdminPanel icon={<FolderKanban />} title="Projects, delivery status and comments">
      <div className="grid gap-4 lg:grid-cols-2">{data.projects.map(project => <article key={project.id} className="rounded-2xl border border-slate-100 p-4"><div className="flex items-start justify-between gap-3"><div><strong>{project.title}</strong><p className="mt-1 text-xs text-slate-500">{project.tenant.name} · {project.reference}</p></div><Status>{project.status}</Status></div><form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); const status = new FormData(e.currentTarget).get('status'); void mutate(`project-${project.id}`, () => request(`/api/admin/portal/projects/${project.id}`, json('PATCH', { status })), 'Project status updated.') }}><select name="status" defaultValue={project.status} className="portal-input !py-2"><option>INTAKE</option><option>PLANNING</option><option>QUOTING</option><option>APPROVAL</option><option>DELIVERY</option><option>COMPLETED</option><option>ON_HOLD</option></select><button className="portal-secondary" disabled={busy === `project-${project.id}`}><RefreshCw className="h-4 w-4" /></button></form></article>)}</div>
      {!data.projects.length && <Empty />}
      {data.projects.length > 0 && <form onSubmit={(e) => void formAction(e, 'comment', '/api/admin/portal/comments', (f) => ({ projectId: f.get('projectId'), body: f.get('body'), internal: f.get('internal') === 'on' }), 'Comment recorded.')} className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-[1fr_2fr_auto]"><select className="portal-input" name="projectId">{data.projects.map(p => <option key={p.id} value={p.id}>{p.tenant.name}: {p.title}</option>)}</select><input className="portal-input" name="body" required placeholder="Client-visible update or internal note" /><label className="flex items-center gap-2 rounded-2xl px-3 text-sm font-bold"><input type="checkbox" name="internal" />Internal</label><button className="portal-primary sm:col-span-3"><MessageSquare className="h-4 w-4" />Record comment</button></form>}
    </AdminPanel>

    <AdminPanel icon={<FileText />} title="Versioned quotations and approvals">
      <form onSubmit={(e) => void formAction(e, 'quote', '/api/admin/portal/quotations', (f) => { const project = clientProjects.find(p => p.id === f.get('projectId')); return { tenantId: project?.tenantId, projectId: project?.id, title: f.get('title'), totalAmount: f.get('totalAmount'), currency: f.get('currency'), validUntil: f.get('validUntil'), assumptions: f.get('assumptions'), exclusions: f.get('exclusions'), send: f.get('send') === 'on' } }, 'Quotation created.')} className="grid gap-3 lg:grid-cols-3">
        <select className="portal-input lg:col-span-2" name="projectId" required>{clientProjects.map(p => <option key={p.id} value={p.id}>{p.tenant.name}: {p.title}</option>)}</select><input className="portal-input" name="currency" defaultValue="CAD" maxLength={3} />
        <input className="portal-input lg:col-span-2" name="title" required placeholder="Quotation title" /><input className="portal-input" name="totalAmount" type="number" min="0" step="0.01" required placeholder="Total" />
        <input className="portal-input" name="validUntil" type="date" /><input className="portal-input" name="assumptions" placeholder="Key assumptions" /><input className="portal-input" name="exclusions" placeholder="Key exclusions" />
        <label className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold"><input type="checkbox" name="send" />Send immediately</label><button disabled={!clientProjects.length || busy === 'quote'} className="portal-primary lg:col-span-2"><FileText className="h-4 w-4" />Create version</button>
      </form>
      <div className="mt-5 grid gap-3 md:grid-cols-2">{data.quotations.map(q => <article key={q.id} className="rounded-2xl border border-slate-100 p-4"><div className="flex justify-between gap-4"><div><strong>{q.title}</strong><p className="mt-1 text-xs text-slate-500">{q.tenant.name} · {q.number} v{q.version}</p></div><Status>{q.status}</Status></div><p className="mt-3 text-sm font-bold">{q.totalAmount ? `${q.currency} ${q.totalAmount}` : 'No total'}</p></article>)}</div>
    </AdminPanel>

    <div className="grid gap-6 xl:grid-cols-2">
      <AdminPanel icon={<ShieldCheck />} title="Supplier verification">
        <div className="space-y-3">{data.suppliers.map(s => <div key={s.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div><strong>{s.companyName}</strong><p className="mt-1 text-xs text-slate-500">{s.verificationStatus}</p></div><div className="flex gap-2"><button className="portal-primary" onClick={() => void mutate(`supplier-${s.id}`, () => request(`/api/admin/portal/suppliers/${s.id}`, json('PATCH', { verified: true })), 'Supplier verified.')}><CheckCircle2 className="h-4 w-4" />Verify</button><button className="portal-secondary" onClick={() => void mutate(`supplier-${s.id}`, () => request(`/api/admin/portal/suppliers/${s.id}`, json('PATCH', { verified: false })), 'Supplier rejected.')}>Reject</button></div></div>)}</div>{!data.suppliers.length && <Empty />}
      </AdminPanel>
      <AdminPanel icon={<FileCheck2 />} title="Document review and product library">
        <div className="space-y-3">{data.documents.map(d => <article key={d.id} className="rounded-2xl border border-slate-100 p-4"><div className="flex items-start justify-between gap-3"><div><strong>{d.name}</strong><p className="mt-1 text-xs text-slate-500">{d.tenant.name} · {d.category} · {(d.sizeBytes / 1024).toFixed(0)} KB</p></div><Status>{d.status}</Status></div><form className="mt-3 grid gap-2 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); void mutate(`document-${d.id}`, () => request(`/api/admin/portal/documents/${d.id}`, json('PATCH', { status: f.get('status'), productId: f.get('productId') || null, publish: f.get('publish') === 'on' })), 'Document review recorded.') }}><select className="portal-input !py-2" name="status"><option>VERIFIED</option><option>REJECTED</option><option>ARCHIVED</option></select><select className="portal-input !py-2" name="productId"><option value="">No product link</option>{data.products.map(p => <option key={p.id} value={p.id}>{p.titleEn}</option>)}</select><label className="flex items-center gap-2 px-2 text-sm font-bold"><input name="publish" type="checkbox" disabled={d.tenant.type !== 'SUPPLIER'} />Publish to verified library</label><button className="portal-secondary"><FileCheck2 className="h-4 w-4" />Save review</button></form></article>)}</div>{!data.documents.length && <Empty />}
      </AdminPanel>
    </div>

    <AdminPanel icon={<History />} title="Recent immutable audit trail">
      <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead><tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400"><th className="px-3 py-3">Time</th><th className="px-3 py-3">Organization</th><th className="px-3 py-3">Action</th><th className="px-3 py-3">Entity</th></tr></thead><tbody>{data.audits.map(a => <tr key={a.id} className="border-b border-slate-50"><td className="px-3 py-3 text-slate-500">{new Date(a.createdAt).toLocaleString()}</td><td className="px-3 py-3 font-bold">{a.tenant.name}</td><td className="px-3 py-3">{a.action}</td><td className="px-3 py-3 text-slate-500">{a.entityType}</td></tr>)}</tbody></table></div>
    </AdminPanel>
    <p className="flex items-center gap-2 text-sm text-slate-500"><ShieldCheck className="h-4 w-4 text-forest" />All Phase 4 write operations require an authenticated administrator, same-origin request and audit event. <Link href="/admin" className="font-bold text-forest hover:underline">Return to CMS</Link></p>
  </div>
}

function AdminPanel({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) { return <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><header className="mb-5 flex items-center gap-3 text-ink"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-forest">{icon}</span><h2 className="text-xl font-bold">{title}</h2></header>{children}</section> }
function Status({ children }: { children: React.ReactNode }) { return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[.68rem] font-black uppercase tracking-wide text-slate-600">{children}</span> }
function Empty() { return <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No records yet.</p> }
