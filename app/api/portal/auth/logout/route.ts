import { NextResponse } from 'next/server'

import { isSameOrigin } from '@/lib/admin-auth'
import { isPhase4Enabled, revokePortalSession } from '@/lib/portal-auth'

export async function POST(request: Request) {
  if (!isPhase4Enabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  await revokePortalSession()
  return NextResponse.json({ ok: true })
}

