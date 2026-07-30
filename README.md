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
