<template>
  <div class="bg-gray-300 flex-col z-1">
    <MimicWorkSpaceHead />
    <CanvasContainer v-if="mimicWorkspaceStatus.curEditorType === 'display'" />
    <ModuleEditor v-else-if="mimicWorkspaceStatus.curEditorType === 'module'" />
    <ComponentEditor v-else-if="mimicWorkspaceStatus.curEditorType === 'component'" />
    <div v-else class="bg-white h-full" />
  </div>
</template>

<script setup lang="ts">
import { useMimicWorkspaceStatus } from '@mimic/stores';
import MimicWorkSpaceHead from './workspace-head/index.vue';
import CanvasContainer from './canvas-container/index.vue';
import ModuleEditor from './module-editor/index.vue';
import ComponentEditor from './component-editor/index.vue';

defineOptions({
  name: 'MimicWorkSpace',
});

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
</script>

<style scoped></style>
