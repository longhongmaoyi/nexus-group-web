import { notFound } from 'next/navigation'
import { AdminResponsivePreview } from '@/components/admin-responsive-preview'
import { requireAdmin } from '@/lib/admin-auth'
import { getCmsPageDraft } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  await requireAdmin()
  const page = await getCmsPageDraft(params.slug)
  if (!page) notFound()
  return <AdminResponsivePreview slug={params.slug} />
}
