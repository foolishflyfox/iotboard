<template>
  <PropertyContainer :label>
    <n-select
      size="small"
      :options
      :render-label
      :value
      @update:value="(v: any) => emit('update:value', v)"
    />
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
  value: Exclude<IArrowType, IPathDataArrow>;
}>();

type ArrowTypeOption = { label: string; value: Exclude<IArrowType, IPathDataArrow> };

const options: ArrowTypeOption[] = [
  { value: 'none', label: '无' },
  { value: 'arrow', label: '标准' },
  { value: 'angle', label: '角度' },
  { value: 'angle-side', label: '单边角度' },
  { value: 'triangle', label: '三角形' },
  { value: 'triangle-flip', label: '反三角形' },
  { value: 'circle', label: '圆形' },
  { value: 'circle-line', label: '圆形(线性)' },
  { value: 'square', label: '方形' },
  { value: 'square-line', label: '方形(线性)' },
  { value: 'diamond', label: '菱形' },
  { value: 'diamond-line', label: '菱形(线性)' },
  { value: 'mark', label: '标注' },
];

function renderLabel(option: ArrowTypeOption) {
  return h(ArrowSelectItem, {
    type: option.value,
    isStart: props.isStart,
    label: option.label,
  });
}

const emit = defineEmits<{
  'update:value': [Exclude<IArrowType, IPathDataArrow>];
}>();
</script>

<style scoped></style>
