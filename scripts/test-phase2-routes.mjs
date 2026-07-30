import assert from 'node:assert/strict'

const base = process.env.PHASE2_TEST_BASE_URL
const email = process.env.PHASE2_TEST_ADMIN_EMAIL
const password = process.env.PHASE2_TEST_ADMIN_PASSWORD
if (!base || !email || !password) throw new Error('Phase 2 route-test environment is incomplete.')

const origin = new URL(base).origin
const statuses = {}

async function request(path, options = {}, expected) {
  const response = await fetch(new URL(path, base), options)
  statuses[path] = response.status
  if (expected !== undefined) assert.equal(response.status, expected, `${path} returned ${response.status}`)
  return response
}

const unauthorized = await request('/api/admin/media', {}, 401)
assert.equal((await unauthorized.json()).error, 'Unauthorized')

const login = await request('/api/admin/login', {
  method: 'POST',
  headers: { 'content-type': 'application/json', origin },
  body: JSON.stringify({ email, password }),
}, 200)
const cookie = login.headers.get('set-cookie')?.split(';')[0]
assert.ok(cookie?.startsWith('nexus_admin_session='))

const authHeaders = { cookie }
const writeHeaders = { cookie, origin, 'content-type': 'application/json' }

const mediaResponse = await request('/api/admin/media', { headers: authHeaders }, 200)
const media = await mediaResponse.json()
assert.equal(media.uploadEnabled, false)
assert.ok(media.assets.length > 0)

const templateResponse = await request('/api/admin/templates', { headers: authHeaders }, 200)
const templates = await templateResponse.json()
assert.ok(templates.length >= 3)

const draftResponse = await request('/api/admin/pages/home', { headers: authHeaders }, 200)
const originalDraft = await draftResponse.json()
const savedResponse = await request('/api/admin/pages/home', {
  method: 'PUT',
  headers: writeHeaders,
  body: JSON.stringify(originalDraft),
}, 200)
const savedDraft = await savedResponse.json()

await request('/api/admin/pages/home', {
  method: 'PUT',
  headers: writeHeaders,
  body: JSON.stringify(originalDraft),
}, 409)

const firstAsset = media.assets[0]
const draftWithMedia = structuredClone(savedDraft)
draftWithMedia.sections[0].content.image = firstAsset.url
draftWithMedia.sections[0].content.mediaId = firstAsset.id
const mediaSaveResponse = await request('/api/admin/pages/home', {
  method: 'PUT',
  headers: writeHeaders,
  body: JSON.stringify(draftWithMedia),
}, 200)
assert.ok((await mediaSaveResponse.json()).updatedAt)

await request(`/api/admin/media/${firstAsset.id}/archive`, {
  method: 'POST',
  headers: { cookie, origin },
}, 409)

const duplicateSlug = `phase2-validation-${Date.now()}`
await request('/api/admin/pages/home/duplicate', {
  method: 'POST',
  headers: writeHeaders,
  body: JSON.stringify({ slug: duplicateSlug }),
}, 201)
await request(`/admin/pages/${duplicateSlug}/preview`, { headers: authHeaders }, 200)

await request('/api/admin/pages/home/publish', {
  method: 'POST',
  headers: writeHeaders,
  body: JSON.stringify({ note: 'Phase 2 route validation version 1' }),
}, 200)
await request('/api/admin/pages/home/publish', {
  method: 'POST',
  headers: writeHeaders,
  body: JSON.stringify({ note: 'Phase 2 route validation version 2' }),
}, 200)

const historyResponse = await request('/api/admin/pages/home/publications', { headers: authHeaders }, 200)
const publications = await historyResponse.json()
assert.ok(publications.length >= 2)
const oldest = publications[publications.length - 1]
await request(`/api/admin/pages/home/publications/${oldest.id}/rollback`, {
  method: 'POST',
  headers: { cookie, origin },
}, 200)

await request('/api/admin/media/upload', {
  method: 'POST',
  headers: writeHeaders,
  body: JSON.stringify({}),
}, 503)
await request('/en', {}, 200)
await request('/zh', {}, 200)
await request('/fr', {}, 200)

console.log(`Phase 2 authenticated route checks passed (${Object.keys(statuses).length} endpoints exercised).`)
