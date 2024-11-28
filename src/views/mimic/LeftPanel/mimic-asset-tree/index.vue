<template>
  <MimicObjectViewer
    editor-type="asset"
    @uploadImage="clickUploadImage"
    @change-selected-folder="onChangeSelectedFolder"
  >
    XXX
  </MimicObjectViewer>
  <input
    type="file"
    ref="imageUploadInputRef"
    accept=".png, .jpg, .jpeg, .svg"
    class="hidden"
    @change="uploadImage"
  />
</template>

<script setup lang="ts">
import { mimicFileApi } from '@/service/api';
import { MimicObjectViewer } from '../mimic-object-viewer';
import * as path from 'pathe';

const imageUploadInputRef = ref<HTMLInputElement>();

const currentTargetDirPath = ref<string | null>(null);
async function onChangeSelectedFolder(targetDirPath: string | null) {
  if (targetDirPath) {
    currentTargetDirPath.value = targetDirPath;
  } else {
    currentTargetDirPath.value = null;
  }
}

function clickUploadImage() {
  imageUploadInputRef.value?.click();
}
async function uploadImage() {
  const file = imageUploadInputRef.value?.files?.[0];
  if (file) {
    const imagePath = path.join(currentTargetDirPath.value, file.name);
    console.log('image Blob: ', file);
    await mimicFileApi.uploadAssetImage(imagePath, file);
    console.log('完成图片资源上传');
    imageUploadInputRef.value!.value = '';
  }
}
</script>

<style scoped></style>
