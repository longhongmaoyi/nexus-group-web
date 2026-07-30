import type { CmsPageSnapshot } from '@/lib/cms-types'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import { asJson } from '@/lib/cms'
import { validatePageInput } from '@/lib/cms-validation'
import { replaceMediaReferences } from '@/lib/media'
import { getPrisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  props: { params: Promise<{ slug: string; publicationId: string }> }
) {
  const params = await props.params
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `page-rollback:${session.sub}`), 5, 60_000)
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Too many rollback requests. Please wait and try again.' }, {
      status: 429,
      headers: { 'retry-after': String(limit.retryAfterSeconds) },
    })
  }
  try {
    const prisma = await getPrisma()
    const source = await prisma.cmsPublication.findFirst({
      where: { id: params.publicationId, page: { slug: params.slug } },
      include: { page: { select: { id: true } } },
    })
    if (!source) return NextResponse.json({ error: 'Publication not found' }, { status: 404 })
    const snapshot = source.snapshot as unknown as CmsPageSnapshot
    validatePageInput(snapshot)
    const rolledBackSnapshot: CmsPageSnapshot = {
      ...snapshot,
      version: 2,
      publishedAt: new Date().toISOString(),
    }
    const publication = await prisma.$transaction(async (tx) => {
      const latest = await tx.cmsPublication.aggregate({
        where: { pageId: source.pageId },
        _max: { version: true },
      })
      const created = await tx.cmsPublication.create({
        data: {
          pageId: source.pageId,
          version: (latest._max.version || 0) + 1,
          snapshot: asJson(rolledBackSnapshot),
          note: `Rollback to version ${source.version}`,
          publishedById: session.sub,
          sourcePublicationId: source.id,
        },
      })
      await tx.cmsPage.update({
        where: { id: source.pageId },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(rolledBackSnapshot.publishedAt),
          publishedSnapshot: asJson(rolledBackSnapshot),
        },
      })
      await replaceMediaReferences(tx, {
        pageId: source.pageId,
        publicationId: created.id,
        source: 'PUBLISHED',
        sections: rolledBackSnapshot.sections,
      })
      return created
    })
    for (const locale of ['en', 'zh', 'fr']) {
      revalidatePath(params.slug === 'home' ? `/${locale}` : `/${locale}/${params.slug}`)
    }
    await writeAuditLog({
      actorAdminId: session.sub,
      action: 'CMS_PAGE_ROLLED_BACK',
      entityType: 'CmsPublication',
      entityId: publication.id,
      metadata: { slug: params.slug, sourceVersion: source.version, newVersion: publication.version },
    })
    return NextResponse.json({ ok: true, version: publication.version })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Rollback failed' }, { status: 400 })
  }
}
