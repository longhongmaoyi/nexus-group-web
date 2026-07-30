import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import { isSameOrigin, setAdminSession } from '@/lib/admin-auth'
import { verifyPassword } from '@/lib/auth-core.mjs'

const attempts = new Map<string, { count: number; resetAt: number }>()

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const key = forwarded || 'local'
  const now = Date.now()
  const current = attempts.get(key)
  if (current && current.resetAt > now && current.count >= 8) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const email = String(body.email || '').trim().toLowerCase().slice(0, 320)
    const password = String(body.password || '')
    const prisma = await getPrisma()
    const user = await prisma.adminUser.findUnique({ where: { email } })
    if (!user || !verifyPassword(password, user.passwordHash)) {
      attempts.set(key, { count: (current?.resetAt ?? 0) > now ? current!.count + 1 : 1, resetAt: now + 15 * 60 * 1000 })
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    attempts.delete(key)
    setAdminSession(user)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Admin unavailable' }, { status: 503 })
  }
}
