<template>
  <div>
    <div v-if="false">
      <n-divider>通用属性</n-divider>
      <div>通用属性(多选框)，默认 x/y/width/height</div>
    </div>
    <div>
      <n-divider>自定义属性</n-divider>
      <div>自定义属性配置，是否导出/类型</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NDivider } from 'naive-ui';
</script>

<style scoped>
.n-divider:not(.n-divider--vertical) {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
