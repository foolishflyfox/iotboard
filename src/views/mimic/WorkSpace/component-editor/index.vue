<template>
  <div
    class="flex-1"
    id="mimicComponentEditor"
    ref="componentEditorWorkspace"
    @contextmenu="contextMenuRef?.onContextMenuClick"
  />
  <ContextMenu ref="contextMenuRef" />
</template>

<script setup lang="ts">
import { useDropZone } from '@vueuse/core';
import { App, ResizeEvent, UI, type IUI } from 'leafer-ui';
import { mimicVar } from '@mimic/global';
import { componentEditorUtils, getUiClassByTag } from '@mimic/utils';
import { Ruler } from 'leafer-x-ruler';
import { useMimicWorkspaceStatus, useMimicComponentStatus } from '@mimic/stores';
import { rulerTheme } from '@mimic/constant';
import { registerElement } from '@mimic/custom/registrar';
import ContextMenu from './ContextMenu.vue';
import { EditorEvent } from 'leafer-editor';
import { convertToArray } from '@/utils';
import { DotMatrix } from 'leafer-x-dot-matrix';

const componentEditorWorkspace = ref<HTMLElement>();
useDropZone(componentEditorWorkspace);
const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const mimicComponentStatus = useMimicComponentStatus();

const { rulerVisible, dotMatrixVisible } = toRefs(mimicWorkspaceStatus);
function selectHandler(event: EditorEvent) {}

const contextMenuRef = ref<InstanceType<typeof ContextMenu>>();

let app: App | undefined = undefined;
onMounted(() => {
  app = new App({
    view: 'mimicComponentEditor',
    tree: { usePartRender: true },
    editor: {},
    type: 'draw',
  });
  // todo: 必须设置 app.tree.zIndex = 0，否则伸缩左边栏时不能复原
  app.tree.zIndex = 0;
  mimicVar.componentEditor.app = app;
  app.tree.on(ResizeEvent.RESIZE, () => mimicVar.componentEditor.viewAutoFit());
  app.editor.on(EditorEvent.SELECT, selectHandler);
  const ruler = new Ruler(app);
  watchEffect(() => {
    ruler.enabled = rulerVisible.value;
  });
  const dotMatrix = new DotMatrix(app, {
    dotColor: '#999',
    dotSize: 2,
  });
  watchEffect(() => {
    dotMatrix.enableDotMatrix(dotMatrixVisible.value);
  });
  ruler.addTheme('custom1', rulerTheme);
  ruler.changeTheme('custom1');
});
onUnmounted(() => {
  if (app) {
    app.clear();
    app = undefined;
  }
});

// todo: 将下面的逻辑移动到模块拖动中
// function onComponentEditorDrop(e: MouseEvent) {
//   const { draggingTag, app } = mimicVar.componentEditor;
//   // console.log('drop: ', mimicVar.componentEditor.draggingTag);
//   if (draggingTag && app) {
//     if (!getUiClassByTag(draggingTag)) {
//       registerElement(draggingTag);
//     }
//     const elementUiClass: typeof UI = getUiClassByTag(draggingTag);
//     const newElement = new elementUiClass({
//       ...app.getPagePointByClient(e),
//       draggable: true,
//       editable: true,
//     });
//     app.tree.add(newElement);
//   }
// }
</script>

<style scoped></style>
