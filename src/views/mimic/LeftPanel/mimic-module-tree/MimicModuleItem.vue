<template>
  <MimicItem
    editor-type="module"
    :img-src
    :file-name
    @delete="deleteModule"
    @open="openModule"
  />
</template>

<script setup lang="ts">
import { getDataUrl } from '@/utils';
import { MimicItem } from '../components';
import type { OpenedTarget } from '@mimic/types';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';

const props = defineProps<{
  /** 当前选中的文件夹 */
  folderPath: string;
  /** 文件名 */
  fileName: string;
  /** 是否生成预览图 */
  hasPreview?: boolean;
}>();

const mimicDisplayStatus = useMimicDisplayStatus();
const mimicWorkspaceStatus = useMimicWorkspaceStatus();

function generateModulePath() {
  return `${props.folderPath}/${props.fileName}.json`;
}

const imgSrc = computed(() => {
  return props.hasPreview
    ? `${getDataUrl()}/module/${props.folderPath}/${props.fileName}.png?t`
    : 'preview/miss.png';
});

async function deleteModule() {
  const modulePath = generateModulePath();
  console.log('删除模块', modulePath);
}

async function openModule() {
  const modulePath = generateModulePath();
  // console.log('打开模块', modulePath);
  const openedModule: OpenedTarget = {
    editorType: 'module',
    path: modulePath
  };
  mimicDisplayStatus.selectedUiId = null;
  mimicWorkspaceStatus.addOpenedTarget(openedModule);
}
</script>

<style scoped>

</style>
