<template>
  <div
    class="flex-1"
    id="mimicComponentEditor"
    ref="componentEditorWorkspace"
    @contextmenu="contextMenuRef?.onContextMenuClick"
    @drop="onComponentEditorDrop"
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

const componentEditorWorkspace = ref<HTMLElement>();
useDropZone(componentEditorWorkspace);
const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const mimicComponentStatus = useMimicComponentStatus();

const { rulerVisible } = toRefs(mimicWorkspaceStatus);
const { selectedUiIds } = toRefs(mimicComponentStatus);
function selectHandler(event: EditorEvent) {
  selectedUiIds.value = convertToArray(event.value).map(e => e.id!);
}

const contextMenuRef = ref<InstanceType<typeof ContextMenu>>();

onMounted(() => {
  const app = new App({
    view: 'mimicComponentEditor',
    tree: { usePartRender: true },
    editor: {},
  });
  // todo: 必须设置 app.tree.zIndex = 0，否则伸缩左边栏时不能复原
  app.tree.zIndex = 0;
  mimicVar.componentEditor.app = app;
  app.tree.on(ResizeEvent.RESIZE, () => componentEditorUtils.viewAutoFit());
  app.editor.on(EditorEvent.SELECT, selectHandler);
  const ruler = new Ruler(app);
  watchEffect(() => {
    ruler.enabled = rulerVisible.value;
  });
  ruler.addTheme('custom1', rulerTheme);
  ruler.changeTheme('custom1');
});

function onComponentEditorDrop(e: MouseEvent) {
  const { draggingTag, app } = mimicVar.componentEditor;
  // console.log('drop: ', mimicVar.componentEditor.draggingTag);
  if (draggingTag && app) {
    const uiClass = mimicVar.componentEditor.getUiClass(draggingTag);
    const newElement = new uiClass({
      ...app.getPagePointByClient(e),
      draggable: true,
      editable: true,
    });
    app.tree.add(newElement);
  }
}
</script>

<style scoped></style>
