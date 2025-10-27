     │ Blog Refactoring & Piping Implementation Plan                                                                                          │
     │                                                                                                                                        │
     │ Part 1: Blog Refactoring with Markdown + YAML Frontmatter                                                                              │
     │ - [x] Convert blog to individual markdown files with YAML frontmatter                                                                  │
     │ - [x] Create BlogParser utility to parse frontmatter and markdown content                                                              │
     │ - [x] Add /home/darin/blog/ directory to virtual FileSystem                                                                            │
     │ - [x] Create individual blog post files in /home/darin/blog/                                                                           │
     │ - [x] Refactor blog command to read from FileSystem instead of static data                                                             │
     │ - [x] Support tag filtering in blog command (blog --tag AI/ML)                                                                         │
     │ - [x] Update blog command to work with cat for raw markdown access                                                                     │
     │                                                                                                                                        │
     │                                                                                                                                        │
     │ File Format Decision: Markdown with YAML frontmatter                                                                                   │
     │ - Standard blog format (like Jekyll/Hugo)                                                                                              │
     │ - YAML metadata at top, markdown content below                                                                                         │
     │ - Example structure:                                                                                                                   │
     │ ---                                                                                                                                    │
     │ title: "Post Title"                                                                                                                    │
     │ date: "2024-09-15"                                                                                                                     │
     │ tags: ["AI/ML", "Production"]                                                                                                          │
     │ summary: "Brief summary..."                                                                                                            │
     │ ---                                                                                                                                    │
     │                                                                                                                                        │
     │ # Main Content                                                                                                                         │
     │                                                                                                                                        │
     │ Markdown content here...                                                                                                               │
     │                                                                                                                                        │
     │ Implementation Steps:                                                                                                                  │
     │                                                                                                                                        │
     │ 1. Create blog directory structure (src/blog/)                                                                                         │
     │   - Individual markdown files: 2024-09-15-ai-production-lessons.md                                                                     │
     │   - Each file is self-contained with frontmatter + content                                                                             │
     │ 2. Add blog files to virtual FileSystem                                                                                                │
     │   - Create /home/darin/blog/ directory (user is logged in as darin)                                                                    │
     │   - Keep /home/guest/ intact for guest user experience                                                                                 │
     │   - Add each blog post as a file that cat can read                                                                                     │
     │   - Files return raw markdown content                                                                                                  │
     │ 3. Create BlogParser utility (src/utils/BlogParser.ts)                                                                                 │
     │   - Parse YAML frontmatter (extract metadata)                                                                                          │
     │   - Extract markdown content                                                                                                           │
     │   - Return structured BlogPost object                                                                                                  │
     │ 4. Refactor blog command (src/commands/blog.ts)                                                                                        │
     │   - List mode: scan blog directory, parse frontmatter, show summaries                                                                  │
     │   - Read mode: use cat to read raw markdown (users can pipe to render)                                                                 │
     │   - Support tag filtering: blog --tag AI/ML                                                                                            │
     │                                                                                                                                        │
     │ Part 2: Markdown Rendering Command                                                                                                     │
     │ - [x] Create MarkdownRenderer utility to convert markdown to HTML                                                                      │
     │ - [x] Implement render command to format markdown for terminal display                                                                 │
     │ - [x] Support headers (H1, H2, H3) with different sizes/styles                                                                         │
     │ - [x] Support ordered and unordered lists with proper indentation                                                                      │
     │ - [x] Support code blocks with distinct styling (potential syntax highlighting)                                                        │
     │ - [x] Support inline formatting (bold, italic, inline code, links)                                                                     │
     │ - [x] Add CSS styles for markdown rendering in terminal.css                                                                            │
     │ - [x] Update TerminalOutput to handle HTML content rendering                                                                           │
     │ - [x] Add render command to /usr/bin                                                                                                   │
     │                                                                                                                                        │
     │ Command Name Decision: render                                                                                                          │
     │                                                                                                                                        │
     │ Rendering Approach: CSS-based (not ANSI codes)                                                                                         │
     │                                                                                                                                        │
     │ Since we have CSS available, we can leverage the browser's rendering capabilities:                                                     │
     │                                                                                                                                        │
     │ Create MarkdownRenderer utility (src/utils/MarkdownRenderer.ts)                                                                        │
     │ - Parse markdown and convert to HTML                                                                                                   │
     │ - Wrap output in styled HTML elements                                                                                                  │
     │ - Return HTML string that terminal will render                                                                                         │
     │                                                                                                                                        │
     │ TerminalOutput Enhancement:                                                                                                            │
     │ - Detect HTML content in output (special marker or flag)                                                                               │
     │ - Render HTML content using innerHTML (sanitized)                                                                                      │
     │ - Apply CSS styles for markdown elements                                                                                               │
     │                                                                                                                                        │
     │ CSS Styling (src/styles/terminal.css):                                                                                                 │
     │ /* Markdown rendering styles */                                                                                                        │
     │ .markdown-output h1 { font-size: 24px; font-weight: bold; margin: 16px 0 8px; }                                                        │
     │ .markdown-output h2 { font-size: 20px; font-weight: bold; margin: 14px 0 7px; }                                                        │
     │ .markdown-output h3 { font-size: 18px; font-weight: bold; margin: 12px 0 6px; }                                                        │
     │ .markdown-output ul { margin-left: 20px; }                                                                                             │
     │ .markdown-output ol { margin-left: 20px; }                                                                                             │
     │ .markdown-output code { background: rgba(57, 255, 20, 0.1); padding: 2px 4px; }                                                        │
     │ .markdown-output pre { background: rgba(0, 0, 0, 0.3); padding: 12px; margin: 8px 0; }                                                 │
     │ .markdown-output strong { font-weight: bold; color: var(--terminal-accent); }                                                          │
     │ .markdown-output em { font-style: italic; opacity: 0.9; }                                                                              │
     │                                                                                                                                        │
     │ Benefits of CSS approach:                                                                                                              │
     │ - More powerful formatting (actual font sizes, colors, spacing)                                                                        │
     │ - Better list rendering with proper bullets/numbers                                                                                    │
     │ - Code blocks with syntax highlighting (using highlight.js or similar)                                                                 │
     │ - Links could be clickable                                                                                                             │
     │ - Easier to maintain than ANSI escape codes                                                                                            │
     │                                                                                                                                        │
     │ Implementation:                                                                                                                        │
     │ 1. Use a lightweight markdown parser (like marked.js or write custom)                                                                  │
     │ 2. Convert markdown → HTML with custom CSS classes                                                                                     │
     │ 3. TerminalOutput renders HTML when flagged as html: true                                                                              │
     │                                                                                                                                        │
     │ Part 3: Command Piping                                                                                                                 │
     │ - [x] Enhance CommandResult interface to support raw and html flags                                                                    │
     │ - [x] Create PipelineParser utility to parse pipe (|) syntax                                                                           │
     │ - [x] Update CommandDispatcher with dispatchPipeline() method                                                                          │
     │ - [x] Update Command interface to accept optional stdin parameter                                                                      │
     │ - [x] Integrate piping detection in Terminal component                                                                                 │
     │ - [x] Update cat command to set raw: true flag when outputting                                                                         │
     │ - [x] Ensure render command accepts stdin for piped input                                                                              │
     │ - [x] Test pipeline: cat blog/2024-09-15-ai-production.md | render                                                                     │
     │ - [x] Handle error cases in pipeline (command not found, empty output, etc.)                                                           │
     │                                                                                                                                        │
     │ Architecture:                                                                                                                          │
     │                                                                                                                                        │
     │ 1. Enhance CommandResult interface (src/commands/Command.ts)                                                                           │
     │ export interface CommandResult {                                                                                                       │
     │   output: string;                                                                                                                      │
     │   error?: boolean;                                                                                                                     │
     │   raw?: boolean;      // Flag: output is raw text for piping                                                                           │
     │   html?: boolean;     // Flag: output is HTML to be rendered                                                                           │
     │ }                                                                                                                                      │
     │ 2. Create PipelineParser utility (src/utils/PipelineParser.ts)                                                                         │
     │   - Parse input string for | characters (outside quotes)                                                                               │
     │   - Split into command segments                                                                                                        │
     │   - Handle quoted arguments that contain pipes                                                                                         │
     │   - Example: "cat blog/post.md | render" → ["cat blog/post.md", "render"]                                                              │
     │ 3. Update CommandDispatcher (src/utils/CommandDispatcher.ts)                                                                           │
     │   - Add dispatchPipeline(input: string) method                                                                                         │
     │   - Execute commands sequentially                                                                                                      │
     │   - Pass output of cmd1 as stdin/input to cmd2                                                                                         │
     │   - Preserve flags (raw, html) through pipeline                                                                                        │
     │ 4. Piping flow:                                                                                                                        │
     │ Input: "cat blog/2024-09-15-ai-production.md | render"                                                                                 │
     │                                                                                                                                        │
     │ 1. PipelineParser splits: ["cat blog/2024-09-15-ai-production.md", "render"]                                                           │
     │ 2. Execute cat → returns {output: "---\ntitle...", raw: true}                                                                          │
     │ 3. Execute render with previous output as stdin                                                                                        │
     │ 4. render processes markdown → {output: "<div>...</div>", html: true}                                                                  │
     │ 5. Terminal renders HTML with CSS styling                                                                                              │
     │ 5. Update Command interface (optional enhancement):                                                                                    │
     │ export interface Command {                                                                                                             │
     │   name: string;                                                                                                                        │
     │   description: string;                                                                                                                 │
     │   aliases?: string[];                                                                                                                  │
     │   execute: (args: string[], stdin?: string) => CommandResult | Promise<CommandResult>;                                                 │
     │   //                       ^^^^^^^^ new parameter for piped input                                                                      │
     │ }                                                                                                                                      │
     │ 6. Update Terminal (src/components/Terminal.ts)                                                                                        │
     │   - Check for pipe character before dispatching                                                                                        │
     │   - Route to dispatchPipeline() if pipes detected                                                                                      │
     │   - Otherwise use standard dispatch()                                                                                                  │
     │                                                                                                                                        │
     │ Commands that support piping:                                                                                                          │
     │ - cat - outputs file content (can be piped, sets raw: true)                                                                            │
     │ - render - accepts stdin, formats markdown, outputs HTML                                                                               │
     │ - Future: grep, head, tail, etc.                                                                                                       │
     │                                                                                                                                        │
     │ Key Advantages of CSS-based Rendering:                                                                                                 │
     │                                                                                                                                        │
     │ 1. Better Typography: Real font sizing, not just ANSI bold                                                                             │
     │ 2. Rich Formatting: Background colors, borders, spacing, margins                                                                       │
     │ 3. Syntax Highlighting: Can use highlight.js for code blocks                                                                           │
     │ 4. Maintainability: CSS is easier to update than ANSI codes                                                                            │
     │ 5. Clickable Elements: Links in markdown could be made clickable                                                                       │
     │ 6. Consistency: Uses the same styling system as the terminal                                                                           │
     │                                                                                                                                        │
