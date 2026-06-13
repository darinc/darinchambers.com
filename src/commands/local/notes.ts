/**
 * Notes Command
 *
 * Lists and displays short-form notes with support for filtering by tags.
 * Notes are short-form content (LinkedIn/X style) shown with full content
 * inline in list view. Supports --tags flag for filtering by category.
 *
 * The list/filter/open flow is shared with `blog` via createContentCommand.
 */
import { MESSAGES, PATHS } from '../../constants';
import { ContentFormatter } from '../../utils/ContentFormatter';
import { PostParser } from '../../utils/PostParser';
import { createContentCommand } from './createContentCommand';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createNotesCommand(fs: IFileSystem): Command {
  return createContentCommand(fs, {
    name: 'notes',
    description: 'List and read short-form notes',
    help: `Usage: notes [options] [note-id|number]

Description:
  List and read short-form notes

Options:
  --tags               List all available tags
  --tags <tag>         Filter notes by tag

Examples:
  notes                         # List all notes
  notes 1                       # Read note #1
  notes --tags                  # List all tags
  notes --tags AI               # Filter by single-word tag
  notes --tags Web-Development  # Filter by hyphenated tag
  notes note-id                 # Read specific note by ID`,
    dir: PATHS.CONTENT_POSTS,
    emptyMessage: MESSAGES.EMPTY_POSTS,
    heading: 'Notes',
    tagsHeading: 'Note Tags',
    countNoun: 'note',
    pluralNoun: 'notes',
    notFoundLabel: 'Note',
    filterMissLabel: 'notes',
    parse: (filename, content) => PostParser.parsePost(filename, content),
    formatList: (items, filterTag) => ContentFormatter.formatPostList(items, filterTag),
    formatDetail: (item) => ContentFormatter.formatPostDetail(item),
  });
}
