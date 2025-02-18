import type { UI } from 'leafer-editor';
import * as _ from 'lodash-es';
import type { AppearanceType } from '../types';
import { getUiClassByTag } from './element-util';

/** 自定义组件分组 */
export const componentCategories = {
  base: '基础组件',
  industry: '工业组件',
};
export type CustomCategory = keyof typeof componentCategories;
export class CustomMeta {
  name: string;
  label: string;
  category: CustomCategory;
  private _component?: typeof UI;
  get component(): typeof UI {
    if (_.isNil(this._component)) {
      this._component = getUiClassByTag(this.name);
      if (_.isNil(this._component)) {
        console.error(`组件 ${this.name} 没有注册`);
      }
    }
    return this._component!;
  }

  get appearanceTypes() {
    return (this.component as any).appearanceTypes as AppearanceType[];
  }

  constructor(info: {
    name: string;
    label: string;
    category: CustomCategory;
    component?: typeof UI;
  }) {
    this.name = info.name;
    this.label = info.label;
    this.category = info.category;
    this._component = info.component;
  }
}

const defaultMeta = {
  name: '',
  label: '',
};

/**
 * 创建自定义组件元信息
 * @param label 选择时用户看到的组件名
 * @param category 组件所属类，用于侧边栏分类显示
 */
function createMeta(label: string, category: CustomCategory, component?: typeof UI): CustomMeta {
  return new CustomMeta({ ...defaultMeta, label, category, component });
}

export const customMetas: Record<string, CustomMeta> = {
  // 基础组件类
  customRect: createMeta('矩形', 'base'),
  // 工业组件类
  customGauge: createMeta('仪表盘', 'industry'),
  testGauge: createMeta('测试', 'industry'),
  testGroup: createMeta('自定义组', 'industry'),
};

(function initCustomMetas() {
  _.entries(customMetas).forEach(([k, v]) => {
    v.name = k;
  });
})();
