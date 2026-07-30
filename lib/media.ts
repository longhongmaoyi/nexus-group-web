import type { Prisma, PrismaClient } from '@prisma/client'
import { extractMediaReferences } from '@/lib/cms-media-core.mjs'
import type { CmsSectionDraft } from '@/lib/cms-types'

type TransactionClient = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0]

export async function replaceMediaReferences(
  tx: TransactionClient,
  input: {
    pageId: string
    source: 'DRAFT' | 'PUBLISHED'
    sections: CmsSectionDraft[]
    publicationId?: string
  },
) {
  if (input.source === 'DRAFT') {
    await tx.mediaReference.deleteMany({ where: { pageId: input.pageId, source: 'DRAFT' } })
  }
  const references = extractMediaReferences(input.sections)
  if (!references.length) return
  const uniqueAssetIds = Array.from(new Set(references.map((reference) => reference.assetId)))
  const assets = await tx.mediaAsset.findMany({
    where: { id: { in: uniqueAssetIds }, status: 'ACTIVE' },
    select: { id: true },
  })
  if (assets.length !== uniqueAssetIds.length) throw new Error('One or more selected media assets are unavailable.')
  await tx.mediaReference.createMany({
    data: references.map((reference) => ({
      assetId: reference.assetId,
      pageId: input.pageId,
      publicationId: input.publicationId,
      source: input.source,
      sectionKey: reference.sectionKey,
      fieldPath: reference.fieldPath,
    })),
  })
}

export const mediaSelect = {
  id: true,
  url: true,
  downloadUrl: true,
  pathname: true,
  originalName: true,
  contentType: true,
  sizeBytes: true,
  width: true,
  height: true,
  altEn: true,
  altZh: true,
  altFr: true,
  storageProvider: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  _count: { select: { references: true } },
} satisfies Prisma.MediaAssetSelect
