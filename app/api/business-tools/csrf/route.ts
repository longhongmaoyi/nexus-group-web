import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createCsrfToken, hashCsrfToken, isPhase3PublicEnabled } from '@/lib/phase3-core.mjs'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!isPhase3PublicEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const secret = process.env.PHASE3_FORM_SECRET || process.env.ADMIN_SESSION_SECRET || ''
  try {
    const token = createCsrfToken(secret)
    const cookieStore = await cookies()
    cookieStore.set('nexus_public_csrf', hashCsrfToken(token), {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 30 * 60,
    })
    return NextResponse.json({ token }, { headers: { 'cache-control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Form protection is unavailable.' }, { status: 503 })
  }
}
