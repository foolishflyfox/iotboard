<template>
  <div class="h-full flex-y-center tool-container">
    <HeadVerticalDivider />
    <HeadIconContainer
      :vicons="PageFit16Regular"
      tooltip="窗口自适应大小"
      @click="viewAutoFit"
    />
    <HeadIconContainer
      :svg-component="RulerLine"
      :is-active="rulerVisible"
      tooltip="显示 / 隐藏标尺"
      @click="changeRulerVisible"
    />
  </div>
</template>

<script setup lang="ts">
import RulerLine from '@/components/icons/RulerLine.vue';
import HeadIconContainer from '@mimic/components/HeadIconContainer.vue';
import { useMimicWorkspaceStatus } from '@/views/mimic/stores';
import HeadVerticalDivider from '../components/HeadVerticalDivider.vue';
import { PageFit16Regular } from '@vicons/fluent';
import { viewAutoFit } from '@mimic/utils';

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
