#!/usr/bin/env bash
# Deploy portfolio to LiteSpeed/Apache shared hosting via rsync over SSH.
# This script only owns ~/public_html/krystian-kluba/portfolio/. The
# SMARTWEB root page (~/public_html/index.html) is deployed by the
# separate ../smartweb/ repo.
#
# Usage:
#   DEPLOY_HOST=user@smartweb.net.pl ./scripts/deploy.sh
#
# Optional env vars:
#   DEPLOY_REMOTE_BASE  remote path containing public_html (default: ~)
#   DEPLOY_PORT         SSH port (default: 22)
#   SKIP_BUILD=1        reuse existing build/ instead of rebuilding

set -euo pipefail

if [[ -z "${DEPLOY_HOST:-}" ]]; then
  echo "DEPLOY_HOST is required, e.g. DEPLOY_HOST=user@smartweb.net.pl $0" >&2
  exit 1
fi

REMOTE_BASE="${DEPLOY_REMOTE_BASE:-~}"
PORT="${DEPLOY_PORT:-22}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$ROOT"

if [[ -z "${SKIP_BUILD:-}" ]]; then
  echo "==> building portfolio"
  npm run build
fi

if [[ ! -f build/index.html ]]; then
  echo "build/index.html missing — set SKIP_BUILD=1 only if a prior build exists" >&2
  exit 1
fi

echo "==> uploading portfolio to ${DEPLOY_HOST}:${REMOTE_BASE}/public_html/krystian-kluba/portfolio/"
rsync -avz --delete -e "ssh -p ${PORT}" \
  build/ \
  "${DEPLOY_HOST}:${REMOTE_BASE}/public_html/krystian-kluba/portfolio/"

echo "==> done"
