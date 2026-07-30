const finite = (value, fallback = 0, minimum = 0, maximum = 100_000_000) => {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.min(maximum, Math.max(minimum, number))
}

const required = (value, label, maximum = 500) => {
  const result = String(value ?? '').trim().slice(0, maximum)
  if (!result) throw new Error(`${label} is required.`)
  return result
}

export function normalizeCostAssumptions(input) {
  const value = input && typeof input === 'object' ? input : {}
  return {
    freightPct: finite(value.freightPct, 12, 0, 100),
    dutyPct: finite(value.dutyPct, 6, 0, 100),
    taxPct: finite(value.taxPct, 5, 0, 30),
    inlandTransportPct: finite(value.inlandTransportPct, 4, 0, 100),
    installationPct: finite(value.installationPct, 18, 0, 200),
    engineeringPct: finite(value.engineeringPct, 8, 0, 100),
    contingencyPct: finite(value.contingencyPct, 10, 0, 100),
    marginPct: finite(value.marginPct, 0, 0, 100),
  }
}

export function calculateLandedCost(baseCostInput, assumptionsInput) {
  const baseCost = finite(baseCostInput, 0, 1, 100_000_000)
  if (baseCost <= 0) throw new Error('Base product cost must be greater than zero.')
  const a = normalizeCostAssumptions(assumptionsInput)
  const amount = (pct) => Math.round(baseCost * (pct / 100) * 100) / 100
  const lines = {
    baseCost,
    freight: amount(a.freightPct),
    duties: amount(a.dutyPct),
    taxes: amount(a.taxPct),
    inlandTransport: amount(a.inlandTransportPct),
    installation: amount(a.installationPct),
    engineeringCompliance: amount(a.engineeringPct),
    contingency: amount(a.contingencyPct),
    margin: amount(a.marginPct),
  }
  const total = Math.round(Object.values(lines).reduce((sum, value) => sum + value, 0) * 100) / 100
  return { lines, total, low: Math.round(total * 0.9 * 100) / 100, high: Math.round(total * 1.15 * 100) / 100 }
}

export function normalizeTimelineStages(input) {
  if (!Array.isArray(input)) throw new Error('Timeline stages must be an array.')
  const stages = input.slice(0, 20).map((stage, index) => ({
    key: required(stage?.key || `stage-${index + 1}`, 'Stage key', 60).replace(/[^a-z0-9-]/gi, '-').toLowerCase(),
    labelEn: required(stage?.labelEn, 'English stage label', 120),
    labelZh: required(stage?.labelZh, 'Chinese stage label', 120),
    labelFr: required(stage?.labelFr, 'French stage label', 120),
    minWeeks: Math.round(finite(stage?.minWeeks, 1, 0, 260)),
    maxWeeks: Math.round(finite(stage?.maxWeeks, 2, 0, 260)),
    parallelGroup: String(stage?.parallelGroup ?? '').trim().slice(0, 40) || null,
  }))
  if (stages.length < 1) throw new Error('At least one timeline stage is required.')
  for (const stage of stages) if (stage.maxWeeks < stage.minWeeks) throw new Error(`Maximum duration is below minimum for ${stage.labelEn}.`)
  return stages
}

export function calculateTimeline(stagesInput, uncertaintyPctInput = 20) {
  const stages = normalizeTimelineStages(stagesInput)
  const uncertaintyPct = Math.round(finite(uncertaintyPctInput, 20, 0, 100))
  const groups = new Map()
  let sequentialMin = 0
  let sequentialMax = 0
  for (const stage of stages) {
    if (!stage.parallelGroup) {
      sequentialMin += stage.minWeeks
      sequentialMax += stage.maxWeeks
    } else {
      const current = groups.get(stage.parallelGroup) || { min: 0, max: 0 }
      groups.set(stage.parallelGroup, { min: Math.max(current.min, stage.minWeeks), max: Math.max(current.max, stage.maxWeeks) })
    }
  }
  for (const group of groups.values()) {
    sequentialMin += group.min
    sequentialMax += group.max
  }
  return {
    stages,
    baseMinWeeks: sequentialMin,
    baseMaxWeeks: sequentialMax,
    lowWeeks: Math.max(1, Math.round(sequentialMin * (1 - uncertaintyPct / 200))),
    highWeeks: Math.max(1, Math.ceil(sequentialMax * (1 + uncertaintyPct / 100))),
    uncertaintyPct,
  }
}
