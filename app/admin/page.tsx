import Link from 'next/link'
import { FileEdit, LogOut, Plus, ShieldCheck } from 'lucide-react'
import { requireAdmin } from '@/lib/admin-auth'
import { getCmsPages } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = requireAdmin()
  let pages: Awaited<ReturnType<typeof getCmsPages>> = []
  let databaseReady = true
  try {
    pages = await getCmsPages()
  } catch {
    databaseReady = false
  }

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-8 text-ink sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">NEXUS CONTROLLED CMS</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Website pages</h1>
            <p className="mt-2 text-sm text-slate-500">Signed in as {session.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/en" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold">View website</Link>
            <form action="/api/admin/logout" method="post">
              <button className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"><LogOut className="h-4 w-4" />Sign out</button>
            </form>
          </div>
        </header>

        {!databaseReady ? (
          <div className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-7 text-amber-950">
            <h2 className="font-bold">CMS database setup required</h2>
            <p className="mt-2 text-sm leading-7">Apply the included Prisma migration, create the first admin, and seed the controlled page definitions. No public page has been changed.</p>
          </div>
        ) : pages.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8">
            <Plus className="h-7 w-7 text-forest" />
            <h2 className="mt-4 text-xl font-bold">No CMS pages yet</h2>
            <p className="mt-2 text-sm text-slate-500">Run the safe seed command to import the current page structure without overwriting existing content.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pages.map((page) => (
              <article key={page.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{page.pageType}</p>
                    <h2 className="mt-2 text-xl font-bold">{page.labelEn}</h2>
                    <p className="mt-1 text-sm text-slate-500">{page.labelZh}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${page.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                    {page.status}
                  </span>
                </div>
                <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
                  <span>{page._count.sections} sections</span>
                  <span>{page.publishedAt ? `Published ${page.publishedAt.toLocaleDateString()}` : 'Not published'}</span>
                </div>
                <Link href={`/admin/pages/${page.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">
                  <FileEdit className="h-4 w-4" /> Edit page
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-start gap-3 rounded-3xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-950">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          Draft edits remain private until Publish is selected. Publishing stores a complete immutable snapshot used by the public website.
        </div>
      </div>
    </main>
  )
}
