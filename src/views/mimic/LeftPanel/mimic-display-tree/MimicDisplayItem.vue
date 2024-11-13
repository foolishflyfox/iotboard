<template>
  <MimicItem :imgSrc :fileName />
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
</script>

<style scoped></style>
