<template>
  <div class="flex-1" id="mimicComponentEditor" ref="componentEditorWorkspace">组件编辑</div>
</template>

<script setup lang="ts">
import { useDropZone } from '@vueuse/core';
import { App, ResizeEvent } from 'leafer-ui';
import { mimicVar } from '@mimic/global';
import { componentEditorUtils } from '@mimic/utils';
import { Ruler } from 'leafer-x-ruler';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { rulerTheme } from '@mimic/constant';

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
</script>

<style scoped></style>
