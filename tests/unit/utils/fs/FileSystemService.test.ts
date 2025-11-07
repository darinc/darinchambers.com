import { describe, it, expect, beforeEach } from 'vitest';
import { FileSystemService } from '../../../../src/utils/fs/FileSystemService';
import type { FileSystemNode } from '../../../../src/utils/fs/types';

describe('FileSystemService', () => {
  let fs: FileSystemService;
  let mockRoot: FileSystemNode;

  beforeEach(() => {
    // Create a simple mock file system for each test
    mockRoot = {
      name: '',
      type: 'directory',
      children: new Map([
        [
          'home',
          {
            name: 'home',
            type: 'directory',
            children: new Map([
              [
                'darin',
                {
                  name: 'darin',
                  type: 'directory',
                  children: new Map([
                    ['test.txt', { name: 'test.txt', type: 'file', content: 'hello' }],
                    [
                      'docs',
                      {
                        name: 'docs',
                        type: 'directory',
                        children: new Map([
                          ['readme.md', { name: 'readme.md', type: 'file', content: '# README' }],
                        ]),
                      },
                    ],
                  ]),
                },
              ],
            ]),
          },
        ],
      ]),
    };
    fs = new FileSystemService(mockRoot);
  });

  describe('readFile', () => {
    it('should read an existing file', () => {
      const content = fs.readFile('~/test.txt');
      expect(content).toBe('hello');
    });

    it('should throw an error when reading a non-existent file', () => {
      expect(() => fs.readFile('~/bad.txt')).toThrow('No such file or directory');
    });

    it('should throw an error when reading a directory', () => {
      expect(() => fs.readFile('~/docs')).toThrow('Is a directory');
    });

    it('should read file with absolute path', () => {
      const content = fs.readFile('/home/darin/test.txt');
      expect(content).toBe('hello');
    });
  });

  describe('changeDirectory', () => {
    it('should change directory', () => {
      fs.changeDirectory('/home');
      expect(fs.getCurrentPath()).toBe('/home');
    });

    it('should change directory with relative path', () => {
      fs.changeDirectory('docs');
      expect(fs.getCurrentPath()).toBe('/home/darin/docs');
    });

    it('should handle ~ path', () => {
      fs.changeDirectory('/home');
      fs.changeDirectory('~');
      expect(fs.getCurrentPath()).toBe('/home/darin');
    });

    it('should throw error for non-existent directory', () => {
      expect(() => fs.changeDirectory('nonexistent')).toThrow('No such file or directory');
    });

    it('should throw error when trying to cd into a file', () => {
      expect(() => fs.changeDirectory('test.txt')).toThrow('Not a directory');
    });
  });

  describe('list', () => {
    it('should list directory contents', () => {
      const contents = fs.list('.');
      expect(contents).toEqual(['docs', 'test.txt']);
    });

    it('should list subdirectory contents', () => {
      const contents = fs.list('docs');
      expect(contents).toEqual(['readme.md']);
    });

    it('should throw error for non-existent directory', () => {
      expect(() => fs.list('nonexistent')).toThrow('No such file or directory');
    });

    it('should throw error when listing a file', () => {
      expect(() => fs.list('test.txt')).toThrow('Not a directory');
    });
  });

  describe('getCurrentPath', () => {
    it('should return current path', () => {
      expect(fs.getCurrentPath()).toBe('/home/darin');
    });

    it('should return updated path after cd', () => {
      fs.changeDirectory('/home');
      expect(fs.getCurrentPath()).toBe('/home');
    });
  });

  describe('getShortPath', () => {
    it('should return ~ for home directory', () => {
      expect(fs.getShortPath()).toBe('~');
    });

    it('should return ~/docs for subdirectory', () => {
      fs.changeDirectory('docs');
      expect(fs.getShortPath()).toBe('~/docs');
    });

    it('should return full path outside home', () => {
      fs.changeDirectory('/home');
      expect(fs.getShortPath()).toBe('/home');
    });
  });

  describe('exists', () => {
    it('should return true for existing file', () => {
      expect(fs.exists('test.txt')).toBe(true);
    });

    it('should return true for existing directory', () => {
      expect(fs.exists('docs')).toBe(true);
    });

    it('should return false for non-existent path', () => {
      expect(fs.exists('nonexistent')).toBe(false);
    });
  });

  describe('isDirectory', () => {
    it('should return true for directory', () => {
      expect(fs.isDirectory('docs')).toBe(true);
    });

    it('should return false for file', () => {
      expect(fs.isDirectory('test.txt')).toBe(false);
    });

    it('should return false for non-existent path', () => {
      expect(fs.isDirectory('nonexistent')).toBe(false);
    });
  });

  describe('isFile', () => {
    it('should return true for file', () => {
      expect(fs.isFile('test.txt')).toBe(true);
    });

    it('should return false for directory', () => {
      expect(fs.isFile('docs')).toBe(false);
    });

    it('should return false for non-existent path', () => {
      expect(fs.isFile('nonexistent')).toBe(false);
    });
  });

  describe('writeFile', () => {
    it('should create a new file', () => {
      fs.writeFile('~/newfile.txt', 'new content');
      expect(fs.readFile('~/newfile.txt')).toBe('new content');
    });

    it('should overwrite existing file', () => {
      fs.writeFile('~/test.txt', 'updated content');
      expect(fs.readFile('~/test.txt')).toBe('updated content');
    });

    it('should throw error for non-existent directory', () => {
      expect(() => fs.writeFile('~/nonexistent/file.txt', 'content')).toThrow(
        'Directory does not exist'
      );
    });
  });

  describe('getTree', () => {
    it('should return tree structure', () => {
      const tree = fs.getTree('.');
      expect(tree[0]).toBe('/home/darin');
      expect(tree.some((line) => line.includes('docs'))).toBe(true);
      expect(tree.some((line) => line.includes('test.txt'))).toBe(true);
    });

    it('should throw error for non-existent path', () => {
      expect(() => fs.getTree('nonexistent')).toThrow('No such file or directory');
    });
  });

  describe('setCurrentUsername', () => {
    it('should update username and affect home path resolution', () => {
      // First, ensure we're at /home/darin
      expect(fs.getCurrentPath()).toBe('/home/darin');

      // Change username to guest
      fs.setCurrentUsername('guest');

      // The current path stays the same, but getShortPath should now reflect guest's home
      // Since we're at /home/darin but username is guest, it should show full path
      expect(fs.getShortPath()).toBe('/home/darin');

      // If we were to cd to /home/guest (which doesn't exist in our mock), it would fail
      // But we can verify the username was set by checking that ~ would resolve to /home/guest
      expect(() => fs.changeDirectory('~')).toThrow('No such file or directory');
    });
  });

  describe('getNode', () => {
    it('should return node for existing path', () => {
      const node = fs.getNode('test.txt');
      expect(node).toBeDefined();
      expect(node!.type).toBe('file');
      expect(node!.name).toBe('test.txt');
    });

    it('should return null for non-existent path', () => {
      const node = fs.getNode('nonexistent');
      expect(node).toBeNull();
    });
  });
});
