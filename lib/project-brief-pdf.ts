import type { BusinessLead, SavedEstimate } from '@prisma/client'
import path from 'node:path'
import PDFDocument from 'pdfkit'

type PdfLead = BusinessLead & { estimates?: SavedEstimate[] }
type Locale = 'en' | 'zh' | 'fr'

const labels = {
  en: {
    title: 'PROJECT ASSESSMENT BRIEF',
    prepared: 'Prepared by NEXUS GROUP',
    contact: 'Contact',
    project: 'Project profile',
    estimate: 'Indicative planning estimate',
    timeline: 'Indicative timeline',
    assumptions: 'Important assumptions and disclaimer',
    noEstimate: 'No cost estimate was requested or saved.',
    noTimeline: 'No timeline estimate is available.',
  },
  zh: {
    title: '项目评估简报',
    prepared: '由 NEXUS GROUP 编制',
    contact: '联系人',
    project: '项目概况',
    estimate: '参考规划成本估算',
    timeline: '参考项目时间表',
    assumptions: '重要假设与免责声明',
    noEstimate: '未申请或保存成本估算。',
    noTimeline: '暂无时间估算。',
  },
  fr: {
    title: 'DOSSIER D’ÉVALUATION DU PROJET',
    prepared: 'Préparé par NEXUS GROUP',
    contact: 'Coordonnées',
    project: 'Profil du projet',
    estimate: 'Estimation indicative',
    timeline: 'Échéancier indicatif',
    assumptions: 'Hypothèses et avis important',
    noEstimate: 'Aucune estimation de coût demandée ou enregistrée.',
    noTimeline: 'Aucune estimation d’échéancier disponible.',
  },
} as const

function wrap(value: string, width: number) {
  const paragraphs = String(value || '').split(/\r?\n/)
  const lines: string[] = []
  for (const paragraph of paragraphs) {
    if (!paragraph) {
      lines.push('')
      continue
    }
    const words = paragraph.split(/\s+/)
    let current = ''
    for (const word of words) {
      if (word.length > width && !current) {
        for (let index = 0; index < word.length; index += width) lines.push(word.slice(index, index + width))
        continue
      }
      const candidate = current ? `${current} ${word}` : word
      if (candidate.length > width) {
        lines.push(current)
        current = word
      } else current = candidate
    }
    if (current) lines.push(current)
  }
  return lines
}

function formatMoney(value: unknown, currency = 'CAD') {
  const number = Number(value)
  return Number.isFinite(number) ? `${currency} ${number.toLocaleString('en-CA', { maximumFractionDigits: 0 })}` : '-'
}

export async function generateProjectBriefPdf(lead: PdfLead, localeInput = 'en') {
  const locale = (['en', 'zh', 'fr'].includes(localeInput) ? localeInput : 'en') as Locale
  const copy = labels[locale]
  const estimate = lead.estimates?.[0]
  const cost = estimate?.costResult as Record<string, unknown> | null
  const timeline = estimate?.timelineResult as Record<string, unknown> | null
  const lines: Array<{ text: string; size?: number; gap?: number; color?: string }> = []
  const add = (text: string, size = 10, gap = 0, color = '0.15 0.22 0.22') => lines.push({ text, size, gap, color })
  const section = (title: string) => {
    add('', 5, 5)
    add(title, 15, 5, '0.10 0.34 0.47')
  }
  const field = (label: string, value: unknown) => add(`${label}: ${String(value || '-')}`)

  add(copy.title, 23, 4, '0.04 0.15 0.16')
  add(copy.prepared, 10, 2, '0.31 0.43 0.35')
  add(`${lead.reference} | ${new Date(lead.createdAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'fr' ? 'fr-CA' : 'en-CA')}`, 9)
  section(copy.contact)
  field(locale === 'zh' ? '姓名' : locale === 'fr' ? 'Nom' : 'Name', lead.contactName)
  field(locale === 'zh' ? '机构' : locale === 'fr' ? 'Organisation' : 'Organization', lead.organizationName)
  field(locale === 'zh' ? '邮箱' : locale === 'fr' ? 'Courriel' : 'Email', lead.contactEmail)
  field(locale === 'zh' ? '电话' : locale === 'fr' ? 'Téléphone' : 'Phone', lead.contactPhone)
  section(copy.project)
  field(locale === 'zh' ? '类型' : 'Type', lead.type)
  field(locale === 'zh' ? '行业' : locale === 'fr' ? 'Secteur' : 'Sector', lead.sector)
  field(locale === 'zh' ? '地点' : locale === 'fr' ? 'Emplacement' : 'Location', [lead.municipality, lead.province, lead.country].filter(Boolean).join(', '))
  field(locale === 'zh' ? '预期用途' : locale === 'fr' ? 'Usage prévu' : 'Intended use', lead.intendedUse)
  field(locale === 'zh' ? '规模 / 容量' : locale === 'fr' ? 'Taille / capacité' : 'Size / capacity', lead.sizeCapacity)
  field(locale === 'zh' ? '预算' : 'Budget', lead.budgetRange)
  field(locale === 'zh' ? '目标时间' : locale === 'fr' ? 'Échéancier cible' : 'Target timeline', lead.targetTimeline)
  field(locale === 'zh' ? '场地准备' : locale === 'fr' ? 'État du site' : 'Site readiness', lead.siteReadiness)
  field(locale === 'zh' ? '合规需求' : locale === 'fr' ? 'Besoins de conformité' : 'Compliance needs', lead.complianceNeeds)
  add(lead.notes || '-')
  section(copy.estimate)
  if (cost) {
    const currency = 'CAD'
    field(locale === 'zh' ? '规划范围' : locale === 'fr' ? 'Fourchette' : 'Planning range', `${formatMoney(cost.low, currency)} - ${formatMoney(cost.high, currency)}`)
    field(locale === 'zh' ? '估算总额' : locale === 'fr' ? 'Total estimé' : 'Estimated total', formatMoney(cost.total, currency))
  } else add(copy.noEstimate)
  section(copy.timeline)
  if (timeline) {
    field(locale === 'zh' ? '规划范围' : locale === 'fr' ? 'Fourchette' : 'Planning range', `${timeline.lowWeeks || '-'} - ${timeline.highWeeks || '-'} weeks`)
    field(locale === 'zh' ? '不确定性' : locale === 'fr' ? 'Incertitude' : 'Uncertainty', `${timeline.uncertaintyPct || '-'}%`)
  } else add(copy.noTimeline)
  section(copy.assumptions)
  add(locale === 'zh'
    ? '本简报用于早期规划，不构成报价、承诺、工程意见、许可、认证或监管批准。实际成本和工期取决于项目地点、设计、场地、供应商、汇率、运输、关税、税费、专业服务、许可、检查及市场条件。'
    : locale === 'fr'
      ? 'Ce dossier sert à la planification initiale. Il ne constitue ni un devis, ni un engagement, ni un avis d’ingénierie, ni un permis, ni une certification, ni une approbation réglementaire. Les coûts et délais réels dépendent du site, de la conception, des fournisseurs, du transport, des droits, des taxes, des services professionnels, des permis, des inspections et du marché.'
      : 'This brief supports early planning only. It is not a quotation, commitment, engineering opinion, permit, certification, or regulatory approval. Actual costs and timing depend on location, design, site conditions, suppliers, exchange rates, shipping, duties, taxes, professional services, permits, inspections, and market conditions.')

  const expanded = lines.flatMap((line) => wrap(line.text, locale === 'zh' ? 38 : 86).map((text, index) => ({ ...line, text, gap: index === 0 ? line.gap : 0 })))
  const fontPath = path.join(process.cwd(), 'node_modules', '@fontpkg', 'noto-sans-cjk-sc', 'NotoSansCJKsc-Regular.otf')
  const document = new PDFDocument({
    size: 'A4',
    font: fontPath,
    margins: { top: 62, right: 42, bottom: 54, left: 42 },
    info: {
      Title: `${copy.title} - ${lead.reference}`,
      Author: 'NEXUS GROUP',
      Subject: 'Private project assessment brief',
      Creator: 'NEXUS Phase 3 Business Tools',
    },
    autoFirstPage: true,
    bufferPages: true,
  })
  document.registerFont('NexusSans', fontPath)
  document.font('NexusSans')
  const chunks: Buffer[] = []
  document.on('data', (chunk: Buffer) => chunks.push(chunk))
  const completed = new Promise<Buffer>((resolve, reject) => {
    document.on('end', () => resolve(Buffer.concat(chunks)))
    document.on('error', reject)
  })
  const margin = 42
  let y = 70

  const drawFrame = () => {
    document.save().strokeColor('#1a6887').lineWidth(1).moveTo(36, 32).lineTo(559, 32).stroke().restore()
  }
  drawFrame()
  for (const line of expanded) {
    const size = line.size || 10
    y += (line.gap || 0)
    const lineHeight = Math.max(13, size * 1.45)
    if (y + lineHeight > 780) {
      document.addPage()
      y = 70
      drawFrame()
    }
    const color = line.color === '0.10 0.34 0.47' ? '#1a6887' : line.color === '0.04 0.15 0.16' ? '#0b2528' : '#263838'
    document.font('NexusSans').fontSize(size).fillColor(color).text(line.text, margin, y, { width: 511, lineBreak: false })
    y += lineHeight
  }
  const range = document.bufferedPageRange()
  for (let index = range.start; index < range.start + range.count; index += 1) {
    document.switchToPage(index)
    document.font('NexusSans').fontSize(8).fillColor('#748080').text(`NEXUS GROUP | ${lead.reference} | ${index + 1}`, margin, 808, { lineBreak: false })
  }
  document.end()
  return completed
}
