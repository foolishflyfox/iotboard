import { Line } from 'leafer-ui';
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
  }
}

export function appMouseMoveHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'cursor') return;
  const point = mimicVar.displayEditor.app!.getPagePoint(e);
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    mimicVar.displayEditor.moveLineEndPoint(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'polygon') {
    mimicVar.displayEditor.movePolygonEndPoint(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'horizontalBase') {
    let line = mimicVar.baselineManager.getCurHorizontalLine();
    const points = [-10000, point.y, 10000, point.y];
    if (!line) {
      line = new Line({ points, strokeWidth: 1, stroke: '#FF0000' });
      mimicVar.baselineManager.setCurHorizontalLine(line);
    }
    line!.proxyData!.points = points;
  } else if (mimicWorkspaceStatus.drawingTool === 'verticalBase') {
    let line = mimicVar.baselineManager.getCurVerticalLine();
    const points = [point.x, -10000, point.x, 10000];
    if (!line) {
      line = new Line({ points, strokeWidth: 1, stroke: '#FF0000' });
      mimicVar.baselineManager.setCurVerticalLine(line);
    }
    line!.proxyData!.points = points;
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
  }
}

// export function t
