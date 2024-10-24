<template>
  <div class="h-full" :style="{ width: `${rightPanelWidth}px` }">
    <PropertyPanel />
  </div>
</template>

<script setup lang="ts">
import { rightPanelWidth } from '@/views/mimic/settings';
import PropertyPanel from './PropertyPanel/index.vue';

defineOptions({
  name: 'MimicRightPanel',
});
</script>

<style scoped></style>
