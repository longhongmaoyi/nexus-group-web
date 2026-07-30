#!/bin/bash
set -Eeuo pipefail

PROJECT="/Users/satya/Documents/Nexus Group Website/nexus-group-web"
REPORT="$PROJECT/work/phase3-validation.txt"

finish() {
  code=$?
  if [ "$code" -eq 0 ]; then
    result="STATUS=PASS | RELEASE=Phase 3 Business Tools | NEXT=Review commit and authorize production migration/deployment separately"
  else
    result="STATUS=FAILED | RELEASE=Phase 3 Business Tools | EXIT=$code | REPORT=$REPORT"
  fi
  echo
  echo "$result"
  printf '%s' "$result" | pbcopy 2>/dev/null || true
}
trap finish EXIT

mkdir -p "$PROJECT/work"
exec > >(tee "$REPORT") 2>&1
cd "$PROJECT"

export PATH="$PROJECT/.local-tools/node20/bin:/usr/bin:/bin:/usr/sbin:/sbin"

npx prisma validate
npm run typecheck
npm test
npm run lint
npm run build
git diff --check
