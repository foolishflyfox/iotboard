import { displayBaseMapId } from '@mimic/constant';
import type { ComponentType, EditorType } from '@mimic/types';

export const useMimicWorkspaceStatus = defineStore('mimic-workspace-status', () => {
  // 工作区标尺是否可见
  const rulerVisible = ref(true);
  // 当前编辑类型
  const curEditorType = ref<EditorType>('display');

  // 模块编辑器相关

  // 组件编辑器相关
  const componentEditorStatus = reactive<{
    selectedUiIds: string[];
    // 编辑组件时的组件类型
    editComponentType: ComponentType;
  }>({
    selectedUiIds: [],
    editComponentType: 'code',
  });

  return {
    rulerVisible,
    curEditorType,
    componentEditorStatus,
  };
});
