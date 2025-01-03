import type { TreeOption } from 'naive-ui';
import type { FileTreeNode } from '@mimic/types';
import * as _ from 'lodash-es';

const elementPreviewPrefix = '/preview/element';
/** 获取元素缩略图路径 */
export function getElementPreview(name: string) {
  return `${elementPreviewPrefix}/${name}.png`;
}

/** 将后端返回的树结构转换为树组件可用的结构 */
export function convertToTreeOption(node: FileTreeNode, onlyFolder = true): TreeOption | null {
  if (_.isNil(node)) return null;
  if (onlyFolder && !_.isArray(node.children)) return null;
  const result: TreeOption = {
    label: node.name,
    key: node.path,
  };
  if (_.isArray(node.children)) {
    result.children = node.children
      .map(e => convertToTreeOption(e, onlyFolder)!)
      .filter(e => !_.isNil(e));
    if (result.children.length < 1) {
      result.children = undefined;
    }
  }
  return result;
}
