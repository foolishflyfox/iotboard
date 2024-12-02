<template>
  <div class="h-full flex-y-center opt-container">
    <!-- 导入时指定必须为 .iot.json 后缀 -->
    <div>导入</div>
    <!-- 支持 png / jpg / svg / gif 导出 -->
    <div>导出</div>
    <HeadVerticalDivider />
    <div>撤销</div>
    <div>重做</div>
    <HeadVerticalDivider />
    <div>格式化</div>
    <div>字体族</div>
    <div>填充</div>
    <div>颜色</div>
    <HeadVerticalDivider />
    <HeadIconContainer
      v-for="o of drawingToolOptions"
      :vicons="o.icon"
      :is-active="drawingTool === o.type"
      :tooltip="o.tooltip"
      @click="() => selectDrawingTool(o.type)"
    />
    <HeadVerticalDivider />
    <div>线样式</div>
    <div>线宽</div>
    <HeadVerticalDivider />
  </div>
</template>

<script setup lang="ts">
import HeadVerticalDivider from '../components/HeadVerticalDivider.vue';
import HeadIconContainer from '@mimic/components/HeadIconContainer.vue';
import { Cursor1 } from '@vicons/carbon';
import { Line24Filled } from '@vicons/fluent';
import { Pencil } from '@vicons/tabler';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import type { DrawingTool } from '@mimic/types';
import type { Component } from 'vue';

defineOptions({
  name: 'HeadOperators',
});

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const { drawingTool } = toRefs(mimicWorkspaceStatus);

interface DrawingToolOption {
  icon: Component;
  type: DrawingTool;
  tooltip: string;
}
const drawingToolOptions: DrawingToolOption[] = [
  {
    icon: Cursor1,
    type: 'cursor',
    tooltip: '选择',
  },
  {
    icon: Line24Filled,
    type: 'line',
    tooltip: '线',
  },
  {
    icon: Pencil,
    type: 'pen',
    tooltip: '画笔',
  },
];

function selectDrawingTool(tool: DrawingTool) {
  mimicWorkspaceStatus.selectDrawingTool(tool);
}
</script>

<style scoped>
.opt-container > div {
  margin: 0 3px;
}
</style>
