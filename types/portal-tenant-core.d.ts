declare module '@/lib/portal-tenant-core.mjs' {
  export function tenantScope(tenantId: unknown, id: unknown): { id: string; tenantId: string }
  export function validatePortalProjectInput(value: unknown): { title: string; description: string | null }
  export function validatePortalCommentInput(value: unknown): { body: string; projectId: string | null; quotationId: string | null }
  export function validateQuoteDecision(value: unknown): { decision: 'APPROVED' | 'REJECTED'; comment: string | null }
}

