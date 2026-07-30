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
