export interface CommandResult {
  output: string;
  error?: boolean;
  html?: boolean;  // Flag indicating output is HTML to be rendered
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => CommandResult | Promise<CommandResult>;
}
