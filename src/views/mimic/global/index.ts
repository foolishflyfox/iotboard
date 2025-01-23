import { CanvasEditor } from './display-editor';
import { ComponentEditor } from './component-editor';
import { BaselineManager } from './baseline-manager';
import { BaselineManagerContainer } from './baseline-manager-container';
import { ActionManagerContainer } from './action-manager-container';
import { UiLayerManagerContainer } from './ui-layer-manager-container';

export * from './ui-layer-manager';

interface MimicVar {
  /** 存放组件 tag 与对应 json 字符串之间的映射关系 */
  componentJsonStrDict: Record<string, string>;
  canvasEditor: CanvasEditor;
  componentEditor: ComponentEditor;
  baselineManagerContainer: BaselineManagerContainer;
  actionManagerContainer: ActionManagerContainer;
  uiLayerManagerContainer: UiLayerManagerContainer;
}

export const mimicVar: MimicVar = {
  componentJsonStrDict: {},
  canvasEditor: new CanvasEditor(),
  componentEditor: new ComponentEditor(),
  baselineManagerContainer: new BaselineManagerContainer(),
  actionManagerContainer: new ActionManagerContainer(),
  uiLayerManagerContainer: new UiLayerManagerContainer()
};

export { BaselineManager };
