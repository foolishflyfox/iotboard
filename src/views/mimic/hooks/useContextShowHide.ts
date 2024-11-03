import { useTimeout } from '@vueuse/core';

export function useContextShowHide() {
  const x = ref(0);
  const y = ref(0);
  const show = ref(false);
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
