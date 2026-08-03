import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import { CONSENT_TEXT_VERSION } from '@/lib/legal-content'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const message = String(body.message || '').trim()

    if (!name || !email || !message || !email.includes('@') || body.consent !== true) {
      return NextResponse.json({ error: 'Invalid inquiry' }, { status: 400 })
    }

    const prisma = await getPrisma()
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        message,
        phone: body.phone ? String(body.phone).trim() : null,
        company: body.company ? String(body.company).trim() : null,
        country: body.country ? String(body.country).trim() : null,
        interest: body.interest ? String(body.interest).trim() : null,
        locale: ['en', 'zh', 'fr'].includes(body.locale) ? body.locale : 'en',
        consent: true,
        consentAt: new Date(),
        consentTextVersion: CONSENT_TEXT_VERSION,
      },
      select: { id: true, createdAt: true },
    })

    return NextResponse.json({ ok: true, inquiry }, { status: 201 })
  } catch (error) {
    console.error('Inquiry creation failed', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
