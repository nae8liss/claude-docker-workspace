# Use Node.js LTS as base image
FROM node:18-bullseye

# Set working directory
WORKDIR /workspace

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    nano \
    build-essential \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install Claude Code globally
RUN npm install -g @anthropic-ai/claude-code

# Create npm cache directory and set permissions
RUN mkdir -p /root/.npm && chmod -R 755 /root/.npm

# Set up git configuration (basic setup for cloning)
RUN git config --global user.name "Dev User" && \
    git config --global user.email "dev@local.dev" && \
    git config --global init.defaultBranch main

# Install common React/Node development tools (yarn is already included in base image)
RUN npm install -g \
    create-react-app \
    vite \
    pnpm \
    typescript \
    @types/node

# Set environment variables
ENV NODE_ENV=development
ENV NPM_CONFIG_CACHE=/root/.npm
ENV ANTHROPIC_API_KEY=""

# Expose common development ports
EXPOSE 3000 5173 8080 4173

# Keep container running and ready for claude-code
CMD ["tail", "-f", "/dev/null"]