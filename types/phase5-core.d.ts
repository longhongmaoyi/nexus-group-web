declare module '@/lib/phase5-core.mjs' {
  export const PHASE5_ORGANIZATION_KEY: 'nexus'
  export const COMPLIANCE_CATEGORIES: readonly string[]
  export const PARTNER_CATEGORIES: readonly string[]
  export const COMPLIANCE_STATUSES: readonly string[]
  export const PARTNER_STATUSES: readonly string[]
  export const TASK_STATUSES: readonly string[]
  export const PRIORITIES: readonly string[]
  export const LEAD_STAGES: readonly string[]
  export const PROJECT_STAGES: readonly string[]
  export function isPhase5AdminEnabled(env?: Record<string, string | undefined>): boolean
  export function isPhase5PublicComplianceEnabled(env?: Record<string, string | undefined>): boolean
  export function isPhase5AIReviewEnabled(env?: Record<string, string | undefined>): boolean
  export function validatePhase5Input(raw?: Record<string, unknown>): Record<string, unknown>
  export function validatePublicCompliance(record: Record<string, unknown> | null | undefined): boolean
  export function getDocumentReviewProvider(env?: Record<string, string | undefined>): { enabled: boolean; provider: string; requiresHumanReview: boolean }
}
