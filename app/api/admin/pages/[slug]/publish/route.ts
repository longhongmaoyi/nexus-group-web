import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import { asJson, getCmsPageDraft, snapshotFromDraft } from '@/lib/cms'
import { validatePageInput } from '@/lib/cms-validation'
import { replaceMediaReferences } from '@/lib/media'
import { getPrisma } from '@/lib/prisma'

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const session = getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  try {
    const rateLimit = await enforceRateLimit(requestFingerprint(request, `page-publish:${session.sub}`), 10, 60_000)
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many publish requests. Please wait and try again.' }, {
        status: 429,
        headers: { 'retry-after': String(rateLimit.retryAfterSeconds) },
      })
    }
    const body = await request.json().catch(() => ({})) as { note?: unknown }
    const note = String(body.note || '').trim().slice(0, 500) || null
    const draft = await getCmsPageDraft(params.slug)
    if (!draft) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    validatePageInput(draft)
    const snapshot = snapshotFromDraft(draft)
    const prisma = await getPrisma()
    const publication = await prisma.$transaction(async (tx) => {
      const latest = await tx.cmsPublication.aggregate({
        where: { pageId: draft.id },
        _max: { version: true },
      })
      const created = await tx.cmsPublication.create({
        data: {
          pageId: draft.id,
          version: (latest._max.version || 0) + 1,
          snapshot: asJson(snapshot),
          note,
          publishedById: session.sub,
        },
      })
      await tx.cmsPage.update({
        where: { id: draft.id },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(snapshot.publishedAt),
          publishedSnapshot: asJson(snapshot),
        },
      })
      await replaceMediaReferences(tx, {
        pageId: draft.id,
        publicationId: created.id,
        source: 'PUBLISHED',
        sections: snapshot.sections,
      })
      return created
    })
    for (const locale of ['en', 'zh', 'fr']) {
      revalidatePath(params.slug === 'home' ? `/${locale}` : `/${locale}/${params.slug}`)
    }
    await writeAuditLog({
      actorAdminId: session.sub,
      action: 'CMS_PAGE_PUBLISHED',
      entityType: 'CmsPublication',
      entityId: publication.id,
      metadata: { slug: params.slug, version: publication.version },
    })
    return NextResponse.json({ ok: true, snapshot, publication: { id: publication.id, version: publication.version } })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Publish failed' }, { status: 400 })
  }
}
