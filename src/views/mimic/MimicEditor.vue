<template>
  <main class="bg-[#f7f7f7] h-full flex-col">
    <MimicHead />
    <div class="flex-1 flex">
      <LeftPanel />
      <WorkSpace class="flex-1" />
      <RightPanel />
    </div>
  </main>
</template>

<script setup lang="ts">
import MimicHead from './MimicHead/index.vue';
import LeftPanel from './LeftPanel/index.vue';
import RightPanel from './RightPanel/index.vue';
import WorkSpace from './WorkSpace/index.vue';
</script>
