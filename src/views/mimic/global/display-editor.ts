import type { DisplayData, OpenedTarget } from '@mimic/types';
import { ChildEvent, PropertyEvent, Rect, type App, type IUI } from 'leafer-ui';
import { displayBaseMapId } from '@mimic/constant';
import { useMimicDisplayStatus } from '@mimic/stores';
import { generateTargetKey } from './inner-utils';
import * as _ from 'lodash-es';

export class DisplayEditor {
  app?: App;
  /** 正在拖拽的对象的 tag */
  draggingTag?: string;
  /** 正在拖拽的类型 */
  draggingType?: 'component' | 'module' | 'element' | 'asset';
  private displayDataDict: Record<string, DisplayData>;

  constructor() {
    this.displayDataDict = {};
  }

  /** 页面自适应 */
  viewAutoFit() {
    this.app?.tree?.zoom('fit', 23);
  }

  /** 根据目标从内存中获取图纸信息 */
  getDisplayData(target: OpenedTarget) {
    const key = generateTargetKey(target);
    return this.displayDataDict[key];
  }

  /** 将图纸信息存入内存 */
  setDisplayData(target: OpenedTarget, data: DisplayData) {
    if (data) {
      const key = generateTargetKey(target);
      this.displayDataDict[key] = data;
    }
  }

  /** 将图纸信息从内存中删除 */
  delDisplayData(target: OpenedTarget) {
    const key = generateTargetKey(target);
    if (this.displayDataDict[key]) {
      delete this.displayDataDict[key];
    }
  }

  loadOpenedDisplay(openedTarget: OpenedTarget) {
    const displayData = this.getDisplayData(openedTarget);
    if (!displayData) return;
    this.loadDisplayData(displayData);
  }

  /** 载入图纸数据在编辑器中渲染 */
  loadDisplayData(displayData: DisplayData) {
    const { width, height, backgroundColor } = displayData.baseMap;
    const displayBaseMap = new Rect({
      id: displayBaseMapId,
      width,
      height,
      fill: backgroundColor,
      data: {
        sizeType: 'custom',
      },
      event: {
        [PropertyEvent.CHANGE]: (v: PropertyEvent) => {
          if (v.attrName === 'width' || v.attrName === 'height') {
            nextTick(() => this.viewAutoFit());
          }
        },
        [ChildEvent.MOUNTED]: () => {
          const mimicDisplayStatus = useMimicDisplayStatus();
          mimicDisplayStatus.selectBaseMap();
        },
      },
    });
    this.app?.tree.clear();
    this.app?.tree.add(displayBaseMap);

    this.viewAutoFit();
  }

  /** 根据编辑器状态生成图纸数据 */
  generateDisplayData() {
    if (!this.app?.tree) return null;
    const allUi = this.app?.tree.find(() => 1);
    const displayData: DisplayData = { baseMap: {} } as any;
    for (const ui of allUi) {
      if (ui.id === displayBaseMapId) {
        const baseMap = displayData.baseMap;
        baseMap.backgroundColor = ui.fill as string;
        baseMap.width = ui.width!;
        baseMap.height = ui.height!;
        baseMap.sizeType = ui.data?.sizeType;
        console.log('保存图纸信息: ', baseMap);
      }
    }
    return displayData;
  }
  /** 根据元素 id 查询 UI 对象 */
  findUiById(id?: null | string | string[]) {
    if (_.isNil(id)) return null;
    if (_.isArray(id)) {
      // 遍历
      return id.map(id => this.app!.tree.findId(id)) as IUI[];
    }
    return this.app?.tree.findId(id);
  }
}
