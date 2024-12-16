<template>
  <div class="h-full border-l-[#eaeaea] border-l-1" :style="{ width: `${rightPanelWidth}px` }">
    <DisplayCfgPanel v-if="mimicWorkspaceStatus.curEditorType === 'display'" />
    <ModuleCfgPanel v-else-if="mimicWorkspaceStatus.curEditorType === 'module'" />
    <ComponentCfgPanel v-else-if="mimicWorkspaceStatus.curEditorType === 'component'" />
    <template v-else>
      未设置 {{ mimicWorkspaceStatus.curEditorType }} 的配置面板组件
    </template>
  </div>
</template>

<script setup lang="ts">
import { rightPanelWidth } from '@/views/mimic/settings';
import DisplayCfgPanel from './DisplayCfgPanel.vue';
import ModuleCfgPanel from './ModuleCfgPanel.vue';
import ComponentCfgPanel from './component-cfg-panel/index.vue';
import { useMimicWorkspaceStatus } from '../stores';

defineOptions({
  name: 'MimicRightPanel',
});

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
</script>

<style scoped>
:deep(.n-tabs-pane-wrapper) {
  height: 100%;
}
</style>
