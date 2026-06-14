#!/usr/bin/env node
/**
 * reset-content.js
 *
 * Clears the example content so you can start fresh after forking this repo:
 *   - deletes every blog post, portfolio project, and note (markdown files)
 *   - replaces about.md and contact.md with neutral placeholders
 *   - leaves help.md alone (it's the built-in help text, not personal content)
 *
 * Content is loaded via Vite's import.meta.glob, so removing the markdown files
 * is all that's needed — there's no import wiring to update. A `.gitkeep` is left
 * in each emptied directory so the structure survives in git.
 *
 * Usage:
 *   pnpm reset-content            # shows the plan, then asks for confirmation
 *   pnpm reset-content --yes      # skip the prompt (non-interactive)
 *   pnpm reset-content --dry-run  # show what would change, do nothing
 *
 * This is destructive and meant for a fresh fork. See TEMPLATE.md for the full
 * "make it your own" guide (name, URLs, socials, favicon, etc.).
 */
import { existsSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src', 'content');

// Directories whose markdown files are example content (posts/ backs `notes`).
const CLEAR_DIRS = ['blog', 'portfolio', 'posts'];

// Root content files replaced with placeholders (help.md is intentionally kept).
const STUBS = {
  'about.md': `# About

Write your bio here — who you are, what you build, what you care about.

This text is rendered by the \`about\` command.
`,
  'contact.md': `# Contact

## Get in Touch

- Email: you@example.com
- GitHub: [github.com/yourname](https://github.com/yourname)
- LinkedIn: [linkedin.com/in/yourname](https://www.linkedin.com/in/yourname)

This text is rendered by the \`contact\` command.
`,
};

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const autoYes = args.has('--yes') || args.has('-y');

const rel = (abs) => abs.slice(ROOT.length + 1);

// Build the plan.
const filesToDelete = [];
for (const dir of CLEAR_DIRS) {
  const dirPath = join(CONTENT_DIR, dir);
  if (!existsSync(dirPath)) continue;
  for (const entry of readdirSync(dirPath)) {
    if (entry.endsWith('.md')) filesToDelete.push(join(dirPath, entry));
  }
}
const filesToStub = Object.keys(STUBS).filter((name) => existsSync(join(CONTENT_DIR, name)));

// Show the plan.
console.log('\nreset-content — clears example content for a fresh fork\n');
console.log(`Delete (${filesToDelete.length} markdown files):`);
console.log(filesToDelete.length ? filesToDelete.map((f) => `  - ${rel(f)}`).join('\n') : '  (none)');
console.log(`\nReplace with placeholders (${filesToStub.length}):`);
console.log(filesToStub.length ? filesToStub.map((f) => `  - src/content/${f}`).join('\n') : '  (none)');
console.log('\nKeep: src/content/help.md\n');

if (dryRun) {
  console.log('Dry run — no changes made.\n');
  process.exit(0);
}

if (filesToDelete.length === 0 && filesToStub.length === 0) {
  console.log('Nothing to do.\n');
  process.exit(0);
}

async function confirm() {
  if (autoYes) return true;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) =>
    rl.question('This is destructive. Type "yes" to proceed: ', (a) => {
      rl.close();
      resolve(a.trim().toLowerCase());
    })
  );
  return answer === 'yes' || answer === 'y';
}

if (!(await confirm())) {
  console.log('Aborted — no changes made.\n');
  process.exit(0);
}

for (const file of filesToDelete) {
  rmSync(file);
}
// Keep emptied directories tracked in git (and present for import.meta.glob).
for (const dir of CLEAR_DIRS) {
  const dirPath = join(CONTENT_DIR, dir);
  if (existsSync(dirPath)) writeFileSync(join(dirPath, '.gitkeep'), '');
}
for (const name of filesToStub) {
  writeFileSync(join(CONTENT_DIR, name), STUBS[name]);
}

console.log(
  `Done. Deleted ${filesToDelete.length} file(s), stubbed ${filesToStub.length}. ` +
    'Next: see TEMPLATE.md to personalize name, URLs, socials, and favicon.\n'
);
