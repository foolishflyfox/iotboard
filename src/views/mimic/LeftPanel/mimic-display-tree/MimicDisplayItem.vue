<template>
  <MimicItem editorType="display" :imgSrc :fileName @delete="deleteDisplay" />
</template>

<script setup lang="ts">
import { getDataUrl } from '@/utils';
import { MimicItem } from '../components';

const props = defineProps<{
  folderPath: string;
  fileName: string;
  hasPreview?: boolean;
}>();

const imgSrc = computed(() => {
  return props.hasPreview
    ? `${getDataUrl()}/display/${props.folderPath}/${props.fileName}.png`
    : 'preview/miss.png';
});

function deleteDisplay() {
  const displayPath = `${props.folderPath}/${props.fileName}`;
  console.log(`删除文件`, displayPath);
}
</script>

<style scoped></style>
