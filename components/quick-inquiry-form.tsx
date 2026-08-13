'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react'

import type { Locale } from '@/lib/i18n'

export type InquiryMode = 'call' | 'supplier' | 'partner'

const pageCopy = {
  call: {
    en: { title: 'Book a 15-minute call', intro: 'Share the basics. This is for a quick first conversation, not a full project submission.', topic: 'What do you want to discuss?', detail: 'Your question or the main issue', time: 'Preferred day or time', submit: 'Request the call', success: 'Thanks. Your call request has been received.' },
    zh: { title: '预约 15 分钟通话', intro: '请提供基本信息。这是一次简短的首次沟通，不是完整项目提交。', topic: '您希望讨论什么？', detail: '您的问题或主要困难', time: '希望的日期或时间', submit: '提交通话申请', success: '感谢您，我们已收到通话申请。' },
    fr: { title: 'Réserver un appel de 15 minutes', intro: 'Partagez l’essentiel. Il s’agit d’un premier échange rapide, pas d’une soumission complète.', topic: 'Que souhaitez-vous discuter?', detail: 'Votre question ou le principal blocage', time: 'Jour ou heure souhaité', submit: 'Demander l’appel', success: 'Merci. Votre demande d’appel a été reçue.' },
  },
  supplier: {
    en: { title: 'Apply as a supplier', intro: 'A catalogue is not enough. Tell us who manufactures the product and what evidence is available.', topic: 'Factory and main product lines', detail: 'Share the factory address, export markets, engineering capability, quality system, test records and Canadian support plan.', time: 'Company website', submit: 'Send supplier details', success: 'Thanks. Your supplier information has been received.' },
    zh: { title: '供应商申请', intro: '仅有产品目录并不够。请说明实际制造方以及可以提供哪些证明资料。', topic: '工厂及主要产品线', detail: '请提供工厂地址、出口市场、工程能力、质量体系、测试记录及加拿大支持计划。', time: '企业网站', submit: '发送供应商资料', success: '感谢您，我们已收到供应商资料。' },
    fr: { title: 'Candidature fournisseur', intro: 'Un catalogue ne suffit pas. Présentez le fabricant réel et les preuves disponibles.', topic: 'Usine et principales gammes', detail: 'Indiquez l’adresse de l’usine, les marchés export, l’ingénierie, la qualité, les essais et le plan de soutien au Canada.', time: 'Site web de l’entreprise', submit: 'Envoyer les renseignements', success: 'Merci. Vos renseignements fournisseur ont été reçus.' },
  },
  partner: {
    en: { title: 'Apply as a Canadian project partner', intro: 'For architects, engineers, permit specialists, contractors, installers, logistics providers and service companies.', topic: 'Profession, service and region', detail: 'Describe your licences or qualifications, service area, relevant modular experience and the work you want to support.', time: 'Company website', submit: 'Send partner details', success: 'Thanks. Your partner information has been received.' },
    zh: { title: '申请成为加拿大项目伙伴', intro: '适用于建筑师、工程师、许可顾问、承包商、安装商、物流及服务企业。', topic: '专业、服务及地区', detail: '请说明执照或资质、服务地区、相关模块化经验及希望支持的工作。', time: '企业网站', submit: '发送伙伴资料', success: '感谢您，我们已收到伙伴资料。' },
    fr: { title: 'Devenir partenaire de projet au Canada', intro: 'Pour architectes, ingénieurs, spécialistes des permis, entrepreneurs, installateurs, logisticiens et sociétés de service.', topic: 'Profession, service et région', detail: 'Décrivez vos permis ou qualifications, territoire, expérience modulaire et le travail que vous souhaitez soutenir.', time: 'Site web de l’entreprise', submit: 'Envoyer les renseignements', success: 'Merci. Vos renseignements de partenaire ont été reçus.' },
  },
} as const

const common = {
  en: { name: 'Your name', email: 'Business email', phone: 'Phone / WhatsApp', company: 'Organization', consent: 'I agree that NEXUS may use these details to respond to this inquiry.', error: 'We could not send the request. Please try again or contact us directly.' },
  zh: { name: '您的姓名', email: '商务邮箱', phone: '电话 / WhatsApp', company: '机构名称', consent: '我同意 NEXUS 使用这些资料回复本次咨询。', error: '暂时无法发送，请重试或直接联系我们。' },
  fr: { name: 'Votre nom', email: 'Courriel professionnel', phone: 'Téléphone / WhatsApp', company: 'Organisation', consent: 'J’accepte que NEXUS utilise ces renseignements pour répondre à cette demande.', error: 'La demande n’a pas pu être envoyée. Réessayez ou contactez-nous directement.' },
} as const

export function QuickInquiryForm({ locale, mode }: { locale: Locale; mode: InquiryMode }) {
  const copy = pageCopy[mode][locale]
  const shared = common[locale]
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const value = (name: string) => String(formData.get(name) || '').trim()
    setState('loading')

    const message = [
      `Request type: ${mode}`,
      `${copy.topic}: ${value('topic')}`,
      `${copy.time}: ${value('preferred')}`,
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
        country: '',
        interest: mode === 'call' ? '15-minute call' : mode === 'supplier' ? 'Supplier application' : 'Canadian project partner application',
        message,
        locale,
        consent: formData.get('consent') === 'on',
        consentTextVersion: `quick-inquiry-${mode}-2026-08`,
      }),
    })

    setState(response.ok ? 'success' : 'error')
    if (response.ok) form.reset()
  }

  const fieldClass = 'border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
  const labelClass = 'grid gap-2 text-sm font-semibold text-slate-700'

  return (
    <form onSubmit={submit} className="border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">{copy.title}</h2>
        <p className="mt-3 leading-7 text-slate-600">{copy.intro}</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>{shared.name}<input name="name" required className={fieldClass} /></label>
        <label className={labelClass}>{shared.email}<input name="email" type="email" required className={fieldClass} /></label>
        <label className={labelClass}>{shared.phone}<input name="phone" className={fieldClass} /></label>
        <label className={labelClass}>{shared.company}<input name="company" required className={fieldClass} /></label>
        <label className={`${labelClass} sm:col-span-2`}>{copy.topic}<input name="topic" required className={fieldClass} /></label>
        <label className={`${labelClass} sm:col-span-2`}>{copy.time}<input name="preferred" className={fieldClass} /></label>
        <label className={`${labelClass} sm:col-span-2`}>{copy.detail}<textarea name="details" required rows={6} className={fieldClass} /></label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-600">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 border-slate-300" />
        <span>{shared.consent}{' '}
          <a href={`/${locale}/privacy`} target="_blank" rel="noreferrer" className="font-semibold underline">
            {locale === 'zh' ? '查看隐私说明' : locale === 'fr' ? 'Lire l’avis de confidentialité' : 'Read the Privacy Notice'}
          </a>.
        </span>
      </label>

      <button type="submit" disabled={state === 'loading'} className="mt-7 inline-flex min-h-11 items-center gap-2 bg-ink px-6 text-sm font-bold text-white transition hover:bg-brand disabled:opacity-60">
        {state === 'loading' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {copy.submit}
      </button>

      {state === 'success' ? <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand"><CheckCircle2 className="h-5 w-5" />{copy.success}</p> : null}
      {state === 'error' ? <p className="mt-5 text-sm font-semibold text-red-700">{shared.error}</p> : null}
    </form>
  )
}
