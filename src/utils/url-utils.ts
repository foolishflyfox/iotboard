import * as path from 'pathe';

export function getDataUrl() {
  return '/data';
}

/**
 * 删除路径中的后缀
 * 例如 a/bb/c.txt 返回 a/bb/c; aa/b/cc.json 返回 aa/b/cc
 * @param path 路径
 */
export function removeExtention(filePath: string) {
  return path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)));
}
