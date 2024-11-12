<template>
  <div class="flex">
    <div
      v-for="name of mimicDisplayNames"
      class="bg-[#b0b0b0] fw-500 text-16px mx-5px px-8px rounded-t-lg flex-y-center"
    >
      <span class="mr-3px cursor-default">
        {{ name }}
      </span>
      <n-icon size="16" color="#fd4a4e" class="cursor-pointer">
        <CloseFilled />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMimicDisplayStatus } from '@mimic/stores';
import path from 'path-browserify';
import { CloseFilled } from '@vicons/carbon';
import { NIcon } from 'naive-ui';

const mimicDisplayStatus = useMimicDisplayStatus();
const mimicDisplayNames = computed(() => {
  return mimicDisplayStatus.openedDisplays.map(e => path.basename(e));
});
</script>

<style scoped></style>
