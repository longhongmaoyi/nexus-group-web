import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signSession, verifySession, type SessionPayload } from '@/lib/auth-core.mjs'

export const ADMIN_COOKIE = 'nexus_admin_session'
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000

function secret() {
  return process.env.ADMIN_SESSION_SECRET || ''
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  return verifySession(cookieStore.get(ADMIN_COOKIE)?.value, secret())
}

export async function requireAdmin() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')
  return session
}

export async function setAdminSession(user: { id: string; email: string; role: string }) {
  const expires = Date.now() + SESSION_DURATION_MS
  const token = signSession({ sub: user.id, email: user.email, role: user.role, exp: expires }, secret())
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(expires),
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, '', {
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
