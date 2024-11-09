<template>
  <MimicObjectViewer
    editor-type="display"
    :fileTreeNodes
    @new-folder="newFolder"
    @new-display="newDisplay"
    @rename-folder="renameFolder"
    @delete-folder="deleteFolder"
    @change-selected-folder="onChangeSelectedFolder"
    ref="mimicObjectViewerRef"
  >
    <div>【{{ currentTargetDirPath }}】图纸显示(不包含文件夹)</div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import type { FileTreeNode } from '@mimic/types';
import { MimicObjectViewer } from '../mimic-object-viewer';
import { mimicFileApi } from '@/service/api';
import path from 'path-browserify';

defineOptions({
  name: 'MimicDisplayTree',
});

const mimicObjectViewerRef = ref<InstanceType<typeof MimicObjectViewer>>();

/** 后端返回的树 */
const fileTreeNodes: Ref<FileTreeNode[]> = ref([]);

async function updateFileTreeNodes() {
  fileTreeNodes.value = await mimicFileApi.queryTree('display');
}

onMounted(() => {
  updateFileTreeNodes();
});

async function newFolder(targetDirPath, newFolderName) {
  await mimicFileApi.mkdir('display', targetDirPath, newFolderName);
  window.$message?.success(`创建 ${newFolderName} 成功`);
  await updateFileTreeNodes();
  mimicObjectViewerRef.value?.openFolder(targetDirPath);
}

async function renameFolder(targetDirPath, newFolderName) {
  await mimicFileApi.renameDir('display', targetDirPath, newFolderName);
  window.$message?.success(`重命名为 ${newFolderName} 成功`);
  mimicObjectViewerRef.value?.changeSelectFolder(
    path.join(path.dirname(targetDirPath), newFolderName),
    targetDirPath,
  );
  await updateFileTreeNodes();
}

async function deleteFolder(targetDirPath) {
  await mimicFileApi.rmdir('display', targetDirPath);
  window.$message?.success(`删除 ${targetDirPath} 成功`);
  mimicObjectViewerRef.value?.unselectFolder(targetDirPath);
  await updateFileTreeNodes();
}

const currentTargetDirPath = ref<string | null>();
function onChangeSelectedFolder(targetDirPath: string | null) {
  currentTargetDirPath.value = targetDirPath;
}

function newDisplay(targetDirPath) {
  console.log(`在 ${targetDirPath} 下新建图纸`);
}
</script>

<style scoped></style>
