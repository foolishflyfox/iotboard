<template>
  <HoverContainer
    :hover-bg-color="hasHoverColor ? hoverColor : undefined"
    :is-active="isActive"
    :tooltip
    border-radius="15%"
  >
    <n-button text :focusable="false">
      <template v-if="_.isNil(isActive)">
        <!-- 触发型图标 -->
        <n-icon :component="vicons" :size="sideLength" />
      </template>
      <template v-else>
        <!-- 保持型图标 -->
        <n-icon
          :component="vicons"
          :size="sideLength"
          :color="isActive ? headIconSetting.activeColor : undefined"
        />
      </template>
    </n-button>
  </HoverContainer>
</template>

<script setup lang="ts">
import { headIconSetting } from '@mimic/settings';
import type { Component } from 'vue';
import * as _ from 'lodash-es';

withDefaults(
  defineProps<{
    vicons: Component;
    isActive?: boolean;
    tooltip?: string;
    hasHoverColor?: boolean;
  }>(),
  {
    isActive: undefined,
    hasHoverColor: false,
  },
);

const { hoverColor, activeColor, sideLength } = headIconSetting;
const svgWidth = `${sideLength}px`;
const svgHeight = svgWidth;
</script>

<style scoped></style>
