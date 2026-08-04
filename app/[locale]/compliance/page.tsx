import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  ChevronDown,
  Download,
  ExternalLink,
  FileCheck2,
  Info,
  Phone,
  Truck,
  type LucideIcon,
} from 'lucide-react'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getPrisma } from '@/lib/prisma'
import { isLocale, type Locale } from '@/lib/i18n'
import {
  PHASE5_ORGANIZATION_KEY,
  isPhase5PublicComplianceEnabled,
  validatePublicCompliance,
} from '@/lib/phase5-core.mjs'

export const dynamic = 'force-dynamic'

const copy = {
  en: {
    title: 'Canada Compliance Centre',
    intro:
      'Practical planning information for modular developments in Canada. It is general guidance, not legal advice, engineering advice, or a promise that a project will be approved.',
    empty: 'No reviewed public compliance records are currently available.',
    disclaimer:
      'Important: Building permits, certifications and regulatory approvals are project- and jurisdiction-specific. This information is general guidance only and does not guarantee approval, replace professional advice, or confirm compliance for any project. Always consult the applicable authority and qualified Canadian professionals.',
  },
  zh: {
    title: '加拿大合规中心',
    intro: '面向加拿大模块化与装配式项目的规划参考信息。',
    empty: '目前没有经审核可公开展示的合规记录。',
    disclaimer:
      '重要提示：建筑许可、认证及监管批准均取决于具体项目和司法管辖区。本页面仅提供一般参考，不保证项目获得批准，不能替代专业意见，也不代表任何项目已符合要求。请务必咨询相关主管部门及具备资质的加拿大专业人士。',
  },
  fr: {
    title: 'Centre de conformité canadien',
    intro:
      'Information de planification pour les projets modulaires et préfabriqués au Canada.',
    empty: 'Aucun dossier de conformité révisé n’est actuellement publié.',
    disclaimer:
      'Important : les permis, certifications et approbations réglementaires dépendent du projet et de l’autorité compétente. Cette information est générale; elle ne garantit aucune approbation, ne remplace pas un avis professionnel et ne confirme pas la conformité d’un projet. Consultez toujours l’autorité concernée et des professionnels canadiens qualifiés.',
  },
} as const

type ComplianceCard = {
  title: string
  body: string
  icon: LucideIcon
}

const complianceCards: ComplianceCard[] = [
  {
    title: 'Building Codes & Zoning',
    icon: Building2,
    body:
      'The National Building Code of Canada 2020 is a model code. Provinces and territories adopt it, change it, and set their own effective dates. Local zoning bylaws can also control use, setbacks, height, parking, servicing, and fire access. So the first question is not simply whether a module follows NBC 2020. It is which code edition and local rules apply at your project address.',
  },
  {
    title: 'CSA & Product Certifications',
    icon: BadgeCheck,
    body:
      'CSA A277 covers the certification procedure for prefabricated buildings, modules, and panels made in a factory. It does not automatically cover foundations, anchoring, site connections, installation, or work completed outside the certified factory program. Electrical work must also follow the applicable edition of CSA C22.1, Canadian Electrical Code, Part I, as adopted by the province or territory. Ask for the factory certificate, certification body, standard edition, building type, and written scope before accepting a claim that a product is certified.',
  },
  {
    title: 'Transport, Weights & Site Access',
    icon: Truck,
    body:
      'Large modules may need over-dimensional or overweight permits. The carrier may also need a checked route, bridge and overhead-clearance reviews, escort vehicles, or municipal road permissions. Seasonal road restrictions, turning space, crane access, and weak ground can change the delivery plan. Confirm these points before the factory locks the final dimensions.',
  },
]

const provinces = [
  {
    name: 'Alberta',
    body:
      'Alberta uses the National Building Code - 2023 Alberta Edition, based on NBC 2020. It came into force on May 1, 2024. Energy Performance Tier 1 is the minimum level for the applicable housing and small-building provisions. Confirm the permit authority, current STANDATA, energy pathway, and local land-use requirements.',
    href: 'https://www.alberta.ca/building-codes-and-standards',
    source: 'Alberta building codes and standards',
  },
  {
    name: 'British Columbia',
    body:
      'The BC Building Code 2024 is based on NBC 2020. Most provisions came into effect on March 8, 2024, while some requirements had later transition dates. The City of Vancouver has its own building bylaw, and some other jurisdictions may follow different arrangements. Confirm the project location before choosing the code and approval path.',
    href:
      'https://www2.gov.bc.ca/gov/content/industry/construction-industry/building-codes-standards/bc-codes',
    source: 'British Columbia codes',
  },
  {
    name: 'Ontario',
    body:
      'The 2024 Ontario Building Code adopts NBC 2020 with Ontario amendments. It came into effect on January 1, 2025, with transition provisions for certain work already underway. Factory certification can address work completed under a certified program, but foundations, services, anchoring, installation, and other site work still need project-specific review.',
    href: 'https://www.ontario.ca/page/ontarios-building-code',
    source: 'Ontario Building Code',
  },
  {
    name: 'Quebec',
    body:
      'Chapter I, Building, of the Quebec Construction Code incorporates an amended version of NBC 2020. The updated chapter came into force on April 17, 2025. Quebec changes affect areas such as accessibility, structural design, fire protection, and building-envelope requirements. Confirm whether provincial or municipal administration applies and which licensed professionals must prepare or review the documents.',
    href:
      'https://www.legisquebec.gouv.qc.ca/en/document/cr/b-1.1%2C%20r.%202?langCont=en',
    source: 'Quebec Construction Code',
  },
]

const checklistSections = [
  {
    title: '1. Project location and responsible authority',
    groups: [
      {
        title: 'Project details',
        items: [
          'Project name and full site address or legal land description',
          'Province, municipality, regional district, First Nation, or other governing authority',
          'Intended use, expected occupancy, and seasonal or year-round operation',
          'Target delivery and occupancy dates',
        ],
      },
      {
        title: 'Authority contacts',
        items: [
          'Building-permit and planning or zoning contacts',
          'Fire, electrical, plumbing, or gas authorities, where separate',
          'Provincial and municipal transportation authorities',
          'Qualified architect or engineer, where required',
        ],
      },
    ],
  },
  {
    title: '2. Zoning and building-code pathway',
    groups: [
      {
        title: 'Land-use review',
        items: [
          'Proposed use, development permit, setbacks, height, and lot coverage',
          'Parking, loading, fire access, accessibility, and temporary-building rules',
          'Indigenous, environmental, heritage, or other land restrictions',
        ],
      },
      {
        title: 'Code review',
        items: [
          'Applicable code, edition, transition rules, and local amendments',
          'Building classification, major occupancy, and Part 3 or Part 9 pathway',
          'Energy and fire-protection requirements',
        ],
      },
    ],
  },
  {
    title: '3. Factory and certification documents',
    groups: [
      {
        title: 'Factory information',
        items: [
          'Manufacturer name, factory address, experience, and similar work',
          'Quality-control, inspection, testing, warranty, and after-sales process',
        ],
      },
      {
        title: 'Certification information',
        items: [
          'Certification body and accreditation',
          'CSA A277 certificate, standard edition, factory location, and listed scope',
          'Module labels, serial numbers, certificate status, and inspection records',
          'Items excluded from factory certification listed in writing',
        ],
      },
    ],
  },
  {
    title: '4. Design, site, and services',
    groups: [
      {
        title: 'Design documents',
        items: [
          'Architectural, structural, mechanical, electrical, and plumbing drawings',
          'Structural calculations, fire-safety information, materials, and equipment schedules',
          'Canadian units and references to applicable Canadian requirements',
        ],
      },
      {
        title: 'Site work',
        items: [
          'Survey, geotechnical information, foundations, and anchoring',
          'Snow, wind, seismic, drainage, and grading requirements',
          'Water, wastewater, electrical, fuel, and communications services',
          'Site-preparation responsibilities',
        ],
      },
    ],
  },
  {
    title: '5. Shipping, delivery, and installation',
    groups: [
      {
        title: 'Transport planning',
        items: [
          'Final dimensions, weights, lifting points, packing, and loading method',
          'Carrier, permits, route, bridge, and overhead-clearance checks',
          'Municipal road permissions, seasonal restrictions, escorts, and traffic control',
        ],
      },
      {
        title: 'Site delivery',
        items: [
          'Entrance, turning radius, ground-bearing capacity, and staging area',
          'Crane or forklift plan, temporary storage, weather plan, and site safety',
          'Assembly sequence, tools, equipment, and labour',
        ],
      },
    ],
  },
  {
    title: '6. Permit file, inspections, and handover',
    groups: [
      {
        title: 'Before permit submission',
        items: [
          'Application forms, owner and contractor information',
          'Signed or sealed drawings, factory certificates, tests, calculations, and energy information',
          'Site plan, foundations, services, transport information, and an open-item register',
        ],
      },
      {
        title: 'During installation',
        items: [
          'Factory and receiving records, shipping damage, and approved site changes',
          'Foundation, electrical, plumbing, gas, structural, fire, and life-safety inspections',
          'Deficiency tracking and close-out',
        ],
      },
      {
        title: 'Before occupancy or use',
        items: [
          'Final inspection and occupancy approval, where required',
          'As-built drawings, manuals, warranties, spare parts, and maintenance schedule',
          'Emergency information, client training, and a final open-item list',
        ],
      },
    ],
  },
]

const officialSources = [
  {
    label: 'National Building Code of Canada 2020',
    href:
      'https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-canada-publications/national-building-code-canada-2020',
  },
  {
    label: 'CSA modular-construction standards overview',
    href:
      'https://www.csagroup.org/wp-content/uploads/CSA-ModularConstruction-CaseStudy-EN_Accessible.pdf',
  },
  {
    label: 'Ontario oversize and overweight permits',
    href: 'https://www.ontario.ca/page/get-oversizeoverweight-permit',
  },
]

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await props.params
  if (!isLocale(locale) || !isPhase5PublicComplianceEnabled()) return {}

  return {
    title: copy[locale].title,
    description: copy[locale].intro,
    robots: { index: true, follow: true },
  }
}

export default async function CompliancePage(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await props.params
  if (!isLocale(rawLocale) || !isPhase5PublicComplianceEnabled()) notFound()

  const locale = rawLocale as Locale
  const prisma = await getPrisma()
  const records = (
    await prisma.complianceRecord.findMany({
      where: {
        organizationKey: PHASE5_ORGANIZATION_KEY,
        publicVisible: true,
      },
      orderBy: [{ jurisdiction: 'asc' }, { category: 'asc' }],
      select: {
        id: true,
        jurisdiction: true,
        projectUse: true,
        category: true,
        publicVisible: true,
        publicTitleEn: true,
        publicTitleZh: true,
        publicTitleFr: true,
        publicSummaryEn: true,
        publicSummaryZh: true,
        publicSummaryFr: true,
      },
    })
  ).filter(validatePublicCompliance)

  const titleKey =
    `publicTitle${locale === 'zh' ? 'Zh' : locale === 'fr' ? 'Fr' : 'En'}` as const
  const summaryKey =
    `publicSummary${locale === 'zh' ? 'Zh' : locale === 'fr' ? 'Fr' : 'En'}` as const

  if (locale !== 'en') {
    return (
      <>
        <main className="min-h-screen bg-slate-50 text-ink">
          <div className="relative bg-[#0b2528] pb-16 pt-36 text-white">
            <SiteHeader locale={locale} />
            <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
              <p className="eyebrow text-[#b8d683]">NEXUS · CANADA</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-bold sm:text-6xl">
                {copy[locale].title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-white/75">
                {copy[locale].intro}
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
            <div className="rounded-lg border border-slate-200 bg-[#f8f9fa] p-5 text-sm leading-7 text-slate-700">
              <strong>{copy[locale].disclaimer}</strong>
            </div>

            {records.length ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {records.map((record) => (
                  <article
                    key={record.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-[#1a6887]">
                      <span>{record.jurisdiction}</span>
                      <span>·</span>
                      <span>{record.projectUse}</span>
                      <span>·</span>
                      <span>{record.category.replaceAll('_', ' ')}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold">{record[titleKey]}</h2>
                    <p className="mt-3 leading-7 text-slate-600">
                      {record[summaryKey]}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
                {copy[locale].empty}
              </p>
            )}
          </div>
        </main>
        <SiteFooter locale={locale} />
      </>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-[#f5f6f5] text-[#11191b]">
        <section className="relative overflow-hidden bg-[#082328] pb-20 pt-36 text-white">
          <SiteHeader locale={locale} />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(45,130,176,.28),transparent_62%)]" />
          <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <p className="eyebrow text-[#b8d683]">NEXUS · CANADA</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {copy.en.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72">
              {copy.en.intro}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="flex gap-4 rounded-lg border border-[#dfd7a5] bg-[#fff9df] p-5 text-[0.9rem] leading-7 text-[#3d3826] sm:p-6">
            <Info className="mt-1 h-5 w-5 shrink-0 text-[#8d7725]" aria-hidden="true" />
            <p>
              <strong>{copy.en.disclaimer}</strong>
            </p>
          </div>

          <div className="mt-12 max-w-4xl">
            <p className="premium-eyebrow">What this page gives you</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              A practical roadmap, not a public permit file.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-slate-600">
              <p>
                We do not publish client permits, engineering reports, inspection
                records, or other project-specific documents here.
              </p>
              <p>
                What we do provide is a clear starting point. It covers the main
                questions that should be answered before a modular building is
                ordered, shipped, or placed on a Canadian site.
              </p>
              <p>
                The final decision always belongs to the applicable authority and
                the qualified professionals working on your project.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <p className="premium-eyebrow">The big three</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              The first compliance questions usually fall into three areas.
            </h2>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {complianceCards.map(({ title, body, icon: Icon }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-[#f8faf9] p-6 sm:p-7"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#0b2528] text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
                    {title}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="premium-eyebrow">Provincial variations</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Canada does not apply one building code in exactly the same way everywhere.
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">
            Each province has its own amendments, effective dates, and approval
            process. Municipalities and other authorities may also control zoning,
            permits, plan review, inspections, and occupancy. We do not guarantee
            provincial compliance. We help clients identify the right authority and
            the documents that authority is likely to request.
          </p>

          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200 bg-white">
            {provinces.map((province, index) => (
              <details key={province.name} className="group" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-xl font-semibold sm:px-7">
                  {province.name}
                  <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-6 sm:px-7">
                  <p className="max-w-4xl leading-7 text-slate-600">{province.body}</p>
                  <a
                    href={province.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#176b96] hover:underline"
                  >
                    Official source: {province.source}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#082328] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
              <div>
                <p className="eyebrow text-[#b8d683]">Free planning resource</p>
                <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Pre-Construction Compliance Checklist
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
                  A factory price does not tell you whether a building can be
                  permitted, transported, installed, or occupied at your site. Use
                  this checklist to organize the questions before the order moves too
                  far.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href="/downloads/nexus-pre-construction-compliance-checklist.pdf"
                  download
                  className="premium-button-light"
                >
                  <Download className="h-4 w-4" />
                  Download the Checklist
                </a>
                <Link
                  href="/en/contact?intent=15-minute-call"
                  className="premium-button-ghost"
                >
                  <Phone className="h-4 w-4" />
                  Book a 15-min Call
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-4">
              {checklistSections.map((section, index) => (
                <details
                  key={section.title}
                  className="group rounded-xl border border-white/14 bg-white/[0.05]"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-lg font-semibold sm:px-6">
                    <span className="inline-flex items-center gap-3">
                      <FileCheck2 className="h-5 w-5 text-[#b8d683]" />
                      {section.title}
                    </span>
                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                  </summary>

                  <div className="grid gap-7 border-t border-white/10 px-5 py-6 sm:px-6 md:grid-cols-2">
                    {section.groups.map((group) => (
                      <div key={group.title}>
                        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#b8d683]">
                          {group.title}
                        </h3>
                        <div className="mt-4 grid gap-3">
                          {group.items.map((item) => (
                            <p
                              key={item}
                              className="flex items-start gap-3 text-sm leading-6 text-white/72"
                            >
                              <span
                                className="mt-1 h-4 w-4 shrink-0 border border-white/45"
                                aria-hidden="true"
                              />
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="premium-eyebrow">Not sure where to begin?</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Send us the location, intended use, capacity, budget range, and target date.
              </h2>
              <p className="mt-5 max-w-3xl leading-7 text-slate-600">
                We will help you identify the first authority to contact, the
                documents to request from the factory, and the questions that need
                answers before the project moves forward.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/en/contact" className="premium-button-dark">
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/en/contact?intent=15-minute-call"
                className="inline-flex min-h-11 items-center gap-2 border border-[#11191b]/20 px-5 text-sm font-bold uppercase tracking-[0.08em] text-[#11191b] transition hover:bg-[#11191b] hover:text-white"
              >
                Book a 15-min Call
              </Link>
            </div>
          </div>

          {records.length > 0 ? (
            <div className="mt-16">
              <p className="premium-eyebrow">Reviewed public records</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Project-specific records approved for public display
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {records.map((record) => (
                  <article
                    key={record.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-[#176b96]">
                      <span>{record.jurisdiction}</span>
                      <span>·</span>
                      <span>{record.projectUse}</span>
                      <span>·</span>
                      <span>{record.category.replaceAll('_', ' ')}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold">{record[titleKey]}</h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {record[summaryKey]}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-16 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-semibold">Official starting points</h2>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {officialSources.map((source) => (
                <a
                  key={source.label}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#176b96] hover:underline"
                >
                  {source.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-xl bg-[#eef1ee] p-5 text-sm leading-6 text-slate-600 sm:p-6">
            <strong className="text-[#11191b]">This resource library is growing.</strong>{' '}
            We are adding more provincial summaries, document guides,
            transport-planning notes, and permit-preparation resources. Requirements
            change, so confirm the latest information with the applicable authority
            and qualified Canadian professionals before relying on any guide.
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </>
  )
}
