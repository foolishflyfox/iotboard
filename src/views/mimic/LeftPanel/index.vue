<template>
  <div
    class="h-full bg-orange-200"
    :style="{ width: `${leftPanelWidth}px` }"
  ></div>
</template>

<script setup lang="ts">
import { leftPanelWidth } from '@/views/mimic/settings';

defineOptions({
  name: 'MimicLeftPanel',
});
</script>

<style scoped></style>
