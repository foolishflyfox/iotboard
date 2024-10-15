<template>
  <div
    class="h-full bg-pink-100"
    :style="{ width: `${rightPanelWidth}px` }"
  ></div>
</template>

<script setup lang="ts">
import { rightPanelWidth } from '@/views/mimic/settings';

defineOptions({
  name: 'MimicRightPanel',
});
</script>

<style scoped></style>
