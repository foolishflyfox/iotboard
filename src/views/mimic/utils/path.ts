import { removeExtention } from '@/utils';

const tagPrefix = 'component/';

/** 组件路径转换为组件 tag */
export function componentPathToTag(path: string) {
  const tag = removeExtention(`${tagPrefix}${path}`);
  return tag;
}

/** 组件 tag 转换为组件路径 */
export function componentTagToPath(tag: string) {
  if (tag.startsWith(tagPrefix)) {
    return `${tag.slice(tagPrefix.length)}.json`;
  }
  return null;
}

export function componentTagToPreviewPngPath(tag: string) {
  if (tag.startsWith(tagPrefix)) {
    return `${tag.slice(tagPrefix.length)}.png`;
  }
  return null;
}
