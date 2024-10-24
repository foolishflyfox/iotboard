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
  ['Xiaomi Notebook Air', '1920 x 1080'],
  ['iPhone X', '375 x 812'],
  ['iPhone 8+ (8+, 7+, 6S+, 6', '414 x 736'],
  ['iPhone 8 (8, 7, 6S, 6', '375 x 667'],
  ['iPhone SE（SE, 5S, 5C）', '320 x 568'],
  ['Android One', '320 x 569'],
  ['Google Pixel', '411 x 731'],
  ['Google Pixel XL', '411 x 731'],
  ['Moto X', '360 x 640'],
  ['Moto X 二代', '360 x 640'],
  ['Nexus 5', '360 x 640'],
  ['Nexus 5X', '411 x 731'],
  ['Nexus 6', '411 x 731'],
  ['Nexus 6P', '411 x 731'],
  ['Samsung Galaxy S8', '360 x 740'],
  ['Samsung Galaxy S8', '360 x 740'],
  ['Samsung Galaxy Note 4', '480 x 853'],
  ['Samsung Galaxy Note 5', '480 x 853'],
  ['Samsung Galaxy S5', '360 x 640'],
  ['Samsung Galaxy S7 ', '360 x 640'],
  ['Smartisan T2', '360 x 640'],
  ['Smartisan M1', '360 x 640'],
  ['Smartisan M1L', '480 x 853'],
  ['OnePlus 5', '360 x 640'],
  ['OnePlus 3T', '360 x 640'],
  ['Oppo R9s', '360 x 640'],
  ['Oppo R9s Plus', '360 x 640'],
  ['Oppo A57', '360 x 640'],
  ['Oppo A59s', '360 x 640'],
  ['Oppo A37', '360 x 640'],
  ['Xiaomi MIX2', '360 x 720'],
  ['Xiaomi MIX', '360 x 680'],
  ['Xiaomi Note 3', '360 x 640'],
  ['Xiaomi Note 2', '360 x 640'],
  ['Xiaomi 6', '360 x 640'],
  ['Xiaomi 5s', '360 x 640'],
  ['Xiaomi 5s Plus', '360 x 640'],
  ['Xiaomi Max', '360 x 640'],
  ['红米 Note 4', '360 x 640'],
  ['红米 4', '360 x 640'],
  ['Vivo X9', '360 x 640'],
  ['Vivo X9 Plus', '360 x 640'],
  ['HUAWEI P10', '360 x 640'],
  ['HUAWEI P10 Plus', '360 x 640'],
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
