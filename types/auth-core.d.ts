declare module '@/lib/auth-core.mjs' {
  export type SessionPayload = {
    sub: string
    email: string
    role: string
    exp: number
  }

  export function hashPassword(password: string): string
  export function verifyPassword(password: string, stored: string): boolean
  export function signSession(payload: SessionPayload, secret: string): string
  export function verifySession(token: string | undefined, secret: string, now?: number): SessionPayload | null
}
