<template>
  <PropertyContainer :label="label">
    <NColorPicker
      style="width: 100%"
      :value
      :swatches
      size="small"
      @update:value="v => emit('update:value', v)"
    />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { NColorPicker } from 'naive-ui';
import { PropertyContainer } from './containers';

defineProps<{
  value?: string;
  label?: string;
}>();

const emit = defineEmits<{
  'update:value': [v: string];
}>();

const swatches = [
  '#FFFFFF',
  '#18A058',
  '#2080F0',
  '#F0A020',
  '#D03050'
];
</script>

<style scoped>
@import './property-item.css';
</style>
