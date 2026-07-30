import assert from 'node:assert/strict'
import test from 'node:test'
import { hashPassword, signSession, verifyPassword, verifySession } from '../lib/auth-core.mjs'

test('password hashes verify without storing plaintext', () => {
  const hash = hashPassword('correct horse battery staple')
  assert.equal(hash.includes('correct horse'), false)
  assert.equal(verifyPassword('correct horse battery staple', hash), true)
  assert.equal(verifyPassword('wrong password', hash), false)
})

test('signed sessions reject tampering and expiry', () => {
  const secret = 'a-secure-test-secret-that-is-longer-than-32-characters'
  const payload = { sub: 'admin-1', email: 'admin@nexuslife.ca', role: 'ADMIN', exp: Date.now() + 60_000 }
  const token = signSession(payload, secret)
  assert.equal(verifySession(token, secret)?.sub, 'admin-1')
  assert.equal(verifySession(`${token}x`, secret), null)
  assert.equal(verifySession(token, secret, payload.exp + 1), null)
})
