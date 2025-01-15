<template>
  <PropertyContainer :label="label" :unbindable>
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
import type { Unbindable } from '@/views/mimic/types';

defineProps<{
  value: any;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  filterable?: boolean;
  size?: Size;
  clearable?: boolean;
  unbindable?: Unbindable;
}>();
const emit = defineEmits<{
  'update:value': [v: any];
}>();

// const value = defineModel<any>();
</script>

<style scoped></style>
