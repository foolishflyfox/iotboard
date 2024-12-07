import {
  customRectGenerate,
  customEllipseGenerate,
  type UiCustomCfg,
  customCfgService,
} from '@mimic/custom/generator';
import { getUiClassByTag } from '@mimic/utils';
import type { BaseCustomCfg } from '@mimic/types';

export const elementRegistrar: Record<string, () => void> = {};

function addElementRegistrar<T extends BaseCustomCfg>(generator: (cfg: T) => void, customCfg: T) {
  const elementTag = customCfg.tag;
  elementRegistrar[elementTag] = () => {
    generator(customCfg);
    if (customCfg) {
      customCfgService.addUiCustomCfg(elementTag, customCfg);
    }
  };
}
// 添加内置组件的注册器
addElementRegistrar(customRectGenerate, { tag: 'element:rect' });
addElementRegistrar(customEllipseGenerate, { tag: 'element:ellipse' });

/** 元素注册 */
export function registerElement(tag: string) {
  const registerHandler = elementRegistrar[tag];
  if (!registerHandler) {
    throw new Error(`不存在元素 tag 为 ${tag} 的注册处理函数`);
  } else {
    registerHandler();
  }
}

export function getElementClassByTag(tag: string) {
  const elementClass = getUiClassByTag(tag);
  if (elementClass) return elementClass;
  registerElement(tag);
  return getUiClassByTag(tag);
}
