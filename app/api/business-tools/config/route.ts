import { NextResponse } from 'next/server'
import { getActiveAssumptions } from '@/lib/business-tools'
import { isPhase3PublicEnabled } from '@/lib/phase3-core.mjs'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!isPhase3PublicEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  try {
    const { cost, timeline } = await getActiveAssumptions()
    return NextResponse.json({
      cost: cost ? {
        id: cost.id,
        version: cost.version,
        name: cost.name,
        currency: cost.currency,
        assumptions: cost.assumptions,
        disclaimer: { en: cost.disclaimerEn, zh: cost.disclaimerZh, fr: cost.disclaimerFr },
      } : null,
      timeline: timeline ? {
        id: timeline.id,
        version: timeline.version,
        name: timeline.name,
        stages: timeline.stages,
        uncertaintyPct: timeline.uncertaintyPct,
        disclaimer: { en: timeline.disclaimerEn, zh: timeline.disclaimerZh, fr: timeline.disclaimerFr },
      } : null,
    }, { headers: { 'cache-control': 'public, max-age=60, stale-while-revalidate=300' } })
  } catch {
    return NextResponse.json({ error: 'Planning tools are temporarily unavailable.' }, { status: 503 })
  }
}
