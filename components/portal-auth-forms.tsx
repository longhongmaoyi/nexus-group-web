'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { KeyRound, Loader2, MailCheck, ShieldCheck } from 'lucide-react'

import type { Locale } from '@/lib/i18n'
import { portalCopy } from '@/lib/portal-copy'

async function post(url: string, body: Record<string, unknown>) {
  const response = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
  const result = await response.json()
  if (!response.ok) throw new Error(result.error || 'Request failed')
  return result
}

export function PortalLoginForm({ locale }: { locale: Locale }) {
  const c = portalCopy(locale)
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('')
    const form = new FormData(event.currentTarget)
    try {
      await post('/api/portal/auth/login', { email: form.get('email'), password: form.get('password') })
      router.push(`/${locale}/portal`); router.refresh()
    } catch (value) { setError(value instanceof Error ? value.message : c.error) } finally { setBusy(false) }
  }

  return <AuthShell title={c.signIn} subtitle={c.portal} icon={<ShieldCheck className="h-6 w-6" />}>
    <form onSubmit={submit} className="space-y-4">
      <Field label={c.email}><input name="email" type="email" autoComplete="email" required className="portal-input" /></Field>
      <Field label={c.password}><input name="password" type="password" autoComplete="current-password" required className="portal-input" /></Field>
      {error && <Message error>{error}</Message>}
      <button disabled={busy} className="portal-primary w-full">{busy && <Loader2 className="h-4 w-4 animate-spin" />}{c.signIn}</button>
      <Link href={`/${locale}/portal/reset`} className="block text-center text-sm font-semibold text-forest hover:underline">{c.forgot}</Link>
    </form>
  </AuthShell>
}

export function PortalResetForm({ locale, token }: { locale: Locale; token?: string }) {
  const c = portalCopy(locale)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState('')
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('')
    const form = new FormData(event.currentTarget)
    try {
      if (token) {
        await post('/api/portal/auth/reset', { token, password: form.get('password') })
        setDone(c.resetDone)
      } else {
        await post('/api/portal/auth/request-reset', { email: form.get('email') })
        setDone(c.genericReset)
      }
    } catch (value) { setError(value instanceof Error ? value.message : c.error) } finally { setBusy(false) }
  }

  return <AuthShell title={token ? c.reset : c.forgot} subtitle={c.portal} icon={<KeyRound className="h-6 w-6" />}>
    <form onSubmit={submit} className="space-y-4">
      {token ? <><Field label={c.password}><input name="password" type="password" autoComplete="new-password" required minLength={12} maxLength={128} className="portal-input" /></Field><p className="text-xs leading-5 text-slate-500">{c.passwordRules}</p></> : <Field label={c.email}><input name="email" type="email" autoComplete="email" required className="portal-input" /></Field>}
      {error && <Message error>{error}</Message>}{done && <Message>{done}</Message>}
      {!done && <button disabled={busy} className="portal-primary w-full">{busy && <Loader2 className="h-4 w-4 animate-spin" />}{token ? c.reset : c.requestLink}</button>}
      <Link href={`/${locale}/portal/login`} className="block text-center text-sm font-semibold text-forest hover:underline">{c.backToSignIn}</Link>
    </form>
  </AuthShell>
}

export function PortalVerifyForm({ locale, token }: { locale: Locale; token: string }) {
  const c = portalCopy(locale)
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle')
  const [error, setError] = useState('')
  async function verify() {
    setState('busy'); setError('')
    try { await post('/api/portal/auth/verify', { token }); setState('done') } catch (value) { setError(value instanceof Error ? value.message : c.error); setState('idle') }
  }
  return <AuthShell title={c.verify} subtitle={c.portal} icon={<MailCheck className="h-6 w-6" />}>
    <div className="space-y-4">
      {error && <Message error>{error}</Message>}{state === 'done' && <Message>{c.verified}</Message>}
      {state !== 'done' && <button onClick={verify} disabled={state === 'busy' || !token} className="portal-primary w-full">{state === 'busy' && <Loader2 className="h-4 w-4 animate-spin" />}{c.verify}</button>}
      <Link href={`/${locale}/portal/login`} className="block text-center text-sm font-semibold text-forest hover:underline">{c.backToSignIn}</Link>
    </div>
  </AuthShell>
}

function AuthShell({ title, subtitle, icon, children }: { title: string; subtitle: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e5efe9,transparent_38%),#f8faf9] px-5 pb-20 pt-44 text-ink sm:px-8">
    <section className="mx-auto max-w-md rounded-[2rem] border border-white/80 bg-white p-7 shadow-[0_24px_80px_rgba(11,37,40,.12)] sm:p-9">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-white">{icon}</div>
      <p className="eyebrow mt-7">{subtitle}</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
      <div className="mt-7">{children}</div>
    </section>
  </main>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-sm font-bold text-slate-700"><span className="mb-2 block">{label}</span>{children}</label> }
function Message({ children, error = false }: { children: React.ReactNode; error?: boolean }) { return <p role="status" className={`rounded-2xl px-4 py-3 text-sm ${error ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'}`}>{children}</p> }
