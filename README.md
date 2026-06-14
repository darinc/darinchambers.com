# Darin Chambers - Terminal Portfolio

[![Version](https://img.shields.io/badge/version-0.31.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()

A terminal-inspired portfolio website with a fully functional command-line interface in your browser.

Try it out: https://darinchambers.com

## Features

- Interactive terminal experience with Unix-like command execution
- Virtual file system with directory navigation
- Command pipeline support (`|`)
- Markdown rendering with syntax highlighting
- Multiple terminal themes (Green, Amber, White, Cyan, Paper, DC)
- Accessibility: reduced motion, keyboard navigation, visible focus (WCAG 2.1 AA)
- Type-safe TypeScript with strict mode
- ~125KB gzipped bundle

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- pnpm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/darinc/darinchambers.com.git
cd darinchambers.com

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:5175`

### Development Commands

```bash
pnpm dev                 # Start dev server
pnpm build               # Production build
pnpm test                # Run tests (comprehensive suite, target 80% coverage)
pnpm test:coverage       # Coverage report
pnpm lint                # Run linter
```

## Available Commands

**Core**: `help`, `clear`, `history`, `date`, `echo`, `whoami`, `alias`, `unalias`, `env`, `export`

**Content**: `about`, `portfolio`, `blog`, `contact`, `skills`, `games`

**File System**: `ls`, `cd`, `pwd`, `cat`, `tree`, `render`

**Novelty**: `ddate`, `figlet`, `matrix`, `polartetris`

**Advanced**: Command piping, tab completion, command history (arrow keys)

## Customization

Click the gear icon or use settings commands:

```bash
settings                 # Open settings panel
settings theme amber     # Change theme
settings font-size 16    # Adjust font size
```

## Project Structure

```
darinchambers.com/
├── src/
│   ├── commands/        # 42 command implementations
│   ├── components/      # UI components
│   ├── content/         # Markdown content (blog, portfolio)
│   ├── utils/           # Parsers, managers, renderers
│   └── types/           # TypeScript interfaces
├── tests/               # Comprehensive test suite, 80%+ coverage
└── public/              # Static assets
```

## Code Quality

- Strict TypeScript, zero `any` usage
- Multi-layered XSS protection (DOMPurify + CSP)
- 1,000+ tests across 50+ test files
- Zero known vulnerabilities in production dependencies
- ~125KB gzipped bundle

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System design and patterns
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions
- [SECURITY.md](SECURITY.md) - Security policy and reporting
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [TODO.md](TODO.md) - Development backlog

## License

MIT License - see [LICENSE](LICENSE)

## Author

**Darin Chambers**

- [darinchambers.com](https://darinchambers.com)
- [@darinc](https://github.com/darinc)
- [linkedin/darinchambers](https://www.linkedin.com/in/darinchambers/)
