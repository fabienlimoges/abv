#!/usr/bin/env bash
set -euo pipefail

TAG="${1:-latest}"
APP_DIR="${APP_DIR:-/opt/abv}"

cd "$APP_DIR"

export APP_TAG="$TAG"

echo "[deploy] Using APP_TAG=$APP_TAG"

docker compose pull
docker compose up -d --remove-orphans
docker image prune -f

