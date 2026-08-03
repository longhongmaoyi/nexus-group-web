import { NextResponse } from 'next/server'

import { getPrisma } from '@/lib/prisma'
import { getPortalSession, isPhase4Enabled } from '@/lib/portal-auth'

export async function GET() {
  if (!isPhase4Enabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!await getPortalSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const prisma = await getPrisma()
  const documents = await prisma.portalDocument.findMany({
    where: {
      status: 'VERIFIED', visibility: 'SHARED', libraryPublishedAt: { not: null },
      supplier: { verificationStatus: 'VERIFIED', approved: true },
    },
    select: {
      id: true, name: true, category: true, contentType: true, sizeBytes: true, verifiedAt: true,
      supplier: { select: { id: true, companyName: true, country: true, productTypes: true, certifications: true } },
      product: { select: { id: true, slug: true, sku: true, titleEn: true, titleZh: true, titleFr: true, category: true } },
    },
    orderBy: { libraryPublishedAt: 'desc' },
  })
  return NextResponse.json(documents)
}
