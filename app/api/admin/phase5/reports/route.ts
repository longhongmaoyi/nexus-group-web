import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { writeAuditLog } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { generatePhase5ReportPdf } from '@/lib/phase5-report-pdf'
import { PHASE5_ORGANIZATION_KEY, isPhase5AdminEnabled } from '@/lib/phase5-core.mjs'
import { safeCsvCell } from '@/lib/phase3-core.mjs'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isPhase5AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const prisma = await getPrisma()
  const [projects, openTasks, complianceAttention] = await Promise.all([
    prisma.portalProject.findMany({ where: { tenant: { organizationKey: PHASE5_ORGANIZATION_KEY } }, include: { tenant: { select: { name: true } }, owner: { select: { email: true } } }, orderBy: { updatedAt: 'desc' } }),
    prisma.internalTask.count({ where: { organizationKey: PHASE5_ORGANIZATION_KEY, status: { notIn: ['DONE', 'CANCELLED'] } } }),
    prisma.complianceRecord.count({ where: { organizationKey: PHASE5_ORGANIZATION_KEY, status: { in: ['BLOCKED', 'READY_FOR_REVIEW'] } } }),
  ])
  const format = new URL(request.url).searchParams.get('format') === 'pdf' ? 'pdf' : 'csv'
  await writeAuditLog({ actorAdminId: session.sub, action: 'PHASE5_REPORT_EXPORTED', entityType: 'PortalProject', metadata: { format, count: projects.length } })
  const filename = `nexus-phase5-${new Date().toISOString().slice(0, 10)}.${format}`
  if (format === 'pdf') {
    const pdf = await generatePhase5ReportPdf(projects, { openTasks, complianceAttention })
    return new NextResponse(new Uint8Array(pdf), { headers: { 'content-type': 'application/pdf', 'content-disposition': `attachment; filename="${filename}"`, 'cache-control': 'private, no-store', 'x-content-type-options': 'nosniff' } })
  }
  const headers = ['Reference', 'Project', 'Tenant', 'Status', 'Priority', 'Owner', 'Due date', 'Currency', 'Budget', 'Contracted', 'Invoiced', 'Paid', 'Next action']
  const rows = projects.map((x) => [x.reference, x.title, x.tenant.name, x.status, x.priority, x.owner?.email || '', x.dueDate?.toISOString() || '', x.currency, x.budgetAmount?.toString() || '', x.contractedAmount?.toString() || '', x.invoicedAmount?.toString() || '', x.paidAmount?.toString() || '', x.nextAction || ''])
  const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(safeCsvCell).join(',')).join('\r\n')}`
  return new NextResponse(csv, { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="${filename}"`, 'cache-control': 'private, no-store' } })
}
