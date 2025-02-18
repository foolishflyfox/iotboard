import { Line, type IPointData, type IUI } from 'leafer-editor';
import { mimicVar } from '../global';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import type { Action } from '@mimic/global/action-manager';
import * as _ from 'lodash-es';

const oldUiPosSize = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

export function appMouseTapHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const point = mimicVar.canvasEditor.app?.getPagePoint(e);
    if (mimicVar.canvasEditor.getDrawLineStatus() === 'end') {
      mimicVar.canvasEditor.beginDrawLine(point!);
    } else if (mimicVar.canvasEditor.getDrawLineStatus() === 'start') {
      mimicVar.canvasEditor.addLineEndPoint(point!);
    }
  } else if (mimicWorkspaceStatus.drawingTool === 'polygon') {
    const point = mimicVar.canvasEditor.app?.getPagePoint(e);
    if (mimicVar.canvasEditor.getDrawPolygonStatus() === 'end') {
      mimicVar.canvasEditor.beginDrawPolygon(point!);
    } else if (mimicVar.canvasEditor.getDrawPolygonStatus() === 'start') {
      mimicVar.canvasEditor.addPolygonEndPoint(point!);
    }
  } else if (mimicWorkspaceStatus.drawingTool === 'horizontalBase') {
    mimicVar.baselineManagerContainer.getManager()?.addHorizontalLine();
  } else if (mimicWorkspaceStatus.drawingTool === 'verticalBase') {
    mimicVar.baselineManagerContainer.getManager()?.addVerticalLine();
  } else if (mimicWorkspaceStatus.drawingTool === 'cursor') {
    if (mimicWorkspaceStatus.rulerVisible) {
      if ((e.x <= 20 && e.y > 20) || (e.x > 20 && e.y <= 20)) {
        if (e.x <= 20 && e.y > 20) {
          mimicVar.baselineManagerContainer.getManager()?.addHorizontalLine();
        } else {
          mimicVar.baselineManagerContainer.getManager()?.addVerticalLine();
        }
      }
    }
  }
}

export function appMouseDownHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'cursor') {
    const mimicDisplayStatus = useMimicDisplayStatus();
    if (mimicDisplayStatus.curUi) {
      const curUi = mimicDisplayStatus.curUi as IUI;
      oldUiPosSize.x = curUi.x!;
      oldUiPosSize.y = curUi.y!;
      oldUiPosSize.width = curUi.width!;
      oldUiPosSize.height = curUi.height!;
    }
  }
}

export function appMouseMoveHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  const point = mimicVar.canvasEditor.app!.getPagePoint(e);
  mimicWorkspaceStatus.cursorPos = point;
  if (mimicWorkspaceStatus.drawingTool === 'cursor') {
    if (mimicWorkspaceStatus.rulerVisible) {
      if ((e.x <= 20 && e.y > 20) || (e.x > 20 && e.y <= 20)) {
        if (e.x <= 20 && e.y > 20) {
          // 绘制水平辅助线
          moveHorizontalBaseline(point);
          return;
        } else {
          // 绘制垂直辅助线
          moveVerticalBaseline(point);
          return;
        }
      } else {
        mimicVar.baselineManagerContainer.getManager()?.clearCurBaseLine();
      }
    } else {
      mimicVar.baselineManagerContainer.getManager()?.clearAllBaselines();
    }
    return;
  }
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    mimicVar.canvasEditor.moveLineEndPoint(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'polygon') {
    mimicVar.canvasEditor.movePolygonEndPoint(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'horizontalBase') {
    moveHorizontalBaseline(point);
  } else if (mimicWorkspaceStatus.drawingTool === 'verticalBase') {
    moveVerticalBaseline(point);
  }
}

export function appMouseDoubleTapHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const point = mimicVar.canvasEditor.app?.getPagePoint(e);
    mimicVar.canvasEditor.endDrawLine(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'polygon') {
    const point = mimicVar.canvasEditor.app?.getPagePoint(e);
    mimicVar.canvasEditor.endDrawPolygon(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'horizontalBase') {
    mimicVar.baselineManagerContainer.getManager()?.deleteHorizontalLine();
  } else if (mimicWorkspaceStatus.drawingTool === 'verticalBase') {
    mimicVar.baselineManagerContainer.getManager()?.deleteVerticalLine();
  } else if (mimicWorkspaceStatus.drawingTool === 'cursor') {
    if (mimicWorkspaceStatus.rulerVisible) {
      if ((e.x <= 20 && e.y > 20) || (e.x > 20 && e.y <= 20)) {
        if (e.x <= 20 && e.y > 20) {
          mimicVar.baselineManagerContainer.getManager()?.deleteHorizontalLine();
        } else {
          mimicVar.baselineManagerContainer.getManager()?.deleteVerticalLine();
        }
      }
    }
  }
}

export function appMouseUpHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'cursor') {
    const mimicDisplayStatus = useMimicDisplayStatus();
    if (_.isString(mimicDisplayStatus.selectedUiId) && mimicDisplayStatus.curUi) {
      const action: Action = [];
      const curUi = mimicDisplayStatus.curUi as IUI;
      for (const attrName of ['x', 'y', 'width', 'height']) {
        if (curUi[attrName] !== oldUiPosSize[attrName]) {
          action.push({
            type: 'set',
            uiId: mimicDisplayStatus.selectedUiId,
            attrName,
            oldValue: oldUiPosSize[attrName],
            newValue: curUi[attrName]
          });
        }
      }
      if (action.length > 0) {
        mimicVar.actionManagerContainer.getManager()?.addAction(action);
      }
    }
  }
}

function moveHorizontalBaseline(point: IPointData) {
  let line = mimicVar.baselineManagerContainer.getManager()?.getCurHorizontalLine();
  const points = [-10000, point.y, 10000, point.y];
  if (!line) {
    line = new Line({ points, strokeWidth: 1, stroke: '#FF0000', dashPattern: [3] });
    mimicVar.baselineManagerContainer.getManager()?.setCurHorizontalLine(line);
  }
  line!.proxyData!.points = points;
}

function moveVerticalBaseline(point: IPointData) {
  let line = mimicVar.baselineManagerContainer.getManager()?.getCurVerticalLine();
  const points = [point.x, -10000, point.x, 10000];
  if (!line) {
    line = new Line({ points, strokeWidth: 1, stroke: '#FF0000', dashPattern: [3] });
    mimicVar.baselineManagerContainer.getManager()?.setCurVerticalLine(line);
  }
  line!.proxyData!.points = points;
}
