import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { PHASE5_ORGANIZATION_KEY, isPhase5AdminEnabled, validatePhase5Input, validatePublicCompliance } from '@/lib/phase5-core.mjs'

export const dynamic = 'force-dynamic'

function monthKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
}

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isPhase5AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const prisma = await getPrisma()
  const since = new Date(); since.setUTCMonth(since.getUTCMonth() - 11, 1); since.setUTCHours(0, 0, 0, 0)
  const [leads, projects, compliance, partners, tasks, admins, documents, estimates, portalActivity, inquiries, leadTrends, totals] = await Promise.all([
    prisma.businessLead.findMany({ where: { organizationKey: PHASE5_ORGANIZATION_KEY }, orderBy: { updatedAt: 'desc' }, take: 250, include: { owner: { select: { id: true, name: true, email: true } }, portalProject: { select: { id: true, reference: true, title: true } }, activities: { orderBy: { createdAt: 'asc' }, take: 1, select: { createdAt: true } } } }),
    prisma.portalProject.findMany({ where: { tenant: { organizationKey: PHASE5_ORGANIZATION_KEY } }, orderBy: { updatedAt: 'desc' }, take: 250, include: { tenant: { select: { name: true, slug: true } }, owner: { select: { id: true, name: true, email: true } }, linkedLead: { select: { id: true, reference: true } }, _count: { select: { documents: true, comments: true, complianceRecords: true, internalTasks: true } } } }),
    prisma.complianceRecord.findMany({ where: { organizationKey: PHASE5_ORGANIZATION_KEY }, orderBy: { updatedAt: 'desc' }, take: 250, include: { project: { select: { id: true, reference: true, title: true } }, responsibleAdmin: { select: { id: true, name: true, email: true } }, evidenceDocument: { select: { id: true, name: true, status: true } } } }),
    prisma.localPartner.findMany({ where: { organizationKey: PHASE5_ORGANIZATION_KEY }, orderBy: { updatedAt: 'desc' }, take: 250 }),
    prisma.internalTask.findMany({ where: { organizationKey: PHASE5_ORGANIZATION_KEY }, orderBy: [{ status: 'asc' }, { dueDate: 'asc' }, { updatedAt: 'desc' }], take: 250, include: { assignee: { select: { id: true, name: true, email: true } }, lead: { select: { id: true, reference: true } }, project: { select: { id: true, reference: true, title: true } }, complianceRecord: { select: { id: true, jurisdiction: true, category: true } } } }),
    prisma.adminUser.findMany({ orderBy: { email: 'asc' }, select: { id: true, name: true, email: true } }),
    prisma.portalDocument.findMany({ where: { tenant: { organizationKey: PHASE5_ORGANIZATION_KEY } }, orderBy: { createdAt: 'desc' }, take: 250, select: { id: true, name: true, status: true, tenantId: true } }),
    prisma.savedEstimate.findMany({ where: { organizationKey: PHASE5_ORGANIZATION_KEY, createdAt: { gte: since } }, select: { createdAt: true } }),
    prisma.portalAuditEvent.findMany({ where: { tenant: { organizationKey: PHASE5_ORGANIZATION_KEY }, createdAt: { gte: since } }, select: { createdAt: true } }),
    prisma.inquiry.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } }),
    prisma.businessLead.findMany({ where: { organizationKey: PHASE5_ORGANIZATION_KEY, createdAt: { gte: since } }, select: { createdAt: true } }),
    Promise.all([
      prisma.businessLead.count({ where: { organizationKey: PHASE5_ORGANIZATION_KEY } }),
      prisma.inquiry.count(),
      prisma.businessLead.count({ where: { organizationKey: PHASE5_ORGANIZATION_KEY, status: 'WON' } }),
      prisma.portalProject.count({ where: { tenant: { organizationKey: PHASE5_ORGANIZATION_KEY }, status: { notIn: ['COMPLETED', 'ON_HOLD'] } } }),
      prisma.internalTask.count({ where: { organizationKey: PHASE5_ORGANIZATION_KEY, status: { notIn: ['DONE', 'CANCELLED'] } } }),
      prisma.complianceRecord.count({ where: { organizationKey: PHASE5_ORGANIZATION_KEY, status: { in: ['BLOCKED', 'READY_FOR_REVIEW'] } } }),
    ]),
  ])
  const responseHours = leads.flatMap((lead) => lead.activities[0] ? [(lead.activities[0].createdAt.getTime() - lead.createdAt.getTime()) / 3_600_000] : []).filter((n) => n >= 0)
  const trends: Record<string, { enquiries: number; estimates: number; portalActivity: number }> = {}
  for (let i = 0; i < 12; i++) { const d = new Date(since); d.setUTCMonth(since.getUTCMonth() + i); trends[monthKey(d)] = { enquiries: 0, estimates: 0, portalActivity: 0 } }
  for (const row of inquiries) if (trends[monthKey(row.createdAt)]) trends[monthKey(row.createdAt)].enquiries++
  for (const row of leadTrends) if (trends[monthKey(row.createdAt)]) trends[monthKey(row.createdAt)].enquiries++
  for (const row of estimates) if (trends[monthKey(row.createdAt)]) trends[monthKey(row.createdAt)].estimates++
  for (const row of portalActivity) if (trends[monthKey(row.createdAt)]) trends[monthKey(row.createdAt)].portalActivity++
  return NextResponse.json({
    leads, projects, compliance, partners, tasks, admins, documents,
    metrics: {
      enquiries: totals[0] + totals[1],
      wonLeads: totals[2],
      activeProjects: totals[3],
      openTasks: totals[4],
      complianceAttention: totals[5],
      averageResponseHours: responseHours.length ? Math.round((responseHours.reduce((a, b) => a + b, 0) / responseHours.length) * 10) / 10 : null,
      estimatorUsage: estimates.length,
      portalActivity: portalActivity.length,
      conversionPercent: totals[0] ? Math.round((totals[2] / totals[0]) * 1000) / 10 : 0,
    },
    trends: Object.entries(trends).map(([month, values]) => ({ month, ...values })),
  })
}

export async function POST(request: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isPhase5AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  try {
    const limit = await enforceRateLimit(requestFingerprint(request, `phase5-write:${session.sub}`), 120, 60_000)
    if (!limit.allowed) return NextResponse.json({ error: 'Too many updates.' }, { status: 429 })
    const input = validatePhase5Input(await request.json()) as Record<string, any>
    const prisma = await getPrisma()
    const linkedProjectId = input.portalProjectId || input.projectId
    if (linkedProjectId && !(await prisma.portalProject.findFirst({ where: { id: linkedProjectId, tenant: { organizationKey: PHASE5_ORGANIZATION_KEY } }, select: { id: true } }))) throw new Error('Invalid project link')
    if (input.leadId && !(await prisma.businessLead.findFirst({ where: { id: input.leadId, organizationKey: PHASE5_ORGANIZATION_KEY }, select: { id: true } }))) throw new Error('Invalid lead link')
    if (input.complianceRecordId && !(await prisma.complianceRecord.findFirst({ where: { id: input.complianceRecordId, organizationKey: PHASE5_ORGANIZATION_KEY }, select: { id: true } }))) throw new Error('Invalid compliance link')
    if (input.evidenceDocumentId && !(await prisma.portalDocument.findFirst({ where: { id: input.evidenceDocumentId, tenant: { organizationKey: PHASE5_ORGANIZATION_KEY } }, select: { id: true } }))) throw new Error('Invalid evidence document')
    const linkedAdminId = input.ownerAdminId || input.responsibleAdminId || input.assigneeAdminId
    if (linkedAdminId && !(await prisma.adminUser.findUnique({ where: { id: linkedAdminId }, select: { id: true } }))) throw new Error('Invalid administrator link')
    let record: { id: string; updatedAt?: Date }
    if (input.action === 'updateLead') {
      const existing = await prisma.businessLead.findFirst({ where: { id: input.id, organizationKey: PHASE5_ORGANIZATION_KEY } })
      if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      record = await prisma.businessLead.update({ where: { id: existing.id }, data: { status: input.status, priority: input.priority, ownerAdminId: input.ownerAdminId, portalProjectId: input.portalProjectId, nextAction: input.nextAction, dueDate: input.dueDate } })
      await prisma.leadActivity.create({ data: { organizationKey: PHASE5_ORGANIZATION_KEY, leadId: record.id, actorAdminId: session.sub, kind: 'PHASE5_PIPELINE_UPDATED', metadata: { status: input.status, priority: input.priority, nextAction: input.nextAction, dueDate: input.dueDate } } })
    } else if (input.action === 'updateProject') {
      const existing = await prisma.portalProject.findFirst({ where: { id: input.id, tenant: { organizationKey: PHASE5_ORGANIZATION_KEY } } })
      if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      record = await prisma.portalProject.update({ where: { id: existing.id }, data: { status: input.status, priority: input.priority, ownerAdminId: input.ownerAdminId, nextAction: input.nextAction, dueDate: input.dueDate, budgetAmount: input.budgetAmount, contractedAmount: input.contractedAmount, invoicedAmount: input.invoicedAmount, paidAmount: input.paidAmount, currency: input.currency } })
    } else if (input.action === 'createCompliance' || input.action === 'updateCompliance') {
      if (!input.jurisdiction || !input.projectUse || !input.requirement) throw new Error('Jurisdiction, project use and requirement are required')
      if (input.publicVisible && !validatePublicCompliance(input)) throw new Error('Public records require complete EN/ZH/FR titles and summaries')
      const data = { organizationKey: PHASE5_ORGANIZATION_KEY, projectId: input.projectId, evidenceDocumentId: input.evidenceDocumentId, responsibleAdminId: input.responsibleAdminId, jurisdiction: input.jurisdiction, projectUse: input.projectUse, category: input.category, requirement: input.requirement, status: input.status, responsibleParty: input.responsibleParty, evidenceUrl: input.evidenceUrl, reviewDate: input.reviewDate, publicVisible: input.publicVisible, publicTitleEn: input.publicTitleEn, publicTitleZh: input.publicTitleZh, publicTitleFr: input.publicTitleFr, publicSummaryEn: input.publicSummaryEn, publicSummaryZh: input.publicSummaryZh, publicSummaryFr: input.publicSummaryFr }
      if (input.action === 'updateCompliance') {
        const existing = await prisma.complianceRecord.findFirst({ where: { id: input.id, organizationKey: PHASE5_ORGANIZATION_KEY } })
        if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        record = await prisma.complianceRecord.update({ where: { id: existing.id }, data })
      } else record = await prisma.complianceRecord.create({ data })
    } else if (input.action === 'createPartner' || input.action === 'updatePartner') {
      if (!input.name || !input.region || !input.capabilities) throw new Error('Name, region and capabilities are required')
      const verified = input.verificationStatus === 'VERIFIED'
      const data = { organizationKey: PHASE5_ORGANIZATION_KEY, name: input.name, category: input.category, region: input.region, capabilities: input.capabilities, verificationStatus: input.verificationStatus, contactName: input.contactName, email: input.email, phone: input.phone, website: input.website, contactVisible: input.contactVisible, active: input.active, notes: input.notes, verifiedAt: verified ? new Date() : null, verifiedByAdminId: verified ? session.sub : null }
      if (input.action === 'updatePartner') {
        const existing = await prisma.localPartner.findFirst({ where: { id: input.id, organizationKey: PHASE5_ORGANIZATION_KEY } })
        if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        record = await prisma.localPartner.update({ where: { id: existing.id }, data })
      } else record = await prisma.localPartner.create({ data })
    } else {
      if (!input.title) throw new Error('Task title is required')
      const completedAt = input.status === 'DONE' ? new Date() : null
      const data = { organizationKey: PHASE5_ORGANIZATION_KEY, title: input.title, description: input.description, status: input.status, priority: input.priority, dueDate: input.dueDate, leadId: input.leadId, projectId: input.projectId, complianceRecordId: input.complianceRecordId, assigneeAdminId: input.assigneeAdminId, completedAt }
      if (input.action === 'updateTask') {
        const existing = await prisma.internalTask.findFirst({ where: { id: input.id, organizationKey: PHASE5_ORGANIZATION_KEY } })
        if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        record = await prisma.internalTask.update({ where: { id: existing.id }, data })
      } else record = await prisma.internalTask.create({ data: { ...data, createdByAdminId: session.sub } })
      if (input.notify && process.env.PHASE5_INTERNAL_NOTIFICATIONS_ENABLED === 'true' && input.assigneeAdminId) {
        const assignee = await prisma.adminUser.findUnique({ where: { id: input.assigneeAdminId }, select: { email: true } })
        if (assignee) await prisma.emailOutbox.create({ data: { organizationKey: PHASE5_ORGANIZATION_KEY, internalTaskId: record.id, dedupeKey: `phase5-task-${record.id}-${record.updatedAt?.getTime() || Date.now()}`, templateKey: 'PHASE5_TASK_REMINDER', recipient: assignee.email, subject: `NEXUS task: ${input.title}`, textBody: `${input.title}\n\n${input.description || ''}\n\nDue: ${input.dueDate?.toISOString() || 'Not set'}`, htmlBody: `<h1>${input.title.replace(/[<>&]/g, '')}</h1><p>${String(input.description || '').replace(/[<>&]/g, '')}</p><p>Due: ${input.dueDate?.toISOString() || 'Not set'}</p>` } })
      }
    }
    await writeAuditLog({ actorAdminId: session.sub, action: `PHASE5_${String(input.action).replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()}`, entityType: input.action.replace(/^(create|update)/, '') || 'Phase5', entityId: record.id })
    return NextResponse.json({ ok: true, id: record.id })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid request' }, { status: 400 })
  }
}
