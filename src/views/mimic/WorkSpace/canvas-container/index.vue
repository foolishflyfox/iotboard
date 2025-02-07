<template>
  <div
    class="flex-1 bg-gray-300"
    id="mimicCanvasContainer"
    ref="displayEditorWorkspace"
    @contextmenu="contextMenuRef?.onContextMenuClick"
    @drop="onDisplayEditorDrop"
  />
  <ContextMenu ref="contextMenuRef" />
</template>

<script setup lang="ts">
import { App, EditorEvent, ResizeEvent, KeyEvent, PointerEvent, LayoutEvent, HTMLText, type IUI, Group } from 'leafer-editor';
import { FoxRuler as Ruler } from '@fox-plugin/ruler';
import { DotMatrix } from 'leafer-x-dot-matrix';
import { useMimicWorkspaceStatus } from '@/views/mimic/stores';
import {
  selectHandler,
  keyDownHandler,
  resizeHandler,
  appMouseTapHandler,
  appMouseDoubleTapHandler,
  appMouseMoveHandler,
  leaveWorkspaceHandler,
  layoutAfterHandler,
  appMouseUpHandler,
  appMouseDownHandler,
} from '@mimic/event-handler';
import { rulerTheme } from '@mimic/constant';
import { mimicVar } from '@mimic/global';
import { getUniqueId, removeExtention } from '@/utils';
import ContextMenu from './ContextMenu.vue';
import { useDropZone } from '@vueuse/core';
import * as _ from 'lodash-es';
import loadjs from 'loadjs';
import { getElementClassByTag, registerUiClass } from '@mimic/custom/registrar';
import { mimicFileApi } from '@/service/api';
import { mimicDisplayTreeExpose } from '@mimic/LeftPanel/mimic-display-tree/expose';
import { keyboardKeys } from '@/constant';
import { mimicModuleTreeExpose } from '@mimic/LeftPanel/mimic-module-tree/expose';
import type { OpenedTarget } from '@mimic/types';

// loadScript();

defineOptions({
  name: 'CanvasContainer',
});

function loadScript() {
  loadjs('/mytest.js', {
    success: () => {
      console.log('script load success');
      (window as any).foo({ x: 666, getUniqueId });
    },
    error: () => {
      console.log('script load fail');
    },
  });
}

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const { rulerVisible, dotMatrixVisible } = toRefs(mimicWorkspaceStatus);

const contextMenuRef = ref<InstanceType<typeof ContextMenu>>();

const displayEditorWorkspace = ref<HTMLElement>();

useDropZone(displayEditorWorkspace);

async function createUi(draggingType: string, draggingTag: string, data?: any) {
  // console.log('createUi:', draggingType, draggingTag);
  let ui: IUI | undefined;
  if (draggingType === 'component') {
    const componentClass = await registerUiClass(draggingTag);
    ui = new componentClass({ ...data });
  } else if (draggingType === 'module') {
    const moduleTarget: OpenedTarget = {
      editorType: 'module',
      path: `${draggingTag}.json`,
    };
    let moduleData = mimicVar.canvasEditor.getModuleData(moduleTarget);
    if (!moduleData) {
      moduleData = await mimicFileApi.openModule(moduleTarget.path);
    }
    console.log('moduleTarget 结果', moduleData);
    const children: IUI[] = [];

    for (const childData of moduleData.children || []) {
      let childType: string | undefined;
      let childTag: string | undefined = childData.tag;
      if (childData.tag) {
        if (childData.tag.startsWith('component/')) {
          childType = 'component';
        } else if (childData.tag === 'element:img') {
          childType = 'asset';
          childTag = childData.url;
        } else if (childData.tag === 'element:svg') {
          childType = 'asset';
          childTag = childData.url;
        } else if (childData.tag.startsWith('element:')) {
          childType = 'element';
        }
      }
      if (childType && childTag) {
        console.log('childeType/tag', childType, childData.tag);
        const ui = await createUi(
          childType,
          childTag,
          { ...childData, x: childData.x || 0, y: childData.y || 0 },
        );
        if (ui) {
          children.push(ui);
        }
      }
    }
    const elementClass = getElementClassByTag('element:module');
    const moduleUi = new elementClass({ ...data, children }) as Group;
    ui = moduleUi;
  } else if (draggingType === 'element') {
    const elementClass = getElementClassByTag(draggingTag);
    ui = new elementClass({ ...data });
  } else if (draggingType === 'asset') {
    if (draggingTag.endsWith('.svg')) {
      const elementClass = getElementClassByTag('element:svg');
      ui = new elementClass({
        ...data,
        url: draggingTag,
      });
    } else {
      const elementClass = getElementClassByTag('element:img');
      ui = new elementClass({
        ...data,
        url: draggingTag,
      });
    }
  }
  if (ui) {
    ui.draggable = true;
    ui.editable = true;
    if (_.isEmpty(ui.id)) {
      ui.id = getUniqueId();
    }
  }
  return ui;
}

async function onDisplayEditorDrop(e: MouseEvent) {
  if (!mimicVar.canvasEditor.draggingTag) return;
  console.log('draggingType =', mimicVar.canvasEditor.draggingType, mimicVar.canvasEditor.draggingTag);
  const ui = await createUi(
    mimicVar.canvasEditor.draggingType!,
    mimicVar.canvasEditor.draggingTag,
    mimicVar.canvasEditor.app?.getPagePointByClient(e),
  );
  if (ui) {
    mimicVar.canvasEditor.app?.tree.add(ui);
    mimicWorkspaceStatus.setCurrentDisplayUnsave();
  }
}

async function handleSaveShortcut(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === keyboardKeys.S) {
    /** 处理图纸保存事件 */
    e.preventDefault();
    if (mimicWorkspaceStatus.currentTarget?.editorType === 'display') {
      const displayData = mimicVar.canvasEditor.generateDisplayData();
      if (displayData && mimicWorkspaceStatus.currentTarget?.path) {
        await mimicFileApi.saveDisplay(mimicWorkspaceStatus.currentTarget.path, displayData);
        const blob = (await mimicVar.canvasEditor.app?.tree.export('png', { blob: true }))?.data;
        if (blob) {
          const pngPath = `${removeExtention(mimicWorkspaceStatus.currentTarget.path)}.png`;
          await mimicFileApi.uploadPreviewPng('display', pngPath, blob);
        }
        window.$message?.success(`图纸 ${mimicWorkspaceStatus.currentTarget.path} 保存成功`);
        mimicWorkspaceStatus.setCurrentCanvasSaved();
        mimicDisplayTreeExpose.updateDisplayPreview?.(mimicWorkspaceStatus.currentTarget.path);
      }
    } else if (mimicWorkspaceStatus.currentTarget?.editorType === 'module') {
      const moduleData = mimicVar.canvasEditor.generateModuleData();
      if (moduleData && mimicWorkspaceStatus.currentTarget?.path) {
        await mimicFileApi.saveModule(mimicWorkspaceStatus.currentTarget.path, moduleData);
        const blob = (await mimicVar.canvasEditor.app?.tree.export('png', { blob: true }))?.data;
        if (blob) {
          const pngPath = `${removeExtention(mimicWorkspaceStatus.currentTarget.path)}.png`;
          await mimicFileApi.uploadPreviewPng('module', pngPath, blob);
        }
        window.$message?.success(`模块 ${mimicWorkspaceStatus.currentTarget.path} 保存成功`);
        mimicWorkspaceStatus.setCurrentCanvasSaved();
        mimicModuleTreeExpose.updateModulePreview?.(mimicWorkspaceStatus.currentTarget.path);
      }
    }
  } else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key === keyboardKeys.Z) {
    // 处理重做动作
    mimicVar.actionManagerContainer.getManager()?.redo();
  } else if ((e.ctrlKey || e.metaKey) && e.key === keyboardKeys.Z) {
    // 处理撤销动作
    mimicVar.actionManagerContainer.getManager()?.undo();
  } else if ((e.ctrlKey || e.metaKey) && e.key === keyboardKeys.A) {
    e.preventDefault();
    const uiLayers = mimicVar.uiLayerManagerContainer.getCurrentUiLayers();
    const uiIds = new Set<string>();
    uiLayers.value.forEach(e => uiIds.add(e.id));
    const selectedUis: IUI[] = mimicVar.canvasEditor.app?.tree.find((e) => {
      return uiIds.has(e.id || '') ? 1 : 0;
    }) as IUI[];
    mimicVar.canvasEditor.app?.editor.select(selectedUis);
  }
}

let app: App | undefined;
onMounted(() => {
  app = new App({
    view: 'mimicCanvasContainer',
    ground: {},
    // 设置 type 为 design，增加“按住鼠标中键/空格键+拖拽” 平移视图的功能
    // 限制缩放范围为 0.01 ~ 256
    tree: { usePartRender: true, type: 'design' },
    // sky: { type: 'draw', usePartRender: false },
    editor: {
      // circle: {
      //   pointType: 'button',
      //   cursor: 'pointer',
      //   event: {
      //     tap: function () {
      //       alert('button');
      //     },
      //   },
      // }, // 变为自定义按钮
    },
  });
  app.tree.name = 'tree';
  app.tree.zIndex = 0;
  mimicVar.canvasEditor.app = app;
  app.tree.on(ResizeEvent.RESIZE, resizeHandler);
  app.tree.on(LayoutEvent.AFTER, layoutAfterHandler);
  app.on(PointerEvent.TAP, appMouseTapHandler);
  app.on(PointerEvent.DOWN, appMouseDownHandler);
  app.on(PointerEvent.UP, appMouseUpHandler);
  app.on(PointerEvent.MOVE, appMouseMoveHandler);
  app.on(PointerEvent.DOUBLE_TAP, appMouseDoubleTapHandler);
  app.editor.on(EditorEvent.SELECT, selectHandler);
  app.on(KeyEvent.DOWN, keyDownHandler);
  displayEditorWorkspace.value?.addEventListener('mouseleave', leaveWorkspaceHandler);
  const ruler = new Ruler(app);
  app.sky = app.addLeafer({ type: 'draw', usePartRender: false });
  watchEffect(() => {
    ruler.enabled = rulerVisible.value;
  });

  const dotMatrix = new DotMatrix(app, {
    dotColor: '#999',
    dotSize: 2,
  });
  // dotMatrix.enableDotMatrix(true);
  watchEffect(() => {
    dotMatrix.enableDotMatrix(dotMatrixVisible.value);
  });

  // 添加自定义主题
  ruler.addTheme('custom1', rulerTheme);
  // 切换主题
  ruler.changeTheme('custom1');
  const text = new HTMLText({
    // text: '<i style="color: red; font-weight: bold;">Welcome</i> to <i style="color: rgb(50,205,121); font-size: 30px">LeaferJS</i>',
    text: '<input type="checkbox" /> <label for="vehicle1"> I have a bike</label>',
    editable: true,
    draggable: true
  });

  window.addEventListener('keydown', handleSaveShortcut);
});

onUnmounted(() => {
  if (app) {
    app.tree.off(ResizeEvent.RESIZE, resizeHandler);
    app.tree.off(LayoutEvent.AFTER, layoutAfterHandler);
    app.off(PointerEvent.TAP, appMouseTapHandler);
    app.off(PointerEvent.DOWN, appMouseDownHandler);
    app.off(PointerEvent.UP, appMouseUpHandler);
    app.off(PointerEvent.MOVE, appMouseMoveHandler);
    app.off(PointerEvent.DOUBLE_CLICK, appMouseDoubleTapHandler);
    app.editor.off(EditorEvent.SELECT, selectHandler);
    app.off(KeyEvent.DOWN, keyDownHandler);
    app.clear();
    displayEditorWorkspace.value?.removeEventListener('mouseleave', leaveWorkspaceHandler);
    app = undefined;
  }
  window.removeEventListener('keydown', handleSaveShortcut);
});
</script>

<style scoped></style>
