<template>
  <div class="inline-block bg-[#fff8] rounded-lg">{{ tag }}: {{ label }}</div>
</template>

<script setup lang="ts">
import type { CustomDragIcon } from '@mimic/types';

interface ElementItemProp extends CustomDragIcon {}
defineProps<ElementItemProp>();
</script>

<style scoped></style>
