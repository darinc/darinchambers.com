# Make It Your Own

This repo is MIT-licensed — you're welcome to fork it into your own terminal
portfolio. This guide shows how to make it yours.

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

Almost everything is driven by one file: **`src/site.config.json`**. Edit it and the
display name, terminal username, domain, email, social links, tagline, and default
theme update everywhere — the app, the SEO/meta build, and the deploy — with no other
code changes. A regression test (`tests/unit/site-config-integrity.test.ts`) plus the
full suite enforce this, so `pnpm validate` stays green after you change it.

```jsonc
{
  // Terminal/Unix username → /home/<username>, the prompt, $USER / $HOME.
  // Renaming this is safe: the suite + the integrity guard prove nothing hardcodes it.
  "username": "darin",
  "name": "Darin Chambers", // display name → page titles, meta tags, JSON-LD
  "tagline": "Technologist, Inventor | ...", // under the header + in meta descriptions
  "domain": "darinchambers.com", // prompt host + public/CNAME (keep them in sync)
  "siteUrl": "https://darinchambers.com", // canonical URL, sitemap, OG/Twitter, robots
  "email": "hello@darinchambers.com",
  "social": {
    "github": "https://github.com/your-handle", // full profile URLs, not bare handles
    "linkedin": "https://www.linkedin.com/in/your-handle",
  },
  "defaultTheme": "dc", // which built-in theme loads first
}
```

After editing, run `pnpm validate` to confirm everything still passes, then
`pnpm build` to regenerate the static SEO pages from your new values.

### The short list of things that live outside the config

A few values genuinely can't read the config — npm/DNS metadata can't import a
module, and image bytes or bespoke art aren't a string substitution. Change these
by hand:

| What                   | Where                                                                                            | Why it's separate                                                                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Custom domain (DNS)    | `public/CNAME`                                                                                   | GitHub reads this file directly. Keep it equal to `domain`. **No custom domain?** Delete `public/CNAME` — a `username.github.io/<repo>` fork must remove it, or GitHub Pages will try to claim the original author's domain. |
| npm metadata           | `package.json` — `author`, `description`, `name`                                                 | Static JSON read by tooling; it can't import a runtime module.                                                                                                                                                               |
| Favicon & social image | `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, `public/og-image.png` | Image **bytes** — replace the files in place. The config already drives their URLs.                                                                                                                                          |
| ASCII banner art       | `src/utils/AsciiArt.ts` (`generateHeader`)                                                       | Bespoke block-character art that can't be derived from your name by substitution. (The tagline rendered beneath it _is_ config-driven.) Regenerate with `figlet` if you like.                                                |
| Bio / about prose      | `src/content/about.md`, and the `BIO` line in `scripts/prerender.js`                             | Your own multi-sentence writing — authored content, not a one-liner.                                                                                                                                                         |
| Signature theme (opt.) | `src/utils/ThemeManager.ts` + the `'dc'` entry in `ThemePresetName` (`src/types/settings.ts`)    | The `dc` preset is named after the author's initials. Rename the preset id only if you want to; `defaultTheme` above just selects which preset loads.                                                                        |

---

## 3. Reset the project metadata (optional)

| File           | What to change                            |
| -------------- | ----------------------------------------- |
| `CHANGELOG.md` | clear it and start your own history       |
| `package.json` | reset `version` (e.g. to `0.1.0`)         |
| `README.md`    | the version badge and project description |

`pnpm update-docs` re-syncs the version badge and bundle-size figures in the docs
once you've made changes.

---

## 4. Verify & deploy

```bash
pnpm install
pnpm validate     # type-check + lint + format + tests (incl. the identity guard)
pnpm build        # production build into dist/ (regenerates SEO from the config)
pnpm dev          # preview locally at http://localhost:5175
```

Deployment is GitHub Pages via `.github/workflows/deploy.yml` (it runs after CI
passes). The custom domain lives only in `public/CNAME` — Vite copies it into
`dist/` and the deploy publishes it as-is. For a `username.github.io/<repo>`
project page, delete `public/CNAME` and set the Pages source to GitHub Actions.
See `DEPLOYMENT.md` for details.

---

That's it — clear, edit one config file, deploy. If you build something fun with
it, that's the whole point. 🚀
