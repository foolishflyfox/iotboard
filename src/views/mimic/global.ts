import type { App } from 'leafer-ui';
import type { CustomMeta } from './utils';

interface MimicVar {
  draggingCustomMeta?: CustomMeta;
  /** 正在拖拽的类型 */
  draggingType?: 'component' | 'module' | 'element';
  /** 正在拖拽的对象的 tag */
  draggingTag?: string;
  displayEditor: {
    app?: App;
  };
  componentEditor: {
    app?: App;
    draggingTag?: string;
  };
}

export const mimicVar: MimicVar = {
  displayEditor: {},
  componentEditor: {},
};
