import type { Prisma } from '@prisma/client'
import { cache } from 'react'
import { getPrisma } from '@/lib/prisma'
import type { CmsPageDraft, CmsPageSnapshot, CmsSectionDraft } from '@/lib/cms-types'

const localized = (row: Record<string, unknown>, prefix: string) => ({
  en: String(row[`${prefix}En`] || ''),
  zh: String(row[`${prefix}Zh`] || ''),
  fr: String(row[`${prefix}Fr`] || ''),
})

export async function getCmsPages() {
  const prisma = await getPrisma()
  return prisma.cmsPage.findMany({
    orderBy: { slug: 'asc' },
    select: {
      id: true,
      slug: true,
      pageType: true,
      status: true,
      labelEn: true,
      labelZh: true,
      labelFr: true,
      publishedAt: true,
      updatedAt: true,
      _count: { select: { sections: true } },
    },
  })
}

export async function getCmsPageDraft(slug: string): Promise<CmsPageDraft | null> {
  const prisma = await getPrisma()
  const page = await prisma.cmsPage.findUnique({
    where: { slug },
    include: { sections: { orderBy: { position: 'asc' } } },
  })
  if (!page) return null
  return {
    id: page.id,
    slug: page.slug,
    pageType: page.pageType,
    status: page.status,
    label: localized(page, 'label'),
    seoTitle: localized(page, 'seoTitle'),
    seoDescription: localized(page, 'seoDescription'),
    sections: page.sections.map((section): CmsSectionDraft => ({
      id: section.id,
      key: section.key,
      type: section.type as CmsSectionDraft['type'],
      position: section.position,
      enabled: section.enabled,
      content: section.content as CmsSectionDraft['content'],
    })),
    publishedAt: page.publishedAt?.toISOString() || null,
    updatedAt: page.updatedAt.toISOString(),
  }
}

export const getPublishedCmsPage = cache(async (slug: string): Promise<CmsPageSnapshot | null> => {
  try {
    const prisma = await getPrisma()
    const page = await prisma.cmsPage.findUnique({
      where: { slug },
      select: { status: true, publishedSnapshot: true },
    })
    if (page?.status !== 'PUBLISHED' || !page.publishedSnapshot) return null
    return page.publishedSnapshot as unknown as CmsPageSnapshot
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.warn(`CMS fallback used for ${slug}`, error)
    return null
  }
})

export function snapshotFromDraft(page: CmsPageDraft): CmsPageSnapshot {
  return {
    version: 1,
    slug: page.slug,
    pageType: page.pageType,
    label: page.label,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    sections: page.sections.filter((section) => section.enabled),
    publishedAt: new Date().toISOString(),
  }
}

export const asJson = (value: unknown) => value as Prisma.InputJsonValue
