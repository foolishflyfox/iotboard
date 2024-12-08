<template>
  <div class="inline-block bg-[#fff8] rounded-lg flex-col">
    <div class="h-42px flex-y-center">
      <img
        :src="getElementPreview(path)"
        width="42"
        class="cursor-grab p-4px mx-auto"
        @error="
          e => {
            (e.target as any).src = getElementPreview('default');
          }
        "
        :draggable
        @dragstart="startDragElement"
      />
    </div>
    <div class="text-12px text-[#555] font-medium text-center cursor-default">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CustomDragIcon } from '@mimic/types';
import { getElementPreview } from '@mimic/utils';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';

interface ElementItemProp extends CustomDragIcon {}
const props = defineProps<ElementItemProp>();

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const draggable = computed(() => {
  if (['module', 'display'].includes(mimicWorkspaceStatus.curEditorType || '')) {
    return true;
  }
  return false;
});

function startDragElement(e: any) {
  // mimicVar.componentEditor.draggingTag = `${props.type}:${props.path}`;
  mimicVar.displayEditor.draggingType = 'element';
  mimicVar.displayEditor.draggingTag = `${props.type}:${props.path}`;
}
</script>

<style scoped></style>
