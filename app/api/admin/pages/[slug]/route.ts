import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { requestFingerprint, enforceRateLimit, writeAuditLog } from '@/lib/admin-security'
import { getCmsPageDraft } from '@/lib/cms'
import { validatePageInput } from '@/lib/cms-validation'
import { replaceMediaReferences } from '@/lib/media'
import { getPrisma } from '@/lib/prisma'

export async function GET(_: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  if (!(await getAdminSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const page = await getCmsPageDraft(params.slug)
  return page ? NextResponse.json(page) : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PUT(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  try {
    const rateLimit = await enforceRateLimit(requestFingerprint(request, `page-save:${session.sub}`), 60, 60_000)
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many page changes. Please wait and try again.' }, {
        status: 429,
        headers: { 'retry-after': String(rateLimit.retryAfterSeconds) },
      })
    }
    const body = await request.json()
    const input = validatePageInput(body)
    const expectedUpdatedAt = String(body.updatedAt || '')
    const prisma = await getPrisma()
    const page = await prisma.cmsPage.findUnique({
      where: { slug: params.slug },
      select: { id: true, updatedAt: true },
    })
    if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (!expectedUpdatedAt || page.updatedAt.toISOString() !== expectedUpdatedAt) {
      return NextResponse.json({
        error: 'This page changed after you opened it. Reload before saving so another editor’s work is not overwritten.',
      }, { status: 409 })
    }

    await prisma.$transaction(async (tx) => {
      await tx.cmsSection.deleteMany({ where: { pageId: page.id } })
      await tx.cmsPage.update({
        where: { id: page.id },
        data: {
          status: 'DRAFT',
          labelEn: input.label.en, labelZh: input.label.zh, labelFr: input.label.fr,
          seoTitleEn: input.seoTitle.en, seoTitleZh: input.seoTitle.zh, seoTitleFr: input.seoTitle.fr,
          seoDescriptionEn: input.seoDescription.en, seoDescriptionZh: input.seoDescription.zh, seoDescriptionFr: input.seoDescription.fr,
          sections: {
            create: input.sections.map((section) => ({
              key: section.key,
              type: section.type,
              position: section.position,
              enabled: section.enabled,
              content: section.content,
            })),
          },
        },
      })
      await replaceMediaReferences(tx, {
        pageId: page.id,
        source: 'DRAFT',
        sections: input.sections,
      })
    })
    const updated = await getCmsPageDraft(params.slug)
    await writeAuditLog({
      actorAdminId: session.sub,
      action: 'CMS_PAGE_DRAFT_SAVED',
      entityType: 'CmsPage',
      entityId: page.id,
      metadata: { slug: params.slug, sectionCount: input.sections.length },
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid page' }, { status: 400 })
  }
}
