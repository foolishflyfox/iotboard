<template>
  <div class="inline-block bg-[#fff8] rounded-lg">
    <img
      :src="`${componentPath}/${customMeta.name}.png`"
      width="42"
      class="cursor-grab p-4px"
      @dragstart="startDragHandler"
      @error="
        e => {
          (e.target as any).src = `${componentPath}/default.png`;
        }
      "
      :draggable="['display', 'module'].includes(mimicWorkspaceStatus.curEditorType)"
    />
    <div class="text-12px text-[#555] font-medium text-center cursor-default">
      {{ customMeta.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CustomMeta } from '@mimic/utils';
import { mimicVar } from '@mimic/global';
import { useMimicWorkspaceStatus } from '../stores';

const props = defineProps<{
  customMeta: CustomMeta;
}>();

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const componentPath = '/preview/component';

function startDragHandler(e: any) {
  // console.log('start drag', e);
  mimicVar.draggingCustomMeta = props.customMeta;
}
</script>

<style scoped></style>
