import assert from 'node:assert/strict'
import test from 'node:test'

import {
  PORTAL_MAX_UPLOAD_BYTES,
  canPortal,
  createOpaqueToken,
  hashOpaqueToken,
  isActivePortalSession,
  isUsablePortalToken,
  normalizePortalEmail,
  validatePortalUpload,
  validatePortalPassword,
} from '../lib/portal-auth-core.mjs'
import { tenantScope, validatePortalCommentInput, validateQuoteDecision } from '../lib/portal-tenant-core.mjs'

test('opaque portal tokens are random and only their hashes need persistence', () => {
  const first = createOpaqueToken()
  const second = createOpaqueToken()
  assert.notEqual(first, second)
  assert.equal(first.length >= 43, true)
  assert.match(hashOpaqueToken(first), /^[a-f0-9]{64}$/)
  assert.notEqual(hashOpaqueToken(first), hashOpaqueToken(second))
})

test('portal passwords require length and mixed character classes', () => {
  assert.equal(validatePortalPassword('SecurePortal2026'), 'SecurePortal2026')
  assert.throws(() => validatePortalPassword('short1A'), /between 12 and 128/)
  assert.throws(() => validatePortalPassword('alllowercase1234'), /upper-case/)
})

test('portal roles enforce least privilege and supplier users cannot approve client quotes', () => {
  assert.equal(canPortal('VIEWER', 'READ'), true)
  assert.equal(canPortal('VIEWER', 'COMMENT'), false)
  assert.equal(canPortal('MEMBER', 'UPLOAD'), true)
  assert.equal(canPortal('MEMBER', 'APPROVE_QUOTE'), false)
  assert.equal(canPortal('MANAGER', 'APPROVE_QUOTE', 'CLIENT'), true)
  assert.equal(canPortal('OWNER', 'APPROVE_QUOTE', 'SUPPLIER'), false)
  assert.equal(canPortal('OWNER', 'MANAGE_TENANT'), true)
})

test('email and document validation reject ambiguous or unsafe input', () => {
  assert.equal(normalizePortalEmail(' Client@Example.CA '), 'client@example.ca')
  assert.throws(() => normalizePortalEmail('invalid'), /valid email/)
  assert.deepEqual(validatePortalUpload({ name: '../plan.pdf', contentType: 'application/pdf', sizeBytes: 1200 }), {
    name: '..-plan.pdf', contentType: 'application/pdf', sizeBytes: 1200,
  })
  assert.throws(() => validatePortalUpload({ name: 'payload.svg', contentType: 'image/svg+xml', sizeBytes: 10 }), /Unsupported/)
  assert.throws(() => validatePortalUpload({ name: 'huge.pdf', contentType: 'application/pdf', sizeBytes: PORTAL_MAX_UPLOAD_BYTES + 1 }), /size/)
})

test('verification/reset tokens are one-time and sessions require active accounts', () => {
  const future = new Date(Date.now() + 60_000)
  assert.equal(isUsablePortalToken({ kind: 'EMAIL_VERIFICATION', expiresAt: future, usedAt: null }, 'EMAIL_VERIFICATION'), true)
  assert.equal(isUsablePortalToken({ kind: 'EMAIL_VERIFICATION', expiresAt: future, usedAt: new Date() }, 'EMAIL_VERIFICATION'), false)
  assert.equal(isActivePortalSession({ expiresAt: future, revokedAt: null, user: { status: 'ACTIVE' } }), true)
  assert.equal(isActivePortalSession({ expiresAt: future, revokedAt: null, user: { status: 'SUSPENDED' } }), false)
})

test('tenant scopes cannot be overridden by request payloads', () => {
  assert.deepEqual(tenantScope('tenant-a', 'project-1'), { tenantId: 'tenant-a', id: 'project-1' })
  assert.throws(() => tenantScope('', 'project-1'), /required/)
  assert.deepEqual(validatePortalCommentInput({ tenantId: 'tenant-b', projectId: 'project-1', body: 'Hello' }), {
    projectId: 'project-1', quotationId: null, body: 'Hello',
  })
  assert.deepEqual(validateQuoteDecision({ decision: 'approved', comment: 'Accepted' }), { decision: 'APPROVED', comment: 'Accepted' })
  assert.throws(() => validateQuoteDecision({ decision: 'draft' }), /approved or rejected/)
})
