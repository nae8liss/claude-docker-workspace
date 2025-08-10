@echo off
echo 🎭 Starting Muse Chat...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

echo.
echo 🔑 Checking API key configuration...
findstr /c:"your-openrouter-key-here" src\lib\openrouter-service.ts >nul
if not errorlevel 1 (
    echo ⚠️  OpenRouter API key not configured ^(using demo mode^)
    echo    Edit src\lib\openrouter-service.ts to add your API key
) else (
    echo ✅ OpenRouter API key configured
)

findstr /c:"your-elevenlabs-key-here" src\lib\elevenlabs-service.ts >nul
if not errorlevel 1 (
    echo ⚠️  ElevenLabs API key not configured ^(TTS disabled^)
    echo    Edit src\lib\elevenlabs-service.ts to add your API key
) else (
    echo ✅ ElevenLabs API key configured
)

echo.
echo 🚀 Starting development server...
echo 📱 Open http://localhost:3000 in your browser
echo ⏹️  Press Ctrl+C to stop
echo.

REM Start the development server
npm run dev