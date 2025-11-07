/**
 * Echo Command
 *
 * Displays a line of text to the terminal output. Supports escape sequence interpretation
 * with the -e flag for formatting like newlines (\n) and tabs (\t). Can also read from
 * stdin for use in command pipelines.
 */
import type { Command } from '../Command';

export const echoCommand: Command = {
  name: 'echo',
  description: 'Display a line of text',
  execute: (args: string[], stdin?: string) => {
    let interpretEscapes = false;
    const textArgs: string[] = [];

    // Parse flags and arguments
    for (const arg of args) {
      if (arg === '-e') {
        interpretEscapes = true;
      } else {
        textArgs.push(arg);
      }
    }

    let output: string;

    // If no text arguments provided, use stdin (pipe passthrough)
    if (textArgs.length === 0 && stdin) {
      output = stdin;
      // Remove trailing newline from stdin if present
      if (output.endsWith('\n')) {
        output = output.slice(0, -1);
      }
    }
    // Otherwise output the arguments
    else {
      output = textArgs.join(' ');
    }

    // Interpret escape sequences if -e flag is set
    if (interpretEscapes) {
      output = output
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\r/g, '\r')
        .replace(/\\b/g, '\b')
        .replace(/\\f/g, '\f')
        .replace(/\\v/g, '\v')
        .replace(/\\\\/g, '\\');
    }

    return {
      output,
      // Don't set raw flag - echo should always display its output
    };
  },
};
