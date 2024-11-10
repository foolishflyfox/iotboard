<template>
  <div class="inline-block bg-[#fff8] rounded-lg">
    <img
      :src="pngSrc || 'preview/miss.png'"
      width="42"
      class="cursor-grab p-4px"
      @dragstart="startDragHandler"
      :draggable="['display', 'module'].includes(mimicWorkspaceStatus.curEditorType)"
    />
    <div class="text-12px text-[#555] font-medium text-center cursor-default w-42px ellipsis-text">
      {{ fileName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMimicWorkspaceStatus } from '../../stores';

const props = defineProps<{
  fileName: string;
  pngSrc?: string;
}>();

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

function startDragHandler(e: any) {
  console.log('start drag', e);
}
</script>

<style scoped></style>
