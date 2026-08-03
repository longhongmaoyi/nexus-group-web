-- Release A is additive: preserve every existing inquiry while recording
-- versioned consent evidence for new fallback-form submissions.
ALTER TABLE "Inquiry"
  ADD COLUMN "consent" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "consentAt" TIMESTAMP(3),
  ADD COLUMN "consentTextVersion" TEXT;
