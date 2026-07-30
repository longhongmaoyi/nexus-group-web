import { notFound } from 'next/navigation'
import { HomePage } from '@/components/home-page'
import { SectionPage } from '@/components/section-page'
import { requireAdmin } from '@/lib/admin-auth'
import { getCmsPageDraft, snapshotFromDraft } from '@/lib/cms'
import { sectionSlugs, type SectionSlug } from '@/lib/content'
import { isLocale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { locale: string; slug: string } }) {
  requireAdmin()
  if (!isLocale(params.locale)) notFound()
  const draft = await getCmsPageDraft(params.slug)
  if (!draft) notFound()
  const snapshot = snapshotFromDraft(draft)
  if (params.slug === 'home') return <HomePage locale={params.locale} cms={snapshot} />
  return (
    <SectionPage
      locale={params.locale}
      section={sectionSlugs.includes(params.slug as SectionSlug) ? params.slug as SectionSlug : 'about'}
      cms={snapshot}
    />
  )
}
