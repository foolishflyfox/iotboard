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
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const point = mimicVar.displayEditor.app?.getPagePoint(e);
    mimicVar.displayEditor.moveLineEndPoint(point!);
  } else if (mimicWorkspaceStatus.drawingTool === 'polygon') {
    const point = mimicVar.displayEditor.app?.getPagePoint(e);
    mimicVar.displayEditor.movePolygonEndPoint(point!);
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
