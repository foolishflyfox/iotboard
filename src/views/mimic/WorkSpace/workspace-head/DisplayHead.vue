<template>
  <div class="flex">
    <div
      v-for="name of mimicDisplayNames"
      class="bg-[#b0b0b0] fw-600 text-16px mx-5px px-8px rounded-t-lg"
    >
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMimicDisplayStatus } from '@mimic/stores';
import path from 'path-browserify';

const mimicDisplayStatus = useMimicDisplayStatus();
const mimicDisplayNames = computed(() => {
  return mimicDisplayStatus.openedDisplays.map(e => path.basename(e));
});
</script>

<style scoped></style>
