# Claude Code Working Guidelines

## Project Structure
This workspace contains multiple projects organized under `/workspace/projects/`:

### Current Projects
- **muse-chat**: Primary split-screen conversational AI workspace (Kiro prototype)
  - Location: `/workspace/projects/muse-chat/`
  - Main deployment project with enhanced Aria personality
  - Split-screen layout: Creative Codex (left) + Chat interface (right)

- **react-flow-app**: React Flow canvas application with floating UI elements
  - Location: `/workspace/projects/react-flow-app/`
  - Project-specific instructions: `/workspace/projects/react-flow-app/CLAUDE.md`
  - Documentation: `/workspace/projects/react-flow-app/docs/`
  - Claude config: `/workspace/projects/react-flow-app/.claude/`

- **worldbuilding-codex**: Comprehensive worldbuilding system with sub-projects
  - Location: `/workspace/projects/worldbuilding-codex/`
  - Core system: `/workspace/projects/worldbuilding-codex/core/`
  - Character videos: `/workspace/projects/worldbuilding-codex/character-videos/`
  - Avatar videos: `/workspace/projects/worldbuilding-codex/avatar-videos/`

- **shared**: Common resources and configuration
  - Location: `/workspace/projects/shared/`
  - API keys and service configurations

## Working with Projects
- Each project has its own CLAUDE.md file with project-specific instructions
- Always navigate to the specific project directory when working on that project
- Project-specific documentation is stored in each project's `docs/` folder
- Claude Code configurations are stored in each project's `.claude/` folder

## Archive Folder Policy
- **NEVER READ FROM ARCHIVE FOLDERS** unless explicitly requested by the user
- `/workspace/archive/` contains old/deprecated projects and should be ignored
- `/workspace/archive/old-muse-versions/` contains archived muse-chat iterations
- Focus on current active projects listed above

## Deployment Guidelines

### 🚀 Force Deployment System (muse-chat)
When Vercel deployments get stuck or have caching issues, use the built-in force deployment system:

```bash
# Navigate to muse-chat project
cd /workspace/projects/muse-chat

# Quick automatic force deploy (RECOMMENDED)
npm run force-deploy-push

# Interactive deployment with confirmation
npm run quick-redeploy

# Manual preparation (review before commit)
npm run force-deploy
```

**When to Use Force Deployment:**
- ✅ Vercel shows "No changes detected" but changes were made
- ✅ Build cache appears corrupted or stuck
- ✅ Deployment hanging or failing repeatedly
- ✅ Production not reflecting latest changes
- ✅ ANY TIME you want a guaranteed fresh deployment

**What It Does:**
- Automatically bumps version number (0.1.7 → 0.1.8)
- Generates unique build IDs and cache-busting identifiers
- Updates deployment markers and timestamps
- Modifies 6+ files to force Git diff recognition
- Commits and pushes with deployment-specific messaging

**Files Modified by Force Deploy:**
- `package.json` (version bump)
- `src/components/version-display.tsx` (version sync)
- `src/lib/constants.ts` (build info)
- `next.config.js` (build timestamp)
- `.vercel-force-rebuild` (deployment metadata)
- `deployment-markers/deploy-TIMESTAMP.json` (unique markers)

This system bypasses Vercel caching issues using multiple "cheat codes" and virtually guarantees a fresh deployment.

## General Guidelines
- Default to the project-specific CLAUDE.md for detailed instructions
- Maintain project isolation - don't mix dependencies or configurations
- Each project should be self-contained and runnable independently
- **USE FORCE DEPLOYMENT** whenever Vercel acts up - don't struggle with broken deployments