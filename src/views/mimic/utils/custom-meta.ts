import type { UI } from 'leafer-ui';
import * as _ from 'lodash-es';
import { UICreator } from 'leafer-ui';
import type { AppearancePropertyType } from '../types';

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
      this._component = UICreator.list[this.name];
      if (_.isNil(this._component)) {
        console.error(`组件 ${this.name} 没有注册`);
      }
    }
    return this._component!;
  }
  get appearancePropertyTypes() {
    return (this.component as any).appearancePropertyTypes as AppearancePropertyType[];
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

function createMeta(label: string, category: CustomCategory, component?: typeof UI): CustomMeta {
  return new CustomMeta({ ...defaultMeta, label, category, component });
}

export const customMetas: Record<string, CustomMeta> = {
  // 基础组件类
  customRect: createMeta('矩形', 'base'),
  // 工业组件类
  customGauge: createMeta('仪表盘', 'industry'),
};

(function initCustomMetas() {
  _.entries(customMetas).forEach(([k, v]) => {
    v.name = k;
  });
})();
