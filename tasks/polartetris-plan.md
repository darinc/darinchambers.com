# Plan: Integrate full-screen "Polar Tetris" game

Integrate the prototype at `/Users/darin/code/github/darinc/polarTetris/polarblocks.html`
(an HTML5-canvas Tetris on a **polar/radial** grid) into the terminal portfolio as a
fullscreen, keyboard-driven game launched by a terminal command.

## Decisions (locked with owner)

- **Command name:** `polartetris`
- **Gameplay fidelity:** **Faithful port** — preserve the original's distinctive mechanic
  (a spawn timer drops **multiple concurrent** falling pieces; existing drop/clear/level logic kept verbatim).
- **Polish extras (all four):** theme integration, high-score persistence, touch/mobile controls, sound FX.
- Feature → **MINOR version bump** (0.27.4 → 0.28.0) + CHANGELOG entry. Commit unsigned (project convention).

## Why this can't reuse the matrix/life animation pattern

`matrix` and `life` return HTML, a MutationObserver starts the animation, and it **tears down on the
first scroll/keypress/new output**. A game needs the opposite: persistent keyboard capture and a
deliberate quit. The terminal's keydown listener is bound to the **input element** (`TerminalInput.ts:19`),
not `document` — so a fullscreen overlay that blurs the input and captures keys at `document`
(capture phase) won't fight the prompt. Commands receive injected deps via factory
(`createMakeCommand(terminal)` at `main.ts:249`), so the command can be handed a controller that owns
the overlay lifecycle (mirroring `FullscreenController`).

## Architecture

```
polartetris (command)  --launch-->  GameController  --owns-->  overlay DOM + PolarTetrisGame
   src/commands/novelty/            src/components/            src/games/polarTetris/
```

- **`PolarTetrisGame`** — self-contained engine + canvas renderer. Construction only wires state;
  `start()` kicks the RAF loop + spawn/drop timers; `destroy()` tears everything down. Ports the polar
  geometry and game logic **verbatim** (faithful), but made responsive (canvas sized from viewport,
  DPR-aware) instead of the fixed 900×900.
- **`GameController`** — analog of `FullscreenController`: builds the fullscreen overlay (canvas + HUD +
  touch controls + game-over dialog), blurs the terminal input, hides chrome, instantiates the game,
  routes keys (intercepting `q`/`Esc` to quit), and on exit destroys the game, removes the overlay,
  restores chrome, refocuses the prompt, and persists the high score.
- **`polartetris` command** — thin: `--help`, optional `--mute`; guards double-launch; calls
  `gameController.launch(...)` and returns a short line (e.g. `Launching Polar Tetris… (Q/Esc to quit)`).

## Files

### New

- [ ] `src/games/polarTetris/PolarTetrisGame.ts` — engine + renderer (board, concurrent pieces, spawn
      timer, drop loop, rotate, line-clear, scoring/levels, polar draw math). Responsive canvas + DPR.
      Pauses on `visibilitychange`/blur. Clean `destroy()` (cancel RAF, clear intervals, remove listeners).
- [ ] `src/games/polarTetris/SoundFX.ts` — WebAudio blips (move/rotate/lock/clear/level-up/over).
      Lazy `AudioContext` on first gesture (launch is a gesture). No external assets → CSP-clean.
      Mute toggle + persisted preference.
- [ ] `src/games/polarTetris/highScore.ts` — tiny persistence helper. **Preferred:** route through
      `SettingsManager` if it exposes a generic get/set; otherwise a dedicated `localStorage` key
      (`polartetris.highScore`) to avoid bloating the typed settings schema. (Verify SettingsManager API
      during impl; pick the lower-impact path.)
- [ ] `src/components/GameController.ts` — overlay lifecycle, input routing, chrome hide/restore,
      high-score load/save, reduced-motion handling.
- [ ] `src/commands/novelty/polartetris.ts` — `createPolarTetrisCommand(gameController)`; `--help`, `--mute`.
- [ ] `src/styles/polartetris.css` — overlay, canvas, HUD, touch buttons, game-over dialog; themed via
      CSS variables. (Verify how styles are imported and wire it in.)
- [ ] Tests:
  - `tests/unit/games/PolarTetrisGame.test.ts` — pure logic: `canMove`, `movePiece`, `rotatePiece`,
    `checkRows` (clear + score), `updateLevel`, `generatePiece` bounds. Stub the 2D context.
  - `tests/unit/components/GameController.test.ts` — launch builds overlay + blurs input + hides chrome;
    quit tears down + restores + refocuses + persists high score; key routing (`q`/`Esc` exit, arrows
    forwarded, not leaked to prompt). Mock `canvas.getContext('2d')`.
  - `tests/unit/commands/novelty/polartetris.test.ts` — name/description, `--help`, launches via a fake
    controller, double-launch guard.
  - `tests/helpers/` — add a `mockCanvasContext()` helper (jsdom returns null for `getContext`).

### Edited

- [ ] `src/main.ts` — construct `GameController` (after `terminal`), inject deps (themeManager,
      high-score persistence, refocus callback); `createPolarTetrisCommand(...)`; add to
      `terminal.registerCommands([...])`.
- [ ] `src/utils/fs/FileSystemInitializer.ts` — `bin.children!.set('polartetris', this.createFileNode('polartetris', '[Novelty command: polartetris]'));` (novelty → `/usr/bin`), so `which`/`ls /usr/bin`/`man` work.
- [ ] `src/content/help.md` — add `polartetris` to the Novelty section.
- [ ] CSS entry — import `polartetris.css` wherever the other style sheets are imported.
- [ ] `README.md` — add `polartetris` to Novelty commands; bump command count; version badge → 0.28.0.
- [ ] `CLAUDE.md` / `ARCHITECTURE.md` — command count "40" → "41" where listed.
- [ ] `package.json` — version 0.27.4 → 0.28.0.
- [ ] `CHANGELOG.md` — `## [0.28.0]` Added: polartetris game (fullscreen, polar grid, sound, touch, high score).

## Controls (documented in `--help` and an in-overlay hint)

Arrows: move/soft-drop · Up or `a`: rotate CW/CCW · Space: hard drop · `p`: pause · `o`: invert display
(faithful to original) · `m`: mute. Touch: on-screen buttons (always reliable) + basic swipe.

**Esc / `q` opens an in-game menu** (pauses the game). The menu (keyboard- and pointer-navigable) offers
**Resume**, **Restart**, **Sound on/off**, and **Quit game**. "Quit game" performs the full teardown
(cancel RAF, clear timers, remove listeners, close AudioContext, remove overlay, restore chrome) and
returns to the standard terminal shell with the prompt refocused. Esc again (or Resume) dismisses the menu.

## Cross-cutting requirements

- **CSP:** game is a TS module (no inline `<script>`), no inline event handlers; canvas + WebAudio are
  allowed by the current policy. CSS in a stylesheet. ✓ No CSP changes needed.
- **Keyboard isolation:** blur prompt on launch; capture-phase `document` keydown; `stopPropagation` on
  game keys; refocus prompt on quit.
- **Reduced motion:** game is user-initiated so core play runs; honor `prefersReducedMotion()` by
  disabling decorative flourishes (line-clear flash) only.
- **Lifecycle hygiene:** pause timers on tab-hidden/blur; `destroy()` leaves zero dangling
  intervals/listeners/RAF/AudioContext (the original leaks its spawn interval — controller teardown fixes this).
- **Responsive:** square canvas from `min(vw,vh)`, DPR-aware; recompute center/radius on resize.

## Verification (Definition of Done)

- [ ] `pnpm type-check`, `pnpm lint`, `pnpm format:check` clean (zero `any`).
- [ ] `pnpm test:run` green; new tests pass; coverage stays ≥ 80% branch gate; `pnpm type-coverage` ≥ 95%.
- [ ] `pnpm build` succeeds (tsc + vite + prerender); report bundle-size delta.
- [ ] Manual browser smoke: launch, play, line clear (score/level update), concurrent-piece spawn,
      game over → Play Again, quit (Q/Esc) restores terminal + refocuses prompt, window resize, touch
      buttons, sound + mute, reduced-motion. Console clean.
- [ ] `which polartetris`, `man polartetris`, `polartetris --help`, tab-completion all work.

## Risks / open verifications (resolved during impl, no extra owner input expected)

- `SettingsManager` API shape (generic kv vs typed) → picks high-score persistence path.
- Exact CSS import wiring in the build.
- `Terminal` refocus hook (callback vs existing method).
- Coverage gate: concentrate tests on the logic module so the branch-heavy renderer doesn't sink the gate.
