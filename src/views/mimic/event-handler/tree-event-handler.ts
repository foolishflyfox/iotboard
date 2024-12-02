import { mimicVar } from '../global';
import { useMimicWorkspaceStatus } from '@mimic/stores';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

export function treeMouseTapHandler(e: PointerEvent) {
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const v = mimicVar.displayEditor.app?.getPagePoint(e);
    console.log('mouse tap', e, v);
  }
}

export function treeMouseMoveHandler(e: PointerEvent) {
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const v = mimicVar.displayEditor.app?.getPagePoint(e);
    console.log('mouse move', v);
  }
}

export function treeMouseDoubleTapHandler(e: PointerEvent) {
  console.log('mouse db tap', e);
}
