<template>
  <div class="h-full flex-y-center tool-container">
    <IconContainer
      :vicons="Keyboard24Regular"
      tooltip="快捷键"
      @click="() => hotkeyModalVisible = true"
    />
    <HeadVerticalDivider />
    <IconContainer
      :vicons="PageFit16Regular"
      tooltip="窗口自适应大小"
      @click="() => mimicVar.canvasEditor.viewAutoFit()"
    />
    <IconContainer
      :vicons="Ruler"
      tooltip="显示 / 隐藏标尺"
      :is-active="rulerVisible"
      @click="changeRulerVisible"
    />
    <IconContainer
      :vicons="GridDots20Filled"
      tooltip="显示 / 隐藏点阵"
      :is-active="dotMatrixVisible"
      @click="changeDotMatrixVisible"
    />
    <HeadVerticalDivider />
    <IconContainer :vicons="InstallDesktopRound" tooltip="下载PC应用" disabled />
    <IconContainer :vicons="InstallMobileRound" tooltip="下载手机应用" disabled />
    <IconContainer
      :vicons="Send20Regular"
      tooltip="发布"
      :disabled="currentTarget?.editorType !== 'display'"
    />
    <HeadVerticalDivider />
    <IconContainer :vicons="ImageArrowForward24Regular" tooltip="图扑格式转换" />
    <!-- <NPopover trigger="click" ref="toolPopRef">
      <template #trigger>
        <div>
          <IconContainer :vicons="ToolBox" />
        </div>
      </template>
      <IconContainer :vicons="ImageArrowForward24Regular" />
    </NPopover> -->
  </div>
  <HotkeyHelp v-model:show="hotkeyModalVisible" />
</template>

<script setup lang="ts">
import IconContainer from '@mimic/components/IconContainer.vue';
import { useMimicWorkspaceStatus } from '@/views/mimic/stores';
import HeadVerticalDivider from '../components/HeadVerticalDivider.vue';
import { PageFit16Regular, Send20Regular, GridDots20Filled, Keyboard24Regular, ImageArrowForward24Regular } from '@vicons/fluent';
import { InstallDesktopRound, InstallMobileRound } from '@vicons/material';
import { Ruler } from '@vicons/tabler';
import { mimicVar } from '@mimic/global';
import HotkeyHelp from './HotkeyHelp.vue';

defineOptions({
  name: 'HeadTools',
});

const hotkeyModalVisible = ref(false);
const { rulerVisible, dotMatrixVisible, currentTarget } = toRefs(useMimicWorkspaceStatus());

function changeRulerVisible() {
  rulerVisible.value = !rulerVisible.value;
}

function changeDotMatrixVisible() {
  dotMatrixVisible.value = !dotMatrixVisible.value;
}
</script>

<style scoped>
.tool-container > * {
  margin: 0 3px;
}
</style>
