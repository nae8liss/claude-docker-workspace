# GitHub Repository Setup Guide

## Authentication Required
To complete the GitHub setup, you need to authenticate:

1. **Authenticate GitHub CLI:**
   ```bash
   gh auth login --web
   ```
   - Copy the one-time code: `9230-E9B3`
   - Open: https://github.com/login/device
   - Complete authentication in your browser

## Automated Repository Creation & Push

Once authenticated, run these commands to create and push all repositories:

### 1. Workspace Repository (Docker & Claude Config)
```bash
cd /workspace
gh repo create claude-docker-workspace --public --description "Docker workspace setup for Claude Code development environment with multi-project support"
git remote add origin https://github.com/$(gh api user --jq .login)/claude-docker-workspace.git
git push -u origin main
```

### 2. React Flow App
```bash
cd /workspace/projects/react-flow-app
gh repo create react-flow-app --public --description "Interactive React Flow canvas application with floating UI elements and custom node types"
git remote add origin https://github.com/$(gh api user --jq .login)/react-flow-app.git
git push -u origin main
```

### 3. Worldbuilding Codex (Main Project)
```bash
cd /workspace/projects/worldbuilding-codex
gh repo create worldbuilding-codex --private --description "Comprehensive worldbuilding system with AI agents, character video generation, and real-time avatar interactions"
git remote add origin https://github.com/$(gh api user --jq .login)/worldbuilding-codex.git
git push -u origin main
```

## Repository Structure Created

### 🐳 claude-docker-workspace (Public)
- Docker container setup
- Claude Code configuration
- Multi-project workspace management
- Shell scripts for easy deployment

### ⚛️ react-flow-app (Public)
- Complete React + TypeScript setup
- React Flow integration
- Custom node system
- Tailwind CSS styling
- Vite build system

### 🌍 worldbuilding-codex (Private)
- **core/**: Interactive codex viewer with AI agents
- **character-videos/**: Video generation pipeline
- **avatar-videos/**: Real-time avatar system
- Comprehensive documentation
- Multi-language support (Python + JavaScript)

## Quick Setup Script

Run this complete setup after authentication:

```bash
#!/bin/bash
set -e

echo "Setting up GitHub repositories..."

# Workspace
cd /workspace
gh repo create claude-docker-workspace --public --description "Docker workspace setup for Claude Code development environment with multi-project support"
git remote add origin https://github.com/$(gh api user --jq .login)/claude-docker-workspace.git
git push -u origin main

# React Flow App  
cd /workspace/projects/react-flow-app
gh repo create react-flow-app --public --description "Interactive React Flow canvas application with floating UI elements and custom node types"
git remote add origin https://github.com/$(gh api user --jq .login)/react-flow-app.git
git push -u origin main

# Worldbuilding Codex
cd /workspace/projects/worldbuilding-codex  
gh repo create worldbuilding-codex --private --description "Comprehensive worldbuilding system with AI agents, character video generation, and real-time avatar interactions"
git remote add origin https://github.com/$(gh api user --jq .login)/worldbuilding-codex.git
git push -u origin main

echo "✅ All repositories created and pushed successfully!"
echo ""
echo "Repository URLs:"
echo "- claude-docker-workspace: https://github.com/$(gh api user --jq .login)/claude-docker-workspace"
echo "- react-flow-app: https://github.com/$(gh api user --jq .login)/react-flow-app"  
echo "- worldbuilding-codex: https://github.com/$(gh api user --jq .login)/worldbuilding-codex"
```

## Notes
- **claude-docker-workspace**: Public repo for Docker setup and workspace management
- **react-flow-app**: Public repo showcasing React Flow capabilities
- **worldbuilding-codex**: Private repo due to sensitive content and API integrations
- All repositories have proper .gitignore files and initial commits
- Sensitive data (API keys) excluded from version control