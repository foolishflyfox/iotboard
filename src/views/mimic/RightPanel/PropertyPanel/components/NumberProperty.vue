<template>
  <!-- 添加 keydown.stop 是为了阻止事件被 leafer 捕获，导致选中的元素在按上下键时被移动 -->
  <PropertyContainer :label>
    <CfgInputNumber
      :value="value"
      @update:value="v => emit('update:value', v!)"
      size="tiny"
      :min
      :max
      :step
      :placeholder
      :show-button
    >
      <template #suffix>
        <slot name="suffix" />
      </template>
    </CfgInputNumber>
  </PropertyContainer>
</template>

<script setup lang="ts">
import { PropertyContainer } from './containers';
import { CfgInputNumber } from '@/components';

withDefaults(
  defineProps<{
    label?: string;
    stopKeyDownEvent?: boolean;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
    showButton?: boolean;
  }>(),
  {
    stopKeyDownEvent: true,
    showButton: true
  },
);

const emit = defineEmits<{
  'update:value': [v: number];
}>();
</script>

<style scoped></style>
