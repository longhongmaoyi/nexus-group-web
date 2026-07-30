import { NextResponse } from 'next/server'
import { clearAdminSession, isSameOrigin } from '@/lib/admin-auth'

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  clearAdminSession()
  return NextResponse.redirect(new URL('/admin/login', request.url), 303)
}
