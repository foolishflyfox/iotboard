<template>
  <PropertyContainer label="字体粗细">
    <n-select :options="options" />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { NSelect } from 'naive-ui';
import { PropertyContainer } from './components/containers';

const options = [
  { label: 'thin', value: 100 },
  { label: 'extra-light', value: 200 },
  { label: 'light', value: 300 },
  { label: 'normal', value: 400 },
  { label: 'medium', value: 500 },
  { label: 'semi-bold', value: 600 },
  { label: 'bold', value: 700 },
  { label: 'extra-bold', value: 800 },
  { label: 'black', value: 900 },
];
</script>

<style scoped></style>
