<template>
  <MimicItem
    editor-type="display"
    :img-src
    :file-name
    @delete="deleteDisplay"
    @open="openDisplay"
  />
</template>

<script setup lang="ts">
import { getDataUrl } from '@/utils';
import { MimicItem } from '../components';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import type { OpenedTarget } from '@mimic/types';
import { mimicFileApi } from '@/service/api';

const props = defineProps<{
  folderPath: string;
  fileName: string;
  hasPreview?: boolean;
}>();

const emit = defineEmits<{
  afterDelete: [];
}>();

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const mimicDisplayStatus = useMimicDisplayStatus();

const imgSrc = computed(() => {
  return props.hasPreview
    ? `${getDataUrl()}/display/${props.folderPath}/${props.fileName}.png`
    : 'preview/miss.png';
});

async function deleteDisplay() {
  const displayPath = `${props.folderPath}/${props.fileName}.json`;
  // console.log(`删除文件`, displayPath);
  await mimicFileApi.deleteDisplay(displayPath);
  window.$message?.success(`删除 ${props.fileName} 成功`);
  mimicWorkspaceStatus.closeOpenedTarget({ editorType: 'display', path: displayPath });
  emit('afterDelete');
}

async function openDisplay() {
  const displayPath = `${props.folderPath}/${props.fileName}.json`;
  const openedDisplay: OpenedTarget = {
    editorType: 'display',
    path: displayPath,
  };
  mimicDisplayStatus.selectedUiId = null;
  mimicWorkspaceStatus.addOpenedTarget(openedDisplay);
}
</script>

<style scoped></style>
