<template>
  <div class="bg-pink-200 flex-1" id="mimicModuleEditor" ref="moduleEditorWorkspace">
    模块编辑区
  </div>
</template>

<script setup lang="ts">
import { useDropZone } from '@vueuse/core';

const moduleEditorWorkspace = ref<HTMLElement>();
useDropZone(moduleEditorWorkspace);
</script>

<style scoped></style>
