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
        <template v-for="item of currentTargets">
          <mimic-component-drag-item
            v-if="item"
            :folder-path="currentTargetDirPath!"
            :file-name="item.name"
            :has-preview="item.hasPreview"
            @delete="componentDeleteHandle"
          />
        </template>
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
import { eventBus } from '@mimic/utils';
import path from 'path-browserify';
import * as _ from 'lodash-es';

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

function componentUpdateHandler(tag: string) {
  onChangeSelectedFolder(currentTargetDirPath.value);
  const targetIndex = _.findIndex(
    currentTargets.value,
    e => path.join('component', currentTargetDirPath.value || '', e.name) === tag,
  );
  const preTarget = currentTargets.value[targetIndex];
  currentTargets.value[targetIndex] = { name: '', hasPreview: false };
  nextTick(() => {
    currentTargets.value[targetIndex] = preTarget;
  });
}

function componentDeleteHandle() {
  onChangeSelectedFolder(currentTargetDirPath.value);
}

onMounted(() => {
  eventBus.registerComponentUpdateHandler(componentUpdateHandler);
});

onUnmounted(() => {
  eventBus.unregisterComponentUpdateHandler(componentUpdateHandler);
});

function newCodeComponent(targetDirPath) {
  console.log(`在组件文件夹 ${targetDirPath} 下新建代码组件`);
}

function newGraphComponent(targetDirPath) {
  console.log(`在组件文件夹 ${targetDirPath} 下新建图像组件`);
}
</script>

<style scoped></style>
