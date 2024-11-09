<template>
  <MimicObjectViewer
    editor-type="component"
    @new-code-component="newCodeComponent"
    @new-graph-component="newGraphComponent"
    @change-selected-folder="onChangeSelectedFolder"
    ref="mimicObjectViewerRef"
  >
    <div>【{{ currentTargetDirPath }}】组件显示(不包含文件夹)</div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import { mimicFileApi } from '@/service/api';
import { MimicObjectViewer } from '../mimic-object-viewer';

defineOptions({
  name: 'MimicComponentTree',
});

const mimicObjectViewerRef = ref<InstanceType<typeof MimicObjectViewer>>();

const currentTargetDirPath = ref<string | null>();
async function onChangeSelectedFolder(targetDirPath: string | null) {
  currentTargetDirPath.value = targetDirPath;
  if (targetDirPath) {
    const files = await mimicFileApi.listFiles('component', targetDirPath);
    console.log('@@@', files);
  }
}

function newCodeComponent(targetDirPath) {
  console.log(`在组件文件夹 ${targetDirPath} 下新建代码组件`);
}

function newGraphComponent(targetDirPath) {
  console.log(`在组件文件夹 ${targetDirPath} 下新建图像组件`);
}
</script>

<style scoped></style>
