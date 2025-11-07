import { describe, it, expect } from 'vitest';
import { FileSystemInitializer } from '../../../../src/utils/fs/FileSystemInitializer';

describe('FileSystemInitializer', () => {
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

  it('should load the ai-production-lessons blog post', () => {
    const root = FileSystemInitializer.createDefaultStructure();
    const post = root
      .children!.get('home')!
      .children!.get('darin')!
      .children!.get('blog')!
      .children!.get('2024-09-15-ai-production-lessons.md');

    expect(post).toBeDefined();
    expect(post!.type).toBe('file');
    expect(post!.content).toContain('Building AI systems that work in production');
  });

  it('should load all content markdown files', () => {
    const root = FileSystemInitializer.createDefaultStructure();
    const contentDir = root.children!.get('home')!.children!.get('darin')!.children!.get('content');

    expect(contentDir).toBeDefined();
    expect(contentDir!.children!.has('about.md')).toBe(true);
    expect(contentDir!.children!.has('contact.md')).toBe(true);
    expect(contentDir!.children!.has('skills.md')).toBe(true);
    expect(contentDir!.children!.has('help.md')).toBe(true);
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
