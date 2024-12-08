<template>
  <div class="border-gray-300 border-1 rounded-md">
    <SelectProperty
      label="边框类型"
      placeholder="边框类型"
      :options
      :value="stroke.type"
      size="tiny"
      clearable
      @update:value="updateType"
    />
    <template v-if="stroke.type === 'solid'">
      <ColorProperty label="颜色" :value="strokeColor" @update:value="updateColor" />
    </template>
    <template v-if="stroke.type === 'linear'">
      <JsonProperty
        label="渐变配置"
        help-route-name="StrokeLinearGradientDoc"
        :value="JSON.stringify(_.omit(stroke, 'type'), null, 2)"
        @update:value="updateLinearCfg"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { SelectOption } from 'naive-ui';
import SelectProperty from './components/SelectProperty.vue';
import ColorProperty from './components/ColorProperty.vue';
import JsonProperty from './components/JsonProperty.vue';
import type { IPaint, IPaintType, ISolidPaint } from 'leafer-ui';
import * as _ from 'lodash-es';

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
  stroke: IPaint;
}>();

const defaultSolidColor = (props.stroke as ISolidPaint).color || '#000000';
const strokeColor = computed(() => (props.stroke as any).color as string);

const emit = defineEmits<{
  'update:value': [v: any];
}>();

function updateType(newType: IPaintType) {
  if (props.stroke.type === newType) return;
  const data: Record<string, any> = { type: newType };
  if (newType === 'solid') {
    data.color = defaultSolidColor;
  } else if (newType === 'linear') {
    data.stops = [
      { offset: 0, color: '#FF4B4B' },
      { offset: 1, color: '#FEB027' },
    ];
  }
  emit('update:value', data);
}
function updateColor(newColor: string) {
  emit('update:value', { type: props.stroke.type, color: newColor });
}
function updateLinearCfg(newCfg: string) {
  console.log('newCfg =', newCfg);
  emit('update:value', { type: props.stroke.type, ...JSON.parse(newCfg) });
}
</script>

<style scoped></style>
