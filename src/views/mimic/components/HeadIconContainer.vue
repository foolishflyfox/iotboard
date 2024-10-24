<template>
  <HoverContainer
    :hover-bg-color="hoverColor"
    :active-bg-color="activeColor"
    :is-active="isActive"
    :tooltip
    border-radius="15%"
  >
    <template v-if="vicons">
      <n-button text>
        <n-icon :component="vicons" :size="sideLength" />
      </n-button>
    </template>
    <template v-else-if="svgComponent">
      <component :is="svgComponent" :width="svgWidth" :height="svgHeight" />
    </template>
  </HoverContainer>
</template>

<script setup lang="ts">
import { headIconSetting } from '@mimic/settings';
import type { Component } from 'vue';

defineProps<{
  svgComponent?: Component;
  vicons?: Component;
  isActive?: boolean;
  tooltip?: string;
}>();

const { hoverColor, activeColor, sideLength } = headIconSetting;
const svgWidth = `${sideLength}px`;
const svgHeight = svgWidth;
</script>

<style scoped></style>
