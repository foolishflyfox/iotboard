<template>
  <MimicObjectViewer
    editor-type="component"
    @new-code-component="newCodeComponent"
    @new-graph-component="newGraphComponent"
    @change-selected-folder="onChangeSelectedFolder"
    ref="mimicObjectViewerRef"
  >
    <div>
      <n-space>
        <mimic-component-drag-item
          v-for="item of currentTargets"
          :folder-path="currentTargetDirPath!"
          :file-name="item.name"
          :has-preview="item.hasPreview"
        />
      </n-space>
    </div>
  </MimicObjectViewer>
</template>

<script setup lang="ts">
import { mimicFileApi } from '@/service/api';
import { MimicObjectViewer } from '../mimic-object-viewer';
import { NSpace } from 'naive-ui';
import type { FileItem } from '@mimic/types';
import MimicComponentDragItem from './MimicComponentDragItem.vue';

defineOptions({
  name: 'MimicComponentTree',
});

const mimicObjectViewerRef = ref<InstanceType<typeof MimicObjectViewer>>();

const currentTargetDirPath = ref<string | null>(null);
const currentTargets = ref<FileItem[]>([]);
async function onChangeSelectedFolder(targetDirPath: string | null) {
  if (targetDirPath) {
    currentTargets.value = await mimicFileApi.listFiles('component', targetDirPath);
    // 不要将 currentTargetDirPath.value 的赋值放在 currentTargets 前，因为请求后端数据需要时间
    // 会导致对错误图片资源的请求
    currentTargetDirPath.value = targetDirPath;
  } else {
    currentTargets.value = [];
    currentTargetDirPath.value = null;
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
