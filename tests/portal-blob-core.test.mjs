import test from 'node:test'
import assert from 'node:assert/strict'

import { getPortalBlobConfig } from '../lib/portal-blob-core.mjs'

const portalEnv = {
  PORTAL_BLOB_READ_WRITE_TOKEN: 'portal-token',
  PORTAL_BLOB_STORE_ID: 'portal-store',
  PORTAL_BLOB_WEBHOOK_PUBLIC_KEY: 'portal-public-key',
  BLOB_READ_WRITE_TOKEN: 'cms-token',
}

test('portal Blob config uses only the dedicated portal variables', () => {
  assert.deepEqual(getPortalBlobConfig(portalEnv), {
    token: 'portal-token',
    storeId: 'portal-store',
    webhookPublicKey: 'portal-public-key',
  })
})

test('portal Blob config never falls back to the CMS token', () => {
  assert.equal(getPortalBlobConfig({ BLOB_READ_WRITE_TOKEN: 'cms-token' }), null)
  for (const missing of Object.keys(portalEnv).filter((key) => key.startsWith('PORTAL_BLOB_'))) {
    assert.equal(getPortalBlobConfig({ ...portalEnv, [missing]: '' }), null)
  }
})
