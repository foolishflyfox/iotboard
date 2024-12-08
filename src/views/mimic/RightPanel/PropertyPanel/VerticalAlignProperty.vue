<template>
  <PropertyContainer label="垂直对齐">
    <n-select
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

defineProps<{
  value: string;
}>();
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
