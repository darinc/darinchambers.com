/**
 * Sudo Command
 *
 * Simulates the Unix sudo command with a password discovery easter egg.
 * Users find the password "hunter2" on a sticky note (.post-it file) and
 * can use it to gain root access. Includes sudo su for switching to root.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { Terminal } from '../../components/Terminal';
import type { CommandExecutor } from '../../utils/CommandExecutor';
import type { Command, CommandResult } from '../Command';

const PASSWORD = 'hunter2';
const SUDO_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export function createSudoCommand(terminal: Terminal, executor: CommandExecutor): Command {
  let lastAuthTime: number | null = null;
  let attemptsRemaining = 3;
  let pendingResolve: ((result: CommandResult) => void) | null = null;
  let pendingArgs: string | null = null;

  function isAuthenticated(): boolean {
    if (lastAuthTime === null) return false;
    return Date.now() - lastAuthTime < SUDO_TIMEOUT;
  }

  function resetAttempts(): void {
    attemptsRemaining = 3;
  }

  function switchToRoot(): void {
    terminal.setUsername('root');
    // Update environment variables by executing export commands
    void executor.execute('export HOME=/root');
    void executor.execute('export USER=root');
    // Change to /root directory
    void terminal.executeCommand('cd /root');
  }

  function promptForPassword(): void {
    const promptText = `[sudo] password for ${terminal.getUsername()}: `;
    terminal.getInput().setInputType('password');
    terminal.getInput().setPrompt(promptText);
    terminal.setInputInterceptor(handlePasswordInput);
  }

  function restorePrompt(): void {
    terminal.getInput().setInputType('text');
    // Trigger prompt update by setting path (forces prompt recalculation)
    terminal.setUsername(terminal.getUsername());
  }

  function handlePasswordInput(input: string): void {
    if (input === PASSWORD) {
      // Correct password
      lastAuthTime = Date.now();
      resetAttempts();
      restorePrompt();

      if (pendingArgs && pendingResolve) {
        const cmd = pendingArgs;
        const resolve = pendingResolve;
        pendingArgs = null;
        pendingResolve = null;

        if (cmd === 'su' || cmd === 'su -') {
          switchToRoot();
          resolve({ output: '' });
        } else {
          void executor.execute(cmd).then((result) => resolve(result));
        }
      }
    } else {
      // Wrong password
      attemptsRemaining--;

      if (attemptsRemaining <= 0) {
        restorePrompt();
        if (pendingResolve) {
          pendingResolve({ output: 'sudo: 3 incorrect password attempts', error: true });
          pendingResolve = null;
          pendingArgs = null;
        }
        resetAttempts();
      } else {
        terminal.writeError('Sorry, try again.');
        promptForPassword();
      }
    }
  }

  return {
    name: 'sudo',
    description: 'Execute a command as superuser',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: sudo <command>

Description:
  Execute a command as the superuser (root).
  Requires authentication via password.
  Authentication is cached for 5 minutes.

Options:
  --help               Show this help message

Examples:
  sudo ls /root        # List root's home directory as root
  sudo su              # Switch to root user
  sudo su -            # Switch to root user (login shell)`,
        };
      }

      if (args.length === 0) {
        return { output: 'usage: sudo <command>', error: true };
      }

      // Easter egg: sudo make me a sandwich
      const fullCommand = args.join(' ');
      if (fullCommand === 'make me a sandwich') {
        return { output: 'Okay.' };
      }

      // If already authenticated, execute directly and return result (supports piping)
      if (isAuthenticated()) {
        const trimmed = fullCommand.trim();
        if (trimmed === 'su' || trimmed === 'su -') {
          switchToRoot();
          return { output: '' };
        }
        return executor.execute(fullCommand);
      }

      // Need authentication — block until password flow completes
      resetAttempts();
      return new Promise<CommandResult>((resolve) => {
        pendingResolve = resolve;
        pendingArgs = fullCommand;
        promptForPassword();
      });
    },
  };
}
