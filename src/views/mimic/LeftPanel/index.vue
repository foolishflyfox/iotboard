<template>
  <div
    class="h-full bg-orange-200 flex-col"
    :style="{ width: `${leftPanel.width}px` }"
  >
    <mimic-left-panel-head />
    <div class="bg-pink-100 flex-1 flex">
      <ResourceTab />
      <ResourceContent class="flex-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MimicLeftPanelHead from './MimicLeftPanelHead.vue';
import ResourceTab from './ResourceTab.vue';
import ResourceContent from './ResourceContent.vue';
import { leftPanel } from '@/views/mimic/settings';

defineOptions({
  name: 'MimicLeftPanel',
});
</script>

<style scoped></style>
