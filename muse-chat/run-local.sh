#!/bin/bash

# Muse Chat - Local Docker Environment Setup
# Optimized for Mac OS Catalina

echo "🎭 Muse Chat - Local Docker Environment"
echo "======================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"

# Check if API keys are configured
echo "🔑 Checking API key configuration..."
if grep -q "your-openrouter-key-here" src/lib/openrouter-service.ts; then
    echo "⚠️  OpenRouter API key not configured"
    echo "   Edit src/lib/openrouter-service.ts line 14 to add your key"
    echo "   Get one free at: https://openrouter.ai/keys"
else
    echo "✅ OpenRouter API key configured"
fi

if grep -q "your-elevenlabs-key-here" src/lib/elevenlabs-service.ts; then
    echo "⚠️  ElevenLabs API key not configured (TTS will be disabled)"
    echo "   Edit src/lib/elevenlabs-service.ts line 9 to add your key"
    echo "   Get one at: https://elevenlabs.io (optional)"
else
    echo "✅ ElevenLabs API key configured"
fi

echo ""
echo "🐳 Starting Docker container..."
echo "This may take a few minutes on first run (downloading Node.js image)"
echo ""

# Build and start the container
docker-compose -f docker-compose.local.yml up --build

echo ""
echo "🎉 Muse Chat is now running!"
echo "📱 Open http://localhost:3000 in your browser"
echo "🛑 Press Ctrl+C to stop the server"
echo ""