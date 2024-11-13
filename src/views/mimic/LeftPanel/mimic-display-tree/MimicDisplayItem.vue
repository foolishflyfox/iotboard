<template>
  <MimicItem editorType="display" :imgSrc :fileName @delete="deleteDisplay" @open="openDisplay" />
</template>

<script setup lang="ts">
import { getDataUrl } from '@/utils';
import { MimicItem } from '../components';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import type { OpenedTarget } from '@mimic/types';

const props = defineProps<{
  folderPath: string;
  fileName: string;
  hasPreview?: boolean;
}>();

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const imgSrc = computed(() => {
  return props.hasPreview
    ? `${getDataUrl()}/display/${props.folderPath}/${props.fileName}.png`
    : 'preview/miss.png';
});

function deleteDisplay() {
  const displayPath = `${props.folderPath}/${props.fileName}`;
  console.log(`删除文件`, displayPath);
}

function openDisplay() {
  const displayPath = `${props.folderPath}/${props.fileName}`;
  const openedDisplay: OpenedTarget = {
    editorType: 'display',
    path: displayPath,
  };
  mimicWorkspaceStatus.addOpenedTarget(openedDisplay);
}
</script>

<style scoped></style>
