import type { KeyEvent } from 'leafer-ui';
import { doContextMenuAction } from '@mimic/WorkSpace/canvas-container/context-menu-action';
import { useMimicWorkspaceStatus } from '../stores';
import { mimicVar } from '../global';

export function keyHolderHandler(keyEvent: KeyEvent) {
  console.log('code, key =', keyEvent.code, keyEvent.key);
  if (keyEvent.code === 'Backspace' || keyEvent.code === 'Delete') {
    /** 键盘按删除键，删除选中的元素功能 */
    nextTick(() => doContextMenuAction('delete'));
  } else if (keyEvent.code === 'Escape') {
    const mimicWorkspaceStatus = useMimicWorkspaceStatus();
    if (mimicWorkspaceStatus.drawingTool === 'line') {
      mimicVar.displayEditor.deleteDrawingLine();
    } else if (mimicWorkspaceStatus.drawingTool === 'polygon') {
      mimicVar.displayEditor.deleteDrawingPolygon();
    }
  }
}
