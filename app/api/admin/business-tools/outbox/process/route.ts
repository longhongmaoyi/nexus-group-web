import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { writeAuditLog } from '@/lib/admin-security'
import { processEmailOutbox } from '@/lib/email-outbox'
import { isPhase3AdminEnabled } from '@/lib/phase3-core.mjs'

export async function POST(request: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  if (!isPhase3AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const result = await processEmailOutbox()
  await writeAuditLog({
    actorAdminId: session.sub,
    action: 'EMAIL_OUTBOX_PROCESSED',
    entityType: 'EmailOutbox',
    metadata: result,
  })
  return NextResponse.json(result)
}
