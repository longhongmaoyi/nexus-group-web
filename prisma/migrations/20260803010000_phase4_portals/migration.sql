-- CreateEnum
CREATE TYPE "PortalTenantType" AS ENUM ('CLIENT', 'SUPPLIER');

-- CreateEnum
CREATE TYPE "PortalAccountStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "PortalMembershipRole" AS ENUM ('OWNER', 'MANAGER', 'MEMBER', 'VIEWER');

-- CreateEnum
CREATE TYPE "PortalTokenKind" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "PortalProjectStatus" AS ENUM ('INTAKE', 'PLANNING', 'QUOTING', 'APPROVAL', 'DELIVERY', 'COMPLETED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "PortalDocumentVisibility" AS ENUM ('TENANT', 'NEXUS_ONLY', 'SHARED');

-- CreateEnum
CREATE TYPE "PortalDocumentStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PortalQuotationStatus" AS ENUM ('DRAFT', 'SENT', 'APPROVED', 'REJECTED', 'EXPIRED', 'WITHDRAWN');

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "portalTenantId" TEXT,
ADD COLUMN     "verificationStatus" TEXT NOT NULL DEFAULT 'UNVERIFIED',
ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedByAdminId" TEXT;

-- CreateTable
CREATE TABLE "PortalTenant" (
    "id" TEXT NOT NULL,
    "organizationKey" TEXT NOT NULL DEFAULT 'nexus',
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PortalTenantType" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortalTenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "status" "PortalAccountStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "emailVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortalUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalMembership" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "PortalMembershipRole" NOT NULL DEFAULT 'MEMBER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortalMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortalSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalAuthToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "PortalTokenKind" NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortalAuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalProject" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "PortalProjectStatus" NOT NULL DEFAULT 'INTAKE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortalProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalDocument" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "projectId" TEXT,
    "uploaderId" TEXT,
    "verifiedByAdminId" TEXT,
    "supplierId" TEXT,
    "productId" TEXT,
    "name" TEXT NOT NULL,
    "pathname" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "visibility" "PortalDocumentVisibility" NOT NULL DEFAULT 'TENANT',
    "status" "PortalDocumentStatus" NOT NULL DEFAULT 'PENDING',
    "checksum" TEXT,
    "libraryPublishedAt" TIMESTAMP(3),
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalQuotation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdByAdminId" TEXT,
    "number" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'CAD',
    "totalAmount" DECIMAL(14,2),
    "lineItems" JSONB NOT NULL,
    "assumptions" JSONB,
    "exclusions" JSONB,
    "status" "PortalQuotationStatus" NOT NULL DEFAULT 'DRAFT',
    "validUntil" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortalQuotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalQuoteDecision" (
    "id" TEXT NOT NULL,
    "quotationId" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortalQuoteDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalComment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "projectId" TEXT,
    "quotationId" TEXT,
    "portalUserId" TEXT,
    "adminUserId" TEXT,
    "body" TEXT NOT NULL,
    "internal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortalComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalAuditEvent" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "portalUserId" TEXT,
    "adminUserId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortalAuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortalTenant_slug_key" ON "PortalTenant"("slug");

-- CreateIndex
CREATE INDEX "PortalTenant_organizationKey_type_active_idx" ON "PortalTenant"("organizationKey", "type", "active");

-- CreateIndex
CREATE UNIQUE INDEX "PortalUser_email_key" ON "PortalUser"("email");

-- CreateIndex
CREATE INDEX "PortalUser_status_createdAt_idx" ON "PortalUser"("status", "createdAt");

-- CreateIndex
CREATE INDEX "PortalMembership_userId_active_idx" ON "PortalMembership"("userId", "active");

-- CreateIndex
CREATE INDEX "PortalMembership_tenantId_role_active_idx" ON "PortalMembership"("tenantId", "role", "active");

-- CreateIndex
CREATE UNIQUE INDEX "PortalMembership_tenantId_userId_key" ON "PortalMembership"("tenantId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PortalSession_tokenHash_key" ON "PortalSession"("tokenHash");

-- CreateIndex
CREATE INDEX "PortalSession_userId_expiresAt_idx" ON "PortalSession"("userId", "expiresAt");

-- CreateIndex
CREATE INDEX "PortalSession_expiresAt_revokedAt_idx" ON "PortalSession"("expiresAt", "revokedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PortalAuthToken_tokenHash_key" ON "PortalAuthToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PortalAuthToken_userId_kind_expiresAt_idx" ON "PortalAuthToken"("userId", "kind", "expiresAt");

-- CreateIndex
CREATE INDEX "PortalProject_tenantId_status_updatedAt_idx" ON "PortalProject"("tenantId", "status", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PortalProject_tenantId_reference_key" ON "PortalProject"("tenantId", "reference");

-- CreateIndex
CREATE UNIQUE INDEX "PortalDocument_pathname_key" ON "PortalDocument"("pathname");

-- CreateIndex
CREATE UNIQUE INDEX "PortalDocument_url_key" ON "PortalDocument"("url");

-- CreateIndex
CREATE INDEX "PortalDocument_tenantId_status_createdAt_idx" ON "PortalDocument"("tenantId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "PortalDocument_tenantId_projectId_visibility_idx" ON "PortalDocument"("tenantId", "projectId", "visibility");

-- CreateIndex
CREATE INDEX "PortalDocument_supplierId_libraryPublishedAt_idx" ON "PortalDocument"("supplierId", "libraryPublishedAt");

-- CreateIndex
CREATE INDEX "PortalDocument_productId_libraryPublishedAt_idx" ON "PortalDocument"("productId", "libraryPublishedAt");

-- CreateIndex
CREATE INDEX "PortalQuotation_tenantId_status_updatedAt_idx" ON "PortalQuotation"("tenantId", "status", "updatedAt");

-- CreateIndex
CREATE INDEX "PortalQuotation_projectId_status_idx" ON "PortalQuotation"("projectId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "PortalQuotation_tenantId_number_version_key" ON "PortalQuotation"("tenantId", "number", "version");

-- CreateIndex
CREATE INDEX "PortalQuoteDecision_quotationId_createdAt_idx" ON "PortalQuoteDecision"("quotationId", "createdAt");

-- CreateIndex
CREATE INDEX "PortalQuoteDecision_membershipId_createdAt_idx" ON "PortalQuoteDecision"("membershipId", "createdAt");

-- CreateIndex
CREATE INDEX "PortalComment_tenantId_createdAt_idx" ON "PortalComment"("tenantId", "createdAt");

-- CreateIndex
CREATE INDEX "PortalComment_projectId_createdAt_idx" ON "PortalComment"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "PortalComment_quotationId_createdAt_idx" ON "PortalComment"("quotationId", "createdAt");

-- CreateIndex
CREATE INDEX "PortalAuditEvent_tenantId_createdAt_idx" ON "PortalAuditEvent"("tenantId", "createdAt");

-- CreateIndex
CREATE INDEX "PortalAuditEvent_tenantId_entityType_entityId_idx" ON "PortalAuditEvent"("tenantId", "entityType", "entityId");

-- CreateIndex
CREATE INDEX "PortalAuditEvent_portalUserId_createdAt_idx" ON "PortalAuditEvent"("portalUserId", "createdAt");

-- CreateIndex
CREATE INDEX "PortalAuditEvent_adminUserId_createdAt_idx" ON "PortalAuditEvent"("adminUserId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_portalTenantId_key" ON "Supplier"("portalTenantId");

-- CreateIndex
CREATE INDEX "Supplier_verificationStatus_idx" ON "Supplier"("verificationStatus");

-- CreateIndex
CREATE INDEX "Supplier_verifiedByAdminId_idx" ON "Supplier"("verifiedByAdminId");

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_portalTenantId_fkey" FOREIGN KEY ("portalTenantId") REFERENCES "PortalTenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_verifiedByAdminId_fkey" FOREIGN KEY ("verifiedByAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalMembership" ADD CONSTRAINT "PortalMembership_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "PortalTenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalMembership" ADD CONSTRAINT "PortalMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PortalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalSession" ADD CONSTRAINT "PortalSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PortalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalAuthToken" ADD CONSTRAINT "PortalAuthToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PortalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalProject" ADD CONSTRAINT "PortalProject_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "PortalTenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalDocument" ADD CONSTRAINT "PortalDocument_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "PortalTenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalDocument" ADD CONSTRAINT "PortalDocument_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "PortalProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalDocument" ADD CONSTRAINT "PortalDocument_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "PortalUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalDocument" ADD CONSTRAINT "PortalDocument_verifiedByAdminId_fkey" FOREIGN KEY ("verifiedByAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalDocument" ADD CONSTRAINT "PortalDocument_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalDocument" ADD CONSTRAINT "PortalDocument_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalQuotation" ADD CONSTRAINT "PortalQuotation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "PortalTenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalQuotation" ADD CONSTRAINT "PortalQuotation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "PortalProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalQuotation" ADD CONSTRAINT "PortalQuotation_createdByAdminId_fkey" FOREIGN KEY ("createdByAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalQuoteDecision" ADD CONSTRAINT "PortalQuoteDecision_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "PortalQuotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalQuoteDecision" ADD CONSTRAINT "PortalQuoteDecision_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "PortalMembership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalComment" ADD CONSTRAINT "PortalComment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "PortalTenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalComment" ADD CONSTRAINT "PortalComment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "PortalProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalComment" ADD CONSTRAINT "PortalComment_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "PortalQuotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalComment" ADD CONSTRAINT "PortalComment_portalUserId_fkey" FOREIGN KEY ("portalUserId") REFERENCES "PortalUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalComment" ADD CONSTRAINT "PortalComment_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalAuditEvent" ADD CONSTRAINT "PortalAuditEvent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "PortalTenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalAuditEvent" ADD CONSTRAINT "PortalAuditEvent_portalUserId_fkey" FOREIGN KEY ("portalUserId") REFERENCES "PortalUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalAuditEvent" ADD CONSTRAINT "PortalAuditEvent_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

