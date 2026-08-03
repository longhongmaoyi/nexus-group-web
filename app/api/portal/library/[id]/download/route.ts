import { get } from '@vercel/blob'
import { NextResponse } from 'next/server'

import { getPrisma } from '@/lib/prisma'
import { getPortalSession, isPhase4Enabled, writePortalAudit } from '@/lib/portal-auth'

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  if (!isPhase4Enabled() || !process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const session = await getPortalSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const prisma = await getPrisma()
  const document = await prisma.portalDocument.findFirst({
    where: { id: (await context.params).id, status: 'VERIFIED', visibility: 'SHARED', libraryPublishedAt: { not: null }, supplier: { verificationStatus: 'VERIFIED', approved: true } },
    select: { id: true, tenantId: true, pathname: true, name: true },
  })
  if (!document) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const blob = await get(document.pathname, { access: 'private' })
  if (!blob || blob.statusCode !== 200) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await writePortalAudit({ tenantId: document.tenantId, portalUserId: session.user.id, action: 'LIBRARY_DOCUMENT_DOWNLOADED', entityType: 'PortalDocument', entityId: document.id })
  const encodedName = encodeURIComponent(document.name).replace(/'/g, '%27')
  return new Response(blob.stream, { headers: { 'content-type': blob.blob.contentType, 'content-length': String(blob.blob.size), 'content-disposition': `attachment; filename*=UTF-8''${encodedName}`, 'cache-control': 'private, no-store', 'x-content-type-options': 'nosniff' } })
}
