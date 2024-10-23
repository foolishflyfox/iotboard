import type { IUI } from 'leafer-ui';

export const useMimicWorkspaceStatus = defineStore(
  'mimic-workspace-status',
  () => {
    // 工作区标尺是否可见
    const rulerVisible = ref(true);
    // 当前选中的 UI
    const selectedUI = shallowRef<null | IUI | IUI[]>(null);

    return { rulerVisible, selectedUI };
  },
);
