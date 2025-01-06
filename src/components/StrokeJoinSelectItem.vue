<template>
  <div class="flex">
    <svg height="20" width="40">
      <polyline
        points="40,0 10,10 40,20"
        :stroke
        :stroke-width
        :stroke-linejoin="type"
        fill="none"
      />
    </svg>
    <span class="ml-1em text-14px"> {{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import type { IStrokeJoin } from 'leafer-editor';

defineProps<{
  type: IStrokeJoin;
  label: string;
}>();

const strokeWidth = 8;
const stroke = 'black';
</script>

<style scoped></style>
