import assert from 'node:assert/strict'
import test from 'node:test'
import {
  calculateLandedCost,
  calculateTimeline,
  createCsrfToken,
  hashCsrfToken,
  safeCsvCell,
  validateLeadSubmission,
  verifyCsrfToken,
} from '../lib/phase3-core.mjs'

test('validates and normalizes a project lead without accepting cross-tenant input', () => {
  const lead = validateLeadSubmission({
    organizationKey: 'attacker',
    type: 'project',
    locale: 'fr',
    contactName: 'Marie Tremblay',
    contactEmail: 'MARIE@example.ca',
    province: 'Quebec',
    sector: 'Education',
    intendedUse: 'Student housing',
    notes: 'A structured project description with enough detail.',
    consent: true,
  })
  assert.equal(lead.contactEmail, 'marie@example.ca')
  assert.equal(lead.type, 'PROJECT')
  assert.equal('organizationKey' in lead, false)
})

test('rejects honeypot spam and missing consent', () => {
  assert.throws(() => validateLeadSubmission({ website: 'spam', consent: true }), /Spam/)
  assert.throws(() => validateLeadSubmission({
    contactName: 'A', contactEmail: 'a@example.ca', notes: 'Details', consent: false,
  }), /Consent/)
})

test('produces reproducible landed-cost lines and range', () => {
  const result = calculateLandedCost(100_000, {
    freightPct: 10, dutyPct: 5, taxPct: 5, inlandTransportPct: 2,
    installationPct: 10, engineeringPct: 5, contingencyPct: 10, marginPct: 0,
  })
  assert.equal(result.total, 147_000)
  assert.equal(result.lines.freight, 10_000)
  assert.equal(result.low, 132_300)
  assert.equal(result.high, 169_050)
})

test('calculates parallel timeline groups using their longest stage', () => {
  const result = calculateTimeline([
    { key: 'a', labelEn: 'A', labelZh: '甲', labelFr: 'A', minWeeks: 2, maxWeeks: 4, parallelGroup: null },
    { key: 'b', labelEn: 'B', labelZh: '乙', labelFr: 'B', minWeeks: 3, maxWeeks: 7, parallelGroup: 'x' },
    { key: 'c', labelEn: 'C', labelZh: '丙', labelFr: 'C', minWeeks: 5, maxWeeks: 6, parallelGroup: 'x' },
  ], 20)
  assert.equal(result.baseMinWeeks, 7)
  assert.equal(result.baseMaxWeeks, 11)
  assert.equal(result.highWeeks, 14)
})

test('signs time-limited CSRF tokens and binds them to the cookie hash', () => {
  const secret = 'x'.repeat(48)
  const token = createCsrfToken(secret, 1_000_000, 'fixed-nonce')
  assert.equal(verifyCsrfToken(token, hashCsrfToken(token), secret, 1_010_000), true)
  assert.equal(verifyCsrfToken(token, hashCsrfToken(`${token}x`), secret, 1_010_000), false)
  assert.equal(verifyCsrfToken(token, hashCsrfToken(token), secret, 3_000_000), false)
})

test('protects CSV exports from spreadsheet formula injection', () => {
  assert.equal(safeCsvCell('=HYPERLINK("bad")'), '"\'=HYPERLINK(""bad"")"')
  assert.equal(safeCsvCell('normal'), '"normal"')
})
