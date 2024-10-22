<template>
  <div class="bg-green-400" :style="{ width: `${leftPanel.tabWidth}px` }">
    <div>缩/展</div>
  </div>
</template>

<script setup lang="ts">
import { leftPanel } from '@mimic/settings';
</script>

<style scoped></style>
