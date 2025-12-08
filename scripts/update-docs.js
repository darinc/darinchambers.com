#!/usr/bin/env node

/**
 * Documentation Auto-Update Script
 *
 * Automatically updates metrics and version numbers across documentation files:
 * - README.md
 * - ARCHITECTURE.md
 * - CLAUDE.md
 *
 * Metrics updated:
 * - Package version (exact)
 * - Command count (exact)
 * - Bundle size (approximate with 10% threshold)
 * - Test counts (ranges validated)
 * - Filesystem path corrections
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ============================================================================
// Metrics Collection Functions
// ============================================================================

async function getPackageVersion() {
  const pkgPath = path.join(projectRoot, 'package.json');
  const pkgContent = await fs.readFile(pkgPath, 'utf8');
  const pkg = JSON.parse(pkgContent);
  return pkg.version;
}

async function getCommandCount() {
  const mainPath = path.join(projectRoot, 'src/main.ts');
  const mainContent = await fs.readFile(mainPath, 'utf8');

  // Extract the registerCommands array
  const registerMatch = mainContent.match(
    /terminal\.registerCommands\(\[([\s\S]*?)\]\);/
  );

  if (!registerMatch) {
    throw new Error('Cannot find terminal.registerCommands block in src/main.ts');
  }

  // Count commands (lines ending with "Command,")
  const commandsBlock = registerMatch[1];
  const commands = commandsBlock.match(/\w+Command,/g) || [];

  return commands.length;
}

async function getTestFileCount() {
  const testFiles = await glob('tests/**/*.test.ts', { cwd: projectRoot });
  return testFiles.length;
}

async function getTestCount() {
  const testFiles = await glob('tests/**/*.test.ts', { cwd: projectRoot });
  let totalTests = 0;

  for (const file of testFiles) {
    const filePath = path.join(projectRoot, file);
    const content = await fs.readFile(filePath, 'utf8');
    // Count it( and test( occurrences
    const matches = content.match(/\b(it|test)\s*\(/g) || [];
    totalTests += matches.length;
  }

  return totalTests;
}

async function getBundleSize() {
  const distPath = path.join(projectRoot, 'dist/assets');

  try {
    await fs.access(distPath);
  } catch {
    // No build - return nulls
    return { js: null, css: null, total: null };
  }

  const files = await fs.readdir(distPath);

  // Calculate JS size (uncompressed)
  let jsSize = 0;
  for (const file of files.filter(f => f.match(/^index-.*\.js$/))) {
    const stat = await fs.stat(path.join(distPath, file));
    jsSize += stat.size;
  }

  // Calculate CSS size (uncompressed)
  let cssSize = 0;
  for (const file of files.filter(f => f.match(/^index-.*\.css$/))) {
    const stat = await fs.stat(path.join(distPath, file));
    cssSize += stat.size;
  }

  // Estimate gzipped (28% for JS, 22% for CSS based on actual build)
  const jsGzipped = Math.round(jsSize * 0.28 / 1024);
  const cssGzipped = Math.round(cssSize * 0.22 / 1024);

  return {
    js: jsGzipped,
    css: cssGzipped,
    total: jsGzipped + cssGzipped
  };
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// ============================================================================
// Range Validation Helpers
// ============================================================================

function validateRange(currentRange, actualValue, metricName) {
  // For "X+" format
  const plusMatch = currentRange.match(/^([\d,]+)\+$/);
  if (plusMatch) {
    const minimum = parseInt(plusMatch[1].replace(/,/g, ''));
    if (actualValue < minimum) {
      console.warn(`  ⚠️  ${metricName}: actual ${actualValue} < documented ${minimum}+, auto-adjusting`);
      return actualValue < 1000 ? `${actualValue}+` : `${Math.floor(actualValue / 100) * 100}+`;
    }
    return currentRange;  // Keep existing if actual exceeds
  }

  return currentRange;
}

function shouldUpdateBundleSize(current, actual) {
  // Extract number from "~XKB" format
  const match = current.match(/^~?(\d+)KB/i);
  if (!match) return true;

  const currentSize = parseInt(match[1]);

  // Update if difference > 10% or > 10KB
  const diff = Math.abs(actual - currentSize);
  const percentDiff = diff / currentSize;

  return percentDiff > 0.10 || diff > 10;
}

// ============================================================================
// Documentation Update Functions
// ============================================================================

async function updateReadme(metrics) {
  const readmePath = path.join(projectRoot, 'README.md');
  let content = await fs.readFile(readmePath, 'utf8');
  const original = content;
  const changes = [];

  // Pattern 1: Version badge (line 3)
  const versionBadgePattern = /(\[Version\]\(https:\/\/img\.shields\.io\/badge\/version-)([\d.]+)(-blue\.svg\))/;
  if (content.match(versionBadgePattern)) {
    const oldVersion = content.match(versionBadgePattern)[2];
    if (oldVersion !== metrics.version) {
      content = content.replace(versionBadgePattern, `$1${metrics.version}$3`);
      changes.push(`Version badge ${oldVersion} → ${metrics.version}`);
    }
  }

  // Pattern 2: Command count in "# 22 command implementations"
  const commandCountPattern = /(# )(\d+)( command implementations)/g;
  const commandMatches = [...content.matchAll(commandCountPattern)];
  if (commandMatches.length > 0) {
    const oldCount = commandMatches[0][2];
    if (parseInt(oldCount) !== metrics.commands) {
      content = content.replace(commandCountPattern, `$1${metrics.commands}$3`);
      changes.push(`Command count ${oldCount} → ${metrics.commands}`);
    }
  }

  // Pattern 3: Bundle size "~120KB total bundle"
  if (metrics.bundleTotal) {
    const bundlePattern = /(~)(\d+)(KB total bundle)/g;
    const bundleMatches = [...content.matchAll(bundlePattern)];
    if (bundleMatches.length > 0) {
      const oldSize = bundleMatches[0][2];
      if (shouldUpdateBundleSize(oldSize, metrics.bundleTotal)) {
        content = content.replace(bundlePattern, `$1${metrics.bundleTotal}$3`);
        changes.push(`Bundle size ~${oldSize}KB → ~${metrics.bundleTotal}KB`);
      }
    }
  }

  // Pattern 4: Test counts "1,000+ tests across 50+ test files"
  const testCountPattern = /([\d,]+)(\+ tests across )(\d+)(\+ test files)/;
  if (content.match(testCountPattern)) {
    const match = content.match(testCountPattern);
    const testMin = parseInt(match[1].replace(/,/g, ''));
    const fileMin = parseInt(match[3]);

    const newTestRange = validateRange(`${testMin.toLocaleString()}+`, metrics.tests, 'Test count');
    const newFileRange = validateRange(`${fileMin}+`, metrics.testFiles, 'Test files');

    if (newTestRange !== `${testMin.toLocaleString()}+` || newFileRange !== `${fileMin}+`) {
      content = content.replace(testCountPattern, `${newTestRange}$2${newFileRange}$4`);
      changes.push(`Test counts validated`);
    }
  }

  if (content !== original) {
    await fs.writeFile(readmePath, content, 'utf8');
    return changes;
  }

  return [];
}

async function updateArchitecture(metrics) {
  const archPath = path.join(projectRoot, 'ARCHITECTURE.md');
  let content = await fs.readFile(archPath, 'utf8');
  const original = content;
  const changes = [];

  // Pattern 1: Version and date in header
  const headerPattern = /(\*\*Last Updated:\*\* )([\d-]+)( \(v)([\d.]+)(\))/;
  if (content.match(headerPattern)) {
    const match = content.match(headerPattern);
    const oldDate = match[2];
    const oldVersion = match[4];
    if (oldDate !== metrics.date || oldVersion !== metrics.version) {
      content = content.replace(headerPattern, `$1${metrics.date}$3${metrics.version}$5`);
      changes.push(`Header: ${oldDate} (v${oldVersion}) → ${metrics.date} (v${metrics.version})`);
    }
  }

  // Pattern 2: Command count "All 22 commands"
  const commandPattern = /(All )(\d+)( commands)/g;
  const commandMatches = [...content.matchAll(commandPattern)];
  if (commandMatches.length > 0) {
    const oldCount = commandMatches[0][2];
    if (parseInt(oldCount) !== metrics.commands) {
      content = content.replace(commandPattern, `$1${metrics.commands}$3`);
      changes.push(`Command count ${oldCount} → ${metrics.commands}`);
    }
  }

  // Pattern 3: Bundle sizes
  if (metrics.bundleTotal) {
    const bundlePattern = /(~)(\d+)(KB total)/g;
    const bundleMatches = [...content.matchAll(bundlePattern)];
    if (bundleMatches.length > 0) {
      const oldSize = bundleMatches[0][2];
      if (shouldUpdateBundleSize(oldSize, metrics.bundleTotal)) {
        content = content.replace(bundlePattern, `$1${metrics.bundleTotal}$3`);
        changes.push(`Bundle size ~${oldSize}KB → ~${metrics.bundleTotal}KB`);
      }
    }
  }

  // Pattern 4: Path corrections
  const pathCorrections = [
    { pattern: /~\/\.terminalrc/g, replacement: '~/.settings', name: '~/.terminalrc → ~/.settings' },
    { pattern: /~\/\.bash_aliases/g, replacement: '/home/guest/.alias', name: '~/.bash_aliases → /home/guest/.alias' }
  ];

  for (const correction of pathCorrections) {
    if (content.match(correction.pattern)) {
      content = content.replace(correction.pattern, correction.replacement);
      changes.push(`Path: ${correction.name}`);
    }
  }

  if (content !== original) {
    await fs.writeFile(archPath, content, 'utf8');
    return changes;
  }

  return [];
}

async function updateClaude(metrics) {
  const claudePath = path.join(projectRoot, 'CLAUDE.md');
  let content = await fs.readFile(claudePath, 'utf8');
  const original = content;
  const changes = [];

  // Pattern 1: Bundle size in tech stack
  if (metrics.bundleTotal) {
    const bundlePattern1 = /(\*\*Bundle Size:\*\* ~)(\d+)(KB total)/;
    if (content.match(bundlePattern1)) {
      const oldSize = content.match(bundlePattern1)[2];
      if (shouldUpdateBundleSize(oldSize, metrics.bundleTotal)) {
        content = content.replace(bundlePattern1, `$1${metrics.bundleTotal}$3`);
        changes.push(`Bundle size ~${oldSize}KB → ~${metrics.bundleTotal}KB`);
      }
    }
  }

  // Pattern 2: Test coverage line
  const testPattern = /(\*\*Test Coverage:\*\* 80%\+ target \()([\d,]+)(\+ tests across )(\d+)(\+ test files\))/;
  if (content.match(testPattern)) {
    const match = content.match(testPattern);
    const testMin = parseInt(match[2].replace(/,/g, ''));
    const fileMin = parseInt(match[4]);

    const newTestRange = validateRange(`${testMin.toLocaleString()}+`, metrics.tests, 'Test count');
    const newFileRange = validateRange(`${fileMin}+`, metrics.testFiles, 'Test files');

    if (newTestRange !== `${testMin.toLocaleString()}+` || newFileRange !== `${fileMin}+`) {
      content = content.replace(testPattern, `$1${newTestRange}$3${newFileRange}$5`);
      changes.push(`Test counts validated`);
    }
  }

  // Pattern 3: Command count in "Command implementations (22 commands)"
  const commandPattern1 = /(Command implementations \()(\d+)( commands\))/g;
  const commandMatches1 = [...content.matchAll(commandPattern1)];
  if (commandMatches1.length > 0) {
    const oldCount = commandMatches1[0][2];
    if (parseInt(oldCount) !== metrics.commands) {
      content = content.replace(commandPattern1, `$1${metrics.commands}$3`);
      changes.push(`Command count ${oldCount} → ${metrics.commands}`);
    }
  }

  // Pattern 4: Command count in "# 22 commands"
  const commandPattern2 = /(# )(\d+)( commands)/g;
  const commandMatches2 = [...content.matchAll(commandPattern2)];
  if (commandMatches2.length > 0) {
    const oldCount = commandMatches2[0][2];
    if (parseInt(oldCount) !== metrics.commands) {
      content = content.replace(commandPattern2, `$1${metrics.commands}$3`);
      changes.push(`Command count in directory structure ${oldCount} → ${metrics.commands}`);
    }
  }

  // Pattern 5: Path corrections
  const pathCorrections = [
    { pattern: /~\/\.terminalrc/g, replacement: '~/.settings', name: '~/.terminalrc → ~/.settings' },
    { pattern: /~\/\.bash_aliases/g, replacement: '/home/guest/.alias', name: '~/.bash_aliases → /home/guest/.alias' }
  ];

  for (const correction of pathCorrections) {
    if (content.match(correction.pattern)) {
      content = content.replace(correction.pattern, correction.replacement);
      changes.push(`Path: ${correction.name}`);
    }
  }

  if (content !== original) {
    await fs.writeFile(claudePath, content, 'utf8');
    return changes;
  }

  return [];
}

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
  try {
    console.log('📊 Documentation Auto-Update Script\n');
    console.log('Collecting metrics...\n');

    // Collect all metrics
    const version = await getPackageVersion();
    const commands = await getCommandCount();
    const testFiles = await getTestFileCount();
    const tests = await getTestCount();
    const bundleSize = await getBundleSize();
    const date = getCurrentDate();

    const metrics = {
      version,
      commands,
      testFiles,
      tests,
      bundleTotal: bundleSize.total || 84,  // Fallback to last known
      bundleJs: bundleSize.js,
      bundleCss: bundleSize.css,
      date
    };

    // Display collected metrics
    console.log('Metrics collected:');
    console.log(`  Version: ${version}`);
    console.log(`  Commands: ${commands}`);
    console.log(`  Test files: ${testFiles}`);
    console.log(`  Tests: ${tests}`);
    if (bundleSize.total) {
      console.log(`  Bundle: ~${bundleSize.total}KB (${bundleSize.js}KB JS + ${bundleSize.css}KB CSS gzipped)`);
    } else {
      console.log(`  Bundle: (using cached value ~84KB - run 'pnpm build' for actual)`);
    }
    console.log(`  Date: ${date}`);
    console.log();

    // Update documentation files
    console.log('📝 Updating documentation...\n');

    const readmeChanges = await updateReadme(metrics);
    const archChanges = await updateArchitecture(metrics);
    const claudeChanges = await updateClaude(metrics);

    const allChanges = [
      ...readmeChanges.map(c => ({ file: 'README.md', change: c })),
      ...archChanges.map(c => ({ file: 'ARCHITECTURE.md', change: c })),
      ...claudeChanges.map(c => ({ file: 'CLAUDE.md', change: c }))
    ];

    // Report changes
    if (allChanges.length === 0) {
      console.log('✅ No changes needed - documentation is up to date\n');
    } else {
      console.log('✅ Documentation updated!\n');
      console.log('Changes made:');
      for (const { file, change } of allChanges) {
        console.log(`  ${file}: ${change}`);
      }
      console.log();
    }

    console.log('✨ Done!\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
