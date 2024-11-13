import type { EditorType, OpenedTarget } from '@mimic/types';
import * as _ from 'lodash-es';

export const useMimicWorkspaceStatus = defineStore('mimic-workspace-status', () => {
  // 工作区标尺是否可见
  const rulerVisible = ref(true);
  // 当前编辑类型
  const curEditorType = ref<EditorType>();
  // 已经打开的对象列表
  const openedTargets = ref<OpenedTarget[]>([]);
  const currentTarget = ref<OpenedTarget>();
  const addOpenedTarget = (openedTarget: OpenedTarget) => {
    const existedTarget = _.find(openedTargets.value, e => _.isEqual(e, openedTarget));
    if (existedTarget) {
      setCurrentTaget(existedTarget);
    } else {
      openedTargets.value.push(openedTarget);
      currentTarget.value = openedTarget;
    }
  };
  const closeOpenedTarget = (openedTarget: OpenedTarget) => {
    if (openedTarget === currentTarget.value) {
      let newTargetIndex = _.indexOf(openedTargets.value, openedTarget) + 1;
      if (newTargetIndex >= openedTargets.value.length) newTargetIndex -= 2;
      if (newTargetIndex < 0) {
        currentTarget.value = undefined;
      } else {
        currentTarget.value = openedTargets.value[newTargetIndex];
      }
    }
    _.pull(openedTargets.value, openedTarget);
  };
  const setCurrentTaget = (target: OpenedTarget) => (currentTarget.value = target);

  return {
    rulerVisible,
    curEditorType,
    openedTargets,
    addOpenedTarget,
    currentTarget,
    setCurrentTaget,
    closeOpenedTarget,
  };
});
