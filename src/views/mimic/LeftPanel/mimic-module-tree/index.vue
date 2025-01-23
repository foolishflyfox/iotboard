<template>
  <MimicObjectViewer
    editor-type="module"
    @new-module="newModule"
    @change-selected-folder="onChangeSelectedFolder"
    ref="mimicObjectViewerRef"
  >
    <!-- <div>【{{ currentTargetDirPath }}】模块显示(不包含文件夹)</div> -->
    <div>
      <NSpace>
        <MimicModuleItem
          class="h-62px"
          v-for="item in currentTargets"
          :key="item.name"
          :folder-path="currentTargetDirPath!"
          :file-name="item.name"
          :has-preview="item.hasPreview"
          @after-delete="updateCurrentTargets"
        />
      </NSpace>
    </div>
  </MimicObjectViewer>
  <QueryDialog
    title="新建模块"
    v-model:show-modal="showNewModuleModal"
    :positive-btn-disabled="_.isEmpty(newModuleName)"
    @positive-click="confirmCreateModule"
  >
    <NSpace vertical>
      <div class="flex-y-center">
        <div class="w-80px">
          父文件夹:
        </div>
        <span>{{ targetFolderPath }}</span>
      </div>
      <div class="flex-y-center">
        <div class="w-80px">
          模块名:
        </div>
        <NInput
          v-model:value="newModuleName"
          placeholder="请输入模块名"
          ref="moduleNameInputRef"
          size="small"
          class="flex-1"
          @keydown.enter="confirmCreateModule"
        />
      </div>
    </NSpace>
  </QueryDialog>
</template>

<script setup lang="ts">
import { mimicFileApi } from '@/service/api';
import { MimicObjectViewer } from '../mimic-object-viewer';
import { QueryDialog } from '@/components';
import * as _ from 'lodash-es';
import { NInput, NSpace } from 'naive-ui';
import type { FileItem, ModuleData } from '@mimic/types';
import MimicModuleItem from './MimicModuleItem.vue';
import { useMimicWorkspaceStatus } from '@mimic/stores';

defineOptions({
  name: 'MimicModuleTree',
});

const mimicObjectViewerRef = ref<InstanceType<typeof MimicObjectViewer>>();
const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const moduleNameInputRef = ref<InstanceType<typeof NInput>>();
const showNewModuleModal = ref(false);
const newModuleName = ref('');
const targetFolderPath = ref('');

const currentTargetDirPath = ref<string | null>();
const currentTargets = ref<FileItem[]>();

async function updateCurrentTargets() {
  if (currentTargetDirPath.value) {
    currentTargets.value = await mimicFileApi.listFiles('module', currentTargetDirPath.value);
    mimicObjectViewerRef.value?.updateFileTreeNodes();
  }
}

function onChangeSelectedFolder(targetDirPath: string | null) {
  if (targetDirPath) {
    currentTargetDirPath.value = targetDirPath;
    updateCurrentTargets();
  } else {
    currentTargetDirPath.value = null;
    currentTargets.value = [];
  }
}

function newModule(targetDirPath) {
  showNewModuleModal.value = true;
  targetFolderPath.value = targetDirPath;
  // console.log(`在 ${targetDirPath} 下新建模块`);
  newModuleName.value = '';
  nextTick(() => moduleNameInputRef.value?.focus());
}

async function confirmCreateModule() {
  if (!_.isEmpty(newModuleName.value)) {
    showNewModuleModal.value = false;
    const modulePath = `${targetFolderPath.value}/${newModuleName.value}.json`;
    const initModuleData: ModuleData = { children: [] };
    await mimicFileApi.createModule(modulePath, initModuleData);
    window.$message?.success(`新建模块 ${modulePath} 成功`);
    if (currentTargetDirPath.value === targetFolderPath.value) {
      updateCurrentTargets();
    }
    mimicWorkspaceStatus.addOpenedTarget({ editorType: 'module', path: modulePath });
  }
}
</script>

<style scoped></style>
