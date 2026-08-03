import { NextResponse } from 'next/server'
import { getPortalSession, isPhase4Enabled } from '@/lib/portal-auth'

export async function GET() {
  if (!isPhase4Enabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const session = await getPortalSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({
    user: { id: session.user.id, email: session.user.email, name: session.user.name, locale: session.user.locale },
    memberships: session.user.memberships.map(({ id, role, tenant }) => ({ id, role, tenant: { id: tenant.id, slug: tenant.slug, name: tenant.name, type: tenant.type } })),
  })
}

