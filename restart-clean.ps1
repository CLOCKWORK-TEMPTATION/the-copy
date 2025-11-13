Write-Host "`n🛑 Stopping all services..." -ForegroundColor Yellow
& "$PSScriptRoot\scripts\kill-ports.ps1"

Write-Host "`n🧹 Cleaning caches..." -ForegroundColor Cyan
Remove-Item -Path "frontend\.next" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "frontend\node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "`n⏳ Waiting 3 seconds..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host "`n🚀 Starting fresh..." -ForegroundColor Green
pnpm start
