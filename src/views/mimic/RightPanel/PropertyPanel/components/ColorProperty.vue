<template>
  <PropertyContainer :label="label">
    <NColorPicker
      style="width: 100%"
      :value
      :disabled
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
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'update:value': [v: string];
}>();

const swatches = [
  '#FFFFFF',
  '#CDCDCD',
  '#18A058',
  '#2080F0',
  '#F0A020',
  '#D03050',
  '#F8E71C',
  '#8B572A',
  '#BD10E0',
  '#000000',
  '#50E3C2',
  '#B8E986'
];
</script>

<style scoped>
@import './property-item.css';
</style>
