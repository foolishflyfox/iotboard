import type { KeyEvent } from 'leafer-ui';
import { doContextMenuAction } from '@mimic/WorkSpace/canvas-container/context-menu-action';

/** todo: 键盘按删除键，删除选中的元素功能 */
export function keyHolderHandler(keyEvent: KeyEvent) {
  console.log('keyHolderHandler exec');
  // console.log('code, key =', keyEvent.code, keyEvent.key);
  if (keyEvent.code === 'Backspace' || keyEvent.code === 'Delete') {
    nextTick(() => doContextMenuAction('delete'));
  }
}
