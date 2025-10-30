import { describe, it, expect, beforeEach } from 'vitest';
import { ParseContext } from '../../../../src/utils/markdown/ParseContext';

describe('ParseContext', () => {
  let context: ParseContext;

  beforeEach(() => {
    context = new ParseContext();
  });

  describe('HTML Accumulation', () => {
    it('should accumulate HTML lines', () => {
      context.addHtml('<p>Line 1</p>');
      context.addHtml('<p>Line 2</p>');
      context.addHtml('<p>Line 3</p>');

      const result = context.getHtml();
      expect(result).toBe('<p>Line 1</p>\n<p>Line 2</p>\n<p>Line 3</p>');
    });

    it('should join with newlines on getHtml()', () => {
      context.addHtml('<h1>Title</h1>');
      context.addHtml('<p>Content</p>');

      const result = context.getHtml();
      expect(result).toContain('\n');
      expect(result.split('\n')).toHaveLength(2);
    });

    it('should handle empty context', () => {
      const result = context.getHtml();
      expect(result).toBe('');
    });

    it('should handle single HTML line', () => {
      context.addHtml('<div>Only one</div>');
      expect(context.getHtml()).toBe('<div>Only one</div>');
    });
  });

  describe('State Management', () => {
    it('should initialize to normal state', () => {
      expect(context.getState()).toBe('normal');
    });

    it('should transition to code_block state', () => {
      context.setState('code_block');
      expect(context.getState()).toBe('code_block');
    });

    it('should transition to list state', () => {
      context.setState('list');
      expect(context.getState()).toBe('list');
    });

    it('should transition back to normal state', () => {
      context.setState('code_block');
      context.setState('normal');
      expect(context.getState()).toBe('normal');
    });

    it('should allow state transitions in any order', () => {
      context.setState('list');
      expect(context.getState()).toBe('list');

      context.setState('code_block');
      expect(context.getState()).toBe('code_block');

      context.setState('normal');
      expect(context.getState()).toBe('normal');
    });
  });

  describe('List Management', () => {
    it('should accumulate list items', () => {
      context.setListType('ul');
      context.addListItem('<li>Item 1</li>');
      context.addListItem('<li>Item 2</li>');
      context.addListItem('<li>Item 3</li>');

      // Items should be accumulated but not yet flushed
      expect(context.getHtml()).toBe('');
    });

    it('should flush unordered list correctly', () => {
      context.setListType('ul');
      context.addListItem('<li>Item 1</li>');
      context.addListItem('<li>Item 2</li>');
      context.flushList();

      const result = context.getHtml();
      expect(result).toBe('<ul><li>Item 1</li><li>Item 2</li></ul>');
    });

    it('should flush ordered list correctly', () => {
      context.setListType('ol');
      context.addListItem('<li>First</li>');
      context.addListItem('<li>Second</li>');
      context.addListItem('<li>Third</li>');
      context.flushList();

      const result = context.getHtml();
      expect(result).toBe('<ol><li>First</li><li>Second</li><li>Third</li></ol>');
    });

    it('should clear items after flush', () => {
      context.setListType('ul');
      context.addListItem('<li>Item 1</li>');
      context.flushList();

      // Add more items after flush
      context.setListType('ul');
      context.addListItem('<li>Item 2</li>');
      context.flushList();

      const result = context.getHtml();
      // Each flush creates a separate list
      expect(result).toBe('<ul><li>Item 1</li></ul>\n<ul><li>Item 2</li></ul>');
    });

    it('should reset list type after flush', () => {
      context.setListType('ul');
      context.addListItem('<li>Item</li>');
      context.flushList();

      expect(context.getListType()).toBeNull();
    });

    it('should handle empty list flush as no-op', () => {
      context.setListType('ul');
      context.flushList();

      expect(context.getHtml()).toBe('');
      // Note: listType is only reset when there are items to flush
      expect(context.getListType()).toBe('ul');
    });

    it('should handle list type switching', () => {
      context.setListType('ul');
      expect(context.getListType()).toBe('ul');

      context.setListType('ol');
      expect(context.getListType()).toBe('ol');
    });

    it('should return null for initial list type', () => {
      expect(context.getListType()).toBeNull();
    });
  });

  describe('Code Block Management', () => {
    it('should accumulate code lines', () => {
      context.addCodeLine('function hello() {');
      context.addCodeLine('  return "world";');
      context.addCodeLine('}');

      // Code should be accumulated but not yet flushed
      expect(context.getHtml()).toBe('');
    });

    it('should preserve original spacing in code', () => {
      context.addCodeLine('  indented line');
      context.addCodeLine('    double indent');
      context.addCodeLine('no indent');
      context.flushCodeBlock();

      const result = context.getHtml();
      expect(result).toContain('  indented line');
      expect(result).toContain('    double indent');
      expect(result).toContain('no indent');
    });

    it('should escape HTML in code blocks', () => {
      context.addCodeLine('<script>alert("xss")</script>');
      context.addCodeLine('& < > " \'');
      context.flushCodeBlock();

      const result = context.getHtml();
      expect(result).toContain('&lt;script&gt;');
      expect(result).toContain('&amp; &lt; &gt; &quot; &#039;');
      expect(result).not.toContain('<script>');
    });

    it('should join lines with newlines', () => {
      context.addCodeLine('line 1');
      context.addCodeLine('line 2');
      context.addCodeLine('line 3');
      context.flushCodeBlock();

      const result = context.getHtml();
      expect(result).toContain('line 1\nline 2\nline 3');
    });

    it('should wrap in <pre><code> tags', () => {
      context.addCodeLine('const x = 1;');
      context.flushCodeBlock();

      const result = context.getHtml();
      expect(result).toBe('<pre><code>const x = 1;</code></pre>');
    });

    it('should clear lines after flush', () => {
      context.addCodeLine('block 1');
      context.flushCodeBlock();

      context.addCodeLine('block 2');
      context.flushCodeBlock();

      const result = context.getHtml();
      const blocks = result.split('\n');
      expect(blocks).toHaveLength(2);
      expect(blocks[0]).toBe('<pre><code>block 1</code></pre>');
      expect(blocks[1]).toBe('<pre><code>block 2</code></pre>');
    });

    it('should handle empty code block flush as no-op', () => {
      context.flushCodeBlock();
      expect(context.getHtml()).toBe('');
    });

    it('should handle single-line code blocks', () => {
      context.addCodeLine('single line');
      context.flushCodeBlock();

      expect(context.getHtml()).toBe('<pre><code>single line</code></pre>');
    });
  });

  describe('Mixed Operations', () => {
    it('should handle interleaved HTML, lists, and code', () => {
      context.addHtml('<h1>Title</h1>');

      context.setListType('ul');
      context.addListItem('<li>Item</li>');
      context.flushList();

      context.addCodeLine('code here');
      context.flushCodeBlock();

      context.addHtml('<p>Paragraph</p>');

      const result = context.getHtml();
      const lines = result.split('\n');
      expect(lines[0]).toBe('<h1>Title</h1>');
      expect(lines[1]).toBe('<ul><li>Item</li></ul>');
      expect(lines[2]).toBe('<pre><code>code here</code></pre>');
      expect(lines[3]).toBe('<p>Paragraph</p>');
    });

    it('should accumulate HTML across state changes', () => {
      context.setState('normal');
      context.addHtml('<p>Para 1</p>');

      context.setState('list');
      context.setListType('ul');
      context.addListItem('<li>List item</li>');
      context.flushList();

      context.setState('normal');
      context.addHtml('<p>Para 2</p>');

      const result = context.getHtml();
      expect(result).toContain('<p>Para 1</p>');
      expect(result).toContain('<ul>');
      expect(result).toContain('<p>Para 2</p>');
    });
  });
});
