/**
 * Settings UI Generator
 *
 * Generates interactive HTML for the settings panel with theme buttons,
 * color pickers, font controls, and effects toggles.
 */

import type { SettingsManager } from '../utils/SettingsManager';
import type { ThemeManager } from '../utils/ThemeManager';
import type { ThemePreset, CustomColors } from '../types/settings';

/**
 * Generates the complete interactive settings UI.
 *
 * @param settingsManager Settings persistence manager
 * @param themeManager Theme application manager
 * @returns HTML string for settings panel
 */
export function generateSettingsUI(
  settingsManager: SettingsManager,
  themeManager: ThemeManager
): string {
  const settings = settingsManager.loadSettings();
  const presets = themeManager.getPresets();

  return `
    <div class="settings-panel">
      <h2>Terminal Settings</h2>

      <!-- Theme Presets Section -->
      <section class="settings-section">
        <h3>Color Theme</h3>
        ${generateThemePresetButtons(presets, settings.theme.preset)}
      </section>

      <!-- Custom Colors Section (collapsible) -->
      <section class="settings-section">
        <details ${settings.theme.preset === 'custom' ? 'open' : ''}>
          <summary>Advanced: Custom Colors</summary>
          ${generateColorPickers(settings.theme.customColors)}
        </details>
      </section>

      <!-- Font Settings -->
      <section class="settings-section">
        <h3>Font</h3>
        ${generateFontControls(settings.font)}
      </section>

      <!-- Effects Settings -->
      <section class="settings-section">
        <h3>Effects</h3>
        ${generateEffectControls(settings.effects)}
      </section>

      <!-- Action Buttons -->
      <div class="settings-actions">
        <button onclick="executeCommand('settings reset')" class="btn-reset">
          Reset to Defaults
        </button>
      </div>

      <script>
        ${generateSettingsScript()}
      </script>
    </div>
  `;
}

/**
 * Generates theme preset buttons with color previews.
 *
 * @param presets Available theme presets
 * @param current Currently selected theme name
 * @returns HTML string for theme buttons
 */
function generateThemePresetButtons(presets: ThemePreset[], current: string): string {
  return presets.map(preset => `
    <button
      class="theme-button ${preset.name === current ? 'active' : ''}"
      onclick="executeCommand('settings set theme ${preset.name}')"
      data-theme="${preset.name}">
      <span class="theme-preview" style="background: ${preset.colors['--terminal-accent']}"></span>
      ${preset.displayName}
    </button>
  `).join('\n');
}

/**
 * Generates color picker inputs for custom theme colors.
 *
 * @param colors Current custom colors (if any)
 * @returns HTML string for color pickers
 */
function generateColorPickers(colors?: CustomColors): string {
  const vars = [
    { key: '--terminal-bg', label: 'Background', prop: 'background' as keyof CustomColors },
    { key: '--terminal-fg', label: 'Foreground', prop: 'foreground' as keyof CustomColors },
    { key: '--terminal-accent', label: 'Accent', prop: 'accent' as keyof CustomColors },
    { key: '--terminal-dim', label: 'Dim', prop: 'dim' as keyof CustomColors },
    { key: '--terminal-error', label: 'Error', prop: 'error' as keyof CustomColors },
    { key: '--terminal-cursor', label: 'Cursor', prop: 'cursor' as keyof CustomColors }
  ];

  return vars.map(v => {
    // Get current color from custom colors or computed CSS variable
    const currentColor = colors?.[v.prop] ||
      (typeof window !== 'undefined'
        ? getComputedStyle(document.documentElement).getPropertyValue(v.key).trim()
        : '#000000');

    return `
    <div class="color-picker-group">
      <label>${v.label}</label>
      <input
        type="color"
        value="${currentColor}"
        onchange="executeCommand('settings set color ${v.key} ' + this.value)"
      />
      <span class="color-value">${colors?.[v.prop] || 'default'}</span>
    </div>
  `;
  }).join('\n');
}

/**
 * Generates font size and family controls.
 *
 * @param font Current font settings
 * @returns HTML string for font controls
 */
function generateFontControls(font: { size: number; family: string }): string {
  const families = ['Courier New', 'Consolas', 'Monaco', 'monospace'];

  return `
    <div class="setting-group">
      <label>Font Size: <span id="font-size-value">${font.size}px</span></label>
      <input
        type="range"
        min="8"
        max="24"
        step="1"
        value="${font.size}"
        oninput="document.getElementById('font-size-value').textContent = this.value + 'px'"
        onchange="executeCommand('settings set font-size ' + this.value)"
      />
    </div>

    <div class="setting-group">
      <label>Font Family</label>
      <select onchange="executeCommand('settings set font-family &quot;' + this.value + '&quot;')">
        ${families.map(f => `
          <option value="${f}" ${f === font.family ? 'selected' : ''}>${f}</option>
        `).join('\n')}
      </select>
    </div>
  `;
}

/**
 * Generates effect controls (CRT, animation speed, sound).
 *
 * @param effects Current effect settings
 * @returns HTML string for effect controls
 */
function generateEffectControls(effects: { crt: boolean; animationSpeed: number; soundEffects: boolean }): string {
  return `
    <div class="setting-group">
      <label>
        <input
          type="checkbox"
          ${effects.crt ? 'checked' : ''}
          onchange="executeCommand('settings set crt-effects ' + (this.checked ? 'on' : 'off'))"
        />
        CRT Effects (scan lines & glow)
      </label>
    </div>

    <div class="setting-group">
      <label>Animation Speed: <span id="animation-speed-value">${effects.animationSpeed}x</span></label>
      <input
        type="range"
        min="0.5"
        max="2.0"
        step="0.1"
        value="${effects.animationSpeed}"
        oninput="document.getElementById('animation-speed-value').textContent = this.value + 'x'"
        onchange="executeCommand('settings set animation-speed ' + this.value)"
      />
    </div>

    <div class="setting-group">
      <label>
        <input
          type="checkbox"
          ${effects.soundEffects ? 'checked' : ''}
          onchange="executeCommand('settings set sound-effects ' + (this.checked ? 'on' : 'off'))"
        />
        Sound Effects (future feature)
      </label>
    </div>
  `;
}

/**
 * Generates embedded JavaScript for command execution.
 *
 * @returns JavaScript code as string
 */
function generateSettingsScript(): string {
  return `
    function executeCommand(cmd) {
      // Dispatch custom event for Terminal component to listen
      const event = new CustomEvent('terminal-command', { detail: cmd });
      document.dispatchEvent(event);
    }
  `;
}
