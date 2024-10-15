<template>
  <div
    :style="{ height: `${headHeight}px` }"
    class="bg-[#ececec] flex-y-center"
  >
    Editor Head
  </div>
</template>

<script setup lang="ts">
import { headHeight } from '@/views/mimic/settings';

defineOptions({
  name: 'MimicHead',
});
</script>

<style scoped></style>
