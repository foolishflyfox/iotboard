import { Line, type IPointData } from 'leafer-ui';
import { mimicVar } from '../global';
import { useMimicWorkspaceStatus } from '@mimic/stores';

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
