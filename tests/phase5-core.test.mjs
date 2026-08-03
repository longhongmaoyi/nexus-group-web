import test from 'node:test'
import assert from 'node:assert/strict'
import { getDocumentReviewProvider, isPhase5AdminEnabled, validatePhase5Input, validatePublicCompliance } from '../lib/phase5-core.mjs'

test('Phase 5 flags are safe by default', () => {
  assert.equal(isPhase5AdminEnabled({}), false)
  assert.deepEqual(getDocumentReviewProvider({}), { enabled: false, provider: 'disabled', requiresHumanReview: true })
})

test('task input is bounded and normalized', () => {
  const value = validatePhase5Input({ action: 'createTask', title: ' Follow up ', priority: 'URGENT', notify: true })
  assert.equal(value.title, 'Follow up')
  assert.equal(value.priority, 'URGENT')
  assert.equal(value.notify, true)
})

test('negative finance amounts are rejected', () => {
  assert.throws(() => validatePhase5Input({ action: 'updateProject', id: 'p1', budgetAmount: -1 }), /Invalid amount/)
})

test('public compliance requires complete multilingual safe content', () => {
  const record = { publicVisible: true, jurisdiction: 'Ontario', projectUse: 'Residential', publicTitleEn: 'A', publicTitleZh: 'B', publicTitleFr: 'C', publicSummaryEn: 'A', publicSummaryZh: 'B', publicSummaryFr: 'C' }
  assert.equal(validatePublicCompliance(record), true)
  assert.equal(validatePublicCompliance({ ...record, publicSummaryFr: null }), false)
})
