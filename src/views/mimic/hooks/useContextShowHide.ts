import { useTimeout } from '@vueuse/core';

export function useContextShowHide() {
  const x = ref(0);
  const y = ref(0);
  const show = ref(false);
  /**
   * 设置保持状态，解决从一个选中元素直接右键另一个元素时，菜单消失的情况
   * 产生该问题的原因是上述情况先触发目标的 @contextmenu，再触发 on-clickoutside 事件
   */
  const { ready: canHideContextMenu, start: startForbidHideContextMenu } = useTimeout(100, {
    controls: true,
  });
  function showMenu(event: MouseEvent) {
    show.value = true;
    startForbidHideContextMenu();
    x.value = event.x;
    y.value = event.y;
  }
  function hideMenu() {
    if (canHideContextMenu.value) {
      show.value = false;
    }
  }
  return { x, y, show, showMenu, hideMenu };
}
