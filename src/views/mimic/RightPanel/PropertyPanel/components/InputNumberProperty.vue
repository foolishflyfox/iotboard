<template>
  <PropertyContainer :label="label">
    <n-input-number
      v-model:value="value"
      size="small"
      :keyboard="{ ArrowUp: true, ArrowDown: true }"
    />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { PropertyContainer } from './containers';

defineProps<{
  label?: string;
}>();

const value = defineModel<number>();
</script>

<style scoped></style>
