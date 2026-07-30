-- Release 2 / Phase 3 - additive business tools
CREATE TYPE "LeadType" AS ENUM ('GENERAL', 'PROJECT', 'SUPPLIER', 'PARTNER', 'COMPLIANCE');
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'QUALIFYING', 'CONTACTED', 'PROPOSAL', 'WON', 'LOST', 'ARCHIVED');
CREATE TYPE "LeadPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');
CREATE TYPE "EmailOutboxStatus" AS ENUM ('PENDING', 'PROCESSING', 'SENT', 'FAILED', 'CANCELLED');

CREATE TABLE "BusinessLead" (
    "id" TEXT NOT NULL,
    "organizationKey" TEXT NOT NULL DEFAULT 'nexus',
    "reference" TEXT NOT NULL,
    "type" "LeadType" NOT NULL DEFAULT 'PROJECT',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "priority" "LeadPriority" NOT NULL DEFAULT 'NORMAL',
    "locale" TEXT NOT NULL DEFAULT 'en',
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "organizationName" TEXT,
    "country" TEXT,
    "province" TEXT,
    "municipality" TEXT,
    "sector" TEXT,
    "projectType" TEXT,
    "intendedUse" TEXT,
    "sizeCapacity" TEXT,
    "budgetRange" TEXT,
    "targetTimeline" TEXT,
    "siteReadiness" TEXT,
    "complianceNeeds" TEXT,
    "notes" TEXT,
    "consent" BOOLEAN NOT NULL,
    "consentAt" TIMESTAMP(3),
    "consentTextVersion" TEXT,
    "source" TEXT NOT NULL DEFAULT 'WEBSITE',
    "sourceMetadata" JSONB,
    "ownerAdminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BusinessLead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LeadActivity" (
    "id" TEXT NOT NULL,
    "organizationKey" TEXT NOT NULL DEFAULT 'nexus',
    "leadId" TEXT NOT NULL,
    "actorAdminId" TEXT,
    "kind" TEXT NOT NULL,
    "body" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LeadActivity_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CostAssumptionVersion" (
    "id" TEXT NOT NULL,
    "organizationKey" TEXT NOT NULL DEFAULT 'nexus',
    "version" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'CAD',
    "assumptions" JSONB NOT NULL,
    "disclaimerEn" TEXT NOT NULL,
    "disclaimerZh" TEXT NOT NULL,
    "disclaimerFr" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CostAssumptionVersion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TimelineAssumptionVersion" (
    "id" TEXT NOT NULL,
    "organizationKey" TEXT NOT NULL DEFAULT 'nexus',
    "version" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stages" JSONB NOT NULL,
    "uncertaintyPct" INTEGER NOT NULL DEFAULT 20,
    "disclaimerEn" TEXT NOT NULL,
    "disclaimerZh" TEXT NOT NULL,
    "disclaimerFr" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TimelineAssumptionVersion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SavedEstimate" (
    "id" TEXT NOT NULL,
    "organizationKey" TEXT NOT NULL DEFAULT 'nexus',
    "reference" TEXT NOT NULL,
    "leadId" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "input" JSONB NOT NULL,
    "costResult" JSONB,
    "timelineResult" JSONB,
    "costAssumptionVersionId" TEXT,
    "timelineVersionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SavedEstimate_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EmailOutbox" (
    "id" TEXT NOT NULL,
    "organizationKey" TEXT NOT NULL DEFAULT 'nexus',
    "leadId" TEXT,
    "dedupeKey" TEXT NOT NULL,
    "templateKey" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "recipient" TEXT NOT NULL,
    "replyTo" TEXT,
    "subject" TEXT NOT NULL,
    "textBody" TEXT NOT NULL,
    "htmlBody" TEXT NOT NULL,
    "status" "EmailOutboxStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 5,
    "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "lastError" TEXT,
    "providerMessageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "EmailOutbox_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "BusinessLead_reference_key" ON "BusinessLead"("reference");
CREATE INDEX "BusinessLead_organizationKey_createdAt_idx" ON "BusinessLead"("organizationKey", "createdAt");
CREATE INDEX "BusinessLead_organizationKey_status_priority_idx" ON "BusinessLead"("organizationKey", "status", "priority");
CREATE INDEX "BusinessLead_organizationKey_type_idx" ON "BusinessLead"("organizationKey", "type");
CREATE INDEX "BusinessLead_ownerAdminId_status_idx" ON "BusinessLead"("ownerAdminId", "status");
CREATE INDEX "BusinessLead_contactEmail_idx" ON "BusinessLead"("contactEmail");
CREATE INDEX "LeadActivity_organizationKey_leadId_createdAt_idx" ON "LeadActivity"("organizationKey", "leadId", "createdAt");
CREATE INDEX "LeadActivity_actorAdminId_createdAt_idx" ON "LeadActivity"("actorAdminId", "createdAt");
CREATE UNIQUE INDEX "CostAssumptionVersion_organizationKey_version_key" ON "CostAssumptionVersion"("organizationKey", "version");
CREATE INDEX "CostAssumptionVersion_organizationKey_active_idx" ON "CostAssumptionVersion"("organizationKey", "active");
CREATE UNIQUE INDEX "TimelineAssumptionVersion_organizationKey_version_key" ON "TimelineAssumptionVersion"("organizationKey", "version");
CREATE INDEX "TimelineAssumptionVersion_organizationKey_active_idx" ON "TimelineAssumptionVersion"("organizationKey", "active");
CREATE UNIQUE INDEX "SavedEstimate_reference_key" ON "SavedEstimate"("reference");
CREATE INDEX "SavedEstimate_organizationKey_createdAt_idx" ON "SavedEstimate"("organizationKey", "createdAt");
CREATE INDEX "SavedEstimate_leadId_createdAt_idx" ON "SavedEstimate"("leadId", "createdAt");
CREATE INDEX "SavedEstimate_costAssumptionVersionId_idx" ON "SavedEstimate"("costAssumptionVersionId");
CREATE INDEX "SavedEstimate_timelineVersionId_idx" ON "SavedEstimate"("timelineVersionId");
CREATE UNIQUE INDEX "EmailOutbox_dedupeKey_key" ON "EmailOutbox"("dedupeKey");
CREATE INDEX "EmailOutbox_organizationKey_status_nextAttemptAt_idx" ON "EmailOutbox"("organizationKey", "status", "nextAttemptAt");
CREATE INDEX "EmailOutbox_leadId_createdAt_idx" ON "EmailOutbox"("leadId", "createdAt");

ALTER TABLE "BusinessLead" ADD CONSTRAINT "BusinessLead_ownerAdminId_fkey" FOREIGN KEY ("ownerAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "LeadActivity" ADD CONSTRAINT "LeadActivity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "BusinessLead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LeadActivity" ADD CONSTRAINT "LeadActivity_actorAdminId_fkey" FOREIGN KEY ("actorAdminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CostAssumptionVersion" ADD CONSTRAINT "CostAssumptionVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "TimelineAssumptionVersion" ADD CONSTRAINT "TimelineAssumptionVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SavedEstimate" ADD CONSTRAINT "SavedEstimate_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "BusinessLead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SavedEstimate" ADD CONSTRAINT "SavedEstimate_costAssumptionVersionId_fkey" FOREIGN KEY ("costAssumptionVersionId") REFERENCES "CostAssumptionVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SavedEstimate" ADD CONSTRAINT "SavedEstimate_timelineVersionId_fkey" FOREIGN KEY ("timelineVersionId") REFERENCES "TimelineAssumptionVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "EmailOutbox" ADD CONSTRAINT "EmailOutbox_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "BusinessLead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
