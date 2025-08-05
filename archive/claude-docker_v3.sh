#!/bin/bash

# Claude Code Docker Setup Script
# Usage: ./claude-docker

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

print_status "Starting Claude Code Docker setup..."

# Navigate to project directory
print_status "Navigating to project directory: $PROJECT_DIR"
cd "$PROJECT_DIR" || {
    print_error "Could not navigate to $PROJECT_DIR"
    exit 1
}

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

# Run the container
print_status "Starting container: $CONTAINER_NAME"
if docker run -d \
    --name "$CONTAINER_NAME" \
    -v "$PROJECT_DIR:/workspace" \
    -v "$PROJECT_DIR/.claude:/root/.claude" \
    -v npm-cache:/root/.npm \
    -p 3000:3000 \
    -p 5173:5173 \
    -p 8080:8080 \
    -p 4173:4173 \
    "$IMAGE_NAME"; then
    print_success "Container started successfully"
else
    print_error "Failed to start container"
    exit 1
fi

# Wait a moment for container to fully start
print_status "Waiting for container to initialize..."
sleep 3

# Check if container is running
if docker ps --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    print_success "Container is running!"
    echo ""
    print_status "Container Details:"
    echo "  Name: $CONTAINER_NAME"
    echo "  Workspace: /workspace (mapped to $PROJECT_DIR)"
    echo "  Ports: 3000, 5173, 8080, 4173"
    echo ""
    print_status "To access the container, run:"
    echo "  docker exec -it $CONTAINER_NAME bash"
    echo ""
    print_status "Claude Code will use your web authentication"
    echo "  Run 'claude-code' inside the container to get started"
    echo ""
    print_status "To access your React app, visit:"
    echo "  http://localhost:3000 (or appropriate port)"
    echo ""
    print_status "To stop the container later, run:"
    echo "  docker stop $CONTAINER_NAME"
else
    print_error "Container failed to start properly"
    print_status "Checking container logs..."
    docker logs "$CONTAINER_NAME"
    exit 1
fi

print_success "Claude Code Docker environment is ready!"

print_status "Entering container automatically..."
echo ""
print_status "You are now inside the Docker container. Run 'claude' to start Claude Code!"
print_status "Type 'exit' to leave the container when done."
echo ""

# Automatically enter the container
exec docker exec -it "$CONTAINER_NAME" bash