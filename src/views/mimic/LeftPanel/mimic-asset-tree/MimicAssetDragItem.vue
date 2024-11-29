<template>
  <MimicItem
    editorType="asset"
    :imgSrc
    :draggable
    :fileName
    @delete="deleteAsset"
    @dragStart="assetStartDragHandler"
  />
</template>

<script setup lang="ts">
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { MimicItem } from '../components';
import * as path from 'pathe';
import { mimicFileApi } from '@/service/api';
import { mimicVar } from '@mimic/global';

const props = defineProps<{
  imgSrc: string;
}>();

const emit = defineEmits<{
  afterDelete: [];
}>();

const fileName = computed(() => path.basename(props.imgSrc));

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const { curEditorType } = toRefs(mimicWorkspaceStatus);

const draggable = computed(() => {
  if (curEditorType.value) {
    return ['display', 'module'].includes(curEditorType.value);
  }
  return false;
});

async function deleteAsset() {
  await mimicFileApi.deleteAsset(props.imgSrc);
  emit('afterDelete');
}

function assetStartDragHandler() {
  mimicVar.displayEditor.draggingType = 'asset';
  mimicVar.displayEditor.draggingTag = props.imgSrc;
}
</script>

<style scoped></style>
