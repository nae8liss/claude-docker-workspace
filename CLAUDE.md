# Claude Code Working Guidelines

## Project Structure
This workspace contains multiple projects organized under `/workspace/projects/`:

### Current Projects
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

## General Guidelines
- Default to the project-specific CLAUDE.md for detailed instructions
- Maintain project isolation - don't mix dependencies or configurations
- Each project should be self-contained and runnable independently