import { createHash, randomBytes } from 'node:crypto'

const ROLE_CAPABILITIES = {
  VIEWER: new Set(['READ']),
  MEMBER: new Set(['READ', 'COMMENT', 'UPLOAD']),
  MANAGER: new Set(['READ', 'COMMENT', 'UPLOAD', 'APPROVE_QUOTE', 'MANAGE_MEMBERS']),
  OWNER: new Set(['READ', 'COMMENT', 'UPLOAD', 'APPROVE_QUOTE', 'MANAGE_MEMBERS', 'MANAGE_TENANT']),
}

const UPLOAD_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
])

export const PORTAL_MAX_UPLOAD_BYTES = 25 * 1024 * 1024

export function normalizePortalEmail(value) {
  const email = String(value || '').trim().toLowerCase()
  if (email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('A valid email address is required.')
  }
  return email
}

export function validatePortalPassword(value) {
  const password = String(value || '')
  if (password.length < 12 || password.length > 128) {
    throw new Error('Password must contain between 12 and 128 characters.')
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    throw new Error('Password must include upper-case, lower-case and numeric characters.')
  }
  return password
}

export function createOpaqueToken() {
  return randomBytes(32).toString('base64url')
}

export function hashOpaqueToken(token) {
  const value = String(token || '')
  if (!value) throw new Error('Token is required')
  return createHash('sha256').update(value).digest('hex')
}

export function canPortal(role, action, tenantType = 'CLIENT') {
  if (!ROLE_CAPABILITIES[role]?.has(action)) return false
  if (action === 'APPROVE_QUOTE' && tenantType !== 'CLIENT') return false
  return true
}

export function validatePortalUpload({ name, contentType, sizeBytes }) {
  const safeName = String(name || '').trim().replace(/[\u0000-\u001f/\\]+/g, '-').slice(0, 180)
  const type = String(contentType || '').toLowerCase()
  const size = Number(sizeBytes)
  if (!safeName) throw new Error('A document name is required.')
  if (!UPLOAD_TYPES.has(type)) throw new Error('Unsupported document type.')
  if (!Number.isInteger(size) || size < 1 || size > PORTAL_MAX_UPLOAD_BYTES) {
    throw new Error('Document size is outside the allowed range.')
  }
  return { name: safeName, contentType: type, sizeBytes: size }
}

export function isUsablePortalToken(record, expectedKind, now = Date.now()) {
  return Boolean(record)
    && record.kind === expectedKind
    && !record.usedAt
    && new Date(record.expiresAt).getTime() > now
}

export function isActivePortalSession(record, now = Date.now()) {
  return Boolean(record)
    && !record.revokedAt
    && new Date(record.expiresAt).getTime() > now
    && record.user?.status === 'ACTIVE'
}
