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
import { findUiById } from '@mimic/utils';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const displayProxyData = computed(
  () =>
    (findUiById(mimicWorkspaceStatus.selectedUiId) as any).proxyData as Rect,
);

const bgColor = computed({
  get: () => {
    return displayProxyData.value.fill as string;
  },
  set: (v: string) => {
    displayProxyData.value.fill = v;
  },
});
</script>

<style scoped></style>
