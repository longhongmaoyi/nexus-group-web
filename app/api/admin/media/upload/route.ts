import { head } from '@vercel/blob'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  validateMediaUploadInput,
} from '@/lib/cms-media-core.mjs'
import { getPrisma } from '@/lib/prisma'

export async function POST(request: Request) {
  if (process.env.CMS_MEDIA_UPLOADS_ENABLED !== 'true' || !process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Media uploads are not enabled.' }, { status: 503 })
  }
  try {
    const body = await request.json() as HandleUploadBody
    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const session = getAdminSession()
        if (!session) throw new Error('Unauthorized')
        if (!isSameOrigin(request)) throw new Error('Invalid origin')
        const limit = await enforceRateLimit(requestFingerprint(request, `media-upload:${session.sub}`), 20, 60_000)
        if (!limit.allowed) throw new Error('Too many uploads. Please wait and try again.')
        if (!/^cms\/[a-zA-Z0-9][a-zA-Z0-9._-]{0,180}$/.test(pathname)) throw new Error('Invalid upload path.')
        const input = validateMediaUploadInput(JSON.parse(clientPayload || '{}'))
        return {
          allowedContentTypes: [...ALLOWED_IMAGE_TYPES],
          maximumSizeInBytes: MAX_IMAGE_SIZE_BYTES,
          addRandomSuffix: true,
          allowOverwrite: false,
          cacheControlMaxAge: 31_536_000,
          tokenPayload: JSON.stringify({ ...input, uploadedById: session.sub }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = JSON.parse(tokenPayload || '{}') as Record<string, unknown>
        const input = validateMediaUploadInput(payload)
        const uploadedById = String(payload.uploadedById || '')
        const details = await head(blob.url)
        const prisma = await getPrisma()
        const asset = await prisma.mediaAsset.upsert({
          where: { url: blob.url },
          create: {
            url: blob.url,
            downloadUrl: blob.downloadUrl,
            pathname: blob.pathname,
            originalName: input.originalName,
            contentType: details.contentType || input.contentType,
            sizeBytes: details.size,
            altEn: input.altEn,
            altZh: input.altZh,
            altFr: input.altFr,
            storageProvider: 'VERCEL_BLOB',
            etag: blob.etag,
            createdById: uploadedById || null,
          },
          update: {
            downloadUrl: blob.downloadUrl,
            pathname: blob.pathname,
            contentType: details.contentType || input.contentType,
            sizeBytes: details.size,
            etag: blob.etag,
          },
        })
        await writeAuditLog({
          actorAdminId: uploadedById || null,
          action: 'MEDIA_UPLOADED',
          entityType: 'MediaAsset',
          entityId: asset.id,
          metadata: { pathname: blob.pathname, contentType: asset.contentType, sizeBytes: asset.sizeBytes },
        })
      },
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 400 })
  }
}
