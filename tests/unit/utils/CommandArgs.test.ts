import { describe, it, expect } from 'vitest';
import { CommandArgs } from '../../../src/utils/CommandArgs';

describe('CommandArgs', () => {
  describe('positional arguments', () => {
    it('should parse single positional argument', () => {
      const args = new CommandArgs(['file.txt']);
      expect(args.getPositional(0)).toBe('file.txt');
      expect(args.positionalCount).toBe(1);
    });

    it('should parse multiple positional arguments', () => {
      const args = new CommandArgs(['file1.txt', 'file2.txt', 'file3.txt']);
      expect(args.getPositional(0)).toBe('file1.txt');
      expect(args.getPositional(1)).toBe('file2.txt');
      expect(args.getPositional(2)).toBe('file3.txt');
      expect(args.positionalCount).toBe(3);
    });

    it('should return undefined for non-existent positional', () => {
      const args = new CommandArgs(['file.txt']);
      expect(args.getPositional(1)).toBeUndefined();
    });
  });

  describe('flag arguments', () => {
    it('should parse boolean flag', () => {
      const args = new CommandArgs(['--verbose']);
      expect(args.getFlag('verbose')).toBe(true);
      expect(args.hasFlag('verbose')).toBe(true);
    });

    it('should parse flag with value', () => {
      const args = new CommandArgs(['--tag', 'ai']);
      expect(args.getFlag('tag')).toBe('ai');
      expect(args.hasFlag('tag')).toBe(true);
    });

    it('should parse single letter flag with value', () => {
      const args = new CommandArgs(['-L', '3']);
      expect(args.getFlag('L')).toBe('3');
      expect(args.hasFlag('L')).toBe(true);
    });

    it('should parse single letter boolean flag', () => {
      const args = new CommandArgs(['-v']);
      expect(args.getFlag('v')).toBe(true);
      expect(args.hasFlag('v')).toBe(true);
    });

    it('should return undefined for non-existent flag', () => {
      const args = new CommandArgs(['--verbose']);
      expect(args.getFlag('nonexistent')).toBeUndefined();
      expect(args.hasFlag('nonexistent')).toBe(false);
    });
  });

  describe('mixed arguments', () => {
    it('should parse positional and flag arguments together', () => {
      const args = new CommandArgs(['post-1', '--tag', 'ai', '--verbose']);
      expect(args.getPositional(0)).toBe('post-1');
      expect(args.getFlag('tag')).toBe('ai');
      expect(args.getFlag('verbose')).toBe(true);
      expect(args.positionalCount).toBe(1);
    });

    it('should parse complex mixed arguments', () => {
      const args = new CommandArgs(['file.txt', '-L', '5', 'output.txt', '--verbose']);
      expect(args.getPositional(0)).toBe('file.txt');
      expect(args.getPositional(1)).toBe('output.txt');
      expect(args.getFlag('L')).toBe('5');
      expect(args.getFlag('verbose')).toBe(true);
      expect(args.positionalCount).toBe(2);
    });
  });

  describe('edge cases', () => {
    it('should handle empty arguments', () => {
      const args = new CommandArgs([]);
      expect(args.positionalCount).toBe(0);
      expect(args.getAllPositionals()).toEqual([]);
      expect(args.getAllFlags().size).toBe(0);
    });

    it('should handle only flags', () => {
      const args = new CommandArgs(['--flag1', '--flag2', 'value']);
      expect(args.positionalCount).toBe(0);
      expect(args.getFlag('flag1')).toBe(true);
      expect(args.getFlag('flag2')).toBe('value');
    });

    it('should handle only positionals', () => {
      const args = new CommandArgs(['arg1', 'arg2', 'arg3']);
      expect(args.positionalCount).toBe(3);
      expect(args.getAllFlags().size).toBe(0);
    });
  });

  describe('helper methods', () => {
    it('should return all flags', () => {
      const args = new CommandArgs(['--flag1', '--flag2', 'value']);
      const flags = args.getAllFlags();
      expect(flags.get('flag1')).toBe(true);
      expect(flags.get('flag2')).toBe('value');
      expect(flags.size).toBe(2);
    });

    it('should return all positionals', () => {
      const args = new CommandArgs(['arg1', 'arg2', '--flag']);
      const positionals = args.getAllPositionals();
      expect(positionals).toEqual(['arg1', 'arg2']);
    });
  });
});
