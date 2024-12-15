<template>
  <PropertyContainer :label>
    <NSelect
      size="small"
      :options
      :render-label
      :value
      @update:value="(v: any) => emit('update:value', v)"
    />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { NSelect } from 'naive-ui';
import type { IStrokeJoin } from 'leafer-ui';
import { PropertyContainer } from './components/containers';
import StrokeJoinSelectItem from '@/components/StrokeJoinSelectItem.vue';

const props = defineProps<{
  label?: string;
  value: IStrokeJoin;
}>();

const emit = defineEmits<{
  'update:value': [IStrokeJoin];
}>();
interface StrokeJoinOption {
  label: string;
  value: IStrokeJoin
}
const options = [
  { value: 'miter', label: '直角' },
  { value: 'bevel', label: '平角' },
  { value: 'round', label: '圆角' },
];

function renderLabel(option: StrokeJoinOption) {
  return h(StrokeJoinSelectItem, { type: option.value, label: option.label });
}
</script>

<style scoped></style>
