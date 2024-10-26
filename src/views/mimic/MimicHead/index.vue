<template>
  <div
    :style="{ height: `${head.height}px` }"
    class="bg-[#ececec] flex-y-center justify-between px-5px b-b b-b-[#ddd]"
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
