<template>
  <PropertyContainer label="文本装饰">
    <n-select size="tiny" :options :value @update:value="v => emit('update:value', v)" />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { NSelect } from 'naive-ui';
import { PropertyContainer } from './components/containers';

defineProps<{
  value: string;
}>();

const options = [
  { label: '无', value: 'none' },
  { label: '下划线', value: 'under' },
  { label: '删除线', value: 'delete' },
];

const emit = defineEmits<{
  'update:value': [string];
}>();
</script>

<style scoped></style>
