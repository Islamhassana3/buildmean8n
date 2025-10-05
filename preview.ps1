# Build Mean8n - Quick Preview Launch Script (PowerShell)
# Automatically installs dependencies and launches the app

Write-Host "🚀 Build Mean8n Preview Launcher" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if npm is installed
try {
    $null = Get-Command npm -ErrorAction Stop
    Write-Host "✅ npm found" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install Node.js and npm first." -ForegroundColor Red
    Write-Host "Visit: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Dependencies not found. Installing..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
    Write-Host ""
}

# Start the server
Write-Host "🔄 Starting development server (finding available port)..." -ForegroundColor Cyan
$serverJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm start
}

# Wait for server to start and extract port
Write-Host "⏳ Waiting for server to start..." -ForegroundColor Yellow
$port = 3000
$maxWait = 30
for ($i = 0; $i -lt $maxWait; $i++) {
    Start-Sleep -Milliseconds 500
    $output = Receive-Job -Job $serverJob -ErrorAction SilentlyContinue
    if ($output -match "Server running on port (\d+)") {
        $port = $matches[1]
        break
    }
}

# Open browser
Write-Host "🌐 Opening browser..." -ForegroundColor Cyan
Start-Process "http://localhost:$port"

Write-Host ""
Write-Host "✅ Build Mean8n is running at http://localhost:$port" -ForegroundColor Green
Write-Host "📝 Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Keep script running and monitor job
try {
    while ($serverJob.State -eq 'Running') {
        $output = Receive-Job -Job $serverJob -ErrorAction SilentlyContinue
        if ($output) {
            Write-Host $output
        }
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host ""
    Write-Host "🛑 Stopping server..." -ForegroundColor Yellow
    Stop-Job -Job $serverJob -ErrorAction SilentlyContinue
    Remove-Job -Job $serverJob -Force -ErrorAction SilentlyContinue
}
