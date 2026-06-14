import { describe, it, expect, vi } from 'vitest';
import { createPolarTetrisCommand } from '../../../../src/commands/novelty/polartetris';
import type { CommandResult } from '../../../../src/commands/Command';
import type { GameController } from '../../../../src/components/GameController';

function fakeController(active = false): {
  controller: GameController;
  isActive: ReturnType<typeof vi.fn>;
  launch: ReturnType<typeof vi.fn>;
} {
  const isActive = vi.fn().mockReturnValue(active);
  const launch = vi.fn();
  const controller = { isActive, launch } as unknown as GameController;
  return { controller, isActive, launch };
}

describe('polartetris command', () => {
  it('has the correct name and description', () => {
    const { controller } = fakeController();
    const cmd = createPolarTetrisCommand(controller);
    expect(cmd.name).toBe('polartetris');
    expect(cmd.description).toBe('Play Polar Tetris - Tetris on a radial grid');
  });

  it('shows help with --help and does not launch', () => {
    const { controller, launch } = fakeController();
    const cmd = createPolarTetrisCommand(controller);
    const result = cmd.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: polartetris');
    expect(result.output).toContain('Controls:');
    expect(launch).not.toHaveBeenCalled();
  });

  it('launches the game with sound on by default', () => {
    const { controller, launch } = fakeController();
    const cmd = createPolarTetrisCommand(controller);
    const result = cmd.execute([]) as CommandResult;
    expect(launch).toHaveBeenCalledWith({ mute: false });
    expect(result.output).toContain('Launching');
    expect(result.error).toBeUndefined();
  });

  it('passes --mute through to the controller', () => {
    const { controller, launch } = fakeController();
    const cmd = createPolarTetrisCommand(controller);
    cmd.execute(['--mute']);
    expect(launch).toHaveBeenCalledWith({ mute: true });
  });

  it('refuses to launch when a game is already active', () => {
    const { controller, launch } = fakeController(true);
    const cmd = createPolarTetrisCommand(controller);
    const result = cmd.execute([]) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain('already running');
    expect(launch).not.toHaveBeenCalled();
  });
});
