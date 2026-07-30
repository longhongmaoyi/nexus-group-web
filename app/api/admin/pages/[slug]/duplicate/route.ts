import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import { getCmsPageDraft } from '@/lib/cms'
import { replaceMediaReferences } from '@/lib/media'
import { getPrisma } from '@/lib/prisma'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const session = getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `page-duplicate:${session.sub}`), 10, 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many page duplication requests.' }, { status: 429 })
  try {
    const body = await request.json()
    const targetSlug = String(body.slug || '').trim().toLowerCase().slice(0, 80)
    if (!slugPattern.test(targetSlug)) throw new Error('Use a lowercase URL slug with letters, numbers and hyphens.')
    if (['admin', 'api', 'mail', 'en', 'zh', 'fr'].includes(targetSlug)) throw new Error('That page URL is reserved.')
    const source = await getCmsPageDraft(params.slug)
    if (!source) return NextResponse.json({ error: 'Source page not found' }, { status: 404 })
    const prisma = await getPrisma()
    const created = await prisma.$transaction(async (tx) => {
      const page = await tx.cmsPage.create({
        data: {
          slug: targetSlug,
          pageType: 'LANDING',
          status: 'DRAFT',
          labelEn: `${source.label.en} Copy`,
          labelZh: `${source.label.zh} 副本`,
          labelFr: `${source.label.fr} — copie`,
          seoTitleEn: source.seoTitle.en,
          seoTitleZh: source.seoTitle.zh,
          seoTitleFr: source.seoTitle.fr,
          seoDescriptionEn: source.seoDescription.en,
          seoDescriptionZh: source.seoDescription.zh,
          seoDescriptionFr: source.seoDescription.fr,
          sections: {
            create: source.sections.map((section, position) => ({
              key: section.key,
              type: section.type,
              position,
              enabled: section.enabled,
              content: section.content,
            })),
          },
        },
      })
      await replaceMediaReferences(tx, {
        pageId: page.id,
        source: 'DRAFT',
        sections: source.sections,
      })
      return page
    })
    await writeAuditLog({
      actorAdminId: session.sub,
      action: 'CMS_PAGE_DUPLICATED',
      entityType: 'CmsPage',
      entityId: created.id,
      metadata: { sourceSlug: params.slug, targetSlug },
    })
    return NextResponse.json({ ok: true, slug: targetSlug }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Page duplication failed'
    const status = message.includes('Unique constraint') ? 409 : 400
    return NextResponse.json({ error: status === 409 ? 'That page URL already exists.' : message }, { status })
  }
}
