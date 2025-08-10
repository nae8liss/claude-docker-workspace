# 🍎 Muse Chat - Mac OS Catalina Docker Setup

## 💯 Perfect for Your Setup!

Mac OS Catalina + Docker is an excellent combination for running Muse Chat. Here's your complete setup guide:

## 📦 Step 1: Copy the App Manually

### Option A: Direct Copy (Simplest)
```bash
# From your current workspace, copy the entire folder:
cp -r /workspace/muse-chat ~/Desktop/muse-chat
cd ~/Desktop/muse-chat
```

### Option B: Archive & Extract
```bash
# Create archive
cd /workspace
tar -czf muse-chat.tar.gz muse-chat/

# Move to your Mac and extract
mv muse-chat.tar.gz ~/Desktop/
cd ~/Desktop
tar -xzf muse-chat.tar.gz
cd muse-chat
```

## 🔑 Step 2: Configure API Keys

**OpenRouter (Required for AI)**:
```bash
# Edit the OpenRouter service file
nano src/lib/openrouter-service.ts
# Replace line 14: 'sk-or-v1-your-openrouter-key-here' with your key from https://openrouter.ai/keys
```

**ElevenLabs (Optional for TTS)**:
```bash
# Edit the ElevenLabs service file
nano src/lib/elevenlabs-service.ts
# Replace line 9: 'your-elevenlabs-key-here' with your key from https://elevenlabs.io
```

## 🐳 Step 3: Run with Docker

**Make sure Docker Desktop is running**, then:

```bash
# Simple one-command startup:
./run-local.sh

# Or manually:
docker-compose -f docker-compose.local.yml up --build
```

**First run**: Docker will download Node.js 20 image (~200MB) - this is normal!

## 🎉 Step 4: Access Your App

- **URL**: http://localhost:3000
- **Auto-reload**: Changes to your code will automatically refresh
- **Logs**: Visible in your terminal
- **Stop**: Press `Ctrl+C`

---

## 🔧 Catalina-Specific Notes

### Docker Desktop Version
- Use Docker Desktop 4.12.0 or earlier (last version supporting Catalina)
- Download from Docker's archived releases if needed

### Performance Tips
```bash
# If file watching is slow, the container includes WATCHPACK_POLLING=true
# This ensures hot reloading works properly on Docker + Catalina
```

### Memory Allocation
- Give Docker at least 4GB RAM in Docker Desktop preferences
- 6-8GB recommended for smooth performance

---

## 🛠️ Troubleshooting

**"Docker not found"**:
- Make sure Docker Desktop is installed and running
- Check the Docker whale icon appears in your menu bar

**"Port 3000 already in use"**:
```bash
# Kill any existing processes
lsof -ti:3000 | xargs kill -9

# Or use a different port
docker-compose -f docker-compose.local.yml up --build -p 3001:3000
```

**"Build fails" or "Node errors"**:
```bash
# Clean Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose -f docker-compose.local.yml build --no-cache
```

**"Permission denied on run-local.sh"**:
```bash
chmod +x run-local.sh
```

---

## ✨ What You'll Experience

**Container Startup**:
1. Docker downloads Node.js 20 Alpine image (first time only)
2. Installs npm dependencies inside container
3. Starts Next.js development server
4. Shows "ready on http://localhost:3000"

**Development Experience**:
- ⚡ **Hot Reload**: Code changes automatically refresh browser
- 📱 **Full Features**: All Muse Chat features work identically
- 🔒 **Isolated**: App runs in clean Node.js 20 environment
- 💾 **Persistent**: Your Muse configurations save to local storage

**App Features**:
- 🎆 Modern chat interface with your custom Muses
- 🧠 Real AI conversations (OpenRouter integration)
- 🎤 Voice narration (ElevenLabs TTS) 
- 🎨 Avatar upload with cropping
- 🌙 Dark/light theme support
- 🔤 Font size controls
- 📝 Markdown rendering in responses

---

## 🚀 Quick Commands

```bash
# Start the app
./run-local.sh

# Stop the app
# Press Ctrl+C in terminal

# View running containers
docker ps

# View logs
docker-compose -f docker-compose.local.yml logs -f

# Clean restart
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.local.yml up --build
```

---

## 🏆 Why This Approach is Perfect

✅ **Mac Catalina Compatible**: Uses Docker versions that work on Catalina  
✅ **No Node.js Issues**: Container uses Node.js 20, isolated from your system  
✅ **Hot Reloading**: Code changes reflected immediately  
✅ **Clean Environment**: No conflicts with existing software  
✅ **Easy API Key Management**: Simple file editing  
✅ **Full Feature Parity**: All Muse Chat features work perfectly  

Your Muse Chat app will run beautifully in this Docker environment on Mac OS Catalina! 🎭✨