/**
 * Settings Command
 *
 * CLI interface for managing terminal settings and preferences.
 * Supports theme switching, font configuration, effects toggling, and settings display.
 */

import { generateSettingsUI } from '../../components/SettingsUI';
import { CommandArgs } from '../../utils/CommandArgs';
import { MarkdownService } from '../../utils/MarkdownService';
import type { ThemePresetName, FontFamily, ColorScheme } from '../../types/settings';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { SettingsManager } from '../../utils/SettingsManager';
import type { ThemeManager } from '../../utils/ThemeManager';
import type { Command, CommandResult } from '../Command';

/**
 * Creates the settings command with full CLI interface.
 *
 * @param fs File system for potential future file-based settings
 * @param settingsManager Settings persistence manager
 * @param themeManager Theme application manager
 * @returns Settings command
 */
export function createSettingsCommand(
  _fs: IFileSystem,
  settingsManager: SettingsManager,
  themeManager: ThemeManager
): Command {
  return {
    name: 'settings',
    description: 'Manage terminal settings and preferences',
    aliases: ['preferences', 'config'],
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: settings [subcommand] [options]

Description:
  Manage terminal settings and preferences

Subcommands:
  (no args)            Show interactive settings UI
  list                 Display current settings
  set <setting> <val>  Change a setting
  reset                Reset to defaults

Examples:
  settings             # Interactive UI
  settings list        # Show all settings
  settings set theme green  # Change theme
  settings set font-size 16  # Set font size
  settings reset       # Reset all settings`,
        };
      }

      // No args: show interactive UI
      if (args.length === 0) {
        return {
          output: generateSettingsUI(settingsManager, themeManager),
          html: true,
        };
      }

      const subcommand = cmdArgs.getPositional(0);

      switch (subcommand) {
        case 'list':
          return handleList(settingsManager, themeManager);

        case 'set':
          return handleSet(cmdArgs, settingsManager, themeManager);

        case 'reset':
          return handleReset(settingsManager, themeManager);

        // Shorthand: settings theme <value> is alias for settings set theme <value>
        case 'theme':
        case 'font-size':
        case 'font-family':
        case 'fontSize':
        case 'fontFamily':
        case 'scan-lines':
        case 'scanLines':
        case 'glow':
        case 'border':
        case 'animation-speed':
        case 'animationSpeed':
        case 'sound':
        case 'auto-scroll':
        case 'autoScroll':
        case 'prompt':
          // Convert shorthand to 'set' format: prepend 'set' to arguments
          return handleSet(
            new CommandArgs(['set', subcommand, ...args.slice(1)]),
            settingsManager,
            themeManager
          );

        default:
          return {
            output: `Unknown subcommand: ${subcommand}.\nTry 'settings --help' for more information`,
            error: true,
          };
      }
    },
  };
}

/**
 * Displays current settings in a formatted view.
 */
function handleList(settingsManager: SettingsManager, themeManager: ThemeManager): CommandResult {
  const markdown = formatSettingsAsMarkdown(settingsManager, themeManager);
  const html = MarkdownService.render(markdown);
  return { output: html, html: true };
}

/**
 * Handles setting updates.
 */
function handleSet(
  args: CommandArgs,
  settingsManager: SettingsManager,
  themeManager: ThemeManager
): CommandResult {
  const setting = args.getPositional(1);
  const value = args.getPositional(2);

  if (!setting) {
    return {
      output: "Usage: settings set <setting> <value>\nTry 'settings --help' for more information",
      error: true,
    };
  }

  // Color command has different syntax, skip value check
  if (setting !== 'color' && !value) {
    return {
      output: "Usage: settings set <setting> <value>\nTry 'settings --help' for more information",
      error: true,
    };
  }

  try {
    switch (setting) {
      case 'theme': {
        const validThemes: ThemePresetName[] = [
          'green',
          'yellow',
          'white',
          'light-blue',
          'paper',
          'dc',
        ];
        if (!validThemes.includes(value as ThemePresetName)) {
          return {
            output: `Invalid theme: ${value}. Available: ${validThemes.join(', ')}`,
            error: true,
          };
        }
        themeManager.applyTheme(value as ThemePresetName);
        broadcastSettingsChange();
        return { output: `Theme changed to: ${value}` };
      }

      case 'color': {
        // Color variables are parsed as flags by CommandArgs (they start with --)
        // So we need to get the first flag that looks like a CSS variable
        const cssVars = [
          'terminal-bg',
          'terminal-fg',
          'terminal-accent',
          'terminal-dim',
          'terminal-error',
          'terminal-cursor',
          'terminal-bg-secondary',
        ];

        let colorVar: string | undefined;
        let colorValue: string | undefined;

        for (const cssVar of cssVars) {
          const flagValue = args.getFlag(cssVar);
          if (flagValue && typeof flagValue === 'string') {
            colorVar = '--' + cssVar;
            colorValue = flagValue;
            break;
          }
        }

        if (!colorVar || !colorValue) {
          return {
            output:
              'Usage: settings set color <variable> <value>\nExample: settings set color --terminal-accent #ff0000',
            error: true,
          };
        }

        const colors: Partial<ColorScheme> = {
          [colorVar]: colorValue,
        };
        themeManager.applyCustomColors(colors);
        broadcastSettingsChange();
        return { output: `Color ${colorVar} set to ${colorValue}` };
      }

      case 'font-size': {
        if (!value) return { output: 'Font size value required', error: true };
        const size = parseInt(value, 10);
        if (isNaN(size)) {
          return {
            output: 'Font size must be a number (8-24)',
            error: true,
          };
        }
        settingsManager.setFontSize(size);
        applyFontSettings(settingsManager);
        broadcastSettingsChange();
        return { output: `Font size set to: ${size}px` };
      }

      case 'font-family': {
        if (!value) return { output: 'Font family value required', error: true };
        const validFamilies: FontFamily[] = [
          'Fira Code',
          'JetBrains Mono',
          'Cascadia Code',
          'Menlo',
          'Monaco',
          'Courier New',
          'monospace',
        ];
        if (!validFamilies.includes(value as FontFamily)) {
          return {
            output: `Invalid font family: ${value}. Available: ${validFamilies.join(', ')}`,
            error: true,
          };
        }
        settingsManager.setFontFamily(value as FontFamily);
        applyFontSettings(settingsManager);
        broadcastSettingsChange();
        return { output: `Font family set to: ${value}` };
      }

      case 'scan-lines': {
        if (!value) return { output: 'Scan lines value required (on/off)', error: true };
        if (value !== 'on' && value !== 'off') {
          return {
            output: 'Scan lines must be "on" or "off"',
            error: true,
          };
        }
        const enabled = value === 'on';
        settingsManager.setScanLines(enabled);
        applyScanLines(enabled);
        broadcastSettingsChange();
        return { output: `Scan lines: ${value}` };
      }

      case 'glow': {
        if (!value) return { output: 'Glow value required (on/off)', error: true };
        if (value !== 'on' && value !== 'off') {
          return {
            output: 'Glow must be "on" or "off"',
            error: true,
          };
        }
        const enabled = value === 'on';
        settingsManager.setGlow(enabled);
        applyGlow(enabled);
        broadcastSettingsChange();
        return { output: `Glow: ${value}` };
      }

      case 'border': {
        if (!value) return { output: 'Border value required (on/off)', error: true };
        if (value !== 'on' && value !== 'off') {
          return {
            output: 'Border must be "on" or "off"',
            error: true,
          };
        }
        const enabled = value === 'on';
        settingsManager.setBorder(enabled);
        applyBorder(enabled);
        broadcastSettingsChange();
        return { output: `Border: ${value}` };
      }

      case 'animation-speed': {
        if (!value) return { output: 'Animation speed value required', error: true };
        const speed = parseFloat(value);
        if (isNaN(speed)) {
          return {
            output: 'Animation speed must be a number (0.5-2.0)',
            error: true,
          };
        }
        settingsManager.setAnimationSpeed(speed);
        applyAnimationSpeed(speed);
        broadcastSettingsChange();
        return { output: `Animation speed set to: ${speed}x` };
      }

      case 'sound-effects': {
        if (!value) return { output: 'Sound effects value required (on/off)', error: true };
        if (value !== 'on' && value !== 'off') {
          return {
            output: 'Sound effects must be "on" or "off"',
            error: true,
          };
        }
        const enabled = value === 'on';
        settingsManager.setSoundEffects(enabled);
        broadcastSettingsChange();
        return { output: `Sound effects: ${value}` };
      }

      case 'autoscroll': {
        if (!value) return { output: 'Autoscroll value required (on/off)', error: true };
        if (value !== 'on' && value !== 'off') {
          return {
            output: 'Autoscroll must be "on" or "off"',
            error: true,
          };
        }
        const enabled = value === 'on';
        settingsManager.setAutoScrollBehavior(enabled);
        broadcastSettingsChange();
        return {
          output: `Autoscroll: ${value} - ${enabled ? 'Long content (>50 lines) scrolls to command line' : 'All content scrolls to bottom'}`,
        };
      }

      case 'prompt': {
        if (!value) return { output: 'Prompt format value required', error: true };
        settingsManager.setPromptFormat(value);
        broadcastSettingsChange();
        return { output: `Prompt format set to: ${value}` };
      }

      default:
        return {
          output: `Unknown setting: ${setting}. Available: theme, color, font-size, font-family, scan-lines, glow, border, animation-speed, sound-effects, autoscroll, prompt`,
          error: true,
        };
    }
  } catch (error) {
    return {
      output: error instanceof Error ? error.message : String(error),
      error: true,
    };
  }
}

/**
 * Resets all settings to defaults.
 */
function handleReset(settingsManager: SettingsManager, themeManager: ThemeManager): CommandResult {
  settingsManager.reset();
  themeManager.applyCurrentTheme();
  applyFontSettings(settingsManager);
  applyScanLines(settingsManager.getScanLines());
  applyGlow(settingsManager.getGlow());
  applyBorder(settingsManager.getBorder());
  applyAnimationSpeed(settingsManager.getAnimationSpeed());
  broadcastSettingsChange();

  return { output: 'Settings reset to defaults.' };
}

/**
 * Formats current settings as markdown.
 */
function formatSettingsAsMarkdown(
  settingsManager: SettingsManager,
  themeManager: ThemeManager
): string {
  const settings = settingsManager.loadSettings();
  const presets = themeManager.getPresets();

  const themeName =
    settings.theme.preset === 'custom'
      ? 'Custom'
      : (presets.find((p) => p.name === settings.theme.preset)?.displayName ??
        settings.theme.preset);

  return `# Terminal Settings

## Current Configuration

### Theme
**${themeName}**

### Font
- **Size:** ${settings.font.size}px
- **Family:** ${settings.font.family}

### Prompt
- **Format:** \`${settings.prompt.format}\`

### Effects
- **Scan Lines:** ${settings.effects.scanLines ? 'Enabled' : 'Disabled'}
- **Glow:** ${settings.effects.glow ? 'Enabled' : 'Disabled'}
- **Border:** ${settings.effects.border ? 'Enabled' : 'Disabled'}
- **Animation Speed:** ${settings.effects.animationSpeed}x
- **Sound Effects:** ${settings.effects.soundEffects ? 'Enabled' : 'Disabled'}
- **Autoscroll:** ${settings.effects.autoScrollBehavior ? 'Enabled (smart)' : 'Disabled (classic)'}

## Available Themes

${presets.map((p) => `- **${p.name}**: ${p.displayName}`).join('\n')}

## Usage Examples

\`\`\`bash
settings set theme green            # Change to green theme
settings set theme yellow           # Change to yellow theme
settings set font-size 16           # Set font to 16px
settings set font-family Monaco     # Change font family
settings set scan-lines off         # Disable scan lines
settings set glow off               # Disable glow effect
settings set border on              # Enable page border
settings set animation-speed 1.5    # Speed up animations
settings set autoscroll on          # Smart scroll for long content
settings set autoscroll off         # Classic scroll to bottom
settings reset                      # Reset all to defaults
\`\`\`

For custom colors:
\`\`\`bash
settings set color --terminal-accent #ff0000
\`\`\`

For custom prompt (bash-style escapes supported):
\`\`\`bash
settings set prompt "\\\\u@\\\\h:\\\\W\\\\$ "    # user@host:lastdir$
settings set prompt "\\\\W\\\\$ "              # lastdir$ (minimal)
settings set prompt "[\\\\u] \\\\W> "          # [user] lastdir>
\`\`\`

Available prompt escapes:
- \\\\u = username
- \\\\h = hostname
- \\\\w = full working directory
- \\\\W = last directory name only
- \\\\$ = $ (or # if root)
- \\\\t = current time (24-hour HH:MM:SS)
- \\\\d = current date
`;
}

/**
 * Applies font settings to the DOM.
 */
function applyFontSettings(settingsManager: SettingsManager): void {
  const font = settingsManager.getSetting('font');

  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--terminal-font-size', `${font.size}px`);
    document.documentElement.style.setProperty('--terminal-font-family', font.family);
  }
}

/**
 * Applies scan lines toggle to the DOM.
 */
function applyScanLines(enabled: boolean): void {
  if (typeof document !== 'undefined') {
    if (enabled) {
      document.body.classList.remove('no-scan-lines');
    } else {
      document.body.classList.add('no-scan-lines');
    }
  }
}

/**
 * Applies glow effect toggle to the DOM.
 */
function applyGlow(enabled: boolean): void {
  if (typeof document !== 'undefined') {
    if (enabled) {
      document.body.classList.remove('no-glow');
    } else {
      document.body.classList.add('no-glow');
    }
  }
}

/**
 * Applies page border toggle to the DOM.
 */
function applyBorder(enabled: boolean): void {
  if (typeof document !== 'undefined') {
    if (enabled) {
      document.body.classList.add('border-enabled');
    } else {
      document.body.classList.remove('border-enabled');
    }
  }
}

/**
 * Applies animation speed to the DOM.
 */
function applyAnimationSpeed(speed: number): void {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--terminal-animation-speed', speed.toString());
  }
}

/**
 * Broadcasts settings change event to update all settings panels.
 */
function broadcastSettingsChange(): void {
  if (typeof document !== 'undefined') {
    const event = new CustomEvent('settings-changed');
    document.dispatchEvent(event);
  }
}
