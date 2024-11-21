<template>
  <div class="h-full flex-y-center tool-container">
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
    <HeadVerticalDivider />
    <HeadIconContainer :vicons="InstallDesktopRound" tooltip="下载PC应用" />
    <HeadIconContainer :vicons="InstallMobileRound" tooltip="下载手机应用" />
    <HeadIconContainer :vicons="Send20Regular" tooltip="发布" />
  </div>
</template>

<script setup lang="ts">
import HeadIconContainer from '@mimic/components/HeadIconContainer.vue';
import { useMimicWorkspaceStatus } from '@/views/mimic/stores';
import HeadVerticalDivider from '../components/HeadVerticalDivider.vue';
import { PageFit16Regular, Send20Regular } from '@vicons/fluent';
import { InstallDesktopRound, InstallMobileRound } from '@vicons/material';
import { Ruler } from '@vicons/tabler';
import { mimicVar } from '@mimic/global';

defineOptions({
  name: 'HeadTools',
});

const { rulerVisible } = toRefs(useMimicWorkspaceStatus());

function changeRulerVisible() {
  rulerVisible.value = !rulerVisible.value;
}
</script>

<style scoped>
.tool-container > * {
  margin: 0 3px;
}
</style>
