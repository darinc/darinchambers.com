export type FileSystemNodeType = 'file' | 'directory';

export interface FileSystemNode {
  name: string;
  type: FileSystemNodeType;
  content?: string;
  children?: Map<string, FileSystemNode>;
}

export class FileSystem {
  private root: FileSystemNode;
  private currentPath: string;

  constructor() {
    this.root = this.createDirectoryNode('');
    this.currentPath = '/home/guest';
    this.initializeFileSystem();
  }

  private createDirectoryNode(name: string): FileSystemNode {
    return {
      name,
      type: 'directory',
      children: new Map()
    };
  }

  private createFileNode(name: string, content: string): FileSystemNode {
    return {
      name,
      type: 'file',
      content
    };
  }

  private initializeFileSystem(): void {
    // Create root structure
    const root = this.root.children!;

    // /root directory
    root.set('root', this.createDirectoryNode('root'));

    // /home directory
    const home = this.createDirectoryNode('home');
    root.set('home', home);

    // /home/guest directory
    const guest = this.createDirectoryNode('guest');
    home.children!.set('guest', guest);
    guest.children!.set('README.txt', this.createFileNode('README.txt',
      `Welcome to darinchambers.com!

This is a terminal-inspired personal website showcasing expertise in AI and software engineering.

Type 'help' to see available commands.
Type 'cd /home/darin' to explore more.
`));

    // /home/darin directory with easter eggs
    const darin = this.createDirectoryNode('darin');
    home.children!.set('darin', darin);
    darin.children!.set('.secret', this.createFileNode('.secret',
      `You found a secret! 🎉

"The best way to predict the future is to invent it." - Alan Kay

Keep exploring...
`));
    darin.children!.set('about.txt', this.createFileNode('about.txt',
      `Darin Chambers
Technologist, Inventor

30 years of experience building innovative solutions.
Specializing in AI, machine learning, and software architecture.

Building What's Next on Rock-Solid Foundations.
`));
    darin.children!.set('projects.txt', this.createFileNode('projects.txt',
      `Notable Projects:
- AI/ML systems
- Distributed architectures
- Developer tools
- More to come...

Type 'portfolio' for detailed information.
`));
    darin.children!.set('contact.txt', this.createFileNode('contact.txt',
      `Get in touch with me!

Type 'contact' to see all contact information.
`));
    darin.children!.set('blog.txt', this.createFileNode('blog.txt',
      `Recent thoughts and articles on software engineering,
AI/ML, distributed systems, and more.

Type 'blog' to read posts.
`));

    // /usr directory
    const usr = this.createDirectoryNode('usr');
    root.set('usr', usr);

    // /usr/bin directory (core commands)
    const bin = this.createDirectoryNode('bin');
    usr.children!.set('bin', bin);
    bin.children!.set('help', this.createFileNode('help', '[Core command: help]'));
    bin.children!.set('clear', this.createFileNode('clear', '[Core command: clear]'));
    bin.children!.set('ls', this.createFileNode('ls', '[Core command: ls]'));
    bin.children!.set('cd', this.createFileNode('cd', '[Core command: cd]'));
    bin.children!.set('pwd', this.createFileNode('pwd', '[Core command: pwd]'));
    bin.children!.set('cat', this.createFileNode('cat', '[Core command: cat]'));
    bin.children!.set('about', this.createFileNode('about', '[Core command: about]'));
    bin.children!.set('portfolio', this.createFileNode('portfolio', '[Core command: portfolio]'));
    bin.children!.set('blog', this.createFileNode('blog', '[Core command: blog]'));
    bin.children!.set('contact', this.createFileNode('contact', '[Core command: contact]'));
    bin.children!.set('skills', this.createFileNode('skills', '[Core command: skills]'));

    // /usr/local/bin directory (additional commands)
    const local = this.createDirectoryNode('local');
    usr.children!.set('local', local);
    const localBin = this.createDirectoryNode('bin');
    local.children!.set('bin', localBin);
  }

  getCurrentPath(): string {
    return this.currentPath;
  }

  getShortPath(): string {
    if (this.currentPath === '/home/guest') {
      return '~';
    }
    if (this.currentPath.startsWith('/home/guest/')) {
      return '~' + this.currentPath.substring('/home/guest'.length);
    }
    return this.currentPath;
  }

  private resolvePath(path: string): string {
    if (path.startsWith('/')) {
      // Absolute path
      return this.normalizePath(path);
    } else if (path === '~') {
      return '/home/guest';
    } else if (path.startsWith('~/')) {
      return '/home/guest' + path.substring(1);
    } else {
      // Relative path
      return this.normalizePath(this.currentPath + '/' + path);
    }
  }

  private normalizePath(path: string): string {
    const parts = path.split('/').filter(p => p.length > 0);
    const normalized: string[] = [];

    for (const part of parts) {
      if (part === '..') {
        normalized.pop();
      } else if (part !== '.') {
        normalized.push(part);
      }
    }

    return '/' + normalized.join('/');
  }

  private getNode(path: string): FileSystemNode | null {
    const resolved = this.resolvePath(path);
    if (resolved === '/') {
      return this.root;
    }

    const parts = resolved.split('/').filter(p => p.length > 0);
    let current = this.root;

    for (const part of parts) {
      if (!current.children || !current.children.has(part)) {
        return null;
      }
      current = current.children.get(part)!;
    }

    return current;
  }

  list(path: string = '.'): string[] {
    const node = this.getNode(path);
    if (!node) {
      throw new Error(`ls: cannot access '${path}': No such file or directory`);
    }
    if (node.type !== 'directory') {
      throw new Error(`ls: ${path}: Not a directory`);
    }

    return Array.from(node.children!.keys()).sort();
  }

  changeDirectory(path: string): void {
    const resolved = this.resolvePath(path);
    const node = this.getNode(resolved);

    if (!node) {
      throw new Error(`cd: ${path}: No such file or directory`);
    }
    if (node.type !== 'directory') {
      throw new Error(`cd: ${path}: Not a directory`);
    }

    this.currentPath = resolved || '/';
  }

  readFile(path: string): string {
    const node = this.getNode(path);

    if (!node) {
      throw new Error(`cat: ${path}: No such file or directory`);
    }
    if (node.type !== 'file') {
      throw new Error(`cat: ${path}: Is a directory`);
    }

    return node.content || '';
  }

  exists(path: string): boolean {
    return this.getNode(path) !== null;
  }

  isDirectory(path: string): boolean {
    const node = this.getNode(path);
    return node !== null && node.type === 'directory';
  }

  isFile(path: string): boolean {
    const node = this.getNode(path);
    return node !== null && node.type === 'file';
  }
}
