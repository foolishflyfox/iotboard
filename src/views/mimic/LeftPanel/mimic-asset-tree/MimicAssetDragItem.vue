<template>
  <div>
    <div>
      <div
        class="text-10px font-bold rounded-t-3px bg-[#eee] inline-block px-3px "
        :style="{ color: typeColor }"
      >
        {{ fileExt }}
      </div>
    </div>
    <MimicItem
      editor-type="asset"
      :img-src
      :draggable
      :file-name
      @delete="deleteAsset"
      @drag-start="assetStartDragHandler"
    />
  </div>
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
const fileExt = computed(() => path.extname(fileName.value).slice(1));
const typeColor = computed(() => {
  if (fileExt.value === 'png') return 'blue';
  else if (fileExt.value === 'svg') return '#ea6140';
  else if (fileExt.value === 'jpg' || fileExt.value === 'jpeg') return 'green';
  return 'black';
});

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
  mimicVar.canvasEditor.draggingType = 'asset';
  mimicVar.canvasEditor.draggingTag = props.imgSrc;
}
</script>

<style scoped></style>
