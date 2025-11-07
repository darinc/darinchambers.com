# Comprehensive Testing Plan for Markdown Rendering System

## Overview

The Markdown Rendering System has been successfully refactored from a monolithic 189-line `render()` method (cyclomatic complexity ~18) into a clean, modular architecture using Chain of Responsibility and State patterns. The system now consists of **500 total lines** across **11 files** with significantly reduced complexity per module.

---

## 1. MARKDOWN-RELATED SOURCE FILES

### Core System Files

#### `/Users/darin/code/dc/dc.com/src/utils/MarkdownRenderer.ts` (29 lines)

**Purpose:** Facade/entry point for markdown rendering
**Complexity:** Very Low (1-2)
**Key Methods:**

- `static render(markdown: string, renderFrontmatter: boolean): string` - Main entry point

#### `/Users/darin/code/dc/dc.com/src/utils/markdown/MarkdownParser.ts` (56 lines)

**Purpose:** Orchestrates line-by-line parsing using handler chain
**Complexity:** Low (3-4)
**Key Methods:**

- `constructor()` - Initializes handler chain in priority order
- `parse(content: string): string` - Main parsing loop
- `private processLine(line: string, context: ParseContext): void` - Delegates to handlers
- `private flushRemainingState(context: ParseContext): void` - Cleanup after parsing

#### `/Users/darin/code/dc/dc.com/src/utils/markdown/ParseContext.ts` (69 lines)

**Purpose:** Manages parsing state and HTML accumulation
**Complexity:** Low (2-3)
**Key Methods:**

- `addHtml(html: string): void`
- `getHtml(): string`
- `setState(state: 'normal' | 'code_block' | 'list'): void`
- `getState(): string`
- `setListType(type: 'ul' | 'ol'): void`
- `getListType(): 'ul' | 'ol' | null`
- `addListItem(item: string): void`
- `flushList(): void`
- `addCodeLine(line: string): void`
- `flushCodeBlock(): void`
- `private escapeHtml(text: string): string`

#### `/Users/darin/code/dc/dc.com/src/utils/markdown/InlineRenderer.ts` (34 lines)

**Purpose:** Renders inline markdown (bold, italic, code, links)
**Complexity:** Low (2-3)
**Key Methods:**

- `static render(text: string): string` - Processes inline markdown with regex
- `private static escapeHtml(text: string): string` - HTML entity escaping

#### `/Users/darin/code/dc/dc.com/src/utils/markdown/FrontmatterParser.ts` (114 lines)

**Purpose:** Extracts and renders YAML frontmatter
**Complexity:** Medium (5-6)
**Key Methods:**

- `static parse(markdown: string): ParsedMarkdown` - Extract frontmatter from content
- `private static findFrontmatterEnd(lines: string[]): number` - Locate closing delimiter
- `private static parseFrontmatterLines(lines: string[]): FrontmatterData` - Parse YAML-like syntax
- `static renderFrontmatter(frontmatter: FrontmatterData): string` - Convert to HTML
- `private static escapeHtml(text: string): string` - HTML entity escaping

#### `/Users/darin/code/dc/dc.com/src/utils/markdown/LineHandler.ts` (14 lines)

**Purpose:** Interface defining handler contract
**Complexity:** N/A (Interface)
**Key Methods:**

- `canHandle(line: string, context: ParseContext): boolean`
- `handle(line: string, context: ParseContext): boolean`

### Handler Files

#### `/Users/darin/code/dc/dc.com/src/utils/markdown/handlers/CodeBlockHandler.ts` (35 lines)

**Purpose:** Handles fenced code blocks (```)
**Complexity:** Low (3-4)
**Key Methods:**

- `canHandle(line: string, context: ParseContext): boolean` - Detects ``` or code_block state
- `handle(line: string, context: ParseContext): boolean` - Manages code block state transitions

#### `/Users/darin/code/dc/dc.com/src/utils/markdown/handlers/HeaderHandler.ts` (27 lines)

**Purpose:** Handles headers (# to ######)
**Complexity:** Low (2-3)
**Key Methods:**

- `canHandle(line: string, context: ParseContext): boolean` - Detects # prefix
- `handle(line: string, context: ParseContext): boolean` - Extracts level and content, renders with inline formatting

#### `/Users/darin/code/dc/dc.com/src/utils/markdown/handlers/ListHandler.ts` (81 lines)

**Purpose:** Handles ordered and unordered lists
**Complexity:** Medium (6-7)
**Key Methods:**

- `canHandle(line: string, context: ParseContext): boolean` - Detects list markers
- `handle(line: string, context: ParseContext): boolean` - Processes list items
- `private handleListItem(context: ParseContext, type: 'ul' | 'ol', content: string): boolean` - Manages list state
- `private isListItem(line: string): boolean` - Helper to identify list lines

#### `/Users/darin/code/dc/dc.com/src/utils/markdown/handlers/ParagraphHandler.ts` (16 lines)

**Purpose:** Fallback handler for regular text
**Complexity:** Very Low (1-2)
**Key Methods:**

- `canHandle(line: string, context: ParseContext): boolean` - Accepts non-empty lines in normal state
- `handle(line: string, context: ParseContext): boolean` - Wraps in <p> tags with inline rendering

#### `/Users/darin/code/dc/dc.com/src/utils/markdown/handlers/EmptyLineHandler.ts` (25 lines)

**Purpose:** Handles empty lines and list termination
**Complexity:** Low (2-3)
**Key Methods:**

- `canHandle(line: string, context: ParseContext): boolean` - Detects empty lines (outside code blocks)
- `handle(line: string, context: ParseContext): boolean` - Flushes lists, adds <br> in normal state

### Integration Point

#### `/Users/darin/code/dc/dc.com/src/commands/core/render.ts` (67 lines)

**Purpose:** Command implementation for markdown rendering
**Complexity:** Medium (5-6)
**Key Methods:**

- `createRenderCommand(fs: IFileSystem): Command` - Factory function that returns command object
- Command's `execute(args: string[], stdin?: string)` - Handles file reading, stdin piping, frontmatter detection

---

## 2. IMPLEMENTATION ANALYSIS

### Architecture Pattern

**Chain of Responsibility + State Pattern**

- **MarkdownRenderer** - Facade providing simple API
- **MarkdownParser** - Orchestrator managing handler chain
- **ParseContext** - State holder (State pattern)
- **LineHandler** - Interface for chain members
- **Handlers** - Specialized processors (CodeBlock, Header, List, Paragraph, EmptyLine)

### Dependencies & Injection

- **Handler Order Matters**: CodeBlockHandler → HeaderHandler → ListHandler → EmptyLineHandler → ParagraphHandler
- **No Dependency Injection Currently**: Handlers are instantiated directly in MarkdownParser constructor
- **Stateless Handlers**: All handlers are stateless; state lives in ParseContext
- **InlineRenderer**: Used by HeaderHandler, ListHandler, and ParagraphHandler (static utility)

### Key Design Decisions

1. **Handler Priority**: Earlier handlers in chain have priority
2. **State Management**: Centralized in ParseContext, not scattered across handlers
3. **HTML Escaping**: Duplicated in 3 places (ParseContext, InlineRenderer, FrontmatterParser) - potential DRY violation
4. **Regex-based Inline Rendering**: Simple but may have edge cases with nested/overlapping patterns

---

## 3. EXISTING TEST PATTERNS

### Test Framework: Vitest

**Config:** `/Users/darin/code/dc/dc.com/vitest.config.ts`

- Environment: jsdom
- Coverage: v8 provider, 80% threshold
- Globals enabled
- Auto-mock clearing/resetting

### Test Structure Patterns (from existing tests)

#### Pattern 1: Simple Unit Tests (CommandParser.test.ts)

```typescript
import { describe, it, expect } from 'vitest';
import { TargetClass } from '../../../src/path/to/module';

describe('TargetClass', () => {
  describe('methodName', () => {
    it('should handle normal case', () => {
      const result = TargetClass.method(input);
      expect(result).toBe(expected);
    });

    it('should handle edge case', () => {
      // test edge case
    });
  });
});
```

#### Pattern 2: Stateful Tests with beforeEach (FileSystemService.test.ts)

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('StatefulClass', () => {
  let instance: StatefulClass;
  let mockDependency: MockType;

  beforeEach(() => {
    mockDependency = createMock();
    instance = new StatefulClass(mockDependency);
  });

  // tests...
});
```

#### Pattern 3: Mock Dependencies (CommandExecutor.test.ts)

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

class MockDependency {
  method = vi.fn<[ParamType], ReturnType>();
}

describe('ClassWithDeps', () => {
  let instance: ClassWithDeps;
  let mockDep: MockDependency;

  beforeEach(() => {
    mockDep = new MockDependency();
    mockDep.method.mockReturnValue(value);
    instance = new ClassWithDeps(mockDep as unknown as RealDependency);
  });
});
```

### Common Assertions

- `expect(result).toBe(expected)` - Exact equality
- `expect(result).toEqual(expected)` - Deep equality
- `expect(() => fn()).toThrow('message')` - Error throwing
- `expect(mockFn).toHaveBeenCalled()` - Mock verification
- `expect(mockFn).toHaveBeenCalledWith(args)` - Mock argument verification
- `expect(value).toBeInstanceOf(Class)` - Type checking

---

## 4. TEST DATA NEEDS

### Sample Markdown Content

#### Basic Elements

```markdown
# Header 1

## Header 2

### Header 3

Regular paragraph with **bold** and _italic_ text.

Another paragraph with `inline code` and [links](https://example.com).
```

#### Lists

```markdown
- Unordered item 1
- Unordered item 2
- Unordered item 3

1. Ordered item 1
2. Ordered item 2
3. Ordered item 3
```

#### Code Blocks

```markdown

```

function hello() {
return "world";
}

```

```

#### Frontmatter (from actual blog posts)

```markdown
---
title: 'Lessons from Building AI Systems at Scale'
date: '2024-09-15'
tags: ['AI/ML', 'Production', 'Engineering']
summary: 'Key insights from deploying machine learning models...'
---

Content here...
```

#### Complex Mixed Content

Available in:

- `/Users/darin/code/dc/dc.com/src/blog/2024-09-15-ai-production-lessons.md`
- `/Users/darin/code/dc/dc.com/src/blog/2024-07-22-distributed-systems-reliability.md`
- `/Users/darin/code/dc/dc.com/src/blog/2024-05-10-developer-experience.md`
- `/Users/darin/code/dc/dc.com/src/content/about.md`
- `/Users/darin/code/dc/dc.com/src/content/help.md`

### Edge Cases to Test

1. **Empty/Whitespace**
   - Empty string
   - Only whitespace
   - Multiple consecutive blank lines

2. **Malformed Markdown**
   - Unclosed code blocks
   - Headers without space after #
   - Unmatched list transitions (ul → ol → ul)
   - Nested formatting (**_bold and italic_**)

3. **HTML Escaping**
   - `<script>alert('xss')</script>`
   - `& < > " '` characters
   - Code blocks containing HTML

4. **Inline Rendering Edge Cases**
   - Overlapping bold/italic: `**bold *both** italic*`
   - Escaped characters: `\*not italic\*`
   - Multiple links in one line
   - Code within bold: `**text `code` text**`

5. **State Transitions**
   - Code block → header
   - List → code block → list
   - Empty line → list item (should not continue list)
   - Paragraph → list → paragraph

6. **Frontmatter Variations**
   - No frontmatter
   - Empty frontmatter
   - Frontmatter without title
   - Array values: `tags: ["tag1", "tag2"]`
   - Single vs double quotes
   - Missing closing `---`

---

## 5. COMPREHENSIVE TEST PLAN

### 5.1 ParseContext Tests

**File:** `tests/unit/parsers/markdown/ParseContext.test.ts`

**Test Scenarios:**

1. **HTML Accumulation**
   - Should accumulate HTML lines
   - Should join with newlines on getHtml()
   - Should handle empty context

2. **State Management**
   - Should initialize to 'normal' state
   - Should transition between states
   - Should return current state

3. **List Management**
   - Should accumulate list items
   - Should flush ul correctly
   - Should flush ol correctly
   - Should clear items after flush
   - Should reset list type after flush
   - Should handle empty list flush (no-op)
   - Should handle switching list types

4. **Code Block Management**
   - Should accumulate code lines
   - Should preserve original spacing in code
   - Should escape HTML in code blocks
   - Should join lines with newlines
   - Should wrap in <pre><code> tags
   - Should clear lines after flush
   - Should handle empty code block flush (no-op)

5. **HTML Escaping**
   - Should escape & as &amp;
   - Should escape < as &lt;
   - Should escape > as &gt;
   - Should escape " as &quot;
   - Should escape ' as &#039;
   - Should handle multiple entities in one string

**Complexity:** Low
**Dependencies:** None
**Mocking:** None needed

---

### 5.2 InlineRenderer Tests

**File:** `tests/unit/parsers/markdown/InlineRenderer.test.ts`

**Test Scenarios:**

1. **Links**
   - Should render [text](url) correctly
   - Should handle multiple links in one line
   - Should handle links with special characters in text
   - Should handle links with query params in URL

2. **Inline Code**
   - Should render `code` with <code> tags
   - Should preserve content inside backticks
   - Should handle multiple code spans

3. **Bold**
   - Should render **text** as <strong>
   - Should render **text** as <strong>
   - Should handle both syntaxes in one line

4. **Italic**
   - Should render _text_ as <em>
   - Should render _text_ as <em>
   - Should handle both syntaxes in one line

5. **Order of Operations**
   - Should apply in correct order: links → code → bold → italic
   - Should not format inside code spans
   - Should handle nested formatting edge cases

6. **HTML Escaping**
   - Should escape HTML before applying markdown
   - Should escape <script> tags
   - Should escape all HTML entities

7. **Edge Cases**
   - Should handle empty string
   - Should handle text with no markdown
   - Should handle unclosed markers gracefully
   - Should handle overlapping markers

**Complexity:** Medium
**Dependencies:** None
**Mocking:** None needed

---

### 5.3 FrontmatterParser Tests

**File:** `tests/unit/parsers/markdown/FrontmatterParser.test.ts`

**Test Scenarios:**

#### parse() method

1. **Valid Frontmatter**
   - Should extract simple key-value pairs
   - Should extract array values: `tags: ["a", "b"]`
   - Should handle single and double quotes
   - Should trim whitespace from values
   - Should separate content from frontmatter

2. **No Frontmatter**
   - Should return null frontmatter for content without ---
   - Should return full content unchanged
   - Should handle content starting with non-frontmatter

3. **Malformed Frontmatter**
   - Should handle missing closing ---
   - Should skip lines without colons
   - Should handle empty frontmatter section
   - Should handle malformed arrays

4. **Edge Cases**
   - Should handle empty string
   - Should handle only frontmatter (no content)
   - Should handle frontmatter with --- in content

#### renderFrontmatter() method

1. **Title Rendering**
   - Should render title as <h1 class="fm-title">
   - Should escape HTML in title
   - Should skip if no title

2. **Date Rendering**
   - Should render date in fm-meta div
   - Should escape HTML in date
   - Should skip if no date

3. **Tags Rendering**
   - Should render tags as individual spans
   - Should join with bullet separator
   - Should escape HTML in tags
   - Should handle empty tag array
   - Should skip if no tags

4. **Summary Rendering**
   - Should render summary as <p class="fm-summary">
   - Should escape HTML in summary
   - Should skip if no summary

5. **Layout**
   - Should add hr divider if any content rendered
   - Should join sections with newlines
   - Should return empty string for empty frontmatter

6. **HTML Escaping**
   - Should escape all special characters
   - Should escape across all fields

**Complexity:** Medium
**Dependencies:** None
**Mocking:** None needed

---

### 5.4 Handler Tests

#### 5.4.1 CodeBlockHandler Tests

**File:** `tests/unit/parsers/markdown/handlers/CodeBlockHandler.test.ts`

**Test Scenarios:**

1. **canHandle()**
   - Should return true for ``` line
   - Should return true when in code_block state
   - Should return false for normal lines in normal state

2. **handle() - Starting Code Block**
   - Should set state to code_block on ```
   - Should flush any open list before starting
   - Should return true

3. **handle() - Inside Code Block**
   - Should accumulate lines via context.addCodeLine()
   - Should preserve original spacing
   - Should not process markdown inside code
   - Should return true

4. **handle() - Ending Code Block**
   - Should flush code block on closing ```
   - Should set state back to normal
   - Should return true

5. **Edge Cases**
   - Should handle code block at start of document
   - Should handle code block at end of document
   - Should handle empty code blocks
   - Should handle unclosed code blocks (relies on parser's flushRemainingState)

**Complexity:** Low
**Dependencies:** ParseContext (can use real instance)
**Mocking:** Mock ParseContext for spying on method calls

---

#### 5.4.2 HeaderHandler Tests

**File:** `tests/unit/parsers/markdown/handlers/HeaderHandler.test.ts`

**Test Scenarios:**

1. **canHandle()**
   - Should return true for lines starting with #
   - Should return false when in code_block state
   - Should return false for normal lines

2. **handle() - Valid Headers**
   - Should handle # (h1)
   - Should handle ## through ###### (h2-h6)
   - Should extract content after #
   - Should render inline markdown in content
   - Should flush any open list before rendering
   - Should add HTML via context.addHtml()
   - Should return true

3. **handle() - Invalid Headers**
   - Should return false for # without space
   - Should return false for ####### (7+ hashes)

4. **Edge Cases**
   - Should trim whitespace
   - Should handle headers with inline code
   - Should handle headers with links
   - Should handle empty header content (if valid)

**Complexity:** Low
**Dependencies:** ParseContext, InlineRenderer (can use real instances)
**Mocking:** Mock ParseContext to verify addHtml() calls; spy on InlineRenderer.render()

---

#### 5.4.3 ListHandler Tests

**File:** `tests/unit/parsers/markdown/handlers/ListHandler.test.ts`

**Test Scenarios:**

1. **canHandle()**
   - Should return true for - prefix
   - Should return true for \* prefix
   - Should return true for digit. prefix (e.g., 1. )
   - Should return false when in code_block state
   - Should return true for continuing list items when in list state
   - Should return false for non-list lines

2. **handle() - Unordered Lists**
   - Should detect - and \* markers
   - Should set state to list
   - Should set listType to 'ul'
   - Should accumulate items via context.addListItem()
   - Should render inline markdown in items
   - Should return true

3. **handle() - Ordered Lists**
   - Should detect 1. 2. 3. markers
   - Should set state to list
   - Should set listType to 'ol'
   - Should accumulate items
   - Should return true

4. **handle() - List Type Switching**
   - Should flush ul before starting ol
   - Should flush ol before starting ul
   - Should create separate lists for different types

5. **handle() - List Termination**
   - Should flush list on empty line
   - Should set state back to normal
   - Should return false to let other handlers process line

6. **Edge Cases**
   - Should handle lists at start of document
   - Should handle single-item lists
   - Should handle multi-line list content (not currently supported?)
   - Should handle items with inline code and links

**Complexity:** Medium
**Dependencies:** ParseContext, InlineRenderer
**Mocking:** Mock ParseContext to verify state management and item accumulation

---

#### 5.4.4 ParagraphHandler Tests

**File:** `tests/unit/parsers/markdown/handlers/ParagraphHandler.test.ts`

**Test Scenarios:**

1. **canHandle()**
   - Should return true for non-empty lines in normal state
   - Should return false for empty lines
   - Should return false when not in normal state

2. **handle()**
   - Should wrap content in <p> tags
   - Should render inline markdown
   - Should add HTML via context.addHtml()
   - Should return true

3. **Edge Cases**
   - Should handle paragraphs with all inline types
   - Should handle long paragraphs
   - Should handle paragraphs with special characters

**Complexity:** Very Low
**Dependencies:** ParseContext, InlineRenderer
**Mocking:** Mock ParseContext to verify addHtml(); spy on InlineRenderer

---

#### 5.4.5 EmptyLineHandler Tests

**File:** `tests/unit/parsers/markdown/handlers/EmptyLineHandler.test.ts`

**Test Scenarios:**

1. **canHandle()**
   - Should return true for empty string
   - Should return true for whitespace-only lines
   - Should return false when in code_block state
   - Should return false for non-empty lines

2. **handle() - In List State**
   - Should flush list
   - Should set state to normal
   - Should return true

3. **handle() - In Normal State**
   - Should add <br> tag
   - Should return true

4. **handle() - Edge Cases**
   - Should handle tabs and spaces
   - Should not add <br> when in list state

**Complexity:** Very Low
**Dependencies:** ParseContext
**Mocking:** Mock ParseContext to verify flushList() and addHtml()

---

### 5.5 MarkdownParser Tests

**File:** `tests/unit/parsers/markdown/MarkdownParser.test.ts`

**Test Scenarios:**

1. **Handler Chain Initialization**
   - Should initialize handlers in correct order
   - Should include all 5 handlers

2. **parse() - Basic Elements**
   - Should parse headers
   - Should parse paragraphs
   - Should parse code blocks
   - Should parse unordered lists
   - Should parse ordered lists

3. **parse() - Mixed Content**
   - Should parse document with multiple element types
   - Should handle transitions between element types
   - Should maintain proper state across transitions

4. **parse() - State Flushing**
   - Should flush remaining list at end
   - Should flush remaining code block at end
   - Should handle document ending in various states

5. **Handler Priority**
   - Should prioritize CodeBlockHandler (headers in code blocks)
   - Should prioritize HeaderHandler over ListHandler
   - Should fall through to ParagraphHandler for unmatched lines

6. **Edge Cases**
   - Should handle empty document
   - Should handle single-line document
   - Should handle document with only whitespace
   - Should handle very large documents (performance test)

7. **Integration with Real Content**
   - Should correctly parse actual blog post markdown
   - Should handle all patterns from content files

**Complexity:** Medium
**Dependencies:** All handlers, ParseContext (use real instances for integration)
**Mocking:** Can test with real dependencies; optionally mock handlers to test chain logic

---

### 5.6 MarkdownRenderer Tests

**File:** `tests/unit/parsers/markdown/MarkdownRenderer.test.ts`

**Test Scenarios:**

1. **render() - Basic Functionality**
   - Should render markdown without frontmatter
   - Should wrap output in markdown-output div
   - Should delegate to MarkdownParser

2. **render() - With Frontmatter**
   - Should extract and render frontmatter when flag is true
   - Should not render frontmatter when flag is false
   - Should combine frontmatter HTML and content HTML
   - Should handle content without frontmatter gracefully

3. **render() - Integration**
   - Should produce correct HTML for complex documents
   - Should handle all markdown features together

4. **Edge Cases**
   - Should handle empty markdown
   - Should handle markdown with only frontmatter
   - Should handle markdown with only content

**Complexity:** Low
**Dependencies:** MarkdownParser, FrontmatterParser (can use real instances)
**Mocking:** Optional - can spy on parser methods to verify integration

---

### 5.7 Render Command Tests

**File:** `tests/unit/commands/core/render.test.ts`

**Test Scenarios:**

1. **File Input**
   - Should read file from filesystem
   - Should detect frontmatter in file content
   - Should render and return HTML
   - Should set html: true in result

2. **Stdin Input**
   - Should accept piped content
   - Should prefer stdin over file arg
   - Should detect frontmatter in stdin
   - Should render and return HTML

3. **Error Handling**
   - Should return error for missing file
   - Should return error for directory path
   - Should return error with no input (show usage)
   - Should handle filesystem errors

4. **Frontmatter Auto-Detection**
   - Should detect frontmatter starting with ---
   - Should pass correct flag to MarkdownRenderer

**Complexity:** Medium
**Dependencies:** IFileSystem, MarkdownRenderer
**Mocking:** Mock IFileSystem for all file operations; spy on MarkdownRenderer.render()

---

## 6. TESTING STRATEGY & BEST PRACTICES

### Test Organization

```
tests/
  unit/
    parsers/
      markdown/
        ParseContext.test.ts
        InlineRenderer.test.ts
        FrontmatterParser.test.ts
        MarkdownParser.test.ts
        MarkdownRenderer.test.ts
        handlers/
          CodeBlockHandler.test.ts
          HeaderHandler.test.ts
          ListHandler.test.ts
          ParagraphHandler.test.ts
          EmptyLineHandler.test.ts
    commands/
      core/
        render.test.ts
```

### Mocking Strategy

1. **Pure Functions/Static Methods**: No mocking needed
   - InlineRenderer.render()
   - FrontmatterParser.parse()
   - FrontmatterParser.renderFrontmatter()

2. **Stateful Objects**: Use real instances or mock selectively
   - ParseContext: Can use real instance, mock to spy on method calls
   - Handlers: Use real instances for integration tests

3. **External Dependencies**: Always mock
   - IFileSystem in render command tests
   - Use `vi.fn()` for method mocking
   - Use `vi.spyOn()` for spying on real methods

### Test Data Management

Create fixture files:

````typescript
// tests/fixtures/markdown-samples.ts
export const MARKDOWN_SAMPLES = {
  simpleHeader: '# Hello World',
  codeBlock: '```\nconst x = 1;\n```',
  list: '- Item 1\n- Item 2',
  complex: `# Title

Paragraph with **bold**.

- List item
- Another item

\`\`\`
code here
\`\`\``,

  withFrontmatter: `---
title: "Test"
tags: ["a", "b"]
---

Content here`,

  htmlInjection: '<script>alert("xss")</script>',
  specialChars: '& < > " \' are escaped',
};
````

### Coverage Goals

- **Line Coverage**: 90%+ (already 80% threshold in config)
- **Branch Coverage**: 85%+
- **Function Coverage**: 95%+
- **Statement Coverage**: 90%+

### Test Execution Order

1. **Unit tests (isolation)**:
   - ParseContext
   - InlineRenderer
   - Individual Handlers
   - FrontmatterParser

2. **Integration tests**:
   - MarkdownParser (uses all handlers)
   - MarkdownRenderer (uses parser + frontmatter)
   - Render command (uses renderer + filesystem)

3. **E2E/Acceptance tests** (future):
   - Full rendering of actual blog posts
   - Comparison with expected HTML output

---

## 7. POTENTIAL CHALLENGES & GOTCHAS

### 1. HTML Escaping Duplication

**Issue:** `escapeHtml()` is duplicated in 3 files (ParseContext, InlineRenderer, FrontmatterParser)

**Impact on Testing:** Each implementation should be tested independently, or extract to shared utility

**Recommendation:** Create `src/utils/markdown/htmlEscape.ts` and update all references

---

### 2. Regex Edge Cases in InlineRenderer

**Challenge:** Overlapping or nested formatting patterns

**Examples:**

- `**bold *both** italic*` - Where does bold end?
- `***text***` - Triple asterisks
- `[link **with bold**](url)` - Formatting inside links

**Testing Strategy:** Create comprehensive edge case test suite with known expected outputs

---

### 3. State Transitions in Handlers

**Challenge:** Handlers modify shared state (ParseContext), order matters

**Testing Strategy:**

- Test handlers individually with controlled context
- Test MarkdownParser with sequences that exercise all transitions
- Create state transition diagram for documentation

**Known Transitions:**

- normal → code_block (on ```)
- code_block → normal (on closing ```)
- normal → list (on list marker)
- list → normal (on empty line)
- list → list (on different list type, flushes first)

---

### 4. Unclosed Blocks

**Challenge:** What happens if code block or list isn't closed?

**Current Behavior:** MarkdownParser calls `flushRemainingState()` which closes open lists and code blocks

**Testing Strategy:** Test documents ending in various states

---

### 5. Handler Priority Testing

**Challenge:** Ensuring handlers are called in correct order

**Example:**

```markdown

```

# This should be code, not a header

```

```

**Testing Strategy:**

- Mock handlers to verify call order
- Test specific ambiguous cases (header-like line in code block)

---

### 6. Performance with Large Documents

**Challenge:** Line-by-line parsing may be slow for very large files

**Testing Strategy:**

- Create performance benchmark tests
- Test with documents of varying sizes (100, 1000, 10000 lines)
- Set reasonable timeout thresholds

---

### 7. Unicode and Special Characters

**Challenge:** Handling international characters, emoji, etc.

**Testing Strategy:**

- Test with unicode content
- Test with emoji in headers, lists, code
- Ensure HTML escaping doesn't break unicode

---

### 8. Inline Markdown in Different Contexts

**Challenge:** InlineRenderer is called by multiple handlers (Header, List, Paragraph)

**Testing Strategy:**

- Test inline rendering in isolation
- Test inline rendering in each handler context
- Ensure consistent behavior across all uses

---

## 8. RECOMMENDED TEST DATA FIXTURES

### Create Fixture File Structure

```
tests/
  fixtures/
    markdown/
      basic-elements.md          # Headers, paragraphs, lists, code
      complex-document.md        # All features combined
      frontmatter-samples.md     # Various frontmatter patterns
      edge-cases.md              # Malformed, unclosed, overlapping
      html-injection.md          # XSS attempts, special chars
      unicode.md                 # International chars, emoji
      real-world/                # Copy actual blog posts
        ai-production-lessons.md
        distributed-systems.md
        about.md
    expected-output/
      basic-elements.html
      complex-document.html
      # ...matching HTML for each markdown file
```

### Fixture Loading Utility

```typescript
// tests/utils/loadFixture.ts
import { readFileSync } from 'fs';
import { join } from 'path';

export function loadMarkdownFixture(name: string): string {
  const path = join(__dirname, '../fixtures/markdown', name);
  return readFileSync(path, 'utf-8');
}

export function loadExpectedHtml(name: string): string {
  const path = join(__dirname, '../fixtures/expected-output', name);
  return readFileSync(path, 'utf-8');
}
```

---

## 9. SUMMARY & RECOMMENDATIONS

### Implementation Progress

- [x] **ParseContext.test.ts** - 27 tests, 100% coverage ✅
- [x] **InlineRenderer.test.ts** - 45 tests, 100% coverage ✅
- [x] **FrontmatterParser.test.ts** - 43 tests, 100% coverage ✅
- [x] **htmlEscape.ts** - Shared utility created, 100% coverage ✅
- [x] **Test fixture infrastructure** - Created with loader utilities ✅
- [ ] **Individual Handler Tests** - Pending
- [ ] **MarkdownParser.test.ts** - Pending
- [ ] **MarkdownRenderer.test.ts** - Pending
- [ ] **render.test.ts** - Pending

### Test File Priority (Implement in this order)

1. **ParseContext.test.ts** - Foundation, no dependencies ✅
2. **InlineRenderer.test.ts** - Pure function, no dependencies ✅
3. **FrontmatterParser.test.ts** - Independent module ✅
4. **Individual Handler Tests** - Can be parallelized:
   - EmptyLineHandler.test.ts (simplest)
   - ParagraphHandler.test.ts
   - HeaderHandler.test.ts
   - CodeBlockHandler.test.ts
   - ListHandler.test.ts (most complex)
5. **MarkdownParser.test.ts** - Integration of handlers
6. **MarkdownRenderer.test.ts** - Top-level integration
7. **render.test.ts** - Command integration

### Estimated Effort

| Test File                 | Complexity | Test Count  | Effort (hrs) |
| ------------------------- | ---------- | ----------- | ------------ |
| ParseContext.test.ts      | Low        | 20-25       | 2            |
| InlineRenderer.test.ts    | Medium     | 25-30       | 3            |
| FrontmatterParser.test.ts | Medium     | 30-35       | 3            |
| CodeBlockHandler.test.ts  | Low        | 12-15       | 1.5          |
| HeaderHandler.test.ts     | Low        | 12-15       | 1.5          |
| ListHandler.test.ts       | Medium     | 20-25       | 2.5          |
| ParagraphHandler.test.ts  | Low        | 8-10        | 1            |
| EmptyLineHandler.test.ts  | Low        | 8-10        | 1            |
| MarkdownParser.test.ts    | Medium     | 20-25       | 3            |
| MarkdownRenderer.test.ts  | Low        | 12-15       | 1.5          |
| render.test.ts            | Medium     | 15-20       | 2            |
| **TOTAL**                 |            | **182-225** | **22 hrs**   |

### Key Success Metrics

- **Coverage**: >90% line coverage for all markdown modules
- **Edge Cases**: All identified edge cases have explicit tests
- **Integration**: Real blog posts render correctly
- **Performance**: Parsing 1000-line document in <100ms
- **Security**: All HTML injection attempts are properly escaped

### Next Steps

1. **Create fixture files** with sample markdown content
2. **Start with ParseContext tests** (foundation)
3. **Implement handler tests** (parallel work possible)
4. **Add integration tests** (MarkdownParser, MarkdownRenderer)
5. **Test render command** with mocked filesystem
6. **Run coverage report** and address gaps
7. **Add performance benchmarks** (optional, future)

This comprehensive test suite will ensure the refactored Markdown Rendering System is robust, maintainable, and production-ready!
