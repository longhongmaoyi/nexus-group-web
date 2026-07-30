import type { LeadPriority, LeadStatus, LeadType, Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { getPrisma } from '@/lib/prisma'
import { isPhase3AdminEnabled, LEAD_PRIORITIES, LEAD_STATUSES, LEAD_TYPES, NEXUS_ORGANIZATION_KEY } from '@/lib/phase3-core.mjs'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isPhase3AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const url = new URL(request.url)
  const status = url.searchParams.get('status')?.toUpperCase()
  const type = url.searchParams.get('type')?.toUpperCase()
  const priority = url.searchParams.get('priority')?.toUpperCase()
  const query = String(url.searchParams.get('q') || '').trim().slice(0, 100)
  const where: Prisma.BusinessLeadWhereInput = {
    organizationKey: NEXUS_ORGANIZATION_KEY,
    ...(status && LEAD_STATUSES.includes(status) ? { status: status as LeadStatus } : {}),
    ...(type && LEAD_TYPES.includes(type) ? { type: type as LeadType } : {}),
    ...(priority && LEAD_PRIORITIES.includes(priority) ? { priority: priority as LeadPriority } : {}),
    ...(query ? {
      OR: [
        { reference: { contains: query, mode: 'insensitive' } },
        { contactName: { contains: query, mode: 'insensitive' } },
        { contactEmail: { contains: query, mode: 'insensitive' } },
        { organizationName: { contains: query, mode: 'insensitive' } },
      ],
    } : {}),
  }
  const prisma = await getPrisma()
  const leads = await prisma.businessLead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 250,
    select: {
      id: true, reference: true, type: true, status: true, priority: true,
      contactName: true, contactEmail: true, organizationName: true, sector: true,
      province: true, owner: { select: { id: true, email: true, name: true } },
      createdAt: true, updatedAt: true,
    },
  })
  return NextResponse.json({ leads })
}
