import { describe, it, expect, vi } from 'vitest';
import { createExportCommand } from '../../../../src/commands/core/export';
import type { EnvVarManager } from '../../../../src/utils/EnvVarManager';

describe('export command', () => {
  describe('Display Variables', () => {
    it('should display all variables when no arguments', () => {
      const mockManager = {
        getAllVariables: vi.fn().mockReturnValue(
          new Map([
            ['VAR1', 'value1'],
            ['VAR2', 'value2'],
          ])
        ),
        setVariable: vi.fn(),
        getVariable: vi.fn(),
      } as unknown as EnvVarManager;

      const command = createExportCommand(mockManager);
      const result = command.execute([]);

      expect(result.output).toContain('VAR1=value1');
      expect(result.output).toContain('VAR2=value2');
    });

    it('should return empty when no variables and no arguments', () => {
      const mockManager = {
        getAllVariables: vi.fn().mockReturnValue(new Map()),
        setVariable: vi.fn(),
        getVariable: vi.fn(),
      } as unknown as EnvVarManager;

      const command = createExportCommand(mockManager);
      const result = command.execute([]);

      expect(result.output).toBe('');
    });

    it('should display single variable', () => {
      const mockManager = {
        getAllVariables: vi.fn(),
        setVariable: vi.fn(),
        getVariable: vi.fn().mockReturnValue('test value'),
      } as unknown as EnvVarManager;

      const command = createExportCommand(mockManager);
      const result = command.execute(['VAR1']);

      expect(result.output).toBe('VAR1=test value');
    });

    it('should show not found for missing variable', () => {
      const mockManager = {
        getAllVariables: vi.fn(),
        setVariable: vi.fn(),
        getVariable: vi.fn().mockReturnValue(undefined),
      } as unknown as EnvVarManager;

      const command = createExportCommand(mockManager);
      const result = command.execute(['MISSING']);

      expect(result.output).toBe('export: MISSING: not found');
    });
  });

  describe('Set Variables', () => {
    it('should set variable with assignment syntax', () => {
      const mockManager = {
        getAllVariables: vi.fn(),
        setVariable: vi.fn(),
        getVariable: vi.fn(),
      } as unknown as EnvVarManager;

      const command = createExportCommand(mockManager);
      const result = command.execute(['VAR=value']);

      expect(mockManager.setVariable).toHaveBeenCalledWith('VAR', 'value');
      expect(result.output).toBe('');
    });

    it('should handle empty value assignment', () => {
      const mockManager = {
        getAllVariables: vi.fn(),
        setVariable: vi.fn(),
        getVariable: vi.fn(),
      } as unknown as EnvVarManager;

      const command = createExportCommand(mockManager);
      command.execute(['VAR=']);

      expect(mockManager.setVariable).toHaveBeenCalledWith('VAR', '');
    });

    it('should handle value with spaces', () => {
      const mockManager = {
        getAllVariables: vi.fn(),
        setVariable: vi.fn(),
        getVariable: vi.fn(),
      } as unknown as EnvVarManager;

      const command = createExportCommand(mockManager);
      command.execute(['VAR=value with spaces']);

      expect(mockManager.setVariable).toHaveBeenCalledWith('VAR', 'value with spaces');
    });

    it('should set multiple variables', () => {
      const mockManager = {
        getAllVariables: vi.fn(),
        setVariable: vi.fn(),
        getVariable: vi.fn(),
      } as unknown as EnvVarManager;

      const command = createExportCommand(mockManager);
      command.execute(['VAR1=value1', 'VAR2=value2']);

      expect(mockManager.setVariable).toHaveBeenCalledWith('VAR1', 'value1');
      expect(mockManager.setVariable).toHaveBeenCalledWith('VAR2', 'value2');
    });
  });

  describe('Error Handling', () => {
    it('should handle error from setVariable', () => {
      const mockManager = {
        getAllVariables: vi.fn(),
        setVariable: vi.fn().mockImplementation(() => {
          throw new Error('Invalid variable name');
        }),
        getVariable: vi.fn(),
      } as unknown as EnvVarManager;

      const command = createExportCommand(mockManager);
      const result = command.execute(['INVALID=value']);

      expect(result.output).toBe('Invalid variable name');
      expect(result.error).toBe(true);
    });

    it('should handle non-Error exceptions', () => {
      const mockManager = {
        getAllVariables: vi.fn().mockImplementation(() => {
          throw new Error('error string');
        }),
        setVariable: vi.fn(),
        getVariable: vi.fn(),
      } as unknown as EnvVarManager;

      const command = createExportCommand(mockManager);
      const result = command.execute([]);

      expect(result.output).toBe('error string');
      expect(result.error).toBe(true);
    });
  });
});
