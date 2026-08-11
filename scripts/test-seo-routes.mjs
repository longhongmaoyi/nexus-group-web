import assert from 'node:assert/strict'

const baseUrl = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/+$/, '')

async function request(path, redirect = 'follow') {
  const response = await fetch(`${baseUrl}${path}`, { redirect })
  const body = await response.text()
  return { response, body }
}

function expectIncludes(body, value, label) {
  assert.ok(body.includes(value), `${label}: expected ${JSON.stringify(value)}`)
}

function expectExcludes(body, value, label) {
  assert.ok(!body.includes(value), `${label}: did not expect ${JSON.stringify(value)}`)
}

const root = await request('/', 'manual')
assert.equal(root.response.status, 308, 'root locale redirect status')
assert.equal(root.response.headers.get('location'), '/en', 'root locale redirect destination')

const legacy = await request('/en/workforce-camps', 'manual')
assert.equal(legacy.response.status, 308, 'legacy solution redirect status')
assert.equal(legacy.response.headers.get('location'), '/en/solutions#workforce-camps', 'legacy solution redirect destination')

const technology = await request('/en/technology-services')
assert.equal(technology.response.status, 200, 'technology services status')
expectIncludes(technology.body, 'rel="canonical" href="https://www.nexuslife.ca/en/technology-services"', 'technology canonical')
for (const [tag, locale] of [['en-CA', 'en'], ['zh-CN', 'zh'], ['fr-CA', 'fr']]) {
  expectIncludes(technology.body, `hrefLang="${tag}" href="https://www.nexuslife.ca/${locale}/technology-services"`, `technology ${tag} alternate`)
}
expectIncludes(technology.body, 'hrefLang="x-default" href="https://www.nexuslife.ca/en/technology-services"', 'technology x-default alternate')
expectExcludes(technology.body, 'noindex', 'technology robots')

const portal = await request('/en/portal/login')
assert.equal(portal.response.status, 200, 'portal login status')
expectIncludes(portal.body, 'name="robots" content="noindex, nofollow"', 'portal robots')
expectIncludes(portal.body, 'name="googlebot" content="noindex, nofollow"', 'portal Googlebot robots')

const sitemap = await request('/sitemap.xml')
assert.equal(sitemap.response.status, 200, 'sitemap status')
for (const locale of ['en', 'zh', 'fr']) {
  expectIncludes(sitemap.body, `https://www.nexuslife.ca/${locale}/technology-services`, `sitemap technology ${locale}`)
  for (const excluded of ['portal/login', 'book-a-call', 'partner-application', 'supplier-application', 'privacy', 'workforce-camps']) {
    expectExcludes(sitemap.body, `https://www.nexuslife.ca/${locale}/${excluded}`, `sitemap excludes ${locale}/${excluded}`)
  }
}

const robots = await request('/robots.txt')
assert.equal(robots.response.status, 200, 'robots status')
expectIncludes(robots.body, 'Allow: /', 'robots public allow')
expectIncludes(robots.body, 'Disallow: /admin/', 'robots admin exclusion')
expectIncludes(robots.body, 'Disallow: /api/', 'robots API exclusion')
expectIncludes(robots.body, 'Sitemap: https://www.nexuslife.ca/sitemap.xml', 'robots sitemap')

console.log('SEO route and metadata smoke tests passed')
