<template>
  <div>
    <ColorProperty label="背景颜色" v-model="bgColor" />
  </div>
</template>

<script setup lang="ts">
import type { Rect } from 'leafer-ui';
import { ColorProperty } from './components';
import { useMimicWorkspaceStatus } from '@mimic/stores';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const displayProxyData = (mimicWorkspaceStatus.selectedUI as any)
  .proxyData as Rect;

const bgColor = computed({
  get: () => {
    // return mimicWorkspaceStatus.selectedUI?.fill! as string;
    return displayProxyData.fill;
  },
  set: (v: string) => {
    displayProxyData.fill = v;
  },
});
// console.log('%%%');
</script>

<style scoped></style>
