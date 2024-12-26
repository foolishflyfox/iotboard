import type { DrawingTool, OpenedTarget } from '@mimic/types';
import * as _ from 'lodash-es';
import { mimicVar, BaselineManager } from '@mimic/global';
import { mimicFileApi } from '@/service/api';
import { componentPathToTag } from '@mimic/utils';
import type { IPointData } from 'leafer-ui';
import { useMimicDisplayStatus } from './mimic-display-status';
import { displayBaseMapId } from '@mimic/constant';

export const useMimicWorkspaceStatus = defineStore('mimic-workspace-status', () => {
  const mimicDisplayStatus = useMimicDisplayStatus();
  // 工作区标尺是否可见
  const rulerVisible = ref(true);
  // 工作区点阵是否可见
  const dotMatrixVisible = ref(true);
  // 鼠标在图纸中的位置信息
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
      if (currentTarget.value?.editorType === 'display') {
        mimicVar.baselineManagerContainer.removeBaselineManager(currentTarget.value.path);
        mimicVar.actionManagerContainer.removeActionManager(currentTarget.value.path);
        mimicVar.displayEditor.delDisplayData(currentTarget.value);
      }
      if (newTargetIndex < 0) {
        currentTarget.value = undefined;
      } else {
        setCurrentTaget(openedTargets.value[newTargetIndex]);
      }
    }
    _.remove(openedTargets.value, e => _.isEqual(e, openedTarget));
  };
  async function setCurrentTaget(target: OpenedTarget) {
    if (currentTarget.value?.editorType === 'display') {
      // 取消选中的元素
      mimicVar.displayEditor.app?.editor.cancel();
      // 将原有图纸数据保存在内存中
      const data = mimicVar.displayEditor.generateDisplayData();
      if (data) {
        mimicVar.displayEditor.setDisplayData(
          currentTarget.value,
          data
        );
      }
      mimicVar.baselineManagerContainer.getBaselineManager()?.hideAllBaselines();
    }
    currentTarget.value = target;
    if (currentTarget.value?.editorType === 'display') {
      let displayData = mimicVar.displayEditor.getDisplayData(currentTarget.value!);
      if (!displayData) {
        // 打开新的图纸
        displayData = await mimicFileApi.openDisplay(currentTarget.value?.path);
        mimicVar.displayEditor.setDisplayData(currentTarget.value!, displayData);
        mimicVar.baselineManagerContainer.addBaselineManager(currentTarget.value.path);
        mimicVar.actionManagerContainer.addActionManager(currentTarget.value.path);
      }
      mimicVar.displayEditor.loadDisplayData(displayData);
      mimicVar.baselineManagerContainer.getBaselineManager()?.showAllBaselines();
      nextTick(() => {
        mimicDisplayStatus.selectedUiId = displayBaseMapId;
      });
    } else if (currentTarget.value?.editorType === 'component') {
      const tag = componentPathToTag(currentTarget.value.path);
      mimicVar.componentEditor.loadComponent(tag);
    }
  }
  async function selectDrawingTool(tool: DrawingTool) {
    drawingTool.value = tool;
  }

  // 没保存的图纸
  const unsavedDisplayPaths = ref<Set<string>>(new Set());
  function setCurrentDisplayUnsave() {
    if (currentTarget.value?.path) {
      unsavedDisplayPaths.value.add(currentTarget.value.path);
    }
  }
  function setCurrentDisplaySaved() {
    if (currentTarget.value?.path) {
      unsavedDisplayPaths.value.delete(currentTarget.value.path);
    }
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
    unsavedDisplayPaths,
    setCurrentDisplaySaved,
    setCurrentDisplayUnsave
  };
});
