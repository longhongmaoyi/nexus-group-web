export const PHASE5_ORGANIZATION_KEY = 'nexus'
export const COMPLIANCE_CATEGORIES = ['BUILDING_CODE', 'ZONING', 'PERMITTING', 'FOUNDATION', 'ENERGY', 'FIRE_SAFETY', 'ACCESSIBILITY', 'UTILITIES', 'TRANSPORT', 'OTHER']
export const PARTNER_CATEGORIES = ['ENGINEERING', 'PERMITTING', 'FOUNDATION', 'INSTALLATION', 'SERVICE', 'LOGISTICS', 'OTHER']
export const COMPLIANCE_STATUSES = ['NOT_STARTED', 'IN_PROGRESS', 'READY_FOR_REVIEW', 'VERIFIED', 'BLOCKED', 'NOT_APPLICABLE']
export const PARTNER_STATUSES = ['UNVERIFIED', 'IN_REVIEW', 'VERIFIED', 'SUSPENDED']
export const TASK_STATUSES = ['OPEN', 'IN_PROGRESS', 'BLOCKED', 'DONE', 'CANCELLED']
export const PRIORITIES = ['LOW', 'NORMAL', 'HIGH', 'URGENT']
export const LEAD_STAGES = ['NEW', 'QUALIFYING', 'CONTACTED', 'PROPOSAL', 'WON', 'LOST', 'ARCHIVED']
export const PROJECT_STAGES = ['INTAKE', 'PLANNING', 'QUOTING', 'APPROVAL', 'DELIVERY', 'COMPLETED', 'ON_HOLD']

export const isPhase5AdminEnabled = (env = process.env) => env.PHASE5_ADMIN_ENABLED === 'true'
export const isPhase5PublicComplianceEnabled = (env = process.env) => env.PHASE5_PUBLIC_COMPLIANCE_ENABLED === 'true'
export const isPhase5AIReviewEnabled = (env = process.env) => env.PHASE5_AI_REVIEW_ENABLED === 'true'

const text = (value, max = 500) => String(value ?? '').trim().slice(0, max)
const optional = (value, max = 500) => text(value, max) || null
const choice = (value, allowed, fallback) => allowed.includes(String(value)) ? String(value) : fallback
const date = (value) => {
  if (!value) return null
  const parsed = new Date(String(value))
  if (Number.isNaN(parsed.getTime())) throw new Error('Invalid date')
  return parsed
}
const amount = (value) => {
  if (value === '' || value === null || value === undefined) return null
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 999999999999) throw new Error('Invalid amount')
  return parsed.toFixed(2)
}

export function validatePhase5Input(raw = {}) {
  const action = text(raw.action, 60)
  const id = optional(raw.id, 80)
  if (!action) throw new Error('Action is required')
  if (action.startsWith('update') && !id) throw new Error('Record id is required')
  if (action === 'updateLead') return { action, id, status: choice(raw.status, LEAD_STAGES, 'NEW'), priority: choice(raw.priority, PRIORITIES, 'NORMAL'), ownerAdminId: optional(raw.ownerAdminId, 80), portalProjectId: optional(raw.portalProjectId, 80), nextAction: optional(raw.nextAction, 2000), dueDate: date(raw.dueDate) }
  if (action === 'updateProject') return { action, id, status: choice(raw.status, PROJECT_STAGES, 'INTAKE'), priority: choice(raw.priority, PRIORITIES, 'NORMAL'), ownerAdminId: optional(raw.ownerAdminId, 80), nextAction: optional(raw.nextAction, 2000), dueDate: date(raw.dueDate), budgetAmount: amount(raw.budgetAmount), contractedAmount: amount(raw.contractedAmount), invoicedAmount: amount(raw.invoicedAmount), paidAmount: amount(raw.paidAmount), currency: text(raw.currency || 'CAD', 3).toUpperCase() }
  if (action === 'createCompliance' || action === 'updateCompliance') return { action, id, projectId: optional(raw.projectId, 80), evidenceDocumentId: optional(raw.evidenceDocumentId, 80), responsibleAdminId: optional(raw.responsibleAdminId, 80), jurisdiction: text(raw.jurisdiction, 160), projectUse: text(raw.projectUse, 160), category: choice(raw.category, COMPLIANCE_CATEGORIES, 'OTHER'), requirement: text(raw.requirement, 5000), status: choice(raw.status, COMPLIANCE_STATUSES, 'NOT_STARTED'), responsibleParty: optional(raw.responsibleParty, 300), evidenceUrl: optional(raw.evidenceUrl, 1000), reviewDate: date(raw.reviewDate), publicVisible: raw.publicVisible === true, publicTitleEn: optional(raw.publicTitleEn, 240), publicTitleZh: optional(raw.publicTitleZh, 240), publicTitleFr: optional(raw.publicTitleFr, 240), publicSummaryEn: optional(raw.publicSummaryEn, 3000), publicSummaryZh: optional(raw.publicSummaryZh, 3000), publicSummaryFr: optional(raw.publicSummaryFr, 3000) }
  if (action === 'createPartner' || action === 'updatePartner') return { action, id, name: text(raw.name, 240), category: choice(raw.category, PARTNER_CATEGORIES, 'OTHER'), region: text(raw.region, 240), capabilities: text(raw.capabilities, 4000), verificationStatus: choice(raw.verificationStatus, PARTNER_STATUSES, 'UNVERIFIED'), contactName: optional(raw.contactName, 240), email: optional(raw.email, 320)?.toLowerCase() || null, phone: optional(raw.phone, 80), website: optional(raw.website, 1000), contactVisible: raw.contactVisible === true, active: raw.active !== false, notes: optional(raw.notes, 4000) }
  if (action === 'createTask' || action === 'updateTask') return { action, id, title: text(raw.title, 300), description: optional(raw.description, 4000), status: choice(raw.status, TASK_STATUSES, 'OPEN'), priority: choice(raw.priority, PRIORITIES, 'NORMAL'), dueDate: date(raw.dueDate), leadId: optional(raw.leadId, 80), projectId: optional(raw.projectId, 80), complianceRecordId: optional(raw.complianceRecordId, 80), assigneeAdminId: optional(raw.assigneeAdminId, 80), notify: raw.notify === true }
  throw new Error('Unsupported action')
}

export function validatePublicCompliance(record) {
  return Boolean(record && record.publicVisible && record.jurisdiction && record.projectUse && record.publicTitleEn && record.publicTitleZh && record.publicTitleFr && record.publicSummaryEn && record.publicSummaryZh && record.publicSummaryFr)
}

export function getDocumentReviewProvider(env = process.env) {
  if (!isPhase5AIReviewEnabled(env)) return { enabled: false, provider: 'disabled', requiresHumanReview: true }
  return { enabled: true, provider: env.PHASE5_AI_PROVIDER || 'none-configured', requiresHumanReview: true }
}
