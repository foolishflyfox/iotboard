<template>
  <div class="h-full flex-y-center opt-container">
    <!-- 导入时指定必须为 .iot.json 后缀 -->
    <div>导入</div>
    <!-- 支持 png / jpg / svg / gif 导出 -->
    <div>导出</div>
    <HeadVerticalDivider />
    <NSpace size="small">
      <IconContainer
        tooltip="撤销"
        :vicons="UndoRound"
        :disabled="!currentUndoEnable"
        @click="undo"
      />
      <IconContainer
        tooltip="重做"
        :vicons="RedoRound"
        :disabled="!currentRedoEnable"
        @click="redo"
      />
    </NSpace>

    <HeadVerticalDivider />
    <div>格式化</div>
    <div>字体族</div>
    <div>填充</div>
    <div>颜色</div>
    <HeadVerticalDivider />
    <NSpace size="small">
      <IconContainer
        v-for="o of drawingToolOptions"
        :key="o.tooltip"
        :vicons="o.icon"
        :is-active="drawingTool === o.type"
        :tooltip="o.tooltip"
        @click="() => selectDrawingTool(o.type)"
      />
    </NSpace>
    <HeadVerticalDivider />
    <IconContainer :vicons="Erase" tooltip="清除辅助线" @click="clearBaselinse" />
    <HeadVerticalDivider />
  </div>
</template>

<script setup lang="ts">
import HeadVerticalDivider from '../components/HeadVerticalDivider.vue';
import IconContainer from '@mimic/components/IconContainer.vue';
import { Cursor1, Erase } from '@vicons/carbon';
import { Polygon } from '@vicons/tabler';
import { RedoRound, UndoRound } from '@vicons/material';
import { ArrowBounce16Filled, SplitHorizontal16Regular, SplitVertical16Regular } from '@vicons/fluent';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import type { DrawingTool } from '@mimic/types';
import type { Component } from 'vue';
import { NSpace } from 'naive-ui';
import { mimicVar } from '../../global';

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
    icon: SplitHorizontal16Regular,
    type: 'horizontalBase',
    tooltip: '水平辅助线'
  },
  {
    icon: SplitVertical16Regular,
    type: 'verticalBase',
    tooltip: '水平辅助线'
  },
  {
    icon: ArrowBounce16Filled,
    type: 'line',
    tooltip: '折线(可带箭头)',
  },
  {
    icon: Polygon,
    type: 'polygon',
    tooltip: '多边形'
  }
  // {
  //   icon: Pencil,
  //   type: 'pen',
  //   tooltip: '画笔',
  // },
];

function selectDrawingTool(tool: DrawingTool) {
  mimicWorkspaceStatus.selectDrawingTool(tool);
}

function clearBaselinse() {
  mimicVar.baselineManagerContainer.getManager()?.clearAllBaselines();
}

const currentRedoEnable = mimicVar.actionManagerContainer.getCurrentRedoEnable();
const currentUndoEnable = mimicVar.actionManagerContainer.getCurrentUndoEnable();

function undo() {
  mimicVar.actionManagerContainer.getManager()?.undo();
}

function redo() {
  mimicVar.actionManagerContainer.getManager()?.redo();
}
</script>

<style scoped>
.opt-container > div {
  margin: 0 3px;
}
</style>
