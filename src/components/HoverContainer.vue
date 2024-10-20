<template>
  <n-tooltip trigger="hover" :disabled="_.isEmpty(tooltip)">
    <template #trigger>
      <div
        class="current-color hover-color default-style"
        @click="emit('click')"
      >
        <slot></slot>
      </div>
    </template>
    {{ tooltip }}
  </n-tooltip>
</template>

<script setup lang="ts">
import type { Cursor } from '@/types/css';
import * as _ from 'lodash-es';
const props = withDefaults(
  defineProps<{
    tooltip?: string;
    hoverBgColor?: string;
    activeBgColor?: string;
    isActive?: boolean;
    cursor?: Cursor;
  }>(),
  { cursor: 'pointer' },
);

const emit = defineEmits<{
  click: [];
}>();

const currentBgColor = computed(() =>
  props.isActive ? props.activeBgColor : undefined,
);
const currentHoverColor = computed(
  () => currentBgColor.value || props.hoverBgColor,
);
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
