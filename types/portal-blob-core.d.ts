declare module '@/lib/portal-blob-core.mjs' {
  export type PortalBlobConfig = {
    token: string
    storeId: string
    webhookPublicKey: string
  }

  export function getPortalBlobConfig(env?: NodeJS.ProcessEnv): PortalBlobConfig | null
}
