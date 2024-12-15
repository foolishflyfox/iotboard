<template>
  <NTooltip trigger="hover" :disabled="_.isEmpty(tooltip)">
    <template #trigger>
      <div
        class="current-color hover-color default-style"
        :style="{ borderRadius }"
        @click="emit('click')"
      >
        <slot />
      </div>
    </template>
    {{ tooltip }}
  </NTooltip>
</template>

<script setup lang="ts">
import type { Cursor } from '@/types/css';
import * as _ from 'lodash-es';
import { NTooltip } from 'naive-ui';

const props = withDefaults(
  defineProps<{
    tooltip?: string;
    hoverBgColor?: string;
    activeBgColor?: string;
    isActive?: boolean;
    cursor?: Cursor;
    borderRadius?: string;
  }>(),
  { cursor: 'pointer' },
);

const emit = defineEmits<{
  click: [];
}>();

const currentBgColor = computed(() => (props.isActive ? props.activeBgColor : undefined));
const currentHoverColor = computed(() => currentBgColor.value || props.hoverBgColor);
</script>

<style scoped>
.default-style {
  cursor: v-bind(cursor);
}
.hover-color:hover {
  background-color: v-bind(currentHoverColor);
}
.current-color {
  background-color: v-bind(currentBgColor);
}
</style>
