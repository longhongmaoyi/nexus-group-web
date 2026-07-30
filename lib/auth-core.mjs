import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const encode = (value) => Buffer.from(value).toString('base64url')
const decode = (value) => Buffer.from(value, 'base64url').toString('utf8')

export function hashPassword(password) {
  if (typeof password !== 'string' || password.length < 12) {
    throw new Error('Admin passwords must be at least 12 characters.')
  }
  const salt = randomBytes(16)
  const derived = scryptSync(password, salt, 64)
  return `scrypt$${salt.toString('base64url')}$${derived.toString('base64url')}`
}

export function verifyPassword(password, stored) {
  const [algorithm, saltValue, hashValue] = String(stored).split('$')
  if (algorithm !== 'scrypt' || !saltValue || !hashValue) return false
  const expected = Buffer.from(hashValue, 'base64url')
  const actual = scryptSync(password, Buffer.from(saltValue, 'base64url'), expected.length)
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export function signSession(payload, secret) {
  if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET must be at least 32 characters.')
  const body = encode(JSON.stringify(payload))
  const signature = createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${signature}`
}

export function verifySession(token, secret, now = Date.now()) {
  if (!token || !secret || secret.length < 32) return null
  const [body, signature] = String(token).split('.')
  if (!body || !signature) return null
  const expected = createHmac('sha256', secret).update(body).digest()
  const actual = Buffer.from(signature, 'base64url')
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null
  try {
    const payload = JSON.parse(decode(body))
    if (!payload.sub || !payload.email || !payload.exp || payload.exp <= now) return null
    return payload
  } catch {
    return null
  }
}
