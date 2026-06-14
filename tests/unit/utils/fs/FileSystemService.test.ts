import { describe, it, expect, beforeEach } from 'vitest';
import { siteConfig } from '../../../../src/site.config';
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
                siteConfig.username,
                {
                  name: siteConfig.username,
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
      const content = fs.readFile(`/home/${siteConfig.username}/test.txt`);
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
      expect(fs.getCurrentPath()).toBe(`/home/${siteConfig.username}/docs`);
    });

    it('should handle ~ path', () => {
      fs.changeDirectory('/home');
      fs.changeDirectory('~');
      expect(fs.getCurrentPath()).toBe(`/home/${siteConfig.username}`);
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
      expect(fs.getCurrentPath()).toBe(`/home/${siteConfig.username}`);
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
      expect(tree[0]).toBe(`/home/${siteConfig.username}`);
      expect(tree.some((line) => line.includes('docs'))).toBe(true);
      expect(tree.some((line) => line.includes('test.txt'))).toBe(true);
    });

    it('should throw error for non-existent path', () => {
      expect(() => fs.getTree('nonexistent')).toThrow('No such file or directory');
    });
  });

  describe('setCurrentUsername', () => {
    it('should update username and affect home path resolution', () => {
      // First, ensure we're at the configured user's home
      expect(fs.getCurrentPath()).toBe(`/home/${siteConfig.username}`);

      // Change username to guest
      fs.setCurrentUsername('guest');

      // The current path stays the same, but getShortPath should now reflect guest's home
      // Since we're at the user's home but username is guest, it should show full path
      expect(fs.getShortPath()).toBe(`/home/${siteConfig.username}`);

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

  describe('writeFile error paths', () => {
    it('should throw when a path component is a file, not a directory', () => {
      // test.txt is a file; writing "into" it should fail
      expect(() => fs.writeFile('~/test.txt/child.txt', 'data')).toThrow('Not a directory');
    });
  });

  describe('createDirectory', () => {
    it('should create a new directory', () => {
      fs.createDirectory('~/newdir');
      expect(fs.isDirectory('~/newdir')).toBe(true);
    });

    it('should create nested directories that do not yet exist', () => {
      fs.createDirectory('~/a/b/c');
      expect(fs.isDirectory('~/a')).toBe(true);
      expect(fs.isDirectory('~/a/b')).toBe(true);
      expect(fs.isDirectory('~/a/b/c')).toBe(true);
    });

    it('should be a no-op for an existing directory and preserve its contents', () => {
      fs.createDirectory('~/docs');
      expect(fs.isDirectory('~/docs')).toBe(true);
      // readme.md should still be present inside docs
      expect(fs.list('~/docs')).toEqual(['readme.md']);
    });

    it('should throw when a path component exists but is a file', () => {
      expect(() => fs.createDirectory('~/test.txt/sub')).toThrow(
        'File exists but is not a directory'
      );
    });
  });

  describe('deleteFile', () => {
    it('should delete an existing file', () => {
      expect(fs.exists('~/test.txt')).toBe(true);
      fs.deleteFile('~/test.txt');
      expect(fs.exists('~/test.txt')).toBe(false);
    });

    it('should throw when the file does not exist', () => {
      expect(() => fs.deleteFile('~/missing.txt')).toThrow('No such file or directory');
    });

    it('should throw when the target is a directory', () => {
      expect(() => fs.deleteFile('~/docs')).toThrow('Is a directory');
    });

    it('should delete a file with an absolute path', () => {
      fs.deleteFile(`/home/${siteConfig.username}/docs/readme.md`);
      expect(fs.exists(`/home/${siteConfig.username}/docs/readme.md`)).toBe(false);
    });
  });

  describe('deleteDirectory', () => {
    it('should refuse to delete the root directory', () => {
      expect(() => fs.deleteDirectory('/')).toThrow('Permission denied');
    });

    it('should throw when the directory does not exist', () => {
      expect(() => fs.deleteDirectory('~/missing')).toThrow('No such file or directory');
    });

    it('should throw when the target is a file', () => {
      expect(() => fs.deleteDirectory('~/test.txt')).toThrow('Not a directory');
    });

    it('should throw when deleting a non-empty directory without recursive flag', () => {
      expect(() => fs.deleteDirectory('~/docs')).toThrow('Directory not empty');
    });

    it('should delete a non-empty directory when recursive is true', () => {
      expect(fs.isDirectory('~/docs')).toBe(true);
      fs.deleteDirectory('~/docs', true);
      expect(fs.exists('~/docs')).toBe(false);
    });

    it('should delete an empty directory without the recursive flag', () => {
      fs.createDirectory('~/empty');
      fs.deleteDirectory('~/empty');
      expect(fs.exists('~/empty')).toBe(false);
    });
  });
});
