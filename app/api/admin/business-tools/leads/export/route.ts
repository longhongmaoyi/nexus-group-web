import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { writeAuditLog } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { isPhase3AdminEnabled, NEXUS_ORGANIZATION_KEY, safeCsvCell } from '@/lib/phase3-core.mjs'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isPhase3AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const prisma = await getPrisma()
  const leads = await prisma.businessLead.findMany({
    where: { organizationKey: NEXUS_ORGANIZATION_KEY },
    orderBy: { createdAt: 'desc' },
    take: 10_000,
  })
  const headers = ['Reference', 'Type', 'Status', 'Priority', 'Contact', 'Email', 'Organization', 'Sector', 'Province', 'Created']
  const rows = leads.map((lead) => [
    lead.reference, lead.type, lead.status, lead.priority, lead.contactName, lead.contactEmail,
    lead.organizationName || '', lead.sector || '', lead.province || '', lead.createdAt.toISOString(),
  ])
  const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(safeCsvCell).join(',')).join('\r\n')}`
  await writeAuditLog({
    actorAdminId: session.sub,
    action: 'BUSINESS_LEADS_EXPORTED',
    entityType: 'BusinessLead',
    metadata: { count: leads.length },
  })
  return new NextResponse(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="nexus-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      'cache-control': 'private, no-store',
    },
  })
}
