export function tenantScope(tenantId, id) {
  const tenant = String(tenantId || '')
  const entity = String(id || '')
  if (!tenant || !entity) throw new Error('Tenant and entity identifiers are required.')
  return { id: entity, tenantId: tenant }
}

export function validatePortalProjectInput(value) {
  const record = value && typeof value === 'object' ? value : {}
  const title = String(record.title || '').trim().slice(0, 180)
  const description = String(record.description || '').trim().slice(0, 5000) || null
  if (title.length < 3) throw new Error('Project title is required.')
  return { title, description }
}

export function validatePortalCommentInput(value) {
  const record = value && typeof value === 'object' ? value : {}
  const body = String(record.body || '').trim().slice(0, 5000)
  const projectId = String(record.projectId || '').trim() || null
  const quotationId = String(record.quotationId || '').trim() || null
  if (body.length < 1) throw new Error('Comment is required.')
  if (!projectId && !quotationId) throw new Error('A project or quotation is required.')
  return { body, projectId, quotationId }
}

export function validateQuoteDecision(value) {
  const record = value && typeof value === 'object' ? value : {}
  const decision = String(record.decision || '').toUpperCase()
  const comment = String(record.comment || '').trim().slice(0, 5000) || null
  if (!['APPROVED', 'REJECTED'].includes(decision)) throw new Error('Decision must be approved or rejected.')
  return { decision, comment }
}

