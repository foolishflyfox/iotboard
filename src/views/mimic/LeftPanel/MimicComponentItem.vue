<template>
  <div class="inline-block bg-[#fff8] rounded-lg">
    <NImage
      :src="`${componentPath}/${customMeta.name}.png`"
      preview-disabled
      :width="55"
      class="cursor-grab p-4px"
      :fallback-src="`${componentPath}/default.png`"
    />
    <div class="text-12px text-[#555] font-medium text-center cursor-default">
      {{ customMeta.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CustomMeta } from '../utils';

defineProps<{
  customMeta: CustomMeta;
}>();

const componentPath = '/preview/component';
</script>

<style scoped></style>
