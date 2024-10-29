<template>
  <!-- 添加 keydown.stop 是为了阻止事件被 leafer 捕获，导致选中的元素在按上下键时被移动 -->
  <PropertyContainer :label="label" @keydown.stop>
    <n-input-number v-model:value="value" size="small" />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { PropertyContainer } from './containers';

withDefaults(
  defineProps<{
    label?: string;
    stopKeyDownEvent?: boolean;
  }>(),
  {
    stopKeyDownEvent: true,
  },
);

const value = defineModel<number>();
</script>

<style scoped></style>
