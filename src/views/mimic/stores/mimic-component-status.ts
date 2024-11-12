import type { ComponentType } from '@mimic/types';

export const useMimicComponentStatus = defineStore('mimic-component-status', () => {
  const selectedUiIds = ref<string[]>([]);
  // 编辑组件时的组件类型
  const editComponentType: ComponentType = 'code';
  return { selectedUiIds, editComponentType };
});
