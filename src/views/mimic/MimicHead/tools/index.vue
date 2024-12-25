<template>
  <div class="h-full flex-y-center tool-container">
    <HeadIconContainer
      :vicons="Keyboard24Regular"
      tooltip="快捷键"
      @click="() => hotkeyModalVisible = true"
    />
    <HeadVerticalDivider />
    <HeadIconContainer
      :vicons="PageFit16Regular"
      tooltip="窗口自适应大小"
      @click="() => mimicVar.displayEditor.viewAutoFit()"
    />
    <HeadIconContainer
      :vicons="Ruler"
      tooltip="显示 / 隐藏标尺"
      :is-active="rulerVisible"
      @click="changeRulerVisible"
    />
    <HeadIconContainer
      :vicons="GridDots20Filled"
      tooltip="显示 / 隐藏点阵"
      :is-active="dotMatrixVisible"
      @click="changeDotMatrixVisible"
    />
    <HeadVerticalDivider />
    <HeadIconContainer :vicons="InstallDesktopRound" tooltip="下载PC应用" cursor="not-allowed" />
    <HeadIconContainer :vicons="InstallMobileRound" tooltip="下载手机应用" cursor="not-allowed" />
    <HeadIconContainer :vicons="Send20Regular" tooltip="发布" cursor="not-allowed" />
  </div>
  <HotkeyHelp v-model:show="hotkeyModalVisible" />
</template>

<script setup lang="ts">
import HeadIconContainer from '@mimic/components/HeadIconContainer.vue';
import { useMimicWorkspaceStatus } from '@/views/mimic/stores';
import HeadVerticalDivider from '../components/HeadVerticalDivider.vue';
import { PageFit16Regular, Send20Regular, GridDots20Filled, Keyboard24Regular } from '@vicons/fluent';
import { InstallDesktopRound, InstallMobileRound } from '@vicons/material';
import { Ruler } from '@vicons/tabler';
import { mimicVar } from '@mimic/global';
import HotkeyHelp from './HotkeyHelp.vue';

defineOptions({
  name: 'HeadTools',
});

const hotkeyModalVisible = ref(false);
const { rulerVisible, dotMatrixVisible } = toRefs(useMimicWorkspaceStatus());

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
