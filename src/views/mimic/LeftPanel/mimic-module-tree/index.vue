<template>
  <MimicObjectViewer
    editor-type="module"
    :fileTreeNodes
    @new-folder="newFolder"
    @new-module="newModule"
    @rename-folder="renameFolder"
    @delete-folder="deleteFolder"
  >
    <div>模块显示(不包含文件夹)</div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import type { FileTreeNode } from '@mimic/types';
import { MimicObjectViewer } from '../mimic-object-viewer';

/** 后端返回的树 */
const fileTreeNodes: FileTreeNode[] = [
  {
    name: '基础模块',
    children: [],
  },
  {
    name: '工业模块',
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
  console.log(`在 ${targetDirPath} 下新建模块文件夹 ${newFolderName}`);
}

function newModule(targetDirPath) {
  console.log(`在 ${targetDirPath} 下新建模块`);
}

function renameFolder(targetDirPath, newFolderName) {
  console.log(`重命名模块文件夹 ${targetDirPath} 为 ${newFolderName}`);
}

function deleteFolder(targetDirPath) {
  console.log(`删除模块文件夹 ${targetDirPath}`);
}
</script>

<style scoped></style>
