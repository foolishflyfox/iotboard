<!-- 输入回车或按下 tab 后才会向父组件发送值修改的事件 -->
<template>
  <n-input size="tiny" v-model:value="innerValue" @keydown.stop="cfgInputKeydown" />
</template>

<script setup lang="ts">
import { keyboardKeys } from '@/constant';
import { NInput } from 'naive-ui';

const props = defineProps<{
  value?: string;
}>();

const emit = defineEmits<{
  'update:value': [string | undefined];
}>();

const innerValue = ref(props.value);

function cfgInputKeydown(e: KeyboardEvent) {
  if (e.key === keyboardKeys.Enter || e.key === keyboardKeys.Tab) {
    emit('update:value', innerValue.value);
    if (e.target) {
      (e.target as HTMLElement).blur();
    }
  }
}
</script>

<style scoped></style>
