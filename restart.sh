#!/usr/bin/env bash
set -euo pipefail

# 빌드 결과(dist)는 nginx가 서빙하는 경로로 복사해야 반영됩니다.
# (홈 디렉토리에서 빌드만 하면 /var/www 쪽은 갱신되지 않습니다)
DEPLOY_DIR="/var/www/mobile-wedding-invitation/dist"

# 1. 빌드 (실패하면 set -e 로 여기서 중단 → 깨진 결과물 배포 방지)
npm run build

# 2. 빌드 결과를 서빙 경로로 동기화 (--delete 로 옛 파일 정리)
sudo rsync -a --delete dist/ "$DEPLOY_DIR/"

# 3. nginx 설정 변경이 있을 때를 위한 reload (정적 파일만 바뀐 경우엔 사실상 불필요)
sudo nginx -t && sudo systemctl reload nginx

echo "✅ 배포 완료 → $DEPLOY_DIR"
