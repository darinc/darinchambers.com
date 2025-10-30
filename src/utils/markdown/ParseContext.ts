import { escapeHtml } from './htmlEscape';

export class ParseContext {
  private htmlLines: string[] = [];
  private state: 'normal' | 'code_block' | 'list' = 'normal';
  private listType: 'ul' | 'ol' | null = null;
  private listItems: string[] = [];
  private codeBlockLines: string[] = [];

  addHtml(html: string): void {
    this.htmlLines.push(html);
  }

  getHtml(): string {
    return this.htmlLines.join('\n');
  }

  setState(state: 'normal' | 'code_block' | 'list'): void {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }

  // List management
  setListType(type: 'ul' | 'ol'): void {
    this.listType = type;
  }

  getListType(): 'ul' | 'ol' | null {
    return this.listType;
  }

  addListItem(item: string): void {
    this.listItems.push(item);
  }

  flushList(): void {
    if (this.listItems.length > 0 && this.listType) {
      const listHtml = `<${this.listType}>${this.listItems.join('')}</${this.listType}>`;
      this.addHtml(listHtml);
      this.listItems = [];
      this.listType = null;
    }
  }

  // Code block management
  addCodeLine(line: string): void {
    this.codeBlockLines.push(line);
  }

  flushCodeBlock(): void {
    if (this.codeBlockLines.length > 0) {
      const escaped = this.codeBlockLines
        .map(line => escapeHtml(line))
        .join('\n');
      this.addHtml(`<pre><code>${escaped}</code></pre>`);
      this.codeBlockLines = [];
    }
  }
}
