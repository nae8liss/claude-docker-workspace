# Workspace Overview

A comprehensive development workspace for AI-powered analysis tools, worldbuilding systems, and user interface applications.

## 🎯 Quick Start

```bash
# Start development server
python3 projects/shared/scripts/test-server.py

# Access applications at http://localhost:8080/projects/[project-name]/
```

## 📁 Structure

```
workspace/
├── 📊 projects.md                    # Complete project overview
├── 📖 README.md                      # This file
├── 🔧 CLAUDE.md                      # Development guidelines  
├── 🐳 Dockerfile                     # Container configuration
├── 🚀 setup_github.sh                # Repository setup
│
├── 📂 projects/                      # Main development projects
│   ├── 🤖 image-analysis/           # Standalone HTML analysis tool
│   ├── 🧠 image-analysis-agent/     # Advanced Node.js analysis service
│   ├── 🖥️  analysis app/            # Next.js web application
│   ├── 📊 project-overview-app/     # Vue.js project dashboard
│   ├── 🎨 react-flow-app/           # React Flow canvas application  
│   ├── 🌍 worldbuilding-codex/      # Comprehensive worldbuilding system
│   ├── 🧪 worldbuilding-codex-experimental/  # Experimental features
│   └── 🔗 shared/                   # Common resources and utilities
│
├── 📚 documentation/                 # Guides and references
│   ├── 🛠️  setup-guides/            # Installation and configuration
│   └── 📋 guides/                   # Implementation and usage
│
└── 📦 archive/                      # Historical files and scripts
```

## 🚀 Featured Projects

### 🧠 Image Analysis Ecosystem
- **Analysis Agent**: Advanced AI-powered image analysis with batch processing
- **Analysis App**: Real-time web application with database integration  
- **Standalone Tool**: Quick HTML-based analysis for immediate use

### 🌍 Worldbuilding Platform
- **Core System**: Database-driven worldbuilding with faction tracking
- **Character Videos**: Automated video generation from character data
- **Avatar Videos**: Real-time avatar creation and streaming

### 🎨 User Interface Projects
- **React Flow App**: Interactive node-based canvas interface
- **Project Dashboard**: Vue.js overview of all workspace activities

## 🔧 Development Tools

### Shared Infrastructure
- **Development Server**: Python-based server with CORS support
- **Database Schemas**: Common database structures for testing
- **API Configurations**: Centralized service configurations

### Documentation System  
- **Setup Guides**: Environment configuration and installation
- **Implementation Guides**: Detailed technical documentation
- **Testing Procedures**: Comprehensive testing scenarios

## 📋 Getting Started

### 1. Environment Setup
```bash
# Clone and setup
git clone [repository]
cd workspace
chmod +x setup_github.sh
```

### 2. Choose Your Path

**For Image Analysis:**
```bash
# Quick start - HTML tool
python3 projects/shared/scripts/test-server.py
# Visit: http://localhost:8080/projects/image-analysis/

# Advanced features - Agent service  
cd projects/image-analysis-agent
npm install && npm start
```

**For Worldbuilding:**
```bash  
# Core system
cd projects/worldbuilding-codex/core
npm install
# Setup database from documentation/guides/
```

**For UI Development:**
```bash
# React Flow canvas
cd projects/react-flow-app  
npm install && npm run dev

# Vue.js dashboard
cd projects/project-overview-app
npm install && npm run dev
```

### 3. Development Workflow
1. Read project-specific `README.md` and `CLAUDE.md` files
2. Follow setup guides in `documentation/setup-guides/`
3. Use shared development server for testing
4. Reference implementation guides as needed

## 🔗 Project Relationships

```
Image Analysis Agent ←→ Character Videos (Shared analysis)
         ↓
    Analysis App (Real-time display)
         ↓  
 Project Dashboard (Metrics tracking)
         ↓
Worldbuilding Codex (Data integration)
```

## 📖 Key Documentation

- **[projects.md](projects.md)**: Complete project descriptions and status
- **[CLAUDE.md](CLAUDE.md)**: Development guidelines and best practices
- **[documentation/README.md](documentation/README.md)**: Full documentation index

### Essential Guides
- **Setup**: `documentation/setup-guides/Claude_CLI_user-pro.md`
- **Testing**: `documentation/guides/USER_TESTING_GUIDE.md`
- **Deployment**: `documentation/guides/DEPLOYMENT_GUIDE.md`

## 🎯 Project Status

| Project | Status | Tech Stack | Purpose |
|---------|--------|------------|---------|
| Image Analysis Agent | 🟢 Active | Node.js, AI APIs | Advanced image analysis |
| Analysis App | 🟢 Active | Next.js, TypeScript | Real-time web application |
| Character Videos | 🟡 Advanced | TypeScript, AI APIs | Video generation pipeline |
| React Flow App | 🟢 Active | React, TypeScript | Interactive canvas |
| Worldbuilding Codex | 🟢 Active | JavaScript, Supabase | Core worldbuilding system |

**Legend**: 🟢 Active Development • 🟡 Feature Complete • 🔵 Maintenance • 🟤 Experimental

## 🛠️ Technology Stack

- **Frontend**: React, Vue.js, TypeScript, HTML5
- **Backend**: Node.js, Python, FastAPI
- **Database**: Supabase, SQLite, PostgreSQL
- **AI/ML**: OpenAI, OpenRouter, Custom models
- **Tools**: Docker, Git, Claude Code

## 🎉 Success Metrics

- **8 Active Projects**: Fully functional and documented
- **Comprehensive Documentation**: Setup through deployment
- **Shared Infrastructure**: Reusable components and utilities
- **Clean Architecture**: Organized, maintainable codebase
- **Professional Workflow**: Git, Docker, automated testing

## 🤝 Contributing

1. Read project-specific `CLAUDE.md` files
2. Follow shared development guidelines
3. Use shared resources for common functionality
4. Document changes and update README files
5. Test across affected projects

---

**Ready to build amazing things!** 🚀✨

Choose a project above and dive into the future of AI-powered development tools.