<!-- 输入回车或按下 tab 后才会向父组件发送值修改的事件 -->
<template>
  <NInputNumber
    size="tiny"
    :value="innerValue"
    :update-value-on-input="false"
    :min
    :max
    :step
    :placeholder
    :show-button
    :format
    @update:value="updateValue"
    @keydown.stop="cfgInputKeydown"
  >
    <template #suffix>
      <slot name="suffix" />
    </template>
  </NInputNumber>
</template>

<script setup lang="ts">
import { NInputNumber } from 'naive-ui';

const props = defineProps<{
  value?: number | null;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  showButton?: boolean;
  decimalPlaces?: number;
}>();

const emit = defineEmits<{
  'update:value': [v: number | undefined | null];
}>();

const format = computed(() => {
  if (props.decimalPlaces === undefined) return undefined;
  return (v: number | null) => {
    return v?.toFixed(props.decimalPlaces) || '';
  };
});

const innerValue = ref(props.value);

watch(
  () => props.value,
  nv => (innerValue.value = nv),
);

// watch(innerValue, nv => emit('update:value', nv));
function updateValue(v?: number | null) {
  innerValue.value = v;
  emit('update:value', v);
}

function cfgInputKeydown(e: KeyboardEvent) {
  // if ([keyboardKeys.Enter, keyboardKeys.Tab].includes(e.key)) {
  //   emit('update:value', innerValue.value);
  //   if (e.target) {
  //     (e.target as HTMLElement).blur();
  //   }
  // }
  // // 通过方向键改变值，不失去焦点
  // if ([keyboardKeys.ArrowUp, keyboardKeys.ArrowDown].includes(e.key)) {
  //   emit('update:value', innerValue.value);
  // }
}
</script>

<style scoped></style>
