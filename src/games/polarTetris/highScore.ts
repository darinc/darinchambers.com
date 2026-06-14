/**
 * Polar Tetris high-score persistence.
 *
 * Stored under a dedicated localStorage key rather than through SettingsManager,
 * whose config is a closed, typed schema. All access is guarded so a missing or
 * unavailable localStorage degrades to a session-only score of 0.
 */
const HIGH_SCORE_KEY = 'polartetris.highScore';

/** Read the best score, or 0 if none is stored / storage is unavailable. */
export function loadHighScore(): number {
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    if (!raw) return 0;
    const value = parseInt(raw, 10);
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

/**
 * Persist `score` if it beats the stored best. Returns the resulting best score
 * (either the new score or the existing record).
 */
export function saveHighScore(score: number): number {
  const best = loadHighScore();
  if (score <= best) return best;
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    /* localStorage unavailable - high score won't persist this session */
  }
  return score;
}
