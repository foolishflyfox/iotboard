<template>
  <HoverContainer
    :hover-bg-color="headIconSetting.hoverColor"
    :active-bg-color="headIconSetting.activeColor"
    :is-active="isActive"
  >
    <component :is="svgComponent" width="24px" height="24px" />
  </HoverContainer>
</template>

<script setup lang="ts">
import { headIconSetting } from '@mimic/settings';
import type { Component } from 'vue';

defineProps<{
  svgComponent: Component;
  isActive?: boolean;
}>();
</script>

<style scoped></style>
