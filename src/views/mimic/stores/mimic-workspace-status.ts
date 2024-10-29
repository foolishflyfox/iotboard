export const useMimicWorkspaceStatus = defineStore('mimic-workspace-status', () => {
  // 工作区标尺是否可见
  const rulerVisible = ref(true);
  // 当前选中的 UI
  const selectedUiId = ref<null | undefined | string | string[]>(null);

  return { rulerVisible, selectedUiId };
});
