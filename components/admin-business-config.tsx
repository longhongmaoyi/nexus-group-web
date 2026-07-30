'use client'

import { useState, type FormEvent } from 'react'
import { LoaderCircle, Save } from 'lucide-react'

type Props = {
  cost: null | { name: string; currency: string; assumptions: unknown; disclaimerEn: string; disclaimerZh: string; disclaimerFr: string; version: number }
  timeline: null | { name: string; stages: unknown; uncertaintyPct: number; disclaimerEn: string; disclaimerZh: string; disclaimerFr: string; version: number }
}

export function AdminBusinessConfig({ cost, timeline }: Props) {
  const [state, setState] = useState('')
  async function save(event: FormEvent<HTMLFormElement>, kind: 'COST' | 'TIMELINE') {
    event.preventDefault()
    setState('Saving...')
    const data = Object.fromEntries(new FormData(event.currentTarget).entries())
    try {
      const body = kind === 'COST'
        ? { ...data, kind, assumptions: JSON.parse(String(data.assumptions)) }
        : { ...data, kind, uncertaintyPct: Number(data.uncertaintyPct), stages: JSON.parse(String(data.stages)) }
      const response = await fetch('/api/admin/business-tools/config', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
      const result = await response.json()
      setState(response.ok ? `${kind} version ${result.version} activated. Reload to view it.` : result.error || 'Save failed.')
    } catch (error) {
      setState(error instanceof Error ? error.message : 'Invalid JSON.')
    }
  }
  const input = 'rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-xs'
  const labels = 'grid gap-2 text-sm font-semibold'
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <form onSubmit={(event) => save(event, 'COST')} className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold">Landed-cost assumptions</h2>
        <p className="mt-2 text-sm text-slate-500">Saving creates a new immutable version. Historical estimates keep their original version.</p>
        <div className="mt-5 grid gap-4">
          <label className={labels}>Version name<input name="name" defaultValue={cost?.name || 'NEXUS planning assumptions'} className={input} /></label>
          <label className={labels}>Currency<input name="currency" defaultValue={cost?.currency || 'CAD'} className={input} /></label>
          <label className={labels}>Assumptions JSON<textarea name="assumptions" rows={12} defaultValue={JSON.stringify(cost?.assumptions || {}, null, 2)} className={input} /></label>
          <DisclaimerFields value={cost} input={input} labels={labels} />
        </div>
        <SaveButton />
      </form>
      <form onSubmit={(event) => save(event, 'TIMELINE')} className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold">Timeline stages</h2>
        <p className="mt-2 text-sm text-slate-500">Parallel stages can share a parallelGroup value. Durations are stored in weeks.</p>
        <div className="mt-5 grid gap-4">
          <label className={labels}>Version name<input name="name" defaultValue={timeline?.name || 'NEXUS planning timeline'} className={input} /></label>
          <label className={labels}>Uncertainty %<input name="uncertaintyPct" type="number" min="0" max="100" defaultValue={timeline?.uncertaintyPct || 20} className={input} /></label>
          <label className={labels}>Stages JSON<textarea name="stages" rows={12} defaultValue={JSON.stringify(timeline?.stages || [], null, 2)} className={input} /></label>
          <DisclaimerFields value={timeline} input={input} labels={labels} />
        </div>
        <SaveButton />
      </form>
      {state && <p className="xl:col-span-2 rounded-2xl bg-blue-50 p-4 text-sm font-semibold text-blue-900">{state}</p>}
    </div>
  )
}

function DisclaimerFields({ value, input, labels }: { value: Props['cost'] | Props['timeline']; input: string; labels: string }) {
  return <>
    <label className={labels}>Disclaimer EN<textarea name="disclaimerEn" rows={3} defaultValue={value?.disclaimerEn || ''} className={input} /></label>
    <label className={labels}>Disclaimer ZH<textarea name="disclaimerZh" rows={3} defaultValue={value?.disclaimerZh || ''} className={input} /></label>
    <label className={labels}>Disclaimer FR<textarea name="disclaimerFr" rows={3} defaultValue={value?.disclaimerFr || ''} className={input} /></label>
  </>
}

function SaveButton() {
  return <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"><Save className="h-4 w-4" />Create and activate version</button>
}
