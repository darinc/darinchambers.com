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

- [x] **3.1 Reconcile bundle-size claims.** Canonicalized to **~119KB gzipped** (~417KB raw) across
      README, CLAUDE.md (×3), ARCHITECTURE.md, DEPLOYMENT.md; dropped the abandoned `<100KB` target.
      `scripts/update-docs.js` now measures real gzip via `zlib.gzipSync` (was a fixed-ratio estimate)
      and its bundle-size regexes were rewritten to match the new canonical phrasing.
- [x] **3.2 Fix false security/a11y claims.** SECURITY.md "0 vulnerabilities" corrected (prod deps clean
      via `pnpm audit --prod`; dev/build tree carries advisories that never ship); dompurify 3.3.0→3.4.10;
      supported-versions 0.13.x→0.27.x; CSP documented as a prerender-injected `<meta>` (GH Pages ignores
      `_headers`) with header-only protections marked inactive and the policy synced to `CSP_POLICY`.
      Theme-preset location fixed (ThemeManager.initializePresets, not constants.ts) in CLAUDE.md +
      CONTRIBUTING.md; added missing `dc` preset; softened blanket WCAG-AA claim to delivered scope.
- [x] **3.3 Pin pnpm 10 in workflows.** Both workflows bumped `pnpm/action-setup` version 9 → 10. First
      CI run on v10 with `--frozen-lockfile` confirmed green.

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

### Phase 2 (low-risk subset) — DONE & verified (2026-06-13)

- **2.5a** Deleted unused `sanitizeHtmlCustom` (sanitizeHtml.ts now 100% covered).
- **2.6** Prerender hardened: `replaceOrThrow` throws if any inject marker is missing (no more silent
  empty-SEO pages); per-file `safeReadContent` try/catch warns-and-skips a bad `.md` instead of aborting.
- **2.7b** Blog slug drops the optional `NN-` sequence (BlogParser ×2 + prerender `blogSlug`). Browser-
  verified prerender↔runtime consistency: `/blog/building-a-minimal-production-graph-library` resolves and
  renders (graph SVG present).
- **2.7c** Empty `/notes` no longer prerendered or added to the sitemap (build now emits 11 pages, not 12).

Shipped as v0.27.3. Coverage 80.85% branch, 1889 passing; type-check/lint/format/build all green.

- **2.7a** RESOLVED: owner confirmed 11-14 is authoritative, so the love-letter post's frontmatter date was
  corrected to 2025-11-14 (filename = frontmatter); no sort-logic change needed.

### Phase 2 (refactors) — DONE & verified (2026-06-13)

- **2.2** Shared frontmatter helpers in `src/utils/frontmatter.ts`; Blog/Portfolio/Post parsers now delegate
  the `---` scan, value parsing, and date-prefix id extraction. (frontmatter.ts 100% covered.)
- **2.3** `createContentCommand` factory shares the blog+notes flow. `portfolio` left separate on purpose
  (order sort, ascending numbering, multi-tag filtering, tolerant parse → a shared abstraction would leak).
- **2.4** Broke up the 698-line `Terminal.ts` (now ~446) into `FullscreenController` + `SettingsUIController`.
  Added a FullscreenController unit test; browser-verified the settings event-delegation (theme switch
  applied `--terminal-accent: #00ff99` end-to-end). Branch coverage rose to 81.75%.

Refactors shipped without version bumps (behavior-preserving). All CI green.

### Phase 3 (docs truth-up) — DONE & verified (2026-06-13)

- **3.1** Bundle size canonicalized to ~119KB gzipped (measured) across all docs; `<100KB` target dropped.
  `scripts/update-docs.js` now measures real gzip (`zlib.gzipSync`) and its regexes match the new phrasing.
- **3.2** SECURITY.md truthed up: "0 vulnerabilities" → prod-deps-clean vs dev-tree-has-advisories framing;
  dompurify 3.3.0→3.4.10; supported-versions 0.13.x→0.27.x; CSP documented as prerender `<meta>` (not
  `_headers`), header-only protections marked inactive, policy synced to `CSP_POLICY`. Theme-preset location
  corrected (ThemeManager.initializePresets) in CLAUDE.md + CONTRIBUTING.md; added `dc` preset; softened the
  blanket WCAG-AA claim to delivered scope (reduced-motion, keyboard nav, focus-visible).
- **3.3** pnpm pinned v9→v10 in both workflows; first v10 CI run with `--frozen-lockfile` confirmed green.

Shipped without a version bump (docs/ci only). Commits `e968144` (docs), `5979351` (ci), `10a4a7d` (lint
cleanup). Full `pnpm validate` green locally; CI green on push.

### Dependency + CI modernization — DONE & verified (2026-06-13)

- **GitHub Actions → Node-24 majors.** checkout v4→v6, setup-node v4→v6, upload-artifact v4→v7,
  codecov-action v4→v7, pnpm/action-setup v4→v6, peaceiris/actions-gh-pages v3→v4. **Node-20 deprecation
  annotation is gone.** CI/deploy node-version 20→22 (active LTS, matches local).
- **Dependencies updated incl. majors.** marked 17→18 (prod), figlet→1.11, vite 7→8, eslint 9→10,
  typescript 5.9→6.0, jsdom 27→29, glob 10→13, lint-staged 16→17, @types/node 24→25, plus
  vitest/prettier/typescript-eslint minors. `pnpm audit` **28→2** (remaining 2 are dev-only esbuild
  advisories via vite, patched in >=0.28.1 which no vite release ships yet — never reach the browser;
  prod `pnpm audit --prod` stays clean).
- **Two pnpm-10 gotchas fixed (encoded in repo):** added `pnpm.onlyBuiltDependencies: [esbuild,
unrs-resolver]` (pnpm 10 blocks postinstall build scripts); switched eslint.config.js to import-x's
  pure-JS `createNodeResolver` (the native unrs-resolver crashed eslint on the CI linux runner). ESLint 10's
  `preserve-caught-error` rule → attach `{ cause }` on re-throw → required tsconfig target/lib ES2020→ES2022.
- **Verified:** type-check, lint, build, 1906 tests, type-coverage 99.22%, CI green, deploy green, and a
  Playwright smoke-test of the vite-8 production build (banner renders; `help` runs and routes to /help).
- Commits `0a994df`..`94e3901` (7 commits). No version bump (chore/ci).

**Still open:**

- **2.1 dead markdown renderer** — logged as **GitHub issue #1** (delete vs keep as documented fallback);
  awaiting owner decision.
- Minor: dead-code/UX quirk in `Router.getPathForCommand:296`; `dist` missing `favicon.ico` (still 404 in
  the vite-8 build — a real, separate small fix if wanted).
