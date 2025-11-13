Write-Host "`n🏗️  Building Production Version..." -ForegroundColor Cyan

cd frontend
pnpm build

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Build successful!" -ForegroundColor Green
    Write-Host "`n🚀 Starting Production Server..." -ForegroundColor Cyan
    pnpm start
} else {
    Write-Host "`n❌ Build failed!" -ForegroundColor Red
}
