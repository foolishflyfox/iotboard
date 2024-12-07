<template>
  <PropertyContainer :label>
    <n-select size="small" :options :render-label />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { NSelect, type SelectOption } from 'naive-ui';
import PropertyContainer from './components/containers/PropertyContainer.vue';
import { ArrowSelectItem } from '@/components';
import type { IArrowType, IPathDataArrow } from 'leafer-ui';

const props = defineProps<{
  label?: string;
  isStart?: boolean;
}>();

const options: { value: Exclude<IArrowType, IPathDataArrow> }[] = [
  { value: 'none' },
  { value: 'angle' },
  { value: 'angle-side' },
  { value: 'arrow' },
  { value: 'triangle' },
  { value: 'triangle-flip' },
  { value: 'circle' },
  { value: 'circle-line' },
  { value: 'square' },
  { value: 'square-line' },
  { value: 'diamond' },
  { value: 'diamond-line' },
  { value: 'mark' },
];

function renderLabel(option: SelectOption) {
  return h(ArrowSelectItem, { type: option.value as any, isStart: props.isStart });
}
</script>

<style scoped></style>
