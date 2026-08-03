import { NextResponse } from 'next/server'

import { isSameOrigin } from '@/lib/admin-auth'
import { enforceRateLimit, requestFingerprint } from '@/lib/admin-security'
import { getPrisma } from '@/lib/prisma'
import { isPhase4Enabled, queuePortalAccessEmail } from '@/lib/portal-auth'
import { normalizePortalEmail } from '@/lib/portal-auth-core.mjs'

const genericResponse = { ok: true, message: 'If the account is eligible, a reset link will be sent.' }

export async function POST(request: Request) {
  if (!isPhase4Enabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const limit = await enforceRateLimit(requestFingerprint(request, 'portal-reset-request'), 5, 60 * 60_000)
  if (!limit.allowed) return NextResponse.json(genericResponse)

  try {
    const body = await request.json()
    const email = normalizePortalEmail(body.email)
    const prisma = await getPrisma()
    const user = await prisma.portalUser.findUnique({ where: { email } })
    if (user && user.status !== 'SUSPENDED') {
      await queuePortalAccessEmail({ userId: user.id, email: user.email, locale: user.locale, purpose: 'RESET' })
    }
  } catch {
    // Deliberately return the same response for invalid and unknown accounts.
  }
  return NextResponse.json(genericResponse)
}
