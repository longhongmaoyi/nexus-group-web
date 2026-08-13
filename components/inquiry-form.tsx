'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react'

import type { Locale } from '@/lib/i18n'
import { CONSENT_TEXT_VERSION, consentCopy } from '@/lib/legal-content'

const copies = {
  en: {
    title: 'Tell us about your project',
    intro: 'Share what you know so far. We use it to understand the site, the business need and what needs checking next.',
    organization: '1. Your details',
    project: '2. Project & location',
    commercial: '3. Budget, timing and scope',
    name: 'Your name',
    email: 'Business email',
    phone: 'Phone / WhatsApp',
    company: 'Organization',
    sector: 'Industry or project type',
    sectorPlaceholder: 'Select a sector',
    province: 'Province or territory',
    municipality: 'Municipality / nearest city',
    use: 'Intended use',
    capacity: 'Approximate size or required capacity',
    site: 'Site status',
    budget: 'Planning budget',
    timeline: 'Target delivery timeline',
    model: 'Preferred commercial model',
    details: 'Describe the business problem, site and required outcome',
    consent: consentCopy.en,
    submit: 'Send project details',
    success: 'Thanks. We received your project details.',
    error: 'We could not send your details. Please try again or contact us directly.',
  },
  zh: {
    title: '告诉我们您的项目情况',
    intro: '请提供您目前掌握的信息。我们会据此了解场地、业务需求及下一步需要核实的事项。',
    organization: '1. 您的联系信息',
    project: '2. 项目与地点',
    commercial: '3. 预算、时间与范围',
    name: '您的姓名',
    email: '商务邮箱',
    phone: '电话 / WhatsApp',
    company: '机构名称',
    sector: '行业或项目类型',
    sectorPlaceholder: '选择行业',
    province: '省或地区',
    municipality: '市镇 / 最近城市',
    use: '预期用途',
    capacity: '预计规模或所需容量',
    site: '场地状态',
    budget: '规划预算',
    timeline: '目标交付时间',
    model: '首选合作模式',
    details: '请描述业务问题、场地情况及预期成果',
    consent: consentCopy.zh,
    submit: '发送项目资料',
    success: '感谢您，我们已收到项目资料。',
    error: '暂时无法发送资料，请重试或直接联系我们。',
  },
  fr: {
    title: 'Parlez-nous de votre projet',
    intro: 'Partagez ce que vous savez déjà. Cela nous aide à comprendre le site, le besoin et les points à vérifier.',
    organization: '1. Vos coordonnées',
    project: '2. Projet et emplacement',
    commercial: '3. Budget, calendrier et portée',
    name: 'Votre nom',
    email: 'Courriel professionnel',
    phone: 'Téléphone / WhatsApp',
    company: 'Organisation',
    sector: 'Secteur ou type de projet',
    sectorPlaceholder: 'Choisir un secteur',
    province: 'Province ou territoire',
    municipality: 'Municipalité / ville la plus proche',
    use: 'Usage prévu',
    capacity: 'Taille ou capacité approximative',
    site: 'État du site',
    budget: 'Budget de planification',
    timeline: 'Échéancier de livraison visé',
    model: 'Modèle commercial privilégié',
    details: 'Décrivez le problème, le site et le résultat recherché',
    consent: consentCopy.fr,
    submit: 'Envoyer les détails du projet',
    success: 'Merci. Nous avons reçu les détails de votre projet.',
    error: 'Nous n’avons pas pu envoyer vos renseignements. Réessayez ou contactez-nous directement.',
  },
}

const options = {
  sectors: {
    en: ['Mining & remote operations', 'Construction', 'Education & student housing', 'Residential development', 'Commercial & hospitality', 'Public & community', 'IT & digital transformation', 'Global sourcing & market entry'],
    zh: ['采矿与偏远运营', '建筑施工', '教育与学生住宿', '住宅开发', '商业与酒店旅游', '公共与社区', 'IT 与数字化转型', '全球采购与市场进入'],
    fr: ['Mines et opérations éloignées', 'Construction', 'Éducation et logement étudiant', 'Développement résidentiel', 'Commerce et hôtellerie', 'Public et communautaire', 'TI et transformation numérique', 'Approvisionnement mondial et entrée sur le marché'],
  },
  site: {
    en: ['Site not selected', 'Site identified', 'Site controlled or owned', 'Existing operating site'],
    zh: ['尚未选择场地', '已确定场地', '场地已控制或拥有', '现有运营场地'],
    fr: ['Site non sélectionné', 'Site identifié', 'Site contrôlé ou détenu', 'Site déjà en exploitation'],
  },
  budget: {
    en: ['Under CAD 250,000', 'CAD 250,000–1 million', 'CAD 1–5 million', 'CAD 5–20 million', 'Over CAD 20 million', 'To be determined'],
    zh: ['低于 25 万加元', '25 万–100 万加元', '100 万–500 万加元', '500 万–2000 万加元', '超过 2000 万加元', '待确定'],
    fr: ['Moins de 250 000 CAD', '250 000 à 1 M CAD', '1 à 5 M CAD', '5 à 20 M CAD', 'Plus de 20 M CAD', 'À déterminer'],
  },
  timeline: {
    en: ['Within 6 months', '6–12 months', '12–24 months', 'More than 24 months', 'Exploratory'],
    zh: ['6 个月内', '6–12 个月', '12–24 个月', '超过 24 个月', '探索阶段'],
    fr: ['Dans les 6 mois', '6 à 12 mois', '12 à 24 mois', 'Plus de 24 mois', 'Exploratoire'],
  },
  model: {
    en: ['Turnkey coordination', 'Product supply + Canadian integration', 'Joint venture / partnership', 'Technology or IT services', 'Not sure yet'],
    zh: ['交钥匙协调', '产品供应 + 加拿大本地化集成', '合资 / 合作', '技术或 IT 服务', '尚未确定'],
    fr: ['Coordination clé en main', 'Fourniture + intégration canadienne', 'Coentreprise / partenariat', 'Services technologiques ou TI', 'À déterminer'],
  },
}

const provinces = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
]

export function InquiryForm({ locale }: { locale: Locale }) {
  const copy = copies[locale]
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setState('loading')

    const formData = new FormData(form)
    const value = (name: string) => String(formData.get(name) || '').trim()

    const projectBrief = [
      `Sector: ${value('sector')}`,
      `Province / territory: ${value('province')}`,
      `Municipality: ${value('municipality')}`,
      `Intended use: ${value('use')}`,
      `Size / capacity: ${value('capacity')}`,
      `Site status: ${value('siteStatus')}`,
      `Budget: ${value('budget')}`,
      `Timeline: ${value('timeline')}`,
      `Commercial model: ${value('commercialModel')}`,
      '',
      value('details'),
    ].join('\n')

    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: value('name'),
        email: value('email'),
        phone: value('phone'),
        company: value('company'),
        country: [value('municipality'), value('province'), 'Canada'].filter(Boolean).join(', '),
        interest: value('sector'),
        message: projectBrief,
        locale,
        consent: formData.get('consent') === 'on',
        consentTextVersion: CONSENT_TEXT_VERSION,
      }),
    })

    setState(response.ok ? 'success' : 'error')
    if (response.ok) form.reset()
  }

  const fieldClass = 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
  const labelClass = 'grid gap-2 text-sm font-semibold text-slate-700'

  return (
    <form onSubmit={submit} className="rounded-4xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="max-w-2xl">
        <p className="eyebrow">{locale === 'zh' ? '项目咨询' : locale === 'fr' ? 'DEMANDE DE PROJET' : 'PROJECT INQUIRY'}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{copy.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{copy.intro}</p>
      </div>

      <fieldset className="mt-8">
        <legend className="text-sm font-black uppercase tracking-[0.14em] text-ink">{copy.organization}</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>{copy.name}<input name="name" required className={fieldClass} /></label>
          <label className={labelClass}>{copy.email}<input name="email" type="email" required className={fieldClass} /></label>
          <label className={labelClass}>{copy.phone}<input name="phone" className={fieldClass} /></label>
          <label className={labelClass}>{copy.company}<input name="company" required className={fieldClass} /></label>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-slate-200 pt-8">
        <legend className="text-sm font-black uppercase tracking-[0.14em] text-ink">{copy.project}</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            {copy.sector}
            <select name="sector" required defaultValue="" className={fieldClass}>
              <option value="" disabled>{copy.sectorPlaceholder}</option>
              {options.sectors[locale].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className={labelClass}>
            {copy.province}
            <select name="province" required defaultValue="" className={fieldClass}>
              <option value="" disabled>—</option>
              {provinces.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className={labelClass}>{copy.municipality}<input name="municipality" required className={fieldClass} /></label>
          <label className={labelClass}>{copy.use}<input name="use" required className={fieldClass} /></label>
          <label className={`${labelClass} sm:col-span-2`}>{copy.capacity}<input name="capacity" className={fieldClass} /></label>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-slate-200 pt-8">
        <legend className="text-sm font-black uppercase tracking-[0.14em] text-ink">{copy.commercial}</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>{copy.site}<select name="siteStatus" defaultValue="" className={fieldClass}><option value="">—</option>{options.site[locale].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className={labelClass}>{copy.budget}<select name="budget" defaultValue="" className={fieldClass}><option value="">—</option>{options.budget[locale].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className={labelClass}>{copy.timeline}<select name="timeline" defaultValue="" className={fieldClass}><option value="">—</option>{options.timeline[locale].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className={labelClass}>{copy.model}<select name="commercialModel" defaultValue="" className={fieldClass}><option value="">—</option>{options.model[locale].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className={`${labelClass} sm:col-span-2`}>{copy.details}<textarea name="details" required rows={6} className={fieldClass} /></label>
        </div>
      </fieldset>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-600">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300" />
        <span>{copy.consent} <a href={`/${locale}/privacy`} target="_blank" rel="noreferrer" className="font-semibold underline">{locale === 'zh' ? '查看隐私说明' : locale === 'fr' ? 'Lire l’avis de confidentialité' : 'Read the Privacy Notice'}</a>.</span>
      </label>

      <button type="submit" disabled={state === 'loading'} className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark disabled:opacity-60">
        {state === 'loading' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} {copy.submit}
      </button>

      {state === 'success' && <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-forest"><CheckCircle2 className="h-5 w-5" /> {copy.success}</p>}
      {state === 'error' && <p className="mt-5 text-sm font-semibold text-red-700">{copy.error}</p>}
    </form>
  )
}
