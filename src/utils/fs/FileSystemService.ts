import { PATHS } from '../../constants';
import { FileSystemError } from '../errors';
import type { IFileSystem } from './IFileSystem';
import type { FileSystemNode } from './types';

export class FileSystemService implements IFileSystem {
  private root: FileSystemNode;
  private currentPath: string;
  private currentUsername = 'darin';

  constructor(rootNode: FileSystemNode) {
    this.root = rootNode;
    this.currentPath = PATHS.HOME_DARIN;
  }

  getCurrentPath(): string {
    return this.currentPath;
  }

  setCurrentUsername(username: string): void {
    this.currentUsername = username;
  }

  getShortPath(): string {
    // Root directory should always be shown as '/'
    if (this.currentPath === '/') {
      return '/';
    }

    const homeDir = `/home/${this.currentUsername}`;
    if (this.currentPath === homeDir) {
      return '~';
    }
    if (this.currentPath.startsWith(homeDir + '/')) {
      return '~' + this.currentPath.substring(homeDir.length);
    }
    return this.currentPath;
  }

  private resolvePath(path: string): string {
    if (path.startsWith('/')) {
      // Absolute path
      return this.normalizePath(path);
    } else if (path === '~') {
      return `/home/${this.currentUsername}`;
    } else if (path.startsWith('~/')) {
      return `/home/${this.currentUsername}` + path.substring(1);
    } else {
      // Relative path
      return this.normalizePath(this.currentPath + '/' + path);
    }
  }

  private normalizePath(path: string): string {
    const parts = path.split('/').filter((p) => p.length > 0);
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

  getNode(path: string): FileSystemNode | null {
    const resolved = this.resolvePath(path);
    if (resolved === '/') {
      return this.root;
    }

    const parts = resolved.split('/').filter((p) => p.length > 0);
    let current = this.root;

    for (const part of parts) {
      if (!current.children?.has(part)) {
        return null;
      }
      current = current.children.get(part)!;
    }

    return current;
  }

  list(path = '.'): string[] {
    const node = this.getNode(path);
    if (!node) {
      throw new FileSystemError(`ls: cannot access '${path}': No such file or directory`);
    }
    if (node.type !== 'directory') {
      throw new FileSystemError(`ls: ${path}: Not a directory`);
    }

    return Array.from(node.children!.keys()).sort();
  }

  changeDirectory(path: string): void {
    const resolved = this.resolvePath(path);
    const node = this.getNode(resolved);

    if (!node) {
      throw new FileSystemError(`cd: ${path}: No such file or directory`);
    }
    if (node.type !== 'directory') {
      throw new FileSystemError(`cd: ${path}: Not a directory`);
    }

    this.currentPath = resolved || '/';
  }

  readFile(path: string): string {
    const node = this.getNode(path);

    if (!node) {
      throw new FileSystemError(`cat: ${path}: No such file or directory`);
    }
    if (node.type !== 'file') {
      throw new FileSystemError(`cat: ${path}: Is a directory`);
    }

    return node.content ?? '';
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

  writeFile(path: string, content: string): void {
    const resolved = this.resolvePath(path);
    const pathParts = resolved.split('/').filter((p) => p.length > 0);
    const fileName = pathParts.pop();

    if (!fileName) {
      throw new FileSystemError(`Invalid file path: ${path}`);
    }

    // Navigate to parent directory
    let current = this.root;
    for (const part of pathParts) {
      if (!current.children?.has(part)) {
        throw new FileSystemError(`Directory does not exist: ${path}`);
      }
      current = current.children.get(part)!;
      if (current.type !== 'directory') {
        throw new FileSystemError(`Not a directory: ${path}`);
      }
    }

    // Create or update file
    const fileNode: FileSystemNode = {
      name: fileName,
      type: 'file',
      content,
    };
    current.children!.set(fileName, fileNode);
  }

  getTree(path = '.', maxDepth = 4): string[] {
    const node = this.getNode(path);

    if (!node) {
      throw new FileSystemError(`tree: cannot access '${path}': No such file or directory`);
    }

    const lines: string[] = [];
    const resolved = this.resolvePath(path);
    lines.push(resolved === '/' ? '/' : resolved);

    if (node.type === 'directory') {
      this.buildTree(node, '', lines, 1, maxDepth);
    }

    return lines;
  }

  private buildTree(
    node: FileSystemNode,
    prefix: string,
    lines: string[],
    currentDepth: number,
    maxDepth: number
  ): void {
    if (currentDepth > maxDepth || !node.children) {
      return;
    }

    const entries = Array.from(node.children.entries()).sort((a, b) => {
      // Sort directories first, then files
      if (a[1].type === 'directory' && b[1].type === 'file') return -1;
      if (a[1].type === 'file' && b[1].type === 'directory') return 1;
      return a[0].localeCompare(b[0]);
    });

    entries.forEach(([name, childNode], index) => {
      const isLast = index === entries.length - 1;
      const connector = isLast ? '└── ' : '├── ';
      const childPrefix = isLast ? '    ' : '│   ';

      lines.push(prefix + connector + name);

      if (childNode.type === 'directory') {
        this.buildTree(childNode, prefix + childPrefix, lines, currentDepth + 1, maxDepth);
      }
    });
  }
}
