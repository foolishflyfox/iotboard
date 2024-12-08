<template>
  <div class="border-gray-300 border-1 rounded-md">
    <CheckboxProperty label="虚线" :value="value !== undefined" @update:value="changeIsDash" />
    <PropertyContainer v-if="!!value" label="虚线样式" route-name="StrokeDashPatternDoc">
      <CfgInput :value="toString(value)" @update:value="changeDashCfg" />
    </PropertyContainer>
  </div>
</template>

<script setup lang="ts">
import CheckboxProperty from './components/CheckboxProperty.vue';
import { PropertyContainer } from './components/containers';
import CfgInput from '@/components/CfgInput.vue';
import * as _ from 'lodash-es';

const props = defineProps<{
  value?: number[];
}>();

const emit = defineEmits<{
  'update:value': [v: number[] | undefined];
}>();

// const innerStringValue = ref(toString(props.value));

function toString(v?: number[]) {
  if (v) return _.join(v, ',');
  return v;
}

function fromString(v?: string) {
  if (v) {
    const t = v.split(',').map(e => Number(_.trim(e)));
    if (t && t.length) return t;
  }
  return undefined;
}

function changeIsDash(v: boolean) {
  if (v) {
    emit('update:value', [10, 10]);
  } else {
    emit('update:value', undefined);
  }
}

function changeDashCfg(v?: string) {
  emit('update:value', fromString(v));
}
</script>

<style scoped></style>
