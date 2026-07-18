#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPORT="$PROJECT_DIR/nexus-verification-report.txt"
STATUS="STATUS=FAILED"

finish() {
  local code=$?
  if [[ $code -eq 0 ]]; then
    STATUS="STATUS=PASS | PROJECT=$PROJECT_DIR | REPORT=$REPORT"
  else
    STATUS="STATUS=FAILED | PROJECT=$PROJECT_DIR | REPORT=$REPORT | EXIT=$code"
  fi
  printf '%s\n' "$STATUS" | tee -a "$REPORT"
  printf '%s' "$STATUS" | pbcopy 2>/dev/null || true
  exit $code
}
trap finish EXIT

cd "$PROJECT_DIR"
: > "$REPORT"
{
  echo "===== NEXUS GROUP PROJECT VERIFICATION ====="
  date
  echo "PROJECT_DIR=$PROJECT_DIR"
  node --version
  npm --version
  npm run typecheck
  npm run build
} 2>&1 | tee -a "$REPORT"
