<template>
  <div>
    <ColorProperty label="背景颜色" v-model="bgColor" />
    <DisplaySizeProperty />
  </div>
</template>

<script setup lang="ts">
import { ColorProperty, DisplaySizeProperty } from './components';
import { useCurElementProxyData } from '@mimic/hooks';

const curElementProxyData = useCurElementProxyData();

const bgColor = computed({
  get: () => {
    return curElementProxyData.value?.fill as string;
  },
  set: (v: string) => {
    if (curElementProxyData.value) {
      curElementProxyData.value.fill = v;
    }
  },
});
</script>

<style scoped></style>
