<template>
  <div class="h-full flex-col" :style="{ width: `${panelAnimateWidth}px` }">
    <!-- <mimic-left-panel-head /> -->
    <div class="flex-1 flex">
      <n-tabs
        placement="left"
        default-value="component"
        size="medium"
        pane-class="bg-[#e8e8e8]"
        pane-style="padding: 5px; z-index: 0"
        :tab-style="{
          width: `${leftPanel.shrinkWidth - 2}px`,
          fontSize: '12px',
          backgroundColor: 'white',
          borderRadius: '12px 0 0 12px',
          border: '1px solid #ddd',
          padding: `6px ${tabPrefixXPadding}px`,
        }"
      >
        <template #prefix>
          <div class="h-30px">
            <n-button :focusable="false" circle @click="isExpandPane = !isExpandPane">
              <template #icon>
                <n-icon size="24">
                  <ChevronsLeft v-if="isExpandPane" />
                  <ChevronsRight v-else />
                </n-icon>
              </template>
            </n-button>
          </div>
        </template>
        <n-tab-pane name="display">
          <template #tab>
            <div>
              <n-icon size="26" :component="AppGeneric24Filled" />
              <div>图纸</div>
            </div>
          </template>
          <DisplayContent />
        </n-tab-pane>
        <n-tab-pane name="module">
          <template #tab>
            <div>
              <n-icon size="26" :component="GroupObjects" />
              <div>模块</div>
            </div>
          </template>
          <ModuleContent />
        </n-tab-pane>
        <n-tab-pane name="component">
          <template #tab>
            <div>
              <n-icon size="26" :component="Components" />
              <div>组件</div>
            </div>
          </template>
          <MimicComponent />
        </n-tab-pane>
        <n-tab-pane name="element">
          <template #tab>
            <div>
              <n-icon size="26" :component="Atom" />
              <div>元素</div>
            </div>
          </template>
          <ElementContent />
        </n-tab-pane>
        <n-tab-pane name="resource">
          <template #tab>
            <div>
              <n-icon size="26" :component="ImagesOutline" />
              <div>资源</div>
            </div>
          </template>
          <ResourceContent />
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTabs, NButton, NIcon, NTabPane } from 'naive-ui';
// import MimicLeftPanelHead from './MimicLeftPanelHead.vue';
import DisplayContent from './DisplayContent.vue';
import ModuleContent from './ModuleContent.vue';
import MimicComponent from './MimicComponent.vue';
import ElementContent from './ElementContent.vue';
import ResourceContent from './ResourceContent.vue';
import { AppGeneric24Filled } from '@vicons/fluent';
import { Components, ChevronsLeft, ChevronsRight, Atom } from '@vicons/tabler';
import { ImagesOutline } from '@vicons/ionicons5';
import { GroupObjects } from '@vicons/carbon';
import { leftPanel } from '@/views/mimic/settings';
import { TransitionPresets, useTransition } from '@vueuse/core';

defineOptions({
  name: 'MimicLeftPanel',
});

const isExpandPane = ref(true);
const calcPanelWidth = () => {
  return isExpandPane.value ? leftPanel.expandWidth : leftPanel.shrinkWidth;
};
const panelWidth = ref(calcPanelWidth());
watchEffect(() => (panelWidth.value = calcPanelWidth()));
// 为面板收缩/展开添加动画
const panelAnimateWidth = useTransition(panelWidth, {
  duration: 100,
  transition: TransitionPresets.linear,
});

// tab、prefix 的 x padding值
const tabPrefixXPadding = 16 - (62 - leftPanel.shrinkWidth) / 2;
</script>

<style scoped>
:deep(.n-tabs-nav--bar-type.n-tabs-nav--left.n-tabs-nav) {
  width: v-bind('`${leftPanel.shrinkWidth}px`');
}
:deep(.n-tabs-nav__prefix) {
  padding-left: v-bind('`${tabPrefixXPadding}px`') !important;
  padding-right: v-bind('`${tabPrefixXPadding}px`') !important;
}
</style>
