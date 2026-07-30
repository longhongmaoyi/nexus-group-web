import nodemailer from 'nodemailer'

export type OutgoingEmail = {
  to: string
  replyTo?: string | null
  subject: string
  text: string
  html: string
}

export type EmailSendResult = { messageId: string }
export interface EmailProvider {
  send(message: OutgoingEmail): Promise<EmailSendResult>
}

class DisabledEmailProvider implements EmailProvider {
  async send(_: OutgoingEmail): Promise<EmailSendResult> {
    throw new Error('Email delivery is disabled.')
  }
}

class SmtpEmailProvider implements EmailProvider {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE ?? 'true') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  async send(message: OutgoingEmail) {
    const result = await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: message.to,
      replyTo: message.replyTo || undefined,
      subject: message.subject,
      text: message.text,
      html: message.html,
      disableFileAccess: true,
      disableUrlAccess: true,
    })
    return { messageId: String(result.messageId || '') }
  }
}

export function emailDeliveryConfigured() {
  return process.env.PHASE3_EMAIL_NOTIFICATIONS_ENABLED === 'true'
    && Boolean(process.env.SMTP_HOST)
    && Boolean(process.env.SMTP_USER)
    && Boolean(process.env.SMTP_PASSWORD)
    && Boolean(process.env.SMTP_FROM)
}

export function getEmailProvider(): EmailProvider {
  return emailDeliveryConfigured() ? new SmtpEmailProvider() : new DisabledEmailProvider()
}
