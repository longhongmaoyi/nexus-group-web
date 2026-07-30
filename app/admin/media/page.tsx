import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { requireAdmin } from '@/lib/admin-auth'
import { AdminMediaLibrary } from '@/components/admin-media-library'

export const dynamic = 'force-dynamic'

export default async function Page() {
  await requireAdmin()
  return (
    <main className="min-h-screen bg-slate-100 px-5 py-8 text-ink sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center gap-4">
          <Link href="/admin" aria-label="Back to CMS" className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white"><ArrowLeft className="h-4 w-4" /></Link>
          <div>
            <p className="eyebrow">NEXUS CONTROLLED CMS</p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight">Media library</h1>
          </div>
        </header>
        <AdminMediaLibrary />
      </div>
    </main>
  )
}
