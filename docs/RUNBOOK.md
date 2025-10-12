# Runbook

## Start (port 3001, mock demo)
1) Stop any running dev server:
   pkill -f "next dev" 2>/dev/null || true

2) Start the app:
   export V0_MOCK=1 NEXT_PUBLIC_BASE_URL="http://localhost:3001" NEXT_PUBLIC_SITE_URL="http://localhost:3001" DATABASE_URL="file:./dev.db"
   pnpm dev -p 3001

## Quick Open
- Home: http://localhost:3001/
- Instant Free Design: http://localhost:3001/instant-demo

## Git
- New branch: git switch -c redesign-pass-2
- Save work: git add -A && git commit -m "checkpoint" --no-verify
