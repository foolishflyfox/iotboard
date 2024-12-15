<template>
  <NTabs
    type="line"
    style="height: 100%; display: flex; flex-direction: column"
    pane-style="flex: 1 1 0%;"
  >
    <template #prefix>
      <span />
    </template>
    <NTabPane name="appearance" tab="外观" class="h-full" display-directive="show">
      <PropertyPanel />
    </NTabPane>
    <NTabPane name="data" tab="数据">
      数据配置
    </NTabPane>
    <NTabPane name="event" tab="事件">
      <div>对于带控制/跳转的组件，存在该panel，纯显式类的组件不能配置事件</div>
    </NTabPane>
    <NTabPane name="animation" tab="动画">
      动画配置，部分动画组件该 tab 可用
    </NTabPane>
  </NTabs>
</template>

<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui';
import PropertyPanel from './PropertyPanel/index.vue';
</script>

<style scoped></style>
