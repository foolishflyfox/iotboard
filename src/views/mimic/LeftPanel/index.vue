<template>
  <div class="h-full bg-orange-200" :style="{ width: `${leftPanelWidth}px` }">
    <mimic-left-panel-head />
  </div>
</template>

<script setup lang="ts">
import MimicLeftPanelHead from './MimicLeftPanelHead.vue';
import { leftPanelWidth } from '@/views/mimic/settings';

defineOptions({
  name: 'MimicLeftPanel',
});
</script>

<style scoped></style>
