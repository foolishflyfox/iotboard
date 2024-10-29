<template>
  <PropertyContainer :label="label" @keydown.stop>
    <n-input-number v-model:value="value" size="small" />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { PropertyContainer } from './containers';

withDefaults(
  defineProps<{
    label?: string;
    stopKeyDownEvent?: boolean;
  }>(),
  {
    stopKeyDownEvent: true,
  },
);

const value = defineModel<number>();
</script>

<style scoped></style>
