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
echo 🔄 Starting development server (finding available port)...
echo.

REM Create a temporary file for output
set TEMP_LOG=%TEMP%\buildmean8n_%RANDOM%.log
start /B cmd /c "npm start > %TEMP_LOG% 2>&1"

REM Wait for server to start and extract port
echo ⏳ Waiting for server to start...
set PORT=3000
for /L %%i in (1,1,30) do (
    timeout /t 1 /nobreak >nul
    findstr /C:"Server running on port" %TEMP_LOG% >nul 2>&1
    if not errorlevel 1 (
        for /F "tokens=5" %%p in ('findstr /C:"Server running on port" %TEMP_LOG%') do set PORT=%%p
        goto :port_found
    )
)
:port_found

REM Open browser
echo 🌐 Opening browser...
start http://localhost:%PORT%

echo.
echo ✅ Build Mean8n is running at http://localhost:%PORT%
echo 📝 Press Ctrl+C to stop the server or close this window
echo.

REM Keep window open and tail the log
type %TEMP_LOG%
pause

REM Cleanup
del %TEMP_LOG% 2>nul
