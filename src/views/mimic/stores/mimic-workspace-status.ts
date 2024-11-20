import type { EditorType, OpenedTarget } from '@mimic/types';
import * as _ from 'lodash-es';
import { mimicVar } from '@mimic/global';
import { mimicFileApi } from '@/service/api';
import { registerUiClass } from '@mimic/custom/registrar';
import { removeExtention } from '@/utils';
import { componentPathToTag } from '../utils';

export const useMimicWorkspaceStatus = defineStore('mimic-workspace-status', () => {
  // 工作区标尺是否可见
  const rulerVisible = ref(true);
  // 已经打开的对象列表
  const openedTargets = ref<OpenedTarget[]>([]);
  const currentTarget = ref<OpenedTarget>();
  const curEditorType = computed(() => currentTarget.value?.editorType);
  const addOpenedTarget = async (openedTarget: OpenedTarget) => {
    const existedTarget = _.find(openedTargets.value, e => _.isEqual(e, openedTarget));
    if (existedTarget) {
      setCurrentTaget(existedTarget);
    } else {
      openedTargets.value.push(openedTarget);
      setCurrentTaget(openedTarget);
    }
    if (currentTarget.value?.editorType === 'display') {
      let displayData = mimicVar.displayEditor.getDisplayData(currentTarget.value!);
      if (!displayData) {
        displayData = await mimicFileApi.openDisplay(currentTarget.value?.path!);
        mimicVar.displayEditor.setDisplayData(currentTarget.value!, displayData);
      }
      mimicVar.displayEditor.loadDisplayData(displayData);
    } else if (currentTarget.value?.editorType === 'component') {
      console.log(`todo: 添加组件 ${currentTarget.value.path} 处理的逻辑`);
      const tag = componentPathToTag(currentTarget.value.path);
      mimicVar.componentEditor.loadComponent(tag);
    }
  };
  const closeOpenedTarget = (openedTarget: OpenedTarget) => {
    if (_.isEqual(openedTarget, currentTarget.value)) {
      let newTargetIndex = _.findIndex(openedTargets.value, e => _.isEqual(e, openedTarget)) + 1;
      if (newTargetIndex >= openedTargets.value.length) newTargetIndex -= 2;
      if (newTargetIndex < 0) {
        currentTarget.value = undefined;
      } else {
        currentTarget.value = openedTargets.value[newTargetIndex];
      }
    }
    _.remove(openedTargets.value, e => _.isEqual(e, openedTarget));
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
