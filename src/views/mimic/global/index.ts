import type { App } from 'leafer-ui';
import type { CustomMeta } from '@mimic/utils';
import { DisplayEditor } from './display-editor';
import { ComponentEditor } from './component-editor';

interface MimicVar {
  // todo: 该字段去掉
  draggingCustomMeta?: CustomMeta;
  /** 正在拖拽的类型 */
  draggingType?: 'component' | 'module' | 'element';
  /** 正在拖拽的对象的 tag */
  draggingTag?: string;
  displayEditor: DisplayEditor;
  componentEditor: {
    app?: App;
    draggingTag?: string;
  };
}

export const mimicVar: MimicVar = {
  displayEditor: new DisplayEditor(),
  componentEditor: new ComponentEditor(),
};
