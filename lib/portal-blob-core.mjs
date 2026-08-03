export function getPortalBlobConfig(env = process.env) {
  const token = String(env.PORTAL_BLOB_READ_WRITE_TOKEN || '').trim()
  const storeId = String(env.PORTAL_BLOB_STORE_ID || '').trim()
  const webhookPublicKey = String(env.PORTAL_BLOB_WEBHOOK_PUBLIC_KEY || '').trim()

  if (!token || !storeId || !webhookPublicKey) return null
  return { token, storeId, webhookPublicKey }
}
