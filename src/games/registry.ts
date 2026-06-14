/**
 * Registry of playable games.
 *
 * Single source of truth for the `games` command and any future game listings.
 * Add an entry here when a new game ships so it appears in the listing and the
 * navigation flow automatically.
 */
export interface GameInfo {
  /** The terminal command that launches the game. */
  command: string;
  /** Display title. */
  title: string;
  /** One-line description. */
  description: string;
}

export const GAMES: readonly GameInfo[] = [
  {
    command: 'polartetris',
    title: 'Polar Tetris',
    description: 'Tetris on a polar (radial) grid — pieces fall inward along concentric rings.',
  },
];
