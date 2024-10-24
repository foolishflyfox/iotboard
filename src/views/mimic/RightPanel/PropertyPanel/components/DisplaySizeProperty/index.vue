<template>
  <div>
    <SelectProperty
      label="尺寸"
      placeholder="请选择图纸尺寸"
      :options="sizeOptions"
      :filterable="true"
      v-model="sizeType"
    />
    <PropertyContainer>
      <n-input-number
        placeholder="宽"
        size="small"
        class="mr-8px"
        v-model:value="width"
        :show-button="false"
      >
        <template #suffix>
          <div><span class="text-12px">px</span><n-divider vertical />W</div>
        </template>
      </n-input-number>
      <n-button size="small" class="bg-gray-100">
        <template #icon>
          <n-icon><ArrowSwap24Filled /></n-icon>
        </template>
      </n-button>
      <n-input-number
        placeholder="高"
        size="small"
        class="ml-8px"
        v-model:value="height"
        :show-button="false"
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
import type { SelectOption } from 'naive-ui';
import SelectProperty from '../SelectProperty.vue';
import { PropertyContainer } from '../containers';
import { ArrowSwap24Filled } from '@vicons/fluent';
import { titleSizeMap } from './misc';
import { useCurElementProxyData } from '@mimic/hooks';
import { viewAutoFit } from '@mimic/utils';

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
    return (curElementProxyData.value!.data!.sizeType = v);
  },
});

const width = computed({
  get() {
    return curElementProxyData.value!.width as number;
  },
  set(v: number) {
    curElementProxyData.value!.width = v;
    viewAutoFit();
  },
});

const height = computed({
  get() {
    return curElementProxyData.value!.height as number;
  },
  set(v: number) {
    curElementProxyData.value!.height = v;
    viewAutoFit();
  },
});
</script>

<style scoped></style>
