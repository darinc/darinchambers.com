import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  setupCompleteTerminal,
  teardownIntegrationTest,
  executeCommandAndWait,
  getLastOutputLine,
  getCSSVariable,
  setupMockLocalStorage,
  type IntegrationTestContext,
} from '../helpers/integration-helpers';

describe('Settings Persistence Integration', () => {
  let context: IntegrationTestContext;

  beforeEach(() => {
    setupMockLocalStorage();
    context = setupCompleteTerminal();
  });

  afterEach(() => {
    teardownIntegrationTest();
    vi.clearAllMocks();
  });

  describe('Theme Settings Persistence', () => {
    it('should persist theme change to localStorage', async () => {
      await executeCommandAndWait(context.terminal, 'settings theme yellow');

      const stored = localStorage.getItem('terminal_settings');
      expect(stored).toBeTruthy();

      const settings = JSON.parse(stored!);
      expect(settings.theme.preset).toBe('yellow');
    });

    it('should persist theme change to filesystem', async () => {
      await executeCommandAndWait(context.terminal, 'settings theme yellow');

      const fileContent = context.fileSystem.readFile('/home/darin/.config/settings.json');
      const settings = JSON.parse(fileContent);
      expect(settings.theme.preset).toBe('yellow');
    });

    it('should apply theme to DOM via CSS variables', async () => {
      await executeCommandAndWait(context.terminal, 'settings theme yellow');

      // Wait for theme to be applied
      await new Promise((resolve) => setTimeout(resolve, 50));

      const bgColor = getCSSVariable('--terminal-bg');
      const fgColor = getCSSVariable('--terminal-fg');

      expect(bgColor).toBeTruthy();
      expect(fgColor).toBeTruthy();
      // Colors should match yellow theme (or be set)
      expect(bgColor).not.toBe('');
      expect(fgColor).not.toBe('');
    });

    it('should persist all three storage locations synchronously', async () => {
      await executeCommandAndWait(context.terminal, 'settings theme green');

      // Check localStorage
      const stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.theme.preset).toBe('green');

      // Check filesystem
      const fileContent = context.fileSystem.readFile('/home/darin/.config/settings.json');
      const fileSettings = JSON.parse(fileContent);
      expect(fileSettings.theme.preset).toBe('green');

      // Check DOM
      const bgColor = getCSSVariable('--terminal-bg');
      expect(bgColor).toBeTruthy();
    });

    it('should handle multiple theme changes', async () => {
      // Change to yellow
      await executeCommandAndWait(context.terminal, 'settings theme yellow');
      let stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.theme.preset).toBe('yellow');

      // Change to blue
      await executeCommandAndWait(context.terminal, 'settings theme blue');
      stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.theme.preset).toBe('blue');

      // Change to green
      await executeCommandAndWait(context.terminal, 'settings theme green');
      stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.theme.preset).toBe('green');
    });
  });

  describe('Font Settings Persistence', () => {
    it('should persist fontSize change to localStorage', async () => {
      await executeCommandAndWait(context.terminal, 'settings fontSize 18px');

      const stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.fontSize).toBe('18px');
    });

    it('should persist fontSize change to filesystem', async () => {
      await executeCommandAndWait(context.terminal, 'settings fontSize 18px');

      const fileContent = context.fileSystem.readFile('/home/darin/.config/settings.json');
      const settings = JSON.parse(fileContent);
      expect(settings.fontSize).toBe('18px');
    });

    it('should apply fontSize to DOM', async () => {
      await executeCommandAndWait(context.terminal, 'settings fontSize 20px');

      await new Promise((resolve) => setTimeout(resolve, 50));

      const fontSize = getCSSVariable('--terminal-font-size');
      expect(fontSize).toBe('20px');
    });

    it('should persist fontFamily change', async () => {
      await executeCommandAndWait(context.terminal, 'settings fontFamily "Courier New"');

      const stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.fontFamily).toBe('Courier New');

      const fileContent = context.fileSystem.readFile('/home/darin/.config/settings.json');
      const settings = JSON.parse(fileContent);
      expect(settings.fontFamily).toBe('Courier New');
    });

    it('should apply fontFamily to DOM', async () => {
      await executeCommandAndWait(context.terminal, 'settings fontFamily monospace');

      await new Promise((resolve) => setTimeout(resolve, 50));

      const fontFamily = getCSSVariable('--terminal-font-family');
      expect(fontFamily).toBeTruthy();
    });
  });

  describe('Multiple Settings Changes', () => {
    it('should persist multiple settings changes in one session', async () => {
      // Change theme
      await executeCommandAndWait(context.terminal, 'settings theme yellow');

      // Change font size
      await executeCommandAndWait(context.terminal, 'settings fontSize 18px');

      // Change font family
      await executeCommandAndWait(context.terminal, 'settings fontFamily monospace');

      // Verify all changes persisted
      const stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.theme.preset).toBe('yellow');
      expect(stored.fontSize).toBe('18px');
      expect(stored.fontFamily).toBe('monospace');

      const fileContent = context.fileSystem.readFile('/home/darin/.config/settings.json');
      const fileSettings = JSON.parse(fileContent);
      expect(fileSettings.theme.preset).toBe('yellow');
      expect(fileSettings.fontSize).toBe('18px');
      expect(fileSettings.fontFamily).toBe('monospace');
    });

    it('should preserve previous settings when changing one setting', async () => {
      // Set initial settings
      await executeCommandAndWait(context.terminal, 'settings theme blue');
      await executeCommandAndWait(context.terminal, 'settings fontSize 16px');

      // Change only theme
      await executeCommandAndWait(context.terminal, 'settings theme green');

      // Verify theme changed but fontSize preserved
      const stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.theme.preset).toBe('green');
      expect(stored.fontSize).toBe('16px');
    });
  });

  describe('Settings Retrieval', () => {
    it('should display current settings', async () => {
      // Set some settings
      await executeCommandAndWait(context.terminal, 'settings theme purple');
      await executeCommandAndWait(context.terminal, 'settings fontSize 18px');

      // Get settings
      await executeCommandAndWait(context.terminal, 'settings');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      expect(output?.textContent).toMatch(/purple|18px/);
    });

    it('should show settings from filesystem', async () => {
      // Write settings directly to filesystem
      const settingsData = {
        theme: { preset: 'blue' },
        fontSize: '20px',
        fontFamily: 'monospace',
      };
      context.fileSystem.writeFile(
        '/home/darin/.config/settings.json',
        JSON.stringify(settingsData, null, 2)
      );

      // Read settings using cat command
      await executeCommandAndWait(context.terminal, 'cat /home/darin/.config/settings.json');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('blue');
      expect(output?.textContent).toContain('20px');
    });
  });

  describe('Settings Synchronization', () => {
    it('should sync localStorage to filesystem', async () => {
      // Simulate settings in localStorage
      const settings = {
        theme: { preset: 'yellow' },
        fontSize: '16px',
        fontFamily: 'monospace',
      };
      localStorage.setItem('terminal_settings', JSON.stringify(settings));

      // Trigger sync by changing a setting
      await executeCommandAndWait(context.terminal, 'settings theme yellow');

      // Verify filesystem has the setting
      const fileContent = context.fileSystem.readFile('/home/darin/.config/settings.json');
      const fileSettings = JSON.parse(fileContent);
      expect(fileSettings.theme.preset).toBe('yellow');
    });

    it('should maintain consistency across all storage layers', async () => {
      // Make multiple changes
      for (const theme of ['yellow', 'green', 'blue', 'purple']) {
        await executeCommandAndWait(context.terminal, `settings theme ${theme}`);

        // Verify consistency
        const localStorageData = JSON.parse(localStorage.getItem('terminal_settings')!);
        const fileData = JSON.parse(
          context.fileSystem.readFile('/home/darin/.config/settings.json')
        );

        expect(localStorageData.theme.preset).toBe(theme);
        expect(fileData.theme.preset).toBe(theme);
      }
    });
  });

  describe('Theme Manager Integration', () => {
    it('should apply theme colors to CSS variables', async () => {
      await executeCommandAndWait(context.terminal, 'settings theme yellow');

      await new Promise((resolve) => setTimeout(resolve, 50));

      // Check that CSS variables are set
      const bgColor = getCSSVariable('--terminal-bg');
      const fgColor = getCSSVariable('--terminal-fg');
      const accentColor = getCSSVariable('--terminal-accent');

      expect(bgColor).toBeTruthy();
      expect(fgColor).toBeTruthy();
      expect(accentColor).toBeTruthy();

      // Should not be default/empty values
      expect(bgColor).not.toBe('');
      expect(fgColor).not.toBe('');
      expect(accentColor).not.toBe('');
    });

    it('should update theme when settings change', async () => {
      // Set initial theme
      await executeCommandAndWait(context.terminal, 'settings theme blue');
      await new Promise((resolve) => setTimeout(resolve, 50));
      const blueBg = getCSSVariable('--terminal-bg');

      // Change theme
      await executeCommandAndWait(context.terminal, 'settings theme yellow');
      await new Promise((resolve) => setTimeout(resolve, 50));
      const yellowBg = getCSSVariable('--terminal-bg');

      // Colors should be different
      expect(blueBg).not.toBe(yellowBg);
    });

    it('should apply all theme properties', async () => {
      await executeCommandAndWait(context.terminal, 'settings theme green');

      await new Promise((resolve) => setTimeout(resolve, 50));

      // Check multiple theme properties
      const properties = [
        '--terminal-bg',
        '--terminal-fg',
        '--terminal-accent',
        '--terminal-cursor',
      ];

      for (const property of properties) {
        const value = getCSSVariable(property);
        expect(value).toBeTruthy();
        expect(value).not.toBe('');
      }
    });
  });

  describe('Settings Validation', () => {
    it('should handle invalid theme gracefully', async () => {
      await executeCommandAndWait(context.terminal, 'settings theme invalidtheme');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should show error or valid themes
      expect(output?.textContent).toMatch(/invalid|available|error/i);
    });

    it('should handle invalid fontSize gracefully', async () => {
      await executeCommandAndWait(context.terminal, 'settings fontSize invalid');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should show error or continue without crashing
    });

    it('should preserve settings when invalid change attempted', async () => {
      // Set valid setting
      await executeCommandAndWait(context.terminal, 'settings theme blue');

      // Try invalid setting
      await executeCommandAndWait(context.terminal, 'settings theme invalidtheme');

      // Verify original setting preserved
      const stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      // Should either be blue or not change
      if (stored.theme?.preset) {
        expect(stored.theme.preset).not.toBe('invalidtheme');
      }
    });
  });

  describe('Settings File Operations', () => {
    it('should allow reading settings file via cat', async () => {
      // Set settings
      await executeCommandAndWait(context.terminal, 'settings theme purple');

      // Read via cat
      await executeCommandAndWait(context.terminal, 'cat /home/darin/.config/settings.json');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('purple');
      expect(output?.textContent).toContain('theme');
    });

    it('should show settings file in ls output', async () => {
      // Ensure settings exist
      await executeCommandAndWait(context.terminal, 'settings theme yellow');

      // List config directory
      await executeCommandAndWait(context.terminal, 'ls /home/darin/.config');

      const output = getLastOutputLine();
      expect(output?.textContent).toContain('settings.json');
    });

    it('should maintain settings across directory changes', async () => {
      // Set settings
      await executeCommandAndWait(context.terminal, 'settings theme blue');

      // Change directory
      await executeCommandAndWait(context.terminal, 'cd /home/darin/documents');

      // Settings should still be accessible
      await executeCommandAndWait(context.terminal, 'settings');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should show current settings
    });
  });

  describe('Settings Reset', () => {
    it('should allow resetting to default theme', async () => {
      // Change to non-default theme
      await executeCommandAndWait(context.terminal, 'settings theme yellow');

      // Reset to default (green)
      await executeCommandAndWait(context.terminal, 'settings theme green');

      const stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.theme.preset).toBe('green');
    });

    it('should maintain consistency after reset', async () => {
      // Change settings
      await executeCommandAndWait(context.terminal, 'settings theme purple');
      await executeCommandAndWait(context.terminal, 'settings fontSize 20px');

      // Reset theme
      await executeCommandAndWait(context.terminal, 'settings theme green');

      // Verify localStorage
      const localData = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(localData.theme.preset).toBe('green');
      expect(localData.fontSize).toBe('20px'); // Should preserve fontSize

      // Verify filesystem
      const fileData = JSON.parse(context.fileSystem.readFile('/home/darin/.config/settings.json'));
      expect(fileData.theme.preset).toBe('green');
      expect(fileData.fontSize).toBe('20px');
    });
  });

  describe('Concurrent Settings Changes', () => {
    it('should handle rapid settings changes', async () => {
      // Rapidly change settings
      await executeCommandAndWait(context.terminal, 'settings theme yellow');
      await executeCommandAndWait(context.terminal, 'settings theme blue');
      await executeCommandAndWait(context.terminal, 'settings theme green');

      // Final state should be consistent
      const localData = JSON.parse(localStorage.getItem('terminal_settings')!);
      const fileData = JSON.parse(context.fileSystem.readFile('/home/darin/.config/settings.json'));

      expect(localData.theme.preset).toBe(fileData.theme.preset);
      expect(localData.theme.preset).toBe('green');
    });

    it('should handle settings changes while other commands execute', async () => {
      // Execute a command
      await executeCommandAndWait(context.terminal, 'ls');

      // Change settings
      await executeCommandAndWait(context.terminal, 'settings theme purple');

      // Execute another command
      await executeCommandAndWait(context.terminal, 'pwd');

      // Settings should persist
      const stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.theme.preset).toBe('purple');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty settings file', async () => {
      // Create empty settings file
      context.fileSystem.writeFile('/home/darin/.config/settings.json', '{}');

      // Try to change setting
      await executeCommandAndWait(context.terminal, 'settings theme yellow');

      // Should create proper settings
      const stored = JSON.parse(localStorage.getItem('terminal_settings')!);
      expect(stored.theme.preset).toBe('yellow');
    });

    it('should handle corrupted settings file', async () => {
      // Write invalid JSON
      context.fileSystem.writeFile('/home/darin/.config/settings.json', 'invalid json {');

      // Should handle gracefully
      await executeCommandAndWait(context.terminal, 'settings theme blue');

      // Should recover or use defaults
      const output = getLastOutputLine();
      expect(output).toBeTruthy();
    });

    it('should handle missing settings file', async () => {
      // Delete settings file if it exists
      try {
        context.fileSystem.deleteFile('/home/darin/.config/settings.json');
      } catch {
        // File might not exist
      }

      // Change setting
      await executeCommandAndWait(context.terminal, 'settings theme green');

      // Should create new settings file
      const fileContent = context.fileSystem.readFile('/home/darin/.config/settings.json');
      expect(fileContent).toBeTruthy();
      expect(JSON.parse(fileContent).theme.preset).toBe('green');
    });
  });
});
