import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import { getActiveAssumptions } from '@/lib/business-tools'
import { asJson } from '@/lib/cms'
import { getPrisma } from '@/lib/prisma'
import {
  isPhase3AdminEnabled,
  NEXUS_ORGANIZATION_KEY,
  normalizeCostAssumptions,
  normalizeTimelineStages,
} from '@/lib/phase3-core.mjs'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isPhase3AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const prisma = await getPrisma()
  const [active, costVersions, timelineVersions] = await Promise.all([
    getActiveAssumptions(),
    prisma.costAssumptionVersion.findMany({
      where: { organizationKey: NEXUS_ORGANIZATION_KEY },
      orderBy: { version: 'desc' },
      take: 25,
    }),
    prisma.timelineAssumptionVersion.findMany({
      where: { organizationKey: NEXUS_ORGANIZATION_KEY },
      orderBy: { version: 'desc' },
      take: 25,
    }),
  ])
  return NextResponse.json({ active, costVersions, timelineVersions })
}

export async function POST(request: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  if (!isPhase3AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  try {
    const limit = await enforceRateLimit(requestFingerprint(request, `phase3-config:${session.sub}`), 20, 60_000)
    if (!limit.allowed) return NextResponse.json({ error: 'Too many configuration changes.' }, { status: 429 })
    const body = await request.json()
    const kind = String(body.kind || '').toUpperCase()
    const name = String(body.name || '').trim().slice(0, 160)
    const disclaimers = {
      en: String(body.disclaimerEn || '').trim().slice(0, 5000),
      zh: String(body.disclaimerZh || '').trim().slice(0, 5000),
      fr: String(body.disclaimerFr || '').trim().slice(0, 5000),
    }
    if (!name || !disclaimers.en || !disclaimers.zh || !disclaimers.fr) {
      return NextResponse.json({ error: 'Name and all three disclaimers are required.' }, { status: 400 })
    }
    const prisma = await getPrisma()
    if (kind === 'COST') {
      const assumptions = normalizeCostAssumptions(body.assumptions)
      const currency = String(body.currency || '').trim().toUpperCase()
      if (!/^[A-Z]{3}$/.test(currency)) {
        return NextResponse.json({ error: 'Currency must be a three-letter code.' }, { status: 400 })
      }
      const version = (await prisma.costAssumptionVersion.aggregate({
        where: { organizationKey: NEXUS_ORGANIZATION_KEY },
        _max: { version: true },
      }))._max.version || 0
      const created = await prisma.$transaction(async (tx) => {
        await tx.costAssumptionVersion.updateMany({
          where: { organizationKey: NEXUS_ORGANIZATION_KEY, active: true },
          data: { active: false },
        })
        return tx.costAssumptionVersion.create({
          data: {
            organizationKey: NEXUS_ORGANIZATION_KEY,
            version: version + 1,
            name,
            currency,
            assumptions: asJson(assumptions),
            disclaimerEn: disclaimers.en,
            disclaimerZh: disclaimers.zh,
            disclaimerFr: disclaimers.fr,
            active: true,
            createdById: session.sub,
          },
        })
      })
      await writeAuditLog({ actorAdminId: session.sub, action: 'COST_ASSUMPTIONS_VERSION_CREATED', entityType: 'CostAssumptionVersion', entityId: created.id, metadata: { version: created.version } })
      return NextResponse.json({ ok: true, id: created.id, version: created.version }, { status: 201 })
    }
    if (kind === 'TIMELINE') {
      const stages = normalizeTimelineStages(body.stages)
      const uncertaintyPct = Math.max(0, Math.min(100, Math.round(Number(body.uncertaintyPct || 20))))
      const version = (await prisma.timelineAssumptionVersion.aggregate({
        where: { organizationKey: NEXUS_ORGANIZATION_KEY },
        _max: { version: true },
      }))._max.version || 0
      const created = await prisma.$transaction(async (tx) => {
        await tx.timelineAssumptionVersion.updateMany({
          where: { organizationKey: NEXUS_ORGANIZATION_KEY, active: true },
          data: { active: false },
        })
        return tx.timelineAssumptionVersion.create({
          data: {
            organizationKey: NEXUS_ORGANIZATION_KEY,
            version: version + 1,
            name,
            stages: asJson(stages),
            uncertaintyPct,
            disclaimerEn: disclaimers.en,
            disclaimerZh: disclaimers.zh,
            disclaimerFr: disclaimers.fr,
            active: true,
            createdById: session.sub,
          },
        })
      })
      await writeAuditLog({ actorAdminId: session.sub, action: 'TIMELINE_ASSUMPTIONS_VERSION_CREATED', entityType: 'TimelineAssumptionVersion', entityId: created.id, metadata: { version: created.version } })
      return NextResponse.json({ ok: true, id: created.id, version: created.version }, { status: 201 })
    }
    return NextResponse.json({ error: 'Unsupported configuration type.' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid configuration' }, { status: 400 })
  }
}
