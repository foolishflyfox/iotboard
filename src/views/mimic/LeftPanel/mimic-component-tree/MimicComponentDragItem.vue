<template>
  <MimicItem :imgSrc :draggable :fileName @dragStart="startDragHandler" />
</template>

<script setup lang="ts">
import { getDataUrl } from '@/utils';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';
import { MimicItem } from '../components';

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
    ? `${getDataUrl()}/component/${props.folderPath}/${props.fileName}.png`
    : 'preview/miss.png';
});

function startDragHandler(e: any) {
  mimicVar.draggingType = 'component';
  mimicVar.draggingTag = `component/${props.folderPath}/${props.fileName}`;
  console.log('start drag', e);
}
</script>

<style scoped></style>
