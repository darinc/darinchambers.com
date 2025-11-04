# Terminal Help

Welcome to the interactive terminal experience! This terminal emulates a Unix-like command-line interface.

## Core Commands

### `help`
Display this help message

### `clear`
Clear the terminal screen

### `history`
Display command history with numbered entries

### `date`
Display current date and time

### `echo`
Display a line of text. Supports `-e` flag for escape sequences (`\n`, `\t`, `\\`)

### `whoami`
Display current username

### `alias`
Create or display command aliases
- Usage: `alias` (list all aliases)
- Usage: `alias name='command'` (create alias)

### `unalias`
Remove command aliases
- Usage: `unalias <name>`

## Content Commands

### `about`
Learn about my background and expertise

### `portfolio`
View my projects and accomplishments
- Usage: `portfolio` (list all projects)
- Usage: `portfolio <project-id>` (view project details)

### `blog`
Read my blog posts
- Usage: `blog` (list all posts)
- Usage: `blog <post-id>` (read specific post)
- Usage: `blog --tag <tag>` (filter by tag)

### `contact`
Get in touch with me - email, LinkedIn, GitHub, and availability

### `skills`
See my technical skills organized by category

## File System Commands

### `ls`
List directory contents
- Usage: `ls [path]`

### `cd`
Change directory
- Usage: `cd <path>`
- Special: `cd ~` (go to home directory)
- Special: `cd ..` (go up one directory)

### `pwd`
Print working directory

### `cat`
Display file contents
- Usage: `cat <file>`

### `tree`
Display directory tree structure
- Usage: `tree [path]`
- Usage: `tree -L <depth>` (limit depth)

### `render`
Render markdown files with beautiful formatting
- Usage: `render <file>`
- Example: `render ~/blog/post.md`

## Novelty Commands

### `ddate`
Display date in Discordian calendar format
- Usage: `ddate` (current date)
- Usage: `ddate "YYYY-MM-DD"` (specific date)
- Usage: `ddate --help` (show help)
- The Discordian calendar has 5 seasons: Chaos, Discord, Confusion, Bureaucracy, The Aftermath
- Features special days like St. Tib's Day (Feb 29) and Apostle Days

### `figlet`
Convert text to ASCII art banners
- Usage: `figlet "Hello"` (default font)
- Usage: `figlet -f banner "Text"` (use banner font)
- Usage: `figlet -c "Centered"` (center output)
- Usage: `echo "Hello" | figlet` (from stdin)
- Available fonts: standard, slant, banner, small

## Advanced Features

### Command Piping

Chain commands together using the pipe operator (`|`):

```
cat ~/blog/post.md | render
echo "Hello" | cat
```

### Command History Navigation

- **Up Arrow** - Previous command
- **Down Arrow** - Next command
- **Tab** - Auto-complete commands

### Aliases

Create shortcuts for frequently used commands:

```
alias ll='ls -la'
alias blog-ai='blog --tag ai'
```

## Getting Started

Try these commands to explore:

1. `about` - Learn more about me
2. `portfolio` - See my work
3. `blog` - Read my blog posts
4. `tree` - Explore the directory structure
5. `ls ~` - List files in home directory

---

**Pro Tip:** Use the navigation links at the top for quick access to main sections!
