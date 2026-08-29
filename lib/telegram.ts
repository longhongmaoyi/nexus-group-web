import { getPrisma } from './prisma'

type TelegramEnv = {
  botToken: string
  chatId: string
  webhookSecret?: string
}

type TelegramClient = {
  sendClientRegistrationNotification: (clientData: {
    id: string
    name?: string
    email?: string | null
    company?: string | null
    interest?: string | null
    locale?: string | null
  }) => Promise<{ messageId: number }>
  answerCallbackQuery: (callbackQueryId: string, text?: string, showAlert?: boolean) => Promise<void>
  editMessageText: (chatId: string, messageId: number, text: string) => Promise<void>
}

function getEnv(): TelegramEnv {
  const botToken = String(process.env.TELEGRAM_BOT_TOKEN || '').trim()
  const chatId = String(process.env.TELEGRAM_CHAT_ID || '').trim()
  const webhookSecret = String(process.env.TELEGRAM_WEBHOOK_SECRET || '').trim() || undefined

  if (!botToken) throw new Error('TELEGRAM_BOT_TOKEN is required')
  if (!chatId) throw new Error('TELEGRAM_CHAT_ID is required')

  return { botToken, chatId, webhookSecret }
}

function baseUrl(botToken: string) {
  return `https://api.telegram.org/bot${botToken}`
}

async function telegramPost<T>(botToken: string, method: string, payload: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${baseUrl(botToken)}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    next: { revalidate: 0 },
  })

  const data = (await response.json()) as { ok?: boolean; description?: string; result?: T }
  if (!response.ok || data.ok === false) {
    const description = data.description || `Telegram ${method} failed`
    throw new Error(description)
  }

  return data.result as T
}

export async function getTelegramClient(): Promise<TelegramClient> {
  const env = getEnv()

  return {
    async sendClientRegistrationNotification(clientData) {
      const safeName = clientData.name || 'Unknown'
      const safeEmail = clientData.email || 'Not provided'
      const safeCompany = clientData.company || 'Not provided'
      const safeInterest = clientData.interest || 'Not specified'
      const safeLocale = clientData.locale || 'en'

      const approveLabel = safeLocale === 'zh' ? '✅ 批准' : safeLocale === 'fr' ? '✅ Approuver' : '✅ Approve'
      const rejectLabel = safeLocale === 'zh' ? '❌ 拒绝' : safeLocale === 'fr' ? '❌ Rejeter' : '❌ Reject'

      const payload = await telegramPost<{ message_id: number }>(env.botToken, 'sendMessage', {
        chat_id: env.chatId,
        text: [
          `🆕 New Registration`,
          ``,
          `Name: ${safeName}`,
          `Email: ${safeEmail}`,
          `Company: ${safeCompany}`,
          `Interest: ${safeInterest}`,
          `Locale: ${safeLocale}`,
          `ID: ${clientData.id}`,
        ].join('\n'),
        reply_markup: {
          inline_keyboard: [
            [
              { text: approveLabel, callback_data: `approve_user:${clientData.id}` },
              { text: rejectLabel, callback_data: `reject_user:${clientData.id}` },
            ],
          ],
        },
      })

      return { messageId: payload.message_id }
    },

    async answerCallbackQuery(callbackQueryId, text, showAlert = false) {
      await telegramPost(env.botToken, 'answerCallbackQuery', {
        callback_query_id: callbackQueryId,
        text: text || 'Processing...',
        show_alert: Boolean(showAlert),
      })
    },

    async editMessageText(chatId, messageId, text) {
      await telegramPost(env.botToken, 'editMessageText', {
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: 'HTML',
      })
    },
  }
}

export async function notifyTelegramRegistration(input: {
  id: string
  name?: string | null
  email?: string | null
  company?: string | null
  interest?: string | null
  locale?: string | null
  source?: string | null
}) {
  try {
    const client = await getTelegramClient()
    await client.sendClientRegistrationNotification({
      id: String(input.id),
      name: input.name || undefined,
      email: input.email || undefined,
      company: input.company || undefined,
      interest: input.interest || input.source || undefined,
      locale: input.locale || undefined,
    })
  } catch (error) {
    console.error('Telegram registration notification failed', error)
  }
}

export async function verifyTelegramWebhookSecret(request: Request): Promise<void> {
  const env = getEnv()
  if (!env.webhookSecret) return

  const secretHeader = request.headers.get('x-telegram-bot-api-secret-token')
  const secretQuery = new URL(request.url).searchParams.get('secret_token') || undefined

  if (secretHeader !== env.webhookSecret && secretQuery !== env.webhookSecret) {
    throw new Error('Invalid Telegram webhook secret')
  }
}

export async function handleTelegramCallbackQuery(
  client: Awaited<ReturnType<typeof getTelegramClient>>,
  callbackQuery: {
    id: string
    data?: string
    message?: {
      chat?: { id?: number | string }
      message_id?: number
      from?: { id?: number | string; first_name?: string; last_name?: string }
    }
  },
): Promise<void> {
  const callbackQueryId = String(callbackQuery.id)
  const rawData = String(callbackQuery.data || '')
  const chatId = callbackQuery.message?.chat?.id
  const messageId = callbackQuery.message?.message_id

  await client.answerCallbackQuery(callbackQueryId, 'Processing...', false)

  const [action, id] = rawData.split(':')
  const resolvedId = id || callbackQuery.message?.from?.id

  if (!chatId || !messageId || !resolvedId) {
    if (chatId && messageId) {
      await client.editMessageText(String(chatId), messageId, '⚠️ Invalid approval action.')
    }
    return
  }

  const prisma = await getPrisma()
  if (!prisma) {
    await client.editMessageText(String(chatId), messageId, '⚠️ Database unavailable.')
    return
  }

  const normalizedAction = String(action || '').toLowerCase()

  if (normalizedAction === 'approve_user') {
    const adminId = callbackQuery.message?.from?.id ? String(callbackQuery.message.from.id) : null

    const updated = await prisma.portalUser.update({
      where: { id: String(resolvedId) },
      data: {
        status: 'ACTIVE',
        emailVerifiedAt: new Date(),
      },
      select: { id: true, name: true, email: true },
    })

    await client.editMessageText(
      String(chatId),
      messageId,
      `✅ User ${updated.name || updated.email || updated.id} approved by Admin on ${new Date().toISOString()}`,
    )

    await prisma.portalAuditEvent.create({
      data: {
        tenantId: updated.id,
        portalUserId: updated.id,
        adminUserId: adminId || updated.id,
        action: 'telegram.approve_user',
        entityType: 'PortalUser',
        entityId: updated.id,
        metadata: { chatId, messageId },
      },
    })

    return
  }

  if (normalizedAction === 'reject_user') {
    const adminId = callbackQuery.message?.from?.id ? String(callbackQuery.message.from.id) : null

    await prisma.portalUser.update({
      where: { id: String(resolvedId) },
      data: {
        status: 'SUSPENDED',
      },
      select: { id: true },
    })

    await client.editMessageText(
      String(chatId),
      messageId,
      `❌ User ${String(resolvedId)} rejected by Admin on ${new Date().toISOString()}`,
    )

    await prisma.portalAuditEvent.create({
      data: {
        tenantId: String(resolvedId),
        portalUserId: String(resolvedId),
        adminUserId: adminId || String(resolvedId),
        action: 'telegram.reject_user',
        entityType: 'PortalUser',
        entityId: String(resolvedId),
        metadata: { chatId, messageId },
      },
    })

    return
  }

  await client.editMessageText(String(chatId), messageId, '⚠️ Unknown approval action.')
}
