/**
 * Settings UI Generator
 *
 * Generates interactive HTML for the settings panel with theme buttons,
 * color pickers, font controls, and effects toggles.
 *
 * Security: Uses data attributes instead of inline event handlers to comply
 * with strict Content Security Policy (CSP). Event delegation is handled
 * in the setupSettingsUIHandler method.
 */

import type { ThemePreset, CustomColors } from '../types/settings';
import type { SettingsManager } from '../utils/SettingsManager';
import type { ThemeManager } from '../utils/ThemeManager';

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

  return `<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true"><h2>Terminal Settings</h2><section class="settings-section"><h3>Color Theme</h3>${generateThemePresetButtons(presets, settings.theme.preset)}</section><section class="settings-section"><details ${settings.theme.preset === 'custom' ? 'open' : ''}><summary>Advanced: Custom Colors</summary>${generateColorPickers(settings.theme.customColors)}</details></section><section class="settings-section"><h3>Font</h3>${generateFontControls(settings.font)}</section><section class="settings-section"><h3>Effects</h3>${generateEffectControls(settings.effects)}</section><section class="settings-section"><h3>Screensaver</h3>${generateScreensaverControls(settings.screensaver)}</section><div class="settings-actions"><button data-command="settings reset" class="btn-reset">Reset to Defaults</button></div></aside>`;
}

/**
 * Generates theme preset buttons with color previews.
 *
 * @param presets Available theme presets
 * @param current Currently selected theme name
 * @returns HTML string for theme buttons
 */
function generateThemePresetButtons(presets: ThemePreset[], current: string): string {
  return (
    '<div class="theme-buttons-container">' +
    presets
      .map(
        (preset) =>
          `<button class="theme-button ${preset.name === current ? 'active' : ''}" data-command="settings set theme ${preset.name}" data-theme="${preset.name}" style="background: ${preset.colors['--terminal-bg']}; color: ${preset.colors['--terminal-accent']}; border-color: ${preset.colors['--terminal-accent']};"><span class="theme-preview" style="background: ${preset.colors['--terminal-accent']}"></span>${preset.displayName}</button>`
      )
      .join('') +
    '</div>'
  );
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
    {
      key: '--terminal-bg-secondary',
      label: 'BG (Secondary)',
      prop: 'backgroundSecondary' as keyof CustomColors,
    },
    { key: '--terminal-fg', label: 'Foreground', prop: 'foreground' as keyof CustomColors },
    { key: '--terminal-accent', label: 'Accent', prop: 'accent' as keyof CustomColors },
    { key: '--terminal-dim', label: 'Dim', prop: 'dim' as keyof CustomColors },
    { key: '--terminal-error', label: 'Error', prop: 'error' as keyof CustomColors },
    { key: '--terminal-cursor', label: 'Cursor', prop: 'cursor' as keyof CustomColors },
  ];

  return vars
    .map((v) => {
      const currentColor =
        colors?.[v.prop] ??
        (typeof window !== 'undefined'
          ? getComputedStyle(document.documentElement).getPropertyValue(v.key).trim()
          : '#000000');
      return `<div class="color-picker-group"><label>${v.label}</label><input type="color" value="${currentColor}" data-command-template="settings set color ${v.key}" data-color-var="${v.key}"/><span class="color-value">${colors?.[v.prop] ?? 'default'}</span></div>`;
    })
    .join('');
}

/**
 * Generates font size and family controls.
 *
 * @param font Current font settings
 * @returns HTML string for font controls
 */
function generateFontControls(font: { size: number; family: string }): string {
  const families = [
    'Fira Code',
    'JetBrains Mono',
    'Cascadia Code',
    'Menlo',
    'Monaco',
    'Courier New',
    'monospace',
  ];
  return `<div class="setting-group"><label>Font Size: <span id="font-size-value">${font.size}px</span></label><input type="range" min="8" max="24" step="1" value="${font.size}" aria-label="Font size" aria-valuemin="8" aria-valuemax="24" aria-valuenow="${font.size}" aria-valuetext="${font.size} pixels" data-command-template="settings set font-size" data-setting-type="font-size"/></div><div class="setting-group"><label>Font Family</label><select aria-label="Font family" data-command-template="settings set font-family" data-setting-type="font-family">${families.map((f) => `<option value="${f}" ${f === font.family ? 'selected' : ''}>${f}</option>`).join('')}</select></div>`;
}

/**
 * Generates effect controls (scan lines, glow, border, animation speed, sound).
 *
 * @param effects Current effect settings
 * @returns HTML string for effect controls
 */
function generateEffectControls(effects: {
  scanLines: boolean;
  glow: boolean;
  border: boolean;
  animationSpeed: number;
  soundEffects: boolean;
}): string {
  return `<div class="setting-group"><label><input type="checkbox" ${effects.scanLines ? 'checked' : ''} data-command-template="settings set scan-lines" data-setting-type="scan-lines"/>Scan Lines</label></div><div class="setting-group"><label><input type="checkbox" ${effects.glow ? 'checked' : ''} data-command-template="settings set glow" data-setting-type="glow"/>Glow Effect</label></div><div class="setting-group"><label><input type="checkbox" ${effects.border ? 'checked' : ''} data-command-template="settings set border" data-setting-type="border"/>Page Border</label></div><div class="setting-group"><label>Animation Speed: <span id="animation-speed-value">${effects.animationSpeed}x</span></label><input type="range" min="0.5" max="2.0" step="0.1" value="${effects.animationSpeed}" aria-label="Animation speed" aria-valuemin="0.5" aria-valuemax="2" aria-valuenow="${effects.animationSpeed}" aria-valuetext="${effects.animationSpeed} times speed" data-command-template="settings set animation-speed" data-setting-type="animation-speed"/></div><div class="setting-group"><label><input type="checkbox" ${effects.soundEffects ? 'checked' : ''} data-command-template="settings set sound-effects" data-setting-type="sound-effects"/>Sound Effects (future feature)</label></div>`;
}

/**
 * Generates screensaver controls (enable, timeout, type).
 *
 * @param screensaver Current screensaver settings
 * @returns HTML string for screensaver controls
 */
function generateScreensaverControls(screensaver: {
  enabled: boolean;
  timeoutMinutes: number;
  activeScreensaver: string;
}): string {
  const screensaverTypes = [
    { value: 'matrix', label: 'Matrix Digital Rain' },
    { value: 'life', label: "Conway's Game of Life" },
  ];

  return `<div class="setting-group"><label><input type="checkbox" ${screensaver.enabled ? 'checked' : ''} data-command-template="settings set screensaver-enabled" data-setting-type="screensaver-enabled"/>Enable Screensaver</label></div><div class="setting-group"><label>Timeout: <span id="screensaver-timeout-value">${screensaver.timeoutMinutes}min</span></label><input type="range" min="1" max="60" step="1" value="${screensaver.timeoutMinutes}" aria-label="Screensaver timeout" aria-valuemin="1" aria-valuemax="60" aria-valuenow="${screensaver.timeoutMinutes}" aria-valuetext="${screensaver.timeoutMinutes} minutes" data-command-template="settings set screensaver-timeout" data-setting-type="screensaver-timeout"/></div><div class="setting-group"><label>Screensaver Type</label><select aria-label="Screensaver type" data-command-template="settings set screensaver-type" data-setting-type="screensaver-type">${screensaverTypes.map((type) => `<option value="${type.value}" ${type.value === screensaver.activeScreensaver ? 'selected' : ''}>${type.label}</option>`).join('')}</select></div>`;
}
