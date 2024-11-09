<template>
  <MimicObjectViewer
    editor-type="module"
    @new-module="newModule"
    @change-selected-folder="onChangeSelectedFolder"
  >
    <div>【{{ currentTargetDirPath }}】模块显示(不包含文件夹)</div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import { MimicObjectViewer } from '../mimic-object-viewer';

defineOptions({
  name: 'MimicModuleTree',
});

const currentTargetDirPath = ref<string | null>();
function onChangeSelectedFolder(targetDirPath: string | null) {
  currentTargetDirPath.value = targetDirPath;
}

function newModule(targetDirPath) {
  console.log(`在 ${targetDirPath} 下新建模块`);
}
</script>

<style scoped></style>
