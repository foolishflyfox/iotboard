<template>
  <MimicObjectViewer
    editor-type="component"
    :fileTreeNodes
    @new-folder="newFolder"
    @rename-folder="renameFolder"
    @delete-folder="deleteFolder"
    @new-code-component="newCodeComponent"
    @new-graph-component="newGraphComponent"
  >
    <div>组件显示(不包含文件夹)</div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import type { FileTreeNode } from '@mimic/types';
import { MimicObjectViewer } from '../mimic-object-viewer';

defineOptions({
  name: 'MimicComponentTree',
});

/** 后端返回的树 */
const fileTreeNodes: FileTreeNode[] = [
  {
    name: '基础',
    children: [],
  },
  {
    name: '工业',
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
for (let i = 1; i < 50; i++) fileTreeNodes.push({ name: '组件' + i, children: [] });

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
</script>

<style scoped></style>
