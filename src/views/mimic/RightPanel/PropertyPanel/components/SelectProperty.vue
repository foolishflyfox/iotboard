<template>
  <PropertyContainer :label="label">
    <NSelect
      :options
      :value="value"
      @update:value="v => emit('update:value', v)"
      :size="size"
      :placeholder
      :filterable
      :clearable
    />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { NSelect } from 'naive-ui';
import type { Size } from 'naive-ui/es/select/src/interface';
import { PropertyContainer } from './containers';
import type { SelectOption } from 'naive-ui';

defineProps<{
  value: any;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  filterable?: boolean;
  size?: Size;
  clearable?: boolean;
}>();
const emit = defineEmits<{
  'update:value': [v: any];
}>();

// const value = defineModel<any>();
</script>

<style scoped></style>
