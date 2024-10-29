<template>
  <div>
    <SelectProperty
      label="尺寸"
      placeholder="请选择图纸尺寸"
      :options="sizeOptions"
      :filterable="true"
      v-model:value="sizeType"
    />
    <PropertyContainer>
      <n-input-number
        placeholder="宽"
        size="small"
        class="mr-8px"
        :value="width"
        :show-button="false"
        @update:value="changeWidth"
      >
        <template #suffix>
          <div><span class="text-12px">px</span><n-divider vertical />W</div>
        </template>
      </n-input-number>
      <n-button size="small" class="bg-gray-100" @click="swapWidthHeight">
        <template #icon>
          <n-icon><ArrowSwap24Filled /></n-icon>
        </template>
      </n-button>
      <n-input-number
        placeholder="高"
        size="small"
        class="ml-8px"
        :value="height"
        :show-button="false"
        @update:value="changeHeight"
      >
        <template #suffix>
          <div><span class="text-12px">px</span><n-divider vertical />H</div>
        </template>
      </n-input-number>
    </PropertyContainer>
    <n-divider />
  </div>
</template>

<script setup lang="ts">
import { NInputNumber, NButton, NIcon, NDivider } from 'naive-ui';
import type { SelectOption } from 'naive-ui';
import SelectProperty from '../SelectProperty.vue';
import { PropertyContainer } from '../containers';
import { ArrowSwap24Filled } from '@vicons/fluent';
import { titleSizeMap } from './misc';
import { useCurElementProxyData } from '@mimic/hooks';
import * as _ from 'lodash-es';
import { updateElementData } from '@mimic/utils';

defineOptions({
  name: 'DisplaySizeProperty',
});

const curElementProxyData = useCurElementProxyData();

const sizeOptions: SelectOption[] = [...titleSizeMap.keys()].map(k => ({
  label: k,
  value: k,
}));
sizeOptions.unshift({ label: '自定义', value: 'custom' });

const sizeType = computed({
  get() {
    return curElementProxyData.value!.data!.sizeType as string;
  },
  set(v: string) {
    const size = titleSizeMap.get(v);
    if (size) {
      width.value = size[0];
      height.value = size[1];
    }
    updateElementData(curElementProxyData, 'sizeType', v);
  },
});

const width = computed({
  get() {
    return curElementProxyData.value!.width as number;
  },
  set(v: number) {
    curElementProxyData.value!.width = v;
  },
});

const height = computed({
  get() {
    return curElementProxyData.value!.height as number;
  },
  set(v: number) {
    curElementProxyData.value!.height = v;
  },
});

function swapWidthHeight() {
  const oldWidth = width.value;
  width.value = height.value;
  height.value = oldWidth;
  sizeType.value = 'custom';
}

function changeWidth(v: number | null) {
  if (v) {
    width.value = v;
    sizeType.value = 'custom';
  }
}

function changeHeight(v: number | null) {
  if (v) {
    height.value = v;
    sizeType.value = 'custom';
  }
}
</script>

<style scoped></style>
