<template>
  <HoverContainer
    :hover-bg-color="hoverColor"
    :active-bg-color="activeColor"
    :is-active="isActive"
    border-radius="15%"
  >
    <component :is="svgComponent" :width="svgWidth" :height="svgHeight" />
  </HoverContainer>
</template>

<script setup lang="ts">
import { headIconSetting } from '@mimic/settings';
import type { Component } from 'vue';

defineProps<{
  svgComponent: Component;
  isActive?: boolean;
}>();

const { hoverColor, activeColor, sideLength } = headIconSetting;
const svgWidth = `${sideLength}px`;
const svgHeight = svgWidth;
</script>

<style scoped></style>
