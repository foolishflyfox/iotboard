import type { DrawingTool, OpenedTarget } from '@mimic/types';
import * as _ from 'lodash-es';
import { mimicVar } from '@mimic/global';
import { mimicFileApi } from '@/service/api';
import { componentPathToTag } from '../utils';
import type { IPointData } from 'leafer-ui';

export const useMimicWorkspaceStatus = defineStore('mimic-workspace-status', () => {
  // 工作区标尺是否可见
  const rulerVisible = ref(true);
  // 工作区点阵是否可见
  const dotMatrixVisible = ref(true);
  const cursorPos: Ref<IPointData | undefined> = ref();
  // 选中的绘制工具
  const drawingTool = ref<DrawingTool>('cursor');
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
  async function setCurrentTaget(target: OpenedTarget) {
    if (currentTarget.value?.editorType === 'display') {
      // 将原有图纸数据保存在内存中
      const data = mimicVar.displayEditor.generateDisplayData();
      if (data) {
        mimicVar.displayEditor.setDisplayData(
          currentTarget.value,
          data
        );
      }
    }
    currentTarget.value = target;
    if (currentTarget.value?.editorType === 'display') {
      // 保存
      let displayData = mimicVar.displayEditor.getDisplayData(currentTarget.value!);
      if (!displayData) {
        displayData = await mimicFileApi.openDisplay(currentTarget.value?.path);
        mimicVar.displayEditor.setDisplayData(currentTarget.value!, displayData);
      }
      mimicVar.displayEditor.loadDisplayData(displayData);
    } else if (currentTarget.value?.editorType === 'component') {
      const tag = componentPathToTag(currentTarget.value.path);
      mimicVar.componentEditor.loadComponent(tag);
    }
  }
  async function selectDrawingTool(tool: DrawingTool) {
    drawingTool.value = tool;
  }

  return {
    rulerVisible,
    dotMatrixVisible,
    cursorPos,
    curEditorType,
    openedTargets,
    addOpenedTarget,
    currentTarget,
    setCurrentTaget,
    closeOpenedTarget,
    drawingTool,
    selectDrawingTool,
  };
});
