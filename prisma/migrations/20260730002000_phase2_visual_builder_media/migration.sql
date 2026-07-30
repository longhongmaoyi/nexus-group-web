CREATE TYPE "MediaStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

CREATE TABLE "CmsPublication" (
  "id" TEXT NOT NULL,
  "pageId" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  "snapshot" JSONB NOT NULL,
  "note" TEXT,
  "publishedById" TEXT,
  "sourcePublicationId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CmsPublication_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CmsSectionTemplate" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "sectionType" TEXT NOT NULL,
  "content" JSONB NOT NULL,
  "system" BOOLEAN NOT NULL DEFAULT false,
  "createdById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CmsSectionTemplate_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MediaAsset" (
  "id" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "downloadUrl" TEXT,
  "pathname" TEXT NOT NULL,
  "originalName" TEXT NOT NULL,
  "contentType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "width" INTEGER,
  "height" INTEGER,
  "altEn" TEXT NOT NULL,
  "altZh" TEXT NOT NULL,
  "altFr" TEXT NOT NULL,
  "storageProvider" TEXT NOT NULL,
  "etag" TEXT,
  "status" "MediaStatus" NOT NULL DEFAULT 'ACTIVE',
  "createdById" TEXT,
  "archivedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MediaReference" (
  "id" TEXT NOT NULL,
  "assetId" TEXT NOT NULL,
  "pageId" TEXT NOT NULL,
  "publicationId" TEXT,
  "source" TEXT NOT NULL,
  "sectionKey" TEXT NOT NULL,
  "fieldPath" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MediaReference_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditLog" (
  "id" TEXT NOT NULL,
  "actorAdminId" TEXT,
  "action" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RateLimitBucket" (
  "key" TEXT NOT NULL,
  "count" INTEGER NOT NULL,
  "windowStartedAt" TIMESTAMP(3) NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("key")
);

CREATE UNIQUE INDEX "CmsPublication_pageId_version_key" ON "CmsPublication"("pageId", "version");
CREATE INDEX "CmsPublication_pageId_createdAt_idx" ON "CmsPublication"("pageId", "createdAt");
CREATE UNIQUE INDEX "CmsSectionTemplate_key_key" ON "CmsSectionTemplate"("key");
CREATE INDEX "CmsSectionTemplate_sectionType_idx" ON "CmsSectionTemplate"("sectionType");
CREATE UNIQUE INDEX "MediaAsset_url_key" ON "MediaAsset"("url");
CREATE UNIQUE INDEX "MediaAsset_pathname_key" ON "MediaAsset"("pathname");
CREATE INDEX "MediaAsset_status_createdAt_idx" ON "MediaAsset"("status", "createdAt");
CREATE INDEX "MediaAsset_contentType_idx" ON "MediaAsset"("contentType");
CREATE INDEX "MediaReference_assetId_source_idx" ON "MediaReference"("assetId", "source");
CREATE INDEX "MediaReference_pageId_source_idx" ON "MediaReference"("pageId", "source");
CREATE INDEX "MediaReference_publicationId_idx" ON "MediaReference"("publicationId");
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
CREATE INDEX "AuditLog_actorAdminId_createdAt_idx" ON "AuditLog"("actorAdminId", "createdAt");
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");
CREATE INDEX "RateLimitBucket_expiresAt_idx" ON "RateLimitBucket"("expiresAt");

ALTER TABLE "CmsPublication" ADD CONSTRAINT "CmsPublication_pageId_fkey"
  FOREIGN KEY ("pageId") REFERENCES "CmsPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CmsPublication" ADD CONSTRAINT "CmsPublication_publishedById_fkey"
  FOREIGN KEY ("publishedById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CmsPublication" ADD CONSTRAINT "CmsPublication_sourcePublicationId_fkey"
  FOREIGN KEY ("sourcePublicationId") REFERENCES "CmsPublication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CmsSectionTemplate" ADD CONSTRAINT "CmsSectionTemplate_createdById_fkey"
  FOREIGN KEY ("createdById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_createdById_fkey"
  FOREIGN KEY ("createdById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MediaReference" ADD CONSTRAINT "MediaReference_assetId_fkey"
  FOREIGN KEY ("assetId") REFERENCES "MediaAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "MediaReference" ADD CONSTRAINT "MediaReference_pageId_fkey"
  FOREIGN KEY ("pageId") REFERENCES "CmsPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MediaReference" ADD CONSTRAINT "MediaReference_publicationId_fkey"
  FOREIGN KEY ("publicationId") REFERENCES "CmsPublication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorAdminId_fkey"
  FOREIGN KEY ("actorAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
