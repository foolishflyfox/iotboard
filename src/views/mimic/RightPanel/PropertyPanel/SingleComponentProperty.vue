<template>
  <!-- <div>单文件配置: {{ mimicWorkspaceStatus.selectedUiId }}</div>
  <div>{{ curAppearancePropertyTypes }}</div> -->
  <div>
    <template v-for="pt of curAppearancePropertyTypes" :key="pt">
      <template v-if="pt === 'x'">
        <InputNumberProperty v-model="x" label="X坐标" />
      </template>
      <template v-else-if="pt === 'y'">
        <InputNumberProperty v-model="y" label="Y坐标" />
      </template>
      <template v-else-if="pt === 'width'">
        <InputNumberProperty v-model="width" label="宽度" />
      </template>
      <template v-else-if="pt === 'height'">
        <InputNumberProperty v-model="height" label="高度" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { useCurElementProxyData } from '@mimic/hooks';
import { customMetas } from '@mimic/utils';
import InputNumberProperty from './components/InputNumberProperty.vue';

// const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const curElementProxyData = useCurElementProxyData();
const curAppearancePropertyTypes = computed(
  () =>
    customMetas[curElementProxyData.value?.tag || '']?.appearancePropertyTypes,
);

const x = computed({
  get: () => curElementProxyData.value?.x,
  set: (v: number) => {
    curElementProxyData.value!.x = v;
  },
});

const y = computed({
  get: () => curElementProxyData.value?.y,
  set: (v: number) => (curElementProxyData.value!.y = v),
});
const width = computed({
  get: () => curElementProxyData.value?.width,
  set: (v: number) => (curElementProxyData.value!.width = v),
});
const height = computed({
  get: () => curElementProxyData.value?.height,
  set: (v: number) => (curElementProxyData.value!.height = v),
});
</script>

<style scoped></style>
