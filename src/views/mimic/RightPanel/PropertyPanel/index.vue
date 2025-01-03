<template>
  <div class="h-full">
    <NSplit
      direction="vertical"
      :resize-trigger-size="2"
      :default-size="0.65"
      :min="0.4"
      :max="0.9"
    >
      <template #1>
        <NScrollbar style="height: 100%">
          <template v-if="selectedUI === null">
            <!-- <DisplayProperty /> -->
            <div>空</div>
          </template>
          <template v-else-if="_.isArray(selectedUI)">
            <div class="px-1em flex justify-between">
              <NSpace>
                <HeadIconContainer :vicons="AlignHorizontalLeftRound" tooltip="左对齐" />
                <HeadIconContainer :vicons="AlignHorizontalCenterRound" tooltip="水平居中" />
                <HeadIconContainer :vicons="AlignHorizontalRightRound" tooltip="右对齐" />
              </NSpace>
              <NSpace>
                <HeadIconContainer :vicons="AlignVerticalTopRound" tooltip="上对齐" />
                <HeadIconContainer :vicons="AlignVerticalCenterRound" tooltip="垂直居中" />
                <HeadIconContainer :vicons="AlignVerticalBottomRound" tooltip="下对齐" />
              </NSpace>
            </div>
            <hr class="text-#ddd my-5px">
            <div class="px-1em flex justify-between">
              <NSpace>
                <HeadIconContainer :vicons="HorizontalDistributeRound" tooltip="水平等距" />
                <HeadIconContainer :vicons="VerticalDistributeRound" tooltip="垂直等距" />
              </NSpace>
              <NSpace>
                <HeadIconContainer :vicons="AutoFitWidth20Filled" tooltip="等宽" />
                <HeadIconContainer :vicons="AutoFitHeight20Filled" tooltip="等高" />
              </NSpace>
            </div>
          </template>
          <template v-else-if="selectedUI?.id === displayBaseMapId">
            <DisplayProperty />
          </template>
          <template v-else>
            <SingleComponentProperty />
          </template>
        </NScrollbar>
      </template>
      <template #2>
        <div class="flex flex-col h-full">
          <div class="flex-1 ">
            <div class="bg-#ccc" v-for="e of uiLayers" :key="e.id">
              {{ e.id }}
            </div>
          </div>
          <div class="bg-#ddd mb-3px">
            坐标: {{ cursorPos ? `${cursorPos.x.toFixed(3)}, ${cursorPos.y.toFixed(3)}` : '' }}
          </div>
        </div>
      </template>
    </NSplit>
  </div>
</template>

<script setup lang="ts">
import { NSplit, NScrollbar, NSpace } from 'naive-ui';
import * as _ from 'lodash-es';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import DisplayProperty from './DisplayProperty.vue';
import SingleComponentProperty from './SingleComponentProperty.vue';
import { displayBaseMapId } from '@mimic/constant';
import { mimicVar } from '@mimic/global';
import {
  AlignHorizontalLeftRound,
  AlignHorizontalCenterRound,
  AlignHorizontalRightRound,
  AlignVerticalTopRound,
  AlignVerticalCenterRound,
  AlignVerticalBottomRound,
  HorizontalDistributeRound,
  VerticalDistributeRound,
} from '@vicons/material';
import { AutoFitWidth20Filled, AutoFitHeight20Filled } from '@vicons/fluent';
import HeadIconContainer from '@mimic/components/HeadIconContainer.vue';

defineOptions({
  name: 'PropertyPanel',
});

const { selectedUiId } = toRefs(useMimicDisplayStatus());
const { cursorPos } = toRefs(useMimicWorkspaceStatus());

const selectedUI = computed(() => mimicVar.displayEditor.findUiById(selectedUiId.value));

const uiLayers = mimicVar.uiLayerManagerContainer.getCurrentUiLayers();
</script>

<style scoped>
.vertical-hr {
  width: 1px;
  height: 32px;
  transform: rotate(90);
  background-color: #ddd;
  margin: 0 5px;
}
</style>
