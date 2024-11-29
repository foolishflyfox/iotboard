<template>
  <MimicItem editorType="asset" :imgSrc :draggable :fileName />
</template>

<script setup lang="ts">
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { MimicItem } from '../components';
import { fileNameWithoutExt, removeExtention } from '@/utils';

const props = defineProps<{
  imgSrc: string;
}>();

const fileName = computed(() => fileNameWithoutExt(props.imgSrc));

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const { curEditorType } = toRefs(mimicWorkspaceStatus);

const draggable = computed(() => {
  if (curEditorType.value) {
    return ['display', 'module'].includes(curEditorType.value);
  }
  return false;
});
</script>

<style scoped></style>
