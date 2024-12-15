<template>
  <PropertyContainer :label>
    <NCheckbox :checked="value" @update:checked="v => emit('update:value', v)" />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { PropertyContainer } from './containers';
import { NCheckbox } from 'naive-ui';

defineProps<{
  label?: string;
  value: boolean;
}>();

const emit = defineEmits<{
  'update:value': [boolean];
}>();
</script>

<style scoped></style>
