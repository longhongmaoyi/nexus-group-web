const base = process.env.PHASE3_TEST_BASE_URL || 'http://localhost:3103'
const adminEmail = process.env.PHASE3_TEST_ADMIN_EMAIL
const adminPassword = process.env.PHASE3_TEST_ADMIN_PASSWORD

const check = (condition, message) => {
  if (!condition) throw new Error(message)
}

async function main() {
  check(adminEmail && adminPassword, 'Set PHASE3_TEST_ADMIN_EMAIL and PHASE3_TEST_ADMIN_PASSWORD for a disposable local administrator.')
  const root = await fetch(`${base}/`)
  const contact = await fetch(`${base}/en/contact`)
  const contactHtml = await contact.text()
  const config = await fetch(`${base}/api/business-tools/config`)
  const csrf = await fetch(`${base}/api/business-tools/csrf`)
  const csrfJson = await csrf.json()
  const csrfCookie = csrf.headers.get('set-cookie')?.split(';')[0] || ''
  check(root.status === 200, `Root returned ${root.status}`)
  check(contact.status === 200 && contactHtml.includes('NEXUS PROJECT ASSESSMENT'), 'Business wizard not rendered.')
  check(config.status === 200, `Config returned ${config.status}`)
  check(csrf.status === 200 && csrfJson.token && csrfCookie, 'CSRF setup failed.')

  const payload = {
    type: 'PROJECT', locale: 'en', contactName: 'Phase Three Test', contactEmail: 'phase3@example.ca',
    organizationName: 'NEXUS Test', country: 'Canada', province: 'Ontario', municipality: 'Ottawa',
    sector: 'Construction', projectType: 'Remote office', intendedUse: 'Temporary project coordination office',
    sizeCapacity: '20 people', budgetRange: 'CAD 250,000-1 million', targetTimeline: '6-12 months',
    siteReadiness: 'Site identified', complianceNeeds: 'Municipal and electrical review',
    notes: 'Harmless local integration test submission with complete project context.',
    consent: true, consentTextVersion: '2026-07', baseCost: 100000, website: '',
  }
  const lead = await fetch(`${base}/api/business-tools/leads`, {
    method: 'POST',
    headers: { origin: base, 'content-type': 'application/json', 'x-nexus-csrf-token': csrfJson.token, cookie: csrfCookie },
    body: JSON.stringify(payload),
  })
  const leadJson = await lead.json()
  check(lead.status === 201 && leadJson.reference && leadJson.estimateReference, `Lead creation failed: ${lead.status} ${JSON.stringify(leadJson)}`)
  const badOrigin = await fetch(`${base}/api/business-tools/leads`, {
    method: 'POST',
    headers: { origin: 'https://evil.example', 'content-type': 'application/json', 'x-nexus-csrf-token': csrfJson.token, cookie: csrfCookie },
    body: JSON.stringify(payload),
  })
  check(badOrigin.status === 403, `Origin protection returned ${badOrigin.status}`)
  const unauthorized = await fetch(`${base}/api/admin/business-tools/leads`)
  check(unauthorized.status === 401, `Unauthorized admin API returned ${unauthorized.status}`)

  const login = await fetch(`${base}/api/admin/login`, {
    method: 'POST',
    headers: { origin: base, 'content-type': 'application/json' },
    body: JSON.stringify({ email: adminEmail, password: adminPassword }),
  })
  const adminCookie = login.headers.get('set-cookie')?.split(';')[0] || ''
  check(login.status === 200 && adminCookie, `Admin login failed: ${login.status}`)
  const leadList = await fetch(`${base}/api/admin/business-tools/leads`, { headers: { cookie: adminCookie } })
  const listJson = await leadList.json()
  check(leadList.status === 200 && listJson.leads.length >= 1, 'Admin lead list isolation check failed.')
  if (process.env.PHASE3_TEST_FOREIGN_REFERENCE) {
    check(
      !listJson.leads.some((item) => item.reference === process.env.PHASE3_TEST_FOREIGN_REFERENCE),
      'A lead from another organization leaked into the NEXUS admin list.',
    )
  }
  const createdLead = listJson.leads.find((item) => item.reference === leadJson.reference)
  check(createdLead, 'The scoped admin list did not contain the newly created lead.')
  const leadId = createdLead.id
  const detail = await fetch(`${base}/api/admin/business-tools/leads/${leadId}`, { headers: { cookie: adminCookie } })
  check(detail.status === 200, `Lead detail returned ${detail.status}`)
  const adminPage = await fetch(`${base}/admin/leads/${leadId}`, { headers: { cookie: adminCookie } })
  check(adminPage.status === 200, `Lead admin page returned ${adminPage.status}`)
  const configAdmin = await fetch(`${base}/api/admin/business-tools/config`, { headers: { cookie: adminCookie } })
  check(configAdmin.status === 200, `Admin configuration returned ${configAdmin.status}`)
  const update = await fetch(`${base}/api/admin/business-tools/leads/${leadId}`, {
    method: 'PATCH',
    headers: { origin: base, cookie: adminCookie, 'content-type': 'application/json' },
    body: JSON.stringify({ status: 'QUALIFYING', priority: 'HIGH', note: 'Safe local workflow verification.' }),
  })
  check(update.status === 200, `Lead workflow update returned ${update.status}`)
  const csv = await fetch(`${base}/api/admin/business-tools/leads/export`, { headers: { cookie: adminCookie } })
  const csvText = await csv.text()
  check(csv.status === 200 && csvText.includes(leadJson.reference), `CSV export returned ${csv.status}`)
  const brief = await fetch(`${base}/api/admin/business-tools/leads/${leadId}/brief?locale=zh`, { headers: { cookie: adminCookie } })
  const briefBytes = Buffer.from(await brief.arrayBuffer())
  check(brief.status === 200 && briefBytes.subarray(0, 5).toString() === '%PDF-', 'Private PDF brief failed.')
  const output = process.env.PHASE3_TEST_PDF_OUTPUT
  if (output) {
    const fs = await import('node:fs/promises')
    await fs.writeFile(output, briefBytes)
  }
  const emailProcess = await fetch(`${base}/api/admin/business-tools/outbox/process`, {
    method: 'POST',
    headers: { origin: base, cookie: adminCookie },
  })
  const emailJson = await emailProcess.json()
  check(emailProcess.status === 200 && emailJson.disabled === true, 'Disabled email provider did not remain safe.')
  console.log(JSON.stringify({
    root: root.status,
    contact: contact.status,
    config: config.status,
    lead: lead.status,
    badOrigin: badOrigin.status,
    unauthorizedAdmin: unauthorized.status,
    authenticatedAdmin: leadList.status,
    adminPage: adminPage.status,
    adminConfig: configAdmin.status,
    leadUpdate: update.status,
    csv: csv.status,
    pdf: brief.status,
    emailDisabled: emailJson.disabled,
    reference: leadJson.reference,
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
