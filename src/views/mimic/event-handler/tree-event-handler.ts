import { mimicVar } from '../global';
import { useMimicWorkspaceStatus } from '@mimic/stores';

export function treeMouseTapHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const v = mimicVar.displayEditor.app?.getPagePoint(e);
    console.log('mouse tap', e, v);
  }
}

export function treeMouseMoveHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  if (mimicWorkspaceStatus.drawingTool === 'line') {
    const v = mimicVar.displayEditor.app?.getPagePoint(e);
    console.log('mouse move', v);
  }
}

export function treeMouseDoubleTapHandler(e: PointerEvent) {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  console.log('mouse db tap', e);
}
