# ===== CONFIG =====
$projectPath = Get-Location
$backupPath = "$projectPath\backups\backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"

Write-Host "FULL PIPELINE COMPLETE" -ForegroundColor Cyan

# ===== 1. CREATE BACKUP =====
Write-Host "📦 Creating backup..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $backupPath | Out-Null

$itemsToBackup = @(
    "build",
    "content",
    "node_modules",
    "public",
    "shanepics",
    "firebase.json",
    "mediaFiles.js",
    "steps.txt"
)

foreach ($item in $itemsToBackup) {
    if (Test-Path "$projectPath\$item") {
        Copy-Item "$projectPath\$item" "$backupPath" -Recurse -Force
    }
}

Write-Host "✅ Backup complete: $backupPath" -ForegroundColor Green

# ===== 2. GIT OPERATIONS =====
Write-Host "📡 Git staging..." -ForegroundColor Yellow

git add .

$commitMessage = "Auto deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m "$commitMessage"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git commit done" -ForegroundColor Green
} else {
    Write-Host "⚠️ No changes to commit or git issue" -ForegroundColor DarkYellow
}

Write-Host "⬆️ Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

# ===== 3. FIREBASE DEPLOY =====
Write-Host "🚀 Deploying to Firebase..." -ForegroundColor Yellow

firebase deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Firebase deployment successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Firebase deployment failed" -ForegroundColor Red
}

# ===== DONE =====
Write-Host "🏁 FULL PIPELINE COMPLETE" -ForegroundColor Cyan