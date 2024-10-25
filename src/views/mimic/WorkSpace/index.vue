<template>
  <div class="bg-gray-300 flex-col z-1">
    <MimicWorkSpaceHead />
    <CanvasContainer class="flex-1" />
  </div>
</template>

<script setup lang="ts">
import MimicWorkSpaceHead from './MimicWorkSpaceHead.vue';
import CanvasContainer from './canvas-container/index.vue';

defineOptions({
  name: 'MimicWorkSpace',
});
</script>

<style scoped></style>
