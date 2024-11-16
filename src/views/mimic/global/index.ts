import type { App } from 'leafer-ui';
import type { CustomMeta } from '@mimic/utils';
import type { DisplayData, OpenedTarget } from '@mimic/types';
import { loadDisplayData, generateDisplayData } from './display-utils';

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
    /** 根据编辑器状态生成图纸数据 */
    generateDisplayData: () => DisplayData | null;
  };
  componentEditor: {
    app?: App;
    draggingTag?: string;
  };
}

export const mimicVar: MimicVar = {
  displayEditor: {
    /** 根据目标从内存中获取图纸信息 */
    getDisplayData(target: OpenedTarget) {
      const key = generateTargetKey(target);
      return displayDataDict[key];
    },
    /** 将图纸信息存入内存 */
    setDisplayData(target: OpenedTarget, data: DisplayData) {
      if (data) {
        const key = generateTargetKey(target);
        displayDataDict[key] = data;
      }
    },
    /** 将图纸信息从内存中删除 */
    delDisplayData(target: OpenedTarget) {
      const key = generateTargetKey(target);
      if (displayDataDict[key]) {
        delete displayDataDict[key];
      }
    },
    /** 加载图纸信息到编辑器中 */
    loadDisplayData: displayData => {
      loadDisplayData(mimicVar.displayEditor.app!, displayData);
    },
    /** 从编辑器中获取图纸信息 */
    generateDisplayData: () => {
      return generateDisplayData(mimicVar.displayEditor.app!);
    },
  },
  componentEditor: {},
};
