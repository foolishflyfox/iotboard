import type { App } from 'leafer-ui';
import type { CustomMeta } from '@mimic/utils';
import type { DisplayData, OpenedTarget } from '@mimic/types';
import { loadDisplayData } from './display-utils';

const displayDataDict: Record<string, DisplayData> = {};
function generateTargetKey(target: OpenedTarget) {
  return `${target.editorType}:${target.path}`;
}

interface MimicVar {
  draggingCustomMeta?: CustomMeta;
  /** 正在拖拽的类型 */
  draggingType?: 'component' | 'module' | 'element';
  /** 正在拖拽的对象的 tag */
  draggingTag?: string;
  displayEditor: {
    app?: App;
    setDisplayData: (target: OpenedTarget, data: DisplayData) => void;
    getDisplayData: (target: OpenedTarget) => DisplayData | undefined;
    delDisplayData: (target: OpenedTarget) => void;
    /** 载入图纸数据在编辑器中渲染 */
    loadDisplayData: (displayData: DisplayData) => void;
  };
  componentEditor: {
    app?: App;
    draggingTag?: string;
  };
}

export const mimicVar: MimicVar = {
  displayEditor: {
    getDisplayData(target: OpenedTarget) {
      const key = generateTargetKey(target);
      return displayDataDict[key];
    },
    setDisplayData(target: OpenedTarget, data: DisplayData) {
      if (data) {
        const key = generateTargetKey(target);
        displayDataDict[key] = data;
      }
    },
    delDisplayData(target: OpenedTarget) {
      const key = generateTargetKey(target);
      if (displayDataDict[key]) {
        delete displayDataDict[key];
      }
    },
    loadDisplayData,
  },
  componentEditor: {},
};
