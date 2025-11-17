import { describe, it, expect } from 'vitest';
import { FileSystemInitializer } from '../../../../src/utils/fs/FileSystemInitializer';

describe('FileSystemInitializer', () => {
  describe('Basic Structure', () => {
    it('should create a root node with a /home directory', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      expect(root.children).toBeDefined();
      expect(root.children!.has('home')).toBe(true);
    });

    it('should create /root, /home, and /usr directories', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      expect(root.children!.has('root')).toBe(true);
      expect(root.children!.has('home')).toBe(true);
      expect(root.children!.has('usr')).toBe(true);
    });

    it('should create guest user directory with README', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const guestDir = root.children!.get('home')!.children!.get('guest');

      expect(guestDir).toBeDefined();
      expect(guestDir!.children!.has('README.txt')).toBe(true);

      const readme = guestDir!.children!.get('README.txt');
      expect(readme!.content).toContain('Welcome to darinchambers.com!');
    });

    it('should create darin user directory with easter eggs', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const darinDir = root.children!.get('home')!.children!.get('darin');

      expect(darinDir).toBeDefined();
      expect(darinDir!.children!.has('.secret')).toBe(true);

      const secret = darinDir!.children!.get('.secret');
      expect(secret!.content).toContain('You found a secret!');
    });
  });

  describe('Dynamic Blog File Loading', () => {
    it('should dynamically load blog markdown files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const blogDir = root.children!.get('home')!.children!.get('darin')!.children!.get('blog');

      expect(blogDir).toBeDefined();
      expect(blogDir!.type).toBe('directory');
      expect(blogDir!.children!.size).toBeGreaterThan(0);
    });

    it('should load only markdown files in blog directory', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const blogDir = root.children!.get('home')!.children!.get('darin')!.children!.get('blog');

      for (const [filename] of blogDir!.children!) {
        expect(filename).toMatch(/\.md$/);
      }
    });

    it('should create proper file nodes with content for blog files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const blogDir = root.children!.get('home')!.children!.get('darin')!.children!.get('blog');

      for (const [filename, fileNode] of blogDir!.children!) {
        expect(fileNode.type).toBe('file');
        expect(fileNode.name).toBe(filename);
        expect(fileNode.content).toBeDefined();
        expect(typeof fileNode.content).toBe('string');
        expect(fileNode.content!.length).toBeGreaterThan(0);
      }
    });

    it('should include known blog posts', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const blogDir = root.children!.get('home')!.children!.get('darin')!.children!.get('blog');

      const expectedPosts = [
        '2025-11-14-building-this-site-ai-assisted-development.md',
        '2025-11-15-we-trick-rocks-into-thinking.md',
        '2025-11-16-vibe-coding-graph-library-one-week.md',
      ];

      for (const postName of expectedPosts) {
        expect(blogDir!.children!.has(postName)).toBe(true);
      }
    });

    it('should load blog post content with YAML frontmatter', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const blogDir = root.children!.get('home')!.children!.get('darin')!.children!.get('blog');

      const tricksRocksPost = blogDir!.children!.get('2025-11-15-we-trick-rocks-into-thinking.md');
      expect(tricksRocksPost).toBeDefined();
      expect(tricksRocksPost!.type).toBe('file');
      expect(tricksRocksPost!.content).toContain('---');
      expect(tricksRocksPost!.content).toContain('title:');
      expect(tricksRocksPost!.content).toContain('We Trick Rocks Into Thinking');
    });

    it('should set proper file metadata for blog files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const blogDir = root.children!.get('home')!.children!.get('darin')!.children!.get('blog');

      for (const [, fileNode] of blogDir!.children!) {
        expect(fileNode.permissions).toBe('-rw-r--r--');
        expect(fileNode.owner).toBe('darin');
        expect(fileNode.size).toBe(fileNode.content!.length);
        expect(fileNode.modifiedTime).toBeInstanceOf(Date);
      }
    });
  });

  describe('Dynamic Portfolio File Loading', () => {
    it('should dynamically load portfolio markdown files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const portfolioDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('portfolio');

      expect(portfolioDir).toBeDefined();
      expect(portfolioDir!.type).toBe('directory');
      expect(portfolioDir!.children!.size).toBeGreaterThan(0);
    });

    it('should load only markdown files in portfolio directory', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const portfolioDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('portfolio');

      for (const [filename] of portfolioDir!.children!) {
        expect(filename).toMatch(/\.md$/);
      }
    });

    it('should create proper file nodes with content for portfolio files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const portfolioDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('portfolio');

      for (const [filename, fileNode] of portfolioDir!.children!) {
        expect(fileNode.type).toBe('file');
        expect(fileNode.name).toBe(filename);
        expect(fileNode.content).toBeDefined();
        expect(typeof fileNode.content).toBe('string');
        expect(fileNode.content!.length).toBeGreaterThan(0);
      }
    });

    it('should include all expected portfolio files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const portfolioDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('portfolio');

      const expectedProjects = [
        'creating-revenue-streams.md',
        'developer-productivity.md',
        'inventing-hardware-software.md',
        'scaling-hypergrowth.md',
      ];

      for (const projectName of expectedProjects) {
        expect(portfolioDir!.children!.has(projectName)).toBe(true);
      }
    });

    it('should load portfolio content with YAML frontmatter', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const portfolioDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('portfolio');

      const scalingProject = portfolioDir!.children!.get('scaling-hypergrowth.md');
      expect(scalingProject).toBeDefined();
      expect(scalingProject!.type).toBe('file');
      expect(scalingProject!.content).toContain('---');
      expect(scalingProject!.content).toContain('id:');
      expect(scalingProject!.content).toContain('title:');
      expect(scalingProject!.content).toContain('order:');
    });

    it('should set proper file metadata for portfolio files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const portfolioDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('portfolio');

      for (const [, fileNode] of portfolioDir!.children!) {
        expect(fileNode.permissions).toBe('-rw-r--r--');
        expect(fileNode.owner).toBe('darin');
        expect(fileNode.size).toBe(fileNode.content!.length);
        expect(fileNode.modifiedTime).toBeInstanceOf(Date);
      }
    });

    it('should load portfolio files with summary and order fields', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const portfolioDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('portfolio');

      for (const [, fileNode] of portfolioDir!.children!) {
        expect(fileNode.content).toContain('summary:');
        expect(fileNode.content).toContain('order:');
      }
    });
  });

  describe('Dynamic Content File Loading', () => {
    it('should dynamically load content markdown files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const contentDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('content');

      expect(contentDir).toBeDefined();
      expect(contentDir!.type).toBe('directory');
      expect(contentDir!.children!.size).toBeGreaterThan(0);
    });

    it('should load only markdown files in content directory', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const contentDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('content');

      for (const [filename] of contentDir!.children!) {
        expect(filename).toMatch(/\.md$/);
      }
    });

    it('should create proper file nodes with content for content files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const contentDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('content');

      for (const [filename, fileNode] of contentDir!.children!) {
        expect(fileNode.type).toBe('file');
        expect(fileNode.name).toBe(filename);
        expect(fileNode.content).toBeDefined();
        expect(typeof fileNode.content).toBe('string');
        expect(fileNode.content!.length).toBeGreaterThan(0);
      }
    });

    it('should include all expected content files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const contentDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('content');

      const expectedFiles = ['about.md', 'contact.md', 'help.md'];

      for (const fileName of expectedFiles) {
        expect(contentDir!.children!.has(fileName)).toBe(true);
      }
    });

    it('should load about.md with proper content', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const contentDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('content');

      const aboutFile = contentDir!.children!.get('about.md');
      expect(aboutFile).toBeDefined();
      expect(aboutFile!.type).toBe('file');
      expect(aboutFile!.content).toBeDefined();
      expect(aboutFile!.content!.length).toBeGreaterThan(0);
    });

    it('should set proper file metadata for content files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const contentDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('content');

      for (const [, fileNode] of contentDir!.children!) {
        expect(fileNode.permissions).toBe('-rw-r--r--');
        expect(fileNode.owner).toBe('darin');
        expect(fileNode.size).toBe(fileNode.content!.length);
        expect(fileNode.modifiedTime).toBeInstanceOf(Date);
      }
    });
  });

  describe('File Node Properties', () => {
    it('should set isHidden for hidden files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const darinDir = root.children!.get('home')!.children!.get('darin');

      const secretFile = darinDir!.children!.get('.secret');
      expect(secretFile).toBeDefined();
      expect(secretFile!.isHidden).toBe(true);
    });

    it('should not set isHidden for regular files', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const blogDir = root.children!.get('home')!.children!.get('darin')!.children!.get('blog');

      for (const [filename, fileNode] of blogDir!.children!) {
        if (!filename.startsWith('.')) {
          expect(fileNode.isHidden).toBeFalsy();
        }
      }
    });

    it('should set correct file sizes based on content length', () => {
      const root = FileSystemInitializer.createDefaultStructure();
      const contentDir = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('content');

      for (const [, fileNode] of contentDir!.children!) {
        expect(fileNode.size).toBe(fileNode.content!.length);
      }
    });
  });

  describe('Directory Structure Consistency', () => {
    it('should maintain consistent directory structure', () => {
      const root = FileSystemInitializer.createDefaultStructure();

      // Verify path: /home/darin/blog exists
      const blogPath = root.children!.get('home')!.children!.get('darin')!.children!.get('blog');
      expect(blogPath).toBeDefined();
      expect(blogPath!.type).toBe('directory');

      // Verify path: /home/darin/portfolio exists
      const portfolioPath = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('portfolio');
      expect(portfolioPath).toBeDefined();
      expect(portfolioPath!.type).toBe('directory');

      // Verify path: /home/darin/content exists
      const contentPath = root
        .children!.get('home')!
        .children!.get('darin')!
        .children!.get('content');
      expect(contentPath).toBeDefined();
      expect(contentPath!.type).toBe('directory');
    });

    it('should set directory permissions correctly', () => {
      const root = FileSystemInitializer.createDefaultStructure();

      const directories = [
        root.children!.get('home'),
        root.children!.get('home')!.children!.get('darin'),
        root.children!.get('home')!.children!.get('darin')!.children!.get('blog'),
        root.children!.get('home')!.children!.get('darin')!.children!.get('portfolio'),
        root.children!.get('home')!.children!.get('darin')!.children!.get('content'),
      ];

      for (const dir of directories) {
        expect(dir!.permissions).toBe('drwxr-xr-x');
        expect(dir!.owner).toBe('darin');
        expect(dir!.size).toBe(4096);
      }
    });
  });
});
