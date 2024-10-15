<script setup lang="ts">
import MimicHead from './MimicHead/index.vue';
import LeftPanel from './LeftPanel/index.vue';
import RightPanel from './RightPanel/index.vue';
import WorkSpace from './WorkSpace/index.vue';
</script>

<template>
  <main class="bg-[#f7f7f7] h-full flex-col">
    <mimic-head />
    <div class="flex-1 flex">
      <left-panel />
      <work-space class="flex-1" />
      <right-panel />
    </div>
  </main>
</template>
