@echo off
REM Build Mean8n - Quick Preview Launch Script (Windows Batch)
REM Automatically installs dependencies and launches the app

echo.
echo 🚀 Build Mean8n Preview Launcher
echo ================================
echo.

REM Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ npm is not installed. Please install Node.js and npm first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ npm found
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo 📦 Dependencies not found. Installing...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully!
    echo.
) else (
    echo ✅ Dependencies already installed
    echo.
)

REM Start the server
echo 🔄 Starting development server on port 3000...
echo.
start /B npm start

REM Wait for server to start
echo ⏳ Waiting for server to start...
timeout /t 3 /nobreak >nul

REM Open browser
echo 🌐 Opening browser...
start http://localhost:3000

echo.
echo ✅ Build Mean8n is running at http://localhost:3000
echo 📝 Press Ctrl+C to stop the server or close this window
echo.

REM Keep window open
pause
