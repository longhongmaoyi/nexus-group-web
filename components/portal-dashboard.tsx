'use client'

import { upload } from '@vercel/blob/client'
import Link from 'next/link'
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Building2, Check, Download, FileCheck2, FileText, FolderKanban, Library, Loader2, LogOut, MessageSquare, Plus, ShieldCheck, Upload, X } from 'lucide-react'

import type { Locale } from '@/lib/i18n'
import { portalCopy } from '@/lib/portal-copy'

type Membership = { id: string; role: 'OWNER' | 'MANAGER' | 'MEMBER' | 'VIEWER' }
type Tenant = { id: string; slug: string; name: string; type: 'CLIENT' | 'SUPPLIER' }
type Project = { id: string; reference: string; title: string; description: string | null; status: string; updatedAt: string }
type DocumentItem = { id: string; projectId: string | null; name: string; contentType: string; sizeBytes: number; category: string; status: string; createdAt: string }
type Quote = { id: string; projectId: string; number: string; version: number; title: string; currency: string; totalAmount: string | null; status: string; validUntil: string | null; decisions: Array<{ id: string; decision: string; comment: string | null }> }
type Comment = { id: string; projectId: string | null; quotationId: string | null; body: string; createdAt: string }
type Workspace = { tenant: Tenant; membership: Membership; projects: Project[]; documents: DocumentItem[]; quotations: Quote[]; comments: Comment[] }
type PortalMe = { user: { name: string; email: string }; memberships: Array<{ role: string; tenant: Tenant }> }
type LibraryItem = { id: string; name: string; category: string; supplier: { companyName: string; country: string | null; certifications: string | null }; product: { titleEn: string; titleZh: string; titleFr: string; category: string } | null }

async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options)
  const body = await response.json()
  if (!response.ok) throw new Error(body.error || 'Request failed')
  return body as T
}

const json = (method: string, body: Record<string, unknown>): RequestInit => ({ method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })

export function PortalDashboard({ locale, tenantSlug }: { locale: Locale; tenantSlug: string }) {
  const c = portalCopy(locale)
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [me, setMe] = useState<PortalMe | null>(null)
  const [library, setLibrary] = useState<LibraryItem[]>([])
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const canContribute = workspace?.membership.role !== 'VIEWER'
  const canApprove = workspace?.tenant.type === 'CLIENT' && ['OWNER', 'MANAGER'].includes(workspace?.membership.role || '')

  const load = useCallback(async () => {
    try {
      const [nextWorkspace, nextMe, nextLibrary] = await Promise.all([
        api<Workspace>(`/api/portal/${tenantSlug}/workspace`), api<PortalMe>('/api/portal/me'), api<LibraryItem[]>('/api/portal/library'),
      ])
      setWorkspace(nextWorkspace); setMe(nextMe); setLibrary(nextLibrary); setError('')
    } catch (value) { setError(value instanceof Error ? value.message : c.error) }
  }, [c.error, tenantSlug])

  useEffect(() => { void load() }, [load])

  async function mutate(key: string, action: () => Promise<unknown>) {
    setBusy(key); setError('')
    try { await action(); await load() } catch (value) { setError(value instanceof Error ? value.message : c.error) } finally { setBusy('') }
  }

  async function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const values = new FormData(form)
    await mutate('project', () => api(`/api/portal/${tenantSlug}/projects`, json('POST', { title: values.get('title'), description: values.get('description') })))
    form.reset()
  }

  async function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const values = new FormData(form)
    await mutate('comment', () => api(`/api/portal/${tenantSlug}/comments`, json('POST', { projectId: values.get('projectId'), body: values.get('body') })))
    form.reset()
  }

  async function uploadDocument(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const values = new FormData(form); const file = values.get('file')
    if (!(file instanceof File) || file.size === 0) return
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 180)
    await mutate('upload', () => upload(`portal/${tenantSlug}/${safeName}`, file, {
      access: 'private', multipart: file.size > 5 * 1024 * 1024,
      handleUploadUrl: `/api/portal/${tenantSlug}/documents/upload`,
      clientPayload: JSON.stringify({ name: file.name, contentType: file.type, sizeBytes: file.size, projectId: values.get('projectId') || null, category: values.get('category') || 'GENERAL' }),
    }))
    form.reset()
  }

  async function decide(quote: Quote, decision: 'APPROVED' | 'REJECTED') {
    await mutate(`quote-${quote.id}`, () => api(`/api/portal/${tenantSlug}/quotations/${quote.id}/decision`, json('POST', { decision })))
  }

  const projectOptions = useMemo(() => workspace?.projects || [], [workspace])
  if (!workspace || !me) return <main className="min-h-screen bg-slate-50 px-5 pb-20 pt-48"><div className="mx-auto flex max-w-7xl items-center gap-3 rounded-3xl bg-white p-8 text-slate-600"><Loader2 className="h-5 w-5 animate-spin" />{error || c.loading}</div></main>

  return <main className="min-h-screen bg-[linear-gradient(180deg,#e8f0eb_0,#f8faf9_420px)] px-5 pb-20 pt-44 text-ink sm:px-8 lg:px-12">
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col gap-6 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="eyebrow">{workspace.tenant.type === 'CLIENT' ? c.client : c.supplier}</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{workspace.tenant.name}</h1><p className="mt-2 text-sm text-slate-500">{me.user.name} · {c.role}: {workspace.membership.role}</p></div>
        <div className="flex flex-wrap gap-2">
          {me.memberships.map(({ tenant }) => <Link key={tenant.id} href={`/${locale}/portal/${tenant.slug}`} className={`portal-secondary ${tenant.slug === tenantSlug ? '!border-forest !bg-emerald-50' : ''}`}><Building2 className="h-4 w-4" />{tenant.name}</Link>)}
          <button className="portal-secondary" onClick={() => void mutate('logout', () => api('/api/portal/auth/logout', { method: 'POST' }).then(() => { location.href = `/${locale}/portal/login` }))}><LogOut className="h-4 w-4" />{c.signOut}</button>
        </div>
      </header>
      {error && <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-800">{error}</p>}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <div className="space-y-6">
          <Panel icon={<FolderKanban />} title={c.projects} count={workspace.projects.length}>
            <div className="grid gap-3 sm:grid-cols-2">{workspace.projects.map((project) => <article key={project.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><strong>{project.title}</strong><Badge>{project.status}</Badge></div><p className="mt-1 text-xs font-bold text-slate-400">{project.reference}</p>{project.description && <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>}</article>)}</div>
            {!workspace.projects.length && <Empty text={c.noItems} />}
            {canContribute && <form onSubmit={createProject} className="mt-5 grid gap-3 rounded-2xl border border-dashed border-slate-200 p-4 sm:grid-cols-2"><input className="portal-input" name="title" required minLength={3} placeholder={c.title} /><input className="portal-input" name="description" placeholder={c.projectPrompt} /><button disabled={busy === 'project'} className="portal-primary sm:col-span-2"><Plus className="h-4 w-4" />{c.newProject}</button></form>}
          </Panel>
          <Panel icon={<FileText />} title={c.documents} count={workspace.documents.length}>
            <div className="space-y-2">{workspace.documents.map((document) => <div key={document.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div><strong className="text-sm">{document.name}</strong><p className="mt-1 text-xs text-slate-500">{document.category} · {(document.sizeBytes / 1024).toFixed(0)} KB · {document.status}</p></div><a className="portal-secondary" href={`/api/portal/${tenantSlug}/documents/${document.id}/download`}><Download className="h-4 w-4" />{c.download}</a></div>)}</div>
            {!workspace.documents.length && <Empty text={c.noItems} />}
            {canContribute && <form onSubmit={uploadDocument} className="mt-5 grid gap-3 rounded-2xl border border-dashed border-slate-200 p-4 sm:grid-cols-2"><input className="portal-input" type="file" name="file" required accept=".pdf,.jpg,.jpeg,.png,.webp,.docx,.xlsx" aria-label={c.chooseFile} /><input className="portal-input" name="category" placeholder={c.category} /><select className="portal-input sm:col-span-2" name="projectId"><option value="">{c.selectProject}</option>{projectOptions.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select><button disabled={busy === 'upload'} className="portal-primary sm:col-span-2"><Upload className="h-4 w-4" />{c.upload}</button></form>}
            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />{c.securityNote}</p>
          </Panel>
          {workspace.tenant.type === 'CLIENT' && <Panel icon={<FileCheck2 />} title={c.quotations} count={workspace.quotations.length}>
            <div className="space-y-3">{workspace.quotations.map((quote) => <article key={quote.id} className="rounded-2xl border border-slate-100 p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><strong>{quote.title}</strong><p className="mt-1 text-xs text-slate-500">{quote.number} v{quote.version} · {quote.status}</p></div><div className="text-left sm:text-right"><strong>{quote.totalAmount ? new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : locale === 'fr' ? 'fr-CA' : 'en-CA', { style: 'currency', currency: quote.currency }).format(Number(quote.totalAmount)) : '—'}</strong>{quote.validUntil && <p className="mt-1 text-xs text-slate-500">{c.validUntil}: {new Date(quote.validUntil).toLocaleDateString()}</p>}</div></div>{canApprove && quote.status === 'SENT' && <div className="mt-4 flex gap-2"><button className="portal-primary" onClick={() => void decide(quote, 'APPROVED')}><Check className="h-4 w-4" />{c.approve}</button><button className="portal-secondary" onClick={() => void decide(quote, 'REJECTED')}><X className="h-4 w-4" />{c.reject}</button></div>}</article>)}</div>{!workspace.quotations.length && <Empty text={c.noItems} />}
          </Panel>}
        </div>
        <aside className="space-y-6">
          <Panel icon={<MessageSquare />} title={c.comments} count={workspace.comments.length}>
            <div className="max-h-80 space-y-3 overflow-y-auto">{workspace.comments.map((comment) => <blockquote key={comment.id} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{comment.body}<footer className="mt-2 text-xs text-slate-400">{new Date(comment.createdAt).toLocaleString()}</footer></blockquote>)}</div>
            {!workspace.comments.length && <Empty text={c.noItems} />}
            {canContribute && projectOptions.length > 0 && <form onSubmit={addComment} className="mt-4 space-y-3"><select className="portal-input" name="projectId" required>{projectOptions.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select><textarea className="portal-input min-h-24" name="body" required placeholder={c.commentPrompt} /><button disabled={busy === 'comment'} className="portal-primary w-full"><MessageSquare className="h-4 w-4" />{c.addComment}</button></form>}
          </Panel>
          <Panel icon={<Library />} title={c.library} count={library.length}>
            <div className="space-y-3">{library.map((item) => <article key={item.id} className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4"><div className="flex gap-2"><FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" /><div><strong className="text-sm">{item.product ? (locale === 'zh' ? item.product.titleZh : locale === 'fr' ? item.product.titleFr : item.product.titleEn) : item.name}</strong><p className="mt-1 text-xs leading-5 text-slate-600">{item.supplier.companyName} · {item.category}</p><a className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-forest hover:underline" href={`/api/portal/library/${item.id}/download`}><Download className="h-3.5 w-3.5" />{c.download}</a></div></div></article>)}</div>{!library.length && <Empty text={c.noItems} />}
          </Panel>
        </aside>
      </div>
    </div>
  </main>
}

function Panel({ icon, title, count, children }: { icon: React.ReactNode; title: string; count: number; children: React.ReactNode }) { return <section className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm sm:p-6"><header className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-forest">{icon}</span><h2 className="text-xl font-semibold">{title}</h2><Badge>{count}</Badge></header>{children}</section> }
function Badge({ children }: { children: React.ReactNode }) { return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[.68rem] font-black uppercase tracking-wide text-slate-600">{children}</span> }
function Empty({ text }: { text: string }) { return <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">{text}</p> }
