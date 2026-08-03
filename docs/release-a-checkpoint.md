# Release A — Phase 3 closure checkpoint

Status: implementation, delivery verification and production data checkpoint
passed on 2026-08-03. Final source deployment and live smoke verification remain.

## Conservative policy defaults

- Inactive or unsuccessful enquiries: retain for no more than 24 months after
  the last meaningful activity, then securely delete or anonymize.
- Records connected to a quotation, contract or completed transaction: retain
  for up to 7 years after the relationship ends when tax, accounting, warranty,
  insurance or legal requirements justify it.
- Legal holds, disputes and security investigations may suspend ordinary
  deletion. Protected backups expire on their normal cycle.
- An enquiry authorizes assessment and response only. It does not opt the person
  into unrelated marketing.
- Website leads and related records belong to NEXUS. Admin assignment indicates
  responsibility for the next action, not personal ownership or a right to reuse
  or export the information outside authorized work.
- Estimator percentages are editable budgeting allowances, not verified tax,
  customs, engineering or compliance rates.
- Only a separate written quotation issued by an authorized NEXUS representative
  can state price, scope, exclusions, taxes, validity and acceptance terms.

These defaults reflect the Office of the Privacy Commissioner of Canada guidance
on meaningful consent and limiting retention, plus CBSA guidance that commercial
duties and taxes depend on classification, origin, valuation and other facts:

- https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_consent/
- https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_use/
- https://www.cbsa-asfc.gc.ca/import/

They are conservative operating defaults, not a legal opinion. Provincial
requirements and the actual NEXUS contracting, tax, warranty and recordkeeping
practices should still be reviewed by the responsible business/privacy lead and
Canadian counsel. The notice identifies these limits and avoids promising an
approval, permit, certification, tax outcome or binding quotation.

## Dependency hardening

- Patched `brace-expansion` within each consumer's compatible release line.
- Forced all PostCSS consumers to the direct patched PostCSS dependency (resolved
  to 8.5.25); build verification is required after every lockfile change.
- Residual advisory: `sharp` below 0.35.0 through Next.js 15.5.21
  (GHSA-f88m-g3jw-g9cj). It is runtime-relevant because the site uses
  `next/image`. Next 15.5.21 declares `sharp ^0.34.3`; forcing Sharp 0.35 or the
  audit tool's suggested downgrade to Next 14.2.35 would be outside the tested
  dependency contract. Keep image inputs restricted and update when an upstream
  supported Next release accepts the patched Sharp line.
- Post-hardening audit: 2 high findings, both representing the same residual
  Next/Sharp chain; 0 critical findings.
- Platform notice: Vercel currently builds successfully with Node.js 20, but has
  announced that new Node.js 20 deployments will fail from 2026-10-01. Upgrade
  and regression-test the production runtime before that date; do not mix this
  platform change into Release A.

## Verified production checkpoint

- Confirmed monitored sender, admin recipient and privacy contact:
  `satya@nexuslife.ca`.
- SMTP credentials exist only as sensitive Vercel production variables. Host,
  port, secure mode, sender and recipient were configured without writing a
  credential to source or logs.
- Neon point-in-time recovery marker recorded immediately before migration:
  `2026-08-03T12:57:56.671Z` on PostgreSQL 17.10.
- Migration `20260803000000_release_a_consent_evidence` applied successfully;
  Prisma reports all 5 migrations current and all 3 consent columns present.
- Release A cost assumptions activated as immutable version 2. Numerical
  allowances were preserved unchanged.
- CMS seed created only the new `privacy` draft and skipped every existing page.
- Isolated Vercel delivery deployment:
  `dpl_Guw29rsA4VgEVCEee3inwhuptvZE`.
- Delivery run `RA-20260803125145-E946BF`: 7 rows queued, second insert suppressed
  all duplicates, 7 initial sends passed, an intentional provider failure was
  logged, and the retry succeeded for 8 total sends.
- Gmail receipt verification found all 8 messages from `satya@nexuslife.ca`,
  including EN/ZH/FR acknowledgements, EN/ZH/FR admin notifications and both
  retry copies.
- Test outbox rows were removed automatically. The test deployment was isolated
  from the public custom domains.
- `PHASE3_EMAIL_NOTIFICATIONS_ENABLED=true` was set only after the final source
  validation and inbox delivery checks passed. The final deployment must omit
  all email-test variables.
