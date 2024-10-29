<template>
  <PropertyContainer :label="label" :route-name="helpRouteName" @keydown.stop>
    <n-input :value="value" />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { NInput } from 'naive-ui';
import PropertyContainer from './containers/PropertyContainer.vue';

defineProps<{
  label?: string;
  value?: string;
  helpRouteName?: string;
}>();

const emit = defineEmits<{
  'update:value': [v: string];
}>();
</script>

<style scoped>
:deep(.vjs-tree) {
  width: 100%;
}
</style>
