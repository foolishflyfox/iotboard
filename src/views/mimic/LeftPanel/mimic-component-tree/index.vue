<template>
  <MimicObjectViewer
    editor-type="component"
    :fileTreeNodes
    @new-folder="newFolder"
    @rename-folder="renameFolder"
    @delete-folder="deleteFolder"
    @new-code-component="newCodeComponent"
    @new-graph-component="newGraphComponent"
    @change-selected-folder="onChangeSelectedFolder"
  >
    <div>【{{ currentTargetDirPath }}】组件显示(不包含文件夹)</div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import type { FileTreeNode } from '@mimic/types';
import { MimicObjectViewer } from '../mimic-object-viewer';
import { mimicFileApi } from '@/service/api';

defineOptions({
  name: 'MimicComponentTree',
});

/** 后端返回的树 */
const fileTreeNodes: Ref<FileTreeNode[]> = ref([]);

onMounted(async () => {
  fileTreeNodes.value = await mimicFileApi.queryTree('component');
});

function newFolder(targetDirPath, newFolderName) {
  console.log(`在 ${targetDirPath} 下新建组件文件夹 ${newFolderName}`);
}

function renameFolder(targetDirPath, newFolderName) {
  console.log(`重命名组件文件夹 ${targetDirPath} 为 ${newFolderName}`);
}

function deleteFolder(targetDirPath) {
  console.log(`删除组件文件夹 ${targetDirPath}`);
}

function newCodeComponent(targetDirPath) {
  console.log(`在组件文件夹 ${targetDirPath} 下新建代码组件`);
}

function newGraphComponent(targetDirPath) {
  console.log(`在组件文件夹 ${targetDirPath} 下新建图像组件`);
}

const currentTargetDirPath = ref<string | null>();
function onChangeSelectedFolder(targetDirPath: string | null) {
  currentTargetDirPath.value = targetDirPath;
}
</script>

<style scoped></style>
