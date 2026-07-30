import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { getCmsPageDraft } from '@/lib/cms'
import { validatePageInput } from '@/lib/cms-validation'
import { getPrisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  if (!getAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const page = await getCmsPageDraft(params.slug)
  return page ? NextResponse.json(page) : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  if (!getAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  try {
    const input = validatePageInput(await request.json())
    const prisma = await getPrisma()
    const page = await prisma.cmsPage.findUnique({ where: { slug: params.slug }, select: { id: true } })
    if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 })

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
    })
    return NextResponse.json(await getCmsPageDraft(params.slug))
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid page' }, { status: 400 })
  }
}
