<template>
  <div class="flex-y-center">
    <NIcon size="22">
      <component :is="icon" />
    </NIcon>
    <div class="ml-0.6em">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { NIcon } from 'naive-ui';

defineProps<{
  icon: Component;
  label: string;
}>();
</script>

<style scoped></style>
