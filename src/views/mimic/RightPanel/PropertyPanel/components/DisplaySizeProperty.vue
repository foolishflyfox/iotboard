<template>
  <div>
    <SelectProperty
      label="尺寸"
      placeholder="请选择图纸尺寸"
      :options="sizeOptions"
    />
    <PropertyContainer>
      <n-input placeholder="宽" size="small" class="mr-8px">
        <template #suffix>
          <div><n-divider vertical />W</div>
        </template>
      </n-input>
      <n-button size="small" class="bg-gray-100">转</n-button>
      <n-input placeholder="高" size="small" class="ml-8px">
        <template #suffix>
          <div><n-divider vertical />H</div>
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

const sizeOptionValues = {
  a3: 'A3',
  a4: 'A4',
  a5: 'A5',
  custom: 'custom',
};
const sizeOptions: SelectOption[] = [
  {
    label: 'A3 (1500×2100)',
    value: sizeOptionValues.a3,
  },
  {
    label: 'A4 (1050×1500)',
    value: sizeOptionValues.a4,
  },
  {
    label: 'A5 (750×1050)',
    value: sizeOptionValues.a5,
  },
  {
    label: '自定义',
    value: sizeOptionValues.custom,
  },
];
</script>

<style scoped></style>
