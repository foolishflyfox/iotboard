<template>
  <div class="h-full flex-col" :style="{ width: panelWidth }">
    <!-- <mimic-left-panel-head /> -->
    <div class="flex-1 flex">
      <n-tabs
        placement="left"
        default-value="component"
        size="medium"
        pane-class="bg-[#e8e8e8]"
        pane-style="padding: 5px;"
        :tab-style="{
          width: `${leftPanel.shrinkWidth - 2}px`,
          fontSize: '12px',
          backgroundColor: 'white',
          borderRadius: '12px 0 0 12px',
          border: '1px solid #ddd',
        }"
      >
        <template #prefix>
          <div class="h-30px">
            <n-button
              :focusable="false"
              circle
              @click="isExpandPane = !isExpandPane"
            >
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
              <div>图 纸</div>
            </div>
          </template>
          <DisplayContent />
        </n-tab-pane>
        <n-tab-pane name="component">
          <template #tab>
            <div>
              <n-icon size="26" :component="Components" />
              <div>组 件</div>
            </div>
          </template>
          <MimicComponent />
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
// import MimicLeftPanelHead from './MimicLeftPanelHead.vue';
import DisplayContent from './DisplayContent.vue';
import MimicComponent from './MimicComponent.vue';
import ResourceContent from './ResourceContent.vue';
import { AppGeneric24Filled } from '@vicons/fluent';
import { Components, ChevronsLeft, ChevronsRight } from '@vicons/tabler';
import { ImagesOutline } from '@vicons/ionicons5';
import { leftPanel } from '@/views/mimic/settings';

defineOptions({
  name: 'MimicLeftPanel',
});

const isExpandPane = ref(true);
const panelWidth = computed(
  () =>
    `${isExpandPane.value ? leftPanel.expandWidth : leftPanel.shrinkWidth}px`,
);
</script>

<style scoped></style>
