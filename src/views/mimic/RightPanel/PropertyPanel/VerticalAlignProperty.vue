<template>
  <PropertyContainer :label>
    <NSelect
      :options
      :render-label
      size="tiny"
      :value="value"
      @update:value="v => emit('update:value', v)"
    />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { PropertyContainer } from './components/containers';
import { NSelect } from 'naive-ui';
import {
  AlignBottom20Filled,
  AlignCenterHorizontal20Filled,
  AlignTop20Filled,
} from '@vicons/fluent';
import IconLable from './components/IconLable.vue';

withDefaults(
  defineProps<{
    label?: string;
    value: string;
  }>(),
  {
    label: '垂直对齐',
  },
);
const emit = defineEmits<{
  'update:value': [string];
}>();

const options = [
  { label: '顶部对齐', value: 'top', icon: AlignTop20Filled },
  { label: '垂直居中对齐', value: 'middle', icon: AlignCenterHorizontal20Filled },
  { label: '底部对齐', value: 'bottom', icon: AlignBottom20Filled },
];

function renderLabel(option: any) {
  return h(IconLable, option);
}
</script>

<style scoped></style>
