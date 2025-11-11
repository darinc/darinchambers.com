import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { sampleBlogPost, simpleBlogPost, readmeContent } from '../fixtures/integration-data';
import {
  setupCompleteTerminal,
  teardownIntegrationTest,
  executeCommandAndWait,
  getLastOutputLine,
  setupMockLocalStorage,
  type IntegrationTestContext,
} from '../helpers/integration-helpers';

describe('Pipeline Execution Integration', () => {
  let context: IntegrationTestContext;

  beforeEach(() => {
    setupMockLocalStorage();
    context = setupCompleteTerminal();

    // Add test files to filesystem
    context.fileSystem.writeFile('/home/darin/test.md', simpleBlogPost);
    context.fileSystem.writeFile('/home/darin/blog-test.md', sampleBlogPost);
    context.fileSystem.writeFile('/home/darin/readme.md', readmeContent);
  });

  afterEach(() => {
    teardownIntegrationTest();
    vi.clearAllMocks();
  });

  describe('Simple Pipelines', () => {
    it('should execute simple pipe: echo | cat', async () => {
      await executeCommandAndWait(context.terminal, 'echo "hello" | cat');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      expect(output?.textContent).toContain('hello');
    });

    it('should pass data through pipe', async () => {
      await executeCommandAndWait(context.terminal, 'echo "test data" | echo');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Second echo should receive stdin
      expect(output?.textContent).toContain('test data');
    });

    it('should pipe file content to render', async () => {
      await executeCommandAndWait(context.terminal, 'cat /home/darin/test.md | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should render markdown
      expect(output?.innerHTML).toContain('<h1');
      expect(output?.innerHTML).toContain('Simple Post');
    });
  });

  describe('Multi-Stage Pipelines', () => {
    it('should execute three-stage pipeline', async () => {
      await executeCommandAndWait(context.terminal, 'echo "# Title" | cat | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should render markdown heading
      expect(output?.innerHTML).toMatch(/<h1[^>]*>Title<\/h1>/);
    });

    it('should pass data through multiple stages', async () => {
      // Create a test file
      context.fileSystem.writeFile('/home/darin/multi-pipe.txt', 'test content');

      await executeCommandAndWait(context.terminal, 'cat /home/darin/multi-pipe.txt | echo | cat');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('test content');
    });

    it('should handle complex markdown through pipeline', async () => {
      await executeCommandAndWait(context.terminal, 'cat /home/darin/blog-test.md | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should render blog post with formatting
      expect(output?.innerHTML).toContain('<h1');
      expect(output?.innerHTML).toContain('Integration Test Blog Post');
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('<em>');
    });
  });

  describe('Pipeline Data Flow', () => {
    it('should preserve text content through pipeline', async () => {
      const testText = 'preserve this exact text';
      await executeCommandAndWait(context.terminal, `echo "${testText}" | cat`);

      const output = getLastOutputLine();
      expect(output?.textContent).toContain(testText);
    });

    it('should handle multiline content in pipeline', async () => {
      const multiline = `Line 1
Line 2
Line 3`;
      context.fileSystem.writeFile('/home/darin/multiline.txt', multiline);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/multiline.txt | cat');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('Line 1');
      expect(output?.textContent).toContain('Line 2');
      expect(output?.textContent).toContain('Line 3');
    });

    it('should handle empty stdin in pipeline', async () => {
      await executeCommandAndWait(context.terminal, 'echo "" | cat');

      // Should not crash, may produce empty output
      const output = getLastOutputLine();
      expect(output).toBeTruthy();
    });

    it('should transform content through pipeline stages', async () => {
      // Write markdown that will be transformed
      const markdown = '**Bold** and *italic*';
      context.fileSystem.writeFile('/home/darin/transform.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/transform.md | render');

      const output = getLastOutputLine();
      // Should contain HTML tags
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('<em>');
    });
  });

  describe('Pipeline Error Handling', () => {
    it('should stop pipeline on first command error', async () => {
      await executeCommandAndWait(context.terminal, 'cat /nonexistent.txt | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should show error from cat command
      expect(output?.textContent).toMatch(/not found|no such file/i);
      // Should not attempt to render
      expect(output?.innerHTML).not.toContain('<h1');
    });

    it('should handle error in middle of pipeline', async () => {
      await executeCommandAndWait(context.terminal, 'echo "test" | invalidcommand | cat');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should show error about invalid command
      expect(output?.textContent).toMatch(/not found|unknown command/i);
    });

    it('should handle error in last stage of pipeline', async () => {
      await executeCommandAndWait(context.terminal, 'echo "test" | cat | invalidcommand');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should show error about invalid command
      expect(output?.textContent).toMatch(/not found|unknown command/i);
    });

    it('should recover from pipeline error', async () => {
      // Execute failing pipeline
      await executeCommandAndWait(context.terminal, 'cat /missing.txt | render');

      // Execute successful command after error
      await executeCommandAndWait(context.terminal, 'echo "recovery test"');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('recovery test');
    });
  });

  describe('Pipeline with Special Commands', () => {
    it('should pipe to render command', async () => {
      await executeCommandAndWait(context.terminal, 'echo "# Heading" | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<h1[^>]*>Heading<\/h1>/);
    });

    it('should handle render command with code blocks', async () => {
      const markdown = '```javascript\nconst x = 1;\n```';
      context.fileSystem.writeFile('/home/darin/code.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/code.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<pre><code/);
      expect(output?.innerHTML).toContain('const x = 1');
    });

    it('should handle render command with lists', async () => {
      const markdown = '- Item 1\n- Item 2\n- Item 3';
      context.fileSystem.writeFile('/home/darin/list.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/list.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<ul');
      expect(output?.innerHTML).toContain('<li');
      expect(output?.innerHTML).toContain('Item 1');
    });

    it('should handle render command with links', async () => {
      const markdown = '[Link Text](https://example.com)';
      context.fileSystem.writeFile('/home/darin/link.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/link.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<a[^>]*href="https:\/\/example\.com"/);
      expect(output?.innerHTML).toContain('Link Text');
    });
  });

  describe('Pipeline with Filesystem Commands', () => {
    it('should pipe cat output to another command', async () => {
      context.fileSystem.writeFile('/home/darin/data.txt', 'file content');

      await executeCommandAndWait(context.terminal, 'cat /home/darin/data.txt | cat');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('file content');
    });

    it('should pipe file content after cd', async () => {
      context.fileSystem.writeFile('/home/darin/documents/doc.txt', 'document content');

      await executeCommandAndWait(context.terminal, 'cd /home/darin/documents');
      await executeCommandAndWait(context.terminal, 'cat doc.txt | render');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('document content');
    });

    it('should handle absolute paths in piped commands', async () => {
      context.fileSystem.writeFile('/home/darin/abs.md', '# Absolute');

      await executeCommandAndWait(context.terminal, 'cat /home/darin/abs.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<h1');
      expect(output?.innerHTML).toContain('Absolute');
    });
  });

  describe('Pipeline with Environment Variables', () => {
    it('should expand variables in piped commands', async () => {
      context.envVarManager.setVariable('TESTVAR', 'variable value');

      await executeCommandAndWait(context.terminal, 'echo $TESTVAR | cat');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('variable value');
    });

    it('should expand PWD in piped commands', async () => {
      await executeCommandAndWait(context.terminal, 'echo $PWD | cat');

      const output = getLastOutputLine();
      expect(output?.textContent).toMatch(/\/home\/darin/);
    });

    it('should expand variables in each stage of pipeline', async () => {
      context.envVarManager.setVariable('VAR1', 'test');

      await executeCommandAndWait(context.terminal, 'echo $VAR1 | echo | cat');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('test');
    });
  });

  describe('Pipeline with Aliases', () => {
    it('should resolve alias in pipeline', async () => {
      context.aliasManager.setAlias('ll', 'ls -alh');

      // Note: ll produces output, so piping to cat should work
      await executeCommandAndWait(context.terminal, 'll | cat');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
    });

    it('should resolve alias in second stage of pipeline', async () => {
      context.aliasManager.setAlias('showdata', 'cat');

      context.fileSystem.writeFile('/home/darin/data.txt', 'test data');

      await executeCommandAndWait(context.terminal, 'cat /home/darin/data.txt | showdata');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('test data');
    });
  });

  describe('Complex Pipeline Scenarios', () => {
    it('should handle blog post rendering pipeline', async () => {
      // Simulate typical blog workflow: cat blog post | render
      await executeCommandAndWait(context.terminal, 'cat /home/darin/blog-test.md | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should have heading
      expect(output?.innerHTML).toMatch(/<h1[^>]*>/);
      // Should have formatted text
      expect(output?.innerHTML).toContain('<strong>');
      // Should have code blocks
      expect(output?.innerHTML).toMatch(/<pre><code/);
      // Should have lists
      expect(output?.innerHTML).toContain('<li>');
    });

    it('should handle readme rendering pipeline', async () => {
      await executeCommandAndWait(context.terminal, 'cat /home/darin/readme.md | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      expect(output?.innerHTML).toContain("Darin's Terminal");
    });

    it('should handle markdown with frontmatter in pipeline', async () => {
      // Blog post has frontmatter
      await executeCommandAndWait(context.terminal, 'cat /home/darin/blog-test.md | render');

      const output = getLastOutputLine();
      // Frontmatter should be parsed and removed from output
      expect(output?.innerHTML).not.toContain('---');
      expect(output?.innerHTML).not.toContain('title:');
      // Content should be rendered
      expect(output?.innerHTML).toContain('Integration Test Blog Post');
    });

    it('should handle multiple file reads piped to render', async () => {
      // First file
      await executeCommandAndWait(context.terminal, 'cat /home/darin/test.md | render');
      const output1 = getLastOutputLine();
      expect(output1?.innerHTML).toContain('Simple Post');

      // Second file
      await executeCommandAndWait(context.terminal, 'cat /home/darin/blog-test.md | render');
      const output2 = getLastOutputLine();
      expect(output2?.innerHTML).toContain('Integration Test Blog Post');
    });
  });

  describe('Pipeline Output Types', () => {
    it('should handle text output in pipeline', async () => {
      await executeCommandAndWait(context.terminal, 'echo "plain text" | cat');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('plain text');
      // Should not have HTML tags
      expect(output?.innerHTML).not.toMatch(/<h1|<strong|<em/);
    });

    it('should handle HTML output in pipeline', async () => {
      await executeCommandAndWait(context.terminal, 'echo "**bold**" | render');

      const output = getLastOutputLine();
      // Should have HTML tags
      expect(output?.innerHTML).toContain('<strong>');
    });

    it('should preserve output type through pipeline', async () => {
      // Render produces HTML
      await executeCommandAndWait(context.terminal, 'echo "# Title" | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<h1[^>]*>Title<\/h1>/);
    });
  });

  describe('Pipeline Performance', () => {
    it('should handle large content through pipeline', async () => {
      // Create large content
      const largeContent = '# Large Content\n\n' + 'Lorem ipsum. '.repeat(1000);
      context.fileSystem.writeFile('/home/darin/large.md', largeContent);

      await executeCommandAndWait(
        context.terminal,
        'cat /home/darin/large.md | render',
        200 // Longer timeout for large content
      );

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      expect(output?.innerHTML).toContain('Large Content');
    });

    it('should handle multiple pipelines in sequence', async () => {
      for (let i = 0; i < 5; i++) {
        await executeCommandAndWait(context.terminal, `echo "test ${i}" | cat`);
      }

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('test 4');
    });
  });
});
