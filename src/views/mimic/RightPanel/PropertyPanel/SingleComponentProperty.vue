<template>
  <!-- <div>单文件配置: {{ mimicWorkspaceStatus.selectedUiId }}</div> -->
  <div>
    <n-collapse :default-expanded-names="['base', 'custom']">
      <n-collapse-item title="基础" name="base">
        <template v-for="pt of curAppearancePropertyTypes" :key="pt">
          <NumberProperty v-model="x" label="X坐标" v-if="pt === 'x'" />
          <NumberProperty v-else-if="pt === 'y'" v-model="y" label="Y坐标" />
          <NumberProperty v-else-if="pt === 'width'" v-model="width" label="宽度" />
          <NumberProperty v-else-if="pt === 'height'" v-model="height" label="高度" />
        </template>
      </n-collapse-item>
      <n-collapse-item title="自定义" name="custom"> 自定义外观 </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { useCurElementProxyData } from '@mimic/hooks';
import { customMetas } from '@mimic/utils';
import NumberProperty from './components/NumberProperty.vue';

// const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const curElementProxyData = useCurElementProxyData();
const curAppearancePropertyTypes = computed(
  () => customMetas[curElementProxyData.value?.tag || '']?.appearancePropertyTypes,
);

const x = computed({
  get: () => curElementProxyData.value?.x,
  set: (v: number) => (curElementProxyData.value!.x = v),
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
const stroke = computed({
  get: () => curElementProxyData.value?.stroke,
  set: (v: string) => (curElementProxyData.value!.stroke = v),
});
</script>

<style scoped></style>
