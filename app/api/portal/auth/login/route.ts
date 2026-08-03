import { NextResponse } from 'next/server'

import { isSameOrigin } from '@/lib/admin-auth'
import { clearRateLimit, enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { authenticatePortalUser, createPortalSession, isPhase4Enabled } from '@/lib/portal-auth'
import { normalizePortalEmail } from '@/lib/portal-auth-core.mjs'

export async function POST(request: Request) {
  if (!isPhase4Enabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const key = requestFingerprint(request, 'portal-login')
  const limit = await enforceRateLimit(key, 8, 15 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many attempts' }, { status: 429, headers: { 'retry-after': String(limit.retryAfterSeconds) } })
  try {
    const body = await request.json()
    const user = await authenticatePortalUser(normalizePortalEmail(body.email), String(body.password || ''))
    if (!user) return NextResponse.json({ error: 'Invalid credentials or inactive account' }, { status: 401 })
    await createPortalSession(user.id)
    await clearRateLimit(key)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid credentials or inactive account' }, { status: 401 })
  }
}

