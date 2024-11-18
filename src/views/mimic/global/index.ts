import type { App } from 'leafer-ui';
import type { CustomMeta } from '@mimic/utils';
import { DisplayEditor } from './display-editor';
import { ComponentEditor } from './component-editor';

interface MimicVar {
  // todo: 该字段去掉
  draggingCustomMeta?: CustomMeta;
  displayEditor: DisplayEditor;
  componentEditor: ComponentEditor;
}

export const mimicVar: MimicVar = {
  displayEditor: new DisplayEditor(),
  componentEditor: new ComponentEditor(),
};
