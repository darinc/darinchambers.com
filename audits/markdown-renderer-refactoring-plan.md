# MarkdownRenderer Refactoring Plan

**Target:** `src/utils/MarkdownRenderer.ts:6-189`
**Current Cyclomatic Complexity:** ~18
**Target Complexity:** <5 per method
**Priority:** Critical (9/10)

---

## Current Issues

### 1. Monolithic render() Method
- **Lines:** 184 (68% of file)
- **Decision Points:** 18+
- **State Flags:** 3 concurrent (`inCodeBlock`, `inList`, `listType`)
- **Nested Conditions:** 4-5 levels deep

### 2. Mixed Concerns
- Frontmatter extraction
- Line-by-line parsing
- State management
- HTML generation
- Inline markdown rendering

### 3. Cognitive Load
Developer must track:
- Whether inside code block
- Whether inside list (ul/ol)
- When to close/continue lists
- Edge cases for each markdown element

---

## Refactoring Strategy

### Architecture: Chain of Responsibility + State Pattern

```
MarkdownRenderer (facade)
  └── MarkdownParser
      ├── ParseContext (state holder)
      └── LineHandlers (chain)
          ├── FrontmatterHandler
          ├── CodeBlockHandler
          ├── HeaderHandler
          ├── ListHandler
          └── ParagraphHandler
```

---

## Implementation Phases

### Phase 1: Extract Infrastructure (4 hours)

**Goal:** Create handler infrastructure without changing behavior

#### Step 1.1: Create ParseContext (30 min)
```typescript
// src/utils/markdown/ParseContext.ts
export class ParseContext {
  private htmlLines: string[] = [];
  private state: 'normal' | 'code_block' | 'list' = 'normal';
  private listType: 'ul' | 'ol' | null = null;
  private listItems: string[] = [];
  private codeBlockLines: string[] = [];

  addHtml(html: string): void {
    this.htmlLines.push(html);
  }

  getHtml(): string {
    return this.htmlLines.join('\n');
  }

  setState(state: 'normal' | 'code_block' | 'list'): void {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }

  // List management
  setListType(type: 'ul' | 'ol'): void {
    this.listType = type;
  }

  getListType(): 'ul' | 'ol' | null {
    return this.listType;
  }

  addListItem(item: string): void {
    this.listItems.push(item);
  }

  flushList(): void {
    if (this.listItems.length > 0 && this.listType) {
      const listHtml = `<${this.listType}>\n${this.listItems.join('\n')}\n</${this.listType}>`;
      this.addHtml(listHtml);
      this.listItems = [];
      this.listType = null;
    }
  }

  // Code block management
  addCodeLine(line: string): void {
    this.codeBlockLines.push(line);
  }

  flushCodeBlock(): void {
    if (this.codeBlockLines.length > 0) {
      const escaped = this.codeBlockLines
        .map(line => this.escapeHtml(line))
        .join('\n');
      this.addHtml(`<pre><code>${escaped}</code></pre>`);
      this.codeBlockLines = [];
    }
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
```

**Files Created:**
- `src/utils/markdown/ParseContext.ts`

**Complexity Reduction:** N/A (infrastructure)

---

#### Step 1.2: Create LineHandler Interface (15 min)
```typescript
// src/utils/markdown/LineHandler.ts
import type { ParseContext } from './ParseContext';

export interface LineHandler {
  /**
   * Check if this handler can process the given line
   */
  canHandle(line: string, context: ParseContext): boolean;

  /**
   * Process the line and update context
   * Returns true if line was handled, false to try next handler
   */
  handle(line: string, context: ParseContext): boolean;
}
```

**Files Created:**
- `src/utils/markdown/LineHandler.ts`

---

#### Step 1.3: Create InlineRenderer Utility (30 min)
```typescript
// src/utils/markdown/InlineRenderer.ts
export class InlineRenderer {
  /**
   * Render inline markdown (bold, italic, code, links)
   */
  static render(text: string): string {
    // Escape HTML first
    let result = this.escapeHtml(text);

    // Links: [text](url)
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Inline code: `code`
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold: **text** or __text__
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Italic: *text* or _text_ (must be after bold to avoid conflicts)
    result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    result = result.replace(/_([^_]+)_/g, '<em>$1</em>');

    return result;
  }

  private static escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
```

**Files Created:**
- `src/utils/markdown/InlineRenderer.ts`

---

### Phase 2: Implement Handlers (6 hours)

#### Step 2.1: CodeBlockHandler (45 min)
```typescript
// src/utils/markdown/handlers/CodeBlockHandler.ts
import type { LineHandler } from '../LineHandler';
import type { ParseContext } from '../ParseContext';

export class CodeBlockHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    return line.trim().startsWith('```') || context.getState() === 'code_block';
  }

  handle(line: string, context: ParseContext): boolean {
    const trimmed = line.trim();

    if (context.getState() === 'code_block') {
      // We're inside a code block
      if (trimmed.startsWith('```')) {
        // End code block
        context.flushCodeBlock();
        context.setState('normal');
      } else {
        // Add line to code block
        context.addCodeLine(line);
      }
      return true;
    }

    // Start new code block
    if (trimmed.startsWith('```')) {
      // Close any open list first
      context.flushList();
      context.setState('code_block');
      return true;
    }

    return false;
  }
}
```

**Files Created:**
- `src/utils/markdown/handlers/CodeBlockHandler.ts`

**Complexity:** ~4

---

#### Step 2.2: HeaderHandler (30 min)
```typescript
// src/utils/markdown/handlers/HeaderHandler.ts
import type { LineHandler } from '../LineHandler';
import type { ParseContext } from '../ParseContext';
import { InlineRenderer } from '../InlineRenderer';

export class HeaderHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    // Only handle headers when not in code block
    if (context.getState() === 'code_block') return false;
    return line.trim().startsWith('#');
  }

  handle(line: string, context: ParseContext): boolean {
    const trimmed = line.trim();
    const match = trimmed.match(/^(#{1,6})\s+(.+)$/);

    if (!match) return false;

    // Close any open list first
    context.flushList();

    const level = match[1].length;
    const content = InlineRenderer.render(match[2]);
    context.addHtml(`<h${level}>${content}</h${level}>`);

    return true;
  }
}
```

**Files Created:**
- `src/utils/markdown/handlers/HeaderHandler.ts`

**Complexity:** ~3

---

#### Step 2.3: ListHandler (90 min)
```typescript
// src/utils/markdown/handlers/ListHandler.ts
import type { LineHandler } from '../LineHandler';
import type { ParseContext } from '../ParseContext';
import { InlineRenderer } from '../InlineRenderer';

export class ListHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    // Don't handle lists inside code blocks
    if (context.getState() === 'code_block') return false;

    const trimmed = line.trim();

    // Check for unordered list markers
    if (trimmed.match(/^[-*]\s+/)) return true;

    // Check for ordered list markers
    if (trimmed.match(/^\d+\.\s+/)) return true;

    // If we're in a list state, check if line continues it
    if (context.getState() === 'list') {
      return trimmed.length > 0 && this.isListItem(trimmed);
    }

    return false;
  }

  handle(line: string, context: ParseContext): boolean {
    const trimmed = line.trim();

    // Empty line or non-list-item ends the list
    if (context.getState() === 'list' && (!trimmed || !this.isListItem(trimmed))) {
      context.flushList();
      context.setState('normal');
      return false; // Let another handler process this line
    }

    // Unordered list item
    const ulMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      return this.handleListItem(context, 'ul', ulMatch[1]);
    }

    // Ordered list item
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      return this.handleListItem(context, 'ol', olMatch[1]);
    }

    return false;
  }

  private handleListItem(
    context: ParseContext,
    type: 'ul' | 'ol',
    content: string
  ): boolean {
    const currentListType = context.getListType();

    // If switching list types, flush the current list
    if (currentListType && currentListType !== type) {
      context.flushList();
    }

    // Start or continue list
    if (!currentListType || currentListType !== type) {
      context.setState('list');
      context.setListType(type);
    }

    const renderedContent = InlineRenderer.render(content);
    context.addListItem(`<li>${renderedContent}</li>`);

    return true;
  }

  private isListItem(line: string): boolean {
    return !!(
      line.match(/^[-*]\s+/) ||
      line.match(/^\d+\.\s+/)
    );
  }
}
```

**Files Created:**
- `src/utils/markdown/handlers/ListHandler.ts`

**Complexity:** ~6 (acceptable for list state management)

---

#### Step 2.4: EmptyLineHandler (20 min)
```typescript
// src/utils/markdown/handlers/EmptyLineHandler.ts
import type { LineHandler } from '../LineHandler';
import type { ParseContext } from '../ParseContext';

export class EmptyLineHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    // Don't handle empty lines in code blocks
    if (context.getState() === 'code_block') return false;
    return line.trim() === '';
  }

  handle(line: string, context: ParseContext): boolean {
    // Empty lines don't appear in lists
    if (context.getState() === 'list') {
      context.flushList();
      context.setState('normal');
    }

    // Add line break for normal state
    if (context.getState() === 'normal') {
      context.addHtml('<br>');
    }

    return true;
  }
}
```

**Files Created:**
- `src/utils/markdown/handlers/EmptyLineHandler.ts`

**Complexity:** ~2

---

#### Step 2.5: ParagraphHandler (20 min)
```typescript
// src/utils/markdown/handlers/ParagraphHandler.ts
import type { LineHandler } from '../LineHandler';
import type { ParseContext } from '../ParseContext';
import { InlineRenderer } from '../InlineRenderer';

export class ParagraphHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    // Paragraph handler is the fallback - handles anything not handled by others
    return context.getState() === 'normal' && line.trim().length > 0;
  }

  handle(line: string, context: ParseContext): boolean {
    const content = InlineRenderer.render(line);
    context.addHtml(`<p>${content}</p>`);
    return true;
  }
}
```

**Files Created:**
- `src/utils/markdown/handlers/ParagraphHandler.ts`

**Complexity:** ~1

---

### Phase 3: Create Parser Orchestrator (2 hours)

#### Step 3.1: MarkdownParser (60 min)
```typescript
// src/utils/markdown/MarkdownParser.ts
import type { LineHandler } from './LineHandler';
import { ParseContext } from './ParseContext';
import { CodeBlockHandler } from './handlers/CodeBlockHandler';
import { HeaderHandler } from './handlers/HeaderHandler';
import { ListHandler } from './handlers/ListHandler';
import { EmptyLineHandler } from './handlers/EmptyLineHandler';
import { ParagraphHandler } from './handlers/ParagraphHandler';

export class MarkdownParser {
  private handlers: LineHandler[];

  constructor() {
    // Order matters! Earlier handlers have priority
    this.handlers = [
      new CodeBlockHandler(),
      new HeaderHandler(),
      new ListHandler(),
      new EmptyLineHandler(),
      new ParagraphHandler() // Fallback handler
    ];
  }

  parse(content: string): string {
    const lines = content.split('\n');
    const context = new ParseContext();

    for (const line of lines) {
      this.processLine(line, context);
    }

    // Flush any remaining state
    this.flushRemainingState(context);

    return context.getHtml();
  }

  private processLine(line: string, context: ParseContext): void {
    for (const handler of this.handlers) {
      if (handler.canHandle(line, context)) {
        const handled = handler.handle(line, context);
        if (handled) {
          break; // Line was handled, move to next line
        }
        // If handler returned false, try next handler
      }
    }
  }

  private flushRemainingState(context: ParseContext): void {
    // Close any remaining open list
    context.flushList();

    // Close any remaining code block
    context.flushCodeBlock();
  }
}
```

**Files Created:**
- `src/utils/markdown/MarkdownParser.ts`

**Complexity:** ~3

---

#### Step 3.2: FrontmatterParser (45 min)
```typescript
// src/utils/markdown/FrontmatterParser.ts
export interface FrontmatterData {
  [key: string]: string | string[];
}

export interface ParsedMarkdown {
  frontmatter: FrontmatterData | null;
  content: string;
}

export class FrontmatterParser {
  /**
   * Extract YAML frontmatter from markdown
   */
  static parse(markdown: string): ParsedMarkdown {
    if (!markdown.trim().startsWith('---')) {
      return { frontmatter: null, content: markdown };
    }

    const lines = markdown.split('\n');
    const endIndex = this.findFrontmatterEnd(lines);

    if (endIndex === -1) {
      return { frontmatter: null, content: markdown };
    }

    const frontmatterLines = lines.slice(1, endIndex);
    const contentLines = lines.slice(endIndex + 1);

    return {
      frontmatter: this.parseFrontmatterLines(frontmatterLines),
      content: contentLines.join('\n')
    };
  }

  private static findFrontmatterEnd(lines: string[]): number {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        return i;
      }
    }
    return -1;
  }

  private static parseFrontmatterLines(lines: string[]): FrontmatterData {
    const frontmatter: FrontmatterData = {};

    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Handle arrays: [item1, item2]
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.substring(1, value.length - 1);
        frontmatter[key] = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''))
          .filter(item => item.length > 0);
      } else {
        // Remove quotes
        frontmatter[key] = value.replace(/^["']|["']$/g, '');
      }
    }

    return frontmatter;
  }

  /**
   * Render frontmatter as HTML
   */
  static renderFrontmatter(frontmatter: FrontmatterData): string {
    const parts: string[] = [];

    if (frontmatter.title && typeof frontmatter.title === 'string') {
      parts.push(`<h1 class="fm-title">${this.escapeHtml(frontmatter.title)}</h1>`);
    }

    const meta: string[] = [];
    if (frontmatter.date && typeof frontmatter.date === 'string') {
      meta.push(`<span class="fm-date">${this.escapeHtml(frontmatter.date)}</span>`);
    }
    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      const tags = frontmatter.tags
        .map((tag: string) => `<span class="fm-tag">${this.escapeHtml(tag)}</span>`)
        .join(' ');
      meta.push(`<span class="fm-tags">${tags}</span>`);
    }

    if (meta.length > 0) {
      parts.push(`<div class="fm-meta">${meta.join(' • ')}</div>`);
    }

    if (frontmatter.summary && typeof frontmatter.summary === 'string') {
      parts.push(`<p class="fm-summary">${this.escapeHtml(frontmatter.summary)}</p>`);
    }

    if (parts.length > 0) {
      parts.push('<hr class="fm-divider">');
    }

    return parts.join('\n');
  }

  private static escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
```

**Files Created:**
- `src/utils/markdown/FrontmatterParser.ts`

**Complexity:** ~4

---

#### Step 3.3: Refactor MarkdownRenderer Facade (15 min)
```typescript
// src/utils/MarkdownRenderer.ts
import { MarkdownParser } from './markdown/MarkdownParser';
import { FrontmatterParser } from './markdown/FrontmatterParser';

export class MarkdownRenderer {
  /**
   * Convert markdown text to HTML with CSS classes
   * Optionally renders YAML frontmatter as formatted metadata
   */
  static render(markdown: string, renderFrontmatter: boolean = false): string {
    let content = markdown;
    let frontmatterHtml = '';

    // Extract and render frontmatter if requested
    if (renderFrontmatter) {
      const parsed = FrontmatterParser.parse(markdown);
      content = parsed.content;

      if (parsed.frontmatter) {
        frontmatterHtml = FrontmatterParser.renderFrontmatter(parsed.frontmatter);
      }
    }

    // Parse markdown content
    const parser = new MarkdownParser();
    const contentHtml = parser.parse(content);

    return `<div class="markdown-output">${frontmatterHtml}${contentHtml}</div>`;
  }
}
```

**Files Modified:**
- `src/utils/MarkdownRenderer.ts` (reduced from 269 to ~30 lines)

**Complexity:** ~2

---

### Phase 4: Testing (4 hours)

#### Step 4.1: Unit Tests for Handlers (2 hours)

**Test File Structure:**
```
src/utils/markdown/__tests__/
├── CodeBlockHandler.test.ts
├── HeaderHandler.test.ts
├── ListHandler.test.ts
├── ParagraphHandler.test.ts
├── FrontmatterParser.test.ts
└── MarkdownParser.test.ts
```

**Example Test:**
```typescript
// src/utils/markdown/__tests__/HeaderHandler.test.ts
import { describe, it, expect } from 'vitest';
import { HeaderHandler } from '../handlers/HeaderHandler';
import { ParseContext } from '../ParseContext';

describe('HeaderHandler', () => {
  it('should handle h1 headers', () => {
    const handler = new HeaderHandler();
    const context = new ParseContext();

    expect(handler.canHandle('# Hello', context)).toBe(true);
    handler.handle('# Hello', context);

    expect(context.getHtml()).toContain('<h1>Hello</h1>');
  });

  it('should handle h1-h6 levels', () => {
    const handler = new HeaderHandler();
    const context = new ParseContext();

    handler.handle('## Level 2', context);
    handler.handle('### Level 3', context);

    const html = context.getHtml();
    expect(html).toContain('<h2>Level 2</h2>');
    expect(html).toContain('<h3>Level 3</h3>');
  });

  it('should not handle headers in code blocks', () => {
    const handler = new HeaderHandler();
    const context = new ParseContext();
    context.setState('code_block');

    expect(handler.canHandle('# Not a header', context)).toBe(false);
  });

  it('should render inline markdown in headers', () => {
    const handler = new HeaderHandler();
    const context = new ParseContext();

    handler.handle('# Hello **World**', context);

    expect(context.getHtml()).toContain('<h1>Hello <strong>World</strong></h1>');
  });
});
```

**Test Coverage Target:** 90%+

---

#### Step 4.2: Integration Tests (1 hour)

```typescript
// src/utils/__tests__/MarkdownRenderer.integration.test.ts
import { describe, it, expect } from 'vitest';
import { MarkdownRenderer } from '../MarkdownRenderer';

describe('MarkdownRenderer Integration', () => {
  it('should render complex markdown with multiple elements', () => {
    const markdown = `# Title

This is a paragraph with **bold** and *italic*.

## Subsection

- Item 1
- Item 2

\`\`\`
code block
\`\`\`

More text.`;

    const result = MarkdownRenderer.render(markdown);

    expect(result).toContain('<h1>Title</h1>');
    expect(result).toContain('<strong>bold</strong>');
    expect(result).toContain('<em>italic</em>');
    expect(result).toContain('<h2>Subsection</h2>');
    expect(result).toContain('<ul>');
    expect(result).toContain('<li>Item 1</li>');
    expect(result).toContain('<pre><code>');
    expect(result).toContain('code block');
  });

  it('should handle nested lists', () => {
    const markdown = `- Item 1
- Item 2

Text between

1. First
2. Second`;

    const result = MarkdownRenderer.render(markdown);

    expect(result).toContain('<ul>');
    expect(result).toContain('<ol>');
  });

  it('should render frontmatter when requested', () => {
    const markdown = `---
title: Test Post
date: 2024-01-01
tags: [test, markdown]
---

Content here.`;

    const result = MarkdownRenderer.render(markdown, true);

    expect(result).toContain('<h1 class="fm-title">Test Post</h1>');
    expect(result).toContain('<span class="fm-date">2024-01-01</span>');
    expect(result).toContain('<span class="fm-tag">test</span>');
  });
});
```

---

#### Step 4.3: Edge Case Tests (1 hour)

```typescript
// src/utils/markdown/__tests__/EdgeCases.test.ts
import { describe, it, expect } from 'vitest';
import { MarkdownRenderer } from '../../MarkdownRenderer';

describe('MarkdownRenderer Edge Cases', () => {
  it('should handle empty input', () => {
    const result = MarkdownRenderer.render('');
    expect(result).toBe('<div class="markdown-output"></div>');
  });

  it('should handle unclosed code blocks', () => {
    const markdown = '```\ncode without closing';
    const result = MarkdownRenderer.render(markdown);
    expect(result).toContain('<pre><code>');
  });

  it('should handle unclosed lists', () => {
    const markdown = '- Item 1\n- Item 2';
    const result = MarkdownRenderer.render(markdown);
    expect(result).toContain('<ul>');
    expect(result).toContain('</ul>');
  });

  it('should escape HTML in content', () => {
    const markdown = 'Text with <script>alert("xss")</script>';
    const result = MarkdownRenderer.render(markdown);
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });

  it('should handle consecutive empty lines', () => {
    const markdown = 'Line 1\n\n\n\nLine 2';
    const result = MarkdownRenderer.render(markdown);
    expect(result).toContain('<p>Line 1</p>');
    expect(result).toContain('<br>');
    expect(result).toContain('<p>Line 2</p>');
  });
});
```

---

### Phase 5: Migration & Cleanup (1 hour)

#### Step 5.1: Update Imports (15 min)

All existing imports should continue to work:
```typescript
import { MarkdownRenderer } from './utils/MarkdownRenderer';

// Still works exactly the same
const html = MarkdownRenderer.render(markdown);
```

No changes needed to calling code!

---

#### Step 5.2: Delete Old Implementation (5 min)

After tests pass, delete the old `render()` implementation from `MarkdownRenderer.ts`.

---

#### Step 5.3: Update Documentation (20 min)

```typescript
// src/utils/markdown/README.md
# Markdown Rendering System

## Architecture

The markdown renderer uses a **Chain of Responsibility** pattern with **State Pattern** for parsing.

### Components

- **MarkdownRenderer**: Public facade (single entry point)
- **MarkdownParser**: Orchestrates line handlers
- **ParseContext**: Manages parsing state
- **LineHandlers**: Process specific markdown elements
  - CodeBlockHandler: Fenced code blocks
  - HeaderHandler: H1-H6 headers
  - ListHandler: Ordered/unordered lists
  - EmptyLineHandler: Line breaks
  - ParagraphHandler: Regular paragraphs
- **FrontmatterParser**: YAML frontmatter extraction
- **InlineRenderer**: Bold, italic, code, links

### Adding New Handlers

1. Implement `LineHandler` interface
2. Add to `MarkdownParser.handlers` array
3. Write tests

Example:
\`\`\`typescript
export class BlockquoteHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    return line.trim().startsWith('>');
  }

  handle(line: string, context: ParseContext): boolean {
    // Implementation
  }
}
\`\`\`
```

---

#### Step 5.4: Run Full Test Suite (20 min)

```bash
npm run test
npm run test:coverage
```

**Target Coverage:**
- Overall: 90%+
- MarkdownParser: 95%+
- Each handler: 95%+

---

## File Structure After Refactoring

```
src/utils/
├── MarkdownRenderer.ts (30 lines) - Public facade
└── markdown/
    ├── MarkdownParser.ts (60 lines) - Orchestrator
    ├── ParseContext.ts (100 lines) - State management
    ├── LineHandler.ts (15 lines) - Interface
    ├── InlineRenderer.ts (50 lines) - Inline formatting
    ├── FrontmatterParser.ts (100 lines) - Frontmatter handling
    ├── handlers/
    │   ├── CodeBlockHandler.ts (40 lines)
    │   ├── HeaderHandler.ts (30 lines)
    │   ├── ListHandler.ts (80 lines)
    │   ├── EmptyLineHandler.ts (25 lines)
    │   └── ParagraphHandler.ts (20 lines)
    ├── README.md - Documentation
    └── __tests__/
        ├── MarkdownParser.test.ts
        ├── ParseContext.test.ts
        ├── FrontmatterParser.test.ts
        ├── InlineRenderer.test.ts
        ├── EdgeCases.test.ts
        ├── MarkdownRenderer.integration.test.ts
        └── handlers/
            ├── CodeBlockHandler.test.ts
            ├── HeaderHandler.test.ts
            ├── ListHandler.test.ts
            ├── EmptyLineHandler.test.ts
            └── ParagraphHandler.test.ts
```

---

## Complexity Reduction Summary

| Component | Before | After | Reduction |
|-----------|--------|-------|-----------|
| MarkdownRenderer.render() | 18 | 2 | -89% |
| CodeBlockHandler | N/A | 4 | N/A |
| HeaderHandler | N/A | 3 | N/A |
| ListHandler | N/A | 6 | N/A |
| EmptyLineHandler | N/A | 2 | N/A |
| ParagraphHandler | N/A | 1 | N/A |
| MarkdownParser | N/A | 3 | N/A |
| FrontmatterParser | N/A | 4 | N/A |
| **Average per method** | **18** | **3.1** | **-83%** |

---

## Benefits

### 1. Maintainability
- Each handler is <100 lines
- Single responsibility per class
- Easy to understand and modify

### 2. Testability
- Each handler tested independently
- Mock ParseContext for unit tests
- High test coverage achievable

### 3. Extensibility
- Add new handlers without modifying existing code
- Example: Add `BlockquoteHandler`, `TableHandler`, `TaskListHandler`

### 4. Debuggability
- Clear handler chain execution
- State transitions explicit
- Easy to add logging

---

## Effort Summary

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| Phase 1: Infrastructure | 3 steps | 4 hours |
| Phase 2: Handlers | 5 handlers | 6 hours |
| Phase 3: Orchestration | 3 components | 2 hours |
| Phase 4: Testing | Unit + Integration | 4 hours |
| Phase 5: Migration | Cleanup + Docs | 1 hour |
| **Total** | | **17 hours** |

---

## Timeline

**Recommended Schedule:**
- **Day 1-2:** Phase 1 + Phase 2 (10 hours)
- **Day 3:** Phase 3 (2 hours)
- **Day 4:** Phase 4 (4 hours)
- **Day 5:** Phase 5 (1 hour)

**Total Duration:** 5 days (with time for breaks/reviews)

---

## Risk Mitigation

### Risk: Breaking existing functionality
**Mitigation:**
- Comprehensive integration tests before refactoring
- Facade pattern maintains existing API
- Side-by-side comparison during development

### Risk: Performance regression
**Mitigation:**
- Benchmark before/after
- Handler chain is efficient (early exit on match)
- State management overhead minimal

### Risk: Incomplete edge case handling
**Mitigation:**
- Extensive edge case tests
- Test with existing blog posts
- Manual QA on all markdown features

---

## Success Criteria

✅ **All existing tests pass**
✅ **New tests achieve 90%+ coverage**
✅ **Cyclomatic complexity <5 per method**
✅ **No breaking changes to public API**
✅ **Documentation complete**
✅ **Code review approved**

---

## Next Steps

1. **Review this plan** with team
2. **Set up testing infrastructure** (if not already done)
3. **Create feature branch:** `refactor/markdown-renderer`
4. **Begin Phase 1**
5. **Daily check-ins** to track progress

---

## Questions for Review

1. Should we support additional markdown features (tables, task lists)?
2. Performance benchmarks needed before starting?
3. Should we maintain the old implementation temporarily?
4. Who will review the pull request?

---

**Plan Author:** Code Complexity Analysis Tool
**Date:** 2025-10-28
**Priority:** Critical
**Estimated ROI:** 83% complexity reduction, improved maintainability
