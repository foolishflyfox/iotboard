<template>
  <div class="h-full border-l-[#eaeaea] border-l-1" :style="{ width: `${rightPanelWidth}px` }">
    <n-tabs
      type="line"
      style="height: 100%; display: flex; flex-direction: column"
      pane-style="flex: 1 1 0%;"
    >
      <template #prefix>
        <span></span>
      </template>
      <n-tab-pane name="appearance" tab="外观" class="h-full" display-directive="show">
        <PropertyPanel />
      </n-tab-pane>
      <n-tab-pane name="data" tab="数据"> 数据配置 </n-tab-pane>
      <n-tab-pane name="event" tab="事件">
        <div>对于带控制/跳转的组件，存在该panel，纯显式类的组件不能配置事件</div>
      </n-tab-pane>
      <n-tab-pane name="animation" tab="动画"> 动画配置，部分动画组件该 tab 可用 </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui';
import { rightPanelWidth } from '@/views/mimic/settings';
import PropertyPanel from './PropertyPanel/index.vue';

defineOptions({
  name: 'MimicRightPanel',
});
</script>

<style scoped>
:deep(.n-tabs-pane-wrapper) {
  height: 100%;
}
</style>
