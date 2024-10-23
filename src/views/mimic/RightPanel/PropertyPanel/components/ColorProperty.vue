<template>
  <PropertyContainer :label="label">
    <n-color-picker style="width: 100%" v-model:value="value" size="small" />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { PropertyContainer } from './containers';

defineProps<{
  label?: string;
}>();

const value = defineModel<string>();
</script>

<style scoped>
@import './property-item.css';
</style>
