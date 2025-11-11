// Import content markdown files
import aboutMd from '../../content/about.md?raw';
// Import blog markdown files
import buildingSite from '../../content/blog/2025-11-07-01-building-this-site-ai-assisted-development.md?raw';
import trickRocks from '../../content/blog/2025-11-07-02-we-trick-rocks-into-thinking.md?raw';
import vibeCodeGraph from '../../content/blog/2025-11-09-01-vibe-coding-graph-library-one-week.md?raw';
import contactMd from '../../content/contact.md?raw';
import helpMd from '../../content/help.md?raw';
// Import portfolio markdown files
import creatingRevenueStreams from '../../content/portfolio/creating-revenue-streams.md?raw';
import developerProductivity from '../../content/portfolio/developer-productivity.md?raw';
import inventingHardwareSoftware from '../../content/portfolio/inventing-hardware-software.md?raw';
import scalingHypergrowth from '../../content/portfolio/scaling-hypergrowth.md?raw';
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

  public static createDefaultStructure(): FileSystemNode {
    const root = this.createDirectoryNode('');
    const rootChildren = root.children!;

    // /root directory
    rootChildren.set('root', this.createDirectoryNode('root'));

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

    // /home/darin/blog directory with markdown blog posts
    const blog = this.createDirectoryNode('blog');
    darin.children!.set('blog', blog);
    blog.children!.set(
      '2025-11-07-01-building-this-site-ai-assisted-development.md',
      this.createFileNode(
        '2025-11-07-01-building-this-site-ai-assisted-development.md',
        buildingSite
      )
    );
    blog.children!.set(
      '2025-11-07-02-we-trick-rocks-into-thinking.md',
      this.createFileNode('2025-11-07-02-we-trick-rocks-into-thinking.md', trickRocks)
    );
    blog.children!.set(
      '2025-11-09-01-vibe-coding-graph-library-one-week.md',
      this.createFileNode('2025-11-09-01-vibe-coding-graph-library-one-week.md', vibeCodeGraph)
    );

    // /home/darin/content directory with markdown content files
    const content = this.createDirectoryNode('content');
    darin.children!.set('content', content);
    content.children!.set('about.md', this.createFileNode('about.md', aboutMd));
    content.children!.set('contact.md', this.createFileNode('contact.md', contactMd));
    content.children!.set('help.md', this.createFileNode('help.md', helpMd));

    // /home/darin/portfolio directory with markdown portfolio files
    const portfolio = this.createDirectoryNode('portfolio');
    darin.children!.set('portfolio', portfolio);
    portfolio.children!.set(
      'inventing-hardware-software.md',
      this.createFileNode('inventing-hardware-software.md', inventingHardwareSoftware)
    );
    portfolio.children!.set(
      'creating-revenue-streams.md',
      this.createFileNode('creating-revenue-streams.md', creatingRevenueStreams)
    );
    portfolio.children!.set(
      'developer-productivity.md',
      this.createFileNode('developer-productivity.md', developerProductivity)
    );
    portfolio.children!.set(
      'scaling-hypergrowth.md',
      this.createFileNode('scaling-hypergrowth.md', scalingHypergrowth)
    );

    // /usr directory
    const usr = this.createDirectoryNode('usr');
    rootChildren.set('usr', usr);

    // /usr/bin directory (core commands)
    const bin = this.createDirectoryNode('bin');
    usr.children!.set('bin', bin);
    bin.children!.set('help', this.createFileNode('help', '[Core command: help]'));
    bin.children!.set('clear', this.createFileNode('clear', '[Core command: clear]'));
    bin.children!.set('history', this.createFileNode('history', '[Core command: history]'));
    bin.children!.set('date', this.createFileNode('date', '[Core command: date]'));
    bin.children!.set('ddate', this.createFileNode('ddate', '[Novelty command: ddate]'));
    bin.children!.set('figlet', this.createFileNode('figlet', '[Novelty command: figlet]'));
    bin.children!.set('whoami', this.createFileNode('whoami', '[Core command: whoami]'));
    bin.children!.set('alias', this.createFileNode('alias', '[Core command: alias]'));
    bin.children!.set('unalias', this.createFileNode('unalias', '[Core command: unalias]'));
    bin.children!.set('ls', this.createFileNode('ls', '[Core command: ls]'));
    bin.children!.set('cd', this.createFileNode('cd', '[Core command: cd]'));
    bin.children!.set('pwd', this.createFileNode('pwd', '[Core command: pwd]'));
    bin.children!.set('cat', this.createFileNode('cat', '[Core command: cat]'));
    bin.children!.set('tree', this.createFileNode('tree', '[Core command: tree]'));
    bin.children!.set('render', this.createFileNode('render', '[Core command: render]'));

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
    localBin.children!.set('contact', this.createFileNode('contact', '[Custom command: contact]'));
    localBin.children!.set(
      'settings',
      this.createFileNode('settings', '[Custom command: settings]')
    );

    return root;
  }
}
