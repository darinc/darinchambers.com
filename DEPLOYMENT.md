# Deployment Guide

## Overview

This application deploys to **GitHub Pages** with automatic deployments on push to `main`.

**Features:**

- Global CDN with automatic HTTPS
- Custom domain support
- Automatic deployments via GitHub Actions

**Deployment Flow:**

```
Git Push → GitHub Actions → Build → Deploy to gh-pages branch → GitHub Pages CDN
```

---

## Setup

### 1. Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Set source to `gh-pages` branch, `/ (root)` folder
3. Save

### 2. Configure Custom Domain

**In GitHub:**

1. **Settings** → **Pages** → **Custom domain**
2. Enter: `darinchambers.com`
3. Check **Enforce HTTPS**

**DNS Records:**

| Type  | Name | Value            | TTL  |
| ----- | ---- | ---------------- | ---- |
| A     | @    | 185.199.108.153  | 3600 |
| A     | @    | 185.199.109.153  | 3600 |
| A     | @    | 185.199.110.153  | 3600 |
| A     | @    | 185.199.111.153  | 3600 |
| CNAME | www  | darinc.github.io | 3600 |

---

## Deployment

### Automatic Deployment

Push to `main` branch triggers automatic deployment:

```bash
git push origin main
```

Build time: ~2-3 minutes

### Manual Deployment

Deploy without pushing to GitHub:

```bash
pnpm deploy
```

---

## SPA Routing

GitHub Pages doesn't support server-side redirects. The app uses:

1. **404.html**: Captures unknown routes, saves to sessionStorage
2. **Router**: Reads sessionStorage on load and navigates to correct route

This enables direct navigation to routes like `/blog` or `/portfolio`.

---

## Build Configuration

**Build command:** `pnpm build`

**Output:** `dist/` directory

**Process:**

1. TypeScript compilation (type checking)
2. Vite build (bundle and minify)
3. Output: ~121KB total (110KB JS, 11KB CSS)

**Vite Config:**

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
```

**Browser Support:** Chrome 107+, Firefox 104+, Safari 16+

---

## Troubleshooting

### 404 on Routes

**Symptom:** Direct navigation to `/about` returns 404

**Solution:** Verify `public/404.html` and `public/CNAME` exist

### Blank Page After Deploy

**Solution:**

1. Check browser console for errors
2. Test locally: `pnpm build && pnpm preview`
3. Verify all assets loaded correctly

### Build Failures

**Check locally:**

```bash
pnpm type-check  # TypeScript errors
pnpm build       # Build errors
```

---

## Deployment Checklist

Before deploying to production:

- [ ] All tests pass (`pnpm test:run`)
- [ ] Build succeeds locally (`pnpm build`)
- [ ] No console errors
- [ ] Version bumped in `package.json`
- [ ] `CHANGELOG.md` updated

---

**Last Updated**: November 23, 2025
**Platform**: GitHub Pages
**Build Tool**: Vite 7.2.1
**Node.js**: 20.x
