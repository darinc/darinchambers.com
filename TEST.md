# Testing Plan for darinchambers.com

## Project Overview

This is a terminal-inspired interactive personal website built with TypeScript and Vite. The project currently has **zero test coverage** and consists of ~2,781 lines of TypeScript code across parsers, utilities, commands, and UI components.

## Testing Framework: Vitest

**Why Vitest?**
- Native Vite integration (zero configuration conflicts)
- Fast execution with HMR
- Jest-compatible API (familiar syntax)
- Built-in TypeScript support
- Integrated coverage reporting with c8/istanbul
- Modern and actively maintained

## Phased Implementation Approach

This testing implementation follows a three-phase approach: **Minimal → Core → Comprehensive**

---

## Phase 1: Minimal Setup (Foundation)

**Goal:** Establish testing infrastructure with example tests to validate the setup works.

### Tasks

1. ✅ **Install Vitest dependencies** (COMPLETED)
   ```bash
   npm install -D vitest @vitest/ui @vitest/coverage-v8 jsdom
   npm install -D @testing-library/dom @testing-library/user-event
   ```

2. ✅ **Create Vitest configuration** (`vitest.config.ts`) (COMPLETED)
   - Configure jsdom environment for DOM testing
   - Set up coverage reporting (html, text, json formats)
   - Configure test file patterns (`**/*.test.ts`)
   - Set coverage thresholds

3. ✅ **Add test scripts to package.json** (COMPLETED)
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:ui": "vitest --ui",
       "test:coverage": "vitest --coverage",
       "test:watch": "vitest --watch",
       "test:run": "vitest run"
     }
   }
   ```

4. ✅ **Create test directory structure** (COMPLETED)
   ```
   /tests/
   ├── unit/
   │   ├── parsers/
   │   │   └── markdown/
   │   │       └── handlers/
   │   ├── utils/
   │   ├── commands/
   │   │   ├── fs/
   │   │   ├── core/
   │   │   └── local/
   │   └── components/
   ├── integration/
   └── e2e/
   ```

5. ✅ **Write 2-3 example tests to validate setup** (COMPLETED)
   - `tests/unit/parsers/CommandParser.test.ts` - Basic command parsing (17 tests)
   - `tests/unit/parsers/PipelineParser.test.ts` - Basic pipe parsing (26 tests)
   - Run tests to ensure infrastructure works correctly

**Deliverables:**
- ✅ Vitest configured and working (COMPLETED)
- ✅ Test directory structure created (COMPLETED)
- ✅ 2-3 passing example tests (COMPLETED - 43 tests passing)
- ✅ Coverage reporting functional (COMPLETED)

**Target Coverage:** ~5-10%

**Status:** Phase 1 COMPLETE - v0.0.21 (2025-10-29)

---

## Phase 2: Core Testing (Critical Path)

**Goal:** Test all critical parsing and utility modules that form the backbone of the application.

### Priority Modules

#### 1. Command Parsing System

**CommandParser.ts** (`tests/unit/parsers/CommandParser.test.ts`) ✅ **COMPLETE**
- ✅ Test simple commands: `help`, `ls`, `cd /home`
- ✅ Test quoted arguments: `echo "hello world"`, `cat 'file.txt'`
- ✅ Test mixed quotes and spaces
- ✅ Test edge cases: empty input, unclosed quotes, nested quotes, special characters
- ✅ Test argument extraction and validation
- **17 tests passing | 100% statement coverage**

**PipelineParser.ts** (`tests/unit/parsers/PipelineParser.test.ts`) ✅ **COMPLETE**
- ✅ Test simple pipes: `cat file.md | render`
- ✅ Test multiple pipes: `cmd1 | cmd2 | cmd3`
- ✅ Test pipes within quoted strings (should be ignored)
- ✅ Test edge cases: empty segments, trailing pipes, consecutive pipes
- ✅ Test complex pipeline extraction
- **26 tests passing | 100% statement coverage**

**CommandDispatcher.ts** (`tests/unit/utils/CommandDispatcher.test.ts`) ✅ **COMPLETE**
- ✅ Test command registration and lookup
- ✅ Test alias resolution
- ✅ Test pipeline execution with stdin/stdout data flow
- ✅ Test error handling and propagation
- ✅ Test unknown command handling
- ✅ Test command execution context
- **38 tests passing | 97.5% statement coverage**

#### 2. Markdown Rendering System

**MarkdownParser.ts** (`tests/unit/parsers/markdown/MarkdownParser.test.ts`)
- Test headers (H1-H6): `# Header`, `## Subheader`
- Test paragraphs and line breaks
- Test code blocks (with/without language specification)
- Test lists (ordered/unordered, nested)
- Test empty line handling
- Test handler chain priority and delegation

**InlineRenderer.ts** (`tests/unit/parsers/markdown/InlineRenderer.test.ts`)
- Test bold: `**text**`, `__text__`
- Test italic: `*text*`, `_text_`
- Test inline code: `` `code` ``
- Test links: `[text](url)`
- Test nested combinations: `**bold _italic_**`
- Test edge cases: unmatched markers, escaped characters, overlapping styles

**FrontmatterParser.ts** (`tests/unit/parsers/markdown/FrontmatterParser.test.ts`)
- Test valid YAML frontmatter parsing
- Test missing frontmatter (no delimiters)
- Test malformed YAML
- Test empty frontmatter
- Test frontmatter extraction from content

#### 3. Virtual File System

**FileSystem.ts** (`tests/unit/utils/FileSystem.test.ts`)
- Test path normalization: `../`, `./`, `~`
- Test absolute vs relative path resolution
- Test directory traversal and navigation
- Test file/directory existence checks
- Test read operations on files and directories
- Test permission checks
- Test edge cases: non-existent paths, invalid paths, circular references

#### 4. Alias Management

**AliasManager.ts** (`tests/unit/utils/AliasManager.test.ts`)
- Test creating aliases
- Test resolving aliases (single and chained)
- Test deleting aliases
- Test listing all aliases
- Test circular alias detection
- Test alias persistence to virtual `.alias` file
- Test alias loading on initialization

### Tasks

6. ✅ Write comprehensive CommandParser tests (COMPLETED - 17 tests)
7. ✅ Write comprehensive PipelineParser tests (COMPLETED - 26 tests)
8. ✅ Write CommandDispatcher tests (COMPLETED - 38 tests)
9. Write MarkdownParser core functionality tests
10. Write InlineRenderer tests
11. Write FrontmatterParser tests
12. Write FileSystem operation tests
13. Write AliasManager tests

**Deliverables:**
- 🔄 ~8 test files with comprehensive coverage (3/8 complete - 37.5%)
- 🔄 ~150 individual test cases (81/150 complete - 54%)
- 🔄 All critical parsers and utilities tested
  - ✅ **Command Parsing System COMPLETE**
    - CommandParser: 17 tests | 100% coverage
    - PipelineParser: 26 tests | 100% coverage
    - CommandDispatcher: 38 tests | 97.5% coverage
  - ⏳ **Markdown Rendering System** (pending)
  - ⏳ **Virtual File System** (pending)
  - ⏳ **Alias Management** (pending)
- ✅ Core bugs identified and fixed (e.g., `echo -n` flag)

**Target Coverage:** ~60% (currently ~12% overall, but 3 core modules at 95%+ coverage)

**Status:** Command Parsing System COMPLETE - v0.0.22 (2025-10-29)

---

## Phase 3: Comprehensive Coverage (Complete Suite)

**Goal:** Achieve 80%+ coverage with unit, integration, DOM, and E2E tests plus CI/CD automation.

### Remaining Unit Tests

#### Markdown Handlers

**tests/unit/parsers/markdown/handlers/**
- `CodeBlockHandler.test.ts` - Fenced code blocks, language detection
- `HeaderHandler.test.ts` - Header level detection, parsing
- `ListHandler.test.ts` - Ordered/unordered lists, nesting
- `ParagraphHandler.test.ts` - Paragraph detection, wrapping
- `TableHandler.test.ts` - Table parsing and rendering (if implemented)

#### Command Implementations

**File System Commands** (`tests/unit/commands/fs/`)
- `ls.test.ts` - Directory listing, flags (-a, -l, etc.)
- `cd.test.ts` - Directory navigation, path resolution
- `pwd.test.ts` - Current directory display
- `cat.test.ts` - File content display, multiple files
- `tree.test.ts` - Directory tree generation

**Core Commands** (`tests/unit/commands/core/`)
- `echo.test.ts` - Text output, `-n` flag (fix known issue)
- `date.test.ts` - Date/time display
- `history.test.ts` - Command history management
- `alias.test.ts` - Alias creation
- `unalias.test.ts` - Alias removal
- `whoami.test.ts` - User identification
- `render.test.ts` - Markdown rendering via command

**Content Commands** (`tests/unit/commands/local/`)
- `about.test.ts` - About page rendering
- `blog.test.ts` - Blog post listing and display
- `contact.test.ts` - Contact information display
- `portfolio.test.ts` - Portfolio items display
- `skills.test.ts` - Skills listing

#### Utility Classes

**tests/unit/utils/**
- `BlogParser.test.ts` - Blog post metadata extraction
- `ContentFormatter.test.ts` - Content formatting logic
- `AsciiArt.test.ts` - ASCII art generation

#### UI Components (with jsdom)

**tests/unit/components/**
- `Terminal.test.ts` - Command execution flow, error handling, output rendering
- `TerminalInput.test.ts` - History navigation, tab completion, input clearing
- `TerminalOutput.test.ts` - Text/HTML rendering, clear operations, scroll behavior
- `Navigation.test.ts` - Navigation rendering and interactions
- `Header.test.ts` - Header component rendering

### Integration Tests

**tests/integration/**
- `pipeline.test.ts` - Multi-stage command pipeline execution with data flow
- `markdown-rendering.test.ts` - End-to-end markdown parsing and rendering
- `filesystem-commands.test.ts` - FileSystem + FS command integration
- `alias-resolution.test.ts` - Alias resolution in command execution context
- `command-dispatcher-integration.test.ts` - Full dispatcher workflow

### E2E/Browser Tests

**tests/e2e/**
- `terminal-interaction.test.ts` - Full terminal interaction flows
- `blog-navigation.test.ts` - Blog post browsing and rendering
- `command-history.test.ts` - Command history persistence and navigation
- `file-navigation.test.ts` - Virtual file system navigation

### CI/CD Setup

**`.github/workflows/test.yml`**
```yaml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Generate coverage report
        run: npm run test:coverage

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          fail_ci_if_error: true

      - name: Check coverage threshold
        run: |
          if [ $(cat coverage/coverage-summary.json | jq '.total.lines.pct') -lt 80 ]; then
            echo "Coverage is below 80%"
            exit 1
          fi
```

### Documentation Updates

14. **README.md updates**
    - Add "Testing" section
    - Document how to run tests
    - Add test coverage badge
    - Add CI/CD status badge

15. **Test documentation**
    - Document testing best practices for this project
    - Add examples of writing new tests
    - Document mocking strategies

### Tasks

14. Write all markdown handler tests
15. Write all command implementation tests (18 commands)
16. Write all component tests with DOM testing
17. Write integration tests (5 test files)
18. Write E2E/browser tests (4 test files)
19. Set up GitHub Actions CI/CD pipeline
20. Update documentation (README, testing guides)

**Deliverables:**
- ✅ 60+ test files
- ✅ 300+ individual test cases
- ✅ 80%+ code coverage
- ✅ CI/CD pipeline operational
- ✅ Coverage badges in README
- ✅ Complete test documentation

**Target Coverage:** 80%+

---

## Test Coverage Goals by Module

| Module | Target Coverage | Priority |
|--------|----------------|----------|
| Parsers (Command, Pipeline, Markdown) | 90%+ | HIGH |
| Utilities (FileSystem, Dispatcher, Alias) | 85%+ | HIGH |
| Markdown Handlers | 85%+ | MEDIUM-HIGH |
| Commands (FS, Core, Content) | 80%+ | MEDIUM |
| Components (Terminal, Input, Output) | 70%+ | MEDIUM |
| Integration Tests | N/A | MEDIUM-HIGH |
| **Overall Project** | **80%+** | - |

---

## Known Issues to Address

From TODO.md and code analysis:

1. **echo -n flag not working** - Fix implementation and add test coverage
2. **Input validation edge cases** - Ensure all parsers handle edge cases gracefully
3. **Error handling** - Test error propagation and graceful failures throughout

---

## Testing Best Practices

### Test Organization
- One test file per source file
- Group related tests with `describe()` blocks
- Use descriptive test names: `it('should parse simple command correctly')`
- Follow AAA pattern: Arrange, Act, Assert

### Mocking Strategy
- Mock external dependencies (DOM, localStorage, etc.)
- Use Vitest's `vi.mock()` for module mocking
- Create test fixtures for complex data (markdown samples, file systems)

### Test Data
- Create `tests/fixtures/` directory for test data
- Sample markdown files
- Sample file system structures
- Sample command outputs

### Code Coverage
- Aim for high coverage but prioritize meaningful tests
- Don't write tests just to hit coverage numbers
- Focus on edge cases and error paths
- Use coverage reports to identify untested code paths

---

## Running Tests

### Basic Commands
```bash
# Run all tests (watch mode)
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test CommandParser.test.ts

# Run tests matching pattern
npm test -- --grep "markdown"
```

### Watch Mode
Tests automatically re-run when files change in watch mode.

### Coverage Reports
Coverage reports are generated in `./coverage/` directory:
- `coverage/index.html` - Interactive HTML report
- `coverage/coverage-summary.json` - JSON summary
- Terminal output shows summary

---

## Success Metrics

### Phase 1 Complete When:
- ✅ Vitest runs successfully (COMPLETED - v0.0.21)
- ✅ Example tests pass (COMPLETED - 43 tests passing)
- ✅ Coverage report generates (COMPLETED)

### Phase 2 Complete When:
- ✅ All critical parsers tested (8 test files)
- ✅ ~150 tests passing
- ✅ Coverage reaches ~60%
- ✅ Known bugs identified and tracked

### Phase 3 Complete When:
- ✅ All modules tested (60+ test files)
- ✅ 300+ tests passing
- ✅ Coverage reaches 80%+
- ✅ CI/CD pipeline operational
- ✅ Documentation updated

---

## Timeline Estimate

| Phase | Duration | Effort |
|-------|----------|--------|
| Phase 1: Minimal Setup | 2-4 hours | Low |
| Phase 2: Core Testing | 1-2 days | Medium |
| Phase 3: Comprehensive | 3-5 days | High |
| **Total** | **~1 week** | **Full implementation** |

---

## Resources

### Vitest Documentation
- [Vitest Official Docs](https://vitest.dev/)
- [Vitest API Reference](https://vitest.dev/api/)
- [Coverage with Vitest](https://vitest.dev/guide/coverage.html)

### Testing Library
- [Testing Library DOM](https://testing-library.com/docs/dom-testing-library/intro)
- [User Event](https://testing-library.com/docs/user-event/intro)

### Best Practices
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [TypeScript Testing Guide](https://www.typescriptlang.org/docs/handbook/testing.html)

---

## Maintenance

### Ongoing Testing Practices
1. Write tests for all new features
2. Update tests when refactoring
3. Monitor coverage trends (don't let it drop below 80%)
4. Review and fix flaky tests immediately
5. Keep test suite fast (< 30 seconds for full suite)

### Test Suite Health Metrics
- **Test count:** 300+ tests
- **Execution time:** < 30 seconds
- **Coverage:** 80%+
- **Flakiness:** 0% (all tests deterministic)
- **CI/CD success rate:** 95%+

---

*Last Updated: 2025-10-28*
