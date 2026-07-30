import { createHash } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { isSameOrigin } from '@/lib/admin-auth'
import { createLeadWithEstimate } from '@/lib/business-tools'
import { enforceRateLimit, requestFingerprint, writeAuditLog } from '@/lib/admin-security'
import {
  isPhase3PublicEnabled,
  validateLeadSubmission,
  verifyCsrfToken,
} from '@/lib/phase3-core.mjs'

export async function POST(request: Request) {
  if (!isPhase3PublicEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const csrfToken = request.headers.get('x-nexus-csrf-token') || ''
  const csrfHash = (await cookies()).get('nexus_public_csrf')?.value || ''
  const secret = process.env.PHASE3_FORM_SECRET || process.env.ADMIN_SESSION_SECRET || ''
  if (!verifyCsrfToken(csrfToken, csrfHash, secret)) {
    return NextResponse.json({ error: 'The form session expired. Refresh and try again.' }, { status: 403 })
  }
  try {
    const limit = await enforceRateLimit(requestFingerprint(request, 'phase3-public-lead'), 6, 60 * 60_000)
    if (!limit.allowed) {
      return NextResponse.json({ error: 'Too many submissions. Please try later.' }, {
        status: 429,
        headers: { 'retry-after': String(limit.retryAfterSeconds) },
      })
    }
    const body = await request.json()
    const input = validateLeadSubmission(body)
    const baseCost = body.baseCost ? Number(body.baseCost) : null
    const result = await createLeadWithEstimate({
      ...input,
      baseCost,
      sourceMetadata: {
        userAgentHash: request.headers.get('user-agent')
          ? createHash('sha256').update(request.headers.get('user-agent') || '').digest('hex')
          : null,
        referrer: request.headers.get('referer')?.slice(0, 500) || null,
      },
    })
    await writeAuditLog({
      action: 'BUSINESS_LEAD_CREATED',
      entityType: 'BusinessLead',
      entityId: result.lead.id,
      metadata: { reference: result.lead.reference, type: result.lead.type, locale: result.lead.locale },
    })
    return NextResponse.json({
      ok: true,
      reference: result.lead.reference,
      estimateReference: result.estimate?.reference || null,
    }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Submission failed.'
    const status = /required|valid|Spam|Invalid/.test(message) ? 400 : 503
    return NextResponse.json({ error: message }, { status })
  }
}
