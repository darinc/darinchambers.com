# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.53] - 2025-11-05

### Changed
- Unified all content to markdown-first approach with YAML frontmatter
- Reorganized content structure: blog and portfolio now in src/content/ subdirectories
- Portfolio command now reads from markdown files instead of TypeScript data

### Removed
- Unused TypeScript data files (about.ts, contact.ts, skills.ts)
- src/data/ and src/blog/ directories replaced by src/content/ and src/types/

## [0.0.52] - 2025-11-05

### Changed
- H1 and H2 headings now use cyan color via hue-rotate filter for better visual hierarchy
- H1 headings styled with background tint and bottom border instead of glow effect

## [0.0.51] - 2025-11-04

### Fixed
- CommandArgs now properly handles string-value flags like `-f` for figlet
- figlet `-f` flag now correctly accepts font names (banner, slant, small, standard)

## [0.0.50] - 2025-11-03

### Added
- figlet command for converting text to ASCII art banners
- Support for multiple fonts (standard, slant, banner, small)
- Text alignment options (center, left, right)
- Stdin support for piping text to figlet

## [0.0.49] - 2025-11-03

### Fixed
- ddate command numeric argument order now correctly uses month-day-year format

## [0.0.48] - 2025-11-03

### Added
- ddate command for displaying dates in Discordian calendar format
- Discordian calendar utility with full conversion logic
- New NOVELTY COMMANDS category in help documentation
- Support for St. Tib's Day (Feb 29) and Apostle Day detection
- Created /src/commands/novelty/ directory for esoteric commands

## [0.0.47] - 2025-11-03

### Added
- Secondary background color customization in settings CLI and UI
- Background (Secondary) color picker in settings advanced section

### Changed
- Amber theme secondary background color darkened from #241c14 to #0f0b08 for better contrast

## [0.0.46] - 2025-11-03

### Fixed
- CommandArgs flag parsing now correctly handles positional arguments after combined flags
- ls command with flags and file argument now works in any order (e.g., `ls -alh .secret`)

## [0.0.45] - 2025-11-03

### Added
- ls command now supports -a, -l, and -h flags for enhanced directory listing
- Long format listing with permissions, owner, size, date, and filename
- Human-readable file sizes (e.g., 1.1K, 2.4M) with -h flag
- Show hidden files (starting with .) with -a flag

### Changed
- CommandArgs now expands combined short flags (e.g., -alh → -a -l -h)
- FileSystemNode interface extended with metadata fields (permissions, owner, size, modifiedTime, isHidden)

## [0.0.44] - 2025-11-03

### Added
- URL routing system with History API for shareable deep links
- Support for direct navigation to blog posts and pages via URLs
- Automatic URL sync when typing commands in terminal

### Changed
- Clear command now resets URL to home route

### Fixed
- Updated all tests to reflect default theme change to Amber

## [0.0.43] - 2025-11-03

### Added
- Automatically execute about command on page load for better first impression

### Changed
- Default theme changed from Green to Amber
- Header prompt font size reduced from 16px to 14px

### Fixed
- Header tagline now uses theme-aware color for proper contrast on Paper theme

## [0.0.42] - 2025-11-03

### Added
- Environment variable system with platform variables (HOME, USER, PWD, OLDPWD, HOSTNAME)
- Variable expansion in commands using $VAR and ${VAR} syntax
- env and export commands for managing environment variables
- Customizable prompt format with bash-style escape sequences

### Changed
- Default prompt format simplified to "\W \$ " showing only last directory
- Prompt updates immediately when changed via settings command

### Fixed
- Root directory now correctly displays as "/" instead of "~" in prompt
- Custom colors properly cleared when switching to preset themes
- cd command now supports "cd -" to return to previous directory

## [0.0.41] - 2025-11-02

### Added
- Settings command to virtual filesystem at /usr/local/bin/settings

### Fixed
- cd command no longer changes username based on directory navigation
- User remains consistent when navigating to different home directories

## [0.0.40] - 2025-11-02

### Added
- TODO.md with prioritized backlog for settings enhancements

### Removed
- SETTINGS.md implementation plan (replaced by TODO.md)

## [0.0.39] - 2025-11-02

### Added
- Comprehensive unit tests for settings command
- Test coverage for all settings subcommands and error handling
- Validation tests for theme switching, fonts, and effects

## [0.0.38] - 2025-11-02

### Added
- Paper theme with teal accent and light backgrounds for panels
- Secondary background color system for theme-aware panels and headers

### Changed
- Theme buttons now display with their actual theme background colors
- Simplified theme labels: Green, Amber, White, Cyan, Paper
- Default settings: scan lines off, glow off, border on

### Fixed
- Page border now properly visible around header and navigation
- Glow effect now uses theme accent color instead of hardcoded green

## [0.0.37] - 2025-11-02

### Fixed
- Updated SettingsManager test suite to align with refactored effects architecture
- Replaced deprecated CRT effect references with granular scanLines, glow, and border controls

## [0.0.36] - 2025-11-01

### Added
- Page border setting with theme-aware styling
- Live updates for all visible settings panels when settings change
- Responsive button wrapping for theme selection buttons

## [0.0.35] - 2025-11-01

### Changed
- Split CRT effects into separate scan lines and glow controls
- Theme buttons now display in their respective theme colors
- Improved slider track visibility with theme-aware styling

### Fixed
- Slider thumb now properly centered on track with rounded rectangle shape
- Settings panel spacing adjusted for better visual hierarchy

## [0.0.34] - 2025-11-01

### Added
- Interactive settings UI with clickable controls for managing preferences
- Theme selection buttons with color preview circles
- Font size slider and family dropdown controls
- Collapsible advanced section for custom color picking
- Real-time CSS updates via custom event system

## [0.0.33] - 2025-11-01

### Added
- Settings command with CLI interface for managing terminal preferences
- Theme switching via command line with four preset themes
- Font size and family configuration commands
- CRT effects and animation speed toggle commands

## [0.0.32] - 2025-11-01

### Added
- ThemeManager service for applying color themes to terminal interface
- Four preset themes: Green, Yellow, White, and Light Blue
- Custom color support with hex color validation

## [0.0.31] - 2025-11-01

### Added
- SettingsManager service for managing user-configurable terminal preferences
- Settings type definitions with theme, font, and effects configuration
- Dual storage system using localStorage and virtual filesystem

## [0.0.30] - 2025-10-31

### Changed
- Refactored MarkdownRenderer to use marked library for improved markdown parsing
- Renamed MarkdownRenderer to MarkdownService for clarity

### Added
- MarkedAdapter module to integrate marked library with application
- Test suites for MarkdownService and MarkedAdapter

## [0.0.29] - 2025-10-30

### Added
- Comprehensive test suite for markdown core modules (ParseContext, InlineRenderer, FrontmatterParser)
- Test fixture infrastructure with markdown samples and loader utilities

### Changed
- Extracted HTML escaping logic to shared utility module to eliminate duplication

## [0.0.28] - 2025-10-29

### Fixed
- Excessive whitespace between list items in markdown rendering

## [0.0.27] - 2025-10-29

### Fixed
- Cat command now displays file contents when run standalone

## [0.0.26] - 2025-10-29

### Added
- CommandExecutor class to handle command execution logic separately from UI

### Changed
- Refactored Terminal component to extract execution logic into CommandExecutor
- Terminal constructor now uses dependency injection for dispatcher and executor

### Fixed
- Navigation clicks now support piped commands
- Fixed missing raw flag check in executeCommand method

## [0.0.25] - 2025-10-29

### Changed
- Updated blog and tree commands to use CommandArgs for consistent argument parsing
- Fixed TypeScript unused parameter warnings across all command files

## [0.0.24] - 2025-10-29

### Added
- Centralized constants module for paths and command signals
- Custom error class hierarchy with AppError, FileSystemError, and CommandNotFoundError
- CommandArgs class for typed argument parsing with flag and positional support

### Changed
- Standardized error handling across FileSystemService and CommandDispatcher
- Eliminated magic strings by consolidating paths and signals into constants

## [0.0.23] - 2025-10-29

### Changed
- Refactored FileSystem into modular architecture with separated concerns
- Split monolithic FileSystem class into IFileSystem interface, FileSystemService implementation, and FileSystemInitializer
- Updated all commands to depend on IFileSystem interface for improved testability
- Added comprehensive FileSystem test suite with 41 new tests

## [0.0.22] - 2025-10-29

### Added
- Complete test suite for Command Parsing System with 81 tests
- CommandParser tests with 100% statement coverage
- PipelineParser tests with 100% statement coverage
- CommandDispatcher tests with 97.5% statement coverage

## [0.0.21] - 2025-10-29

### Added
- Vitest testing framework with jsdom environment and coverage reporting
- Test infrastructure with organized directory structure for unit, integration, and E2E tests
- Testing utilities including @testing-library/dom and @testing-library/user-event
- Initial test suite with CommandParser and PipelineParser example tests (43 tests passing)
- Test scripts for running, watching, and generating coverage reports (test, test:ui, test:coverage, test:watch, test:run)
- Vitest configuration with coverage thresholds set to 80% for lines, functions, branches, and statements

## [0.0.20] - 2025-10-28

### Changed
- Refactored MarkdownRenderer to reduce cyclomatic complexity from ~18 to <5 per method
- Restructured markdown parsing using Chain of Responsibility pattern with dedicated handlers
- Split monolithic 269-line MarkdownRenderer into modular components for better maintainability

### Added
- ParseContext class for managing markdown parsing state
- LineHandler interface for extensible markdown element processing
- InlineRenderer utility for processing inline markdown (bold, italic, code, links)
- Specialized handlers: CodeBlockHandler, HeaderHandler, ListHandler, EmptyLineHandler, ParagraphHandler
- MarkdownParser orchestrator for coordinating handler chain execution
- FrontmatterParser for YAML frontmatter extraction and rendering
- Comprehensive code complexity analysis report in audits/ directory
- Detailed refactoring plan documentation for markdown renderer improvements

### Technical
- Reduced average method complexity by 83% in markdown rendering system
- Improved code maintainability and testability through separation of concerns
- Maintained backward compatibility - no breaking changes to public API
- MarkdownRenderer facade preserves existing interface while delegating to new architecture

## [0.0.19] - 2025-10-27

### Changed
- Enhanced all command outputs with rich markdown rendering for improved readability
- Converted static content commands (about, contact, skills, help) to markdown format
- Implemented dynamic markdown generation for portfolio and blog list views
- Added ContentFormatter utility for consistent markdown generation
- All commands now use MarkdownRenderer with styled HTML output

### Added
- Created markdown content files in /home/darin/content/ directory
- Added about.md, contact.md, skills.md, and help.md content files

## [0.0.18] - 2025-10-27

### Changed
- Refactored monolithic CSS file into modular components for better maintainability
- Split terminal.css (520 lines) into 10 focused stylesheet modules
- Organized styles by component: variables, base, header, navigation, container, io, scrollbar, markdown, and responsive

## [0.0.17] - 2025-10-26

### Added
- Navigation links now automatically clear terminal before executing clicked command for cleaner UX
- Navigation responsive breakpoints at 480px and 375px for better mobile display

### Fixed
- Fixed horizontal scrolling on mobile devices (iPhone) in terminal window
- Navigation links no longer wrap to multiple lines on small mobile devices
- Added overflow-x: hidden to body, terminal-container, and header-ascii
- Added max-width constraints (100vw, 100%) to prevent horizontal overflow
- Progressively reduced font size, padding, and gap spacing to fit all navigation items on one line

### Changed
- Navigation links scale down to 11px font on screens ≤ 480px
- Navigation links scale down to 10px font on screens ≤ 375px
- Reduced gap spacing between navigation items on smaller screens (6px at 480px, 5px at 375px)
- Adjusted padding to 2px 5px at 480px and 2px 4px at 375px for compact layout
- Terminal.executeCommand() now accepts optional clearFirst parameter to clear terminal before command execution
- Note: Did not add overflow-x: hidden to #terminal-output as it breaks scroll-to-bottom behavior

## [0.0.16] - 2025-10-26

### Added
- Rainbow gradient ASCII art header displaying "DARIN CHAMBERS" in large block letters
- Header component with colorful gradient styling inspired by figlet and lolcat
- AsciiArt utility for generating ASCII art text
- Command prompt reference "$ whoami | figlet | lolcat" displayed in header
- Fully responsive header with progressive scaling across all screen sizes
- Multiple responsive breakpoints (1169px, 1024px, 768px, 640px, 480px, 375px)
- Z-index layering to handle header/prompt overlap gracefully

### Changed
- Replaced "dc.com" navigation brand with prominent ASCII art header
- Navigation bar now centers command links without brand text
- Welcome message simplified to remove redundant branding text (now shown in header)
- Enhanced visual hierarchy with gradient-styled branding at page top
- Tagline styled in grey for better visual contrast
- Header prompt positioned on same line as ASCII art on large screens
- Header prompt automatically hidden on screens below 1169px width
- Progressive font scaling ensures header fits on mobile devices down to 375px

## [0.0.15] - 2025-10-26

### Added
- echo command for displaying text output with full pipe support
- Support for -e flag in echo to interpret escape sequences (\n, \t, \\, etc.)
- Stdin passthrough in echo when no arguments provided (useful in pipelines)

### Changed
- Help command updated to include echo in CORE COMMANDS section

## [0.0.14] - 2025-10-26

### Added
- Command piping support with Unix-style pipe operator (|) for chaining commands
- PipelineParser utility for parsing pipe syntax while respecting quoted strings
- stdin parameter to Command interface for receiving piped input
- raw flag in CommandResult interface to prevent double-display during piping
- dispatchPipeline method in CommandDispatcher for sequential command execution
- Pipe detection logic in Terminal component routing to appropriate dispatcher

### Changed
- cat command now sets raw flag for seamless piping integration
- render command accepts stdin as alternative to file argument for pipe support
- All command execute signatures updated with optional stdin parameter
- Terminal output logic skips display when raw flag is set
- Pipeline stops execution on first error for clear error reporting

## [0.0.13] - 2025-10-26

### Added
- Markdown rendering command (render) to display formatted markdown with rich styling
- MarkdownRenderer utility with support for headers, bold, italic, code blocks, lists, and links
- HTML output support in command system via html flag in CommandResult interface
- CSS styles for markdown rendering with proper typography, colors, and spacing
- writeHTML method in TerminalOutput component for rendering formatted HTML content
- render command in /usr/bin for converting markdown files to formatted display

### Changed
- CommandResult interface now supports optional html flag to indicate HTML output
- Terminal output system can now display both plain text and formatted HTML content
- Blog posts and markdown files can now be beautifully rendered with the render command

## [0.0.12] - 2025-10-26

### Added
- Blog posts stored as individual markdown files with YAML frontmatter
- BlogParser utility for parsing frontmatter and markdown content
- /home/darin/blog/ directory in virtual filesystem with blog post files
- Tag filtering support in blog command (blog --tag <tag>)
- Blog posts accessible via cat command (e.g., cat /home/darin/blog/2024-09-15-ai-production-lessons.md)

### Changed
- Blog command now reads from filesystem instead of static TypeScript data
- Blog posts are individual .md files in src/blog/ directory
- Blog data structure uses YAML frontmatter for metadata (title, date, tags, summary)
- Removed static blogData array from src/data/blog.ts (kept BlogPost interface)

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
