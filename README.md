# Darin Chambers - Terminal Portfolio

[![Version](https://img.shields.io/badge/version-0.0.59-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()

A unique, interactive terminal-inspired portfolio website showcasing AI and software engineering expertise through a fully functional command-line interface in your browser.

## 🌟 Features

- **Interactive Terminal Experience** - Full Unix-like command-line interface with real command execution
- **Virtual File System** - Navigate directories, read files, and explore content using familiar shell commands
- **Command Pipeline Support** - Chain commands together using pipes (`|`)
- **Markdown Rendering** - Beautiful in-terminal markdown rendering with syntax highlighting
- **Customizable Themes** - Multiple terminal themes (Green, Amber, White, Cyan, Paper)
- **Accessibility First** - WCAG 2.1 compliant with full keyboard navigation and screen reader support
- **Type-Safe** - Written in TypeScript with strict mode enabled
- **Zero Dependencies** - Vanilla JavaScript/TypeScript with minimal production dependencies
- **Fast & Lightweight** - 121KB total bundle size (110KB JS, 11KB CSS)

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/darinchambers/dc.com.git
cd dc.com

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the terminal in action.

## 📖 Available Commands

### Core Commands
- `help` - Display help information
- `clear` - Clear the terminal screen
- `history` - View command history
- `date` - Display current date and time
- `echo` - Output text (supports escape sequences with `-e`)
- `whoami` - Display current user
- `alias` / `unalias` - Create command shortcuts
- `env` / `export` - Manage environment variables

### Content Commands
- `about` - Learn about my background and expertise
- `portfolio [project-id]` - View projects and accomplishments
- `blog [post-id]` - Read blog posts (supports `--tag` filtering)
- `contact` - Get my contact information
- `skills` - View technical skills by category

### File System Commands
- `ls [-a] [-l] [path]` - List directory contents
- `cd <path>` - Change directory
- `pwd` - Print working directory
- `cat <file>` - Display file contents
- `tree [-L depth]` - Display directory tree structure
- `render <file>` - Render markdown files with formatting

### Novelty Commands
- `ddate` - Display Discordian calendar date
- `figlet [-f font] [-c] "text"` - Create ASCII art banners

### Advanced Features
- **Command Piping**: `cat file.md | render`
- **Command History**: Use Up/Down arrows to navigate
- **Tab Completion**: Auto-complete commands with Tab
- **Aliases**: Create shortcuts like `alias ll='ls -la'`

## 🛠️ Development

### Project Structure

```
dc.com/
├── src/
│   ├── commands/        # Command implementations (22 commands)
│   │   ├── core/        # Core terminal commands
│   │   ├── fs/          # File system commands
│   │   ├── local/       # Content commands (about, portfolio, blog)
│   │   └── novelty/     # Fun commands (figlet, ddate)
│   ├── components/      # UI components (Terminal, Input, Output)
│   ├── content/         # Markdown content (blog posts, portfolio)
│   ├── styles/          # Modular CSS files
│   ├── types/           # TypeScript interfaces
│   └── utils/           # Utilities (parsers, managers, renderers)
├── tests/               # Test suite (895 tests, 70% coverage)
├── public/              # Static assets and configuration
└── dist/                # Production build output
```

### Development Commands

```bash
# Development
npm run dev              # Start dev server (localhost:5173)
npm run dev:host         # Network-accessible dev server
npm run build            # Production build
npm run preview          # Preview production build

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Generate coverage report (70% coverage)
npm run test:ui          # Interactive test UI
```

### Code Quality

- **Type Safety**: Strict TypeScript with zero `any` usage
- **Test Coverage**: 70% (895 tests across 40 test files)
- **Security**: Multi-layered XSS protection (DOMPurify + CSP + HTML escaping)
- **Bundle Size**: 121KB total (extremely lean for an SPA)
- **Zero Vulnerabilities**: All dependencies scanned and secure

## 🏗️ Architecture

The application follows clean architecture principles:

- **Command Pattern**: Each command is a self-contained module
- **Dependency Injection**: Components receive dependencies via constructor
- **Event-Driven**: Custom events for cross-component communication
- **Virtual File System**: Hierarchical Map-based file structure
- **State Management**: Specialized managers (Settings, Theme, Environment, Aliases)

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed design documentation.

## 🎨 Customization

Access the settings panel by clicking the gear icon or running commands:

```bash
settings                 # Open settings panel
settings theme amber     # Change theme
settings font-size 16    # Adjust font size
settings reset           # Reset to defaults
```

Available themes: `green`, `amber`, `white`, `cyan`, `paper`

## 🔒 Security

This project implements multiple layers of security:

- **HTML Sanitization**: DOMPurify sanitizes all user-generated content
- **Content Security Policy**: Strict CSP prevents inline script execution
- **Input Validation**: All user inputs validated and escaped
- **No eval()**: Zero use of eval() or Function() constructors
- **Dependency Scanning**: Regular npm audit checks (zero vulnerabilities)

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## ♿ Accessibility

Fully compliant with WCAG 2.1 Level A and substantial Level AA compliance:

- **Semantic HTML5**: Proper landmark elements and structure
- **ARIA Attributes**: Comprehensive labels, roles, and live regions
- **Keyboard Navigation**: Full keyboard access with visible focus indicators
- **Screen Reader Support**: Tested with NVDA, JAWS, and VoiceOver
- **Color Contrast**: All themes meet WCAG AA standards
- **Focus Management**: Logical focus order and escape key support

## 🚀 Deployment

The site is deployed on Cloudflare Pages:

```bash
# Build for production
npm run build

# Output directory: dist/
# Build command: npm run build
# Node version: 20.x
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Adding a New Command

1. Create a new file in `src/commands/[category]/`
2. Implement the `Command` interface
3. Register in `src/main.ts`
4. Add tests in `tests/unit/commands/`
5. Update help documentation

See [API.md](API.md) for detailed API documentation.

## 📝 Documentation

- [GUIDE.md](GUIDE.md) - Project vision and design principles
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture and design patterns
- [API.md](API.md) - API documentation for extending the system
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions
- [SECURITY.md](SECURITY.md) - Security policy
- [CHANGELOG.md](CHANGELOG.md) - Version history (59 releases)
- [AUDIT.md](AUDIT.md) - Comprehensive codebase audit

## 📊 Project Stats

- **Lines of Code**: ~6,000 lines (excluding comments/whitespace)
- **Test Coverage**: 70% (895 tests passing)
- **Bundle Size**: 121KB (110KB JS + 11KB CSS)
- **Commands**: 22 implemented commands
- **Dependencies**: 5 production, 9 development
- **TypeScript Files**: 72 files
- **Version**: 0.0.59 (pre-1.0)

## 🛣️ Roadmap

See [TODO.md](TODO.md) for the current development backlog.

### Planned Features
- 80% test coverage target
- Enhanced command pipeline features
- Command output pagination
- Additional novelty commands
- PWA support with offline functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Author

**Darin Chambers**

- Website: [darinchambers.com](https://darinchambers.com)
- GitHub: [@darinchambers](https://github.com/darinchambers)
- LinkedIn: [linkedin.com/in/darinchambers](https://linkedin.com/in/darinchambers)

## 🙏 Acknowledgments

- **Marked.js** - Markdown parsing
- **Figlet.js** - ASCII art generation
- **DOMPurify** - XSS protection
- **Vite** - Build tooling
- **Vitest** - Testing framework

---

**Built with ❤️ using TypeScript, Vite, and vanilla JavaScript**

Try the live demo: [darinchambers.com](https://darinchambers.com)
