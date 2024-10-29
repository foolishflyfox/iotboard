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
      <ColorProperty label="颜色" :value="color" @update:value="updateColor" />
    </template>
    <template v-if="type === 'linear'">
      <JsonProperty label="渐变配置" help-route-name="LinearGradientDoc" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { SelectOption } from 'naive-ui';
import SelectProperty from './components/SelectProperty.vue';
import ColorProperty from './components/ColorProperty.vue';
import JsonProperty from './components/JsonProperty.vue';
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

const props = defineProps<{
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
  } else if (newType === 'linear') {
    data.stops = [
      { offset: 0, color: '#FF4B4B' },
      { offset: 1, color: '#FEB027' },
    ];
  }
  emit('update:value', data);
}
function updateColor(newColor: string) {
  emit('update:value', { type: props.type, color: newColor });
}
</script>

<style scoped></style>
