import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import {
  calculateLandedCost,
  calculateTimeline,
  normalizeCostAssumptions,
  normalizeTimelineStages,
} from './phase3-calculations.mjs'

export { calculateLandedCost, calculateTimeline, normalizeCostAssumptions, normalizeTimelineStages }

export const NEXUS_ORGANIZATION_KEY = 'nexus'
export const CONSENT_TEXT_VERSION = '2026-08-03'
export const PHASE3_LOCALES = ['en', 'zh', 'fr']
export const LEAD_TYPES = ['GENERAL', 'PROJECT', 'SUPPLIER', 'PARTNER', 'COMPLIANCE']
export const LEAD_STATUSES = ['NEW', 'QUALIFYING', 'CONTACTED', 'PROPOSAL', 'WON', 'LOST', 'ARCHIVED']
export const LEAD_PRIORITIES = ['LOW', 'NORMAL', 'HIGH', 'URGENT']

const text = (value, maximum = 500) => String(value ?? '').trim().slice(0, maximum)
const required = (value, label, maximum = 500) => {
  const result = text(value, maximum)
  if (!result) throw new Error(`${label} is required.`)
  return result
}
const email = (value) => {
  const result = required(value, 'Email', 254).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) throw new Error('A valid email is required.')
  return result
}
const enumValue = (value, allowed, fallback) => {
  const normalized = text(value, 40).toUpperCase()
  return allowed.includes(normalized) ? normalized : fallback
}

export function validateLeadSubmission(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid submission.')
  const locale = PHASE3_LOCALES.includes(input.locale) ? input.locale : 'en'
  const type = enumValue(input.type, LEAD_TYPES, 'PROJECT')
  const consent = input.consent === true
  if (!consent) throw new Error('Consent is required.')
  if (text(input.website, 200)) throw new Error('Spam rejected.')

  const projectRequired = type === 'PROJECT' || type === 'COMPLIANCE'
  const result = {
    type,
    locale,
    contactName: required(input.contactName, 'Contact name', 120),
    contactEmail: email(input.contactEmail),
    contactPhone: text(input.contactPhone, 60) || null,
    organizationName: text(input.organizationName, 160) || null,
    country: text(input.country, 100) || 'Canada',
    province: text(input.province, 100) || null,
    municipality: text(input.municipality, 120) || null,
    sector: text(input.sector, 120) || null,
    projectType: text(input.projectType, 160) || null,
    intendedUse: text(input.intendedUse, 500) || null,
    sizeCapacity: text(input.sizeCapacity, 160) || null,
    budgetRange: text(input.budgetRange, 100) || null,
    targetTimeline: text(input.targetTimeline, 100) || null,
    siteReadiness: text(input.siteReadiness, 160) || null,
    complianceNeeds: text(input.complianceNeeds, 1500) || null,
    notes: required(input.notes, 'Project or enquiry details', 5000),
    consent,
    consentTextVersion: CONSENT_TEXT_VERSION,
  }
  if (projectRequired) {
    if (!result.province) throw new Error('Province or territory is required.')
    if (!result.sector) throw new Error('Sector is required.')
    if (!result.intendedUse) throw new Error('Intended use is required.')
  }
  return result
}

export function validateLeadUpdate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid update.')
  return {
    status: enumValue(input.status, LEAD_STATUSES, 'NEW'),
    priority: enumValue(input.priority, LEAD_PRIORITIES, 'NORMAL'),
    ownerAdminId: text(input.ownerAdminId, 120) || null,
    note: text(input.note, 5000) || null,
  }
}

export function createReference(prefix, now = new Date(), random = randomBytes(4).toString('hex')) {
  const stamp = now.toISOString().slice(0, 10).replaceAll('-', '')
  return `${prefix}-${stamp}-${random.toUpperCase()}`
}

export function createCsrfToken(secret, now = Date.now(), nonce = randomBytes(18).toString('base64url')) {
  if (!secret || secret.length < 32) throw new Error('CSRF secret is not configured.')
  const payload = `${now}.${nonce}`
  const signature = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

export function verifyCsrfToken(token, cookieHash, secret, now = Date.now(), maxAgeMs = 30 * 60 * 1000) {
  if (!token || !cookieHash || !secret || secret.length < 32) return false
  const pieces = String(token).split('.')
  if (pieces.length !== 3) return false
  const [issuedRaw, nonce, provided] = pieces
  const issued = Number(issuedRaw)
  if (!Number.isFinite(issued) || issued > now + 60_000 || now - issued > maxAgeMs) return false
  const expected = createHmac('sha256', secret).update(`${issuedRaw}.${nonce}`).digest('base64url')
  const expectedBuffer = Buffer.from(expected)
  const providedBuffer = Buffer.from(provided)
  if (expectedBuffer.length !== providedBuffer.length || !timingSafeEqual(expectedBuffer, providedBuffer)) return false
  return hashCsrfToken(token) === cookieHash
}

export function hashCsrfToken(token) {
  return createHash('sha256').update(String(token)).digest('base64url')
}

export function safeCsvCell(value) {
  const string = String(value ?? '').replaceAll('\r', ' ').replaceAll('\n', ' ')
  const protectedValue = /^[=+\-@\t]/.test(string) ? `'${string}` : string
  return `"${protectedValue.replaceAll('"', '""')}"`
}

export function isPhase3PublicEnabled(env = process.env) {
  return env.PHASE3_BUSINESS_TOOLS_ENABLED === 'true'
}

export function isPhase3AdminEnabled(env = process.env) {
  return env.PHASE3_ADMIN_TOOLS_ENABLED === 'true'
}
