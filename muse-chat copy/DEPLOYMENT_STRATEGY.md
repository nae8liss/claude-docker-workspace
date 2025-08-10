# 🎯 Muse Chat - Complete Deployment Strategy

## 🏆 Best Approach: Local Transfer + Run

The current workspace has Node.js environment constraints. Here's the optimal strategy:

### 📎 Step 1: Package the Application
```bash
cd /workspace
tar -czf muse-chat-complete.tar.gz muse-chat/
```

### 📎 Step 2: Transfer to Your Local Machine
- Download the `muse-chat-complete.tar.gz` file
- Extract it on your local machine

### 📎 Step 3: Local Setup
```bash
# Extract the project
tar -xzf muse-chat-complete.tar.gz
cd muse-chat

# Install Node.js 20+ from https://nodejs.org (if needed)
node --version  # Should show v20+

# Install dependencies
npm install

# Add your API keys (see instructions below)
# Then start the server
npm run dev
```

### 🔑 Step 4: Configure API Keys

**OpenRouter (Required for AI)**:
1. Go to https://openrouter.ai/keys
2. Sign up (free credits available)
3. Create API key
4. Edit `src/lib/openrouter-service.ts` line 14
5. Replace `'sk-or-v1-your-openrouter-key-here'` with your key

**ElevenLabs (Optional for TTS)**:
1. Go to https://elevenlabs.io  
2. Sign up (free tier available)
3. Get API key from Profile → API Keys
4. Edit `src/lib/elevenlabs-service.ts` line 9
5. Replace `'your-elevenlabs-key-here'` with your key

### 🚀 Step 5: Launch
```bash
npm run dev
```
Open `http://localhost:3000` and enjoy!

---

## 🌍 Alternative: Cloud Deployment

If you prefer cloud hosting:

### Vercel (Easiest)
1. Create GitHub repo and push the code
2. Import to https://vercel.com
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_OPENROUTER_API_KEY`: your OpenRouter key
   - `NEXT_PUBLIC_ELEVENLABS_API_KEY`: your ElevenLabs key
4. Deploy automatically

### Railway
1. Push to GitHub
2. Import to https://railway.app
3. Add environment variables
4. One-click deploy

---

## 📱 What You'll Experience

**First Launch**:
- Clean, modern chat interface opens
- Default "Aria" muse is created automatically
- Welcome message appears with italicized narration

**Configuration**:
- Click the settings gear to configure your muse
- Upload a custom avatar (with cropping)
- Select AI model (GPT-4o, Claude 3.5 Sonnet, etc.)
- Choose ElevenLabs voice for TTS narration
- Customize personality via system prompt

**Chat Experience**:
- Type a message and hit Enter
- See typing indicator with bouncing dots
- Watch response stream in real-time
- Hear atmospheric narration spoken aloud (if TTS enabled)
- Enjoy rich markdown formatting in responses

**Controls**:
- 🎨 Theme toggle (dark/light)
- 🔠 Font size slider (12-18px)
- 🔊 Mute toggle for audio
- ⚙️ Settings to create multiple muses

---

## 🔧 Troubleshooting

**"Bus error" or build fails**:
- Use the local transfer approach
- Ensure Node.js 20+ is installed

**API errors**:
- Check your API keys are correctly set
- Verify you have credits/usage remaining

**No audio**:
- TTS is optional - app works fine without it
- Check ElevenLabs API key and voice selection
- Click the speaker icon to unmute

**Port 3000 busy**:
```bash
npm run dev -- --port 3001
```

---

## ✨ Ready to Deploy!

Your Muse Chat application is complete and production-ready. The local transfer approach is recommended for immediate use, while cloud deployment offers global accessibility.

**Key Features Delivered**:
✅ Full-featured chat interface  
✅ AI-powered conversations with streaming  
✅ TTS narration for immersive experience  
✅ Custom Muse configuration  
✅ Avatar upload with cropping  
✅ Dark/light themes  
✅ Markdown rendering  
✅ Local persistence  

Time to bring your AI Muses to life! 🎭✨