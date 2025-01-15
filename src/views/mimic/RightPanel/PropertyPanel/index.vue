<template>
  <!-- 高度计算: 32px 为头部高度， 42px 为 tab 头高度，12px 为 tab 内容的 padding -->
  <div class="h-full xxxx" style="height: calc(100vh - 32px - 42px - 12px)">
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
                <IconContainer :vicons="AlignHorizontalLeftRound" tooltip="左对齐" />
                <IconContainer :vicons="AlignHorizontalCenterRound" tooltip="水平居中" />
                <IconContainer :vicons="AlignHorizontalRightRound" tooltip="右对齐" />
              </NSpace>
              <NSpace>
                <IconContainer :vicons="AlignVerticalTopRound" tooltip="上对齐" />
                <IconContainer :vicons="AlignVerticalCenterRound" tooltip="垂直居中" />
                <IconContainer :vicons="AlignVerticalBottomRound" tooltip="下对齐" />
              </NSpace>
            </div>
            <hr class="text-#ddd my-5px">
            <div class="px-1em flex justify-between">
              <NSpace>
                <IconContainer :vicons="HorizontalDistributeRound" tooltip="水平等距" />
                <IconContainer :vicons="VerticalDistributeRound" tooltip="垂直等距" />
              </NSpace>
              <NSpace>
                <IconContainer :vicons="AutoFitWidth20Filled" tooltip="等宽" />
                <IconContainer :vicons="AutoFitHeight20Filled" tooltip="等高" />
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
        <div class="flex flex-col h-100%">
          <NSpace :size="5">
            <IconContainer
              :vicons="KeyboardArrowUpRound" tooltip="上移" :disabled="!selectedSingleUi"
              @click="() => mimicVar.uiLayerManagerContainer.upward(selectedUiId as string)"
            />
            <IconContainer
              :vicons="KeyboardDoubleArrowUpRound" tooltip="移至顶层" :disabled="!selectedSingleUi"
              @click="() => mimicVar.uiLayerManagerContainer.toTop(selectedUiId as string)"
            />
            <IconContainer
              :vicons="KeyboardArrowDownRound" tooltip="下移" :disabled="!selectedSingleUi"
              @click="() => mimicVar.uiLayerManagerContainer.downward(selectedUiId as string)"
            />
            <IconContainer
              :vicons="KeyboardDoubleArrowDownRound" tooltip="移至底层" :disabled="!selectedSingleUi"
              @click="() => mimicVar.uiLayerManagerContainer.toBottom(selectedUiId as string)"
            />
          </NSpace>
          <div class="flex-1 overflow-auto">
            <template v-for="e of uiLayers.slice().reverse()" :key="e.id">
              <div
                v-if="e.id"
                class="bg-#ddd mb-1px flex flex-y-center cursor-pointer hover:bg-#0bf8"
                :style="{ backgroundColor: selectedUiId === e.id ? '#89ac52' : undefined }"
                @click="clickUiLayer(e)"
              >
                <div class="flex flex-y-center">
                  <div class="bg-#fff text-black font-bold mr-3px">
                    <template v-if="e.tag.startsWith('element:')">
                      <img
                        style="height: 16px"
                        :src="getElementPreview(e.tag.slice('element:'.length))"
                      >
                    </template>
                    <template v-else-if="e.tag.startsWith('component/')">
                      <img style="height: 16px" :src="`${getDataUrl()}/${e.tag}.png`">
                    </template>
                    <template v-else-if="e.tag === 'Group'">
                      <img style="height: 16px" src="/preview/group.png">
                    </template>
                    <template v-else>
                      {{ e.tag }}
                    </template>
                  </div>
                  <div>
                    {{ e.id }}
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div class="bg-#eee mb-3px">
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
import { mimicVar, type UiLayer } from '@mimic/global';
import IconContainer from '@/views/mimic/components/IconContainer.vue';
import {
  AlignHorizontalLeftRound,
  AlignHorizontalCenterRound,
  AlignHorizontalRightRound,
  AlignVerticalTopRound,
  AlignVerticalCenterRound,
  AlignVerticalBottomRound,
  HorizontalDistributeRound,
  VerticalDistributeRound,
  KeyboardArrowUpRound,
  KeyboardDoubleArrowUpRound,
  KeyboardArrowDownRound,
  KeyboardDoubleArrowDownRound
} from '@vicons/material';
import { AutoFitWidth20Filled, AutoFitHeight20Filled } from '@vicons/fluent';
import { getElementPreview } from '../../utils';
import { getDataUrl } from '@/utils';

defineOptions({
  name: 'PropertyPanel',
});

const { selectedUiId } = toRefs(useMimicDisplayStatus());
const { cursorPos } = toRefs(useMimicWorkspaceStatus());

const selectedUI = computed(() => mimicVar.displayEditor.findUiById(selectedUiId.value));
const selectedSingleUi = computed(() => {
  if (!selectedUiId.value) {
    return false;
  } else if (_.isArray(selectedUiId.value)) {
    return false;
  } else if (selectedUiId.value === displayBaseMapId) {
    return false;
  }
  return true;
});

const uiLayers = mimicVar.uiLayerManagerContainer.getCurrentUiLayers();

function clickUiLayer(uiLayer: UiLayer) {
  mimicVar.displayEditor.selectWithId(uiLayer.id);
}
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
