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

const props = defineProps<{
  /** 当前选中的文件夹 */
  folderPath: string;
  /** 文件名 */
  fileName: string;
  /** 是否生成预览图 */
  hasPreview?: boolean;
}>();

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
  console.log('打开模块', modulePath);
}
</script>

<style scoped>

</style>
