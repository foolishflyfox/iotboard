<template>
  <MimicObjectViewer
    editor-type="display"
    :fileTreeNodes
    @new-folder="newFolder"
    @new-display="newDisplay"
    @rename-folder="renameFolder"
    @delete-folder="deleteFolder"
  >
    <div>图纸显示(不包含文件夹)</div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import type { FileTreeNode } from '@mimic/types';
import { MimicObjectViewer } from '../mimic-object-viewer';

defineOptions({
  name: 'MimicDisplayTree',
});

/** 后端返回的树 */
const fileTreeNodes: FileTreeNode[] = [
  {
    name: '基础图纸',
    children: [],
  },
  {
    name: '工业图纸',
    children: [
      {
        name: '仪表盘',
        children: [
          {
            name: 'gauge',
          },
        ],
      },
    ],
  },
];

function newFolder(targetDirPath, newFolderName) {
  console.log(`在 ${targetDirPath} 下新建图纸文件夹 ${newFolderName}`);
}

function newDisplay(targetDirPath) {
  console.log(`在 ${targetDirPath} 下新建图纸`);
}

function renameFolder(targetDirPath, newFolderName) {
  console.log(`重命名图纸文件夹 ${targetDirPath} 为 ${newFolderName}`);
}

function deleteFolder(targetDirPath) {
  console.log(`删除图纸文件夹 ${targetDirPath}`);
}
</script>

<style scoped></style>
