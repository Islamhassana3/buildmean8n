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

# Create a temporary file for server output
TEMP_LOG=$(mktemp)

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping server..."
    kill $SERVER_PID 2>/dev/null || true
    rm -f "$TEMP_LOG"
    exit 0
}

# Register cleanup function
trap cleanup EXIT INT TERM

# Start the server in the background
echo "🔄 Starting development server (finding available port)..."
npm start > "$TEMP_LOG" 2>&1 &
SERVER_PID=$!

# Wait for server to start and extract port
echo "⏳ Waiting for server to start..."
PORT=3000
for i in {1..30}; do
    if grep -q "Server running on port" "$TEMP_LOG"; then
        PORT=$(grep "Server running on port" "$TEMP_LOG" | head -n1 | grep -oP '\d+')
        break
    fi
    sleep 0.5
done

# Detect OS and open browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "🌐 Opening browser on macOS..."
    open "http://localhost:$PORT"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "🌐 Opening browser on Linux..."
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:$PORT"
    elif command -v gnome-open &> /dev/null; then
        gnome-open "http://localhost:$PORT"
    else
        echo "⚠️  Could not detect browser launcher. Please open http://localhost:$PORT manually."
    fi
else
    echo "⚠️  OS not detected. Please open http://localhost:$PORT manually."
fi

echo ""
echo "✅ Build Mean8n is running at http://localhost:$PORT"
echo "📝 Press Ctrl+C to stop the server"
echo ""

# Tail the log in the background
tail -f "$TEMP_LOG" &
TAIL_PID=$!

# Keep the script running
wait $SERVER_PID

# Stop tailing
kill $TAIL_PID 2>/dev/null || true
