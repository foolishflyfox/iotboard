<template>
  <div class="border-gray-300 border-1 rounded-md">
    <CheckboxProperty label="虚线" :value="value !== undefined" @update:value="changeIsDash" />
    <PropertyContainer v-if="!!value" label="虚线样式" route-name="xxx">
      <n-input size="tiny" />
    </PropertyContainer>
  </div>
</template>

<script setup lang="ts">
import { NInput } from 'naive-ui';
import CheckboxProperty from './components/CheckboxProperty.vue';
import { PropertyContainer } from './components/containers';

defineProps<{
  value?: number[];
}>();

const emit = defineEmits<{
  'update:value': [v: number[] | undefined];
}>();

function changeIsDash(v: boolean) {
  if (v) {
    return emit('update:value', [5, 5]);
  } else {
    return emit('update:value', undefined);
  }
}
</script>

<style scoped></style>
