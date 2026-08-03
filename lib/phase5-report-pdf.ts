import PDFDocument from 'pdfkit'
import path from 'node:path'

type ProjectRow = {
  reference: string; title: string; status: string; currency: string
  budgetAmount: unknown; contractedAmount: unknown; invoicedAmount: unknown; paidAmount: unknown
  tenant: { name: string }
}

function amount(value: unknown, currency: string) {
  const number = Number(value || 0)
  return `${currency} ${number.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export async function generatePhase5ReportPdf(projects: ProjectRow[], summary: { openTasks: number; complianceAttention: number }) {
  const fontPath = path.join(process.cwd(), 'node_modules', '@fontpkg', 'noto-sans-cjk-sc', 'NotoSansCJKsc-Regular.otf')
  const doc = new PDFDocument({ size: 'A4', font: fontPath, margins: { top: 48, right: 42, bottom: 48, left: 42 }, info: { Title: 'NEXUS Phase 5 operating report', Author: 'NEXUS GROUP' } })
  doc.registerFont('NexusSans', fontPath).font('NexusSans')
  const chunks: Buffer[] = []
  doc.on('data', (chunk: Buffer) => chunks.push(chunk))
  const complete = new Promise<Buffer>((resolve, reject) => { doc.on('end', () => resolve(Buffer.concat(chunks))); doc.on('error', reject) })
  doc.font('NexusSans').fontSize(20).fillColor('#0b2528').text('NEXUS PHASE 5 OPERATING REPORT')
  doc.font('NexusSans').fontSize(9).fillColor('#64748b').text(`Generated ${new Date().toISOString()} · Internal use only`)
  doc.moveDown().font('NexusSans').fontSize(12).fillColor('#1a6887').text(`Active/open tasks: ${summary.openTasks}     Compliance attention: ${summary.complianceAttention}`)
  doc.moveDown()
  for (const project of projects) {
    if (doc.y > 720) doc.addPage()
    doc.font('NexusSans').fontSize(11).fillColor('#0f172a').text(`${project.reference} · ${project.title}`)
    doc.font('NexusSans').fontSize(9).fillColor('#475569').text(`${project.tenant.name} · ${project.status}`)
    doc.text(`Budget ${amount(project.budgetAmount, project.currency)}  |  Contracted ${amount(project.contractedAmount, project.currency)}  |  Invoiced ${amount(project.invoicedAmount, project.currency)}  |  Paid ${amount(project.paidAmount, project.currency)}`)
    doc.moveDown(0.7)
  }
  if (!projects.length) doc.font('NexusSans').fontSize(10).text('No project financial records are available.')
  doc.moveDown().font('NexusSans').fontSize(8).fillColor('#64748b').text('Operational summary only. This report is not an accounting statement, tax document, quotation, or regulatory approval.')
  doc.end()
  return complete
}
