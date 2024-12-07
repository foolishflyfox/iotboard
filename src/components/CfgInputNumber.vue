<!-- 输入回车或按下 tab 后才会向父组件发送值修改的事件 -->
<template>
  <n-input-number size="small" v-model:value="innerValue" @keydown.stop="cfgInputKeydown" />
</template>

<script setup lang="ts">
import { keyboardKeys } from '@/constant';
import { NInputNumber } from 'naive-ui';

const props = defineProps<{
  value?: number;
}>();

const emit = defineEmits<{
  'update:value': [v: number | undefined];
}>();

const innerValue = ref(props.value);

watch(
  () => props.value,
  nv => (innerValue.value = nv),
);

function cfgInputKeydown(e: KeyboardEvent) {
  if ([keyboardKeys.Enter, keyboardKeys.Tab].includes(e.key)) {
    emit('update:value', innerValue.value);
    if (e.target) {
      (e.target as HTMLElement).blur();
    }
  }
  // 通过方向键改变值，不失去焦点
  if ([keyboardKeys.ArrowUp, keyboardKeys.ArrowDown].includes(e.key)) {
    emit('update:value', innerValue.value);
  }
}
</script>

<style scoped></style>
