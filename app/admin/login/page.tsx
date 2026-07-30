'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BrandMark } from '@/components/brand-mark'

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const data = new FormData(event.currentTarget)
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: data.get('email'), password: data.get('password') }),
    })
    setBusy(false)
    if (!response.ok) {
      setError(response.status === 429 ? 'Too many attempts. Please wait and try again.' : 'Invalid email or password.')
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl sm:p-9">
        <div className="rounded-2xl border border-slate-200 p-3"><BrandMark href="/en" /></div>
        <p className="eyebrow mt-8">SECURE ADMIN</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Website Builder</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Authorised NEXUS editors only.</p>
        <form onSubmit={submit} className="mt-7 space-y-5">
          <label className="block text-sm font-bold">
            Email
            <input name="email" type="email" autoComplete="username" required className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-forest" />
          </label>
          <label className="block text-sm font-bold">
            Password
            <input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-forest" />
          </label>
          {error && <p role="alert" className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-800">{error}</p>}
          <button disabled={busy} className="w-full rounded-full bg-ink px-5 py-3.5 text-sm font-bold text-white disabled:opacity-60">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  )
}
