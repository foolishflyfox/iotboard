import { displayBaseMapId } from '@mimic/constant';

/** 图纸编辑器相关状态 */
export const useMimicDisplayStatus = defineStore('mimic-display-status', () => {
  // 当前选中的 UI
  const selectedUiId = ref<null | undefined | string | string[]>();
  const selectBaseMap = () => (selectedUiId.value = displayBaseMapId);
  // 当前的图纸
  const currentDisplay = ref<string>();
  return {
    selectedUiId,
    selectBaseMap,
    currentDisplay,
  };
});
