export interface CommandResult {
  output: string;
  error?: boolean;
  html?: boolean; // Flag indicating output is HTML to be rendered
  raw?: boolean; // Flag indicating output is raw text for piping (don't display)
  scrollBehavior?: 'top' | 'bottom'; // Flag to control scroll position after output
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[], stdin?: string) => CommandResult | Promise<CommandResult>;
}
