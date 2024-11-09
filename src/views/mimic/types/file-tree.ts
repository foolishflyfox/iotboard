export interface FileTreeNode {
  /** 文件/文件夹名 */
  name: string;
  /** 文件/文件夹路径 */
  path: string;
  /** 内容 */
  children?: FileTreeNode[];
}
