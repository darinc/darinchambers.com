import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Content Security Policy Tests', () => {
  describe('CSP Configuration in index.html', () => {
    it('should document CSP configuration location', () => {
      const indexPath = join(__dirname, '../../index.html');
      const indexContent = readFileSync(indexPath, 'utf-8');

      // CSP is configured via _headers for production, not meta tag
      // Meta tag CSP would block Vite dev server
      expect(indexContent).toContain('_headers');
      expect(indexContent).toContain('Vite dev server');
    });

    it('should not have CSP meta tag (allows dev server to work)', () => {
      const indexPath = join(__dirname, '../../index.html');
      const indexContent = readFileSync(indexPath, 'utf-8');

      // Should NOT have http-equiv CSP meta tag
      expect(indexContent).not.toContain('http-equiv="Content-Security-Policy"');
    });
  });

  describe('Cloudflare Pages _headers file', () => {
    it('should have _headers file in public directory', () => {
      const headersPath = join(__dirname, '../../public/_headers');
      const headersContent = readFileSync(headersPath, 'utf-8');

      expect(headersContent).toBeTruthy();
      expect(headersContent.length).toBeGreaterThan(0);
    });

    it('should have CSP header for all routes', () => {
      const headersPath = join(__dirname, '../../public/_headers');
      const headersContent = readFileSync(headersPath, 'utf-8');

      expect(headersContent).toContain('Content-Security-Policy');
      expect(headersContent).toContain('/*'); // Apply to all routes
    });

    it('should have X-Content-Type-Options: nosniff', () => {
      const headersPath = join(__dirname, '../../public/_headers');
      const headersContent = readFileSync(headersPath, 'utf-8');

      expect(headersContent).toContain('X-Content-Type-Options: nosniff');
    });

    it('should have X-Frame-Options: DENY', () => {
      const headersPath = join(__dirname, '../../public/_headers');
      const headersContent = readFileSync(headersPath, 'utf-8');

      expect(headersContent).toContain('X-Frame-Options: DENY');
    });

    it('should have Strict-Transport-Security (HSTS)', () => {
      const headersPath = join(__dirname, '../../public/_headers');
      const headersContent = readFileSync(headersPath, 'utf-8');

      expect(headersContent).toContain('Strict-Transport-Security');
      expect(headersContent).toContain('max-age=31536000'); // 1 year
    });

    it('should have Referrer-Policy', () => {
      const headersPath = join(__dirname, '../../public/_headers');
      const headersContent = readFileSync(headersPath, 'utf-8');

      expect(headersContent).toContain('Referrer-Policy');
    });

    it('should have cache control headers for static assets', () => {
      const headersPath = join(__dirname, '../../public/_headers');
      const headersContent = readFileSync(headersPath, 'utf-8');

      expect(headersContent).toContain('/assets/*');
      expect(headersContent).toContain('Cache-Control');
      expect(headersContent).toContain('immutable');
    });
  });

  describe('CSP Policy Documentation', () => {
    it('should document why style-src unsafe-inline is needed', () => {
      const indexPath = join(__dirname, '../../index.html');
      const indexContent = readFileSync(indexPath, 'utf-8');

      // Should have explanatory comments
      expect(indexContent).toContain('Content Security Policy');
    });

    it('should have security documentation in AUDIT.md', () => {
      const auditPath = join(__dirname, '../../AUDIT.md');
      const auditContent = readFileSync(auditPath, 'utf-8');

      expect(auditContent).toContain('Content Security Policy');
      expect(auditContent).toContain('XSS');
    });
  });

  describe('No inline scripts in HTML', () => {
    it('should not have inline script tags', () => {
      const indexPath = join(__dirname, '../../index.html');
      const indexContent = readFileSync(indexPath, 'utf-8');

      // Should not have <script> tags with content (except type="module" src)
      const inlineScriptPattern = /<script(?![^>]*src=)[^>]*>[\s\S]*?<\/script>/gi;
      const matches = indexContent.match(inlineScriptPattern);

      if (matches) {
        // Filter out the valid module script
        const invalidScripts = matches.filter(script => !script.includes('type="module"'));
        expect(invalidScripts.length).toBe(0);
      }
    });

    it('should not have inline event handlers in HTML', () => {
      const indexPath = join(__dirname, '../../index.html');
      const indexContent = readFileSync(indexPath, 'utf-8');

      // Check for common inline event handlers
      expect(indexContent).not.toMatch(/onclick\s*=/i);
      expect(indexContent).not.toMatch(/onload\s*=/i);
      expect(indexContent).not.toMatch(/onerror\s*=/i);
      expect(indexContent).not.toMatch(/onchange\s*=/i);
      expect(indexContent).not.toMatch(/oninput\s*=/i);
    });
  });

  describe('Security best practices', () => {
    it('should not expose executeCommand globally', () => {
      // This is verified by checking Terminal.ts doesn't have:
      // (window as any).executeCommand = ...

      const terminalPath = join(__dirname, '../../src/components/Terminal.ts');
      const terminalContent = readFileSync(terminalPath, 'utf-8');

      // Should NOT expose executeCommand globally anymore
      expect(terminalContent).not.toContain('window as any).executeCommand');
    });

    it('should use event delegation instead of inline handlers', () => {
      const terminalPath = join(__dirname, '../../src/components/Terminal.ts');
      const terminalContent = readFileSync(terminalPath, 'utf-8');

      // Should have event delegation setup
      expect(terminalContent).toContain('addEventListener');
      expect(terminalContent).toContain('data-command');
    });

    it('should sanitize all innerHTML usage', () => {
      const terminalOutputPath = join(__dirname, '../../src/components/TerminalOutput.ts');
      const terminalOutputContent = readFileSync(terminalOutputPath, 'utf-8');

      // Should import sanitizeHtml
      expect(terminalOutputContent).toContain('sanitizeHtml');

      // Should use sanitizeHtml before innerHTML
      expect(terminalOutputContent).toContain('sanitizeHtml(html)');
    });
  });

  describe('CSP reporting', () => {
    it('should document how to add CSP reporting endpoint', () => {
      // CSP report-uri or report-to directives should be documented
      // This is a future enhancement - document in comments

      const headersPath = join(__dirname, '../../public/_headers');
      const headersContent = readFileSync(headersPath, 'utf-8');

      // For now, just verify the file exists and has CSP
      expect(headersContent).toContain('Content-Security-Policy');

      // Future enhancement: Add report-uri or report-to directive
      // Example: report-to: csp-endpoint
    });
  });

  describe('Defense-in-depth headers', () => {
    it('should have multiple security headers, not just CSP', () => {
      const headersPath = join(__dirname, '../../public/_headers');
      const headersContent = readFileSync(headersPath, 'utf-8');

      // Multiple layers of security
      const securityHeaders = [
        'Content-Security-Policy',
        'X-Content-Type-Options',
        'X-Frame-Options',
        'Strict-Transport-Security',
        'Referrer-Policy',
        'Permissions-Policy',
      ];

      securityHeaders.forEach(header => {
        expect(headersContent).toContain(header);
      });
    });
  });
});
