import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import { asJson } from '@/lib/cms'
import { getPrisma } from '@/lib/prisma'
import { isPhase3AdminEnabled, NEXUS_ORGANIZATION_KEY, validateLeadUpdate } from '@/lib/phase3-core.mjs'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  if (!getAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isPhase3AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const prisma = await getPrisma()
  const lead = await prisma.businessLead.findFirst({
    where: { id: params.id, organizationKey: NEXUS_ORGANIZATION_KEY },
    include: {
      owner: { select: { id: true, email: true, name: true } },
      estimates: {
        orderBy: { createdAt: 'desc' },
        include: {
          costAssumptionVersion: { select: { version: true, name: true, currency: true } },
          timelineVersion: { select: { version: true, name: true } },
        },
      },
      activities: {
        orderBy: { createdAt: 'desc' },
        include: { actorAdmin: { select: { email: true, name: true } } },
      },
      emailMessages: {
        orderBy: { createdAt: 'desc' },
        select: { id: true, templateKey: true, recipient: true, status: true, attempts: true, lastError: true, sentAt: true, createdAt: true },
      },
    },
  })
  return lead ? NextResponse.json(lead) : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isPhase3AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  try {
    const limit = await enforceRateLimit(requestFingerprint(request, `phase3-lead-update:${session.sub}`), 60, 60_000)
    if (!limit.allowed) return NextResponse.json({ error: 'Too many updates.' }, { status: 429 })
    const input = validateLeadUpdate(await request.json())
    const prisma = await getPrisma()
    const existing = await prisma.businessLead.findFirst({
      where: { id: params.id, organizationKey: NEXUS_ORGANIZATION_KEY },
      select: { id: true, status: true, priority: true, ownerAdminId: true },
    })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (input.ownerAdminId) {
      const owner = await prisma.adminUser.findUnique({ where: { id: input.ownerAdminId }, select: { id: true } })
      if (!owner) return NextResponse.json({ error: 'Invalid owner' }, { status: 400 })
    }
    const updated = await prisma.$transaction(async (tx) => {
      const lead = await tx.businessLead.update({
        where: { id: existing.id },
        data: { status: input.status as never, priority: input.priority as never, ownerAdminId: input.ownerAdminId },
      })
      await tx.leadActivity.create({
        data: {
          organizationKey: NEXUS_ORGANIZATION_KEY,
          leadId: lead.id,
          actorAdminId: session.sub,
          kind: input.note ? 'NOTE_ADDED' : 'LEAD_UPDATED',
          body: input.note,
          metadata: asJson({
            previous: { status: existing.status, priority: existing.priority, ownerAdminId: existing.ownerAdminId },
            current: { status: lead.status, priority: lead.priority, ownerAdminId: lead.ownerAdminId },
          }),
        },
      })
      return lead
    })
    await writeAuditLog({
      actorAdminId: session.sub,
      action: 'BUSINESS_LEAD_UPDATED',
      entityType: 'BusinessLead',
      entityId: existing.id,
      metadata: { status: updated.status, priority: updated.priority },
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid update' }, { status: 400 })
  }
}
