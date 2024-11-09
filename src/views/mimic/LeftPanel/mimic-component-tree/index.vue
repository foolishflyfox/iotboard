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
    ref="mimicObjectViewerRef"
  >
    <div>【{{ currentTargetDirPath }}】组件显示(不包含文件夹)</div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import type { FileTreeNode } from '@mimic/types';
import { MimicObjectViewer } from '../mimic-object-viewer';
import { mimicFileApi } from '@/service/api';
import path from 'path-browserify';

defineOptions({
  name: 'MimicComponentTree',
});

const mimicObjectViewerRef = ref<InstanceType<typeof MimicObjectViewer>>();

/** 后端返回的树 */
const fileTreeNodes: Ref<FileTreeNode[]> = ref([]);

async function updateFileTreeNodes() {
  fileTreeNodes.value = await mimicFileApi.queryTree('component');
}

onMounted(() => {
  updateFileTreeNodes();
});

async function newFolder(targetDirPath: string, newFolderName: string) {
  await mimicFileApi.mkdir('component', targetDirPath, newFolderName);
  window.$message?.success(`创建 ${newFolderName} 成功`);
  await updateFileTreeNodes();
  mimicObjectViewerRef.value?.openFolder(targetDirPath);
}

async function renameFolder(targetDirPath, newFolderName) {
  // console.log(`重命名组件文件夹 ${targetDirPath} 为 ${newFolderName}`);
  await mimicFileApi.renameDir('component', targetDirPath, newFolderName);
  window.$message?.success(`重命名为 ${newFolderName} 成功`);
  mimicObjectViewerRef.value?.changeSelectFolder(
    path.join(path.dirname(targetDirPath), newFolderName),
    targetDirPath,
  );
  await updateFileTreeNodes();
}

async function deleteFolder(targetDirPath) {
  // console.log(`删除组件文件夹 ${targetDirPath}`);
  await mimicFileApi.rmdir('component', targetDirPath);
  window.$message?.success(`删除 ${targetDirPath} 成功`);
  mimicObjectViewerRef.value?.unselectFolder(targetDirPath);
  await updateFileTreeNodes();
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
