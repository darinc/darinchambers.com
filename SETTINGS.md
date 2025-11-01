# User-Configurable Settings System Implementation Plan

## Overview

This document outlines the implementation plan for a user-configurable settings system that allows users to customize their terminal experience through both CLI commands and an interactive UI.

## User Requirements

- **Terminal color themes:** Preset options (green/default, yellow, white, light-blue) + custom color picker
- **CLI interface:** Commands like `settings list`, `settings set color white`
- **Interactive UI:** Clickable settings page with controls
- **Navigation integration:** Settings link in nav bar
- **Help integration:** Settings command documented in help
- **Persistence:** Settings saved in localStorage
- **Future extensibility:** Support for font size, CRT effects, sound effects, animation speed

## Architecture Decisions

Based on user preferences:

✅ **UI Approach:** Hybrid - Markdown display with embedded interactive HTML controls
✅ **Storage:** Both localStorage (persistence) + virtual FS at `/home/darin/.settings` (visibility via cat)
✅ **Color System:** Preset themes + advanced mode for custom CSS variable control
✅ **Future Settings:** Font size/family, CRT effects toggle, sound effects, animation speed

---

## Phase 1: Core Infrastructure (Foundation)

### 1.1 Create SettingsManager Service

**File:** `src/utils/SettingsManager.ts`

**Purpose:** Central service for managing all user settings

**Key Responsibilities:**
- Load settings from localStorage on initialization
- Save settings to localStorage after changes
- Sync settings to virtual filesystem (JSON format)
- Provide getter/setter methods for individual settings
- Maintain default values
- Validate setting values

**Interface:**
```typescript
interface SettingsConfig {
  theme: {
    preset: 'green' | 'yellow' | 'white' | 'light-blue' | 'custom';
    customColors?: {
      background: string;
      foreground: string;
      accent: string;
      dim: string;
      error: string;
      cursor: string;
    };
  };
  font: {
    size: number; // 8-24px
    family: 'Courier New' | 'Consolas' | 'Monaco' | 'monospace';
  };
  effects: {
    crt: boolean;
    animationSpeed: number; // 0.5-2.0x multiplier
    soundEffects: boolean;
  };
}

class SettingsManager {
  constructor(fileSystem: IFileSystem);
  loadSettings(): SettingsConfig;
  saveSettings(settings: SettingsConfig): void;
  getSetting<K extends keyof SettingsConfig>(key: K): SettingsConfig[K];
  setSetting<K extends keyof SettingsConfig>(key: K, value: SettingsConfig[K]): void;
  reset(): void;
  private syncToFileSystem(): void;
}
```

**Implementation Notes:**
- Use `localStorage.getItem('terminal-settings')` for persistence
- Write to virtual FS at `/home/darin/.settings` as formatted JSON
- Singleton pattern for global access
- Default theme is 'green' (current terminal style)

---

### 1.2 Define Settings Types

**File:** `src/types/settings.ts`

**Purpose:** TypeScript interfaces and types for type safety

**Contents:**
```typescript
export interface SettingsConfig {
  // (same as above)
}

export interface ThemePreset {
  name: string;
  displayName: string;
  colors: ColorScheme;
}

export interface ColorScheme {
  '--terminal-bg': string;
  '--terminal-fg': string;
  '--terminal-accent': string;
  '--terminal-dim': string;
  '--terminal-error': string;
  '--terminal-cursor': string;
}

export type ThemePresetName = 'green' | 'yellow' | 'white' | 'light-blue' | 'custom';
export type FontFamily = 'Courier New' | 'Consolas' | 'Monaco' | 'monospace';
```

---

### 1.3 Create Theme System

**File:** `src/utils/ThemeManager.ts`

**Purpose:** Handle theme application and CSS variable manipulation

**Key Responsibilities:**
- Define preset theme color schemes
- Apply themes by updating CSS variables
- Support custom color overrides
- Validate color values (hex format)

**Preset Themes:**

**Green (Default/Matrix)**
```typescript
{
  name: 'green',
  displayName: 'Green (Default)',
  colors: {
    '--terminal-bg': '#0a0e14',
    '--terminal-fg': '#39ff14',
    '--terminal-accent': '#39ff14',
    '--terminal-dim': '#20c20e',
    '--terminal-error': '#ff3333',
    '--terminal-cursor': '#39ff14'
  }
}
```

**Yellow (Amber)**
```typescript
{
  name: 'yellow',
  displayName: 'Yellow (Amber)',
  colors: {
    '--terminal-bg': '#1a1410',
    '--terminal-fg': '#ffb000',
    '--terminal-accent': '#ffd700',
    '--terminal-dim': '#cc8800',
    '--terminal-error': '#ff3333',
    '--terminal-cursor': '#ffb000'
  }
}
```

**White (Light)**
```typescript
{
  name: 'white',
  displayName: 'White (Light)',
  colors: {
    '--terminal-bg': '#1a1a1a',
    '--terminal-fg': '#e0e0e0',
    '--terminal-accent': '#ffffff',
    '--terminal-dim': '#999999',
    '--terminal-error': '#ff5555',
    '--terminal-cursor': '#ffffff'
  }
}
```

**Light Blue (Cyan)**
```typescript
{
  name: 'light-blue',
  displayName: 'Light Blue (Cyan)',
  colors: {
    '--terminal-bg': '#0a1420',
    '--terminal-fg': '#00d4ff',
    '--terminal-accent': '#00ffff',
    '--terminal-dim': '#0088aa',
    '--terminal-error': '#ff3333',
    '--terminal-cursor': '#00d4ff'
  }
}
```

**Interface:**
```typescript
class ThemeManager {
  constructor(settingsManager: SettingsManager);

  getPresets(): ThemePreset[];
  getPreset(name: ThemePresetName): ThemePreset | null;
  applyTheme(themeName: ThemePresetName): void;
  applyCustomColors(colors: Partial<ColorScheme>): void;
  applyCurrentTheme(): void; // Load from settings and apply

  private updateCSSVariables(colors: ColorScheme): void;
  private validateColor(color: string): boolean;
}
```

**Implementation:**
```typescript
private updateCSSVariables(colors: ColorScheme): void {
  const root = document.documentElement;
  Object.entries(colors).forEach(([variable, value]) => {
    root.style.setProperty(variable, value);
  });
}
```

---

### 1.4 Update Constants

**File:** `src/constants.ts`

**Add:**
```typescript
export const PATHS = {
  // ... existing paths
  CONFIG_SETTINGS: '/home/darin/.settings'
} as const;

export const STORAGE_KEYS = {
  SETTINGS: 'terminal-settings'
} as const;

export const DEFAULT_SETTINGS: SettingsConfig = {
  theme: {
    preset: 'green',
    customColors: undefined
  },
  font: {
    size: 14,
    family: 'Courier New'
  },
  effects: {
    crt: true,
    animationSpeed: 1.0,
    soundEffects: false
  }
};
```

---

## Phase 2: Settings Command (CLI Interface)

### 2.1 Create Settings Command

**File:** `src/commands/local/settings.ts`

**Purpose:** Provide CLI interface for settings management

**Command Syntax:**
```bash
settings                              # Display interactive UI
settings list                         # Show current settings as text
settings set theme <name>             # Apply preset theme
settings set color <var> <value>      # Set custom CSS variable
settings set font-size <value>        # Set font size (8-24)
settings set font-family <name>       # Set font family
settings set crt-effects <on|off>     # Toggle CRT effects
settings set animation-speed <value>  # Set animation speed (0.5-2.0)
settings set sound-effects <on|off>   # Toggle sound effects
settings reset                        # Restore all defaults
```

**Implementation Structure:**
```typescript
export function createSettingsCommand(
  fs: IFileSystem,
  settingsManager: SettingsManager,
  themeManager: ThemeManager
): Command {
  return {
    name: 'settings',
    description: 'Manage terminal settings and preferences',
    aliases: ['preferences', 'config'],
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      // No args: show interactive UI
      if (args.length === 0) {
        return {
          output: generateSettingsUI(settingsManager, themeManager),
          html: true
        };
      }

      const subcommand = cmdArgs.getPositional(0);

      switch (subcommand) {
        case 'list':
          return handleList(settingsManager);

        case 'set':
          return handleSet(cmdArgs, settingsManager, themeManager);

        case 'reset':
          return handleReset(settingsManager, themeManager);

        default:
          return {
            output: `Unknown subcommand: ${subcommand}. Use 'help settings' for usage.`,
            error: true
          };
      }
    }
  };
}

function handleList(settingsManager: SettingsManager): CommandResult {
  const settings = settingsManager.loadSettings();
  const markdown = formatSettingsAsMarkdown(settings);
  return { output: MarkdownService.render(markdown), html: true };
}

function handleSet(
  args: CommandArgs,
  settingsManager: SettingsManager,
  themeManager: ThemeManager
): CommandResult {
  const setting = args.getPositional(1);
  const value = args.getPositional(2);

  // Validate and apply setting
  // Return success/error message
}

function handleReset(
  settingsManager: SettingsManager,
  themeManager: ThemeManager
): CommandResult {
  settingsManager.reset();
  themeManager.applyCurrentTheme();
  return { output: 'Settings reset to defaults.' };
}
```

---

### 2.2 Register Command and Initialize

**File:** `src/main.ts`

**Changes:**
```typescript
// After FileSystem initialization
const settingsManager = new SettingsManager(fileSystem);
const themeManager = new ThemeManager(settingsManager);

// Apply saved theme BEFORE terminal initialization
themeManager.applyCurrentTheme();

// Create settings command
const settingsCommand = createSettingsCommand(
  fileSystem,
  settingsManager,
  themeManager
);

// Register with other commands
terminal.registerCommands([
  // ... existing commands
  settingsCommand
]);

// Add to navigation
const navItems: NavItem[] = [
  { label: 'about', command: 'about' },
  { label: 'portfolio', command: 'portfolio' },
  { label: 'blog', command: 'blog' },
  { label: 'contact', command: 'contact' },
  { label: 'skills', command: 'skills' },
  { label: 'settings', command: 'settings' }, // NEW
  { label: 'help', command: 'help' }
];
```

---

## Phase 3: Interactive Settings UI

### 3.1 Create Settings UI Generator

**File:** `src/components/SettingsUI.ts`

**Purpose:** Generate interactive HTML for settings panel

**Structure:**
```typescript
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

function generateColorPickers(colors?: CustomColors): string {
  const vars = [
    { key: '--terminal-bg', label: 'Background' },
    { key: '--terminal-fg', label: 'Foreground' },
    { key: '--terminal-accent', label: 'Accent' },
    { key: '--terminal-dim', label: 'Dim' },
    { key: '--terminal-error', label: 'Error' },
    { key: '--terminal-cursor', label: 'Cursor' }
  ];

  return vars.map(v => `
    <div class="color-picker-group">
      <label>${v.label}</label>
      <input
        type="color"
        value="${colors?.[v.key] || getComputedStyle(document.documentElement).getPropertyValue(v.key)}"
        onchange="executeCommand('settings set color ${v.key} ' + this.value)"
      />
      <span class="color-value">${colors?.[v.key] || 'default'}</span>
    </div>
  `).join('\n');
}

function generateSettingsScript(): string {
  return `
    function executeCommand(cmd) {
      // Find terminal instance and execute command
      const event = new CustomEvent('terminal-command', { detail: cmd });
      document.dispatchEvent(event);
    }
  `;
}
```

---

### 3.2 Settings UI Styling

**File:** `src/styles/settings.css`

**Purpose:** Style the settings panel to match terminal aesthetic

**Key Styles:**
```css
.settings-panel {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.settings-section {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid var(--terminal-dim);
  border-radius: 4px;
}

.settings-section h3 {
  color: var(--terminal-accent);
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.1em;
  text-transform: uppercase;
}

/* Theme Buttons */
.theme-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  margin: 5px;
  background: rgba(57, 255, 20, 0.05);
  border: 1px solid var(--terminal-dim);
  color: var(--terminal-fg);
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
}

.theme-button:hover {
  border-color: var(--terminal-accent);
  background: rgba(57, 255, 20, 0.1);
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.2);
}

.theme-button.active {
  border-color: var(--terminal-accent);
  background: rgba(57, 255, 20, 0.15);
  font-weight: bold;
}

.theme-preview {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--terminal-dim);
}

/* Color Pickers */
.color-picker-group {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0;
}

.color-picker-group label {
  min-width: 120px;
  color: var(--terminal-fg);
}

.color-picker-group input[type="color"] {
  width: 60px;
  height: 40px;
  border: 1px solid var(--terminal-dim);
  background: transparent;
  cursor: pointer;
}

.color-value {
  font-family: 'Courier New', monospace;
  color: var(--terminal-dim);
  font-size: 12px;
}

/* Sliders */
input[type="range"] {
  flex: 1;
  accent-color: var(--terminal-accent);
}

/* Checkboxes */
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: var(--terminal-accent);
  cursor: pointer;
}

/* Action Buttons */
.settings-actions {
  margin-top: 30px;
  text-align: center;
}

.btn-reset {
  padding: 12px 30px;
  background: rgba(255, 51, 51, 0.1);
  border: 1px solid var(--terminal-error);
  color: var(--terminal-error);
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-reset:hover {
  background: rgba(255, 51, 51, 0.2);
  box-shadow: 0 0 10px rgba(255, 51, 51, 0.3);
}

/* Collapsible Details */
details {
  margin-top: 10px;
}

details summary {
  cursor: pointer;
  color: var(--terminal-accent);
  padding: 10px;
  border: 1px solid var(--terminal-dim);
  border-radius: 4px;
  user-select: none;
}

details summary:hover {
  background: rgba(57, 255, 20, 0.05);
}

details[open] summary {
  margin-bottom: 15px;
}
```

**Import in:** `src/styles/index.css`
```css
@import './settings.css';
```

---

### 3.3 Command Execution Integration

**File:** `src/components/Terminal.ts`

**Add event listener for settings UI commands:**
```typescript
constructor() {
  // ... existing code

  // Listen for settings commands from UI
  document.addEventListener('terminal-command', (e: CustomEvent) => {
    this.executeCommand(e.detail, false);
  });
}
```

---

## Phase 4: Additional Settings Features

### 4.1 Font Size/Family

**Update CSS Variables:**
Add to `src/styles/variables.css`:
```css
:root {
  --terminal-font-size: 14px;
  --terminal-font-family: 'Courier New', monospace;
}
```

**Update Usages:**
In `src/styles/terminal-io.css`:
```css
#terminal-input {
  font-size: var(--terminal-font-size);
  font-family: var(--terminal-font-family);
}

#terminal-output {
  font-size: var(--terminal-font-size);
  font-family: var(--terminal-font-family);
}
```

**Apply via ThemeManager:**
```typescript
applyFontSettings(font: FontSettings): void {
  document.documentElement.style.setProperty('--terminal-font-size', `${font.size}px`);
  document.documentElement.style.setProperty('--terminal-font-family', font.family);
}
```

---

### 4.2 CRT Effects Toggle

**Update CSS:**
In `src/styles/base.css`:
```css
/* Default: CRT effects enabled */
body::before {
  /* Scan lines effect */
  content: '';
  /* ... existing scan line styles */
}

/* When CRT effects disabled */
body.no-crt-effects::before {
  display: none;
}

body.no-crt-effects .terminal-container {
  box-shadow: none; /* Remove CRT glow */
  text-shadow: none; /* Remove text glow */
}
```

**Apply via SettingsManager:**
```typescript
applyCRTEffects(enabled: boolean): void {
  if (enabled) {
    document.body.classList.remove('no-crt-effects');
  } else {
    document.body.classList.add('no-crt-effects');
  }
}
```

---

### 4.3 Animation Speed

**Update CSS Variable:**
```css
:root {
  --terminal-animation-speed: 1.0;
}
```

**Update Animation Durations:**
```css
.typing-animation {
  animation-duration: calc(0.5s / var(--terminal-animation-speed));
}
```

**Slider in UI:**
```html
<div class="setting-group">
  <label>Animation Speed</label>
  <input
    type="range"
    min="0.5"
    max="2.0"
    step="0.1"
    value="${settings.effects.animationSpeed}"
    onchange="executeCommand('settings set animation-speed ' + this.value)"
  />
  <span>${settings.effects.animationSpeed}x</span>
</div>
```

---

### 4.4 Sound Effects (Future Enhancement)

**Create SoundManager:**
```typescript
// src/utils/SoundManager.ts
class SoundManager {
  private enabled: boolean = false;
  private sounds: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    this.loadSounds();
  }

  private loadSounds(): void {
    this.sounds.set('keypress', new Audio('/sounds/keypress.mp3'));
    this.sounds.set('complete', new Audio('/sounds/complete.mp3'));
    this.sounds.set('error', new Audio('/sounds/error.mp3'));
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  play(soundName: string): void {
    if (!this.enabled) return;
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {/* Ignore play errors */});
    }
  }
}
```

**Add audio files to:** `public/sounds/`

**Integrate in TerminalInput:**
```typescript
handleKeyPress(e: KeyboardEvent): void {
  soundManager.play('keypress');
  // ... existing code
}
```

---

## Phase 5: Help Documentation

### 5.1 Update Help Content

**File:** `src/content/help.md`

**Add to LOCAL COMMANDS section:**
```markdown
### LOCAL COMMANDS

**settings**
Open interactive settings panel to customize terminal appearance and behavior.

**settings list**
Display current settings configuration.

**settings set <option> <value>**
Change a specific setting value.

Examples:
- `settings set theme yellow` - Switch to yellow/amber theme
- `settings set theme green` - Switch to green/default theme
- `settings set theme white` - Switch to white/light theme
- `settings set theme light-blue` - Switch to cyan theme
- `settings set color --terminal-accent #00ff00` - Set custom accent color
- `settings set font-size 16` - Set font size to 16px
- `settings set crt-effects off` - Disable CRT scan line effects
- `settings set animation-speed 1.5` - Speed up animations by 1.5x

**settings reset**
Restore all settings to their default values.

Aliases: preferences, config
```

---

### 5.2 Create Settings Documentation (Optional)

**File:** `src/content/settings-help.md`

**Content:**
```markdown
# Terminal Settings Guide

## Available Themes

### Green (Default)
The classic terminal look with bright green text on dark background. This is the default theme inspired by vintage CRT terminals.

### Yellow (Amber)
Warm amber/yellow tones reminiscent of old monochrome monitors from the 1980s.

### White (Light)
Clean white text on dark background for better readability and reduced eye strain.

### Light Blue (Cyan)
Cool cyan/light blue tones for a modern cyberpunk aesthetic.

### Custom
Create your own theme by customizing individual color variables. Access via the "Advanced: Custom Colors" section in the settings UI.

## CSS Variables

You can customize the following CSS variables:
- `--terminal-bg`: Terminal background color
- `--terminal-fg`: Primary text color
- `--terminal-accent`: Accent color for links, headers, highlights
- `--terminal-dim`: Dimmed text color for borders and secondary text
- `--terminal-error`: Error message color
- `--terminal-cursor`: Cursor color

## Font Settings

Adjust font size (8-24px) and font family for optimal readability. Available fonts:
- Courier New (default)
- Consolas
- Monaco
- monospace (system default)

## Effects

### CRT Effects
Enable or disable vintage CRT monitor effects including:
- Scan lines overlay
- Screen glow
- Text glow

### Animation Speed
Control the speed of typing animations and transitions. Range: 0.5x (slow) to 2.0x (fast).

### Sound Effects
Toggle keyboard typing sounds and command completion audio feedback.

## Persistence

All settings are automatically saved to browser localStorage and persist across sessions. Your preferences are also visible in the virtual filesystem at `/home/darin/.settings`.

## Reset

To restore all settings to their defaults, use:
```
settings reset
```
```

**Add to virtual filesystem in:** `src/utils/fs/FileSystemInitializer.ts`

---

## Phase 6: Testing

### 6.1 Unit Tests

**File:** `tests/unit/utils/SettingsManager.test.ts`
- Load settings from localStorage
- Save settings to localStorage
- Sync to virtual filesystem
- Get/set individual settings
- Reset to defaults
- Handle missing/corrupted localStorage data

**File:** `tests/unit/utils/ThemeManager.test.ts`
- Get preset themes
- Apply preset themes
- Apply custom colors
- Validate color formats
- Update CSS variables
- Handle invalid theme names

**File:** `tests/unit/commands/local/settings.test.ts`
- Execute with no args (show UI)
- Execute `settings list`
- Execute `settings set theme <name>`
- Execute `settings set color <var> <value>`
- Execute `settings reset`
- Handle invalid subcommands
- Handle invalid values

---

### 6.2 Integration Tests

**File:** `tests/integration/settings-persistence.test.ts`
- Settings saved to localStorage persist across page reloads
- Settings synced to virtual filesystem are readable via cat command
- Changes via CLI update localStorage and virtual FS
- Changes via UI update localStorage and virtual FS

**File:** `tests/integration/theme-application.test.ts`
- Theme changes update CSS variables
- Theme changes persist across sessions
- Custom colors override preset themes
- Font settings update DOM styles
- CRT effects toggle adds/removes CSS classes

---

## Phase 7: Implementation Order

### Step 1: Foundation (Phase 1)
1. ✅ Create `src/types/settings.ts`
2. ✅ Create `src/utils/SettingsManager.ts`
3. ✅ Create `src/utils/ThemeManager.ts`
4. ✅ Update `src/constants.ts`

### Step 2: CLI Interface (Phase 2)
5. ✅ Create `src/commands/local/settings.ts`
6. ✅ Update `src/main.ts` - initialize managers
7. ✅ Update `src/main.ts` - register command
8. ✅ Update `src/main.ts` - add to navigation

### Step 3: Interactive UI (Phase 3)
9. Create `src/components/SettingsUI.ts`
10. Create `src/styles/settings.css`
11. Update `src/styles/index.css` - import settings.css
12. Update `src/components/Terminal.ts` - event listener

### Step 4: Basic Theme Switching
13. Test theme switching via CLI
14. Test theme switching via UI
15. Verify localStorage persistence
16. Verify virtual FS sync

### Step 5: Additional Features (Phase 4)
17. Implement font size/family settings
18. Implement CRT effects toggle
19. Implement animation speed control
20. Prepare sound effects infrastructure (files only, not integrated)

### Step 6: Documentation (Phase 5)
21. Update `src/content/help.md`
22. Create `src/content/settings-help.md` (optional)
23. Add settings-help.md to virtual filesystem

### Step 7: Testing (Phase 6)
24. ✅ Write SettingsManager unit tests
25. ✅ Write ThemeManager unit tests
26. Write settings command unit tests
27. Write integration tests
28. Verify test coverage (target: 80%+)

### Step 8: Polish & Refinement
29. Test on different browsers
30. Test responsive behavior
31. Refine UI styling
32. Add loading states/transitions
33. Handle edge cases

---

## Technical Implementation Details

### localStorage Schema

**Key:** `terminal-settings`

**Value (JSON):**
```json
{
  "version": "1.0",
  "theme": {
    "preset": "green",
    "customColors": null
  },
  "font": {
    "size": 14,
    "family": "Courier New"
  },
  "effects": {
    "crt": true,
    "animationSpeed": 1.0,
    "soundEffects": false
  }
}
```

### Virtual Filesystem File

**Path:** `/home/darin/.settings`

**Content:** Same JSON as localStorage (formatted with 2-space indent for readability)

**Access:** `cat /home/darin/.settings`

---

### CSS Variable Updates

**Method:**
```typescript
document.documentElement.style.setProperty('--terminal-accent', '#00ff00');
```

**Scope:** Updates apply globally to entire document via `:root` selector

**Persistence:** Changes are temporary (DOM only). Must save to localStorage for persistence.

---

### Event Flow for UI Changes

1. User clicks theme button in settings UI
2. Button's `onclick` triggers `executeCommand('settings set theme yellow')`
3. Custom event dispatched: `new CustomEvent('terminal-command', { detail: cmd })`
4. Terminal component listens for event and calls `terminal.executeCommand(cmd)`
5. Settings command's `execute()` method processes the command
6. SettingsManager updates internal state
7. ThemeManager applies CSS variable changes
8. SettingsManager saves to localStorage
9. SettingsManager syncs to virtual filesystem
10. Success message displayed in terminal output
11. UI re-renders (if needed) to show updated state

---

## File Structure Summary

### New Files Created (8)
```
src/types/settings.ts                          (interfaces/types)
src/utils/SettingsManager.ts                   (service)
src/utils/ThemeManager.ts                      (service)
src/components/SettingsUI.ts                   (UI generator)
src/commands/local/settings.ts                 (command)
src/styles/settings.css                        (styles)
src/content/settings-help.md                   (documentation)
tests/unit/utils/SettingsManager.test.ts       (tests)
tests/unit/utils/ThemeManager.test.ts          (tests)
tests/unit/commands/local/settings.test.ts     (tests)
tests/integration/settings-persistence.test.ts (tests)
tests/integration/theme-application.test.ts    (tests)
```

### Files Modified (5)
```
src/constants.ts                   (add paths and defaults)
src/main.ts                        (initialize and register)
src/styles/index.css              (import settings.css)
src/styles/variables.css          (add font variables)
src/content/help.md               (document settings command)
src/components/Terminal.ts        (event listener)
```

---

## Success Criteria

### Minimum Viable Product (MVP)
- ✅ 4 preset themes (green, yellow, white, light-blue) working
- ✅ CLI commands: `settings`, `settings list`, `settings set theme <name>`, `settings reset`
- ✅ Interactive UI with theme buttons
- ✅ Settings persist in localStorage
- ✅ Settings visible in virtual FS via `cat /home/darin/.settings`
- ✅ Settings link in navigation
- ✅ Settings documented in help

### Full Feature Set
- ✅ MVP items above
- ✅ Custom color picker for advanced users
- ✅ Font size and family controls
- ✅ CRT effects toggle
- ✅ Animation speed control
- ✅ Sound effects toggle (infrastructure only, not fully integrated)
- ✅ Comprehensive test suite (80%+ coverage)
- ✅ Responsive settings UI
- ✅ Settings help documentation

---

## Estimated Effort

- **MVP Implementation:** 6-8 hours
- **Full Feature Set:** 12-16 hours
- **Testing & Documentation:** 4-6 hours
- **Total:** 16-22 hours

---

## Future Enhancements (Post-MVP)

1. **Import/Export Settings**
   - Export settings as JSON file
   - Import settings from file
   - Share settings via URL parameter

2. **Theme Gallery**
   - Community-contributed themes
   - Preview themes before applying
   - More preset themes (dracula, solarized, monokai, etc.)

3. **Sound Effects Integration**
   - Keyboard typing sounds
   - Command completion sounds
   - Error sounds
   - Volume control

4. **Advanced Customization**
   - Line height control
   - Letter spacing
   - Cursor style (block, underline, bar)
   - Blink rate

5. **Accessibility Features**
   - High contrast mode
   - Screen reader support
   - Reduced motion mode
   - Keyboard navigation hints

---

*Last Updated: 2025-10-31*
