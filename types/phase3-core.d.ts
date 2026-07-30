declare module '@/lib/phase3-core.mjs' {
  export const NEXUS_ORGANIZATION_KEY: 'nexus'
  export const PHASE3_LOCALES: readonly ['en', 'zh', 'fr']
  export const LEAD_TYPES: readonly string[]
  export const LEAD_STATUSES: readonly string[]
  export const LEAD_PRIORITIES: readonly string[]
  export type LeadSubmission = {
    type: 'GENERAL' | 'PROJECT' | 'SUPPLIER' | 'PARTNER' | 'COMPLIANCE'
    locale: 'en' | 'zh' | 'fr'
    contactName: string
    contactEmail: string
    contactPhone: string | null
    organizationName: string | null
    country: string | null
    province: string | null
    municipality: string | null
    sector: string | null
    projectType: string | null
    intendedUse: string | null
    sizeCapacity: string | null
    budgetRange: string | null
    targetTimeline: string | null
    siteReadiness: string | null
    complianceNeeds: string | null
    notes: string
    consent: true
    consentTextVersion: string
  }
  export function validateLeadSubmission(input: unknown): LeadSubmission
  export function validateLeadUpdate(input: unknown): { status: string; priority: string; ownerAdminId: string | null; note: string | null }
  export type CostAssumptions = {
    freightPct: number
    dutyPct: number
    taxPct: number
    inlandTransportPct: number
    installationPct: number
    engineeringPct: number
    contingencyPct: number
    marginPct: number
  }
  export function normalizeCostAssumptions(input: unknown): CostAssumptions
  export function calculateLandedCost(baseCost: unknown, assumptions: unknown): {
    lines: Record<string, number>
    total: number
    low: number
    high: number
  }
  export type TimelineStage = {
    key: string
    labelEn: string
    labelZh: string
    labelFr: string
    minWeeks: number
    maxWeeks: number
    parallelGroup: string | null
  }
  export function normalizeTimelineStages(input: unknown): TimelineStage[]
  export function calculateTimeline(stages: unknown, uncertaintyPct?: unknown): {
    stages: TimelineStage[]
    baseMinWeeks: number
    baseMaxWeeks: number
    lowWeeks: number
    highWeeks: number
    uncertaintyPct: number
  }
  export function createReference(prefix: string, now?: Date, random?: string): string
  export function createCsrfToken(secret: string, now?: number, nonce?: string): string
  export function verifyCsrfToken(token: string, cookieHash: string, secret: string, now?: number, maxAgeMs?: number): boolean
  export function hashCsrfToken(token: string): string
  export function safeCsvCell(value: unknown): string
  export function isPhase3PublicEnabled(env?: Record<string, string | undefined>): boolean
  export function isPhase3AdminEnabled(env?: Record<string, string | undefined>): boolean
}
