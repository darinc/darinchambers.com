# Security Policy

## Table of Contents

1. [Supported Versions](#supported-versions)
2. [Security Features](#security-features)
3. [Reporting Vulnerabilities](#reporting-vulnerabilities)
4. [Security Best Practices](#security-best-practices)
5. [Dependency Security](#dependency-security)
6. [Known Security Considerations](#known-security-considerations)

---

## Supported Versions

| Version         | Supported | Status             |
| --------------- | --------- | ------------------ |
| 0.0.x (current) | ✅ Yes    | Active development |
| < 0.0.50        | ❌ No     | Legacy versions    |

**Note**: Once version 1.0.0 is released, security patches will only be provided for the latest minor version.

---

## Security Features

This application implements multiple layers of security protection:

### 1. XSS (Cross-Site Scripting) Protection

#### Layer 1: HTML Escaping

**Location**: `src/utils/htmlEscape.ts`

All user-generated content is HTML-escaped before processing:

```typescript
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

#### Layer 2: DOMPurify Sanitization

**Library**: `dompurify@3.3.0`
**Location**: `src/utils/sanitizeHtml.ts`

All HTML is sanitized before rendering:

```typescript
import DOMPurify from 'dompurify';

function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'code', 'pre', 'a', 'ul', 'ol', 'li', 'strong', 'em'],
    ALLOWED_ATTR: ['href', 'class', 'id'],
  });
}
```

#### Layer 3: Content Security Policy (CSP)

**Location**: `index.html` + `public/_headers`

Strict CSP prevents execution of inline scripts:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests
```

**Protection Against**:

- Inline script execution
- eval() usage
- Unsafe dynamic code execution
- Loading scripts from external domains

#### Layer 4: Event Delegation

**Implementation**: No inline event handlers

All events use data attributes and delegation:

```html
<!-- ✅ Safe -->
<button data-command="help">Help</button>

<!-- ❌ Unsafe (not used) -->
<button onclick="executeCommand('help')">Help</button>
```

### 2. Command Injection Protection

**Status**: ✅ **NOT VULNERABLE**

- No shell commands are executed
- All commands are TypeScript implementations
- No `eval()`, `Function()`, or `child_process` usage
- Sandboxed virtual environment

### 3. localStorage Security

**Validation**: All localStorage data is validated before use

```typescript
// Settings validation
if (!parsed.theme || !parsed.font || !parsed.effects || !parsed.prompt) {
  console.warn('Invalid settings structure, using defaults');
  return null;
}

// Environment variable validation
if (!/^[A-Z_][A-Z0-9_]*$/i.test(name)) {
  throw new Error('Invalid variable name');
}
```

**Data Stored**:

- User settings (themes, fonts, preferences)
- Environment variables
- No sensitive data (passwords, tokens, PII)

### 4. Additional Security Headers

Configured in `public/_headers`:

```
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### 5. Dependency Security

- **Zero known vulnerabilities** (last audit: November 2025)
- Regular `npm audit` checks
- Minimal dependency footprint (5 production dependencies)
- All dependencies from trusted sources (npm registry)

---

## Reporting Vulnerabilities

### How to Report

**⚠️ Please DO NOT open a public GitHub issue for security vulnerabilities.**

Instead, report security vulnerabilities privately:

1. **Email**: Send details to [security contact - add your email here]
2. **Subject**: "Security Vulnerability: Terminal Portfolio"
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
   - Your contact information

### What to Expect

| Timeline | Action                         |
| -------- | ------------------------------ |
| 24 hours | Acknowledgment of report       |
| 48 hours | Initial assessment             |
| 7 days   | Detailed response and timeline |
| 30 days  | Fix implemented and deployed   |

### Responsible Disclosure

We follow responsible disclosure practices:

1. **Report received**: We acknowledge and assess
2. **Fix developed**: We create and test a patch
3. **Fix deployed**: We deploy to production
4. **Public disclosure**: After fix is live (coordinated with reporter)
5. **Credit given**: Reporter acknowledged in CHANGELOG (if desired)

### Bug Bounty

Currently, we do not offer a bug bounty program. However:

- Security reporters will be credited in release notes
- Significant findings will be acknowledged publicly
- We appreciate all responsible disclosures

---

## Security Best Practices

### For Users

1. **Use modern browsers**: Keep browser updated for latest security patches
2. **Be cautious with custom commands**: Don't execute commands from untrusted sources
3. **HTTPS only**: Always access via `https://darinchambers.com`
4. **Clear data**: Use "settings reset" to clear all stored data

### For Contributors

1. **Never use eval()**: Avoid dynamic code execution
2. **Validate all inputs**: Check user inputs before processing
3. **Sanitize outputs**: Use `sanitizeHtml()` for HTML rendering
4. **Test security**: Add tests for XSS/injection attempts
5. **Review dependencies**: Check new dependencies for vulnerabilities
6. **No secrets in code**: Never commit API keys, passwords, or tokens

### Code Review Checklist

Before merging PRs, verify:

- [ ] No `eval()` or `Function()` usage
- [ ] No inline event handlers (`onclick`, etc.)
- [ ] All HTML sanitized with DOMPurify
- [ ] Input validation present
- [ ] No sensitive data in localStorage
- [ ] CSP compliance maintained
- [ ] Security tests added/passing

---

## Dependency Security

### Current Security Scan

```bash
npm audit

# Result (as of November 2025):
# 0 vulnerabilities (0 low, 0 moderate, 0 high, 0 critical)
```

### Production Dependencies

| Package          | Version | Security Notes                       |
| ---------------- | ------- | ------------------------------------ |
| marked           | 16.4.1  | ✅ No known vulnerabilities          |
| figlet           | 1.9.3   | ✅ No known vulnerabilities          |
| dompurify        | 3.3.0   | ✅ Security library (XSS protection) |
| @types/marked    | 5.0.2   | ✅ Type definitions only             |
| @types/dompurify | 3.0.5   | ✅ Type definitions only             |

### Security Update Policy

1. **Critical vulnerabilities**: Patched within 24 hours
2. **High vulnerabilities**: Patched within 7 days
3. **Medium/Low vulnerabilities**: Patched in next release
4. **Regular audits**: Weekly `npm audit` checks

### Automated Monitoring

Consider enabling:

- **GitHub Dependabot**: Automatic dependency updates
- **Snyk**: Continuous security monitoring
- **npm audit**: CI/CD pipeline integration

---

## Known Security Considerations

### 1. Client-Side Storage

**Risk**: localStorage data can be accessed by user

**Mitigation**:

- No sensitive data stored
- Only user preferences and content
- All data validated on read

**Recommendation**: Users should not store sensitive information in environment variables or settings.

### 2. CSS `unsafe-inline`

**Risk**: CSP allows inline styles via `'unsafe-inline'`

**Reason**: Required for CSS custom properties (--terminal-fg, etc.)

**Mitigation**:

- No user-controlled CSS
- All styles are hardcoded
- Inline event handlers still blocked

**Future**: Consider refactoring to eliminate `'unsafe-inline'`

### 3. Virtual File System

**Risk**: User can read all virtual files

**Mitigation**:

- All content is public (portfolio/blog)
- No sensitive files in virtual filesystem
- No real file system access

**Impact**: Low (by design)

### 4. Command History

**Risk**: Command history stored in memory (session only)

**Mitigation**:

- Cleared on page refresh
- Not persisted to storage
- No sensitive commands executed

**Recommendation**: Users should not type sensitive data into terminal

---

## Security Testing

### Test Coverage

Security-specific tests: **49 tests passing**

```
tests/security/
├── xss.test.ts (27 tests)
└── csp.test.ts (22 tests)
```

### Test Scenarios

**XSS Protection Tests**:

- Script tag injection
- Event handler injection
- JavaScript URL injection
- HTML attribute injection
- Markdown rendering safety
- mXSS attacks

**CSP Compliance Tests**:

- Inline script blocking
- External script blocking
- eval() blocking
- Unsafe-inline style handling

### Running Security Tests

```bash
# Run all security tests
npm run test:run tests/security/

# Generate coverage report
npm run test:coverage -- tests/security/
```

---

## Incident Response Plan

In case of a security incident:

### 1. Detection

- User reports
- Automated monitoring alerts
- Security audit findings

### 2. Assessment

- Determine severity (Critical/High/Medium/Low)
- Identify affected versions
- Assess potential impact

### 3. Containment

- Take down affected features (if critical)
- Disable vulnerable endpoints
- Deploy temporary mitigations

### 4. Resolution

- Develop and test fix
- Deploy patch to production
- Verify fix effectiveness

### 5. Communication

- Notify affected users (if applicable)
- Update CHANGELOG.md
- Public disclosure (after fix)
- Post-mortem analysis

---

## Security Contact

**Email**: [Add your security contact email]
**Response Time**: Within 24 hours
**Encryption**: PGP key available upon request

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy Guide](https://content-security-policy.com/)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Cloudflare Security Best Practices](https://developers.cloudflare.com/fundamentals/basic-tasks/protect-your-origin-server/)

---

## Acknowledgments

We would like to thank the security researchers and contributors who have helped improve the security of this project.

**Hall of Fame**:

- [Future security reporters will be listed here]

---

**Last Updated**: November 6, 2025
**Security Policy Version**: 1.0
**Next Review**: January 2026

---

## Security Checklist for New Features

Use this checklist when adding new features:

- [ ] No `eval()` or dynamic code execution
- [ ] All user inputs validated
- [ ] All outputs sanitized (DOMPurify)
- [ ] No inline event handlers
- [ ] CSP compliance verified
- [ ] Security tests added
- [ ] No sensitive data in storage
- [ ] Dependencies scanned for vulnerabilities
- [ ] Code review completed
- [ ] Documentation updated

---

Thank you for helping keep this project secure! 🔒
