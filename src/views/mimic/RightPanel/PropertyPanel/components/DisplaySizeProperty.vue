<template>
  <div>
    <SelectProperty
      label="尺寸"
      placeholder="请选择图纸尺寸"
      :options="sizeOptions"
      :filterable="true"
    />
    <PropertyContainer>
      <n-input placeholder="宽" size="small" class="mr-8px">
        <template #suffix>
          <div><span class="text-12px">px</span><n-divider vertical />W</div>
        </template>
      </n-input>
      <n-button size="small" class="bg-gray-100">
        <template #icon>
          <n-icon><ArrowSwap24Filled /></n-icon>
        </template>
      </n-button>
      <n-input placeholder="高" size="small" class="ml-8px">
        <template #suffix>
          <div><span class="text-12px">px</span><n-divider vertical />H</div>
        </template>
      </n-input>
    </PropertyContainer>
    <n-divider />
  </div>
</template>

<script setup lang="ts">
import type { SelectOption } from 'naive-ui';
import SelectProperty from './SelectProperty.vue';
import { PropertyContainer } from './containers';
import { ArrowSwap24Filled } from '@vicons/fluent';

// const sizeOptionValues = {
//   a3: 'A3',
//   a4: 'A4',
//   a5: 'A5',
//   custom: 'custom',
// };
const sizeOptionMap = new Map([
  ['自定义', ''],
  ['MacBook', '1280 x 800'],
  ['MacBook Air 11', '1366 x 768'],
  ['MacBook Air 13', '1440 x 900'],
  ['MacBook Pro 15', '1440 x 900'],
  ['iMac 21.5', '1920 x 1080'],
  ['iMac 27', '2560 x 1440'],
  ['Surface Book', '1500 x 1000'],
  ['Surface Pro', '1368 x 912'],
  ['Surface Laptop', '1128 x 752'],
  ['Surface Studio', '2250 x 1500'],
  ['Dell XPS 13', '1920 x 1080'],
  ['Dell XPS 15', '1920 x 1080'],
  ['小米笔记本Air', '1920 x 1080'],
]);

function generateSizeOptionsValue(k: string, v: string) {
  return `${k}|${v}`;
}

const sizeOptions: SelectOption[] = [...sizeOptionMap.keys()].map(k => ({
  label: k,
  value: generateSizeOptionsValue(k, sizeOptionMap.get(k)!),
}));
</script>

<style scoped></style>
