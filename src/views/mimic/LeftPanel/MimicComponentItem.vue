<template>
  <div class="inline-block bg-[#fff8] rounded-lg">
    <NImage
      :src="`/preview/component/${customMeta.name}.png`"
      preview-disabled
      :width="60"
      class="cursor-grab"
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
</script>

<style scoped></style>
