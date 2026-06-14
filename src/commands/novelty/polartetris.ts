import { CommandArgs } from '../../utils/CommandArgs';
import type { GameController } from '../../components/GameController';
import type { Command } from '../Command';

/**
 * polartetris command - launch the fullscreen Polar Tetris game.
 *
 * Tetris played on a polar (radial) grid: pieces fall inward along concentric
 * rings and a spawn timer drops multiple concurrent pieces. The game takes over
 * the screen via GameController; Esc opens an in-game menu (Resume / Restart /
 * Sound / Quit game) that returns to the terminal shell.
 */
const HELP_TEXT = `Usage: polartetris [options]

Play Polar Tetris - Tetris on a radial grid. Pieces fall inward along
concentric rings; clear full rings to score. A spawn timer keeps dropping
new pieces, so the board fills from several directions at once.

Options:
  --mute              Start with sound effects muted
  --help              Display this help message

Controls:
  ← / →               Move piece around the ring
  ↑  or  A            Rotate (clockwise / counter-clockwise)
  ↓                   Soft drop
  Space               Hard drop
  O                   Invert the display
  M                   Toggle sound
  Esc / Q / P         Open the in-game menu (Resume / Restart / Quit)

On touch devices, on-screen buttons appear for movement, rotation, and drops.
Your best score is saved between sessions.`;

export function createPolarTetrisCommand(gameController: GameController): Command {
  return {
    name: 'polartetris',
    description: 'Play Polar Tetris - Tetris on a radial grid',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return { output: HELP_TEXT };
      }

      if (typeof document === 'undefined') {
        return { output: 'polartetris: requires a browser environment', error: true };
      }

      if (gameController.isActive()) {
        return {
          output: 'polartetris: a game is already running (press Esc for the menu)',
          error: true,
        };
      }

      gameController.launch({ mute: cmdArgs.hasFlag('mute') });
      return {
        output: 'Launching Polar Tetris… Press Esc for the menu (Resume / Restart / Quit game).',
      };
    },
  };
}
