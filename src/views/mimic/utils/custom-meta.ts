import type { UI } from 'leafer-ui';
import * as _ from 'lodash-es';

/** 自定义组件分组 */
export const componentCategories = {
  base: '基础组件',
  industry: '工业组件',
};
export type CustomCategory = keyof typeof componentCategories;
export interface CustomMeta {
  name: string;
  label: string;
  category: CustomCategory;
  component?: typeof UI;
}

const defaultMeta = {
  name: '',
  label: '',
};

function createMeta(
  label: string,
  category: CustomCategory,
  component?: typeof UI,
): CustomMeta {
  return { ...defaultMeta, label, category, component };
}

export const customMetas: Record<string, CustomMeta> = {
  // 工业组件类
  customGauge: createMeta('仪表盘', 'industry') as CustomMeta,
};

export function registerCustomMeta(tag: string, component: typeof UI) {
  customMetas[tag].component = component;
}

(function initCustomMetas() {
  _.entries(customMetas).forEach(([k, v]) => {
    v.name = k;
  });
})();
