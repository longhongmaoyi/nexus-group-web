import { randomBytes, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'

import { adminNotificationTemplate, acknowledgementTemplate } from '@/lib/business-tools'
import { getEmailProvider, type EmailProvider } from '@/lib/email-provider'
import { processEmailOutbox } from '@/lib/email-outbox'
import { NEXUS_ORGANIZATION_KEY } from '@/lib/phase3-core.mjs'
import { getPrisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

function authorized(request: Request) {
  if (process.env.PHASE3_EMAIL_TESTS_ENABLED !== 'true') return false
  const expected = String(process.env.PHASE3_EMAIL_TEST_TOKEN || '')
  const provided = String(request.headers.get('x-nexus-email-test-token') || '')
  if (expected.length < 32 || expected.length !== provided.length) return false
  return timingSafeEqual(Buffer.from(expected), Buffer.from(provided))
}

const json = (value: unknown) => value as Prisma.InputJsonValue

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const recipient = String(process.env.PHASE3_EMAIL_TEST_RECIPIENT || '').trim().toLowerCase()
  if (!recipient.includes('@')) return NextResponse.json({ error: 'Test recipient is not configured.' }, { status: 503 })

  const prisma = await getPrisma()
  const runId = `RA-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}-${randomBytes(3).toString('hex').toUpperCase()}`
  const prefix = `release-a-test:${runId}:`
  const reference = `TEST-${runId}`
  const locales = ['en', 'zh', 'fr'] as const
  const rows = locales.flatMap((locale) => {
    const acknowledgement = acknowledgementTemplate(locale, 'Release A Tester', reference)
    const admin = adminNotificationTemplate(locale, {
      reference,
      type: 'PROJECT',
      contactName: `Release A ${locale.toUpperCase()} Test`,
      contactEmail: recipient,
    })
    return [
      {
        organizationKey: NEXUS_ORGANIZATION_KEY,
        dedupeKey: `${prefix}ack:${locale}`,
        templateKey: `RELEASE_A_ACK_${locale.toUpperCase()}`,
        locale,
        recipient,
        subject: `${acknowledgement.subject} [${runId}]`,
        textBody: `${acknowledgement.text}\n\nRelease A test ID: ${runId}`,
        htmlBody: `${acknowledgement.html}<p>Release A test ID: ${runId}</p>`,
      },
      {
        organizationKey: NEXUS_ORGANIZATION_KEY,
        dedupeKey: `${prefix}admin:${locale}`,
        templateKey: `RELEASE_A_ADMIN_${locale.toUpperCase()}`,
        locale,
        recipient,
        replyTo: recipient,
        subject: `${admin.subject} [${locale.toUpperCase()} ${runId}]`,
        textBody: `${admin.text}\nLocale: ${locale}\nRelease A test ID: ${runId}`,
        htmlBody: `${admin.html}<p>Locale: ${locale}<br>Release A test ID: ${runId}</p>`,
      },
    ]
  })
  const retryDedupeKey = `${prefix}retry`
  rows.push({
    organizationKey: NEXUS_ORGANIZATION_KEY,
    dedupeKey: retryDedupeKey,
    templateKey: 'RELEASE_A_RETRY',
    locale: 'en',
    recipient,
    subject: `NEXUS Release A retry verification [${runId}]`,
    textBody: `Retry verification. Release A test ID: ${runId}`,
    htmlBody: `<p>Retry verification. Release A test ID: ${runId}</p>`,
  })

  try {
    const firstInsert = await prisma.emailOutbox.createMany({ data: rows, skipDuplicates: true })
    const duplicateInsert = await prisma.emailOutbox.createMany({ data: rows, skipDuplicates: true })
    if (firstInsert.count !== 7 || duplicateInsert.count !== 0) throw new Error('Outbox duplicate prevention failed.')

    const delivery = await processEmailOutbox(10, { releaseTestDedupePrefix: prefix })
    const retryRowAfterFailureSetup = await prisma.emailOutbox.findUnique({ where: { dedupeKey: retryDedupeKey } })
    if (!retryRowAfterFailureSetup || retryRowAfterFailureSetup.status !== 'SENT') {
      throw new Error('Initial delivery batch did not complete.')
    }

    await prisma.emailOutbox.update({
      where: { dedupeKey: retryDedupeKey },
      data: { status: 'PENDING', attempts: 0, sentAt: null, providerMessageId: null, nextAttemptAt: new Date() },
    })
    const intentionalFailure = new Error('Release A intentional provider failure')
    const failingProvider: EmailProvider = { send: async () => { throw intentionalFailure } }
    const failure = await processEmailOutbox(1, { releaseTestDedupePrefix: retryDedupeKey, provider: failingProvider })
    const failedRow = await prisma.emailOutbox.findUnique({ where: { dedupeKey: retryDedupeKey } })
    const failureLogged = failure.failed === 1
      && failedRow?.status === 'FAILED'
      && failedRow.attempts === 1
      && failedRow.lastError === intentionalFailure.message
    if (!failureLogged) throw new Error('Failure logging verification failed.')

    await prisma.emailOutbox.update({ where: { dedupeKey: retryDedupeKey }, data: { nextAttemptAt: new Date() } })
    const retry = await processEmailOutbox(1, {
      releaseTestDedupePrefix: retryDedupeKey,
      provider: getEmailProvider(true),
    })
    const retriedRow = await prisma.emailOutbox.findUnique({ where: { dedupeKey: retryDedupeKey } })
    const retryPassed = retry.sent === 1 && retriedRow?.status === 'SENT' && retriedRow.attempts === 2
    if (!retryPassed) throw new Error('Retry verification failed.')

    return NextResponse.json({
      status: 'PASS',
      runId,
      queued: firstInsert.count,
      duplicatesSuppressed: duplicateInsert.count === 0,
      initialDelivery: delivery,
      failureLogged,
      retryPassed,
      sentMessages: 8,
      cleanup: 'complete',
      evidence: json({ locales, acknowledgementAndAdminTemplates: true }),
    })
  } catch (error) {
    return NextResponse.json({
      status: 'FAIL',
      runId,
      error: error instanceof Error ? error.message : 'Release A email test failed.',
    }, { status: 500 })
  } finally {
    await prisma.emailOutbox.deleteMany({ where: { dedupeKey: { startsWith: prefix } } })
  }
}
