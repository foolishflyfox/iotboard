<template>
  <PropertyContainer label="水平对齐">
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
  TextAlignLeft20Filled,
  TextAlignCenter20Filled,
  TextAlignRight20Filled,
  TextAlignJustify20Filled,
} from '@vicons/fluent';
import IconLable from './components/IconLable.vue';

defineProps<{
  value: string;
}>();
const emit = defineEmits<{
  'update:value': [string];
}>();

const options = [
  { label: '左对齐', value: 'left', icon: TextAlignLeft20Filled },
  { label: '居中对齐', value: 'center', icon: TextAlignCenter20Filled },
  { label: '右对齐', value: 'right', icon: TextAlignRight20Filled },
  { label: '两端对齐', value: 'justify', icon: TextAlignJustify20Filled },
];

function renderLabel(option: any) {
  return h(IconLable, option);
}
</script>

<style scoped></style>
