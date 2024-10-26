<template>
  <div>{{ customMeta.label }}</div>
</template>

<script setup lang="ts">
import type { CustomMeta } from '../utils';

defineProps<{
  customMeta: CustomMeta;
}>();
</script>

<style scoped></style>
