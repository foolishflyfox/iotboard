<template>
  <NaiveProvider>
    <RouterView />
  </NaiveProvider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NaiveProvider from '@/views/containers/NaiveProvider.vue';
import '@mimic/utils/proxyData';

function bodyKeydownHandler(e: KeyboardEvent) {
  // 解决颜色面板的输入框中按方向键导致选中的组件被移动的问题
  const focusedElement = document.activeElement;
  if (focusedElement?.classList.contains('n-input__input-el')) {
    e.stopPropagation();
  }
}

onMounted(() => {
  document.body.addEventListener('keydown', bodyKeydownHandler);
});
onUnmounted(() => {
  document.body.removeEventListener('keydown', bodyKeydownHandler);
});
</script>

<style scoped></style>
