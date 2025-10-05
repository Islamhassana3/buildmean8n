#!/bin/bash

# Build Mean8n - Quick Preview Launch Script
# Automatically installs dependencies and launches the app

set -e

echo "🚀 Build Mean8n Preview Launcher"
echo "================================"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies not found. Installing..."
    npm install
    echo "✅ Dependencies installed successfully!"
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

# Start the server in the background
echo "🔄 Starting development server on port 3000..."
npm start &
SERVER_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping server..."
    kill $SERVER_PID 2>/dev/null || true
    exit 0
}

# Register cleanup function
trap cleanup EXIT INT TERM

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 3

# Detect OS and open browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "🌐 Opening browser on macOS..."
    open http://localhost:3000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "🌐 Opening browser on Linux..."
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:3000
    elif command -v gnome-open &> /dev/null; then
        gnome-open http://localhost:3000
    else
        echo "⚠️  Could not detect browser launcher. Please open http://localhost:3000 manually."
    fi
else
    echo "⚠️  OS not detected. Please open http://localhost:3000 manually."
fi

echo ""
echo "✅ Build Mean8n is running at http://localhost:3000"
echo "📝 Press Ctrl+C to stop the server"
echo ""

# Keep the script running
wait $SERVER_PID
