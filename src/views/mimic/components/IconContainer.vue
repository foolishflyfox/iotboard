<template>
  <HoverContainer
    :hover-bg-color="hasHoverColor ? hoverColor : undefined"
    :is-active="isActive"
    :tooltip
    :cursor="disabled ? 'not-allowed' : undefined"
    border-radius="15%"
  >
    <NButton text :focusable="false" :disabled>
      <template v-if="_.isNil(isActive)">
        <!-- 触发型图标 -->
        <NIcon :component="vicons" :size="size || sideLength" />
      </template>
      <template v-else>
        <!-- 保持型图标 -->
        <NIcon
          :component="vicons"
          :size="sideLength"
          :color="isActive ? headIconSetting.activeColor : undefined"
        />
      </template>
    </NButton>
  </HoverContainer>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { HoverContainer } from '@/components';
import { headIconSetting } from '@mimic/settings';
import type { Component } from 'vue';
import * as _ from 'lodash-es';

const props = withDefaults(
  defineProps<{
    vicons: Component;
    isActive?: boolean;
    disabled?: boolean;
    tooltip?: string;
    hasHoverColor?: boolean;
    size?: number;
  }>(),
  {
    isActive: undefined,
    hasHoverColor: false,
    disabled: false
  },
);

const { hoverColor, activeColor, sideLength } = headIconSetting;
// const svgWidth = computed(() => `${props.size || sideLength}px`);
// const svgHeight = svgWidth;
</script>

<style scoped></style>
