# Preview Scripts Documentation

This repository includes cross-platform preview scripts that make it easy to launch the Build Mean8n application with a single command.

## Available Scripts

### 🐧 Linux/macOS: `preview.sh`

**Usage:**
```bash
./preview.sh
```

**Features:**
- Bash script compatible with Linux and macOS
- Automatically detects and installs dependencies if needed
- Automatically finds an available port (starting from 3000)
- Opens the app in your default browser with the correct port
- Graceful cleanup on exit (Ctrl+C)

**Requirements:**
- Bash shell
- Node.js and npm installed

### 🪟 Windows PowerShell: `preview.ps1`

**Usage:**
```powershell
.\preview.ps1
```

**Features:**
- Modern PowerShell script with colored output
- Dependency detection and auto-install
- Automatically finds an available port (starting from 3000)
- Background job management
- Opens app in default browser with the correct port
- Proper cleanup on exit

**Requirements:**
- PowerShell 5.0 or later
- Node.js and npm installed

### 🪟 Windows Command Prompt: `preview.bat`

**Usage:**
```cmd
preview.bat
```

**Features:**
- Traditional Windows batch script
- Dependency detection and auto-install
- Automatically finds an available port (starting from 3000)
- Starts server in background
- Opens app in default browser with the correct port
- User-friendly output

**Requirements:**
- Windows Command Prompt
- Node.js and npm installed

## What the Scripts Do

All preview scripts perform the following actions:

1. **Check for npm**: Verifies that Node.js and npm are installed
2. **Install Dependencies**: If `node_modules` doesn't exist, runs `npm install`
3. **Find Available Port**: Automatically searches for an available port starting from 3000
4. **Start Server**: Launches the development server on the available port
5. **Open Browser**: Automatically opens the app in your default browser with the correct port
6. **Keep Running**: Keeps the server running until you press Ctrl+C

## Troubleshooting

### Script won't run (Permission denied)

On Linux/macOS, you may need to make the script executable:
```bash
chmod +x preview.sh
```

### PowerShell execution policy error

If you get an execution policy error, you can temporarily allow scripts:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### npm not found

Install Node.js from https://nodejs.org/ which includes npm.

### Port already in use

The server automatically finds an available port starting from 3000. If port 3000 is in use, it will try 3001, 3002, and so on until an available port is found (up to port 3099).

You can also specify a different starting port using the `PORT` environment variable:
```bash
PORT=8000 ./preview.sh  # Linux/macOS - will search starting from port 8000
```

```powershell
$env:PORT=8000; .\preview.ps1  # PowerShell - will search starting from port 8000
```

## Manual Alternative

If you prefer to run the commands manually:

```bash
# Install dependencies (first time only)
npm install

# Start the server (it will automatically find an available port)
npm start

# The server will output the port it's running on
# Open that URL in your browser
```

## Server Features

The development server includes:
- Automatic port detection (finds an available port if 3000 is in use)
- Static file serving
- Health check endpoint at `/health`
- SPA routing fallback to `index.html`
- Request logging
- Error handling

## Stopping the Server

Press `Ctrl+C` in the terminal where the script is running to stop the server gracefully.
