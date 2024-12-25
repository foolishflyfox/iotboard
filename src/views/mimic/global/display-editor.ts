import type { DisplayData, OpenedTarget } from '@mimic/types';
import {
  ChildEvent,
  Line,
  Polygon,
  PropertyEvent,
  Rect,
  type App,
  type IPointData,
  type IUI,
} from 'leafer-ui';
import { displayBaseMapId } from '@mimic/constant';
import { useMimicDisplayStatus } from '@mimic/stores';
import { generateTargetKey } from './inner-utils';
import * as _ from 'lodash-es';
import '@leafer-in/arrow';
import { getElementClassByTag, registerUiClass } from '../custom/registrar';
import { useKeyModifier } from '@vueuse/core';

const shiftState = useKeyModifier('Shift');

export class DisplayEditor {
  app?: App;
  /** 正在拖拽的对象的 tag */
  draggingTag?: string;
  /** 正在拖拽的类型 */
  draggingType?: 'component' | 'module' | 'element' | 'asset';

  private displayDataDict: Record<string, DisplayData>;

  private drawingToolStatus: {
    line: {
      ui?: Line;
    };
    polygon: {
      ui?: Polygon;
    }
  };

  constructor() {
    this.displayDataDict = {};
    this.drawingToolStatus = {
      line: {},
      polygon: {}
    };
  }

  getDrawLineStatus() {
    if (this.drawingToolStatus.line.ui) return 'start';
    return 'end';
  }

  getDrawPolygonStatus() {
    if (this.drawingToolStatus.polygon.ui) return 'start';
    return 'end';
  }

  /** 开始绘制直线 */
  beginDrawLine(point: IPointData) {
    if (this.app?.tree) {
      const lineClass = getElementClassByTag('element:line');
      const line = new lineClass({
        points: [point.x, point.y, point.x, point.y],
        draggable: false,
        editable: false,
      });
      this.drawingToolStatus.line.ui = line;
      this.app.tree.add(line);
    }
  }

  /** 开始绘制多边形 */
  beginDrawPolygon(point: IPointData) {
    if (this.app?.tree) {
      const polygonClass = getElementClassByTag('element:polygon');
      const polygon = new polygonClass({
        points: [point.x, point.y + 0.1, point.x, point.y, point.x, point.y + 0.2],
        draggable: false,
        editable: false
      });
      this.drawingToolStatus.polygon.ui = polygon;
      this.app.tree.add(polygon);
    }
  }

  /** 修改最后一个点的坐标 */
  moveLineEndPoint(point: IPointData) {
    if (this.app?.tree && this.drawingToolStatus.line.ui) {
      const newPoints = [...this.drawingToolStatus.line.ui.points!] as number[];
      const len = newPoints.length;
      newPoints[len - 2] = point.x;
      newPoints[len - 1] = point.y;
      if (shiftState.value && newPoints.length >= 4) {
        const dx = Math.abs(newPoints[len - 2] - newPoints[len - 4]);
        const dy = Math.abs(newPoints[len - 1] - newPoints[len - 3]);
        if (dx > dy) newPoints[len - 1] = newPoints[len - 3];
        else newPoints[len - 2] = newPoints[len - 4];
      }
      this.drawingToolStatus.line.ui.points = newPoints;
    }
  }

  movePolygonEndPoint(point: IPointData) {
    if (this.app?.tree && this.drawingToolStatus.polygon.ui) {
      const newPoints = [...this.drawingToolStatus.polygon.ui.points!] as number[];
      const len = newPoints.length;
      newPoints[len - 2] = point.x;
      newPoints[len - 1] = point.y;
      if (shiftState.value && newPoints.length >= 4) {
        const dx = Math.abs(newPoints[len - 2] - newPoints[len - 4]);
        const dy = Math.abs(newPoints[len - 1] - newPoints[len - 3]);
        if (dx > dy) newPoints[len - 1] = newPoints[len - 3];
        else newPoints[len - 2] = newPoints[len - 4];
      }
      this.drawingToolStatus.polygon.ui.points = newPoints;
    }
  }

  /** 添加一个中转点 */
  addLineEndPoint(point: IPointData) {
    if (this.app?.tree && this.drawingToolStatus.line.ui) {
      const newPoints = [...this.drawingToolStatus.line.ui.points!] as number[];
      newPoints.push(point.x);
      newPoints.push(point.y);
      this.drawingToolStatus.line.ui.points = newPoints;
    }
  }

  addPolygonEndPoint(point: IPointData) {
    if (this.app?.tree && this.drawingToolStatus.polygon.ui) {
      const newPoints = [...this.drawingToolStatus.polygon.ui.points!] as number[];
      newPoints.push(point.x);
      newPoints.push(point.y);
      this.drawingToolStatus.polygon.ui.points = newPoints;
    }
  }

  /** 结束折线绘制 */
  endDrawLine(point: IPointData) {
    if (this.app?.tree && this.drawingToolStatus.line.ui) {
      this.moveLineEndPoint(point);
      this.drawingToolStatus.line.ui.draggable = true;
      this.drawingToolStatus.line.ui.editable = true;
      this.drawingToolStatus.line.ui = undefined;
    }
  }

  endDrawPolygon(point: IPointData) {
    if (this.app?.tree && this.drawingToolStatus.polygon.ui) {
      const points = this.drawingToolStatus.polygon.ui?.points;
      if (points && points.length > 6) {
        const newPoints = _.slice(points as number[], 2);
        const len = newPoints.length;
        newPoints[len - 2] = point.x;
        newPoints[len - 1] = point.y;
        this.drawingToolStatus.polygon.ui.points = newPoints;
      } else {
        this.movePolygonEndPoint(point);
      }
      this.drawingToolStatus.polygon.ui.draggable = true;
      this.drawingToolStatus.polygon.ui.editable = true;
      this.drawingToolStatus.polygon.ui = undefined;
    }
  }

  /** 删除正在绘制的折线 */
  deleteDrawingLine() {
    if (this.app?.tree && this.drawingToolStatus.line.ui) {
      this.app.tree.remove(this.drawingToolStatus.line.ui);
      this.drawingToolStatus.line.ui = undefined;
    }
  }

  deleteDrawingPolygon() {
    if (this.app?.tree && this.drawingToolStatus.polygon.ui) {
      this.app.tree.remove(this.drawingToolStatus.polygon.ui);
      this.drawingToolStatus.polygon.ui = undefined;
    }
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
  async loadDisplayData(displayData: DisplayData) {
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
    // 加载子元素
    for (const child of displayData.children || []) {
      if (child.tag) {
        if (child.tag.startsWith('element:')) {
          const elementClass = getElementClassByTag(child.tag);
          const element = new elementClass(child);
          // 不用 nextTick，element 将不能添加到 tree
          nextTick(() => {
            this.app?.tree.add(element);
          });
        } else {
          const componentClass = await registerUiClass(child.tag);
          const component = new componentClass(child);
          nextTick(() => {
            this.app?.tree.add(component);
          });
        }
      }

      // this.app?.tree.add(child);
    }

    this.viewAutoFit();
  }

  /** 根据编辑器状态生成图纸数据 */
  generateDisplayData() {
    if (!this.app?.tree) return null;
    const allUi = this.app?.tree.find(() => 1);
    const displayData = { baseMap: {}, children: ([] as object) } as DisplayData;
    for (const ui of allUi) {
      if (ui.id === displayBaseMapId) {
        const baseMap = displayData.baseMap;
        baseMap.backgroundColor = ui.fill as string;
        baseMap.width = ui.width!;
        baseMap.height = ui.height!;
        baseMap.sizeType = ui.data?.sizeType;
      } else {
        if (ui.tag === 'Leafer') {
          // 对 leafer 层的处理
        } else {
          if (ui.parent?.tag === 'Leafer') {
            if (!displayData.children) displayData.children = [];
            displayData.children.push(ui.toJSON());
          }
        }
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
