<template>
  <PropertyContainer :label="label">
    <n-select :options v-model:value="value" size="small" :placeholder :filterable />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { PropertyContainer } from './containers';
import type { SelectOption } from 'naive-ui';

defineProps<{
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  filterable?: boolean;
}>();

const value = defineModel<any>();
</script>

<style scoped></style>
