<template>
  <MimicObjectViewer
    editor-type="component"
    @new-code-component="clickNewCodeComponent"
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
            @delete="updateCurrentTargets"
          />
        </template>
      </n-space>
    </div>
  </MimicObjectViewer>
  <QueryDialog
    title="新建组件"
    v-model:show-modal="showNewComponentModal"
    :positive-btn-disabled="!newComponentName"
    @positive-click="confirmNewCodeComponent"
  >
    <div class="flex-y-center">
      <span class="mr-10px">组件名:</span>
      <n-input
        ref="newComponentNameInputRef"
        size="small"
        class="flex-1"
        :value="newComponentName"
        @update:value="
          v => {
            newComponentName = _.trim(v);
          }
        "
        @keydown.enter="confirmNewCodeComponent"
      />
    </div>
  </QueryDialog>
</template>

<script setup lang="ts">
import { mimicFileApi } from '@/service/api';
import { MimicObjectViewer } from '../mimic-object-viewer';
import { NSpace, NInput } from 'naive-ui';
import type { FileItem } from '@mimic/types';
import MimicComponentDragItem from './MimicComponentDragItem.vue';
import { componentPathToTag, eventBus } from '@mimic/utils';
import path from 'path-browserify';
import * as _ from 'lodash-es';
import defaultComponentJson from './default-component.json';
import QueryDialog from '@/components/QueryDialog.vue';

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

function updateCurrentTargets() {
  onChangeSelectedFolder(currentTargetDirPath.value);
}

onMounted(() => {
  eventBus.registerComponentUpdateHandler(componentUpdateHandler);
});

onUnmounted(() => {
  eventBus.unregisterComponentUpdateHandler(componentUpdateHandler);
});

const showNewComponentModal = ref(false);
const newComponentName = ref('');
const newComponentNameInputRef = ref<InstanceType<typeof NInput>>();
async function clickNewCodeComponent() {
  newComponentName.value = '';
  showNewComponentModal.value = true;
  nextTick(() => newComponentNameInputRef.value?.focus());
}
async function confirmNewCodeComponent() {
  if (!newComponentName.value) return;
  const componentPath = path.join(currentTargetDirPath.value!, newComponentName.value + '.json');
  const newComponentJson = _.cloneDeep(defaultComponentJson);
  newComponentJson.tag = componentPathToTag(componentPath);
  await mimicFileApi.createComponent(componentPath, newComponentJson);
  showNewComponentModal.value = false;
  updateCurrentTargets();
}

/** 目前不存在图像组件，图像组件通过模块实现 */
function newGraphComponent(targetDirPath) {
  console.log(`在组件文件夹 ${targetDirPath} 下新建图像组件`);
}
</script>

<style scoped></style>
