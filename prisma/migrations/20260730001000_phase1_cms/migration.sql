CREATE TABLE "CmsPage" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "pageType" TEXT NOT NULL DEFAULT 'STANDARD',
  "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
  "labelEn" TEXT NOT NULL,
  "labelZh" TEXT NOT NULL,
  "labelFr" TEXT NOT NULL,
  "seoTitleEn" TEXT NOT NULL,
  "seoTitleZh" TEXT NOT NULL,
  "seoTitleFr" TEXT NOT NULL,
  "seoDescriptionEn" TEXT NOT NULL,
  "seoDescriptionZh" TEXT NOT NULL,
  "seoDescriptionFr" TEXT NOT NULL,
  "publishedSnapshot" JSONB,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CmsPage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CmsSection" (
  "id" TEXT NOT NULL,
  "pageId" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "position" INTEGER NOT NULL,
  "enabled" BOOLEAN NOT NULL DEFAULT true,
  "content" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CmsSection_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CmsPage_slug_key" ON "CmsPage"("slug");
CREATE INDEX "CmsPage_status_idx" ON "CmsPage"("status");
CREATE INDEX "CmsSection_pageId_position_idx" ON "CmsSection"("pageId", "position");
CREATE UNIQUE INDEX "CmsSection_pageId_key_key" ON "CmsSection"("pageId", "key");
CREATE UNIQUE INDEX "CmsSection_pageId_position_key" ON "CmsSection"("pageId", "position");
ALTER TABLE "CmsSection" ADD CONSTRAINT "CmsSection_pageId_fkey"
  FOREIGN KEY ("pageId") REFERENCES "CmsPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
