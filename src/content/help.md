# Terminal Help

Welcome to my interactive terminal! This is a Unix-like command-line interface where you can explore my work and read my blog.

## Getting Help

- **`help`** - Show this help message
- **`help <command>`** - Show detailed help for a specific command
- **`<command> --help`** - Show detailed help for any command

**Example:** `help ls` or `ls --help`

## Available Commands

### Content & Navigation

- **`about`** - Learn about my background and expertise
- **`portfolio`** - View my projects and accomplishments
- **`blog`** - Read my blog posts and articles
- **`contact`** - Get in touch with me

### File System

- **`ls`** - List directory contents
- **`cd`** - Change directory
- **`pwd`** - Print working directory
- **`cat`** - Display file contents
- **`tree`** - Show directory structure
- **`render`** - Render markdown files

### Core Utilities

- **`echo`** - Display text
- **`date`** - Show current date/time
- **`clear`** - Clear the screen
- **`history`** - Show command history
- **`alias`** - Create command shortcuts
- **`whoami`** - Display current user

### Novelty

- **`figlet`** - ASCII art text banners
- **`ddate`** - Discordian calendar date

## Quick Start

Try these commands to explore:

```
about           # Learn about me
portfolio       # See my work
blog            # Read my posts
tree            # Explore the file structure
ls ~            # List home directory
```

## Advanced Features

**Command Piping:** Chain commands with `|`

```
cat ~/blog/post.md | render
echo "Hello" | figlet
```

**Navigation:** Use arrow keys for command history, Tab for auto-complete

**Aliases:** Create shortcuts with `alias ll='ls -la'`

---

**Tip:** For detailed help on any command, use `<command> --help` or `help <command>`
