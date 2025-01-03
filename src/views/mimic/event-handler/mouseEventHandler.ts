import { Line, type IPointData, type IUI } from 'leafer-ui';
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
    const point = mimicVar.displayEditor.app?.getPagePoint(e);
    if (mimicVar.displayEditor.getDrawLineStatus() === 'end') {
      mimicVar.displayEditor.beginDrawLine(point!);
    } else if (mimicVar.displayEditor.getDrawLineStatus() === 'start') {
      mimicVar.displayEditor.addLineEndPoint(point!);
    }
  } else if (mimicWorkspaceStatus.drawingTool === 'polygon') {
    const point = mimicVar.displayEditor.app?.getPagePoint(e);
    if (mimicVar.displayEditor.getDrawPolygonStatus() === 'end') {
      mimicVar.displayEditor.beginDrawPolygon(point!);
    } else if (mimicVar.displayEditor.getDrawPolygonStatus() === 'start') {
      mimicVar.displayEditor.addPolygonEndPoint(point!);
    }
  } else if (mimicWorkspaceStatus.drawingTool === 'horizontalBase') {
    mimicVar.baselineManagerContainer.getBaselineManager()?.addHorizontalLine();
  } else if (mimicWorkspaceStatus.drawingTool === 'verticalBase') {
    mimicVar.baselineManagerContainer.getBaselineManager()?.addVerticalLine();
  } else if (mimicWorkspaceStatus.drawingTool === 'cursor') {
    if (mimicWorkspaceStatus.rulerVisible) {
      if ((e.x <= 20 && e.y > 20) || (e.x > 20 && e.y <= 20)) {
        if (e.x <= 20 && e.y > 20) {
          mimicVar.baselineManagerContainer.getBaselineManager()?.addHorizontalLine();
        } else {
          mimicVar.baselineManagerContainer.getBaselineManager()?.addVerticalLine();
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
  const point = mimicVar.displayEditor.app!.getPagePoint(e);
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
        mimicVar.baselineManagerContainer.getBaselineManager()?.clearCurBaseLine();
      }
    } else {
      mimicVar.baselineManagerContainer.getBaselineManager()?.clearAllBaselines();
    }
    return;
  }
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    mimicVar.displayEditor.moveLineEndPoint(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'polygon') {
    mimicVar.displayEditor.movePolygonEndPoint(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'horizontalBase') {
    moveHorizontalBaseline(point);
  } else if (mimicWorkspaceStatus.drawingTool === 'verticalBase') {
    moveVerticalBaseline(point);
  }
}

export function appMouseDoubleTapHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const point = mimicVar.displayEditor.app?.getPagePoint(e);
    mimicVar.displayEditor.endDrawLine(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'polygon') {
    const point = mimicVar.displayEditor.app?.getPagePoint(e);
    mimicVar.displayEditor.endDrawPolygon(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'horizontalBase') {
    mimicVar.baselineManagerContainer.getBaselineManager()?.deleteHorizontalLine();
  } else if (mimicWorkspaceStatus.drawingTool === 'verticalBase') {
    mimicVar.baselineManagerContainer.getBaselineManager()?.deleteVerticalLine();
  } else if (mimicWorkspaceStatus.drawingTool === 'cursor') {
    if (mimicWorkspaceStatus.rulerVisible) {
      if ((e.x <= 20 && e.y > 20) || (e.x > 20 && e.y <= 20)) {
        if (e.x <= 20 && e.y > 20) {
          mimicVar.baselineManagerContainer.getBaselineManager()?.deleteHorizontalLine();
        } else {
          mimicVar.baselineManagerContainer.getBaselineManager()?.deleteVerticalLine();
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
        mimicVar.actionManagerContainer.getActionManager()?.addAction(action);
      }
    }
  }
}

function moveHorizontalBaseline(point: IPointData) {
  let line = mimicVar.baselineManagerContainer.getBaselineManager()?.getCurHorizontalLine();
  const points = [-10000, point.y, 10000, point.y];
  if (!line) {
    line = new Line({ points, strokeWidth: 1, stroke: '#FF0000', dashPattern: [3] });
    mimicVar.baselineManagerContainer.getBaselineManager()?.setCurHorizontalLine(line);
  }
  line!.proxyData!.points = points;
}

function moveVerticalBaseline(point: IPointData) {
  let line = mimicVar.baselineManagerContainer.getBaselineManager()?.getCurVerticalLine();
  const points = [point.x, -10000, point.x, 10000];
  if (!line) {
    line = new Line({ points, strokeWidth: 1, stroke: '#FF0000', dashPattern: [3] });
    mimicVar.baselineManagerContainer.getBaselineManager()?.setCurVerticalLine(line);
  }
  line!.proxyData!.points = points;
}
