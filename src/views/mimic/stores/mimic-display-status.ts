import { displayBaseMapId } from '@mimic/constant';

export const useMimicDisplayStatus = defineStore('mimic-display-status', () => {
  // 图纸编辑器相关
  // 当前选中的 UI
  const selectedUiId = ref<null | undefined | string | string[]>();
  const selectBaseMap = () => (selectedUiId.value = displayBaseMapId);
  return {
    selectedUiId,
    selectBaseMap,
  };
});
