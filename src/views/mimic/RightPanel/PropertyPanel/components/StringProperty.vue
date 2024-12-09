<template>
  <PropertyContainer :label>
    <CfgInput :value="value" @update:value="v => emit('update:value', v)" />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { CfgInput } from '@/components';
import PropertyContainer from './containers/PropertyContainer.vue';

defineProps<{
  label?: string;
  value?: string;
}>();

const emit = defineEmits<{
  'update:value': [string | undefined];
}>();
</script>

<style scoped></style>
