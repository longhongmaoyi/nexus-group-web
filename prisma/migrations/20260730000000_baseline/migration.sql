-- Baseline for the pre-CMS NEXUS schema. On an existing database created with
-- `prisma db push`, mark this migration as applied before running migrate deploy.
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'QUOTED', 'CLOSED');

CREATE TABLE "AdminUser" (
  "id" TEXT NOT NULL, "email" TEXT NOT NULL, "name" TEXT, "passwordHash" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'EDITOR', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Product" (
  "id" TEXT NOT NULL, "slug" TEXT NOT NULL, "sku" TEXT, "titleEn" TEXT NOT NULL,
  "titleZh" TEXT NOT NULL, "titleFr" TEXT NOT NULL, "descriptionEn" TEXT NOT NULL,
  "descriptionZh" TEXT NOT NULL, "descriptionFr" TEXT NOT NULL, "category" TEXT NOT NULL,
  "coverImage" TEXT, "gallery" JSONB, "specifications" JSONB, "featured" BOOLEAN NOT NULL DEFAULT false,
  "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Project" (
  "id" TEXT NOT NULL, "slug" TEXT NOT NULL, "titleEn" TEXT NOT NULL, "titleZh" TEXT NOT NULL,
  "titleFr" TEXT NOT NULL, "summaryEn" TEXT NOT NULL, "summaryZh" TEXT NOT NULL,
  "summaryFr" TEXT NOT NULL, "industry" TEXT NOT NULL, "country" TEXT, "region" TEXT,
  "coverImage" TEXT, "gallery" JSONB, "concept" BOOLEAN NOT NULL DEFAULT true,
  "featured" BOOLEAN NOT NULL DEFAULT false, "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "NewsPost" (
  "id" TEXT NOT NULL, "slug" TEXT NOT NULL, "titleEn" TEXT NOT NULL, "titleZh" TEXT NOT NULL,
  "titleFr" TEXT NOT NULL, "excerptEn" TEXT NOT NULL, "excerptZh" TEXT NOT NULL,
  "excerptFr" TEXT NOT NULL, "contentEn" TEXT NOT NULL, "contentZh" TEXT NOT NULL,
  "contentFr" TEXT NOT NULL, "coverImage" TEXT, "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
  "publishedAt" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "NewsPost_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Supplier" (
  "id" TEXT NOT NULL, "companyName" TEXT NOT NULL, "contactName" TEXT, "email" TEXT,
  "phone" TEXT, "country" TEXT, "productTypes" TEXT, "certifications" TEXT, "notes" TEXT,
  "approved" BOOLEAN NOT NULL DEFAULT false, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Inquiry" (
  "id" TEXT NOT NULL, "name" TEXT NOT NULL, "email" TEXT NOT NULL, "phone" TEXT,
  "company" TEXT, "country" TEXT, "interest" TEXT, "message" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'en', "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE UNIQUE INDEX "NewsPost_slug_key" ON "NewsPost"("slug");
