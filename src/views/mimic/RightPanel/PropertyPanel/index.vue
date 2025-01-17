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
                <IconContainer
                  :vicons="AlignHorizontalLeftRound" tooltip="左对齐"
                  @click="alignHorizontalLeft"
                />
                <IconContainer
                  :vicons="AlignHorizontalCenterRound" tooltip="水平居中"
                  @click="alignHorizontalCenter"
                />
                <IconContainer
                  :vicons="AlignHorizontalRightRound" tooltip="右对齐"
                  @click="alignHorizontalRight"
                />
              </NSpace>
              <NSpace>
                <IconContainer
                  :vicons="AlignVerticalTopRound" tooltip="上对齐"
                  @click="alignVerticalTop"
                />
                <IconContainer
                  :vicons="AlignVerticalCenterRound" tooltip="垂直居中"
                  @click="alignVerticalCenter"
                />
                <IconContainer
                  :vicons="AlignVerticalBottomRound" tooltip="下对齐"
                  @click="alignVerticalBottom"
                />
              </NSpace>
            </div>
            <hr class="text-#ddd my-5px">
            <div class="px-1em flex justify-between">
              <NSpace>
                <IconContainer
                  :vicons="HorizontalDistributeRound" tooltip="水平等距"
                  @click="horizontalDistribute"
                />
                <IconContainer
                  :vicons="VerticalDistributeRound" tooltip="垂直等距"
                  @click="verticalDistribute"
                />
              </NSpace>
              <NSpace>
                <IconContainer
                  :vicons="AutoFitWidth20Filled" tooltip="等宽"
                  @click="setSameWidth"
                />
                <IconContainer
                  :vicons="AutoFitHeight20Filled" tooltip="等高"
                  @click="setSameHeight"
                />
              </NSpace>
            </div>
          </template>
          <!-- 如果使用 v-else-if / v-else 会存在如下问题 -->
          <!-- 第一步. 选中元素A; 2. 选中底图; 3. 选中元素A; 此时，元素A的属性配置将不能配置 -->
          <!-- 初步怀疑是 vue 的什么机制导致的，因为元素的 id 没变，导致的缓存不能触发元素渲染 -->
          <!-- <template v-else-if="selectedUI?.id === displayBaseMapId">
            <DisplayProperty />
          </template> -->
          <template v-else>
            <DisplayProperty v-show="selectedUI?.id === displayBaseMapId" />
            <SingleComponentProperty v-show="selectedUI?.id !== displayBaseMapId" />
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
                class="mb-1px flex flex-y-center cursor-pointer hover:bg-#0bf8 justify-between"
                :style="{ backgroundColor: selectedUiId === e.id ? '#E3F0AF' : '#ddd' }"
                @click.capture="clickUiLayer(e)"
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
                <NSpace :size="5" class="mr-5px">
                  <IconContainer v-if="e.visible" :vicons="Eye" :size="18" disabled />
                  <IconContainer v-else :vicons="EyeOff" :size="18" disabled />
                  <IconContainer v-if="e.locked" :vicons="Lock" :size="18" @click="unlock" />
                  <IconContainer v-else :vicons="LockOpen" :size="18" @click="lock" />
                </NSpace>
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
import IconContainer from '@mimic/components/IconContainer.vue';
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
import { getElementPreview } from '@mimic/utils';
import { getDataUrl } from '@/utils';
import { Lock, LockOpen } from '@vicons/tabler';
import { Eye, EyeOff } from '@vicons/ionicons5';

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
  console.log('click ui layer');
}

function lock() {
  mimicVar.displayEditor.app?.editor.lock();
  useMimicWorkspaceStatus().setCurrentDisplayUnsave();
}
function unlock() {
  mimicVar.displayEditor.app?.editor.unlock();
  useMimicWorkspaceStatus().setCurrentDisplayUnsave();
}

function alignHorizontalLeft() {
  const selectedUis = mimicVar.displayEditor.app?.editor.list;
  if (selectedUis && selectedUis.length > 1) {
    let minX = selectedUis[0].x!;
    for (let i = 1; i < selectedUis.length; ++i) {
      minX = Math.min(minX, selectedUis[i].x!);
    }
    selectedUis.forEach(e => e.x = minX);
  }
}

function alignHorizontalCenter() {
  const selectedUis = mimicVar.displayEditor.app?.editor.list;
  if (selectedUis && selectedUis.length > 1) {
    let minX = selectedUis[0].x!;
    let maxX = selectedUis[0].x! + selectedUis[0].width!;
    for (let i = 1; i < selectedUis.length; ++i) {
      minX = Math.min(minX, selectedUis[i].x!);
      maxX = Math.max(maxX, selectedUis[i].x! + selectedUis[i].width!);
    }
    const centerX = (minX + maxX) / 2;
    selectedUis.forEach(e => e.x = centerX - e.width! / 2);
  }
}

function alignHorizontalRight() {
  const selectedUis = mimicVar.displayEditor.app?.editor.list;
  if (selectedUis && selectedUis.length > 1) {
    let maxX = selectedUis[0].x! + selectedUis[0].width!;
    for (let i = 1; i < selectedUis.length; ++i) {
      maxX = Math.max(maxX, selectedUis[i].x! + selectedUis[i].width!);
    }
    selectedUis.forEach(e => e.x = maxX - e.width!);
  }
}

function alignVerticalTop() {
  const selectedUis = mimicVar.displayEditor.app?.editor.list;
  if (selectedUis && selectedUis.length > 1) {
    let minY = selectedUis[0].y!;
    for (let i = 1; i < selectedUis.length; ++i) {
      minY = Math.min(minY, selectedUis[i].y!);
    }
    selectedUis.forEach(e => e.y = minY);
  }
}

function alignVerticalCenter() {
  const selectedUis = mimicVar.displayEditor.app?.editor.list;
  if (selectedUis && selectedUis.length > 1) {
    let minY = selectedUis[0].y!;
    let maxY = selectedUis[0].y! + selectedUis[0].height!;
    for (let i = 1; i < selectedUis.length; ++i) {
      minY = Math.min(minY, selectedUis[i].y!);
      maxY = Math.max(maxY, selectedUis[i].y! + selectedUis[i].height!);
    }
    const centerY = (minY + maxY) / 2;
    selectedUis.forEach(e => e.y = centerY - e.height! / 2);
  }
}

function alignVerticalBottom() {
  const selectedUis = mimicVar.displayEditor.app?.editor.list;
  if (selectedUis && selectedUis.length > 1) {
    let maxY = selectedUis[0].y! + selectedUis[0].height!;
    for (let i = 1; i < selectedUis.length; ++i) {
      maxY = Math.max(maxY, selectedUis[i].y! + selectedUis[i].height!);
    }
    selectedUis.forEach(e => e.y = maxY - e.height!);
  }
}
/** 设置元素间的间距相等 */
function horizontalDistribute() {
  const selectedUis = mimicVar.displayEditor.app?.editor.list;
  if (selectedUis && selectedUis.length > 2) {
    let minX = selectedUis[0].x!;
    let maxX = selectedUis[0].x! + selectedUis[0].width!;
    let widthSum = selectedUis[0].width!;
    for (let i = 1; i < selectedUis.length; ++i) {
      minX = Math.min(minX, selectedUis[i].x!);
      maxX = Math.max(maxX, selectedUis[i].x! + selectedUis[i].width!);
      widthSum += selectedUis[i].width!;
    }
    // 按 x 值从小到大排序
    const sortedUis = _.orderBy(selectedUis, ['x'], ['asc']);
    const interval = (maxX - minX - widthSum) / (selectedUis.length - 1);
    let curX = minX;
    for (let i = 0; i < sortedUis.length; ++i) {
      sortedUis[i].x = curX;
      curX += sortedUis[i].width! + interval;
    }
  }
}

function verticalDistribute() {
  const selectedUis = mimicVar.displayEditor.app?.editor.list;
  if (selectedUis && selectedUis.length > 2) {
    let minY = selectedUis[0].y!;
    let maxY = selectedUis[0].y! + selectedUis[0].height!;
    let heightSum = selectedUis[0].height!;
    for (let i = 1; i < selectedUis.length; ++i) {
      minY = Math.min(minY, selectedUis[i].y!);
      maxY = Math.max(maxY, selectedUis[i].y! + selectedUis[i].height!);
      heightSum += selectedUis[i].height!;
    }
    // 按 y 值从小到大排序
    const sortedUis = _.orderBy(selectedUis, ['y'], ['asc']);
    const interval = (maxY - minY - heightSum) / (selectedUis.length - 1);
    let curY = minY;
    for (let i = 0; i < sortedUis.length; ++i) {
      sortedUis[i].y = curY;
      curY += sortedUis[i].height! + interval;
    }
  }
}

/** 多元素设置同宽，以第一个选中的元素为准 */
function setSameWidth() {
  const selectedUis = mimicVar.displayEditor.app?.editor.list;
  if (selectedUis && selectedUis.length > 1) {
    const width = selectedUis[0].width!;
    selectedUis.forEach(e => e.width = width);
  }
}

/** 多元素设置同高，以第一个选中的元素位置 */
function setSameHeight() {
  const selectedUis = mimicVar.displayEditor.app?.editor.list;
  if (selectedUis && selectedUis.length > 1) {
    const height = selectedUis[0].height!;
    selectedUis.forEach(e => e.height = height);
  }
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
