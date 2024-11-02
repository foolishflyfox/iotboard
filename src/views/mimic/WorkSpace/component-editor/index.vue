<template>
  <div class="flex-1" id="mimicComponentEditor" ref="componentEditorWorkspace">组件编辑</div>
</template>

<script setup lang="ts">
import { useDropZone } from '@vueuse/core';

const componentEditorWorkspace = ref<HTMLElement>();
useDropZone(componentEditorWorkspace);
</script>

<style scoped></style>
