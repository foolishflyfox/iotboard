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
import { App, EditorEvent, ResizeEvent, KeyEvent, PointerEvent, LayoutEvent } from 'leafer-editor';
import { FoxRuler as Ruler } from '@fox-plugin/ruler';
import { DotMatrix } from 'leafer-x-dot-matrix';
import '@leafer-in/view';
import { useMimicWorkspaceStatus } from '@/views/mimic/stores';
import {
  selectHandler,
  keyHolderHandler,
  resizeHandler,
  appMouseTapHandler,
  appMouseDoubleTapHandler,
  appMouseMoveHandler,
  leaveWorkspaceHandler,
} from '@mimic/event-handler';
import { rulerTheme } from '@mimic/constant';
import { mimicVar } from '@mimic/global';
import { getUniqueId } from '@/utils';
import ContextMenu from './ContextMenu.vue';
import { useDropZone } from '@vueuse/core';
import * as _ from 'lodash-es';
import loadjs from 'loadjs';
import { getElementClassByTag, registerUiClass } from '@mimic/custom/registrar';
import { mimicFileApi } from '@/service/api';
import { HTMLText } from '@leafer-in/html';

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

async function onDisplayEditorDrop(e: MouseEvent) {
  if (!mimicVar.displayEditor.draggingTag) return;
  if (mimicVar.displayEditor.draggingType === 'component') {
    console.log(`将组件 ${mimicVar.displayEditor.draggingTag} 拖放到图纸`);
    const componentClass = await registerUiClass(mimicVar.displayEditor.draggingTag);
    const newComponent = new componentClass({
      ...mimicVar.displayEditor.app?.getPagePointByClient(e),
      draggable: true,
      editable: true,
    });
    if (_.isEmpty(newComponent.id)) {
      newComponent.id = getUniqueId();
    }
    mimicVar.displayEditor.app?.tree.add(newComponent);
  } else if (mimicVar.displayEditor.draggingType === 'element') {
    const elementClass = getElementClassByTag(mimicVar.displayEditor.draggingTag);
    const newElement = new elementClass({
      ...mimicVar.displayEditor.app?.getPagePointByClient(e),
      draggable: true,
      editable: true,
    });
    mimicVar.displayEditor.app?.tree.add(newElement);
  } else if (mimicVar.displayEditor.draggingType === 'asset') {
    if (mimicVar.displayEditor.draggingTag.endsWith('.svg')) {
      const elementClass = getElementClassByTag('element:svg');
      const newElement = new elementClass({
        ...mimicVar.displayEditor.app?.getPagePointByClient(e),
        url: mimicVar.displayEditor.draggingTag,
        draggable: true,
        editable: true,
      });
      mimicVar.displayEditor.app?.tree.add(newElement);
    } else {
      const elementClass = getElementClassByTag('element:img');
      const newElement = new elementClass({
        url: mimicVar.displayEditor.draggingTag,
        ...mimicVar.displayEditor.app?.getPagePointByClient(e),
        draggable: true,
        editable: true,
      });
      mimicVar.displayEditor.app?.tree.add(newElement);
    }
  }
}

async function handleSaveShortcut(e: KeyboardEvent) {
  /** 处理图纸保存事件 */
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    const displayData = mimicVar.displayEditor.generateDisplayData();
    if (
      displayData
      && mimicWorkspaceStatus.currentTarget?.editorType === 'display'
      && mimicWorkspaceStatus.currentTarget?.path
    ) {
      await mimicFileApi.saveDisplay(mimicWorkspaceStatus.currentTarget.path, displayData);
      window.$message?.success(`文件 ${mimicWorkspaceStatus.currentTarget.path} 保存成功`);
      mimicWorkspaceStatus.setCurrentDisplaySaved();
    }
  }
}

let app: App | undefined;
onMounted(() => {
  app = new App({
    view: 'mimicCanvasContainer',
    ground: {},
    tree: { usePartRender: true },
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
  mimicVar.displayEditor.app = app;
  app.tree.on(ResizeEvent.RESIZE, resizeHandler);
  app.tree.on(LayoutEvent.AFTER, () => {
    app!.sky.setTransform({ ...app!.tree.localTransform });
  });
  app.on(PointerEvent.TAP, appMouseTapHandler);
  app.on(PointerEvent.MOVE, appMouseMoveHandler);
  app.on(PointerEvent.DOUBLE_TAP, appMouseDoubleTapHandler);
  app.editor.on(EditorEvent.SELECT, selectHandler);
  app.on(KeyEvent.HOLD, keyHolderHandler);
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

  watch(
    () => mimicWorkspaceStatus.currentTarget,
    (nv) => {
      // console.log('处理图纸', nv);
      // mimicVar.displayEditor.loadDisplayData()
      if (nv) {
        mimicVar.displayEditor.loadOpenedDisplay(nv);
      }
    },
    {
      immediate: true,
    },
  );
  window.addEventListener('keydown', handleSaveShortcut);
  // const image = new Image({ url: '/data/component/基础/gauge.png', draggable: true });
  // app.tree.add(image);
});

onUnmounted(() => {
  if (app) {
    app.tree.off(ResizeEvent.RESIZE, resizeHandler);
    app.off(PointerEvent.TAP, appMouseTapHandler);
    app.off(PointerEvent.MOVE, appMouseMoveHandler);
    app.off(PointerEvent.DOUBLE_CLICK, appMouseDoubleTapHandler);
    app.editor.off(EditorEvent.SELECT, selectHandler);
    app.off(KeyEvent.HOLD, keyHolderHandler);
    app.clear();
    displayEditorWorkspace.value?.removeEventListener('mouseleave', leaveWorkspaceHandler);
    app = undefined;
  }
  window.removeEventListener('keydown', handleSaveShortcut);
});
</script>

<style scoped></style>
