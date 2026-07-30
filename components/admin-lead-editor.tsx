'use client'

import { useState, type FormEvent } from 'react'
import { LoaderCircle, Save } from 'lucide-react'

export function AdminLeadEditor({
  leadId,
  initialStatus,
  initialPriority,
  initialOwnerId,
  admins,
}: {
  leadId: string
  initialStatus: string
  initialPriority: string
  initialOwnerId: string
  admins: Array<{ id: string; email: string; name: string | null }>
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('loading')
    const form = new FormData(event.currentTarget)
    const response = await fetch(`/api/admin/business-tools/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        status: form.get('status'),
        priority: form.get('priority'),
        ownerAdminId: form.get('ownerAdminId'),
        note: form.get('note'),
      }),
    })
    const result = await response.json()
    setMessage(response.ok ? 'Lead updated. Reload to see the complete activity timeline.' : result.error || 'Update failed.')
    setState(response.ok ? 'success' : 'error')
    if (response.ok) (event.currentTarget.elements.namedItem('note') as HTMLTextAreaElement).value = ''
  }
  const field = 'rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm'
  return (
    <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Manage lead</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-semibold">Status<select name="status" defaultValue={initialStatus} className={field}>{['NEW', 'QUALIFYING', 'CONTACTED', 'PROPOSAL', 'WON', 'LOST', 'ARCHIVED'].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-semibold">Priority<select name="priority" defaultValue={initialPriority} className={field}>{['LOW', 'NORMAL', 'HIGH', 'URGENT'].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-semibold">Owner<select name="ownerAdminId" defaultValue={initialOwnerId} className={field}><option value="">Unassigned</option>{admins.map((admin) => <option value={admin.id} key={admin.id}>{admin.name || admin.email}</option>)}</select></label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-semibold">Internal note<textarea name="note" rows={4} className={field} placeholder="Add context, next action or call note..." /></label>
      <button disabled={state === 'loading'} className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">{state === 'loading' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Save update</button>
      {message && <p className={`mt-4 text-sm font-semibold ${state === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>{message}</p>}
    </form>
  )
}
