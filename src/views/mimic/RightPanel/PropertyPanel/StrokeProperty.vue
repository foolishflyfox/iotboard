<template>
  <div class="border-gray-300 border-1 rounded-md">
    <SelectProperty
      label="边框类型"
      placeholder="边框类型"
      :options
      :value="type"
      size="tiny"
      @update:value="updateType"
    />
    <template v-if="type === 'solid'">
      <ColorProperty label="颜色" :value="color" />
    </template>
    <template v-if="type === 'linear'"> </template>
  </div>
</template>

<script setup lang="ts">
import type { SelectOption } from 'naive-ui';
import SelectProperty from './components/SelectProperty.vue';
import ColorProperty from './components/ColorProperty.vue';
import type { IPaintType } from 'leafer-ui';

const options: SelectOption[] = [
  {
    label: '纯色',
    value: 'solid',
  },
  {
    label: '线性渐变',
    value: 'linear',
  },
  {
    label: '径向渐变',
    value: 'radial',
  },
  {
    label: '角度渐变',
    value: 'angular',
  },
];

defineProps<{
  type: IPaintType;
  color?: string;
}>();

const emit = defineEmits<{
  'update:value': [v: any];
}>();

function updateType(newType: IPaintType) {
  const data: Record<string, any> = { type: newType };
  if (newType === 'solid') {
    data.color = '#000000ff';
  }
  emit('update:value', data);
}
</script>

<style scoped></style>
