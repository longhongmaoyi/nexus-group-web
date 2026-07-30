import { notFound } from 'next/navigation'
import { AdminPageEditor } from '@/components/admin-page-editor'
import { requireAdmin } from '@/lib/admin-auth'
import { getCmsPageDraft } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { slug: string } }) {
  requireAdmin()
  const page = await getCmsPageDraft(params.slug)
  if (!page) notFound()
  return <AdminPageEditor initialPage={page} />
}
