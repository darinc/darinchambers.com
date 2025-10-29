export type FileSystemNodeType = 'file' | 'directory';

export interface FileSystemNode {
  name: string;
  type: FileSystemNodeType;
  content?: string;
  children?: Map<string, FileSystemNode>;
}
