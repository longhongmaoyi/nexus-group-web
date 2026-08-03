import nodemailer from 'nodemailer'
import { isIP } from 'node:net'

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
    host: smtpSettings().host,
    port: smtpSettings().port,
    secure: smtpSettings().secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    requireTLS: !smtpSettings().secure,
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
      servername: isIP(smtpSettings().host) ? undefined : smtpSettings().host,
    },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 30_000,
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

export function emailDeliveryConfigured(allowWhenNotificationsDisabled = false) {
  return (allowWhenNotificationsDisabled || process.env.PHASE3_EMAIL_NOTIFICATIONS_ENABLED === 'true')
    && Boolean(process.env.SMTP_HOST)
    && Boolean(process.env.SMTP_USER)
    && Boolean(process.env.SMTP_PASSWORD)
    && Boolean(process.env.SMTP_FROM)
}

function smtpSettings() {
  const host = String(process.env.SMTP_HOST || '').trim()
  const port = Number(process.env.SMTP_PORT || 465)
  const secure = String(process.env.SMTP_SECURE ?? 'true') === 'true'
  if (!host || !Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('SMTP configuration is invalid.')
  }
  if ((secure && port !== 465) || (!secure && ![587, 2525].includes(port))) {
    throw new Error('SMTP port and security mode do not match the approved configuration.')
  }
  return { host, port, secure }
}

export function sanitizeEmailError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error)
  const secrets = [process.env.SMTP_PASSWORD, process.env.SMTP_USER]
    .filter((value): value is string => Boolean(value))
    .sort((a, b) => b.length - a.length)
  return secrets.reduce((safe, secret) => safe.replaceAll(secret, '[redacted]'), message)
    .replace(/[\r\n]+/g, ' ')
    .slice(0, 500)
}

export function getEmailProvider(allowWhenNotificationsDisabled = false): EmailProvider {
  return emailDeliveryConfigured(allowWhenNotificationsDisabled) ? new SmtpEmailProvider() : new DisabledEmailProvider()
}
