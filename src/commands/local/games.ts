/**
 * Games Command
 *
 * Lists the games you can play in the terminal, with descriptions and the
 * command that launches each. Built from the shared GAMES registry so new games
 * appear here automatically. Launch commands render as clickable links.
 */
import { GAMES } from '../../games/registry';
import { CommandArgs } from '../../utils/CommandArgs';
import { ContentFormatter } from '../../utils/ContentFormatter';
import { MarkdownService } from '../../utils/MarkdownService';
import type { Command } from '../Command';

export function createGamesCommand(): Command {
  return {
    name: 'games',
    description: 'List playable games',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: games

Description:
  List the games you can play in the terminal.

Examples:
  games                # Show all games
  polartetris          # Launch a game directly`,
        };
      }

      const items = GAMES.map(
        (game) => `- **${game.title}** (\`${game.command}\`) — ${game.description}`
      ).join('\n');

      const example = GAMES.length > 0 ? GAMES[0].command : 'a game';
      const markdown = `# Games

Interactive games you can play right here in the terminal.

${items}

Type a game's command to play — e.g. \`${example}\`.`;

      const html = MarkdownService.render(markdown);
      const clickableHtml = ContentFormatter.makeCommandsClickable(
        html,
        GAMES.map((game) => game.command)
      );

      return { output: clickableHtml, html: true, scrollBehavior: 'top' };
    },
  };
}
