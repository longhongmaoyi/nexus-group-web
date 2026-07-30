declare module '@/lib/phase3-calculations.mjs' {
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
  export type TimelineStage = {
    key: string
    labelEn: string
    labelZh: string
    labelFr: string
    minWeeks: number
    maxWeeks: number
    parallelGroup: string | null
  }
  export function normalizeCostAssumptions(input: unknown): CostAssumptions
  export function calculateLandedCost(baseCost: unknown, assumptions: unknown): { lines: Record<string, number>; total: number; low: number; high: number }
  export function normalizeTimelineStages(input: unknown): TimelineStage[]
  export function calculateTimeline(stages: unknown, uncertaintyPct?: unknown): { stages: TimelineStage[]; baseMinWeeks: number; baseMaxWeeks: number; lowWeeks: number; highWeeks: number; uncertaintyPct: number }
}
