import type { FileSystemNode } from './types';

export interface IFileSystem {
  getCurrentPath(): string;
  setCurrentUsername(username: string): void;
  getShortPath(): string;
  list(path: string): string[];
  changeDirectory(path: string): void;
  readFile(path: string): string;
  exists(path: string): boolean;
  isDirectory(path: string): boolean;
  isFile(path: string): boolean;
  writeFile(path: string, content: string): void;
  getTree(path: string, maxDepth?: number): string[];
  getNode(path: string): FileSystemNode | null;
}
