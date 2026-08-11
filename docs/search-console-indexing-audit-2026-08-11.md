# Google Search Console indexing audit — 2026-08-11

Property: `sc-domain:nexuslife.ca`
Search Console report last updated: 2026-08-07

## Excluded by `noindex` tag — 13 URLs

### Intentional exclusions — preserve

- `https://www.nexuslife.ca/en/partner-application`
- `https://www.nexuslife.ca/zh/partner-application`
- `https://www.nexuslife.ca/fr/partner-application`
- `https://www.nexuslife.ca/en/book-a-call`
- `https://www.nexuslife.ca/zh/book-a-call`
- `https://www.nexuslife.ca/fr/book-a-call`
- `https://www.nexuslife.ca/fr/supplier-application`
- `https://www.nexuslife.ca/en/privacy`
- `https://www.nexuslife.ca/zh/privacy`
- `https://www.nexuslife.ca/fr/privacy`

The application, call-booking and privacy routes are utility/legal pages rather than search landing pages. They remain crawlable but excluded from indexing and from the sitemap.

### Needs code/config changes

- `https://www.nexuslife.ca/en/technology-services`
- `https://www.nexuslife.ca/zh/technology-services`
- `https://www.nexuslife.ca/fr/technology-services`

Technology Services is linked from the primary navigation and is a public search landing page. The repair removes `noindex`, uses the shared canonical/hreflang metadata builder and adds all three locale URLs to the sitemap.

## Page with redirect — 8 URLs

### Intentional redirects — preserve

- `https://www.nexuslife.ca/fr/commercial-kiosks` → `/fr/solutions#commercial-kiosks`
- `https://www.nexuslife.ca/zh/workforce-camps` → `/zh/solutions#workforce-camps`
- `https://www.nexuslife.ca/en/industries` → `/en/solutions#industries`
- `https://www.nexuslife.ca/en/modular-living` → `/en/solutions#tourism-hospitality`
- `https://www.nexuslife.ca/en/multi-unit-builds` → `/en/solutions#multi-unit-buildings`
- `https://www.nexuslife.ca/en/tourism-hospitality` → `/en/solutions#tourism-hospitality`
- `https://www.nexuslife.ca/en/workforce-camps` → `/en/solutions#workforce-camps`
- `https://nexuslife.ca/` → the canonical `www.nexuslife.ca` host

These are legacy consolidated solution routes or the non-canonical hostname. They remain excluded from the sitemap and redirect permanently where controlled by the application.

## Duplicate without user-selected canonical — 3 URLs

### Needs code/config changes

- `https://www.nexuslife.ca/en/portal/login`
- `https://www.nexuslife.ca/zh/portal/login`
- `https://www.nexuslife.ca/fr/portal/login`

Portal authentication and private portal routes are not public search content. A portal layout now emits `noindex, nofollow` for every localized portal route so Google does not treat the login variants as duplicate public pages.

## Related consistency repairs

- `/` now permanently redirects to `/en` instead of serving a second English homepage with a conflicting self-canonical.
- The public compliance page now uses the same canonical, hreflang, Open Graph and robots metadata builder as other indexable pages.
- Sitemap entries contain only canonical, indexable locale URLs and include Technology Services.
- `robots.txt` continues to allow public crawling and disallow admin, API and development-only paths.

No URL in the three Search Console example lists was already fixed on the inspected `main` revision. The intentional exclusions and redirects required no change; the six URLs identified above required the focused code/config repair.
