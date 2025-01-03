<template>
  <div>
    <ColorProperty label="背景颜色" v-model:value="bgColor" />
    <DisplaySizeProperty />
  </div>
</template>

<script setup lang="ts">
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { ColorProperty, DisplaySizeProperty } from './components';
import { useCurElementProxyData } from '@mimic/hooks';

const curElementProxyData = useCurElementProxyData();
const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const bgColor = computed({
  get: () => {
    return curElementProxyData.value?.fill as string;
  },
  set: (v: string) => {
    if (curElementProxyData.value) {
      curElementProxyData.value.fill = v;
      mimicWorkspaceStatus.setCurrentDisplayUnsave();
    }
  },
});
</script>

<style scoped></style>
