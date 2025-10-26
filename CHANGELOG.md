# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.11] - 2025-10-26

### Changed
- Reorganized command source code into semantic categories (core, fs, local)
- Moved content commands (about, portfolio, blog, contact, skills) from /usr/bin to /usr/local/bin in virtual filesystem
- Core system commands remain in /usr/bin (help, clear, history, date, whoami, alias, unalias)
- Filesystem commands remain in /usr/bin (ls, cd, pwd, cat, tree)
- Updated command file structure: src/commands/core/, src/commands/fs/, src/commands/local/
- No functional changes to command behavior, purely organizational improvements

## [0.0.10] - 2025-10-26

### Added
- Implemented whoami command to display current username
- Added getUsername() method to Terminal component for querying current user

### Changed
- Changed default logged-in user from 'guest' to 'darin'
- Updated home directory from /home/guest to /home/darin
- Updated terminal prompt to display darin@darinchambers.com:~/path$
- Updated FileSystem path shortening to treat /home/darin as ~ (tilde)
- Kept /home/guest directory intact in virtual filesystem for future user switching

## [0.0.9] - 2025-10-25

### Added
- Implemented alias command for creating and displaying command aliases
- Implemented unalias command for removing command aliases
- Implemented date command to display current date and time
- Created AliasManager utility class for managing user-defined command aliases
- Added alias persistence to virtual file system in .alias file at /home/guest/.alias
- Added writeFile() method to FileSystem for creating and updating files
- Integrated alias resolution into Terminal command execution flow
- Added setAliasManager() method to Terminal component
- Updated help command documentation to include alias, unalias, and date commands
- Added new commands to /usr/bin in virtual file system

## [0.0.8] - 2025-10-25

### Added
- Implemented history command to display command history with numbered entries
- Added getHistory() method to TerminalInput component for accessing command history
- Added getInput() method to Terminal component to expose TerminalInput instance
- Added history command to /usr/bin in virtual file system
- Updated help command documentation to include history command

### Fixed
- Fixed terminal font rendering for tree command output by adjusting line-height to 1.0
- Eliminated gaps in vertical box-drawing characters by removing line margins
- Improved monospace font rendering with Courier New for consistent character spacing
- Changed white-space from pre-wrap to pre for better tree visualization

## [0.0.7] - 2025-10-25

### Added
- Implemented tree command for visualizing directory structure with hierarchical ASCII output
- Added getTree() method to FileSystem utility for generating directory tree visualization
- Added buildTree() helper method with support for customizable depth limits
- Tree command supports -L flag for specifying maximum depth (default: 3 levels)
- Tree output uses ASCII box-drawing characters (├──, └──, │) for visual hierarchy
- Directories are sorted before files in tree output for better organization
- Added tree command to /usr/bin in virtual file system
- Updated help command documentation to include tree command

## [0.0.6] - 2025-10-25

### Changed
- Repositioned terminal prompt and input field to flow naturally within terminal output area
- Terminal input now appears as the last line in the output, scrolling with content like a real terminal
- Updated TerminalOutput component to insert content before the input line
- Modified clear command to preserve input line while clearing output
- Improved terminal scrolling behavior to keep input visible

## [0.0.5] - 2025-10-25

### Added
- Implemented core content commands (about, portfolio, blog, contact, skills) with professional information and interactive displays
- Created about command displaying bio, expertise, experience, and philosophy
- Created portfolio command showcasing 4 major projects with detailed views
- Created blog command with 3 blog posts covering AI/ML, distributed systems, and developer experience
- Created contact command with email, LinkedIn, GitHub, Twitter, and availability information
- Created skills command displaying technical skills organized by category (AI/ML, Languages, Cloud, Frameworks, Architecture, Leadership)
- Added comprehensive content data files for all commands
- Updated file system with additional files in /home/darin (contact.txt, blog.txt)
- Updated /usr/bin with all new command references
- Redesigned navigation bar to feature core content commands
- Enhanced help command with organized command categories
- Updated welcome message to highlight core features

## [0.0.4] - 2025-10-25

### Added
- Implemented virtual Linux-like file system with navigation commands (ls, cd, pwd, cat) and directory structure
- Created FileSystem utility class with support for directories, files, and path resolution
- Added directory structure: /root, /home/guest, /home/darin, /usr/bin, /usr/local/bin
- Implemented ls command for listing directory contents
- Implemented cd command for changing directories with prompt updates
- Implemented pwd command for displaying current working directory
- Implemented cat command for reading file contents
- Added easter egg content in /home/darin directory (.secret file)
- Created informational files: README.txt, about.txt, projects.txt
- Terminal prompt now reflects current directory location
- Updated navigation bar with file system commands
- Updated help command with file system command documentation

## [0.0.3] - 2025-10-25

### Added
- Added hybrid UI navigation with clickable command shortcuts that integrate seamlessly with terminal input
- Created Navigation component for managing clickable command links
- Implemented programmatic command execution from navigation clicks
- Added navigation bar with retro terminal styling and hover effects
- Navigation items automatically execute commands when clicked
- Integrated navigation with command history tracking
- Added mobile-responsive navigation layout

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
