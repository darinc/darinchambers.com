# Architecture Documentation

**Last Updated:** 2025-12-07 (v0.14.2)

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Design Patterns](#design-patterns)
4. [Component Architecture](#component-architecture)
5. [Data Flow](#data-flow)
6. [State Management](#state-management)
7. [Virtual File System](#virtual-file-system)
8. [Command Execution Pipeline](#command-execution-pipeline)
9. [Event System](#event-system)
10. [Security Architecture](#security-architecture)

---

## Overview

This terminal portfolio is built as a **single-page application (SPA)** using vanilla TypeScript with a component-based architecture. The system simulates a Unix-like terminal environment in the browser with a real virtual file system, command execution, and persistent state management.

### Key Architectural Principles

- **Separation of Concerns**: Clear boundaries between UI, business logic, and data
- **Dependency Injection**: Components receive dependencies via constructors
- **Single Responsibility**: Each class/module has one clear purpose
- **Interface Segregation**: Small, focused interfaces over large monoliths
- **Type Safety**: Strict TypeScript with zero `any` usage
- **Testability**: All components designed for easy unit testing

---

## System Architecture

### High-Level Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser (DOM)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌────────────┐  ┌──────────────────────┐   │
│  │  Header  │  │ Navigation │  │   Settings Panel     │   │
│  └────┬─────┘  └─────┬──────┘  └──────────┬───────────┘   │
│       │              │                     │               │
│  ┌────┴──────────────┴─────────────────────┴───────────┐   │
│  │                  Terminal                            │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │          TerminalOutput (log area)           │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │     TerminalInput (command input field)      │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └──────────────────────┬───────────────────────────┘   │
│                         │                                 │
├─────────────────────────┼─────────────────────────────────┤
│                         │                                 │
│  ┌──────────────────────▼──────────────────────────────┐  │
│  │           CommandExecutor (business logic)          │  │
│  │  ┌────────────────┐  ┌──────────────────────────┐  │  │
│  │  │  AliasManager  │  │   EnvVarManager          │  │  │
│  │  └────────────────┘  └──────────────────────────┘  │  │
│  └──────────────────────┬──────────────────────────────┘  │
│                         │                                 │
│  ┌──────────────────────▼──────────────────────────────┐  │
│  │          CommandDispatcher (routing)                │  │
│  └──────────────────────┬──────────────────────────────┘  │
│                         │                                 │
│  ┌──────────────────────▼──────────────────────────────┐  │
│  │            Command Implementations                   │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │  │
│  │  │ core │ │  fs  │ │local │ │novelty│ │...   │     │  │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │  │
│  └──────────────────────┬──────────────────────────────┘  │
│                         │                                 │
├─────────────────────────┼─────────────────────────────────┤
│                         │                                 │
│  ┌──────────────────────▼──────────────────────────────┐  │
│  │          FileSystemService (data layer)             │  │
│  │  ┌────────────────────────────────────────────┐    │  │
│  │  │  Virtual File System (FileSystemNode tree) │    │  │
│  │  └────────────────────────────────────────────┘    │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │        State Managers (SettingsManager, etc)        │  │
│  │  ┌──────────┐  ┌────────────┐  ┌────────────────┐  │  │
│  │  │localStorage│  │  FileSystem│  │  CSS Variables │  │  │
│  │  └──────────┘  └────────────┘  └────────────────┘  │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Core**: TypeScript 5.7.3 (strict mode)
- **Build Tool**: Vite 7.2.1
- **Testing**: Vitest 4.0.4 + jsdom + @testing-library
- **Runtime**: Vanilla JavaScript (no framework)
- **Dependencies**: marked (markdown), figlet (ASCII art), DOMPurify (XSS protection)

---

## Design Patterns

### 1. Command Pattern ✅

**Purpose**: Encapsulate each terminal command as a self-contained object

**Implementation**: `src/commands/Command.ts`

```typescript
interface Command {
  name: string;
  description: string;
  execute: (args: string[], stdin?: string) => Promise<CommandResult> | CommandResult;
  aliases?: string[];
}
```

**Benefits**:

- Easy to add new commands without modifying existing code
- Commands are independently testable
- Supports both sync and async execution
- Pipeline support via stdin parameter

**Example**: All 25 commands implement this interface (ls, cd, cat, about, blog, etc.)

### 2. Dependency Injection ✅

**Purpose**: Decouple components and improve testability

**Implementation**: Constructor injection pattern

```typescript
// src/components/Terminal.ts
constructor(
  private dispatcher: CommandDispatcher,
  private executor: CommandExecutor,
  private settingsManager?: SettingsManager,
  private themeManager?: ThemeManager,
  private envVarManager?: EnvVarManager
)
```

**Benefits**:

- Easy to mock dependencies in tests
- Clear dependency graph
- Flexible component composition

### 3. Chain of Responsibility ✅

**Purpose**: Process markdown line-by-line with specialized handlers

**Implementation**: `src/utils/markdown/MarkdownParser.ts`

```typescript
this.handlers = [
  new CodeBlockHandler(),
  new HeaderHandler(),
  new ListHandler(),
  new EmptyLineHandler(),
  new ParagraphHandler(), // Fallback
];
```

**Benefits**:

- Each handler focuses on one markdown element type
- Easy to add new markdown features
- Clear fallback behavior

### 4. Strategy Pattern ✅

**Purpose**: Swap behavior dynamically (themes, rendering modes)

**Implementation**: Theme system, markdown rendering options

```typescript
class ThemeManager {
  applyTheme(themePreset: ThemePreset): void {
    // Apply different color schemes dynamically
  }
}
```

### 5. Singleton Pattern (Implied) ✅

**Purpose**: Single shared instance of managers

**Implementation**: Instantiated once in `main.ts`

```typescript
const settingsManager = new SettingsManager(fileSystem);
const themeManager = new ThemeManager(settingsManager);
const envVarManager = new EnvVarManager(fileSystem, 'darin', 'darinchambers.com');
```

### 6. Factory Pattern (Partial) ✅

**Purpose**: Create complex objects with common setup

**Implementation**: Command factory functions, FileSystemInitializer

```typescript
// src/utils/fs/FileSystemInitializer.ts
export class FileSystemInitializer {
  static createDefaultStructure(): FileSystemNode {
    // Creates entire filesystem tree
  }
}
```

### 7. Observer Pattern (via Events) ✅

**Purpose**: Decouple event producers and consumers

**Implementation**: Custom DOM events

```typescript
document.addEventListener('settings-changed', () => {
  this.refreshSettingsPanels();
});
```

---

## Component Architecture

### Core Components

#### 1. Terminal (`src/components/Terminal.ts`)

**Responsibilities**:

- Orchestrates command execution
- Manages terminal state (prompt, current path)
- Coordinates TerminalInput and TerminalOutput
- Handles settings UI
- Formats terminal prompt using PromptFormatter

**Key Methods**:

```typescript
executeCommand(command: string, addToHistory: boolean): Promise<void>
setCurrentPath(path: string): void
registerCommands(commands: Command[]): void
focus(): void
updatePrompt(): void
```

**Dependencies**: CommandDispatcher, CommandExecutor, SettingsManager, ThemeManager, EnvVarManager, PromptFormatter

**PromptFormatter Integration**:

The Terminal uses PromptFormatter (`src/utils/PromptFormatter.ts`) to render bash-style prompt format strings with escape sequences like `\u` (username), `\h` (hostname), `\w` (working directory). This allows customizable prompts matching user preferences from settings.

#### 2. TerminalInput (`src/components/TerminalInput.ts`)

**Responsibilities**:

- Handle keyboard input
- Command history navigation (Up/Down arrows)
- Tab completion
- Submit commands

**Key Features**:

- Autofocus management
- History persistence
- Event emission for command submission

#### 3. TerminalOutput (`src/components/TerminalOutput.ts`)

**Responsibilities**:

- Render command output
- Sanitize HTML for XSS protection
- Handle different output types (text, HTML, errors)
- Maintain output history

**Key Methods**:

```typescript
append(output: string, html: boolean, error: boolean): void
clear(): void
```

#### 4. Navigation (`src/components/Navigation.ts`)

**Responsibilities**:

- Render navigation buttons
- Handle click events
- Update aria-current for accessibility
- Integrate with Router for URL sync

**Key Features**:

- Semantic HTML (`<button>` elements)
- ARIA attributes
- Keyboard accessible

#### 5. Header (`src/components/Header.ts`)

**Responsibilities**:

- Display ASCII art header
- Show terminal prompt/tagline

**Key Features**:

- Responsive design (different ASCII fonts for mobile)
- Semantic HTML

#### 6. Router (`src/utils/Router.ts`)

**Responsibilities**:

- Manage browser history (pushState/replaceState/popstate)
- Synchronize URL with application state
- Handle route changes and navigation
- Map URL paths to commands
- Trigger command execution on route changes

**Key Methods**:

```typescript
navigate(path: string, addToHistory: boolean): void
handleRoute(): void
getCurrentPath(): string
```

**Key Features**:

- URL-to-command mapping (`/about` → `about` command)
- Browser back/forward button support
- Programmatic navigation
- Route change callbacks
- Clean URL structure (no hash routing)

**Integration**:

- Works with Navigation component for button clicks
- Executes commands through Terminal on route changes
- Updates navigation active state via callbacks

---

## Data Flow

### Command Execution Flow

```
User Input
    │
    ▼
TerminalInput (capture keypress)
    │
    ▼
Terminal.executeCommand()
    │
    ▼
CommandExecutor.execute()
    │
    ├─► AliasManager.resolve() (expand aliases)
    │
    ├─► EnvVarManager.expandVariables() (replace $VAR)
    │
    ├─► CommandParser.parse() (parse args, flags)
    │
    ▼
CommandDispatcher.dispatch()
    │
    ▼
Command.execute() (specific command implementation)
    │
    ├─► FileSystemService (if file operation)
    │
    ├─► MarkdownService (if rendering content)
    │
    ├─► SettingsManager (if settings command)
    │
    ▼
CommandResult { output, error, html }
    │
    ▼
Terminal.handleResult()
    │
    ├─► Router.updateURL() (sync URL)
    │
    ▼
TerminalOutput.append()
    │
    ├─► sanitizeHtml() (XSS protection)
    │
    ▼
DOM Update (innerHTML)
    │
    ▼
Screen Reader Announcement (aria-live)
```

### Settings Change Flow

```
User Interaction (settings panel)
    │
    ▼
Event Delegation (data-command attribute)
    │
    ▼
Terminal.executeCommand('settings ...')
    │
    ▼
SettingsCommand.execute()
    │
    ▼
SettingsManager.setSetting()
    │
    ├─► localStorage.setItem() (persist)
    │
    ├─► FileSystem.writeFile() (visibility)
    │
    ▼
Emit 'settings-changed' event
    │
    ├─► Terminal.refreshSettingsPanels() (update UI)
    │
    ├─► ThemeManager.applyCurrentTheme() (apply CSS)
    │
    ▼
DOM Update (CSS variables, classes)
```

### Route Navigation Flow

```
User clicks navigation button
    │
    ▼
Navigation.handleClick()
    │
    ▼
Router.navigate(path)
    │
    ├─► history.pushState() (update URL)
    │
    ▼
Router.handleRoute()
    │
    ├─► Extract command from path
    │
    ▼
Terminal.executeCommand()
    │
    ▼
Router.onRouteChange callback
    │
    ▼
Navigation.setActiveItem() (update aria-current)
```

---

## State Management

### State Storage Locations

| State Type      | Primary Storage        | Secondary Storage    | Purpose                  |
| --------------- | ---------------------- | -------------------- | ------------------------ |
| Settings        | localStorage           | Virtual filesystem   | Persistence + visibility |
| Environment     | localStorage           | Virtual filesystem   | Persistence + visibility |
| Aliases         | Virtual filesystem     | None                 | Command shortcuts        |
| Command History | TerminalInput (memory) | None                 | Session-only             |
| Current Path    | Terminal (memory)      | EnvVarManager ($PWD) | Navigation state         |
| Router State    | Browser History API    | None                 | URL state                |
| Theme           | CSS Variables          | SettingsManager      | Visual state             |

### State Managers

#### SettingsManager (`src/utils/SettingsManager.ts`)

**Responsibilities**:

- Load/save settings from localStorage
- Sync settings to virtual filesystem (`~/.settings`)
- Validate settings structure
- Emit change events

**Storage Format**:

```json
{
  "theme": {
    "preset": "green",
    "foreground": "#39ff14",
    "background": "#0a0e14"
  },
  "font": {
    "family": "monospace",
    "size": 14
  },
  "effects": {
    "scanLines": true,
    "glow": true,
    "border": false
  },
  "prompt": {
    "style": "full",
    "animationSpeed": 1.0
  }
}
```

#### EnvVarManager (`src/utils/EnvVarManager.ts`)

**Responsibilities**:

- Manage environment variables ($HOME, $PWD, $USER, etc.)
- Expand variables in commands (`echo $HOME` → `/home/darin`)
- Persist to localStorage and filesystem (`~/.env`)
- Validate variable names

**Built-in Variables**:

- `$HOME` - User home directory
- `$PWD` - Current working directory
- `$OLDPWD` - Previous directory (for `cd -`)
- `$USER` - Username
- `$HOSTNAME` - Hostname

#### AliasManager (`src/utils/AliasManager.ts`)

**Responsibilities**:

- Create command aliases (`alias ll='ls -la'`)
- Resolve aliases during execution
- Persist to filesystem (`/home/guest/.alias`)
- Validate alias syntax

#### ThemeManager (`src/utils/ThemeManager.ts`)

**Responsibilities**:

- Apply theme colors via CSS variables
- Provide theme presets (green, amber, white, cyan, paper)
- Ensure WCAG contrast compliance
- Sync with SettingsManager

---

## Virtual File System

### Architecture

The virtual file system uses a **hierarchical tree structure** with Map-based storage for O(1) lookups.

#### FileSystemNode Structure

Location: `src/utils/fs/types.ts`

```typescript
interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string; // File content (for files)
  children?: Map<string, FileSystemNode>; // Child nodes (for directories)
  permissions?: string; // Unix-style permissions (e.g., 'rw-r--r--')
  owner?: string; // File owner
  size?: number; // File size in bytes
  modifiedTime?: Date; // Last modified timestamp
  isHidden?: boolean; // Hidden file flag
}
```

### Directory Structure

```
/
└── home/
    ├── darin/
    │   ├── about.md
    │   ├── contact.md
    │   ├── skills.md
    │   ├── help.md
    │   ├── .settings (settings JSON)
    │   ├── .env (environment variables)
    │   ├── portfolio/
    │   │   ├── project1.md
    │   │   ├── project2.md
    │   │   └── ...
    │   └── blog/
    │       ├── post1.md
    │       ├── post2.md
    │       └── ...
    └── guest/
        └── .alias (command aliases)
```

### Path Resolution

**Algorithm** (`src/utils/fs/FileSystemService.ts:resolvePath`):

1. Handle tilde expansion (`~` → `/home/darin`)
2. Handle absolute vs relative paths
3. Resolve `.` (current) and `..` (parent) references
4. Normalize multiple slashes
5. Return canonical path

**Example**:

```
Current: /home/darin/blog
Input:   ../portfolio/./project1.md
Output:  /home/darin/portfolio/project1.md
```

### File Operations

- `readFile(path)` - Read file content
- `writeFile(path, content)` - Write file content
- `listDirectory(path)` - List directory contents
- `exists(path)` - Check if path exists
- `isDirectory(path)` - Check if path is directory
- `getNode(path)` - Get FileNode at path

### Content Loading Strategy

**Lazy Loading**: Markdown content files are loaded on-demand

```typescript
// src/utils/fs/FileSystemInitializer.ts
static async loadBlogPost(filename: string): Promise<string> {
  const module = await import(`../../content/blog/${filename}`);
  return module.default;
}
```

**Benefits**:

- Faster initial load time
- Reduced bundle size
- Only load content when accessed

---

## Command Execution Pipeline

### Pipeline Stages

```
Raw Input → Parsing → Alias Resolution → Variable Expansion → Dispatch → Execute → Output
```

### 1. Parsing (`src/utils/CommandParser.ts`)

**Responsibilities**:

- Split command line into command + arguments
- Handle quoted strings (`cat "file name.txt"`)
- Parse flags (`ls -la`)
- Extract options

**Example**:

```
Input:  ls -la ~/portfolio
Output: {
  command: 'ls',
  args: ['-la', '/home/darin/portfolio'],
  options: { l: true, a: true }
}
```

### 2. Pipeline Parsing (`src/utils/PipelineParser.ts`)

**Responsibilities**:

- Split commands by pipe operator (`|`)
- Execute commands sequentially
- Pass stdout of previous command as stdin to next

**Example**:

```
Input:  cat file.md | render
Stage 1: cat file.md → "# Title\nContent"
Stage 2: render (stdin: "# Title\nContent") → HTML output
```

### 3. Alias Resolution (`src/utils/AliasManager.ts`)

**Responsibilities**:

- Replace alias with full command
- Prevent infinite recursion
- Preserve arguments

**Example**:

```
Alias:  ll='ls -la'
Input:  ll ~/blog
Output: ls -la ~/blog
```

### 4. Variable Expansion (`src/utils/EnvVarManager.ts`)

**Responsibilities**:

- Replace $VAR with value
- Handle undefined variables (empty string)
- Support ${VAR} syntax

**Example**:

```
Input:  cd $HOME/portfolio
Expand: cd /home/darin/portfolio
```

### 5. Dispatch & Execute

**Dispatcher** routes to appropriate command implementation.
**Command** executes business logic and returns result.

---

## Event System

### Custom Events

| Event Name         | Trigger                      | Listeners              | Purpose                   |
| ------------------ | ---------------------------- | ---------------------- | ------------------------- |
| `settings-changed` | SettingsManager.setSetting() | Terminal, ThemeManager | React to settings updates |
| `terminal-command` | Navigation button click      | Terminal               | Execute command from UI   |

### Event Flow

```typescript
// Emit event
document.dispatchEvent(
  new CustomEvent('settings-changed', {
    detail: { setting: 'theme', value: 'amber' },
  })
);

// Listen for event
document.addEventListener('settings-changed', () => {
  this.refreshSettingsPanels();
  this.updatePrompt();
});
```

### Benefits

- **Decoupling**: Components don't need direct references
- **Flexibility**: Multiple listeners per event
- **Standard API**: Uses native browser event system

---

## Security Architecture

### Multi-Layer XSS Protection

#### Layer 1: DOMPurify Sanitization

**Location**: `src/utils/sanitizeHtml.ts`

```typescript
import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      // Text formatting
      'p',
      'div',
      'span',
      'br',
      'strong',
      'b',
      'em',
      'i',
      'u',
      's',
      // Links and code
      'a',
      'code',
      'pre',
      // Headers
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      // Lists
      'ul',
      'ol',
      'li',
      'blockquote',
      // Tables
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      // Media
      'img',
      // Interactive elements for settings UI
      'button',
      'input',
      'select',
      'option',
      'label',
      // Semantic HTML
      'aside',
      'section',
      'details',
      'summary',
    ],
    ALLOWED_ATTR: [
      'class',
      'id',
      'href',
      'target',
      'rel',
      'src',
      'alt',
      'title',
      'type',
      'value',
      'checked',
      'selected',
      'disabled',
      'min',
      'max',
      'step',
      'placeholder',
      'open',
      'style',
      // Data attributes for event delegation
      'data-command',
      'data-setting-type',
      'data-color-var',
      'data-theme',
      'data-settings-panel',
      'data-graph',
      // ARIA attributes for accessibility
      'role',
      'aria-label',
      'aria-labelledby',
      'aria-describedby',
      'aria-valuemin',
      'aria-valuemax',
      'aria-valuenow',
      'aria-valuetext',
      'aria-live',
      'aria-atomic',
      'aria-current',
    ],
  });
}
```

**Usage**: All HTML sanitized before `innerHTML` assignment

#### Layer 2: Content Security Policy

**Location**: `public/_headers` (production only)

**Note**: CSP is configured only in the production `_headers` file for Cloudflare Pages deployment. It is intentionally not included in `index.html` as a meta tag to allow the Vite development server to function properly with hot module replacement (HMR).

**Protection**: Browser blocks inline scripts and restricts resource loading even if sanitization fails

**Headers Configuration**:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; ...
```

#### Layer 3: Event Delegation

**Implementation**: No inline event handlers

```html
<!-- ❌ Bad: Inline handler -->
<button onclick="executeCommand('help')">Help</button>

<!-- ✅ Good: Data attribute + delegation -->
<button data-command="help">Help</button>
```

### Input Validation

- **Environment Variables**: Regex validation (`/^[A-Z_][A-Z0-9_]*$/i`)
- **Font Size**: Range 8-24px
- **Animation Speed**: Range 0.5-2.0x
- **Theme Preset**: Whitelist validation
- **Paths**: Normalized to prevent directory traversal

---

## Performance Considerations

### Bundle Optimization

- **Bundle Size**: ~82KB total (110KB JS, 11KB CSS) - gzipped and minified
- **Code Splitting**: Not needed (single-page application with small bundle)
- **Tree Shaking**: Enabled via Vite (ES modules)
- **Minification**: esbuild minification
- **Content Hashing**: Cache busting enabled
- **Current Build**: ~281KB uncompressed JavaScript (compresses to ~110KB with gzip)

### Runtime Performance

- **Virtual Scrolling**: Not implemented (consider for long outputs)
- **Lazy Loading**: Markdown content loaded on-demand
- **Efficient Lookups**: Map data structures (O(1) access)
- **Minimal Reflows**: Batch DOM updates when possible

### Memory Management

- **Event Listeners**: Properly cleaned up
- **History Limits**: Consider capping command history
- **Output Limits**: Consider clearing old output

---

## Testing Strategy

### Test Coverage: 80%+ Target

- **Unit Tests**: 1,000+ tests across 50+ files
- **Test Utilities**: Mock filesystem, DOM setup helpers
- **Coverage Breakdown**:
  - Statements: 70%+
  - Branches: 80%+
  - Functions: 80%+
  - Lines: 70%+
- **Coverage Areas**:
  - ✅ Core utilities (100% - parsers, managers)
  - ✅ Commands (80% - core, fs, novelty)
  - ✅ Components (90% - Input, Output, Navigation)
  - 🟡 Integration tests (minimal)

### Testing Tools

- **Vitest**: Test runner
- **jsdom**: DOM simulation
- **@testing-library**: DOM testing utilities

---

## Future Architecture Improvements

### Short Term

1. Add command factory pattern for dynamic loading
2. Extract settings UI to separate component
3. Add integration tests for pipelines
4. Implement output pagination

### Long Term

1. Consider reactive state management (signals/observables)
2. Implement plugin system for commands
3. Add service worker for offline support
4. Consider Web Workers for heavy computations

---

## Conclusion

This architecture prioritizes **simplicity**, **testability**, and **maintainability** while providing a rich terminal experience. The clean separation of concerns and use of established design patterns makes the codebase easy to understand and extend.

**Key Strengths**:

- Clear dependency graph
- Well-defined interfaces
- Comprehensive type safety
- Multiple security layers
- Flexible state management

For implementation details, see:

- [API.md](API.md) - How to extend the system
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [AUDIT.md](AUDIT.md) - Detailed code analysis
