# Muse Chat - Deployment Guide

## 🚀 Quick Start Strategy

### Option 1: Local Development (Recommended for Testing)

1. **Install Node.js 20+** (if not already installed)
   - Download from https://nodejs.org
   - Verify: `node --version` should show v20+

2. **Navigate to the project**
   ```bash
   cd /workspace/muse-chat
   ```

3. **Install dependencies** (already done, but if needed):
   ```bash
   npm install
   ```

4. **Add your API keys**:
   - Edit `src/lib/openrouter-service.ts` line 14: Replace `'sk-or-v1-your-openrouter-key-here'` with your OpenRouter API key
   - Edit `src/lib/elevenlabs-service.ts` line 9: Replace `'your-elevenlabs-key-here'` with your ElevenLabs API key

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** to `http://localhost:3000`

---

### Option 2: Vercel Deployment (Production Ready)

1. **Get API Keys**:
   - OpenRouter: https://openrouter.ai/keys (sign up for free credits)
   - ElevenLabs: https://elevenlabs.io (sign up, some free usage)

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy from the muse-chat directory
   cd /workspace/muse-chat
   vercel
   ```

3. **Add environment variables** in Vercel dashboard:
   - Go to your Vercel project settings
   - Add environment variables:
     - `NEXT_PUBLIC_OPENROUTER_API_KEY`: your OpenRouter key
     - `NEXT_PUBLIC_ELEVENLABS_API_KEY`: your ElevenLabs key

---

### Option 3: Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔑 API Keys Setup

### OpenRouter (Required for AI responses)
1. Go to https://openrouter.ai
2. Sign up (free credits available)
3. Go to Keys tab
4. Create a new API key
5. Copy the key (starts with `sk-or-v1-`)

### ElevenLabs (Optional - for TTS)
1. Go to https://elevenlabs.io
2. Sign up (free tier available)
3. Go to Profile → API Keys
4. Copy your API key

---

## 🎯 Features Available

- ✅ **Chat Interface**: Modern, responsive design
- ✅ **Muse Configuration**: Create custom AI personalities
- ✅ **AI Integration**: Real conversations with streaming responses
- ✅ **TTS Narration**: Voice synthesis for atmospheric responses
- ✅ **Avatar Upload**: Custom character images with cropping
- ✅ **Theme Support**: Dark/light mode
- ✅ **Markdown**: Rich text formatting in responses
- ✅ **Persistence**: Saves your Muses locally

---

## 🔧 Troubleshooting

**Node.js Version Issues**: App requires Node 20+. If you have Node 18, either:
- Upgrade to Node 20+, or
- The app will show warnings but should still work

**API Key Issues**:
- OpenRouter errors → Check your API key and credits
- ElevenLabs errors → Check your API key and usage limits
- No API keys → App runs in demo mode with mock responses

**Port Issues**: If port 3000 is busy:
```bash
npm run dev -- --port 3001
```

---

## 📱 Usage

1. **First Run**: App creates a default "Aria" muse
2. **Configure Muse**: Click the settings gear to customize
3. **Chat**: Type messages and get AI responses with narration
4. **Voice**: Select an ElevenLabs voice for TTS narration
5. **Themes**: Toggle dark/light mode in the header
6. **Font Size**: Adjust text size with the slider

Enjoy your AI-powered conversations! 🎭✨