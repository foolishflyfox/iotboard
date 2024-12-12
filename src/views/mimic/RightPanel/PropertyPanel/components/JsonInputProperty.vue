<template>
  <PropertyContainer :label>
    <CfgInput :value="JSON.stringify(value)" @update:value="updateValue" />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { CfgInput } from '@/components';
import PropertyContainer from './containers/PropertyContainer.vue';

defineProps<{
  label?: string;
  value: any;
}>();

const emit = defineEmits<{ 'update:value': [any] }>();

function updateValue(v: string | undefined) {
  try {
    if (v === undefined) {
      emit('update:value', v);
    } else {
      const r = JSON.parse(v);
      emit('update:value', r);
    }
  } catch (e) {
    window.$message?.error(`输入值 ${v} 存在问题`);
  }
}
</script>

<style scoped></style>
