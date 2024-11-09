<template>
  <MimicObjectViewer
    editor-type="display"
    @new-display="newDisplay"
    @change-selected-folder="onChangeSelectedFolder"
    ref="mimicObjectViewerRef"
  >
    <div>【{{ currentTargetDirPath }}】图纸显示(不包含文件夹)</div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import { MimicObjectViewer } from '../mimic-object-viewer';

defineOptions({
  name: 'MimicDisplayTree',
});

const mimicObjectViewerRef = ref<InstanceType<typeof MimicObjectViewer>>();

const currentTargetDirPath = ref<string | null>();
function onChangeSelectedFolder(targetDirPath: string | null) {
  currentTargetDirPath.value = targetDirPath;
}

function newDisplay(targetDirPath) {
  console.log(`在 ${targetDirPath} 下新建图纸`);
}
</script>

<style scoped></style>
