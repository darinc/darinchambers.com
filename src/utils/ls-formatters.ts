import type { FileSystemNode } from './fs/types';

/**
 * Convert bytes to human-readable format (e.g., 1.1K, 2.4M)
 */
export function formatFileSize(bytes: number, humanReadable: boolean): string {
  if (!humanReadable) {
    return bytes.toString();
  }

  const units = ['B', 'K', 'M', 'G', 'T'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // Format with one decimal place if not bytes
  const formatted = unitIndex === 0
    ? size.toString()
    : size.toFixed(1);

  return `${formatted}${units[unitIndex]}`;
}

/**
 * Format modification time to match ls -l output (e.g., "Oct 27 15:59")
 */
export function formatModifiedTime(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, ' ');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month} ${day} ${hours}:${minutes}`;
}

/**
 * Format a single file entry in long listing format
 */
export function formatLongListing(
  node: FileSystemNode,
  humanReadable: boolean
): string {
  const permissions = node.permissions || '-rw-r--r--';
  const links = '1'; // Simplified: always show 1 link
  const owner = node.owner || 'darin';
  const group = 'staff'; // Simplified: always show staff as group
  const size = formatFileSize(node.size || 0, humanReadable);
  const modTime = formatModifiedTime(node.modifiedTime || new Date());
  const name = node.name;

  // Pad size column to align properly (right-align)
  const sizePadded = size.padStart(6, ' ');

  return `${permissions}  ${links} ${owner}  ${group}  ${sizePadded} ${modTime} ${name}`;
}

/**
 * Calculate the total blocks for the -l output header
 */
export function calculateTotalBlocks(nodes: FileSystemNode[]): number {
  // In real ls, blocks are typically 512-byte or 1024-byte blocks
  // We'll use a simplified calculation: sum of sizes / 512
  const totalBytes = nodes.reduce((sum, node) => sum + (node.size || 0), 0);
  return Math.ceil(totalBytes / 512);
}
