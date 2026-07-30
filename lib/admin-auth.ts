import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signSession, verifySession, type SessionPayload } from '@/lib/auth-core.mjs'

export const ADMIN_COOKIE = 'nexus_admin_session'
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000

function secret() {
  return process.env.ADMIN_SESSION_SECRET || ''
}

export function getAdminSession(): SessionPayload | null {
  return verifySession(cookies().get(ADMIN_COOKIE)?.value, secret())
}

export function requireAdmin() {
  const session = getAdminSession()
  if (!session) redirect('/admin/login')
  return session
}

export function setAdminSession(user: { id: string; email: string; role: string }) {
  const expires = Date.now() + SESSION_DURATION_MS
  const token = signSession({ sub: user.id, email: user.email, role: user.role, exp: expires }, secret())
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(expires),
  })
}

export function clearAdminSession() {
  cookies().set(ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  })
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return process.env.NODE_ENV !== 'production'
  return origin === new URL(request.url).origin
}
