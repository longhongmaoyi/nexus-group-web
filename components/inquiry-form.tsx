'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react'

import type { Locale } from '@/lib/i18n'

const copies = {
  en: {
    eyebrow: 'NEXUS LIFE GROUP',
    title: 'Start a conversation',
    intro: 'A few simple details will help us understand the place and feeling you hope to create.',
    about: 'About you',
    idea: 'Your idea',
    helpful: 'Helpful details (optional)',
    name: 'Your name', email: 'Email address', phone: 'Phone / WhatsApp (optional)', company: 'Organization (optional)',
    type: 'What would you like to create?', typePlaceholder: 'Choose one', location: 'Where would it be? (city, province)',
    details: 'Tell us a little about your idea', capacity: 'Estimated size or number of people', site: 'Do you have a site?', budget: 'Budget range', timeline: 'When would you like it?',
    consent: 'I agree that NEXUS may use this information to respond to my inquiry.', submit: 'Send your message',
    success: 'Thank you. We have received your message and will be in touch.', error: 'Your message could not be saved. Please try again shortly.',
  },
  zh: {
    eyebrow: 'NEXUS LIFE GROUP',
    title: '开始沟通',
    intro: '提供几个简单信息，帮助我们了解您希望创造的空间和感受。',
    about: '关于您',
    idea: '您的想法',
    helpful: '更多信息（可选）',
    name: '您的姓名', email: '邮箱地址', phone: '电话 / WhatsApp（可选）', company: '机构名称（可选）',
    type: '您想创造怎样的空间？', typePlaceholder: '请选择', location: '计划地点（城市、省份）',
    details: '简单告诉我们您的想法', capacity: '预计面积或人数', site: '您是否已有场地？', budget: '预算范围', timeline: '希望何时实现？',
    consent: '我同意 NEXUS 使用这些信息回复我的咨询。', submit: '发送信息',
    success: '感谢您。我们已收到您的信息，并会尽快与您联系。', error: '信息暂时无法保存，请稍后重试。',
  },
  fr: {
    eyebrow: 'NEXUS LIFE GROUP',
    title: 'Entamons la conversation',
    intro: 'Quelques renseignements simples nous aideront à comprendre le lieu et l’ambiance que vous souhaitez créer.',
    about: 'À votre sujet',
    idea: 'Votre idée',
    helpful: 'Renseignements utiles (facultatifs)',
    name: 'Votre nom', email: 'Adresse courriel', phone: 'Téléphone / WhatsApp (facultatif)', company: 'Organisation (facultatif)',
    type: 'Que souhaitez-vous créer?', typePlaceholder: 'Choisir une option', location: 'Où serait-ce? (ville, province)',
    details: 'Parlez-nous un peu de votre idée', capacity: 'Taille ou nombre de personnes estimé', site: 'Avez-vous un site?', budget: 'Fourchette budgétaire', timeline: 'Pour quand le souhaitez-vous?',
    consent: 'J’accepte que NEXUS utilise ces renseignements pour répondre à ma demande.', submit: 'Envoyer votre message',
    success: 'Merci. Nous avons reçu votre message et communiquerons avec vous.', error: 'Votre message ne peut pas être enregistré pour le moment. Veuillez réessayer bientôt.',
  },
}

const options = {
  type: {
    en: ['A home or small living space', 'A cabin or retreat', 'A small community', 'A shared community space', 'I am still exploring'],
    zh: ['住宅或小型生活空间', '小屋或度假空间', '小型社区', '共享社区空间', '我仍在探索中'],
    fr: ['Une maison ou un petit espace de vie', 'Un chalet ou un lieu de retraite', 'Une petite collectivité', 'Un espace communautaire partagé', 'J’explore encore mes options'],
  },
  site: {
    en: ['Not yet', 'I have a location in mind', 'I own or control a site'],
    zh: ['暂时没有', '我已有计划地点', '我拥有或控制场地'],
    fr: ['Pas encore', 'J’ai un emplacement en tête', 'Je possède ou contrôle un site'],
  },
  budget: {
    en: ['Not sure yet', 'Under CAD 250,000', 'CAD 250,000–1 million', 'Over CAD 1 million'],
    zh: ['暂未确定', '低于 25 万加元', '25 万–100 万加元', '超过 100 万加元'],
    fr: ['Pas encore certain', 'Moins de 250 000 CAD', '250 000 à 1 M CAD', 'Plus de 1 M CAD'],
  },
  timeline: {
    en: ['Just exploring', 'Within 6 months', '6–12 months', 'More than 12 months'],
    zh: ['刚开始探索', '6 个月内', '6–12 个月', '超过 12 个月'],
    fr: ['J’explore simplement', 'Dans les 6 mois', '6 à 12 mois', 'Plus de 12 mois'],
  },
}

export function InquiryForm({ locale }: { locale: Locale }) {
  const copy = copies[locale]
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setState('loading')
    const formData = new FormData(form)
    const value = (name: string) => String(formData.get(name) || '').trim()
    const message = [
      `Interested in: ${value('type')}`,
      `Location: ${value('location')}`,
      `Estimated size / people: ${value('capacity')}`,
      `Site: ${value('siteStatus')}`,
      `Budget: ${value('budget')}`,
      `Timing: ${value('timeline')}`,
      '', value('details'),
    ].join('\n')

    const response = await fetch('/api/inquiries', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: value('name'), email: value('email'), phone: value('phone'), company: value('company'), country: value('location'), interest: value('type'), message, locale }),
    })
    setState(response.ok ? 'success' : 'error')
    if (response.ok) form.reset()
  }

  const fieldClass = 'rounded-2xl border border-[#d6e0d3] bg-[#fbfaf6] px-4 py-3.5 text-[#1d352e] outline-none transition focus:border-[#66895e] focus:bg-white'
  const labelClass = 'grid gap-2 text-sm font-semibold text-[#41574c]'
  const Legend = ({ children }: { children: string }) => <legend className="text-xs font-bold uppercase tracking-[0.16em] text-[#66895e]">{children}</legend>

  return <form onSubmit={submit} className="rounded-[2rem] border border-[#d6e0d3] bg-[#fffdf9] p-6 shadow-soft sm:p-8">
    <div className="max-w-2xl"><p className="community-eyebrow">{copy.eyebrow}</p><h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d352e]">{copy.title}</h3><p className="mt-3 text-sm leading-6 text-[#64736c]">{copy.intro}</p></div>
    <fieldset className="mt-8"><Legend>{copy.about}</Legend><div className="mt-4 grid gap-5 sm:grid-cols-2"><label className={labelClass}>{copy.name}<input name="name" required className={fieldClass} /></label><label className={labelClass}>{copy.email}<input name="email" type="email" required className={fieldClass} /></label><label className={labelClass}>{copy.phone}<input name="phone" className={fieldClass} /></label><label className={labelClass}>{copy.company}<input name="company" className={fieldClass} /></label></div></fieldset>
    <fieldset className="mt-8 border-t border-[#e2e9df] pt-8"><Legend>{copy.idea}</Legend><div className="mt-4 grid gap-5 sm:grid-cols-2"><label className={labelClass}>{copy.type}<select name="type" required defaultValue="" className={fieldClass}><option value="" disabled>{copy.typePlaceholder}</option>{options.type[locale].map((item) => <option key={item}>{item}</option>)}</select></label><label className={labelClass}>{copy.location}<input name="location" className={fieldClass} /></label><label className={`${labelClass} sm:col-span-2`}>{copy.details}<textarea name="details" required rows={5} className={fieldClass} /></label><label className={`${labelClass} sm:col-span-2`}>{copy.capacity}<input name="capacity" className={fieldClass} /></label></div></fieldset>
    <fieldset className="mt-8 border-t border-[#e2e9df] pt-8"><Legend>{copy.helpful}</Legend><div className="mt-4 grid gap-5 sm:grid-cols-3"><label className={labelClass}>{copy.site}<select name="siteStatus" defaultValue="" className={fieldClass}><option value="">—</option>{options.site[locale].map((item) => <option key={item}>{item}</option>)}</select></label><label className={labelClass}>{copy.budget}<select name="budget" defaultValue="" className={fieldClass}><option value="">—</option>{options.budget[locale].map((item) => <option key={item}>{item}</option>)}</select></label><label className={labelClass}>{copy.timeline}<select name="timeline" defaultValue="" className={fieldClass}><option value="">—</option>{options.timeline[locale].map((item) => <option key={item}>{item}</option>)}</select></label></div></fieldset>
    <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#64736c]"><input name="consent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-[#b8c9b5]" /><span>{copy.consent}</span></label>
    <button type="submit" disabled={state === 'loading'} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#315b4d] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#24463a] disabled:opacity-60">{state === 'loading' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}{copy.submit}</button>
    {state === 'success' && <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#52735b]"><CheckCircle2 className="h-5 w-5" /> {copy.success}</p>}
    {state === 'error' && <p className="mt-5 text-sm font-semibold text-red-700">{copy.error}</p>}
  </form>
}
