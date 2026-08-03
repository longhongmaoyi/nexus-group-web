import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getPrisma } from '@/lib/prisma'
import { isLocale, type Locale } from '@/lib/i18n'
import { PHASE5_ORGANIZATION_KEY, isPhase5PublicComplianceEnabled, validatePublicCompliance } from '@/lib/phase5-core.mjs'

export const dynamic = 'force-dynamic'

const copy = {
  en: { title: 'Canada Compliance Centre', intro: 'Project-planning information for modular and prefabricated developments in Canada.', empty: 'No reviewed public compliance records are currently available.', disclaimer: 'Important: Building permits, certifications and regulatory approvals are project- and jurisdiction-specific. This information is general guidance only and does not guarantee approval, replace professional advice, or confirm compliance for any project. Always consult the applicable authority and qualified Canadian professionals.' },
  zh: { title: '加拿大合规中心', intro: '面向加拿大模块化与装配式项目的规划参考信息。', empty: '目前没有经审核可公开展示的合规记录。', disclaimer: '重要提示：建筑许可、认证及监管批准均取决于具体项目和司法管辖区。本页面仅提供一般参考，不保证项目获得批准，不能替代专业意见，也不代表任何项目已符合要求。请务必咨询相关主管部门及具备资质的加拿大专业人士。' },
  fr: { title: 'Centre de conformité canadien', intro: 'Information de planification pour les projets modulaires et préfabriqués au Canada.', empty: 'Aucun dossier de conformité révisé n’est actuellement publié.', disclaimer: 'Important : les permis, certifications et approbations réglementaires dépendent du projet et de l’autorité compétente. Cette information est générale; elle ne garantit aucune approbation, ne remplace pas un avis professionnel et ne confirme pas la conformité d’un projet. Consultez toujours l’autorité concernée et des professionnels canadiens qualifiés.' },
} as const

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params
  if (!isLocale(locale) || !isPhase5PublicComplianceEnabled()) return {}
  return { title: copy[locale].title, description: copy[locale].intro, robots: { index: true, follow: true } }
}

export default async function CompliancePage(props: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await props.params
  if (!isLocale(rawLocale) || !isPhase5PublicComplianceEnabled()) notFound()
  const locale = rawLocale as Locale
  const prisma = await getPrisma()
  const records = (await prisma.complianceRecord.findMany({
    where: { organizationKey: PHASE5_ORGANIZATION_KEY, publicVisible: true },
    orderBy: [{ jurisdiction: 'asc' }, { category: 'asc' }],
    select: { id: true, jurisdiction: true, projectUse: true, category: true, publicVisible: true, publicTitleEn: true, publicTitleZh: true, publicTitleFr: true, publicSummaryEn: true, publicSummaryZh: true, publicSummaryFr: true },
  })).filter(validatePublicCompliance)
  const titleKey = `publicTitle${locale === 'zh' ? 'Zh' : locale === 'fr' ? 'Fr' : 'En'}` as const
  const summaryKey = `publicSummary${locale === 'zh' ? 'Zh' : locale === 'fr' ? 'Fr' : 'En'}` as const
  return <><main className="min-h-screen bg-slate-50 text-ink"><div className="relative bg-[#0b2528] pb-16 pt-36 text-white"><SiteHeader locale={locale} /><div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12"><p className="eyebrow text-[#b8d683]">NEXUS · CANADA</p><h1 className="mt-3 max-w-4xl text-4xl font-bold sm:text-6xl">{copy[locale].title}</h1><p className="mt-5 max-w-3xl text-lg text-white/75">{copy[locale].intro}</p></div></div><div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12"><div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950"><strong>{copy[locale].disclaimer}</strong></div>{records.length ? <div className="mt-8 grid gap-5 md:grid-cols-2">{records.map((record) => <article key={record.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-[#1a6887]"><span>{record.jurisdiction}</span><span>·</span><span>{record.projectUse}</span><span>·</span><span>{record.category.replaceAll('_', ' ')}</span></div><h2 className="mt-3 text-xl font-bold">{record[titleKey]}</h2><p className="mt-3 leading-7 text-slate-600">{record[summaryKey]}</p></article>)}</div> : <p className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">{copy[locale].empty}</p>}</div></main><SiteFooter locale={locale} /></>
}
