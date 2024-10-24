<template>
  <div>
    <ColorProperty label="背景颜色" v-model="bgColor" />
    <DisplaySizeProperty />
  </div>
</template>

<script setup lang="ts">
import { ColorProperty, DisplaySizeProperty } from './components';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { findUiById } from '@mimic/utils';
import type { UI } from 'leafer-ui';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const displayProxyData = computed(
  () => (findUiById(mimicWorkspaceStatus.selectedUiId) as UI).proxyData,
);

const bgColor = computed({
  get: () => {
    return displayProxyData.value?.fill as string;
  },
  set: (v: string) => {
    if (displayProxyData.value) {
      displayProxyData.value.fill = v;
    }
  },
});
</script>

<style scoped></style>
