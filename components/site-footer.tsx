import Link from 'next/link'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>
const t = (en: string, zh: string, fr: string): Localized => ({ en, zh, fr })

const groups = [
  {
    title: t('Explore', '探索', 'Explorer'),
    links: [
      { slug: 'products', label: t('Solutions', '解决方案', 'Solutions') },
      { slug: 'industries', label: t('Industries', '行业', 'Secteurs') },
      { slug: 'projects', label: t('Projects', '项目', 'Projets') },
      { slug: 'news', label: t('Insights', '洞察', 'Perspectives') },
    ],
  },
  {
    title: t('Work With NEXUS', '与 NEXUS 合作', 'Collaborer avec NEXUS'),
    links: [
      { slug: 'assembly-centre', label: t('How We Deliver', '交付方式', 'Notre approche') },
      { slug: 'suppliers', label: t('Partners', '合作伙伴', 'Partenaires') },
      { slug: 'about', label: t('About', '关于我们', 'À propos') },
      { slug: 'contact', label: t('Start a Project', '启动项目', 'Démarrer un projet') },
    ],
  },
]

const copy = {
  body: t(
    'NEXUS GROUP connects Canadian organizations with global modular, infrastructure and digital capabilities—then coordinates the local pathway from evaluation to delivery.',
    'NEXUS 集团连接加拿大机构与全球模块化、基础设施及数字技术能力，并协调从评估到交付的本地化流程。',
    'NEXUS GROUP relie les organisations canadiennes aux capacités mondiales en construction modulaire, infrastructure et numérique, puis coordonne le parcours local jusqu’à la livraison.',
  ),
  assurance: t(
    'Project-specific compliance coordination through qualified professionals and responsible authorities.',
    '通过合格专业人士及主管机构进行项目专项合规协调。',
    'Coordination de conformité propre au projet avec des professionnels qualifiés et les autorités responsables.',
  ),
  contact: t('Start your project assessment', '开始项目评估', 'Commencer votre évaluation de projet'),
  legal: t(
    'Requirements and approvals vary by jurisdiction, intended use, product configuration and site conditions.',
    '要求与审批因司法辖区、用途、产品配置及现场条件而异。',
    'Les exigences et approbations varient selon la juridiction, l’usage, la configuration du produit et le site.',
  ),
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const localized = (value: Localized) => value[locale]

  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto grid max-w-8xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.25fr_1fr_0.9fr] lg:px-12 lg:py-14">
        <div>
          <div className="inline-flex rounded-xl bg-white px-3 py-2 shadow-sm">
            <BrandMark href={`/${locale}`} />
          </div>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">{localized(copy.body)}</p>
          <div className="mt-5 flex max-w-lg items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-white/70">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9fc45a]" />
            <span>{localized(copy.assurance)}</span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title.en}>
              <h3 className="text-sm font-bold">{localized(group.title)}</h3>
              <div className="mt-4 grid gap-2.5">
                {group.links.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${locale}/${item.slug}`}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {localized(item.label)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a8c36b]">Canada · China · Global</p>
          <h3 className="mt-4 text-xl font-semibold">Global innovation. Canadian execution.</h3>
          <p className="mt-4 text-sm leading-6 text-white/60">{localized(copy.legal)}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#a8c36b]"
          >
            {localized(copy.contact)} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-8xl flex-col gap-2 px-5 py-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} NEXUS GROUP. All rights reserved.</span>
          <span>English default · 中文 · Français</span>
        </div>
      </div>
    </footer>
  )
}
