import { getPrisma } from '@/lib/prisma'
import { getEmailProvider, sanitizeEmailError, type EmailProvider } from '@/lib/email-provider'
import { NEXUS_ORGANIZATION_KEY } from '@/lib/phase3-core.mjs'

type ProcessEmailOutboxOptions = {
  dedupeKey?: string
  releaseTestDedupePrefix?: string
  provider?: EmailProvider
}

export async function processEmailOutbox(limit = 10, options: ProcessEmailOutboxOptions = {}) {
  const releaseTest = Boolean(options.releaseTestDedupePrefix)
  if (process.env.PHASE3_EMAIL_NOTIFICATIONS_ENABLED !== 'true' && !releaseTest) {
    return { processed: 0, sent: 0, failed: 0, disabled: true }
  }
  const prisma = await getPrisma()
  const provider = options.provider || getEmailProvider(releaseTest)
  const now = new Date()
  const staleLock = new Date(now.getTime() - 15 * 60_000)
  const candidates = await prisma.emailOutbox.findMany({
    where: {
      organizationKey: NEXUS_ORGANIZATION_KEY,
      ...(options.dedupeKey ? { dedupeKey: options.dedupeKey } : {}),
      ...(options.releaseTestDedupePrefix ? { dedupeKey: { startsWith: options.releaseTestDedupePrefix } } : {}),
      attempts: { lt: 5 },
      OR: [
        { status: { in: ['PENDING', 'FAILED'] }, nextAttemptAt: { lte: now } },
        { status: 'PROCESSING', lockedAt: { lte: staleLock } },
      ],
    },
    orderBy: { createdAt: 'asc' },
    take: Math.min(25, Math.max(1, limit)),
  })
  let sent = 0
  let failed = 0
  for (const candidate of candidates) {
    const claimed = await prisma.emailOutbox.updateMany({
      where: {
        id: candidate.id,
        status: candidate.status,
        attempts: candidate.attempts,
      },
      data: { status: 'PROCESSING', lockedAt: now, attempts: { increment: 1 } },
    })
    if (claimed.count !== 1) continue
    try {
      const result = await provider.send({
        to: candidate.recipient,
        replyTo: candidate.replyTo,
        subject: candidate.subject,
        text: candidate.textBody,
        html: candidate.htmlBody,
      })
      await prisma.emailOutbox.update({
        where: { id: candidate.id },
        data: { status: 'SENT', sentAt: new Date(), providerMessageId: result.messageId, lockedAt: null, lastError: null },
      })
      sent += 1
    } catch (error) {
      const attempts = candidate.attempts + 1
      const terminal = attempts >= candidate.maxAttempts
      const delayMinutes = Math.min(24 * 60, 2 ** attempts * 5)
      await prisma.emailOutbox.update({
        where: { id: candidate.id },
        data: {
          status: 'FAILED',
          lockedAt: null,
          lastError: sanitizeEmailError(error),
          nextAttemptAt: terminal ? new Date('2999-01-01T00:00:00.000Z') : new Date(Date.now() + delayMinutes * 60_000),
        },
      })
      failed += 1
    }
  }
  return { processed: candidates.length, sent, failed, disabled: false }
}
