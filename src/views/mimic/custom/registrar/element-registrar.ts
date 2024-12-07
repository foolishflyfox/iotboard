import {
  customRectGenerate,
  customEllipseGenerate,
  type UiCustomCfg,
  customCfgService,
  customLineGenerate,
} from '@mimic/custom/generator';
import { getUiClassByTag } from '@mimic/utils';
import type { AppearanceType, BaseCustomCfg } from '@mimic/types';

export const elementRegistrar: Record<string, () => void> = {};

// 默认的基础属性
const defaultAppearances: AppearanceType[] = ['x', 'y', 'width', 'height'];

function addElementRegistrar<T extends BaseCustomCfg>(generator: (cfg: T) => void, customCfg: T) {
  const elementTag = customCfg.tag;
  elementRegistrar[elementTag] = () => {
    if (!customCfg.appearanceTypes) {
      customCfg.appearanceTypes = [...defaultAppearances];
    }
    generator(customCfg);
    customCfgService.addUiCustomCfg(elementTag, customCfg);
  };
}

// 添加内置组件的注册器
addElementRegistrar(customRectGenerate, {
  tag: 'element:rect',
  appearanceTypes: [...defaultAppearances, 'stroke'],
});
addElementRegistrar(customEllipseGenerate, {
  tag: 'element:ellipse',
  appearanceTypes: [...defaultAppearances, 'stroke'],
});
addElementRegistrar(customLineGenerate, {
  tag: 'element:line',
  appearanceTypes: [...defaultAppearances, 'stroke', 'startArrow'],
});

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
