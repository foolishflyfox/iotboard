<template>
  <n-button :type :size>
    <template #icon>
      <n-icon>
        <component :is="icon" />
      </n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import type { Size, Type } from 'naive-ui/es/button/src/interface';
import type { Component } from 'vue';

withDefaults(
  defineProps<{
    icon: Component;
    type?: Type;
    size?: Size;
  }>(),
  {
    type: 'primary',
    size: 'small',
  },
);
</script>

<style scoped></style>
