#!/bin/bash

# Claude Code Docker Setup Script v6 - Avatar Project Port Configuration
# Usage: ./claude-docker_v6.sh

set -e  # Exit on any error

# Configuration
CONTAINER_NAME="claude-code-workspace"
IMAGE_NAME="claude-code-dev"
PROJECT_DIR="/Users/youri/Documents/dev/Docker/Claude_code_image"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_highlight() {
    echo -e "${CYAN}[HIGHLIGHT]${NC} $1"
}

print_status "Starting Claude Code Docker setup v6 with Avatar Project ports..."

# Navigate to project directory
print_status "Navigating to project directory: $PROJECT_DIR"
cd "$PROJECT_DIR" || {
    print_error "Could not navigate to $PROJECT_DIR"
    exit 1
}

# Ensure proper directory structure exists on host
print_status "Ensuring proper directory structure exists..."
mkdir -p "$PROJECT_DIR/projects"
mkdir -p "$PROJECT_DIR/.claude-workspace"

# Create CLAUDE.md if it doesn't exist
if [ ! -f "$PROJECT_DIR/CLAUDE.md" ]; then
    print_warning "CLAUDE.md not found. Creating default workspace configuration..."
    cat > "$PROJECT_DIR/CLAUDE.md" << 'EOF'
# Claude Code Working Guidelines

## Project Structure
This workspace contains multiple projects organized under `/workspace/projects/`:

### Current Projects
- **worldbuilding-codex**: Comprehensive worldbuilding system with sub-projects
  - Location: `/workspace/projects/worldbuilding-codex/`
  - Core system: `/workspace/projects/worldbuilding-codex/core/`
  - Character videos: `/workspace/projects/worldbuilding-codex/character-videos/`
  - Avatar videos: `/workspace/projects/worldbuilding-codex/avatar-videos/`

- **react-flow-app**: React Flow canvas application with floating UI elements
  - Location: `/workspace/projects/react-flow-app/`
  - Project-specific instructions: `/workspace/projects/react-flow-app/CLAUDE.md`
  - Documentation: `/workspace/projects/react-flow-app/docs/`
  - Claude config: `/workspace/projects/react-flow-app/.claude/`

- **shared**: Common resources and configuration
  - Location: `/workspace/projects/shared/`
  - API keys and service configurations

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
    print_success "Default CLAUDE.md created"
fi

# Stop and remove existing container if it exists
if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    print_warning "Existing container found. Stopping and removing..."
    docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || true
    docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || true
    print_success "Existing container removed"
fi

# Build the Docker image
print_status "Building Docker image: $IMAGE_NAME"
if docker build -t "$IMAGE_NAME" .; then
    print_success "Docker image built successfully"
else
    print_error "Failed to build Docker image"
    exit 1
fi

# Run the container with enhanced port mapping including avatar project ports
print_status "Starting container: $CONTAINER_NAME"
if docker run -d \
    --name "$CONTAINER_NAME" \
    -v "$PROJECT_DIR:/workspace" \
    -v "$PROJECT_DIR/.claude-workspace:/root/.claude" \
    -v npm-cache:/root/.npm \
    --network bridge \
    -p 3000:3000 \
    -p 3001:3001 \
    -p 5173:5173 \
    -p 8080:8080 \
    -p 8081:8081 \
    -p 4173:4173 \
    -p 9000:9000 \
    -p 8090:8090 \
    -p 8001:8001 \
    -p 8002:8002 \
    -p 8003:8003 \
    -p 8004:8004 \
    -p 8005:8005 \
    "$IMAGE_NAME"; then
    print_success "Container started successfully"
else
    print_error "Failed to start container"
    exit 1
fi

# Wait a moment for container to fully start
print_status "Waiting for container to initialize..."
sleep 5

# Test port connectivity including avatar ports
print_status "Testing port connectivity..."
for port in 3000 5173 8080 8090; do
    if timeout 2 bash -c "</dev/tcp/localhost/$port" 2>/dev/null; then
        print_success "Port $port is accessible"
    else
        print_warning "Port $port is not yet accessible (this is normal if no service is running)"
    fi
done

# Check if container is running
if docker ps --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    print_success "Container is running!"
    echo ""
    print_status "Container Details:"
    echo "  Name: $CONTAINER_NAME"
    echo "  Workspace: /workspace (mapped to $PROJECT_DIR)"
    echo "  Claude Config: /root/.claude (mapped to $PROJECT_DIR/.claude-workspace)"
    echo "  Enhanced Port Mapping:"
    echo "    - 3000:3000 (Primary React dev server)"
    echo "    - 3001:3001 (Alternative React port)"
    echo "    - 5173:5173 (Vite default port)"
    echo "    - 8080:8080 (Alternative web server)"
    echo "    - 8081:8081 (Additional web port)"
    echo "    - 4173:4173 (Vite preview)"
    echo "    - 9000:9000 (Development tools)"
    echo ""
    print_highlight "🎭 Avatar Project Ports:"
    echo "    - 8090:8090 (Avatar Room Server - PRIMARY)"
    echo "    - 8001:8001 (Avatar services)"
    echo "    - 8002:8002 (Avatar services)"
    echo "    - 8003:8003 (Avatar services)"
    echo "    - 8004:8004 (Avatar services)"
    echo "    - 8005:8005 (Avatar services)"
    echo ""
    print_status "Persistent Structure:"
    echo "  ├── /workspace/CLAUDE.md (workspace instructions)"
    echo "  ├── /workspace/projects/ (all projects)"
    echo "  │   ├── worldbuilding-codex/ (Worldbuilding system)"
    echo "  │   │   └── avatar-videos/ (Live Avatar Project)"
    echo "  │   └── react-flow-app/ (React Flow project)"
    echo "  └── /workspace/.claude-workspace/ (global Claude config)"
    echo ""
    print_status "To access the container, run:"
    echo "  docker exec -it $CONTAINER_NAME bash"
    echo ""
    print_status "Claude Code will use your web authentication"
    echo "  Run 'claude-code' inside the container to get started"
    echo ""
    print_highlight "🎭 Live Avatar URLs:"
    echo "  http://localhost:8090 (Avatar Room Server - MAIN)"
    echo "  http://localhost:8001-8005 (Additional avatar services)"
    echo ""
    print_highlight "React Flow App URLs:"
    echo "  http://localhost:3000 (if using port 3000)"
    echo "  http://localhost:5173 (if using port 5173 - Vite default)"
    echo "  http://localhost:8080 (if using port 8080)"
    echo ""
    print_status "Avatar Project Development Tips:"
    echo "  - Navigate to: cd /workspace/projects/worldbuilding-codex/avatar-videos/"
    echo "  - Start avatar system: ./start_live_avatar.sh"
    echo "  - Avatar server runs on port 8090"
    echo "  - All avatar services now have proper port mapping"
    echo "  - Changes are automatically persisted to host filesystem"
    echo ""
    print_status "To stop the container later, run:"
    echo "  docker stop $CONTAINER_NAME"
else
    print_error "Container failed to start properly"
    print_status "Checking container logs..."
    docker logs "$CONTAINER_NAME"
    exit 1
fi

print_success "Claude Code Docker environment v6 with Avatar Project support is ready!"

print_status "Entering container automatically..."
echo ""
print_highlight "You are now inside the Docker container."
print_status "Navigate to: cd /workspace/projects/worldbuilding-codex/avatar-videos/"
print_status "Start the Live Avatar system: ./start_live_avatar.sh"
print_status "Access Avatar frontend: http://localhost:8090"
print_status "Type 'exit' to leave the container when done."
echo ""

# Automatically enter the container
exec docker exec -it "$CONTAINER_NAME" bash