#!/bin/bash

# Muse Chat Startup Script
echo "🎭 Starting Muse Chat..."

# Check Node version
node_version=$(node --version | cut -d'.' -f1 | sed 's/v//')
if [ "$node_version" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current: $(node --version)"
    echo "Please upgrade Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if API keys are configured
echo "🔑 Checking API key configuration..."
if grep -q "your-openrouter-key-here" src/lib/openrouter-service.ts; then
    echo "⚠️  OpenRouter API key not configured (using demo mode)"
    echo "   Edit src/lib/openrouter-service.ts to add your API key"
else
    echo "✅ OpenRouter API key configured"
fi

if grep -q "your-elevenlabs-key-here" src/lib/elevenlabs-service.ts; then
    echo "⚠️  ElevenLabs API key not configured (TTS disabled)"
    echo "   Edit src/lib/elevenlabs-service.ts to add your API key"
else
    echo "✅ ElevenLabs API key configured"
fi

echo ""
echo "🚀 Starting development server..."
echo "📱 Open http://localhost:3000 in your browser"
echo "⏹️  Press Ctrl+C to stop"
echo ""

# Start the development server
npm run dev