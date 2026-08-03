import { randomBytes } from 'node:crypto'
import nodemailer from 'nodemailer'

const required = (name) => {
  const value = String(process.env[name] || '').trim()
  if (!value) throw new Error(`${name} is required.`)
  return value
}

const recipient = required('SMTP_TEST_RECIPIENT')
const host = required('SMTP_HOST')
const port = Number(required('SMTP_PORT'))
const secure = required('SMTP_SECURE') === 'true'
const user = required('SMTP_USER')
const password = required('SMTP_PASSWORD')
const from = required('SMTP_FROM')
const runId = `RA-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}-${randomBytes(3).toString('hex').toUpperCase()}`

if ((secure && port !== 465) || (!secure && ![587, 2525].includes(port))) {
  throw new Error('SMTP port and security mode do not match the approved configuration.')
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  requireTLS: !secure,
  auth: { user, pass: password },
  tls: { minVersion: 'TLSv1.2', rejectUnauthorized: true, servername: host },
  connectionTimeout: 15_000,
  greetingTimeout: 15_000,
  socketTimeout: 30_000,
})

const messages = [
  { locale: 'EN', subject: `NEXUS Release A email test EN — ${runId}`, body: 'Harmless delivery test. No action is required.' },
  { locale: 'ZH', subject: `NEXUS Release A 邮件测试 ZH — ${runId}`, body: '无害的邮件投递测试，无需采取任何操作。' },
  { locale: 'FR', subject: `Test courriel NEXUS version A FR — ${runId}`, body: 'Test de livraison sans conséquence. Aucune action requise.' },
]

try {
  await transporter.verify()
  const sent = []
  for (const message of messages) {
    const result = await transporter.sendMail({
      from,
      to: recipient,
      subject: message.subject,
      text: `${message.body}\n\nTest ID: ${runId}`,
      html: `<p>${message.body}</p><p><strong>Test ID:</strong> ${runId}</p>`,
      headers: { 'X-NEXUS-Test-ID': runId, 'X-NEXUS-Locale': message.locale },
      disableFileAccess: true,
      disableUrlAccess: true,
    })
    sent.push({ locale: message.locale, accepted: result.accepted.length, rejected: result.rejected.length })
  }
  console.log(JSON.stringify({ status: 'PASS', runId, tlsAndAuthentication: true, sent }, null, 2))
} finally {
  transporter.close()
}
