<template>
  <MimicObjectViewer
    editor-type="component"
    @new-code-component="newCodeComponent"
    @new-graph-component="newGraphComponent"
    @change-selected-folder="onChangeSelectedFolder"
    ref="mimicObjectViewerRef"
  >
    <div>
      <n-space v-for="item of currentTargets">
        <mimic-component-drag-item :file-name="item.name" />
      </n-space>
    </div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import { mimicFileApi } from '@/service/api';
import { MimicObjectViewer } from '../mimic-object-viewer';
import { NSpace } from 'naive-ui';
import type { FileItem } from '../../types';
import MimicComponentDragItem from './MimicComponentDragItem.vue';

defineOptions({
  name: 'MimicComponentTree',
});

const mimicObjectViewerRef = ref<InstanceType<typeof MimicObjectViewer>>();

const currentTargetDirPath = ref<string | null>();
const currentTargets = ref<FileItem[]>([]);
async function onChangeSelectedFolder(targetDirPath: string | null) {
  currentTargetDirPath.value = targetDirPath;
  if (targetDirPath) {
    currentTargets.value = await mimicFileApi.listFiles('component', targetDirPath);
    console.log('@@@', currentTargets.value);
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
