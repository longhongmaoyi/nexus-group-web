import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import { asJson } from '@/lib/cms'
import { validateSectionInput } from '@/lib/cms-validation'
import { getPrisma } from '@/lib/prisma'

export async function GET() {
  if (!getAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const prisma = await getPrisma()
  const templates = await prisma.cmsSectionTemplate.findMany({
    orderBy: [{ system: 'desc' }, { name: 'asc' }],
    select: {
      id: true,
      key: true,
      name: true,
      description: true,
      sectionType: true,
      content: true,
      system: true,
      updatedAt: true,
    },
  })
  return NextResponse.json(templates)
}

export async function POST(request: Request) {
  const session = getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, `template-create:${session.sub}`), 20, 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many template changes.' }, { status: 429 })
  try {
    const body = await request.json()
    const name = String(body.name || '').trim().slice(0, 120)
    const description = String(body.description || '').trim().slice(0, 500) || null
    if (!name) throw new Error('Template name is required.')
    const section = validateSectionInput(body.section)
    const prisma = await getPrisma()
    const template = await prisma.cmsSectionTemplate.create({
      data: {
        key: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        description,
        sectionType: section.type,
        content: asJson(section.content),
        createdById: session.sub,
      },
    })
    await writeAuditLog({
      actorAdminId: session.sub,
      action: 'CMS_TEMPLATE_CREATED',
      entityType: 'CmsSectionTemplate',
      entityId: template.id,
      metadata: { name, sectionType: section.type },
    })
    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Template creation failed' }, { status: 400 })
  }
}
