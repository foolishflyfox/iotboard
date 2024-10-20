export const useMimicWorkspaceStatus = defineStore(
  'mimic-workspace-status',
  () => {
    const rulerVisible = ref(true);

    return { rulerVisible };
  },
);
