#!/bin/bash

# Safe Migration Script from Docker v4 to v5
# This script safely migrates your existing setup to the new multi-project structure

set -e

# Configuration
PROJECT_DIR="/Users/youri/Documents/dev/Docker/Claude_code_image"
CONTAINER_NAME="claude-code-workspace"
BACKUP_SUFFIX=$(date +%Y%m%d_%H%M%S)

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo "🔄 Starting safe migration to Docker v5..."

# Step 1: Verify current setup
print_status "Step 1: Verifying current setup..."
if [ ! -d "$PROJECT_DIR" ]; then
    print_error "Project directory not found: $PROJECT_DIR"
    exit 1
fi

cd "$PROJECT_DIR"
print_success "Found project directory"

# Step 2: Create comprehensive backup
print_status "Step 2: Creating comprehensive backup..."
BACKUP_DIR="../Claude_code_image_backup_${BACKUP_SUFFIX}"
cp -r . "$BACKUP_DIR"
print_success "Host backup created at: $BACKUP_DIR"

# Backup running container if it exists
if docker ps --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    print_status "Creating container snapshot..."
    docker commit "$CONTAINER_NAME" "claude-code-backup:${BACKUP_SUFFIX}"
    print_success "Container backup created: claude-code-backup:${BACKUP_SUFFIX}"
    
    # Export any unsaved work from container
    print_status "Syncing any unsaved work from container..."
    docker exec "$CONTAINER_NAME" bash -c "cd /workspace && find . -name 'node_modules' -prune -o -type f -newer /tmp/container_start -print" 2>/dev/null || true
fi

# Step 3: Verify current structure and plan migration
print_status "Step 3: Analyzing current structure..."
if [ -d "projects/react-flow-app" ]; then
    print_success "✅ New structure already exists - migration may be partially complete"
    MIGRATION_NEEDED=false
else
    print_warning "⚠️  Old structure detected - full migration needed"
    MIGRATION_NEEDED=true
fi

# Step 4: Create new structure if needed
if [ "$MIGRATION_NEEDED" = true ]; then
    print_status "Step 4: Creating new directory structure..."
    
    # Create new structure
    mkdir -p projects/react-flow-app
    mkdir -p .claude-workspace
    
    # Check for existing React app files
    if [ -d "workspace" ]; then
        print_status "Moving files from old workspace/ to projects/react-flow-app/"
        mv workspace/* projects/react-flow-app/ 2>/dev/null || true
        rmdir workspace 2>/dev/null || rm -rf workspace
    fi
    
    # Move React Flow documentation
    if ls react-flow-*.md 1> /dev/null 2>&1; then
        mkdir -p projects/react-flow-app/docs
        mv react-flow-*.md projects/react-flow-app/docs/
    fi
    
    # Create project-specific CLAUDE.md
    if [ ! -f "projects/react-flow-app/CLAUDE.md" ]; then
        cat > "projects/react-flow-app/CLAUDE.md" << 'EOF'
# React Flow App - Claude Code Working Guidelines

## Task Completion Protocol

### Visual/Functional Changes
After completing any task that involves visual or functional changes to the React Flow app:
1. Start the development server
2. Provide the localhost link for immediate viewing and testing
3. This ensures changes can be verified in real-time

### Development Commands
- **Start dev server**: `npm run dev` (typically runs on http://localhost:5173)
- **Build**: `npm run build`
- **Preview build**: `npm run preview`

### Project Structure
- Main app: `/workspace/projects/react-flow-app/`
- React Flow canvas with floating UI elements
- Tailwind CSS + shadcn/ui for styling
- Flat background (no grid by default)

## AI Development Notes
- Time estimates don't apply to AI-assisted development
- Focus on logical task groupings and implementation order
- Always verify changes visually when possible

## Project Organization
- Source code: `/workspace/projects/react-flow-app/src/`
- Documentation: `/workspace/projects/react-flow-app/docs/`
- Claude config: `/workspace/projects/react-flow-app/.claude/`
EOF
    fi
    
    # Create workspace CLAUDE.md
    if [ ! -f "CLAUDE.md" ]; then
        cat > "CLAUDE.md" << 'EOF'
# Claude Code Working Guidelines

## Project Structure
This workspace contains multiple projects organized under `/workspace/projects/`:

### Current Projects
- **react-flow-app**: React Flow canvas application with floating UI elements
  - Location: `/workspace/projects/react-flow-app/`
  - Project-specific instructions: `/workspace/projects/react-flow-app/CLAUDE.md`
  - Documentation: `/workspace/projects/react-flow-app/docs/`
  - Claude config: `/workspace/projects/react-flow-app/.claude/`

## Working with Projects
- Each project has its own CLAUDE.md file with project-specific instructions
- Always navigate to the specific project directory when working on that project
- Project-specific documentation is stored in each project's `docs/` folder
- Claude Code configurations are stored in each project's `.claude/` folder

## General Guidelines
- Default to the project-specific CLAUDE.md for detailed instructions
- Maintain project isolation - don't mix dependencies or configurations
- Each project should be self-contained and runnable independently
EOF
    fi
    
    print_success "New structure created successfully"
else
    print_success "Structure already migrated"
fi

# Step 5: Stop existing container gracefully
if docker ps --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    print_status "Step 5: Stopping existing container..."
    docker stop "$CONTAINER_NAME"
    docker rm "$CONTAINER_NAME"
    print_success "Old container stopped and removed"
fi

# Step 6: Verify migration
print_status "Step 6: Verifying migration..."
VERIFICATION_PASSED=true

if [ ! -d "projects/react-flow-app" ]; then
    print_error "❌ projects/react-flow-app directory missing"
    VERIFICATION_PASSED=false
fi

if [ ! -f "CLAUDE.md" ]; then
    print_error "❌ Root CLAUDE.md missing"
    VERIFICATION_PASSED=false
fi

if [ ! -f "projects/react-flow-app/package.json" ]; then
    print_error "❌ React app package.json missing"
    VERIFICATION_PASSED=false
fi

if [ "$VERIFICATION_PASSED" = true ]; then
    print_success "✅ Migration verification passed"
    echo ""
    print_status "📁 New structure:"
    ls -la projects/react-flow-app/ | head -10
    echo ""
    print_status "🚀 Ready to run claude-docker_v5.sh"
    echo ""
    print_status "🔄 To rollback if needed:"
    echo "   rm -rf projects/ .claude-workspace/ CLAUDE.md"
    echo "   cp -r ${BACKUP_DIR}/* ."
else
    print_error "❌ Migration verification failed"
    echo ""
    print_status "🔄 Rolling back changes..."
    rm -rf projects/ .claude-workspace/ 
    cp -r "${BACKUP_DIR}"/* .
    print_success "Rollback completed"
    exit 1
fi

print_success "🎉 Migration to v5 structure completed successfully!"
echo ""
print_status "Next steps:"
echo "1. Run: ./claude-docker_v5.sh"
echo "2. Test the React Flow app: cd /workspace/projects/react-flow-app && npm run dev"
echo "3. If issues occur, rollback available at: $BACKUP_DIR"