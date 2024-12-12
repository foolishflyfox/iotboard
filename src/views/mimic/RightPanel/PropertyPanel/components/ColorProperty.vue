<template>
  <PropertyContainer :label="label">
    <n-color-picker
      style="width: 100%"
      :value
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
</script>

<style scoped>
@import './property-item.css';
</style>
