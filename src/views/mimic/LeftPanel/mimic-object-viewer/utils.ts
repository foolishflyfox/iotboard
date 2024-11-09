import type { FileTreeNode } from '@mimic/types';
import * as _ from 'lodash-es';

export function findFileTreeNodeByPath(fileTreeNodes: FileTreeNode[], nodePath: string) {
  for (const fileTreeNode of fileTreeNodes || []) {
    const r = findFileTreeNodeByPathHelper(fileTreeNode, nodePath);
    if (r) return r;
  }
  return null;
}

function findFileTreeNodeByPathHelper(
  fileTreeNode: FileTreeNode,
  nodePath: string,
): null | FileTreeNode {
  if (_.isNil(fileTreeNode)) return null;
  if (fileTreeNode.path === nodePath) return fileTreeNode;
  return findFileTreeNodeByPath(fileTreeNode.children || [], nodePath);
}
