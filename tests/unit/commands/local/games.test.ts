import { describe, it, expect } from 'vitest';
import { createGamesCommand } from '../../../../src/commands/local/games';
import { GAMES } from '../../../../src/games/registry';
import type { CommandResult } from '../../../../src/commands/Command';

describe('games command', () => {
  const cmd = createGamesCommand();

  it('has the correct name and description', () => {
    expect(cmd.name).toBe('games');
    expect(cmd.description).toBe('List playable games');
  });

  it('shows help with --help and does not render HTML', () => {
    const result = cmd.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: games');
    expect(result.html).toBeFalsy();
  });

  it('lists every registered game as HTML scrolled to the top', () => {
    const result = cmd.execute([]) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.scrollBehavior).toBe('top');
    for (const game of GAMES) {
      expect(result.output).toContain(game.title);
    }
  });

  it('renders each launch command as a clickable command link', () => {
    const result = cmd.execute([]) as CommandResult;
    for (const game of GAMES) {
      expect(result.output).toContain(`data-command="${game.command}"`);
    }
  });
});
