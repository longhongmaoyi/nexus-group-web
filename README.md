# NEXUS GROUP Website Foundation

A multilingual, CMS-ready website foundation based on the same core stack used by Yiwu Trade Link:

- Next.js **14.2.35** App Router
- React **18.3.1** + TypeScript
- Tailwind CSS
- Prisma **6.7.0**
- PostgreSQL
- English, Chinese and French public frontend
- English and Chinese admin interface
- English default locale (`/en`)

## Design direction

The homepage translates the supplied mockups into a premium modular-infrastructure brand system:

- large cinematic hero
- dark navy, white and forest green palette
- minimal Apple / Tesla-style typography and spacing
- solution cards and project concepts
- Canadian assembly workflow
- global ecosystem, supplier and inquiry sections

The images in `public/images` were cropped from the supplied AI mockups for this private foundation. Replace them with licensed, high-resolution project photography before production.

## Local setup

```bash
cp .env.example .env
npm install
npm run db:up
npm run db:push
npm run dev
```

Open:

- Website: `http://localhost:3000/en`
- Chinese: `http://localhost:3000/zh`
- French: `http://localhost:3000/fr`
- Admin foundation: `http://localhost:3000/admin`

## Phase 1 controlled website builder

The protected CMS is available at `/admin` and manages the current English,
Chinese and French pages through approved blocks only:

- page labels and SEO metadata
- hero, content, feature-grid, process, project and CTA blocks
- block ordering and enable/disable controls
- existing `/public/images` references or HTTPS media references
- private draft preview
- explicit snapshot publishing

Draft saves never overwrite the public snapshot. Existing static content remains
the fallback until each seeded CMS page is reviewed and published.

## Phase 2 visual builder and media

Release 1 of the extended roadmap adds controlled visual-editing capabilities
without turning the CMS into an unrestricted page designer:

- direct public-image uploads through Vercel Blob client uploads
- a PostgreSQL media catalogue with multilingual alt text and metadata
- AVIF, JPEG, PNG and WebP validation with a 10 MB maximum
- safe media archival; referenced files cannot be archived
- existing `/public/images` indexing without copying or changing image files
- drag-and-drop, arrow and explicit-position section ordering
- reusable system and administrator-created section templates
- page duplication into controlled `LANDING` pages
- desktop, tablet and mobile preview in English, Chinese and French
- immutable publication history with versioned rollback
- optimistic draft-save checks to prevent accidental editor overwrites
- audit logging and PostgreSQL-backed rate limits for sensitive admin writes

The public website continues to use the latest explicit published snapshot and
falls back to the static multilingual content when the CMS database is
unavailable.

### Media storage strategy

Production uploads use a **public Vercel Blob store** because website images are
public assets. The browser uploads directly to Blob after the authenticated
server grants a short-lived, constrained token. The Blob write token is never
sent to the browser. Uploads are disabled unless both variables are configured:

```text
CMS_MEDIA_UPLOADS_ENABLED=true
BLOB_READ_WRITE_TOKEN=<provided automatically by the connected Blob store>
```

The store must be connected to the existing `nexus-group-web` Vercel project.
Do not paste the token into source code, GitHub, logs or support messages.
Vercel Blob has a free Hobby allowance, but storage, operations and transfer
limits still apply. Review the current Vercel usage dashboard before uploading
large image collections.

Archiving a media record does not physically delete the Blob object. This is an
intentional rollback safeguard. Physical purge is an operational action and is
not exposed in the CMS.

Phase 4 portal documents use a separate **private Vercel Blob store**. Portal
routes select it explicitly and do not fall back to the public CMS store:

```text
PORTAL_BLOB_READ_WRITE_TOKEN=<private portal store token>
PORTAL_BLOB_STORE_ID=<private portal store id>
PORTAL_BLOB_WEBHOOK_PUBLIC_KEY=<private portal store webhook public key>
```

All three values must be configured in the hosting provider. The existing
`BLOB_READ_WRITE_TOKEN` remains dedicated to public CMS images.

## Phase 5 operating centre

Phase 5 adds one feature-flagged internal operating layer at `/admin/phase5`.
It extends existing leads and portal projects, and adds compliance records,
local partners and internal tasks. Analytics are computed from first-party
database records. CSV and PDF reports use the existing application tooling.

```text
PHASE5_ADMIN_ENABLED=false
PHASE5_INTERNAL_NOTIFICATIONS_ENABLED=false
PHASE5_PUBLIC_COMPLIANCE_ENABLED=false
PHASE5_AI_REVIEW_ENABLED=false
```

The public EN/ZH/FR Compliance Centre is only available when its separate flag
is enabled, and only records with complete reviewed multilingual public fields
are shown. Evidence and internal responsibility fields are never returned.
AI review is an inactive provider boundary only: it is off by default, requires
human review, and cannot perform an automatic production action.

### Phase 2 migration and seed

Migration:

```text
20260730002000_phase2_visual_builder_media
```

It is additive and creates:

- `CmsPublication`
- `CmsSectionTemplate`
- `MediaAsset`
- `MediaReference`
- `AuditLog`
- `RateLimitBucket`

No existing table, page, section, publication snapshot, inquiry, user or public
route is deleted.

After explicit production authorization, use this order:

```bash
npm run db:migrate:deploy
npm run cms:media:index
npm run cms:phase2:seed
```

`cms:media:index` is idempotent and indexes current files under
`public/images`. `cms:phase2:seed` upserts controlled templates and creates a
version-1 history record only for an existing Phase 1 snapshot that has no
history.

Do not use `prisma db push` in production.

### Phase 2 admin workflow

1. Open `/admin/media`, configure accurate EN/ZH/FR alt text, and upload only
   licensed website imagery.
2. Open a page and choose media-library assets rather than pasting URLs.
3. Reorder sections by drag, arrow or position selector.
4. Add a controlled system template or save a reviewed section as a reusable
   custom template.
5. Use Responsive Preview to inspect all languages at desktop, tablet and
   mobile widths.
6. Save the draft. A stale browser tab is rejected instead of overwriting a
   newer save.
7. Publish with an optional release note.
8. Use Publish History to create a new rollback version when required.

Rollback never changes the private working draft. It publishes a new snapshot
based on the chosen historical version, preserving a complete audit trail.

### Phase 2 deployment checkpoint

Production database migration and deployment are separate approvals:

1. Create/connect a Vercel Blob store.
2. Confirm `BLOB_READ_WRITE_TOKEN` exists in Vercel without revealing it.
3. Set `CMS_MEDIA_UPLOADS_ENABLED=true` for Production.
4. Take a Neon restore point or confirm the provider’s recovery window.
5. Run `npm run db:migrate:deploy`.
6. Run the two idempotent Phase 2 seed commands.
7. Deploy the reviewed Release 1 commit.
8. Verify `/admin`, `/admin/media`, one private preview, EN/ZH/FR public pages,
   `www.nexuslife.ca`, the apex redirect and `mail.nexuslife.ca`.

Do not deploy the code before the additive migration is applied because the
admin login rate limiter and audit log use the new tables.

### Operational security notes

- Admin sessions retain the Phase 1 HTTP-only, Secure, SameSite=Strict signed
  cookie.
- Admin writes require same-origin requests and an authenticated session.
- Media uploads require the feature flag, Blob token, allowed MIME type,
  constrained pathname, multilingual alt text and size limit.
- Vercel Blob filenames are immutable and receive random suffixes.
- Media referenced by drafts or publication history cannot be archived.
- Every save, publish, rollback, duplication, template change, media change and
  login result is suitable for audit attribution; authentication and content
  actions are stored without passwords, tokens or database credentials.
- Draft saves include an `updatedAt` precondition to prevent silent concurrent
  overwrites.
- The database rate limiter is intentionally simple. A distributed Redis
  service is not required for this early admin-only workload.

### Phase 2 limitations

- Uploaded images are not automatically cropped or edited. Authors must upload
  an appropriately sized, licensed image.
- Width and height metadata fields are reserved but not auto-populated.
- Physical Blob deletion is deliberately excluded.
- Existing static-image alt text is initially derived from filenames and
  should be reviewed in the media library.
- Custom landing pages are intentionally rendered through the approved NEXUS
  section layout and are not automatically added to global navigation.
- Vercel Blob is an external service and requires a connected store; no paid
  plan is required at low Hobby usage, but plan limits apply.

## Phase 3 business tools

Release 2 adds a controlled business-workflow layer while preserving the
existing website and CMS fallbacks:

- an accessible English, Chinese and French project-intake wizard;
- general, project, supplier, partner and compliance enquiries;
- versioned landed-cost and project-timeline assumptions;
- reproducible saved estimates linked to leads;
- lead status, priority, owner, notes, activity history and safe CSV export;
- private, authenticated multilingual PDF project briefs;
- a provider-neutral SMTP adapter and retry-safe email outbox;
- database-backed rate limiting, honeypot spam protection, signed public CSRF
  tokens, same-origin enforcement and audit logging.

All Phase 3 records are scoped with `organizationKey=nexus`. Public payloads
cannot choose or override that scope. Admin queries and mutations apply the
same scope explicitly.

### Phase 3 feature flags

All new capabilities are disabled by default:

```text
PHASE3_BUSINESS_TOOLS_ENABLED=false
PHASE3_ADMIN_TOOLS_ENABLED=false
PHASE3_EMAIL_NOTIFICATIONS_ENABLED=false
```

The public and admin flags may be enabled independently after the additive
database migration and seed complete. Email must remain disabled until SMTP
credentials are explicitly configured and an authorized mailbox test is
approved.

Optional security configuration:

```text
PHASE3_FORM_SECRET
```

Use a unique random value of at least 32 characters. When omitted, the
existing `ADMIN_SESSION_SECRET` signs public form CSRF tokens.

Optional SMTP configuration:

```text
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASSWORD
SMTP_FROM
PHASE3_ADMIN_NOTIFICATION_EMAIL
```

No mailbox credentials are stored in source code. Hostinger SMTP is compatible
with this adapter, but no real mailbox connection is attempted by the release.
Failed delivery never rolls back a lead submission; messages remain in the
outbox for bounded, idempotent retries.

### Phase 3 database rollout

Migration `20260730003000_phase3_business_tools` is additive. It creates:

```text
BusinessLead
LeadActivity
CostAssumptionVersion
TimelineAssumptionVersion
SavedEstimate
EmailOutbox
```

It does not remove or rewrite any existing CMS, media, publication, admin,
product, project, news, supplier or inquiry data.

After confirming a Neon restore point, apply and seed with:

```bash
npm run db:migrate:deploy
npm run phase3:seed
```

The seed creates only the first immutable active cost and timeline assumption
versions when none exist. Review the business assumptions and multilingual
disclaimers with Canadian logistics, tax, engineering and legal professionals
before enabling the public calculator.

### Phase 3 PDF and email notes

Project briefs are generated only through an authenticated admin route. The
PDF response is not stored at a public URL and includes the saved versioned
assumptions and an indicative-estimate disclaimer. PDFKit embeds a local
Noto Sans CJK SC font so English, Simplified Chinese and French render without
an external font service.

The email outbox is provider-neutral and disabled by default. A scheduled
Vercel invocation or authenticated operations task can call the protected
processor after SMTP is configured; a scheduler is not included in this
release.

### Phase 3 release validation

On the project Mac:

```bash
./scripts/validate-phase3.command
```

The runner validates Prisma, TypeScript, unit tests, lint, the production build
and patch whitespace. It always copies the most useful PASS/FAIL result to the
clipboard. Route integration tests require a disposable migrated PostgreSQL
database and an isolated local administrator:

```bash
npm run test:phase3:routes
```

Never point integration tests at production.

### Phase 3 limitations and decisions

- Cost inputs and percentages are business assumptions, not tax, customs,
  engineering or legal advice and never form a quotation.
- Timeline ranges depend on jurisdiction, approvals, supplier capacity,
  shipping, weather and site readiness.
- The estimator accepts a base-product cost supplied by the visitor; it is not
  a product-pricing database.
- The public workflow does not create customer accounts or expose lead data.
- PDFs are generated on demand for authenticated administrators only.
- SMTP delivery requires separate credentials and an authorized live test.
- CSV files neutralize spreadsheet formulas, but administrators must still
  handle exported personal data under the applicable privacy policy.
- Release A proposes a 24-month limit after last meaningful activity for
  inactive or unsuccessful enquiries, and up to 7 years after the relationship
  ends for records tied to a quotation, contract or completed transaction when
  tax, accounting, warranty, insurance or legal needs justify it. This policy
  must be approved by the business/privacy lead before production publication.
- Website submissions and related records belong to NEXUS, not to an individual
  administrator. Assignment identifies the administrator responsible for the
  next action; it does not transfer ownership or permit export or reuse outside
  authorized NEXUS work. Unassigned leads remain in the shared controlled queue.
- The estimator's duty, tax, engineering and compliance percentages are editable
  planning allowances, not verified rates or professional advice. Only a
  separate written quotation issued by an authorized NEXUS representative can
  set price, scope, exclusions, taxes, validity and acceptance terms.
- The inherited application remains on Next.js 14.2.35. A current dependency
  audit reports advisories that have no patched Next 14 release; upgrading to
  a supported Next.js/React major must be handled as a separately tested
  platform release before enabling Phase 3 in production.

### Release validation

On the project Mac:

```bash
./scripts/validate-phase2.command
```

The runner validates Prisma, TypeScript, unit tests, lint, the production build
and patch whitespace. It always copies the most useful PASS/FAIL result to the
clipboard.

### Local database setup

For a new local database:

```bash
npm run db:migrate:deploy
npm run cms:seed
```

If the database was previously created with `prisma db push`, mark the baseline
before applying the additive CMS migration:

```bash
npx prisma migrate resolve --applied 20260730000000_baseline
npm run db:migrate:deploy
npm run cms:seed
```

Create or rotate an administrator without putting the password in a file:

```bash
read -r "ADMIN_EMAIL?Admin email: "
read -rs "ADMIN_PASSWORD?Admin password (12+ characters): "
echo
export ADMIN_EMAIL ADMIN_PASSWORD
npm run admin:create
unset ADMIN_PASSWORD
```

Set a random `ADMIN_SESSION_SECRET` of at least 32 characters in Vercel. The
admin cookie is HTTP-only, Secure in production, SameSite=Strict, signed with
HMAC-SHA256 and expires after 12 hours. Passwords use salted scrypt hashes.

### Production database

Do not run `prisma db push` against production. For a fresh production database:

```bash
npm run db:migrate:deploy
npm run cms:seed
npm run admin:create
```

For an existing database originally created with `db push`, run the baseline
resolve command shown above once, then deploy. The seed is idempotent and skips
every existing CMS page.

## Important production safeguards

1. Configure `ADMIN_SESSION_SECRET`, apply migrations and create the first administrator before using `/admin`.
2. Contact details, legal pages, company registration details and verified project portfolio content are still required.
3. Project names and images are labelled as concepts to avoid presenting unverified work as completed projects.
4. Review Canadian building-code, certification, warranty and legal claims with qualified local professionals before publishing.
5. Use Prisma migrations for production database changes. Do not use `prisma db push` against production.

## CMS-ready collections

The Prisma schema includes:

- Product
- Project
- NewsPost
- Supplier
- Inquiry
- AdminUser

Each public content collection has English, Chinese and French fields. The admin interface is intentionally English/Chinese only.

## Future integrations already anticipated

- online quotation / RFQ
- AI customer service
- product database
- supplier portal
- customer login
- CRM integration
- additional languages

## Suggested next implementation phases

1. Confirm official company name, logo, domain and contact details.
2. Replace concept imagery with licensed photography and real project content.
3. Add secure admin authentication and CRUD screens.
4. Add product filters, quotation workflow and downloadable brochures.
5. Connect production PostgreSQL and deploy.
