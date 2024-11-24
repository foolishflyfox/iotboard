<template>
  <div>
    <div v-if="false">
      <n-divider>通用属性</n-divider>
      <div>通用属性(多选框)，默认 x/y/width/height</div>
    </div>
    <div>
      <n-divider>自定义属性</n-divider>
      <!-- <div>自定义属性配置，是否导出/类型</div> -->
      <n-table :single-line="false" size="small">
        <thead>
          <tr>
            <th>属性</th>
            <th>名称</th>
            <th>类型</th>
            <th>默认值</th>
            <th>组</th>
            <th class="w-70px">操作</th>
          </tr>
        </thead>
      </n-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NDivider, NTable } from 'naive-ui';
</script>

<style scoped>
.n-divider:not(.n-divider--vertical) {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
