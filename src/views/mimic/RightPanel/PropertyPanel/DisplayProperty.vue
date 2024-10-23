<template>
  <div>
    <ColorProperty label="背景颜色" v-model="bgColor" />
    <DisplaySizeProperty />
  </div>
</template>

<script setup lang="ts">
import type { Rect } from 'leafer-ui';
import { ColorProperty, DisplaySizeProperty } from './components';
import { useMimicWorkspaceStatus } from '@mimic/stores';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const displayProxyData = (mimicWorkspaceStatus.selectedUI as any)
  .proxyData as Rect;

const bgColor = computed({
  get: () => {
    return displayProxyData.fill as string;
  },
  set: (v: string) => {
    displayProxyData.fill = v;
  },
});
// console.log('%%%');
</script>

<style scoped></style>
