import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { writeAuditLog } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { generateProjectBriefPdf } from '@/lib/project-brief-pdf'
import { isPhase3AdminEnabled, NEXUS_ORGANIZATION_KEY } from '@/lib/phase3-core.mjs'

export const runtime = 'nodejs'

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isPhase3AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const locale = new URL(request.url).searchParams.get('locale') || 'en'
  const prisma = await getPrisma()
  const lead = await prisma.businessLead.findFirst({
    where: { id: params.id, organizationKey: NEXUS_ORGANIZATION_KEY },
    include: { estimates: { orderBy: { createdAt: 'desc' }, take: 1 } },
  })
  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const pdf = await generateProjectBriefPdf(lead, locale)
  await writeAuditLog({
    actorAdminId: session.sub,
    action: 'PROJECT_BRIEF_DOWNLOADED',
    entityType: 'BusinessLead',
    entityId: lead.id,
    metadata: { locale, reference: lead.reference },
  })
  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': `attachment; filename="${lead.reference}-${locale}-brief.pdf"`,
      'cache-control': 'private, no-store',
      'x-content-type-options': 'nosniff',
    },
  })
}
