import type { App } from 'leafer-ui';
import type { CustomMeta } from '@mimic/utils';
import { DisplayEditor } from './display-editor';
import { ComponentEditor } from './component-editor';

interface MimicVar {
  // todo: 该字段去掉
  draggingCustomMeta?: CustomMeta;
  /** 存放组件 tag 与对应 json 字符串之间的映射关系 */
  componentJsonStrDict: Record<string, string>;
  displayEditor: DisplayEditor;
  componentEditor: ComponentEditor;
}

export const mimicVar: MimicVar = {
  componentJsonStrDict: {},
  displayEditor: new DisplayEditor(),
  componentEditor: new ComponentEditor(),
};
