import { displayBaseMapId } from '@mimic/constant';
import type { EditorType } from '@mimic/types/workspace';

export const useMimicWorkspaceStatus = defineStore('mimic-workspace-status', () => {
  // 工作区标尺是否可见
  const rulerVisible = ref(true);
  // 当前编辑类型
  const curEditorType = ref<EditorType>('component');
  // 图纸编辑器相关
  // 当前选中的 UI
  const selectedUiId = ref<null | undefined | string | string[]>();
  const selectBaseMap = () => (selectedUiId.value = displayBaseMapId);

  // 模块编辑器相关
  const componentEditor = reactive<{
    selectedUiId: null | undefined | string | string[];
  }>({
    selectedUiId: undefined,
  });

  // 组件编辑器相关

  return { rulerVisible, curEditorType, selectedUiId, selectBaseMap, componentEditor };
});
