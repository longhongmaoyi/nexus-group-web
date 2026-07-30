import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import { isSameOrigin, setAdminSession } from '@/lib/admin-auth'
import { clearRateLimit, enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import { verifyPassword } from '@/lib/auth-core.mjs'

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })

  try {
    const rateLimitKey = requestFingerprint(request, 'admin-login')
    const rateLimit = await enforceRateLimit(rateLimitKey, 8, 15 * 60_000)
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many attempts' }, {
        status: 429,
        headers: { 'retry-after': String(rateLimit.retryAfterSeconds) },
      })
    }
    const body = await request.json()
    const email = String(body.email || '').trim().toLowerCase().slice(0, 320)
    const password = String(body.password || '')
    const prisma = await getPrisma()
    const user = await prisma.adminUser.findUnique({ where: { email } })
    if (!user || !verifyPassword(password, user.passwordHash)) {
      await writeAuditLog({
        action: 'ADMIN_LOGIN_FAILED',
        entityType: 'AdminUser',
        entityId: user?.id || null,
        metadata: { knownAccount: Boolean(user) },
      })
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    await setAdminSession(user)
    await clearRateLimit(rateLimitKey)
    await writeAuditLog({
      actorAdminId: user.id,
      action: 'ADMIN_LOGIN_SUCCEEDED',
      entityType: 'AdminUser',
      entityId: user.id,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Admin unavailable' }, { status: 503 })
  }
}
