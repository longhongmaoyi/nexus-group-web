-- Phase 5 is additive only. Existing Phase 1-4 data and storage are unchanged.
CREATE TYPE "ComplianceStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'READY_FOR_REVIEW', 'VERIFIED', 'BLOCKED', 'NOT_APPLICABLE');
CREATE TYPE "PartnerVerificationStatus" AS ENUM ('UNVERIFIED', 'IN_REVIEW', 'VERIFIED', 'SUSPENDED');
CREATE TYPE "InternalTaskStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'BLOCKED', 'DONE', 'CANCELLED');

ALTER TABLE "BusinessLead" ADD COLUMN "dueDate" TIMESTAMP(3), ADD COLUMN "nextAction" TEXT, ADD COLUMN "portalProjectId" TEXT;
ALTER TABLE "EmailOutbox" ADD COLUMN "internalTaskId" TEXT;
ALTER TABLE "PortalProject" ADD COLUMN "budgetAmount" DECIMAL(14,2), ADD COLUMN "contractedAmount" DECIMAL(14,2), ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'CAD', ADD COLUMN "dueDate" TIMESTAMP(3), ADD COLUMN "invoicedAmount" DECIMAL(14,2), ADD COLUMN "nextAction" TEXT, ADD COLUMN "ownerAdminId" TEXT, ADD COLUMN "paidAmount" DECIMAL(14,2), ADD COLUMN "priority" "LeadPriority" NOT NULL DEFAULT 'NORMAL';

CREATE TABLE "ComplianceRecord" (
  "id" TEXT NOT NULL, "organizationKey" TEXT NOT NULL DEFAULT 'nexus', "projectId" TEXT, "evidenceDocumentId" TEXT, "responsibleAdminId" TEXT,
  "jurisdiction" TEXT NOT NULL, "projectUse" TEXT NOT NULL, "category" TEXT NOT NULL, "requirement" TEXT NOT NULL,
  "status" "ComplianceStatus" NOT NULL DEFAULT 'NOT_STARTED', "responsibleParty" TEXT, "evidenceUrl" TEXT, "reviewDate" TIMESTAMP(3),
  "publicVisible" BOOLEAN NOT NULL DEFAULT false, "publicTitleEn" TEXT, "publicTitleZh" TEXT, "publicTitleFr" TEXT,
  "publicSummaryEn" TEXT, "publicSummaryZh" TEXT, "publicSummaryFr" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ComplianceRecord_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LocalPartner" (
  "id" TEXT NOT NULL, "organizationKey" TEXT NOT NULL DEFAULT 'nexus', "name" TEXT NOT NULL, "category" TEXT NOT NULL, "region" TEXT NOT NULL,
  "capabilities" TEXT NOT NULL, "verificationStatus" "PartnerVerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
  "contactName" TEXT, "email" TEXT, "phone" TEXT, "website" TEXT, "contactVisible" BOOLEAN NOT NULL DEFAULT false,
  "active" BOOLEAN NOT NULL DEFAULT true, "notes" TEXT, "verifiedAt" TIMESTAMP(3), "verifiedByAdminId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "LocalPartner_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "InternalTask" (
  "id" TEXT NOT NULL, "organizationKey" TEXT NOT NULL DEFAULT 'nexus', "title" TEXT NOT NULL, "description" TEXT,
  "status" "InternalTaskStatus" NOT NULL DEFAULT 'OPEN', "priority" "LeadPriority" NOT NULL DEFAULT 'NORMAL', "dueDate" TIMESTAMP(3),
  "leadId" TEXT, "projectId" TEXT, "complianceRecordId" TEXT, "assigneeAdminId" TEXT, "createdByAdminId" TEXT,
  "reminderSentAt" TIMESTAMP(3), "completedAt" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "InternalTask_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ComplianceRecord_organizationKey_jurisdiction_status_idx" ON "ComplianceRecord"("organizationKey", "jurisdiction", "status");
CREATE INDEX "ComplianceRecord_projectId_category_idx" ON "ComplianceRecord"("projectId", "category");
CREATE INDEX "ComplianceRecord_publicVisible_jurisdiction_idx" ON "ComplianceRecord"("publicVisible", "jurisdiction");
CREATE INDEX "ComplianceRecord_responsibleAdminId_reviewDate_idx" ON "ComplianceRecord"("responsibleAdminId", "reviewDate");
CREATE INDEX "LocalPartner_organizationKey_category_region_idx" ON "LocalPartner"("organizationKey", "category", "region");
CREATE INDEX "LocalPartner_verificationStatus_active_idx" ON "LocalPartner"("verificationStatus", "active");
CREATE INDEX "InternalTask_organizationKey_status_priority_idx" ON "InternalTask"("organizationKey", "status", "priority");
CREATE INDEX "InternalTask_assigneeAdminId_status_dueDate_idx" ON "InternalTask"("assigneeAdminId", "status", "dueDate");
CREATE INDEX "InternalTask_leadId_createdAt_idx" ON "InternalTask"("leadId", "createdAt");
CREATE INDEX "InternalTask_projectId_createdAt_idx" ON "InternalTask"("projectId", "createdAt");
CREATE INDEX "InternalTask_complianceRecordId_createdAt_idx" ON "InternalTask"("complianceRecordId", "createdAt");
CREATE UNIQUE INDEX "BusinessLead_portalProjectId_key" ON "BusinessLead"("portalProjectId");
CREATE INDEX "BusinessLead_organizationKey_dueDate_idx" ON "BusinessLead"("organizationKey", "dueDate");
CREATE INDEX "EmailOutbox_internalTaskId_createdAt_idx" ON "EmailOutbox"("internalTaskId", "createdAt");
CREATE INDEX "PortalProject_ownerAdminId_status_dueDate_idx" ON "PortalProject"("ownerAdminId", "status", "dueDate");

ALTER TABLE "BusinessLead" ADD CONSTRAINT "BusinessLead_portalProjectId_fkey" FOREIGN KEY ("portalProjectId") REFERENCES "PortalProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "EmailOutbox" ADD CONSTRAINT "EmailOutbox_internalTaskId_fkey" FOREIGN KEY ("internalTaskId") REFERENCES "InternalTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PortalProject" ADD CONSTRAINT "PortalProject_ownerAdminId_fkey" FOREIGN KEY ("ownerAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ComplianceRecord" ADD CONSTRAINT "ComplianceRecord_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "PortalProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ComplianceRecord" ADD CONSTRAINT "ComplianceRecord_evidenceDocumentId_fkey" FOREIGN KEY ("evidenceDocumentId") REFERENCES "PortalDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ComplianceRecord" ADD CONSTRAINT "ComplianceRecord_responsibleAdminId_fkey" FOREIGN KEY ("responsibleAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "LocalPartner" ADD CONSTRAINT "LocalPartner_verifiedByAdminId_fkey" FOREIGN KEY ("verifiedByAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InternalTask" ADD CONSTRAINT "InternalTask_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "BusinessLead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InternalTask" ADD CONSTRAINT "InternalTask_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "PortalProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InternalTask" ADD CONSTRAINT "InternalTask_complianceRecordId_fkey" FOREIGN KEY ("complianceRecordId") REFERENCES "ComplianceRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InternalTask" ADD CONSTRAINT "InternalTask_assigneeAdminId_fkey" FOREIGN KEY ("assigneeAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InternalTask" ADD CONSTRAINT "InternalTask_createdByAdminId_fkey" FOREIGN KEY ("createdByAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
