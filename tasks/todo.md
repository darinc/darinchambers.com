# Plan: Repository Health Roadmap (Deep Review 2026-06-13)

Deep review across architecture, tests, build/deploy/SEO, and security/a11y.
Findings verified directly against code, CI logs, and `pnpm audit`.

## TL;DR — the one thing to know

**CI has been failing on `main` for the last several commits, but Deploy succeeds anyway.**
The two GitHub workflows run in parallel with no gate, so production ships from red CI.

- CI red cause: `ERROR: Coverage for branches (78.77%) does not meet global threshold (80%)` (vitest gate).
- Deploy (`deploy.yml`) only runs `build` → `gh-pages`; it never runs tests/lint and does not depend on CI.
- Net effect: every push to `main` deploys regardless of test/lint/coverage status.

Everything else below is real but secondary to closing that gap.

---

## Phase 0 — Production safety (do first)

- [ ] **0.1 Get CI green.** Branch coverage is 78.77% vs 80% gate. Fix by adding targeted tests
      (preferred over lowering the gate). Best ROI targets, which double as security/quality wins: - `src/utils/sanitizeHtml.ts` — 50% covered, NO dedicated test, and it's the security keystone.
      Add `tests/security/sanitizeHtml.test.ts` with real XSS payloads + the allowed-attr branches. - `src/components/Terminal.ts` (uncovered 555–644: fullscreen), `src/utils/fs` (71% branch),
      `src/utils/markdown/handlers/ListHandler.ts`, `CodeBlockHandler.ts` (7.7%).
- [ ] **0.2 Gate deploy on CI.** Either make `deploy.yml` trigger via `workflow_run` on CI success,
      or fold build+deploy into one workflow where the deploy job `needs:` the test job.
      Stops production shipping from red CI.
- [ ] **0.3 Bump `dompurify` 3.3.0 → ≥3.3.2.** It's the _only_ XSS backstop in production
      (see 0.4) and 3.3.0 has a known mXSS advisory (GHSA-h8r8-wccr-v5f2).
- [ ] **0.4 Ship a CSP to production.** GitHub Pages ignores `public/_headers` (Cloudflare/Netlify
      format), so there is currently **no CSP, HSTS, or X-Frame-Options in prod** despite SECURITY.md.
      Elegant fix: inject a `<meta http-equiv="Content-Security-Policy">` into the built HTML inside
      `scripts/prerender.js` (post-build), so the Vite dev server is unaffected (that's why the meta
      was removed from `index.html` originally). Other headers can't be set via meta on GH Pages —
      decide consciously (see Open Decisions).

## Phase 0.5 — Finish in-flight work & hygiene

- [ ] **0.5.1 Commit the blog-post swap.** Working tree replaces the Nov-16 "enterprise-grade graph
      library" post with `2025-09-20-01-building-a-minimal-production-graph-library.md` and updates the
      FileSystemInitializer test. It is self-consistent and tests pass. NOTE: blog list sorts by
      filename desc, so the new `2025-09-20` post lands at the BOTTOM (oldest). Confirm that's intended
      (see Open Decisions), then commit.
- [ ] **0.5.2 Branch cleanup.** A local `keen-zhukovsky` branch exists — delete if stale.

## Phase 1 — Accessibility (the WCAG 2.1 AA claim is currently overstated)

- [ ] **1.1 `prefers-reduced-motion`.** No support anywhere. Gate the matrix-rain / screensaver and
      the infinite CSS `matrix-glow` animation behind the media query, and provide a stop/pause.
      Auto-firing fullscreen animation = WCAG 2.2.2 (Level A) failure today.
- [ ] **1.2 Keyboard trap.** `TerminalInput.ts:32-35` swallows Tab/Shift+Tab unconditionally while the
      input is autofocused → keyboard users can't leave the input (WCAG 2.1.2, Level A). Only intercept
      when a completion candidate exists; let Tab escape otherwise.
- [ ] **1.3 Focus-visible.** Settings controls (theme buttons, checkboxes, sliders, color pickers,
      reset, `<details>`) have `outline:none` and no `:focus-visible` style (WCAG 2.4.7, Level AA).

## Phase 2 — Tech debt & elegance (high-value refactors)

- [ ] **2.1 Resolve the dead markdown renderer.** `config.ts` hardcodes `useMarkedRenderer:true`, so
      `MarkdownRenderer` + `markdown/MarkdownParser` + all chain-of-responsibility handlers are dead at
      runtime (kept alive only by tests + the flag). Delete it, or document it as an intentional
      fallback. ARCHITECTURE.md currently showcases it as a _live_ pattern — fix that either way.
- [ ] **2.2 Unify frontmatter parsing.** `BlogParser`, `PostParser`, `PortfolioParser` each reimplement
      near-identical frontmatter parsing + a verbatim-copied `getIdFromFilename`; a generic
      `markdown/FrontmatterParser` already exists but is ignored. Delegate all three to one parser.
- [ ] **2.3 Collapse the three content commands.** `blog.ts` / `portfolio.ts` / `notes.ts` (and the
      three `ContentFormatter.format*` pairs) are structurally identical apart from parser+formatter.
      A parameterized "content collection command" factory removes ~hundreds of duplicated lines.
- [ ] **2.4 Slim `Terminal.ts` (698-line god object).** Extract a `FullscreenController` (~140 lines)
      and the settings-UI change→command translation; dedupe the two execute paths.
- [ ] **2.5 Quick cleanups.** Delete unused `sanitizeHtmlCustom` export; dedupe the CommandDispatcher
      catch ladder; drop SettingsManager's 30 redundant typed accessors in favor of the generic
      `getSetting`/`setSetting`; normalize the kebab/camel settings key list.

## Phase 2 — SEO / prerender robustness

- [ ] **2.6 Make prerender fail loudly.** `injectContent`/`injectMeta` use exact-whitespace string and
      regex replacements against Vite output; if markup shifts they silently no-op and ship pages with
      NO SEO content. Assert each replacement actually matched. Wrap per-file frontmatter parsing in
      try/catch so one bad `.md` doesn't abort the whole build.
- [ ] **2.7 Fix blog ordering & slugs.** Sort blog by frontmatter `date` (filename date and frontmatter
      date already diverge: `2025-11-14-a-love-letter…` has `date: 2025-11-16`). Unify slug logic so
      blog URLs drop the `01-` sequence prefix (`/blog/01-building-a-minimal-production-graph-library`).
      Suppress the `/notes` page + sitemap entry when there are zero notes.

## Phase 3 — Documentation truth-up

- [ ] **3.1 Reconcile bundle-size claims.** Real size ≈ **118KB gzipped** (~422KB raw). Docs variously
      say 86KB / 114KB / 121KB and the "<100KB gzipped" target is violated. Pick one canonical number;
      update CLAUDE.md (lines 17, 447, 466), README, DEPLOYMENT.md, ARCHITECTURE.md. Make
      `scripts/update-docs.js` measure real gzip (`zlib.gzipSync`) instead of the `*0.28` estimate, and
      fix its stale regexes (they don't match most doc locations today).
- [ ] **3.2 Fix false security/a11y claims.** SECURITY.md "0 known vulnerabilities" is false; CLAUDE.md
      WCAG-AA + contrast claims are overstated; theme presets live in `ThemeManager.ts`, not
      `constants.ts`; dependency versions are stale. Update after Phases 0–1 actually deliver them.
- [ ] **3.3 Pin pnpm 10 in workflows.** Both workflows use `pnpm/action-setup@v4 version: 9` while the
      repo uses pnpm 10.x; `--frozen-lockfile` can break across pnpm majors.

---

## Open Decisions (need owner input)

1. **Hosting / security headers.** Stay on GitHub Pages (CSP only via `<meta>`, no HSTS/X-Frame-Options)
   vs. front with Cloudflare/Netlify (where `_headers` actually applies). Recommendation: ship CSP via
   meta now (works on GH Pages), revisit hosting later. Either way, stop documenting `_headers` as live.
2. **Blog post ordering.** The new `2025-09-20` graph-library post sorts to the bottom (oldest). Intended,
   or should it carry a current date so it shows on top?
3. **Dead markdown renderer (2.1).** Delete it, or keep as a documented fallback?

## Corrections to the review (verified false)

- An earlier scan claimed committed `.DS_Store` files in `public/`/`src/content/`. **`git ls-files`
  shows none tracked** — not an issue.

## Review

### Phase 0 — DONE & verified (2026-06-13)

- **0.1 CI green.** Branch coverage 78.77% → **81.03%** (gate is 80%). Added real, strongly-asserted
  tests to `ContentFormatter`, `PromptFormatter` (new), `FileSystemService`, `Router`. `pnpm test:coverage`
  exits 0; 1876 passing, 0 failures. Found (not fixed) a dead-code/UX quirk in `Router.getPathForCommand`
  line 296 (`portfolio --tags ` trims to `/portfolio/--tags`) — logged for Phase 2.
- **0.2 Deploy gated on CI.** `deploy.yml` now triggers via `workflow_run` on CI **success** only (+
  manual dispatch) and checks out the exact validated SHA. Production can no longer ship from red CI.
- **0.3 dompurify 3.3.0 → 3.4.10** (patches mXSS advisory). XSS suite still passes.
- **0.4 CSP shipped to prod.** Injected `<meta http-equiv>` in `scripts/prerender.js` (mirrors the vetted
  `_headers` policy; throws if the `<head>` marker is missing so it can't silently no-op). Browser-verified
  against the built `dist/`: bundle runs, router works, SVG graph lib renders, content inline-styles apply,
  Google Fonts load — **zero CSP violations**. Header-only directives (frame-ancestors/HSTS) omitted (GH
  Pages can't deliver them via meta).

Full CI pipeline confirmed locally: type-check ✓, lint (0 errors, 5 pre-existing warnings) ✓,
format:check ✓, coverage gate ✓, build ✓.

Out of scope but noted: `dist/` is missing `favicon.ico` (console 404); `<100KB` bundle target dropped
by owner; pnpm pinned to v9 in workflows (Phase 3).

Shipped as v0.27.1 (two commits) on 2026-06-13. CI green; gated deploy fired via workflow_run; CSP
confirmed live at https://darinchambers.com/.

### Phase 1 — DONE & verified (2026-06-13)

- **1.1 prefers-reduced-motion.** New `prefersReducedMotion()` helper. `ScreensaverManager.isEnabled()`
  returns false under reduced motion (auto screensaver fully suppressed — WCAG 2.2.2). `matrixRain` skips
  the rAF shuffle loop. Global CSS reset in `base.css` neutralizes animation/transition/smooth-scroll;
  targeted rule holds the matrix at a static frame. Browser-verified via `emulateMedia` (body transition
  collapsed to 1e-05s; media matches).
- **1.2 Tab keyboard trap.** `TerminalInput` only consumes Tab for completion when there's text; Shift+Tab
  and Tab-on-empty pass through. Browser-verified: focus moves off the input on Tab.
- **1.3 Focus-visible.** Added `:focus-visible` outlines to all interactive settings controls.

Tests added: `prefersReducedMotion.test.ts` (3), ScreensaverManager reduced-motion (3), TerminalInput
tab-trap (5+updated). Coverage 80.96% branch, 1887 passing. Shipped as v0.27.2; CI green.
