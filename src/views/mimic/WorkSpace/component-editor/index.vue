<template>
  <div
    class="flex-1"
    id="mimicComponentEditor"
    ref="componentEditorWorkspace"
    @drop="onComponentEditorDrop"
  />
</template>

<script setup lang="ts">
import { useDropZone } from '@vueuse/core';
import { App, ResizeEvent, UICreator } from 'leafer-ui';
import { mimicVar } from '@mimic/global';
import { componentEditorUtils } from '@mimic/utils';
import { Ruler } from 'leafer-x-ruler';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { rulerTheme } from '@mimic/constant';
import { registerElement } from '@mimic/custom/registrar';

const componentEditorWorkspace = ref<HTMLElement>();
useDropZone(componentEditorWorkspace);
const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const { rulerVisible } = toRefs(mimicWorkspaceStatus);

onMounted(() => {
  const app = new App({
    view: 'mimicComponentEditor',
    tree: { usePartRender: true },
    editor: {},
  });
  mimicVar.componentEditor.app = app;
  app.tree.on(ResizeEvent.RESIZE, componentEditorUtils.viewAutoFit);
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
    if (!UICreator.list[draggingTag]) {
      // 需要注册自定义组件
      console.log('注册元素 ', draggingTag);
      registerElement(draggingTag);
    }
    const elementClass = UICreator.list[draggingTag];
    const newElement = new elementClass({
      ...app.getPagePointByClient(e),
      draggable: true,
      editable: true,
    });
    app.tree.add(newElement);
  }
}
</script>

<style scoped></style>
