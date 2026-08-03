import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { getDocumentReviewProvider, isPhase5AdminEnabled } from '@/lib/phase5-core.mjs'

export async function POST(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isPhase5AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const provider = getDocumentReviewProvider()
  if (!provider.enabled) return NextResponse.json({ error: 'AI document review is disabled', ...provider }, { status: 404 })
  if (provider.provider === 'none-configured') return NextResponse.json({ error: 'No authorized AI provider is configured', ...provider }, { status: 503 })
  return NextResponse.json({ error: 'Provider adapter is not activated; no document was processed', ...provider }, { status: 501 })
}
