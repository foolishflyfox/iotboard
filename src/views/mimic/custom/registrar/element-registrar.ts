import {
  customRectGenerate,
  customEllipseGenerate,
  type UiCustomCfg,
  customCfgService,
  customLineGenerate,
  type CustomPropertyCfgs,
} from '@mimic/custom/generator';
import { getUiClassByTag } from '@mimic/utils';
import type { AppearanceType } from '@mimic/types';
import { customTextGenerate } from '../generator/custom-text';
import { customTextBoxGenerate } from '../generator/custom-text-box';

const elementRegistrars: Record<string, () => void> = {};
// const elementCustomPropertyCfgs: Record<string, CustomPropertyCfgs> = {};

// 默认的基础属性
const defaultAppearances: AppearanceType[] = ['x', 'y', 'width', 'height'];

function addElementRegistrar(
  generator: (cfg: UiCustomCfg) => CustomPropertyCfgs | void,
  customCfg: UiCustomCfg,
) {
  const elementTag = customCfg.tag;
  elementRegistrars[elementTag] = () => {
    if (!customCfg.appearanceTypes) {
      customCfg.appearanceTypes = [...defaultAppearances];
    }
    const customPropertyCfgs = generator(customCfg);
    if (customPropertyCfgs && !customCfg.customPropertyCfgs) {
      customCfg.customPropertyCfgs = customPropertyCfgs;
    }
    customCfgService.addUiCustomCfg(elementTag, customCfg);
  };
}

// 添加内置组件的注册器
addElementRegistrar(customRectGenerate, {
  tag: 'element:rect',
  appearanceTypes: [
    ...defaultAppearances,
    'fill',
    'stroke',
    'strokeWidth',
    'dashPattern',
    'cornerRadius',
  ],
});
addElementRegistrar(customEllipseGenerate, {
  tag: 'element:ellipse',
  appearanceTypes: [...defaultAppearances, 'fill', 'stroke', 'strokeWidth', 'dashPattern'],
});
addElementRegistrar(customLineGenerate, {
  tag: 'element:line',
  appearanceTypes: [
    'stroke',
    'strokeWidth',
    'startArrow',
    'endArrow',
    'cornerRadius',
    'dashPattern',
    'strokeJoin',
  ],
});
addElementRegistrar(customTextGenerate, {
  tag: 'element:text',
  appearanceTypes: [
    ...defaultAppearances,
    'fill',
    'stroke',
    'strokeWidth',
    'text',
    'fontSize',
    'fontWeight',
    'italic',
    'textDecoration',
    'textAlign',
    'verticalAlign',
  ],
});
addElementRegistrar(customTextBoxGenerate, {
  tag: 'element:textbox',
  appearanceTypes: [
    ...defaultAppearances,
    'fill',
    'stroke',
    'strokeWidth',
    'cornerRadius',
    'dashPattern',
  ],
});

/** 元素注册 */
export function registerElement(tag: string) {
  const registerHandler = elementRegistrars[tag];
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
