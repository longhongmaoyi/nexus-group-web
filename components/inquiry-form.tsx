'use client'

import { useState } from 'react'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import type { Locale } from '@/lib/i18n'

const copies = {
  en: { name: 'Name', email: 'Email', company: 'Company', country: 'Country / Region', interest: 'Project interest', message: 'Tell us about the project', submit: 'Submit Inquiry', success: 'Thank you. Your inquiry has been received.', error: 'The inquiry could not be saved. Please verify the database connection.' },
  zh: { name: '姓名', email: '邮箱', company: '公司', country: '国家 / 地区', interest: '项目兴趣', message: '请介绍您的项目', submit: '提交询价', success: '感谢您，询价已收到。', error: '询价暂时无法保存，请检查数据库连接。' },
  fr: { name: 'Nom', email: 'Courriel', company: 'Entreprise', country: 'Pays / Région', interest: 'Intérêt du projet', message: 'Parlez-nous du projet', submit: 'Envoyer la demande', success: 'Merci. Votre demande a été reçue.', error: 'La demande ne peut pas être enregistrée. Vérifiez la connexion à la base de données.' },
}

export function InquiryForm({ locale }: { locale: Locale }) {
  const copy = copies[locale]
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function submit(formData: FormData) {
    setState('loading')
    const payload = Object.fromEntries(formData.entries())
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, locale }),
    })
    setState(response.ok ? 'success' : 'error')
  }

  return (
    <form action={submit} className="rounded-4xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ['name', copy.name, 'text', true],
          ['email', copy.email, 'email', true],
          ['company', copy.company, 'text', false],
          ['country', copy.country, 'text', false],
          ['interest', copy.interest, 'text', false],
        ].map(([name, label, type, required]) => (
          <label key={String(name)} className="grid gap-2 text-sm font-semibold text-slate-700">
            {label}
            <input name={String(name)} type={String(type)} required={Boolean(required)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-forest focus:bg-white" />
          </label>
        ))}
        <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
          {copy.message}
          <textarea name="message" required rows={5} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-forest focus:bg-white" />
        </label>
      </div>
      <button type="submit" disabled={state === 'loading'} className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-forest disabled:opacity-60">
        {state === 'loading' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} {copy.submit}
      </button>
      {state === 'success' && <p className="mt-4 text-sm font-semibold text-forest">{copy.success}</p>}
      {state === 'error' && <p className="mt-4 text-sm font-semibold text-red-700">{copy.error}</p>}
    </form>
  )
}
