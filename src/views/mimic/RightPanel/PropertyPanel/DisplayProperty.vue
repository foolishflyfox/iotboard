<template>
  <div>
    <ColorProperty label="背景颜色" v-model:value="bgColor" />
    <DisplaySizeProperty />
  </div>
</template>

<script setup lang="ts">
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import { ColorProperty, DisplaySizeProperty } from './components';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const mimicDisplayStatus = useMimicDisplayStatus();

const bgColor = computed({
  get: () => {
    return mimicDisplayStatus.selectedUiProxyData?.fill as string;
  },
  set: (v: string) => {
    if (mimicDisplayStatus.selectedUiProxyData) {
      mimicDisplayStatus.selectedUiProxyData.fill = v;
      mimicWorkspaceStatus.setCurrentDisplayUnsave();
    }
  },
});
</script>

<style scoped></style>
