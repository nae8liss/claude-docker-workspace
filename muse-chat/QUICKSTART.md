# 🚀 Muse Chat - Quick Start

## Immediate Setup Strategy

### Option 1: Local Development (Easiest)

**Step 1: Get your API keys**
- OpenRouter: https://openrouter.ai/keys (free credits available)
- ElevenLabs: https://elevenlabs.io (optional, for TTS)

**Step 2: Add API keys to the code**
```bash
# Edit these two files:
cd /workspace/muse-chat

# OpenRouter API key (required for AI responses)
nano src/lib/openrouter-service.ts
# Replace line 14: 'sk-or-v1-your-openrouter-key-here' with your actual key

# ElevenLabs API key (optional for TTS)
nano src/lib/elevenlabs-service.ts  
# Replace line 9: 'your-elevenlabs-key-here' with your actual key
```

**Step 3: Start the app**
```bash
cd /workspace/muse-chat

# If on Linux/Mac:
./start.sh

# If on Windows:
start.bat

# Or manually:
npm run dev
```

**Step 4: Open in browser**
- Go to `http://localhost:3000`
- Create your first Muse and start chatting!

---

### Option 2: Copy to Local Machine

If the current environment has issues:

1. **Download the project**:
   ```bash
   cd /workspace
   tar -czf muse-chat.tar.gz muse-chat/
   ```

2. **Transfer to your local machine** and extract

3. **Install Node.js 20+** from https://nodejs.org

4. **Run locally**:
   ```bash
   cd muse-chat
   npm install
   npm run dev
   ```

---

### Option 3: Cloud Deployment

**Vercel (Recommended)**:
1. Push to GitHub
2. Import to Vercel: https://vercel.com
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_OPENROUTER_API_KEY`
   - `NEXT_PUBLIC_ELEVENLABS_API_KEY`
4. Deploy automatically

**Netlify**:
1. Push to GitHub
2. Import to Netlify: https://netlify.com
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables

---

## 🔄 Current Environment Issues

The workspace has Node.js 18.20.8, but some packages prefer Node 20+. The app should still work with warnings.

If you see "Bus error" or build issues:
1. Try the local machine approach
2. Or use the cloud deployment options

---

## 🎯 What You Get

Once running, you'll have:
- ✨ Modern chat interface with your custom AI Muses  
- 🎨 Avatar upload and Muse personality configuration
- 🧠 Real AI conversations with streaming responses
- 🔊 Voice narration that makes characters feel alive
- 🎨 Dark/light themes and font size controls
- 📝 Markdown support for rich AI responses

**The goal**: Immersive AI conversations with characters that feel alive through atmospheric voice narration!

Ready to chat with your first Muse? 🎭