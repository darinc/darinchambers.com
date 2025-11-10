import { describe, it, expect } from 'vitest';
import { PortfolioParser } from '../../../src/utils/PortfolioParser';

describe('PortfolioParser', () => {
  describe('parseFrontmatter', () => {
    it('should parse valid frontmatter with all fields', () => {
      const content = `---
id: test-project
title: Test Project
year: 2024
technologies: [TypeScript, React]
impact: Improved productivity by 50%
---

# Project Description

This is the project description.`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.frontmatter).toEqual({
        id: 'test-project',
        title: 'Test Project',
        year: '2024',
        technologies: ['TypeScript', 'React'],
        impact: 'Improved productivity by 50%',
      });
      expect(result.markdown).toBe('# Project Description\n\nThis is the project description.');
    });

    it('should parse frontmatter with optional tags field', () => {
      const content = `---
id: test-project
title: Test Project
year: 2024
technologies: [TypeScript, React]
tags: [major, serious, open-source]
---

# Project Description

This is the project description.`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.frontmatter).toEqual({
        id: 'test-project',
        title: 'Test Project',
        year: '2024',
        technologies: ['TypeScript', 'React'],
        tags: ['major', 'serious', 'open-source'],
      });
    });

    it('should parse frontmatter without optional impact field', () => {
      const content = `---
id: test-project
title: Test Project
year: 2024
technologies: [TypeScript]
---

Description`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.frontmatter).toEqual({
        id: 'test-project',
        title: 'Test Project',
        year: '2024',
        technologies: ['TypeScript'],
      });
    });

    it('should handle technologies with quotes', () => {
      const content = `---
id: test
title: Test
year: 2024
technologies: ["TypeScript", "React", "Node.js"]
---

Content`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.frontmatter.technologies).toEqual(['TypeScript', 'React', 'Node.js']);
    });

    it('should handle technologies with single quotes', () => {
      const content = `---
id: test
title: Test
year: 2024
technologies: ['TypeScript', 'React']
---

Content`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.frontmatter.technologies).toEqual(['TypeScript', 'React']);
    });

    it('should handle technologies with spaces', () => {
      const content = `---
id: test
title: Test
year: 2024
technologies: [ TypeScript , React , Node.js ]
---

Content`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.frontmatter.technologies).toEqual(['TypeScript', 'React', 'Node.js']);
    });

    it('should handle empty technologies array', () => {
      const content = `---
id: test
title: Test
year: 2024
technologies: []
---

Content`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.frontmatter.technologies).toEqual([]);
    });

    it('should remove quotes from string values', () => {
      const content = `---
id: "test-project"
title: 'Test Project'
year: "2024"
technologies: [TypeScript]
impact: "High impact"
---

Content`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.frontmatter.id).toBe('test-project');
      expect(result.frontmatter.title).toBe('Test Project');
      expect(result.frontmatter.year).toBe('2024');
      expect(result.frontmatter.impact).toBe('High impact');
    });

    it('should throw error if frontmatter does not start with ---', () => {
      const content = `id: test
title: Test
year: 2024
technologies: []

Content`;

      expect(() => PortfolioParser.parseFrontmatter(content)).toThrow(
        'Invalid frontmatter: must start with ---'
      );
    });

    it('should throw error if closing --- is missing', () => {
      const content = `---
id: test
title: Test
year: 2024
technologies: []

Content`;

      expect(() => PortfolioParser.parseFrontmatter(content)).toThrow(
        'Invalid frontmatter: no closing ---'
      );
    });

    it('should throw error if id is missing', () => {
      const content = `---
title: Test
year: 2024
technologies: []
---

Content`;

      expect(() => PortfolioParser.parseFrontmatter(content)).toThrow(
        /missing or invalid fields.*id/
      );
    });

    it('should throw error if title is missing', () => {
      const content = `---
id: test
year: 2024
technologies: []
---

Content`;

      expect(() => PortfolioParser.parseFrontmatter(content)).toThrow(
        /missing or invalid fields.*title/
      );
    });

    it('should throw error if year is missing', () => {
      const content = `---
id: test
title: Test
technologies: []
---

Content`;

      expect(() => PortfolioParser.parseFrontmatter(content)).toThrow(
        /missing or invalid fields.*year/
      );
    });

    it('should throw error if technologies is missing', () => {
      const content = `---
id: test
title: Test
year: 2024
---

Content`;

      expect(() => PortfolioParser.parseFrontmatter(content)).toThrow(
        /missing or invalid fields.*technologies/
      );
    });

    it('should throw error for multiple missing fields', () => {
      const content = `---
id: test
---

Content`;

      expect(() => PortfolioParser.parseFrontmatter(content)).toThrow(/missing or invalid fields/);
    });

    it('should handle multiline content after frontmatter', () => {
      const content = `---
id: test
title: Test
year: 2024
technologies: [TypeScript]
---

# Project Overview

## Features

- Feature 1
- Feature 2`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.markdown).toBe('# Project Overview\n\n## Features\n\n- Feature 1\n- Feature 2');
    });

    it('should trim whitespace from markdown content', () => {
      const content = `---
id: test
title: Test
year: 2024
technologies: [TypeScript]
---


Description here


`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.markdown).toBe('Description here');
    });

    it('should handle lines without colons in frontmatter', () => {
      const content = `---
id: test
invalid line without colon
title: Test
year: 2024
technologies: [TypeScript]
---

Content`;

      const result = PortfolioParser.parseFrontmatter(content);

      expect(result.frontmatter.id).toBe('test');
      expect(result.frontmatter.title).toBe('Test');
    });
  });

  describe('parseProject', () => {
    it('should parse a complete project', () => {
      const filename = 'inventing-hardware-software.md';
      const content = `---
id: inventing-hardware-software
title: Inventing Hardware + Software Solutions
year: 2024
technologies: [Python, TensorFlow, AWS]
impact: Reduced processing time by 40%
---

# Inventing Hardware + Software Solutions

Developed machine learning systems.`;

      const result = PortfolioParser.parseProject(filename, content);

      expect(result).toEqual({
        id: 'inventing-hardware-software',
        title: 'Inventing Hardware + Software Solutions',
        description:
          '# Inventing Hardware + Software Solutions\n\nDeveloped machine learning systems.',
        technologies: ['Python', 'TensorFlow', 'AWS'],
        impact: 'Reduced processing time by 40%',
        year: '2024',
        tags: undefined,
      });
    });

    it('should parse a project with tags', () => {
      const filename = 'test-project.md';
      const content = `---
id: test-project
title: Test Project
year: 2024
technologies: [TypeScript, React]
tags: [major, serious, open-source]
impact: Improved team productivity
---

# Test Project

This is a test project.`;

      const result = PortfolioParser.parseProject(filename, content);

      expect(result).toEqual({
        id: 'test-project',
        title: 'Test Project',
        description: '# Test Project\n\nThis is a test project.',
        technologies: ['TypeScript', 'React'],
        impact: 'Improved team productivity',
        year: '2024',
        tags: ['major', 'serious', 'open-source'],
      });
    });

    it('should use frontmatter id over filename', () => {
      const filename = 'different-name.md';
      const content = `---
id: actual-project-id
title: Project
year: 2024
technologies: [TypeScript]
---

Content`;

      const result = PortfolioParser.parseProject(filename, content);

      expect(result.id).toBe('actual-project-id');
    });

    it('should use filename as fallback if id is missing from frontmatter', () => {
      // This test documents current behavior, though frontmatter should require id
      const filename = 'fallback-id.md';
      const content = `---
title: Project
year: 2024
technologies: [TypeScript]
---

Content`;

      // This will throw because id is required in frontmatter
      expect(() => PortfolioParser.parseProject(filename, content)).toThrow();
    });

    it('should handle project without impact field', () => {
      const filename = 'project.md';
      const content = `---
id: project
title: Project
year: 2024
technologies: [TypeScript]
---

Description`;

      const result = PortfolioParser.parseProject(filename, content);

      expect(result.impact).toBeUndefined();
    });

    it('should remove .md extension from filename', () => {
      const filename = 'my-project.md';
      const content = `---
id: my-project
title: My Project
year: 2024
technologies: [TypeScript]
---

Content`;

      const result = PortfolioParser.parseProject(filename, content);

      // ID comes from frontmatter, not filename
      expect(result.id).toBe('my-project');
    });
  });

  describe('getIdFromFilename', () => {
    it('should extract ID from filename', () => {
      expect(PortfolioParser.getIdFromFilename('inventing-hardware-software.md')).toBe(
        'inventing-hardware-software'
      );
    });

    it('should remove .md extension', () => {
      expect(PortfolioParser.getIdFromFilename('project.md')).toBe('project');
    });

    it('should handle filename without extension', () => {
      expect(PortfolioParser.getIdFromFilename('project')).toBe('project');
    });

    it('should handle hyphens in filename', () => {
      expect(PortfolioParser.getIdFromFilename('my-cool-project.md')).toBe('my-cool-project');
    });
  });
});
