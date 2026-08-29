import { NextResponse } from 'next/server'
import { verifyTelegramWebhookSecret, handleTelegramCallbackQuery, getTelegramClient } from '@/lib/telegram'

export async function POST(request: Request) {
  try {
    await verifyTelegramWebhookSecret(request)

    const body = await request.json()
    const update = body?.update || body

    if (!update || typeof update !== 'object') {
      return NextResponse.json({ ok: true })
    }

    if (update.callback_query) {
      const client = await getTelegramClient()
      await handleTelegramCallbackQuery(client, update.callback_query)
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Telegram webhook error', error)
    return NextResponse.json({ ok: true })
  }
}
