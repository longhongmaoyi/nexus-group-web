import { NextResponse } from 'next/server'
import { isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { consumeVerificationToken, isPhase4Enabled } from '@/lib/portal-auth'

export async function POST(request: Request) {
  if (!isPhase4Enabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, 'portal-verification-consume'), 20, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json({ error: 'Too many attempts' }, { status: 429 })
  try {
    const body = await request.json()
    await consumeVerificationToken(String(body.token || ''))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Verification failed' }, { status: 400 })
  }
}
