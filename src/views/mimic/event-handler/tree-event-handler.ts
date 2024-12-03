import { mimicVar } from '../global';
import { useMimicWorkspaceStatus } from '@mimic/stores';

export function treeMouseTapHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const point = mimicVar.displayEditor.app?.getPagePoint(e);
    if (mimicVar.displayEditor.getDrawLineStatus() === 'end') {
      mimicVar.displayEditor.beginDrawLine(point!);
    } else if (mimicVar.displayEditor.getDrawLineStatus() === 'start') {
      mimicVar.displayEditor.addLineEndPoint(point!);
    }
  }
}

export function treeMouseMoveHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const point = mimicVar.displayEditor.app?.getPagePoint(e);
    mimicVar.displayEditor.moveLineEndPoint(point!);
  }
}

export function treeMouseDoubleTapHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const point = mimicVar.displayEditor.app?.getPagePoint(e);
    mimicVar.displayEditor.endDrawLine(point!);
  }
}
