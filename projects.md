# Projects Overview

This workspace contains multiple interconnected projects focused on AI-powered analysis, worldbuilding, and user interface development. Each project is self-contained with its own documentation, dependencies, and configuration.

## 📁 Project Structure

```
/workspace/
├── projects/                     # Main projects directory
│   ├── shared/                   # Common resources and utilities
│   ├── image-analysis/           # Standalone image analysis tools
│   ├── image-analysis-agent/     # Advanced image analysis service
│   ├── analysis app/             # Next.js analysis application  
│   ├── project-overview-app/     # Vue.js project dashboard
│   ├── react-flow-app/           # React Flow canvas application
│   ├── worldbuilding-codex/      # Comprehensive worldbuilding system
│   └── worldbuilding-codex-experimental/  # Experimental features
├── documentation/                # General documentation
└── archive/                      # Historical files and scripts
```

## 🚀 Active Projects

### Image Analysis Ecosystem

#### **Muse Analysis App** (`/projects/muse-analysis-app/`)
Next-generation AI-powered analysis application combining the best features from previous implementations.
- **Status**: Under Development
- **Tech Stack**: TBD - Modern web technologies
- **Features**: Unified analysis platform, enhanced AI integration, scalable architecture
- **Archive**: Contains previous Analysis App (Next.js) and Image Analysis (HTML) implementations
- **Purpose**: Consolidate and advance analysis capabilities

#### **Image Analysis Agent** (`/projects/image-analysis-agent/`)
Advanced Node.js service for sophisticated image analysis with AI integration.
- **Status**: Active Development
- **Tech Stack**: Node.js, AI/ML APIs
- **Features**: Visual essence analysis, worldbuilding integration, batch processing
- **Key Files**: `src/services/EnhancedEssenceAnalyzer.js`, `cli/analyze.js`

### Worldbuilding System

#### **Worldbuilding Codex** (`/projects/worldbuilding-codex/`)
Comprehensive worldbuilding platform with multiple sub-projects.

**Core System** (`core/`)
- **Status**: Active Development
- **Tech Stack**: JavaScript, Supabase, HTML5
- **Features**: Database management, faction tracking, codex viewer
- **Key Components**: Database extensions, sample data, agents system

**Character Videos** (`character-videos/`)
- **Status**: Advanced Development
- **Tech Stack**: TypeScript, Node.js, AI APIs
- **Features**: Automated character video generation, interactive creation tools
- **Automation**: Complete pipeline from character data to video output
- **Database**: Video assets schema, character profiles

**Avatar Videos** (`avatar-videos/`)
- **Status**: Research & Development
- **Tech Stack**: Python backend, TypeScript frontend, LiveKit
- **Features**: Real-time avatar generation, video streaming
- **Architecture**: Microservices with FastAPI backend

**Character Videos Archive** (`character-videos-archive/`)
- **Status**: Archived
- **Purpose**: Historical implementations and research
- **Contains**: Previous approaches, minimal implementations, local storage

#### **Worldbuilding Codex Experimental** (`/projects/worldbuilding-codex-experimental/`)
Testing ground for new features and experimental implementations.
- **Status**: Experimental
- **Features**: Prototype codex viewer, experimental database features
- **Purpose**: Safe environment for testing before main integration

### User Interface Projects

#### **React Flow App** (`/projects/react-flow-app/`)
Interactive canvas application using React Flow for node-based interfaces.
- **Status**: Active Development
- **Tech Stack**: React, TypeScript, React Flow, Tailwind CSS
- **Features**: Draggable nodes, floating UI elements, extensible node system
- **Architecture**: Component-based with node registry system

#### **Project Overview App** (`/projects/project-overview-app/`)
Vue.js dashboard for workspace project management and overview.
- **Status**: Active Development
- **Tech Stack**: Vue.js, Tailwind CSS, Vite
- **Features**: Project visualization, stats tracking, workspace analysis
- **Purpose**: Central dashboard for all workspace projects

## 🔧 Shared Resources (`/projects/shared/`)

### Configuration & APIs
- **API Keys**: `api-keys.md` - Service API configurations
- **Supabase**: `supabase.md` - Database configuration and setup
- **Scripts**: Common utilities and helper scripts
- **Database**: Shared schema files and database utilities

## 📚 Documentation Structure

### Setup Guides (`/documentation/setup-guides/`)
- **Claude CLI User Guide**: `Claude_CLI_user-pro.md`
- **GitHub Setup**: `GITHUB_SETUP.md`

### Implementation Guides (`/documentation/guides/`)
- **Analysis App Recommendations**: `ANALYSIS_APP_RECOMMENDATIONS.md`
- **Codex Integration Plan**: `CODEX_INTEGRATION_PLAN.md`
- **Codex Viewer Functionality**: `CODEX_VIEWER_FUNCTIONALITY.md`
- **Deployment Guide**: `DEPLOYMENT_GUIDE.md`
- **Image Analysis App README**: `IMAGE_ANALYSIS_APP_README.md`
- **User Testing Guide**: `USER_TESTING_GUIDE.md`
- **Worldbuilding Database Info**: `WORLDBUILDING_DATABASE_INFO.md`

## 🔄 Project Relationships

### Integration Points
1. **Image Analysis Agent** ↔ **Character Videos**: Shared image analysis capabilities
2. **Worldbuilding Codex Core** ↔ **All Sub-projects**: Central database and data models
3. **Shared Resources** ↔ **All Projects**: Common APIs, configurations, utilities
4. **Muse Analysis App** ↔ **Image Analysis Agent**: Next-gen unified analysis platform

### Data Flow
```
Image Upload → Image Analysis Agent → Character Videos → Worldbuilding Codex
                ↓
        Muse Analysis App (Unified platform)
                ↓
        Project Overview App (Metrics & tracking)
```

## 🚦 Project Status Legend
- **Active Development**: Actively being worked on, frequent updates
- **Advanced Development**: Feature-complete, optimization and refinement phase  
- **Research & Development**: Experimental, architecture and feature exploration
- **Maintenance**: Stable, minimal changes, bug fixes only
- **Archived**: Historical reference, no active development
- **Experimental**: Proof-of-concept, testing new ideas

## 🎯 Getting Started

1. **For Image Analysis**: Start with `/projects/muse-analysis-app/` for unified platform or `/projects/image-analysis-agent/` for advanced features
2. **For Worldbuilding**: Begin with `/projects/worldbuilding-codex/core/`
3. **For UI Development**: Explore `/projects/react-flow-app/` or `/projects/project-overview-app/`
4. **For Reference Implementations**: Check `/projects/muse-analysis-app/archive/` for previous analysis apps

Each project contains its own `README.md` and `CLAUDE.md` files with detailed setup and usage instructions.