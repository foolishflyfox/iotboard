const elementPreviewPrefix = '/preview/element';
/** 获取元素缩略图路径 */
export function getElementPreview(name: string) {
  return `${elementPreviewPrefix}/${name}.png`;
}
