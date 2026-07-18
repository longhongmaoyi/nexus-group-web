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

## Important production safeguards

1. The project does **not** include admin authentication yet. Add authentication and authorization before deployment.
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
