<template>
  <div class="flex-1 bg-gray-300" id="mimicModuleEditor" ref="moduleEditorWorkspace">
    模块编辑区
  </div>
</template>

<script setup lang="ts">
import { useDropZone } from '@vueuse/core';
import { App } from 'leafer-editor';

defineOptions({
  name: 'ModuleEditor',
});
const moduleEditorWorkspace = ref<HTMLElement>();
useDropZone(moduleEditorWorkspace);

let app: App | undefined;
onMounted(() => {
  app = new App({
    view: 'mimicModuleEditor',
    tree: { usePartRender: true, type: 'design' },
    editor: {}
  });
});
</script>

<style scoped></style>
