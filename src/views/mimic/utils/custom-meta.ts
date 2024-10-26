import * as _ from 'lodash-es';

export interface CustomMeta {
  name: string;
  label: string;
  // component: UI;
}
const defaultMeta = {
  name: '',
  label: '',
};

export const customMetas = {
  customGauge: { ...defaultMeta, label: '仪表盘' },
};

(function initCustomMetas() {
  _.entries(customMetas).forEach(([k, v]) => {
    v.name = k;
  });
})();
