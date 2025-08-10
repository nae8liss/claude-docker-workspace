#!/bin/bash
set -e

echo "🚀 Setting up GitHub repositories..."

# Check if authenticated
if ! gh auth status >/dev/null 2>&1; then
    echo "❌ Please authenticate with GitHub first:"
    echo "   gh auth login --web"
    exit 1
fi

USERNAME=$(gh api user --jq .login)
echo "👤 Authenticated as: $USERNAME"

# Workspace Repository
echo "📦 Creating claude-docker-workspace..."
cd /workspace
gh repo create claude-docker-workspace --public --description "Docker workspace setup for Claude Code development environment with multi-project support" || echo "Repository may already exist"
git remote add origin https://github.com/$USERNAME/claude-docker-workspace.git 2>/dev/null || git remote set-url origin https://github.com/$USERNAME/claude-docker-workspace.git
git push -u origin main

# React Flow App
echo "⚛️  Creating react-flow-app..."
cd /workspace/projects/react-flow-app
gh repo create react-flow-app --public --description "Interactive React Flow canvas application with floating UI elements and custom node types" || echo "Repository may already exist"
git remote add origin https://github.com/$USERNAME/react-flow-app.git 2>/dev/null || git remote set-url origin https://github.com/$USERNAME/react-flow-app.git
git push -u origin main

# Worldbuilding Codex
echo "🌍 Creating worldbuilding-codex..."
cd /workspace/projects/worldbuilding-codex
gh repo create worldbuilding-codex --private --description "Comprehensive worldbuilding system with AI agents, character video generation, and real-time avatar interactions" || echo "Repository may already exist"
git remote add origin https://github.com/$USERNAME/worldbuilding-codex.git 2>/dev/null || git remote set-url origin https://github.com/$USERNAME/worldbuilding-codex.git
git push -u origin main

echo ""
echo "✅ All repositories created and pushed successfully!"
echo ""
echo "🔗 Repository URLs:"
echo "   • claude-docker-workspace: https://github.com/$USERNAME/claude-docker-workspace"
echo "   • react-flow-app: https://github.com/$USERNAME/react-flow-app"
echo "   • worldbuilding-codex: https://github.com/$USERNAME/worldbuilding-codex"
echo ""
echo "📝 Repository visibility:"
echo "   • claude-docker-workspace: Public (Docker setup)"
echo "   • react-flow-app: Public (showcase project)"
echo "   • worldbuilding-codex: Private (contains sensitive integrations)"