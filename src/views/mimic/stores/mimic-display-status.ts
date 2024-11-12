import { displayBaseMapId } from '@mimic/constant';

/** 图纸编辑器相关状态 */
export const useMimicDisplayStatus = defineStore('mimic-display-status', () => {
  // 当前选中的 UI
  const selectedUiId = ref<null | undefined | string | string[]>();
  const selectBaseMap = () => (selectedUiId.value = displayBaseMapId);
  // 打开的图纸路径
  const openedDisplays = ref<string[]>(['xxx', 'yyy']);
  const addOpenedDisplay = (displayPath: string) => {
    if (!openedDisplays.value.includes(displayPath)) {
      openedDisplays.value.push(displayPath);
    }
  };
  // 当前的图纸
  const currentDisplay = ref<string>();
  return {
    selectedUiId,
    selectBaseMap,
    openedDisplays,
    addOpenedDisplay,
    currentDisplay,
  };
});
