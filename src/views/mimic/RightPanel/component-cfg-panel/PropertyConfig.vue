<template>
  <div class="flex-col h-full">
    <div v-if="false">
      <n-divider>通用属性</n-divider>
      <div>通用属性(多选框)，默认 x/y/width/height</div>
    </div>
    <div class="flex-1 flex-col">
      <n-divider>自定义属性</n-divider>
      <!-- <div>自定义属性配置，是否导出/类型</div> -->
      <div class="flex-1">
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
      <div class="mx-10px my-5px">
        <n-space>
          <icon-button :icon="Add12Filled" />
          <icon-button :icon="VerticalAlignTopRound" />
          <icon-button :icon="ArrowUpwardRound" />
          <icon-button :icon="ArrowDownwardRound" />
          <icon-button :icon="VerticalAlignBottomRound" />
        </n-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NDivider, NTable, NButton, NSpace, NIcon } from 'naive-ui';
import { Add12Filled } from '@vicons/fluent';
import {
  VerticalAlignBottomRound,
  VerticalAlignTopRound,
  ArrowUpwardRound,
  ArrowDownwardRound,
} from '@vicons/material';
import { IconButton } from '@/components';
</script>

<style scoped>
.n-divider:not(.n-divider--vertical) {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
