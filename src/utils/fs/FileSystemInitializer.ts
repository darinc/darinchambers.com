import type { FileSystemNode } from './types';

export class FileSystemInitializer {
  private static createDirectoryNode(name: string): FileSystemNode {
    const isHidden = name.startsWith('.');
    return {
      name,
      type: 'directory',
      children: new Map(),
      permissions: 'drwxr-xr-x',
      owner: 'darin',
      size: 4096,
      modifiedTime: new Date(),
      isHidden,
    };
  }

  private static createFileNode(name: string, content: string): FileSystemNode {
    const isHidden = name.startsWith('.');
    return {
      name,
      type: 'file',
      content,
      permissions: '-rw-r--r--',
      owner: 'darin',
      size: content.length,
      modifiedTime: new Date(),
      isHidden,
    };
  }

  /**
   * Dynamically load all blog markdown files using Vite's import.meta.glob
   */
  private static loadBlogFiles(): Map<string, FileSystemNode> {
    const blogFiles: Record<string, { default: string }> = import.meta.glob(
      '../../content/blog/*.md',
      {
        query: '?raw',
        eager: true,
      }
    );

    const blogNodes = new Map<string, FileSystemNode>();
    for (const [key, module] of Object.entries(blogFiles)) {
      const filename = key.split('/').pop()!;
      const content = module.default;
      blogNodes.set(filename, this.createFileNode(filename, content));
    }
    return blogNodes;
  }

  /**
   * Dynamically load all portfolio markdown files using Vite's import.meta.glob
   */
  private static loadPortfolioFiles(): Map<string, FileSystemNode> {
    const portfolioFiles: Record<string, { default: string }> = import.meta.glob(
      '../../content/portfolio/*.md',
      {
        query: '?raw',
        eager: true,
      }
    );

    const portfolioNodes = new Map<string, FileSystemNode>();
    for (const [key, module] of Object.entries(portfolioFiles)) {
      const filename = key.split('/').pop()!;
      const content = module.default;
      portfolioNodes.set(filename, this.createFileNode(filename, content));
    }
    return portfolioNodes;
  }

  /**
   * Dynamically load all post markdown files using Vite's import.meta.glob
   */
  private static loadPostFiles(): Map<string, FileSystemNode> {
    const postFiles: Record<string, { default: string }> = import.meta.glob(
      '../../content/posts/*.md',
      {
        query: '?raw',
        eager: true,
      }
    );

    const postNodes = new Map<string, FileSystemNode>();
    for (const [key, module] of Object.entries(postFiles)) {
      const filename = key.split('/').pop()!;
      const content = module.default;
      postNodes.set(filename, this.createFileNode(filename, content));
    }
    return postNodes;
  }

  /**
   * Dynamically load root content markdown files using Vite's import.meta.glob
   */
  private static loadContentFiles(): Map<string, FileSystemNode> {
    const contentFiles: Record<string, { default: string }> = import.meta.glob(
      '../../content/*.md',
      {
        query: '?raw',
        eager: true,
      }
    );

    const contentNodes = new Map<string, FileSystemNode>();
    for (const [key, module] of Object.entries(contentFiles)) {
      const filename = key.split('/').pop()!;
      const content = module.default;
      contentNodes.set(filename, this.createFileNode(filename, content));
    }
    return contentNodes;
  }

  /**
   * Load the CHANGELOG.md file from the project root using Vite's import.meta.glob
   */
  private static loadChangelogFile(): string {
    const changelogFiles: Record<string, { default: string }> = import.meta.glob(
      '../../../CHANGELOG.md',
      {
        query: '?raw',
        eager: true,
      }
    );

    // Get the first (and only) entry
    const entries = Object.values(changelogFiles);
    if (entries.length > 0) {
      return entries[0].default;
    }
    return '';
  }

  public static createDefaultStructure(): FileSystemNode {
    const root = this.createDirectoryNode('');
    const rootChildren = root.children!;

    // /root directory (restricted)
    const rootDir = this.createDirectoryNode('root');
    rootDir.permissions = 'drwx------';
    rootDir.owner = 'root';
    rootChildren.set('root', rootDir);

    rootDir.children!.set(
      '.bashrc',
      this.createFileNode(
        '.bashrc',
        `# /root/.bashrc
# TODO: fix the thing
# TODO: also fix the other thing
# TODO: figure out what "the thing" was

export PS1='\\u@\\h:\\w# '
alias please='sudo'
alias yolo='rm -rf / --no-preserve-root'  # DO NOT RUN
alias coffee='echo "brewing..."'

# Note to self: stop SSHing into prod at 2am
`
      )
    );
    rootDir.children!.set(
      '.bash_history',
      this.createFileNode(
        '.bash_history',
        `ls
cd /var/log
tail -f syslog
sudo systemctl restart nginx
sudo systemctl restart nginx
sudo systemctl restart nginx
why-is-this-not-working
man patience
echo "I should go to bed"
uptime
coffee
echo "one more fix..."
git push --force origin main
git push --force origin main
git reflog
echo "thank god for reflog"
history -c
`
      )
    );
    rootDir.children!.set(
      'notes.txt',
      this.createFileNode(
        'notes.txt',
        `Admin Notes
===========
1. The portfolio site runs on vibes and vanilla TypeScript
2. No frameworks were harmed in the making of this website
3. If you're reading this, you figured out the password
   (it was on the sticky note, wasn't it?)
4. Congratulations, you have root access to a website
   that runs entirely in your browser.
5. Remember: with great power comes great responsibility.
   Also, there's nothing destructive you can actually do here.
   But it's fun to pretend.
- Darin
`
      )
    );
    // Set root ownership on /root files
    for (const node of rootDir.children!.values()) {
      node.owner = 'root';
    }

    // /home directory
    const home = this.createDirectoryNode('home');
    rootChildren.set('home', home);

    // /home/guest directory
    const guest = this.createDirectoryNode('guest');
    home.children!.set('guest', guest);
    guest.children!.set(
      'README.txt',
      this.createFileNode(
        'README.txt',
        `Welcome to darinchambers.com!

This is a terminal-inspired personal website showcasing expertise in AI and software engineering.

Type 'help' to see available commands.
Type 'cd /home/darin' to explore more.
`
      )
    );

    // /home/darin directory with easter eggs
    const darin = this.createDirectoryNode('darin');
    home.children!.set('darin', darin);
    darin.children!.set(
      '.post-it',
      this.createFileNode(
        '.post-it',
        `=============================
    STICKY NOTE - DO NOT LOSE
=============================

WiFi: CoffeeShop5G
Netflix: darin@email.com / password123
Server root: hunter2
Spotify: nice try
AWS Console: ... I should really use a password manager

Remember: Delete this file before anyone finds it.
`
      )
    );
    darin.children!.set(
      '.secret',
      this.createFileNode(
        '.secret',
        `You found a secret! 🎉

"The best way to predict the future is to invent it." - Alan Kay

Keep exploring...
`
      )
    );
    darin.children!.set(
      'about.txt',
      this.createFileNode(
        'about.txt',
        `Darin Chambers
Technologist, Inventor

30 years of experience building innovative solutions.
Specializing in AI, machine learning, and software architecture.

Building What's Next on Rock-Solid Foundations.
`
      )
    );
    darin.children!.set(
      'projects.txt',
      this.createFileNode(
        'projects.txt',
        `Notable Projects:
- AI/ML systems
- Distributed architectures
- Developer tools
- More to come...

Type 'portfolio' for detailed information.
`
      )
    );
    darin.children!.set(
      'contact.txt',
      this.createFileNode(
        'contact.txt',
        `Get in touch with me!

Type 'contact' to see all contact information.
`
      )
    );
    darin.children!.set(
      'blog.txt',
      this.createFileNode(
        'blog.txt',
        `Recent thoughts and articles on software engineering,
AI/ML, distributed systems, and more.

Type 'blog' to read posts.
`
      )
    );

    // /home/darin/blog directory with dynamically loaded markdown blog posts
    const blog = this.createDirectoryNode('blog');
    darin.children!.set('blog', blog);
    const blogFiles = this.loadBlogFiles();
    for (const [filename, fileNode] of blogFiles) {
      blog.children!.set(filename, fileNode);
    }

    // /home/darin/posts directory with dynamically loaded markdown post files
    const posts = this.createDirectoryNode('posts');
    darin.children!.set('posts', posts);
    const postFiles = this.loadPostFiles();
    for (const [filename, fileNode] of postFiles) {
      posts.children!.set(filename, fileNode);
    }

    // /home/darin/content directory with dynamically loaded markdown content files
    const content = this.createDirectoryNode('content');
    darin.children!.set('content', content);
    const contentFiles = this.loadContentFiles();
    for (const [filename, fileNode] of contentFiles) {
      content.children!.set(filename, fileNode);
    }

    // /home/darin/portfolio directory with dynamically loaded markdown portfolio files
    const portfolio = this.createDirectoryNode('portfolio');
    darin.children!.set('portfolio', portfolio);
    const portfolioFiles = this.loadPortfolioFiles();
    for (const [filename, fileNode] of portfolioFiles) {
      portfolio.children!.set(filename, fileNode);
    }

    // /home/darin/CHANGELOG.md - project changelog loaded from root
    const changelogContent = this.loadChangelogFile();
    if (changelogContent) {
      darin.children!.set('CHANGELOG.md', this.createFileNode('CHANGELOG.md', changelogContent));
    }

    // /usr directory
    const usr = this.createDirectoryNode('usr');
    rootChildren.set('usr', usr);

    // /usr/bin directory (core commands)
    const bin = this.createDirectoryNode('bin');
    usr.children!.set('bin', bin);
    // Core commands
    bin.children!.set('help', this.createFileNode('help', '[Core command: help]'));
    bin.children!.set('clear', this.createFileNode('clear', '[Core command: clear]'));
    bin.children!.set('history', this.createFileNode('history', '[Core command: history]'));
    bin.children!.set('date', this.createFileNode('date', '[Core command: date]'));
    bin.children!.set('echo', this.createFileNode('echo', '[Core command: echo]'));
    bin.children!.set('whoami', this.createFileNode('whoami', '[Core command: whoami]'));
    bin.children!.set('alias', this.createFileNode('alias', '[Core command: alias]'));
    bin.children!.set('unalias', this.createFileNode('unalias', '[Core command: unalias]'));
    bin.children!.set('env', this.createFileNode('env', '[Core command: env]'));
    bin.children!.set('export', this.createFileNode('export', '[Core command: export]'));

    // File system commands
    bin.children!.set('ls', this.createFileNode('ls', '[Core command: ls]'));
    bin.children!.set('cd', this.createFileNode('cd', '[Core command: cd]'));
    bin.children!.set('pwd', this.createFileNode('pwd', '[Core command: pwd]'));
    bin.children!.set('cat', this.createFileNode('cat', '[Core command: cat]'));
    bin.children!.set('tree', this.createFileNode('tree', '[Core command: tree]'));
    bin.children!.set('mkdir', this.createFileNode('mkdir', '[Core command: mkdir]'));
    bin.children!.set('rm', this.createFileNode('rm', '[Core command: rm]'));
    bin.children!.set('rmdir', this.createFileNode('rmdir', '[Core command: rmdir]'));
    bin.children!.set('render', this.createFileNode('render', '[Core command: render]'));
    bin.children!.set('which', this.createFileNode('which', '[Core command: which]'));
    bin.children!.set('man', this.createFileNode('man', '[Core command: man]'));
    bin.children!.set('sudo', this.createFileNode('sudo', '[Core command: sudo]'));
    bin.children!.set('exit', this.createFileNode('exit', '[Core command: exit]'));
    bin.children!.set('make', this.createFileNode('make', '[Novelty command: make]'));

    // Novelty commands
    bin.children!.set('ddate', this.createFileNode('ddate', '[Novelty command: ddate]'));
    bin.children!.set('figlet', this.createFileNode('figlet', '[Novelty command: figlet]'));
    bin.children!.set('lolcat', this.createFileNode('lolcat', '[Novelty command: lolcat]'));
    bin.children!.set('matrix', this.createFileNode('matrix', '[Novelty command: matrix]'));
    bin.children!.set('life', this.createFileNode('life', '[Novelty command: life]'));
    bin.children!.set(
      'polartetris',
      this.createFileNode('polartetris', '[Novelty command: polartetris]')
    );
    bin.children!.set('boot', this.createFileNode('boot', '[Novelty command: boot]'));
    bin.children!.set('shutdown', this.createFileNode('shutdown', '[Novelty command: shutdown]'));
    bin.children!.set('reboot', this.createFileNode('reboot', '[Novelty command: reboot]'));
    bin.children!.set('bsod', this.createFileNode('bsod', '[Novelty command: bsod]'));

    // /usr/local/bin directory (custom/content commands)
    const local = this.createDirectoryNode('local');
    usr.children!.set('local', local);
    const localBin = this.createDirectoryNode('bin');
    local.children!.set('bin', localBin);
    localBin.children!.set('about', this.createFileNode('about', '[Custom command: about]'));
    localBin.children!.set(
      'portfolio',
      this.createFileNode('portfolio', '[Custom command: portfolio]')
    );
    localBin.children!.set('blog', this.createFileNode('blog', '[Custom command: blog]'));
    localBin.children!.set('notes', this.createFileNode('notes', '[Custom command: notes]'));
    localBin.children!.set('contact', this.createFileNode('contact', '[Custom command: contact]'));
    localBin.children!.set('games', this.createFileNode('games', '[Custom command: games]'));
    localBin.children!.set(
      'settings',
      this.createFileNode('settings', '[Custom command: settings]')
    );
    localBin.children!.set(
      'changelog',
      this.createFileNode('changelog', '[Custom command: changelog]')
    );

    return root;
  }
}
