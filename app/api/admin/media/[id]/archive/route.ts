import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `media-archive:${session.sub}`), 20, 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many media changes.' }, { status: 429 })
  try {
    const prisma = await getPrisma()
    const asset = await prisma.mediaAsset.findUnique({
      where: { id: params.id },
      select: { id: true, status: true, _count: { select: { references: true } } },
    })
    if (!asset) return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    if (asset._count.references > 0) {
      return NextResponse.json({
        error: `This image has ${asset._count.references} page or publication reference(s). Replace those references before archiving.`,
      }, { status: 409 })
    }
    await prisma.mediaAsset.update({
      where: { id: asset.id },
      data: { status: 'ARCHIVED', archivedAt: new Date() },
    })
    await writeAuditLog({
      actorAdminId: session.sub,
      action: 'MEDIA_ARCHIVED',
      entityType: 'MediaAsset',
      entityId: asset.id,
      metadata: { blobPreserved: true },
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Archive failed' }, { status: 400 })
  }
}
