import type { DrawingTool, OpenedTarget } from '@mimic/types';
import * as _ from 'lodash-es';
import { mimicVar } from '@mimic/global';
import { mimicFileApi } from '@/service/api';
import { componentPathToTag } from '@mimic/utils';
import type { IPointData } from 'leafer-editor';
import { useMimicDisplayStatus } from './mimic-display-status';
import { displayBaseMapId } from '@mimic/constant';

let mimicWorkspaceStatus: ReturnType<typeof useMimicWorkspaceStatus>;
export function lazyGetMimicWorkspaceStatus() {
  if (!mimicWorkspaceStatus) {
    mimicWorkspaceStatus = useMimicWorkspaceStatus();
  }
  return mimicWorkspaceStatus;
}

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
      setCurrentTarget(existedTarget);
    } else {
      openedTargets.value.push(openedTarget);
      setCurrentTarget(openedTarget);
    }
  };
  const closeOpenedTarget = (openedTarget: OpenedTarget) => {
    if (_.isEqual(openedTarget, currentTarget.value)) {
      let newTargetIndex = _.findIndex(openedTargets.value, e => _.isEqual(e, openedTarget)) + 1;
      if (newTargetIndex >= openedTargets.value.length) newTargetIndex -= 2;
      if (currentTarget.value?.editorType === 'display') {
        mimicVar.baselineManagerContainer.removeManager(currentTarget.value);
        mimicVar.actionManagerContainer.removeManager(currentTarget.value);
        mimicVar.canvasEditor.delDisplayData(currentTarget.value);
      }
      if (newTargetIndex < 0) {
        currentTarget.value = undefined;
      } else {
        setCurrentTarget(openedTargets.value[newTargetIndex]);
      }
    }
    _.remove(openedTargets.value, e => _.isEqual(e, openedTarget));
  };
  async function setCurrentTarget(target: OpenedTarget) {
    if (currentTarget.value?.editorType === 'display') {
      // 取消选中的元素
      mimicVar.canvasEditor.app?.editor.cancel();
      // 将原有图纸数据保存在内存中
      const data = mimicVar.canvasEditor.generateDisplayData();
      if (data) {
        mimicVar.canvasEditor.setDisplayData(
          currentTarget.value,
          data
        );
      }
      mimicVar.baselineManagerContainer.getManager()?.hideAllBaselines();
    } else if (currentTarget.value?.editorType === 'module') {
      mimicVar.canvasEditor.app?.editor.cancel();
      // 将原有模块数据保存在内存中
      const data = mimicVar.canvasEditor.generateModuleData();
      if (data) {
        mimicVar.canvasEditor.setModuleData(
          currentTarget.value,
          data
        );
      }
      mimicVar.baselineManagerContainer.getManager()?.hideAllBaselines();
    }
    currentTarget.value = target;
    if (currentTarget.value?.editorType === 'display') {
      let displayData = mimicVar.canvasEditor.getDisplayData(currentTarget.value!);
      if (!displayData) {
        // 打开新的图纸
        displayData = await mimicFileApi.openDisplay(currentTarget.value?.path);
        mimicVar.canvasEditor.setDisplayData(currentTarget.value!, displayData);
        mimicVar.baselineManagerContainer.addManager(currentTarget.value);
      }
      await mimicVar.canvasEditor.loadDisplayData(displayData);
      mimicVar.actionManagerContainer.switchActionManager(currentTarget.value);
      mimicVar.baselineManagerContainer.getManager()?.showAllBaselines();
      mimicVar.uiLayerManagerContainer.switchUiLayerManager(currentTarget.value);
      nextTick(() => {
        mimicDisplayStatus.selectedUiId = displayBaseMapId;
        mimicVar.uiLayerManagerContainer.getManager()?.update();
      });
    } else if (currentTarget.value?.editorType === 'module') {
      let moduleData = mimicVar.canvasEditor.getModuleData(currentTarget.value);
      if (!moduleData) {
        // 从文件中读取模块数据
        moduleData = await mimicFileApi.openModule(currentTarget.value.path);
        mimicVar.canvasEditor.setModuleData(currentTarget.value, moduleData);
        mimicVar.baselineManagerContainer.addManager(currentTarget.value);
      }
      await mimicVar.canvasEditor.loadModuleData(moduleData);
      mimicVar.actionManagerContainer.switchActionManager(currentTarget.value);
      mimicVar.baselineManagerContainer.getManager()?.showAllBaselines();
      mimicVar.uiLayerManagerContainer.switchUiLayerManager(currentTarget.value);
      nextTick(() => {
        mimicVar.uiLayerManagerContainer.getManager()?.update();
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
  const unsavedCanvasPaths = ref<Set<string>>(new Set());
  function setCurrentDisplayUnsave() {
    if (currentTarget.value?.path) {
      unsavedCanvasPaths.value.add(currentTarget.value.path);
      mimicVar.uiLayerManagerContainer.getManager()?.update();
    }
  }
  function setCurrentCanvasSaved() {
    if (currentTarget.value?.path) {
      unsavedCanvasPaths.value.delete(currentTarget.value.path);
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
    setCurrentTaget: setCurrentTarget,
    closeOpenedTarget,
    drawingTool,
    selectDrawingTool,
    unsavedDisplayPaths: unsavedCanvasPaths,
    setCurrentCanvasSaved,
    setCurrentDisplayUnsave
  };
});
