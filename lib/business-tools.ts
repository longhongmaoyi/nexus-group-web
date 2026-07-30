import type { Prisma } from '@prisma/client'
import { getPrisma } from '@/lib/prisma'
import { asJson } from '@/lib/cms'
import {
  calculateLandedCost,
  calculateTimeline,
  createReference,
  NEXUS_ORGANIZATION_KEY,
  type LeadSubmission,
} from '@/lib/phase3-core.mjs'

export const DEFAULT_COST_ASSUMPTIONS = {
  freightPct: 12,
  dutyPct: 6,
  taxPct: 5,
  inlandTransportPct: 4,
  installationPct: 18,
  engineeringPct: 8,
  contingencyPct: 10,
  marginPct: 0,
}

export const DEFAULT_TIMELINE_STAGES = [
  { key: 'discovery', labelEn: 'Discovery', labelZh: '需求探索', labelFr: 'Découverte', minWeeks: 1, maxWeeks: 3, parallelGroup: null },
  { key: 'design', labelEn: 'Design', labelZh: '设计', labelFr: 'Conception', minWeeks: 3, maxWeeks: 8, parallelGroup: null },
  { key: 'supplier-verification', labelEn: 'Supplier verification', labelZh: '供应商核验', labelFr: 'Vérification du fournisseur', minWeeks: 2, maxWeeks: 4, parallelGroup: 'preproduction' },
  { key: 'certification-testing', labelEn: 'Certification and testing', labelZh: '认证与测试', labelFr: 'Certification et essais', minWeeks: 4, maxWeeks: 12, parallelGroup: 'preproduction' },
  { key: 'production', labelEn: 'Production', labelZh: '生产', labelFr: 'Production', minWeeks: 6, maxWeeks: 16, parallelGroup: null },
  { key: 'shipping', labelEn: 'Shipping', labelZh: '国际运输', labelFr: 'Transport maritime', minWeeks: 4, maxWeeks: 8, parallelGroup: 'delivery' },
  { key: 'site-works', labelEn: 'Site works', labelZh: '场地工程', labelFr: 'Travaux de site', minWeeks: 4, maxWeeks: 12, parallelGroup: 'delivery' },
  { key: 'customs', labelEn: 'Customs', labelZh: '清关', labelFr: 'Douanes', minWeeks: 1, maxWeeks: 3, parallelGroup: null },
  { key: 'installation', labelEn: 'Installation', labelZh: '安装', labelFr: 'Installation', minWeeks: 2, maxWeeks: 8, parallelGroup: null },
  { key: 'commissioning', labelEn: 'Inspection and commissioning', labelZh: '验收与调试', labelFr: 'Inspection et mise en service', minWeeks: 1, maxWeeks: 4, parallelGroup: null },
]

export const DISCLAIMERS = {
  cost: {
    en: 'This planning estimate is indicative only and is not a quotation, offer, or guarantee. Actual costs depend on design, jurisdiction, supplier terms, exchange rates, duties, taxes, site conditions, professional services, permits, and market conditions.',
    zh: '本规划估算仅供参考，不构成报价、要约或保证。实际成本取决于设计、司法辖区、供应商条款、汇率、关税、税费、场地条件、专业服务、许可及市场情况。',
    fr: 'Cette estimation de planification est indicative seulement et ne constitue ni un devis, ni une offre, ni une garantie. Les coûts réels dépendent de la conception, du territoire, des fournisseurs, des taux de change, des droits, des taxes, du site, des services professionnels, des permis et du marché.',
  },
  timeline: {
    en: 'This timeline is an early planning range. Project duration depends on jurisdiction, design completeness, approvals, testing, supplier capacity, transport, customs, site readiness, weather, inspections, and other project-specific conditions.',
    zh: '本时间表为早期规划范围。项目工期取决于司法辖区、设计完整度、审批、测试、供应商产能、运输、清关、场地准备、天气、检查及其他项目特定条件。',
    fr: 'Cet échéancier constitue une première fourchette de planification. La durée dépend du territoire, de la conception, des approbations, des essais, de la capacité du fournisseur, du transport, des douanes, du site, de la météo et des inspections.',
  },
}

export async function getActiveAssumptions() {
  const prisma = await getPrisma()
  const [cost, timeline] = await Promise.all([
    prisma.costAssumptionVersion.findFirst({
      where: { organizationKey: NEXUS_ORGANIZATION_KEY, active: true },
      orderBy: { version: 'desc' },
    }),
    prisma.timelineAssumptionVersion.findFirst({
      where: { organizationKey: NEXUS_ORGANIZATION_KEY, active: true },
      orderBy: { version: 'desc' },
    }),
  ])
  return { cost, timeline }
}

export async function createLeadWithEstimate(input: LeadSubmission & {
  baseCost?: number | null
  sourceMetadata?: Record<string, unknown>
}) {
  const prisma = await getPrisma()
  const { cost, timeline } = await getActiveAssumptions()
  const reference = createReference('NX')
  const estimateReference = createReference('EST')
  const baseCost = Number(input.baseCost || 0)
  const costResult = cost && baseCost > 0 ? calculateLandedCost(baseCost, cost.assumptions) : null
  const timelineResult = timeline ? calculateTimeline(timeline.stages, timeline.uncertaintyPct) : null

  return prisma.$transaction(async (tx) => {
    const lead = await tx.businessLead.create({
      data: {
        organizationKey: NEXUS_ORGANIZATION_KEY,
        reference,
        type: input.type,
        locale: input.locale,
        contactName: input.contactName,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone,
        organizationName: input.organizationName,
        country: input.country,
        province: input.province,
        municipality: input.municipality,
        sector: input.sector,
        projectType: input.projectType,
        intendedUse: input.intendedUse,
        sizeCapacity: input.sizeCapacity,
        budgetRange: input.budgetRange,
        targetTimeline: input.targetTimeline,
        siteReadiness: input.siteReadiness,
        complianceNeeds: input.complianceNeeds,
        notes: input.notes,
        consent: input.consent,
        consentAt: new Date(),
        consentTextVersion: input.consentTextVersion,
        sourceMetadata: input.sourceMetadata ? asJson(input.sourceMetadata) : undefined,
        activities: {
          create: {
            organizationKey: NEXUS_ORGANIZATION_KEY,
            kind: 'LEAD_CREATED',
            body: 'Website submission received.',
            metadata: asJson({ type: input.type, locale: input.locale }),
          },
        },
      },
    })

    const estimate = costResult || timelineResult ? await tx.savedEstimate.create({
      data: {
        organizationKey: NEXUS_ORGANIZATION_KEY,
        reference: estimateReference,
        leadId: lead.id,
        locale: input.locale,
        input: asJson({ baseCost: baseCost || null }),
        costResult: costResult ? asJson(costResult) : undefined,
        timelineResult: timelineResult ? asJson(timelineResult) : undefined,
        costAssumptionVersionId: costResult ? cost?.id : null,
        timelineVersionId: timelineResult ? timeline?.id : null,
      },
    }) : null

    await queueLeadEmails(tx, lead, estimate)
    return { lead, estimate }
  }, { isolationLevel: 'Serializable' as Prisma.TransactionIsolationLevel })
}

async function queueLeadEmails(
  tx: Prisma.TransactionClient,
  lead: { id: string; reference: string; locale: string; contactName: string; contactEmail: string; type: string },
  estimate: { id: string; reference: string } | null,
) {
  const locale = ['en', 'zh', 'fr'].includes(lead.locale) ? lead.locale : 'en'
  const acknowledgement = acknowledgementTemplate(locale, lead.contactName, lead.reference)
  const admin = adminNotificationTemplate(locale, lead)
  const adminRecipient = process.env.PHASE3_ADMIN_NOTIFICATION_EMAIL?.trim()
  await tx.emailOutbox.create({
    data: {
      organizationKey: NEXUS_ORGANIZATION_KEY,
      leadId: lead.id,
      dedupeKey: `lead:${lead.id}:ack:v1`,
      templateKey: 'LEAD_ACKNOWLEDGEMENT_V1',
      locale,
      recipient: lead.contactEmail,
      subject: acknowledgement.subject,
      textBody: acknowledgement.text,
      htmlBody: acknowledgement.html,
    },
  })
  if (adminRecipient) {
    await tx.emailOutbox.create({
      data: {
        organizationKey: NEXUS_ORGANIZATION_KEY,
        leadId: lead.id,
        dedupeKey: `lead:${lead.id}:admin:v1`,
        templateKey: 'ADMIN_LEAD_NOTIFICATION_V1',
        locale: 'en',
        recipient: adminRecipient,
        replyTo: lead.contactEmail,
        subject: admin.subject,
        textBody: `${admin.text}${estimate ? `\nEstimate: ${estimate.reference}` : ''}`,
        htmlBody: `${admin.html}${estimate ? `<p>Estimate: ${escapeHtml(estimate.reference)}</p>` : ''}`,
      },
    })
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character] || character))
}

export function acknowledgementTemplate(locale: string, name: string, reference: string) {
  const variants = {
    en: {
      subject: `NEXUS project assessment received - ${reference}`,
      greeting: `Hello ${name},`,
      body: `Thank you. NEXUS has received your enquiry. Reference: ${reference}. Our team will review the information before recommending the next step.`,
      note: 'Any cost or timeline information is indicative only and is not a quotation or approval.',
    },
    zh: {
      subject: `NEXUS 已收到您的项目评估 - ${reference}`,
      greeting: `${name}，您好：`,
      body: `感谢您。NEXUS 已收到您的咨询。参考编号：${reference}。我们的团队将审核资料并建议下一步安排。`,
      note: '任何成本或时间信息仅供参考，不构成报价或审批。',
    },
    fr: {
      subject: `Évaluation NEXUS reçue - ${reference}`,
      greeting: `Bonjour ${name},`,
      body: `Merci. NEXUS a reçu votre demande. Référence : ${reference}. Notre équipe examinera les renseignements avant de recommander la prochaine étape.`,
      note: 'Toute information de coût ou de délai est indicative et ne constitue ni un devis ni une approbation.',
    },
  } as const
  const copy = variants[locale as keyof typeof variants] || variants.en
  const text = `${copy.greeting}\n\n${copy.body}\n\n${copy.note}\n\nNEXUS GROUP`
  return { subject: copy.subject, text, html: `<p>${escapeHtml(copy.greeting)}</p><p>${escapeHtml(copy.body)}</p><p><small>${escapeHtml(copy.note)}</small></p><p>NEXUS GROUP</p>` }
}

function adminNotificationTemplate(_: string, lead: { reference: string; type: string; contactName: string; contactEmail: string }) {
  const subject = `New NEXUS ${lead.type.toLowerCase()} lead - ${lead.reference}`
  const text = `A new lead was received.\nReference: ${lead.reference}\nType: ${lead.type}\nContact: ${lead.contactName}\nEmail: ${lead.contactEmail}`
  return { subject, text, html: `<p>A new lead was received.</p><p><strong>${escapeHtml(lead.reference)}</strong><br>Type: ${escapeHtml(lead.type)}<br>Contact: ${escapeHtml(lead.contactName)}<br>Email: ${escapeHtml(lead.contactEmail)}</p>` }
}
