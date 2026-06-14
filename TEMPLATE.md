# Make It Your Own

This repo is MIT-licensed — you're welcome to fork it into your own terminal
portfolio. This guide lists everything that's personalized to the original
author and exactly where to change it.

There are two steps: **clear the example content**, then **swap the identity**.

---

## 1. Clear the example content

```bash
pnpm reset-content        # shows a plan, then asks for confirmation
# pnpm reset-content --dry-run   # preview only, change nothing
# pnpm reset-content --yes       # skip the prompt
```

This deletes every example blog post, portfolio project, and note, and replaces
`about.md` / `contact.md` with neutral placeholders. It leaves `help.md` alone
(that's the built-in help text, not personal content).

Content is loaded with Vite's `import.meta.glob`, so there's no import wiring to
update — add your own markdown files and they appear automatically. See the
"Adding Blog Posts / Portfolio Projects" sections in `CLAUDE.md` for the
frontmatter formats.

---

## 2. Swap the identity

The site has a few distinct identity values. Search-and-replace is risky
(`darin` is also a substring of paths), so change them at the specific spots below.

### Display name & tagline — "Darin Chambers"

| File                    | What to change                                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `index.html`            | `<title>`, `meta[name=description]`, `meta[name=author]`, and the `og:*` / `twitter:*` title & description tags |
| `scripts/prerender.js`  | the JSON-LD `name` fields, the blog feed name, and `author`                                                     |
| `src/utils/AsciiArt.ts` | the ASCII banner shown on load (currently "DARIN CHAMBERS")                                                     |
| `package.json`          | `author`, `description`                                                                                         |

### Terminal username — `darin` (structural)

This one drives the home directory `/home/darin`, the shell prompt (`darin@…`),
and the `$USER` / `$HOME` env vars, so change all three together:

| File                                    | What to change                                                                            |
| --------------------------------------- | ----------------------------------------------------------------------------------------- |
| `src/main.ts`                           | `new EnvVarManager(fileSystem, 'darin', 'darinchambers.com')` — first arg is the username |
| `src/constants.ts`                      | `PATHS.HOME_DARIN` and every `/home/darin/...` content/config path                        |
| `src/utils/fs/FileSystemInitializer.ts` | the `darin` home directory it creates                                                     |

> Tip: this is the most involved rename — several tests assert `/home/darin` and
> `darin@…`. If you change it, update those tests (or just run `pnpm validate`,
> which will point out every mismatch). If you'd rather not, you can keep the
> internal username as-is and only change the display-facing identity below.

### Domain & site URL — `darinchambers.com`

| File                           | What to change                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------- |
| `src/main.ts`                  | `EnvVarManager(..., 'darinchambers.com')` — second arg is the prompt host               |
| `scripts/prerender.js`         | `SITE_URL`                                                                              |
| `index.html`                   | `og:url`, `twitter:url`                                                                 |
| `public/CNAME`                 | your custom domain (delete this file if you'll use a `username.github.io` page instead) |
| `public/robots.txt`            | the `Sitemap:` URL                                                                      |
| `.github/workflows/deploy.yml` | the `cname:` value                                                                      |

### Email & social links

| File                     | What to change                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `src/content/contact.md` | email (the `data-user` / `data-domain` attributes and visible text), LinkedIn, GitHub, blog link — edit after `reset-content` stubs it |
| `scripts/prerender.js`   | the JSON-LD `sameAs` array (LinkedIn / GitHub URLs)                                                                                    |

### Icons & social image

Replace these files in place (the references in `index.html` keep working):

- `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png` — the favicon set
- `public/og-image.png` — the social-share preview image

### Signature theme (optional) — `dc` / "DC"

The default theme is named after the author's initials.

| File                        | What to change                                               |
| --------------------------- | ------------------------------------------------------------ |
| `src/utils/ThemeManager.ts` | the preset `name: 'dc'`, `displayName: 'DC'`, and its colors |
| `src/types/settings.ts`     | the `'dc'` entry in the `ThemePresetName` union              |

### System-message flavor text (optional)

These novelty commands include the name/host in their output:
`src/commands/novelty/boot.ts`, `bsod.ts`, `shutdown.ts`, and
`src/commands/core/exit.ts`.

---

## 3. Reset the project metadata (optional)

| File           | What to change                               |
| -------------- | -------------------------------------------- |
| `CHANGELOG.md` | clear it and start your own history          |
| `package.json` | reset `version` (e.g. to `0.1.0`) and `name` |
| `README.md`    | the version badge and project description    |

`pnpm update-docs` re-syncs the version badge and bundle-size figures in the docs
once you've made changes.

---

## 4. Verify & deploy

```bash
pnpm install
pnpm validate     # type-check + lint + format + tests
pnpm build        # production build into dist/
pnpm dev          # preview locally at http://localhost:5175
```

Deployment is GitHub Pages via `.github/workflows/deploy.yml` (it runs after CI
passes). For a custom domain, keep `public/CNAME` and the workflow `cname:` in
sync; for a `username.github.io/repo` project page, remove the CNAME and set the
Pages source to GitHub Actions. See `DEPLOYMENT.md` for details.

---

That's it — clear, swap, deploy. If you build something fun with it, that's the
whole point. 🚀
