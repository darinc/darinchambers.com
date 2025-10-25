export interface CommandResult {
  output: string;
  error?: boolean;
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => CommandResult | Promise<CommandResult>;
}
