<template>
  <NaiveProvider>
    <RouterView />
  </NaiveProvider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NaiveProvider from '@/views/containers/NaiveProvider.vue';
import '@mimic/utils/proxyData';
</script>

<style scoped></style>
