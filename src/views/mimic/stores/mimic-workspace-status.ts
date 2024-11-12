import type { ComponentType, EditorType } from '@mimic/types';

export const useMimicWorkspaceStatus = defineStore('mimic-workspace-status', () => {
  // 工作区标尺是否可见
  const rulerVisible = ref(true);
  // 当前编辑类型
  const curEditorType = ref<EditorType>('display');

  // 模块编辑器相关

  return {
    rulerVisible,
    curEditorType,
  };
});
