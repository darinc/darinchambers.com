export interface CommandResult {
  output: string;
  error?: boolean;
  html?: boolean; // Flag indicating output is HTML to be rendered
  raw?: boolean; // Flag indicating output is raw text for piping (don't display)
  scrollBehavior?: 'top' | 'bottom'; // Flag to control scroll position after output
  clearBefore?: boolean; // Flag to clear terminal before displaying output
  fullscreen?: boolean; // Flag to hide header/nav during output (restored on interaction)
  fullscreenExitCommand?: string; // Command to execute when exiting fullscreen (instead of just restoring UI)
  fullscreenDuration?: number; // Auto-exit fullscreen after this many ms
  scheduledCommand?: { command: string; delayMs: number; clearBefore?: boolean }; // Auto-execute a command after a delay
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[], stdin?: string) => CommandResult | Promise<CommandResult>;
}
