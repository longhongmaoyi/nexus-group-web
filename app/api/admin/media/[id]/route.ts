import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import { mediaSelect } from '@/lib/media'
import { getPrisma } from '@/lib/prisma'

const clean = (value: unknown) => String(value || '').trim().slice(0, 300)

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `media-edit:${session.sub}`), 60, 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many media changes.' }, { status: 429 })
  try {
    const body = await request.json()
    const altEn = clean(body.altEn)
    const altZh = clean(body.altZh)
    const altFr = clean(body.altFr)
    if (!altEn || !altZh || !altFr) throw new Error('Alt text is required in English, Chinese and French.')
    const prisma = await getPrisma()
    const asset = await prisma.mediaAsset.update({
      where: { id: params.id },
      data: { altEn, altZh, altFr },
      select: mediaSelect,
    })
    await writeAuditLog({
      actorAdminId: session.sub,
      action: 'MEDIA_METADATA_UPDATED',
      entityType: 'MediaAsset',
      entityId: asset.id,
    })
    return NextResponse.json(asset)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Media update failed' }, { status: 400 })
  }
}
