<template>
  <MimicItem
    editorType="component"
    :imgSrc
    :draggable
    :fileName
    @dragStart="startDragHandler"
    @open="openComponent"
    @delete="deleteComponent"
  />
</template>

<script setup lang="ts">
import { getDataUrl } from '@/utils';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';
import { MimicItem } from '../components';
import type { OpenedTarget } from '@mimic/types';
import { mimicFileApi } from '@/service/api';

const props = defineProps<{
  folderPath: string;
  fileName: string;
  hasPreview?: boolean;
}>();

const emit = defineEmits<{
  delete: [];
}>();

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const { curEditorType } = toRefs(mimicWorkspaceStatus);
const draggable = computed(() => {
  if (curEditorType.value) {
    return !!props.hasPreview && ['display', 'module'].includes(curEditorType.value);
  } else {
    return false;
  }
});
const imgSrc = computed(() => {
  return props.hasPreview
    ? `${getDataUrl()}/component/${props.folderPath}/${props.fileName}.png`
    : 'preview/miss.png';
});

function startDragHandler(e: any) {
  mimicVar.displayEditor.draggingType = 'component';
  mimicVar.displayEditor.draggingTag = `component/${props.folderPath}/${props.fileName}`;
  console.log('start drag', e);
}

function openComponent() {
  const componentPath = `${props.folderPath}/${props.fileName}.json`;
  const openedTarget: OpenedTarget = {
    editorType: 'component',
    path: componentPath,
  };
  mimicWorkspaceStatus.addOpenedTarget(openedTarget);
}

async function deleteComponent() {
  const componentPath = `${props.folderPath}/${props.fileName}.json`;
  // console.log(`待删除组件 ${componentPath}`);
  await mimicFileApi.deleteComponent(componentPath);
  emit('delete');
}
</script>

<style scoped></style>
