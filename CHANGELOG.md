# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.14.0] - 2025-11-25

### Added
- New `which` command to locate commands and display their virtual filesystem paths
- Support for `-a` flag to show all matching paths including aliases
- Alias resolution showing shell-style output (e.g., `ll: aliased to ls -alh`)

## [0.13.5] - 2025-11-24

### Changed
- Standardized documentation to use approximate metrics instead of exact counts
- Updated all .md files to use ranges (1,000+ tests, 50+ files, 80%+ coverage) to reduce maintenance burden

### Added
- Added echo and matrix commands to virtual filesystem for better discoverability

## [0.13.4] - 2025-11-23

### Fixed
- Mobile viewport handling to prevent header from staying hidden after keyboard dismissal
- iOS Safari auto-zoom when focusing terminal input by enforcing 16px minimum font size
- Terminal input not receiving focus on mobile when clicking navigation links

### Changed
- Updated CSS to use dynamic viewport height (100dvh) for better mobile keyboard support
- Added Visual Viewport API listener to restore scroll position after mobile keyboard dismissal

## [0.13.3] - 2025-11-23

### Fixed
- Matrix command animation accelerating with repeated executions

## [0.13.2] - 2025-11-23

### Fixed
- Corrected typo in "A Love Letter to Developers and the Terminal" blog post

## [0.13.1] - 2025-11-23

### Fixed
- Prettier configuration now preserves frontmatter formatting in markdown files
- Blog post tags arrays no longer wrap to multiple lines

## [0.13.0] - 2025-11-23

### Added
- New blog post: "1337 Unit Tests: Leet Status Unlocked"
- Blog post images directory structure (`public/images/blog/`)
- Responsive image CSS rules for markdown content
- `width` and `height` attributes to sanitizer allowlist

## [0.12.5] - 2025-11-23

### Fixed
- Removed unused `header` variable in Header component tests

## [0.12.4] - 2025-11-23

### Added
- Unit tests for Header component covering rendering, sanitization, and event handling

### Changed
- Header component now has 100% test coverage

## [0.12.3] - 2025-11-23

### Fixed
- GitHub Actions workflows now use pnpm instead of npm
- Package.json scripts now use pnpm commands

## [0.12.2] - 2025-11-23

### Changed
- Exclude novelty commands (ddate, discordian) from test coverage requirements

## [0.12.1] - 2025-11-23

### Fixed
- Portfolio command now accepts numeric indices (e.g., `portfolio 1`)
- Updated portfolio help text to document numeric access

## [0.12.0] - 2025-11-23

### Added
- @eslint/js dependency for ESLint configuration

### Changed
- Migrated package manager from npm to pnpm
- Updated all documentation to reflect pnpm usage

### Removed
- @types/dompurify dependency (dompurify provides its own types)
- @types/marked dependency (marked provides its own types)

### Fixed
- Linting warnings in Terminal component tests

## [0.11.5] - 2025-11-23

### Added
- GitHub Pages deployment configuration with automatic CI/CD
- SPA routing support via 404.html redirect workaround
- Manual deployment script using gh-pages package

### Changed
- Switched deployment platform from Cloudflare Pages to GitHub Pages
- Updated documentation to reflect GitHub Pages setup and configuration

## [0.11.4] - 2025-11-23

### Added
- Portfolio entry for scaling infrastructure at unicorn startup through IPO journey

### Changed
- Blog post frontmatter formatting to single-line tags array

## [0.11.3] - 2025-11-23

### Added
- Comprehensive test coverage for Terminal component
- Comprehensive test coverage for EnvVarManager utility
- Comprehensive test coverage for contact command

### Changed
- Branch coverage improved from 70.33% to 74.53%
- Overall test suite expanded from 1,248 to 1,326 tests

## [0.11.2] - 2025-11-22

### Fixed
- Updated js-yaml dependency to fix prototype pollution vulnerability
- Consolidated AUDIT.md to focus on current status and actionable items

### Changed
- Streamlined audit report from detailed implementation history to concise summary

## [0.11.1] - 2025-11-22

### Changed
- Updated API.md with current interface signatures and type definitions
- Updated ARCHITECTURE.md with accurate statistics and component documentation
- Updated SECURITY.md with correct security layer descriptions

### Removed
- Removed TEST.md (testing plan complete, all goals achieved)

## [0.11.0] - 2025-11-22

### Added
- JavaScript-based email obfuscation to protect contact email from bots
- EmailProtection utility with click handler and keyboard accessibility
- Comprehensive test suite for email protection functionality

## [0.10.21] - 2025-11-22

### Changed
- Updated CSP header to allow mailto links in form-action directive
- Improved contact page formatting with proper markdown list syntax
- Fixed navigation text in about page to reference blog

## [0.10.20] - 2025-11-22

### Changed
- Enhanced static asset routing in redirects configuration
- Updated repository URLs in documentation

### Removed
- Removed placeholder portfolio content files

## [0.10.19] - 2025-11-21

### Changed
- Simplified README from 285 to 114 lines
- Removed all emojis from README headers
- Fixed inaccuracies in test counts and flag names

## [0.10.18] - 2025-11-21

### Added
- SEO: robots.txt and sitemap.xml for search engine crawling
- Social sharing: Open Graph and Twitter Card meta tags

### Fixed
- README version badge now matches package.json

## [0.10.17] - 2025-11-21

### Added
- Friendly empty state messages for portfolio and blog commands
- Tag filter suggestions showing top 5 popular tags when no results found
- Unit tests for portfolio and blog empty state handling

### Changed
- Centralized user-facing messages in constants for consistency

## [0.10.16] - 2025-11-18

### Fixed
- Blog command now uses `--tags` flag (plural) to match portfolio command
- Fixed type handling bug that caused error when calling `blog --tags` without a value
- Tag listing now displays all blog tags with counts when using `blog --tags`

### Changed
- Updated all documentation and examples to use `blog --tags` instead of `blog --tag`

## [0.10.15] - 2025-11-18

### Changed
- Improved blog post content and grammar
- Enhanced clarity in technical writing

## [0.10.14] - 2025-11-18

### Added
- SVG Graph Network library integration for blog post demos
- Demo graph data files for command tree and library features visualization

## [0.10.13] - 2025-11-16

### Fixed
- Blog post URLs now update correctly when typing commands like "blog we-trick-rocks-into-thinking"
- Clicking blog links in content now updates URL and navigation state
- Improved scroll-to-top reliability for direct URL navigation to blog posts

### Changed
- Router now validates blog post existence before generating URLs
- Terminal click handler integrates with router for proper navigation

## [0.10.12] - 2025-11-16

### Added
- Portfolio summary field for concise project descriptions
- Portfolio order field for manual sorting control
- Auto-import blog, portfolio, and content files using Vite's import.meta.glob()
- Comprehensive unit tests for dynamic file loading methods

### Changed
- Portfolio entries now display with summary instead of full description in list view
- Portfolio sorted by order field (ascending) instead of alphabetically
- Blog post summaries expanded by 50%
- FileSystemInitializer now discovers markdown files dynamically instead of hardcoded imports
- Added vite/client, node, and figlet types to tsconfig.json

## [0.10.11] - 2025-11-11

### Fixed
- Portfolio metadata (Technologies, Impact, Tags) now properly separated on individual lines
- Updated test to reference correct blog post filename with numeric prefix

## [0.10.10] - 2025-11-11

### Changed
- Added consistent indentation to detail pages (blog posts, portfolio items, about page)
- Portfolio titles now clickable without separate "View Details" link
- Fixed tag paragraphs to not be indented

## [0.10.9] - 2025-11-11

### Changed
- Blog post filenames now use numeric prefixes for same-day ordering
- Blog tags use hyphens for multi-word tags
- DC theme colors updated for WCAG AA accessibility compliance
- Green and White themes now have distinct accent colors
- Improved spacing and indentation in blog list view

## [0.10.8] - 2025-11-11

### Changed
- Increased vertical spacing between blog posts in list view

## [0.10.7] - 2025-11-11

### Added
- Recursive alias resolution with maximum depth protection
- Per-stage alias resolution in command pipelines

### Fixed
- Pipeline detection now occurs after alias expansion
- Tree command test assertions to check all output lines
- Missing helper function imports in integration tests

## [0.10.6] - 2025-11-11

### Fixed
- Alias resolution now occurs before environment variable expansion
- Escaped quotes in command parser now handled correctly
- Settings persistence to localStorage when changing theme
- Mock filesystem now includes readme.md in home directory

### Added
- createDirectory method to IFileSystem interface and FileSystemService

## [0.10.5] - 2025-11-11

### Fixed
- Settings command now accepts both camelCase and hyphenated syntax
- Test expectations aligned with actual settings structure
- Theme names updated to valid values in tests
- Settings file path references corrected across tests

## [0.10.4] - 2025-11-10

### Fixed
- Settings command registration with correct parameters in integration tests
- Pipeline execution error message patterns to match actual implementation
- History command tests to check all output lines instead of just last line
- localStorage mock to prevent double initialization
- Storage keys changed to use underscores for consistency with tests

## [0.10.3] - 2025-11-10

### Fixed
- Integration test cd command registration to properly update PWD environment variable
- Mock filesystem now includes content directory with about, contact, and help files
- Integration tests now use Terminal's internal TerminalInput for proper history tracking

### Changed
- Removed target="_blank" attribute from markdown link rendering

## [0.10.2] - 2025-11-10

### Fixed
- Integration test environment setup with scrollIntoView mock for jsdom
- Terminal input now clears after command execution in programmatic calls
- Settings command shorthand syntax now accepts direct setting names
- Mock filesystem includes blog and portfolio directories

### Added
- Target blank attribute to markdown links for external navigation

## [0.10.1] - 2025-11-10

### Fixed
- Alias manager unit tests to account for default alias
- Router URL mocking in jsdom for navigation tests
- Cat command now reads from stdin in pipelines

### Added
- Integration test helpers with complete terminal setup
- Mock filesystem with /home/guest directory for alias storage

## [0.10.0] - 2025-11-10

### Added
- Tab completion for file paths in commands like cat, cd, and ls
- Default alias ll for ls -alh command

### Changed
- Settings label shortened from "Background (Secondary)" to "BG (Secondary)"

## [0.9.0] - 2025-11-10

### Added
- Clickable header ASCII art that clears terminal when clicked
- Visual hover and active states for header interaction

## [0.8.1] - 2025-11-10

### Fixed
- Scroll behavior now works correctly for long content by using double requestAnimationFrame
- Replaced manual scroll calculations with browser-native scrollIntoView for reliability
- Removed complex auto-detection logic in favor of explicit scrollBehavior flags

## [0.8.0] - 2025-11-10

### Added
- Smart scroll behavior for long content with auto-detect feature flag
- Autoscroll setting to toggle between smart mode and classic scroll-to-bottom
- Commands with explicit scrollBehavior control (blog, portfolio, about, tree)

### Changed
- Long content now scrolls to command line instead of bottom for natural reading flow
- Short content continues using classic scroll-to-bottom behavior

## [0.7.0] - 2025-11-10

### Added
- Google Fonts loading for Fira Code and JetBrains Mono for universal coverage
- Updated CSP to allow fonts.googleapis.com and fonts.gstatic.com

### Changed
- Font stack now prioritizes Fira Code and JetBrains Mono for better readability
- Default font changed from Courier New to Fira Code
- Removed SF Mono and Consolas from font options

## [0.6.1] - 2025-11-09

### Fixed
- Matrix animation no longer speeds up when running the command multiple times
- Previous matrix animations are now properly stopped (both JavaScript and CSS)

## [0.6.0] - 2025-11-09

### Added
- URL-based tag filtering with query parameters for portfolio command
- Clickable tag buttons throughout portfolio and blog displays
- Clickable navigation links for all "Read Post" and "View Details" actions

### Changed
- Router now supports query parameter parsing for enhanced navigation
- All back navigation links converted to proper clickable hyperlinks

## [0.5.0] - 2025-11-09

### Added
- Matrix command now updates browser URL and history
- Direct URL access support for matrix command (/matrix)

## [0.4.1] - 2025-11-09

### Removed
- Outdated audit documentation files
- Duplicate test plan file (test-md.md)
- Incorrect project template (.CLAUDE.md)

### Fixed
- ESLint warnings for nullish coalescing in matrix animation

## [0.4.0] - 2025-11-07

### Added
- Matrix digital rain animation command with CSS-based animations
- Support for --speed flag to control animation speed (0.1-5.0x)
- Support for --theme flag to override current terminal theme
- Auto-detection of terminal dimensions for responsive display

## [0.3.1] - 2025-11-07

### Fixed
- Text selection now persists when copying content from terminal output
- Click handler no longer clears selection when user finishes selecting text

## [0.3.0] - 2025-11-07

### Added
- Universal --help flag support across all 24 commands
- help command now supports 'help <command>' syntax

### Changed
- Redesigned help.md to focus on command discovery (reduced from 142 to 69 lines)
- All error messages now include helpful "Try '<command> --help'" hints
- Standardized help output format across all commands

## [0.2.1] - 2025-11-06

### Fixed
- All ESLint errors and warnings in codebase
- Type safety issues with unsafe assignments and template expressions
- Floating promises in event handlers and async callbacks
- Import ordering and code style inconsistencies

## [0.2.0] - 2025-11-06

### Added
- ESLint with TypeScript support for code quality enforcement
- Prettier for automatic code formatting
- Husky pre-commit hooks with lint-staged for automated checks
- GitHub Actions CI/CD workflows for testing, building, and deployment

### Changed
- Formatted entire codebase with Prettier
- Created separate tsconfig.build.json for production builds

### Fixed
- TypeScript focus() errors in Terminal component

## [0.1.4] - 2025-11-06

### Changed
- Added comprehensive header comments to all 22 command files
- Updated AUDIT.md to reflect complete command documentation coverage

## [0.1.3] - 2025-11-06

### Fixed
- Navigation buttons now properly clear terminal scrollback history when clicked

## [0.1.2] - 2025-11-06

### Changed
- Upgraded @types/node from 22.19.0 to 24.10.0
- Verified compatibility with Node.js 24.x type definitions

## [0.1.1] - 2025-11-06

### Fixed
- Settings UI now displays interactive controls properly after DOMPurify sanitization
- Added form elements and semantic HTML tags to sanitizer allowlist
- Added data-* and aria-* attributes to maintain CSP-compliant event delegation

## [0.1.0] - 2025-11-06

### Changed
- Upgraded Vite from 6.0.11 to 7.2.1
- Updated build target from es2015 to baseline-widely-available for modern browsers
- Build now targets Chrome 107+, Firefox 104+, Safari 16+

## [0.0.61] - 2025-11-06

### Changed
- Updated vitest, @vitest/coverage-v8, @vitest/ui from 4.0.4 to 4.0.7
- Updated jsdom from 27.0.1 to 27.1.0
- Updated @types/node from 22.18.12 to 22.19.0
- Deferred Vite 7 and @types/node 24 major updates to dedicated upgrade cycle

## [0.0.60] - 2025-11-06

### Added
- Complete documentation suite including README.md, ARCHITECTURE.md, API.md, CONTRIBUTING.md, DEPLOYMENT.md, and SECURITY.md
- Comprehensive project overview with installation, commands, and development workflow
- System architecture documentation with design patterns and data flow diagrams
- API reference with examples for extending commands and features

### Changed
- Updated AUDIT.md to reflect Cloudflare Pages deployment platform
- Documentation status upgraded from missing to comprehensive

## [0.0.59] - 2025-11-06

### Added
- Theme-adaptive CSS variables for transparent accent colors (5%, 10%, 15%, 30% opacity)

### Fixed
- Paper theme color contrast to meet WCAG AA standards (dim: #666666, accent: #007298)
- Hardcoded green rgba colors replaced with theme-adaptive variables across all CSS files

### Changed
- All background highlights now automatically adapt to active theme

## [0.0.58] - 2025-11-06

### Added
- Comprehensive ARIA attributes for terminal input, navigation, and form controls
- Dynamic aria-current support for active navigation state with Router integration
- Error messages with role="alert" and aria-describedby linking
- Automatic focus management for settings panel with Escape key support

### Changed
- Navigation now uses aria-current to indicate active page
- Range sliders announce current values with aria-value attributes
- Accessibility risk reduced from MEDIUM to LOW in audit

## [0.0.57] - 2025-11-06

### Added
- Comprehensive test suite with 412 new tests across utilities, components, and commands

### Changed
- Test coverage improved from 44.99% to 70.14%
- CSP moved to _headers file for production deployments

### Fixed
- CSP meta tag blocking Vite dev server functionality

## [0.0.56] - 2025-11-05

### Changed
- Eliminated all unsafe any type usage across codebase
- Added type guards for frontmatter validation in BlogParser and PortfolioParser
- Replaced any types with proper interfaces in ContentFormatter

### Fixed
- Runtime validation now catches invalid frontmatter before processing
- Better error messages for missing or malformed content fields

## [0.0.55] - 2025-11-05

### Added
- DOMPurify sanitization for all innerHTML usage to prevent XSS attacks
- Strict Content Security Policy in index.html and Cloudflare Pages headers
- Comprehensive security test suite with XSS and CSP compliance tests

### Changed
- Refactored settings UI to use event delegation instead of inline handlers
- Removed global window.executeCommand exposure for improved security

## [0.0.54] - 2025-11-05

### Fixed
- TypeScript build errors for figlet font imports
- Added @types/figlet package for proper type definitions
- Updated font imports to use .js extensions for bundler module resolution

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
- Tag filtering support in blog command (blog --tags <tag>)
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
