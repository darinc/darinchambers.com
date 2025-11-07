# Deployment Guide

## Table of Contents

1. [Overview](#overview)
2. [Cloudflare Pages Setup](#cloudflare-pages-setup)
3. [Build Configuration](#build-configuration)
4. [Environment Variables](#environment-variables)
5. [Custom Domain](#custom-domain)
6. [Deployment Process](#deployment-process)
7. [Rollback Strategy](#rollback-strategy)
8. [Monitoring](#monitoring)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This application is deployed on **Cloudflare Pages**, a JAMstack platform that provides:

- **Global CDN**: Fast content delivery worldwide
- **Automatic HTTPS**: SSL certificates managed automatically
- **Git Integration**: Automatic deployments from GitHub
- **Preview Deployments**: Every PR gets a unique preview URL
- **Zero Configuration**: Works out of the box for static sites

### Deployment Flow

```
Git Push → GitHub → Cloudflare Pages → Build → Deploy → CDN
```

---

## Cloudflare Pages Setup

### Initial Setup

1. **Create Cloudflare Pages Project**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages
   - Click "Create a project"
   - Connect your GitHub account
   - Select the repository: `darinchambers/dc.com`

2. **Configure Build Settings**

   | Setting | Value |
   |---------|-------|
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/` (project root) |
   | Node.js version | `20` |

3. **Complete Setup**
   - Click "Save and Deploy"
   - Cloudflare will build and deploy your site
   - You'll receive a `*.pages.dev` URL

### Project Configuration File

While Cloudflare Pages works without configuration, you can create `wrangler.toml` for advanced settings:

```toml
name = "darinchambers-terminal"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"
cwd = "."
watch_dir = "src"

[build.upload]
format = "service-worker"
dir = "dist"
main = "./dist/index.html"

[[build.upload.rules]]
type = "CompiledWasm"
globs = ["**/*.wasm"]
fallthrough = true

[env.production]
name = "darinchambers-terminal"
route = "darinchambers.com/*"

[env.production.build]
command = "npm run build"
watch_dir = "src"
```

---

## Build Configuration

### Build Process

The build process uses **Vite** to compile TypeScript and bundle assets.

#### Build Command

```bash
npm run build
```

This runs:
1. **TypeScript compilation**: `tsc` (type checking)
2. **Vite build**: Bundle and minify
3. **Output**: `dist/` directory

#### Build Output

```
dist/
├── index.html               # Entry point
├── assets/
│   ├── index-[hash].js      # Minified JavaScript (~110KB)
│   └── index-[hash].css     # Minified CSS (~11KB)
├── favicon.ico
├── _headers                 # Cloudflare Pages headers
└── _redirects               # SPA routing configuration
```

### Vite Configuration

File: `vite.config.ts`

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,        // Disable sourcemaps for production
    target: 'es2015',        // Broad browser support
    minify: 'esbuild',       // Fast minification
    rollupOptions: {
      output: {
        manualChunks: undefined  // Single chunk (small app)
      }
    }
  },
  server: {
    port: 5173
  }
});
```

### TypeScript Configuration

File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "isolatedModules": true
  }
}
```

---

## Environment Variables

### Current Usage

This application **does not use environment variables** for production. All configuration is client-side and stored in:

- **localStorage**: User preferences (themes, settings)
- **Virtual filesystem**: Content files (markdown)

### Future Environment Variables

If you need to add environment variables:

#### In Cloudflare Pages

1. Go to your project settings
2. Navigate to "Environment variables"
3. Add variables for:
   - `VITE_API_URL` - API endpoint (if needed)
   - `VITE_ANALYTICS_ID` - Analytics tracking ID
   - `NODE_VERSION` - Force specific Node.js version

#### In Code

```typescript
// Access environment variables (Vite automatically prefixes with VITE_)
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
```

#### Local Development

Create `.env` file (gitignored):

```bash
VITE_API_URL=http://localhost:3000
VITE_ANALYTICS_ID=UA-XXXXX-X
```

---

## Custom Domain

### Setting Up Custom Domain

1. **Add Domain in Cloudflare Pages**
   - Go to your Pages project
   - Click "Custom domains"
   - Click "Set up a custom domain"
   - Enter: `darinchambers.com`

2. **DNS Configuration**

   Add the following DNS records in your domain registrar or Cloudflare DNS:

   | Type | Name | Content | Proxy Status |
   |------|------|---------|--------------|
   | CNAME | @ | `darinchambers-terminal.pages.dev` | Proxied |
   | CNAME | www | `darinchambers-terminal.pages.dev` | Proxied |

3. **SSL/TLS Configuration**
   - Cloudflare automatically provisions SSL certificates
   - Select "Full (strict)" SSL/TLS encryption mode
   - Enable "Always Use HTTPS"

4. **Verification**
   - DNS propagation may take up to 48 hours
   - Check status in Cloudflare dashboard
   - Test: `https://darinchambers.com`

### WWW Redirect

To redirect `www.darinchambers.com` → `darinchambers.com`:

1. Go to Cloudflare Dashboard → Rules → Page Rules
2. Create rule:
   - URL pattern: `www.darinchambers.com/*`
   - Setting: Forwarding URL (301 - Permanent Redirect)
   - Destination: `https://darinchambers.com/$1`

---

## Deployment Process

### Automatic Deployments

#### Production Deployment

```bash
# Merge to main branch
git checkout main
git merge feature-branch
git push origin main
```

**Triggers**: Push to `main` branch
**URL**: `https://darinchambers.com`
**Build time**: ~2 minutes

#### Preview Deployments

**Triggers**: Opening a pull request
**URL**: `https://[pr-number].darinchambers-terminal.pages.dev`
**Purpose**: Test changes before merging

### Manual Deployment

#### Via Cloudflare Dashboard

1. Go to your Pages project
2. Click "Deployments"
3. Click "Create deployment"
4. Select branch or upload files
5. Click "Deploy"

#### Via Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages publish dist
```

### Deployment Checklist

Before deploying to production:

- [ ] All tests pass (`npm run test:run`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview deployment tested
- [ ] No console errors in browser
- [ ] Responsive design verified
- [ ] Accessibility tested
- [ ] Performance metrics acceptable
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json

---

## Rollback Strategy

### Immediate Rollback

If a deployment causes issues:

1. **Via Cloudflare Dashboard**
   - Go to "Deployments"
   - Find last working deployment
   - Click "⋯" → "Rollback to this deployment"
   - Confirm rollback

2. **Via Git Revert**
   ```bash
   # Revert last commit
   git revert HEAD
   git push origin main

   # Or reset to previous commit (destructive)
   git reset --hard HEAD~1
   git push --force origin main
   ```

### Gradual Rollout

Cloudflare Pages doesn't support gradual rollouts natively. Consider:

1. **Feature flags**: Use runtime feature toggles
2. **Preview deployments**: Test thoroughly before production
3. **Canary releases**: Deploy to custom subdomain first

---

## Monitoring

### Cloudflare Analytics

Built-in analytics available:

- **Page views**: Track traffic
- **Bandwidth**: Monitor data transfer
- **Status codes**: Detect errors (404, 500)
- **Geolocation**: See visitor locations
- **Browser/device**: Understand user agents

Access: Cloudflare Dashboard → Pages → Your Project → Analytics

### Performance Monitoring

#### Lighthouse CI

Add to GitHub Actions:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          uploadArtifacts: true
```

#### Web Vitals

Add client-side monitoring:

```typescript
// src/utils/analytics.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric); // Or send to analytics service
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Error Tracking

Consider adding error tracking:

**Option 1: Sentry**
```bash
npm install @sentry/browser
```

```typescript
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "your-dsn-here",
  environment: import.meta.env.MODE
});
```

**Option 2: Custom Error Logging**
```typescript
window.addEventListener('error', (event) => {
  // Log error to service
  console.error('Global error:', event.error);
});
```

---

## Troubleshooting

### Build Failures

#### Issue: TypeScript Errors

```
Error: TS2304: Cannot find name 'X'
```

**Solution**:
```bash
# Check types locally
npx tsc --noEmit

# Fix type errors
# Update tsconfig.json if needed
```

#### Issue: Missing Dependencies

```
Error: Cannot find module 'X'
```

**Solution**:
```bash
# Verify package.json
cat package.json

# Install dependencies
npm install

# Check for typos in imports
```

#### Issue: Build Timeout

**Solution**:
- Optimize build (reduce bundle size)
- Check for infinite loops in build scripts
- Contact Cloudflare support to increase timeout

### Deployment Issues

#### Issue: 404 on Routes

**Symptom**: Direct navigation to `/about` returns 404

**Cause**: SPA routing not configured

**Solution**: Verify `public/_redirects` exists:
```
/* /index.html 200
```

#### Issue: Blank Page After Deploy

**Symptom**: Page loads but shows blank screen

**Cause**: JavaScript errors or CSP blocking scripts

**Solution**:
1. Check browser console for errors
2. Verify `_headers` file CSP configuration
3. Test locally: `npm run build && npm run preview`

#### Issue: Assets Not Loading

**Symptom**: CSS/JS not loading (CORS errors)

**Cause**: Incorrect asset paths

**Solution**:
- Verify Vite base path is `/`
- Check `vite.config.ts` base setting
- Ensure assets are in `dist/assets/`

### Performance Issues

#### Issue: Slow Initial Load

**Symptoms**: Long time to first paint

**Solutions**:
- Enable sourcemaps temporarily to debug
- Check bundle size: `npm run build` (should be ~121KB)
- Use Lighthouse to identify bottlenecks
- Consider code splitting for large features

#### Issue: Slow Route Changes

**Symptoms**: Laggy navigation

**Solutions**:
- Profile with Chrome DevTools
- Check for memory leaks
- Optimize markdown rendering
- Add output pagination

### Security Issues

#### Issue: CSP Violations

**Symptom**: Console warnings about blocked content

**Solution**:
1. Review CSP in `public/_headers`
2. Ensure no inline scripts
3. Check DOMPurify is sanitizing properly
4. Add `report-uri` to monitor violations:
   ```
   Content-Security-Policy: ...; report-uri https://your-csp-endpoint
   ```

---

## Deployment Checklist Template

Use this for each production deployment:

```markdown
## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Build succeeds locally
- [ ] Preview deployment tested
- [ ] No console errors
- [ ] Accessibility check passed
- [ ] Performance metrics acceptable
- [ ] Security headers verified
- [ ] CHANGELOG.md updated
- [ ] Version bumped

### Deployment
- [ ] PR merged to main
- [ ] Build succeeded on Cloudflare
- [ ] Production URL accessible
- [ ] All routes working
- [ ] Assets loading correctly

### Post-Deployment
- [ ] Smoke test key features
- [ ] Check analytics for errors
- [ ] Monitor first 15 minutes
- [ ] Announce in changelog
- [ ] Tag release in Git

### Rollback Plan
- [ ] Previous deployment identified
- [ ] Rollback steps documented
- [ ] Team notified if issues
```

---

## Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)

---

## Support

If you encounter deployment issues:

1. Check Cloudflare status: https://www.cloudflarestatus.com/
2. Review build logs in Cloudflare dashboard
3. Test locally with `npm run build && npm run preview`
4. Open an issue on GitHub
5. Contact Cloudflare support for platform issues

---

**Last Updated**: November 6, 2025
**Deployment Platform**: Cloudflare Pages
**Build Tool**: Vite 6.0.11
**Node.js Version**: 20.x
