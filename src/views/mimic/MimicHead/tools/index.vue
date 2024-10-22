<template>
  <div class="h-full flex-y-center tool-container">
    <HeadVerticalDivider />
    <div>均匀分布</div>
    <div>左/中/右对齐</div>
    <HeadVerticalDivider />
    <HeadIconContainer
      :svg-component="RulerLine"
      :is-active="rulerVisible"
      @click="changeRulerVisible"
    />
  </div>
</template>

<script setup lang="ts">
import RulerLine from '@/components/icons/RulerLine.vue';
import HeadIconContainer from '@mimic/components/HeadIconContainer.vue';
import { useMimicWorkspaceStatus } from '@/stores/mimic-workspace-status';
import HeadVerticalDivider from '../components/HeadVerticalDivider.vue';

defineOptions({
  name: 'HeadTools',
});

const { rulerVisible } = toRefs(useMimicWorkspaceStatus());

function changeRulerVisible() {
  rulerVisible.value = !rulerVisible.value;
}
</script>

<style scoped>
.tool-container > div {
  margin: 0 3px;
}
</style>
