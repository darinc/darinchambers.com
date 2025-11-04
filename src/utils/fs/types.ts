export type FileSystemNodeType = 'file' | 'directory';

export interface FileSystemNode {
  name: string;
  type: FileSystemNodeType;
  content?: string;
  children?: Map<string, FileSystemNode>;
  permissions?: string;
  owner?: string;
  size?: number;
  modifiedTime?: Date;
  isHidden?: boolean;
}
