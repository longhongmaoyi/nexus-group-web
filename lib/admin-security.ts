import { createHash } from 'node:crypto'
import type { Prisma } from '@prisma/client'
import { getPrisma } from '@/lib/prisma'
import { asJson } from '@/lib/cms'

export async function writeAuditLog(input: {
  actorAdminId?: string | null
  action: string
  entityType: string
  entityId?: string | null
  metadata?: Record<string, unknown>
}) {
  try {
    const prisma = await getPrisma()
    await prisma.auditLog.create({
      data: {
        actorAdminId: input.actorAdminId || null,
        action: input.action.slice(0, 120),
        entityType: input.entityType.slice(0, 80),
        entityId: input.entityId?.slice(0, 120) || null,
        metadata: input.metadata ? asJson(input.metadata) : undefined,
      },
    })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.warn('Audit log unavailable', error)
  }
}

export function requestFingerprint(request: Request, scope: string) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  return createHash('sha256').update(`${scope}:${forwarded}`).digest('hex')
}

export async function enforceRateLimit(key: string, limit: number, windowMs: number) {
  const prisma = await getPrisma()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + windowMs)
  return prisma.$transaction(async (tx) => {
    const current = await tx.rateLimitBucket.findUnique({ where: { key } })
    if (!current || current.expiresAt <= now) {
      await tx.rateLimitBucket.upsert({
        where: { key },
        create: { key, count: 1, windowStartedAt: now, expiresAt },
        update: { count: 1, windowStartedAt: now, expiresAt },
      })
      return { allowed: true, remaining: Math.max(0, limit - 1), retryAfterSeconds: 0 }
    }
    if (current.count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.max(1, Math.ceil((current.expiresAt.getTime() - now.getTime()) / 1000)),
      }
    }
    const updated = await tx.rateLimitBucket.update({
      where: { key },
      data: { count: { increment: 1 } },
    })
    return { allowed: true, remaining: Math.max(0, limit - updated.count), retryAfterSeconds: 0 }
  }, { isolationLevel: 'Serializable' as Prisma.TransactionIsolationLevel })
}

export async function clearRateLimit(key: string) {
  const prisma = await getPrisma()
  await prisma.rateLimitBucket.deleteMany({ where: { key } })
}
