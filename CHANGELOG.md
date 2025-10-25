# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.2] - 2025-10-25

### Added
- Implemented interactive terminal UI with command parser, input/output system, command history navigation, and tab completion
- Created Terminal component for managing terminal state and interactions
- Built TerminalInput component with arrow key history navigation and tab completion
- Built TerminalOutput component for rendering command output with styling
- Implemented CommandParser utility for parsing command strings with quoted argument support
- Implemented CommandDispatcher utility for routing commands with alias support
- Added Command interface for type-safe command implementations
- Created retro terminal aesthetics with CRT effects, scan lines, and green monospace styling
- Added basic commands: help and clear
- Implemented welcome message displaying tagline

## [0.0.1] - 2025-10-25

### Added
- Initial project setup with TypeScript, Vite build system, and base directory structure for terminal-inspired personal website
- Package configuration with development scripts
- TypeScript configuration optimized for modern browser targets
- Git repository initialization with comprehensive .gitignore
- Organized source directory structure (components, commands, styles, utils, data)
- Public assets directory for static resources
