'use client'

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, Clock3, LoaderCircle, ShieldCheck } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { CONSENT_TEXT_VERSION, consentCopy, planningDisclaimer } from '@/lib/legal-content'
import { calculateLandedCost, calculateTimeline, type CostAssumptions, type TimelineStage } from '@/lib/phase3-calculations.mjs'

type PlanningConfig = {
  cost: null | { currency: string; assumptions: CostAssumptions; disclaimer: Record<Locale, string> }
  timeline: null | { stages: TimelineStage[]; uncertaintyPct: number; disclaimer: Record<Locale, string> }
}

const copy = {
  en: {
    eyebrow: 'PROJECT INQUIRY', title: 'Tell us what you are planning.',
    intro: 'Four short steps help us understand the need, location, budget and people involved.',
    steps: ['Need', 'Location & scale', 'Planning', 'Contact'], type: 'Enquiry type', sector: 'Sector',
    projectType: 'Project or solution type', use: 'Intended use', country: 'Country', province: 'Province or territory',
    municipality: 'Municipality / nearest city', size: 'Size, capacity or number of users', site: 'Site readiness',
    budget: 'Budget range', timeline: 'Target timeline', compliance: 'Known approval or compliance needs',
    base: 'Known base product budget (optional, CAD)', notes: 'Business problem, requirements and notes',
    name: 'Contact name', email: 'Business email', phone: 'Phone / WhatsApp', organization: 'Organization',
    consent: consentCopy.en,
    previous: 'Previous', next: 'Continue', submit: 'Send project details', success: 'Project details received',
    reference: 'Your reference is', error: 'We could not send your details. Please try again or contact us directly.', estimate: 'Indicative landed-cost range',
    duration: 'Indicative project duration', indicative: 'Planning estimate only - not a quotation, permit, certification or approval.',
  },
  zh: {
    eyebrow: '项目咨询', title: '告诉我们您正在规划什么。',
    intro: '四个简短步骤帮助我们了解需求、地点、预算及相关人员。',
    steps: ['需求', '地点与规模', '规划', '联系人'], type: '咨询类型', sector: '行业',
    projectType: '项目或解决方案类型', use: '预期用途', country: '国家', province: '省或地区',
    municipality: '市镇 / 最近城市', size: '规模、容量或使用人数', site: '场地准备状态',
    budget: '预算范围', timeline: '目标时间', compliance: '已知审批或合规需求',
    base: '已知产品基础预算（可选，加元）', notes: '业务问题、需求与备注',
    name: '联系人姓名', email: '商务邮箱', phone: '电话 / WhatsApp', organization: '机构名称',
    consent: consentCopy.zh,
    previous: '上一步', next: '继续', submit: '发送项目资料', success: '项目资料已收到',
    reference: '您的参考编号为', error: '暂时无法发送资料，请重试或直接联系我们。', estimate: '参考落地成本范围',
    duration: '参考项目工期', indicative: '仅用于规划 - 不构成报价、许可、认证或批准。',
  },
  fr: {
    eyebrow: 'DEMANDE DE PROJET', title: 'Parlez-nous de ce que vous planifiez.',
    intro: 'Quatre étapes nous aident à comprendre le besoin, le lieu, le budget et les personnes concernées.',
    steps: ['Besoin', 'Lieu et échelle', 'Planification', 'Contact'], type: 'Type de demande', sector: 'Secteur',
    projectType: 'Type de projet ou solution', use: 'Usage prévu', country: 'Pays', province: 'Province ou territoire',
    municipality: 'Municipalité / ville la plus proche', size: 'Taille, capacité ou nombre d’utilisateurs', site: 'État du site',
    budget: 'Fourchette budgétaire', timeline: 'Échéancier cible', compliance: 'Besoins connus en approbation ou conformité',
    base: 'Budget de base connu (facultatif, CAD)', notes: 'Problème d’affaires, exigences et notes',
    name: 'Nom du contact', email: 'Courriel professionnel', phone: 'Téléphone / WhatsApp', organization: 'Organisation',
    consent: consentCopy.fr,
    previous: 'Précédent', next: 'Continuer', submit: 'Envoyer les détails du projet', success: 'Détails du projet reçus',
    reference: 'Votre référence est', error: 'Nous n’avons pas pu envoyer vos renseignements. Réessayez ou contactez-nous directement.', estimate: 'Fourchette indicative du coût rendu',
    duration: 'Durée indicative du projet', indicative: 'Estimation seulement - ni devis, permis, certification ou approbation.',
  },
}

const enquiryTypes: Record<Locale, string[]> = {
  en: ['Project enquiry', 'General question', 'Supplier application', 'Local partner enquiry', 'Compliance question'],
  zh: ['项目咨询', '一般问题', '供应商申请', '本地伙伴咨询', '合规问题'],
  fr: ['Demande de projet', 'Question générale', 'Candidature fournisseur', 'Partenaire local', 'Question de conformité'],
}
const sectors: Record<Locale, string[]> = {
  en: ['Mining & remote operations', 'Construction', 'Education & student housing', 'Residential development', 'Commercial & hospitality', 'Public & community', 'IT & digital transformation', 'Global sourcing & market entry'],
  zh: ['矿业与偏远运营', '建筑施工', '教育与学生住宿', '住宅开发', '商业与酒店旅游', '公共与社区', 'IT 与数字化转型', '全球采购与市场进入'],
  fr: ['Mines et opérations éloignées', 'Construction', 'Éducation et logement étudiant', 'Développement résidentiel', 'Commerce et hôtellerie', 'Public et communautaire', 'TI et transformation numérique', 'Approvisionnement mondial et entrée sur le marché'],
}
const provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon']
const budgets: Record<Locale, string[]> = {
  en: ['Under CAD 250,000', 'CAD 250,000–1 million', 'CAD 1–5 million', 'CAD 5–20 million', 'Over CAD 20 million', 'To be determined'],
  zh: ['低于 25 万加元', '25 万–100 万加元', '100 万–500 万加元', '500 万–2000 万加元', '超过 2000 万加元', '待确定'],
  fr: ['Moins de 250 000 CAD', '250 000 à 1 M CAD', '1 à 5 M CAD', '5 à 20 M CAD', 'Plus de 20 M CAD', 'À déterminer'],
}
const timelines: Record<Locale, string[]> = {
  en: ['Within 6 months', '6–12 months', '12–24 months', 'More than 24 months', 'Exploratory'],
  zh: ['6 个月内', '6–12 个月', '12–24 个月', '超过 24 个月', '探索阶段'],
  fr: ['Dans les 6 mois', '6 à 12 mois', '12 à 24 mois', 'Plus de 24 mois', 'Exploratoire'],
}
const sites: Record<Locale, string[]> = {
  en: ['Site not selected', 'Site identified', 'Site controlled or owned', 'Existing operating site'],
  zh: ['尚未选择场地', '已确定场地', '已控制或拥有场地', '现有运营场地'],
  fr: ['Site non sélectionné', 'Site identifié', 'Site contrôlé ou détenu', 'Site déjà en exploitation'],
}

export function BusinessIntakeWizard({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const [step, setStep] = useState(0)
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [config, setConfig] = useState<PlanningConfig | null>(null)
  const [baseCost, setBaseCost] = useState(0)
  const [reference, setReference] = useState('')
  useEffect(() => { fetch('/api/business-tools/config').then((r) => r.ok ? r.json() : null).then(setConfig).catch(() => setConfig(null)) }, [])
  const cost = useMemo(() => config?.cost && baseCost > 0 ? calculateLandedCost(baseCost, config.cost.assumptions) : null, [baseCost, config])
  const duration = useMemo(() => config?.timeline ? calculateTimeline(config.timeline.stages, config.timeline.uncertaintyPct) : null, [config])
  const field = 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
  const label = 'grid gap-2 text-sm font-semibold text-slate-700'

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('loading')
    try {
      const csrf = await fetch('/api/business-tools/csrf', { cache: 'no-store' })
      if (!csrf.ok) throw new Error(t.error)
      const { token } = await csrf.json()
      const form = event.currentTarget
      const data = Object.fromEntries(new FormData(form).entries())
      const response = await fetch('/api/business-tools/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-nexus-csrf-token': token },
        body: JSON.stringify({ ...data, locale, consent: data.consent === 'on', baseCost: data.baseCost ? Number(data.baseCost) : null, consentTextVersion: CONSENT_TEXT_VERSION }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || t.error)
      setReference(result.reference)
      setState('success')
      form.reset()
      setBaseCost(0)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t.error)
      setState('error')
    }
  }

  const Select = ({ name, title, values, required = false }: { name: string; title: string; values: string[]; required?: boolean }) => (
    <label className={label}>{title}<select name={name} required={required} defaultValue="" className={field}><option value="">-</option>{values.map((value) => <option key={value}>{value}</option>)}</select></label>
  )
  const Input = ({ name, title, required = false, type = 'text', children }: { name: string; title: string; required?: boolean; type?: string; children?: ReactNode }) => (
    <label className={label}>{title}<input name={name} required={required} type={type} className={field} />{children}</label>
  )

  return (
    <form onSubmit={submit} className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-soft">
      <div className="bg-ink p-6 text-white sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-frost">{t.eyebrow}</p>
        <h3 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">{t.title}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">{t.intro}</p>
        <ol className="mt-7 grid grid-cols-4 gap-2" aria-label="Form progress">{t.steps.map((item, index) => <li key={item} className={`rounded-xl px-2 py-2 text-center text-[0.68rem] font-bold ${index === step ? 'bg-brand-light' : index < step ? 'bg-white/15' : 'bg-white/[0.06] text-white/45'}`}><span className="block">{index + 1}</span>{item}</li>)}</ol>
      </div>
      <div className="p-6 sm:p-8">
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
        <div data-wizard-step="0" hidden={step !== 0}><Fieldset label={t.steps[0]}><Select name="type" title={t.type} values={enquiryTypes[locale]} required /><Select name="sector" title={t.sector} values={sectors[locale]} required /><Input name="projectType" title={t.projectType} required /><Input name="intendedUse" title={t.use} required /></Fieldset></div>
        <div data-wizard-step="1" hidden={step !== 1}><Fieldset label={t.steps[1]}><label className={label}>{t.country}<input name="country" defaultValue="Canada" required className={field} /></label><Select name="province" title={t.province} values={provinces} required /><Input name="municipality" title={t.municipality} required /><Input name="sizeCapacity" title={t.size} /><Select name="siteReadiness" title={t.site} values={sites[locale]} /></Fieldset></div>
        <div data-wizard-step="2" hidden={step !== 2}><Fieldset label={t.steps[2]}><Select name="budgetRange" title={t.budget} values={budgets[locale]} /><Select name="targetTimeline" title={t.timeline} values={timelines[locale]} /><label className={`${label} sm:col-span-2`}>{t.compliance}<textarea name="complianceNeeds" rows={3} className={field} /></label><label className={`${label} sm:col-span-2`}>{t.base}<input name="baseCost" type="number" min="0" step="1000" onChange={(e) => setBaseCost(Number(e.target.value || 0))} className={field} /></label>{(cost || duration) && <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2" aria-live="polite">{cost && <EstimateCard icon={<Calculator className="h-5 w-5" />} title={t.estimate} value={`${config?.cost?.currency} ${Math.round(cost.low).toLocaleString()} - ${Math.round(cost.high).toLocaleString()}`} />}{duration && <EstimateCard icon={<Clock3 className="h-5 w-5" />} title={t.duration} value={`${duration.lowWeeks} - ${duration.highWeeks} weeks`} />}<p className="sm:col-span-2 text-xs leading-5 text-slate-500">{planningDisclaimer[locale]}</p></div>}</Fieldset></div>
        <div data-wizard-step="3" hidden={step !== 3}><Fieldset label={t.steps[3]}><Input name="contactName" title={t.name} required /><Input name="contactEmail" title={t.email} type="email" required /><Input name="contactPhone" title={t.phone} /><Input name="organizationName" title={t.organization} /><label className={`${label} sm:col-span-2`}>{t.notes}<textarea name="notes" required minLength={20} rows={6} className={field} /></label><label className="sm:col-span-2 flex items-start gap-3 text-sm leading-6 text-slate-600"><input name="consent" type="checkbox" required className="mt-1 h-4 w-4" /><span>{t.consent} <a href={`/${locale}/privacy`} target="_blank" rel="noreferrer" className="font-semibold underline">{locale === 'zh' ? '查看隐私说明' : locale === 'fr' ? 'Lire l’avis de confidentialité' : 'Read the Privacy Notice'}</a>.</span></label></Fieldset></div>
        <div className="mt-7 flex justify-between gap-4 border-t border-slate-200 pt-6">
          <button type="button" onClick={() => setStep((v) => Math.max(0, v - 1))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold disabled:opacity-30"><ArrowLeft className="h-4 w-4" />{t.previous}</button>
          {step < 3 ? <button type="button" onClick={(event) => {
            const current = event.currentTarget.form?.querySelector(`[data-wizard-step="${step}"]`)
            const invalid = current?.querySelector(':invalid') as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
            if (invalid) return invalid.reportValidity()
            setStep((value) => Math.min(3, value + 1))
          }} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">{t.next}<ArrowRight className="h-4 w-4" /></button> : <button type="submit" disabled={state === 'loading'} className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white disabled:opacity-60">{state === 'loading' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}{t.submit}</button>}
        </div>
        {state === 'success' && <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-sm font-semibold text-emerald-900"><CheckCircle2 className="mb-2 h-5 w-5" />{t.success}. {t.reference} <strong>{reference}</strong>.</div>}
        {state === 'error' && <p className="mt-6 rounded-2xl bg-red-50 p-5 text-sm font-semibold text-red-800">{message || t.error}</p>}
      </div>
    </form>
  )
}

function Fieldset({ label, children }: { label: string; children: ReactNode }) {
  return <fieldset className="grid gap-5 sm:grid-cols-2"><legend className="sr-only">{label}</legend>{children}</fieldset>
}

function EstimateCard({ icon, title, value }: { icon: ReactNode; title: string; value: string }) {
  return <div className="rounded-3xl bg-blue-50 p-5 text-blue-950">{icon}<p className="mt-3 text-xs font-bold uppercase">{title}</p><p className="mt-2 text-xl font-bold">{value}</p></div>
}
