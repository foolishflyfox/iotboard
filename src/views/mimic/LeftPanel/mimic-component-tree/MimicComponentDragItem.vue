<template>
  <div class="inline-block bg-[#fff8] rounded-lg">
    <img
      :src="imgSrc"
      width="42"
      class="p-4px"
      :style="{ cursor: draggable ? 'grab' : 'not-allowed' }"
      @dragstart="startDragHandler"
      :draggable
    />
    <div class="text-12px text-[#555] font-medium text-center cursor-default w-42px ellipsis-text">
      {{ fileName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDataUrl } from '@/utils';
import { useMimicWorkspaceStatus } from '@mimic/stores';

const props = defineProps<{
  folderPath: string;
  fileName: string;
  hasPreview?: boolean;
}>();

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const { curEditorType } = toRefs(mimicWorkspaceStatus);
const draggable = computed(
  () => !!props.hasPreview && ['display', 'module'].includes(curEditorType.value),
);
const imgSrc = computed(() => {
  return props.hasPreview
    ? `${getDataUrl()}/components/${props.folderPath}/${props.fileName}.png`
    : 'preview/miss.png';
});

function startDragHandler(e: any) {
  console.log('start drag', e);
}
</script>

<style scoped></style>
