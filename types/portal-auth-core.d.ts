declare module '@/lib/portal-auth-core.mjs' {
  export const PORTAL_MAX_UPLOAD_BYTES: number
export function normalizePortalEmail(value: unknown): string
export function validatePortalPassword(value: unknown): string
  export function createOpaqueToken(): string
  export function hashOpaqueToken(token: unknown): string
  export function canPortal(role: string, action: string, tenantType?: string): boolean
  export function validatePortalUpload(input: { name: unknown; contentType: unknown; sizeBytes: unknown }): { name: string; contentType: string; sizeBytes: number }
  export function isUsablePortalToken<T extends { kind: string; usedAt?: Date | null; expiresAt: Date }>(record: T | null, expectedKind: string, now?: number): record is T
  export function isActivePortalSession<T extends { revokedAt?: Date | null; expiresAt: Date; user?: { status: string } }>(record: T | null, now?: number): record is T
}
