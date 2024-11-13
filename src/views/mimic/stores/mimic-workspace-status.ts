import type { EditorType, OpenedTarget } from '@mimic/types';

export const useMimicWorkspaceStatus = defineStore('mimic-workspace-status', () => {
  // 工作区标尺是否可见
  const rulerVisible = ref(true);
  // 当前编辑类型
  const curEditorType = ref<EditorType>();
  // 已经打开的对象列表
  const openedTargets = ref<OpenedTarget[]>([]);
  const addOpenedTarget = (openedTarget: OpenedTarget) => openedTargets.value.push(openedTarget);

  return {
    rulerVisible,
    curEditorType,
    openedTargets,
    addOpenedTarget,
  };
});
