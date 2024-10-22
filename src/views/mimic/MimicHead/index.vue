<template>
  <div
    :style="{ height: `${head.height}px` }"
    class="bg-[#ececec] flex-y-center justify-between mx-5px"
  >
    <HeadOperators />
    <HeadTools />
  </div>
</template>

<script setup lang="ts">
import { head } from '@/views/mimic/settings';
import HeadOperators from './operators/index.vue';
import HeadTools from './tools/index.vue';

defineOptions({
  name: 'MimicHead',
});
</script>

<style scoped></style>
