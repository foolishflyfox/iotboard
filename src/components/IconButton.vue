<template>
  <NButton :type :size :text>
    <template #icon>
      <NIcon>
        <component :is="icon" />
      </NIcon>
    </template>
  </NButton>
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
    text?: boolean;
  }>(),
  {
    type: 'primary',
    size: 'small',
    text: false,
  },
);
</script>

<style scoped></style>
