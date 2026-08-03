#!/bin/bash
set -Eeuo pipefail

PROJECT="/Users/satya/Documents/Nexus Group Website/nexus-group-web"
PORT_NUMBER="3103"
RUN_ID="$(date +%s)"
set -a
source "$PROJECT/.env"
set +a
export ADMIN_EMAIL="release-a-test+$RUN_ID@nexuslife.ca"
export ADMIN_PASSWORD="$(openssl rand -base64 36)"
export ADMIN_NAME="Release A Disposable Administrator"
export ADMIN_SESSION_SECRET="$(openssl rand -base64 48)"
export PHASE3_TEST_ADMIN_EMAIL="$ADMIN_EMAIL"
export PHASE3_TEST_ADMIN_PASSWORD="$ADMIN_PASSWORD"
export PHASE3_TEST_CONTACT_EMAIL="release-a-lead+$RUN_ID@example.ca"
export PHASE3_TEST_BASE_URL="http://localhost:$PORT_NUMBER"
export PHASE3_TEST_CLEANUP="true"
SERVER_PID=""

finish() {
  code=$?
  if [ -n "$SERVER_PID" ]; then kill "$SERVER_PID" 2>/dev/null || true; fi
  node "$PROJECT/scripts/cleanup-phase3-test-admin.mjs" 2>/dev/null || true
  if [ "$code" -eq 0 ]; then
    result="STATUS=PASS | RELEASE=A integration | DATA=temporary lead, estimate, outbox and admin removed"
  else
    result="STATUS=FAILED | RELEASE=A integration | EXIT=$code"
  fi
  echo "$result"
  printf '%s' "$result" | pbcopy 2>/dev/null || true
}
trap finish EXIT

cd "$PROJECT"
export PATH="$PROJECT/.local-tools/node20/bin:/usr/bin:/bin:/usr/sbin:/sbin"
npm run admin:create
PHASE3_BUSINESS_TOOLS_ENABLED=true PHASE3_ADMIN_TOOLS_ENABLED=true PHASE3_EMAIL_NOTIFICATIONS_ENABLED=false PORT="$PORT_NUMBER" npm start &
SERVER_PID=$!
for _ in {1..30}; do
  if curl --silent --fail "$PHASE3_TEST_BASE_URL/en/contact" >/dev/null; then break; fi
  sleep 1
done
curl --silent --fail "$PHASE3_TEST_BASE_URL/en/contact" >/dev/null
npm run test:phase3:routes
