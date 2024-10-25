<template>
  <div class="h-full">
    <n-input type="text" round placeholder="搜索组件" size="small">
      <template #suffix>
        <n-icon :component="Search" />
      </template>
    </n-input>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@vicons/ionicons5';
</script>

<style scoped></style>
