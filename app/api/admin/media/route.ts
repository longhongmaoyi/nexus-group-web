import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { mediaSelect } from '@/lib/media'
import { getPrisma } from '@/lib/prisma'

export async function GET(request: Request) {
  if (!getAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const url = new URL(request.url)
  const query = String(url.searchParams.get('q') || '').trim().slice(0, 100)
  const includeArchived = url.searchParams.get('archived') === '1'
  const prisma = await getPrisma()
  const assets = await prisma.mediaAsset.findMany({
    where: {
      status: includeArchived ? undefined : 'ACTIVE',
      ...(query ? {
        OR: [
          { originalName: { contains: query, mode: 'insensitive' } },
          { altEn: { contains: query, mode: 'insensitive' } },
          { altZh: { contains: query, mode: 'insensitive' } },
          { altFr: { contains: query, mode: 'insensitive' } },
        ],
      } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
    select: mediaSelect,
  })
  return NextResponse.json({
    assets,
    uploadEnabled: process.env.CMS_MEDIA_UPLOADS_ENABLED === 'true' && Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    limits: {
      maxBytes: 10 * 1024 * 1024,
      contentTypes: ['image/avif', 'image/jpeg', 'image/png', 'image/webp'],
    },
  })
}
