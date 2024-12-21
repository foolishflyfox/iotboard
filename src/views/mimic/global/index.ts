import { DisplayEditor } from './display-editor';
import { ComponentEditor } from './component-editor';
import { BaselineManager } from './baseline-manager';
import { BaselineManagerContainer } from './baseline-manager-container';

interface MimicVar {
  /** 存放组件 tag 与对应 json 字符串之间的映射关系 */
  componentJsonStrDict: Record<string, string>;
  displayEditor: DisplayEditor;
  componentEditor: ComponentEditor;
  baselineManager: BaselineManager;
  baselineManagerContainer: BaselineManagerContainer;
}

export const mimicVar: MimicVar = {
  componentJsonStrDict: {},
  displayEditor: new DisplayEditor(),
  componentEditor: new ComponentEditor(),
  baselineManager: new BaselineManager(),
  baselineManagerContainer: new BaselineManagerContainer(),
};

export { BaselineManager };
