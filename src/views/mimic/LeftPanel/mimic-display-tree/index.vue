<template>
  <MimicObjectViewer
    editor-type="display"
    @new-display="newDisplay"
    @change-selected-folder="onChangeSelectedFolder"
    ref="mimicObjectViewerRef"
  >
    <!-- <div>【{{ currentTargetDirPath }}】图纸显示(不包含文件夹)</div> -->
    <div>
      <NSpace>
        <MimicDisplayItem
          class="h-62px"
          v-for="item of currentTargets"
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
    title="新建图纸"
    v-model:show-modal="showNewDisplayModal"
    :positive-btn-disabled="_.isEmpty(newDisplayName)"
    @positive-click="confirmCreateDisplay"
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
          图纸名:
        </div>
        <NInput
          v-model:value="newDisplayName"
          placeholder="请输入图纸名"
          ref="displayNameInputRef"
          size="small"
          class="flex-1"
          @keydown.enter="confirmCreateDisplay"
        />
      </div>
    </NSpace>
  </QueryDialog>
</template>

<script setup lang="ts">
import { QueryDialog } from '@/components';
import { MimicObjectViewer } from '../mimic-object-viewer';
import { NInput, NSpace } from 'naive-ui';
import * as _ from 'lodash-es';
import { mimicFileApi } from '@/service/api';
import { initDisplayData } from '@mimic/display';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import MimicDisplayItem from './MimicDisplayItem.vue';
import type { FileItem } from '@mimic/types';
import { mimicDisplayTreeExpose } from './expose';
import * as path from 'pathe';

defineOptions({
  name: 'MimicDisplayTree',
});

const mimicObjectViewerRef = ref<InstanceType<typeof MimicObjectViewer>>();
const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const currentTargetDirPath = ref<string | null>();
const currentTargets = ref<FileItem[]>();

async function updateCurrentTargets() {
  if (currentTargetDirPath.value) {
    currentTargets.value = await mimicFileApi.listFiles('display', currentTargetDirPath.value);
    mimicObjectViewerRef.value?.updateFileTreeNodes();
  }
}
async function onChangeSelectedFolder(targetDirPath: string | null) {
  currentTargets.value = [];
  if (targetDirPath) {
    currentTargetDirPath.value = targetDirPath;
    updateCurrentTargets();
  } else {
    currentTargetDirPath.value = null;
  }
}

const targetFolderPath = ref<string>();
const showNewDisplayModal = ref(false);
const displayNameInputRef = ref<InstanceType<typeof NInput>>();
const newDisplayName = ref('');
function newDisplay(dirPath: string) {
  showNewDisplayModal.value = true;
  targetFolderPath.value = dirPath;
  newDisplayName.value = '';
  nextTick(() => displayNameInputRef.value?.focus());
}
async function confirmCreateDisplay() {
  if (!_.isEmpty(newDisplayName.value)) {
    // console.log(`在 ${targetFolderPath.value} 下新建图纸 ${newDisplayName.value}`);
    showNewDisplayModal.value = false;
    const displayPath = `${targetFolderPath.value}/${newDisplayName.value}.json`;
    await mimicFileApi.createDisplay(displayPath, initDisplayData);
    window.$message?.success(`创建图纸 ${displayPath} 成功`);
    if (currentTargetDirPath.value === targetFolderPath.value) {
      // 更新显示内容
      updateCurrentTargets();
    }
    mimicWorkspaceStatus.addOpenedTarget({ editorType: 'display', path: displayPath });
  }
}

mimicDisplayTreeExpose.updateDisplayPreview = (displayPath: string) => {
  if (currentTargets.value?.length) {
    for (const t of currentTargets.value) {
      if (`${path.join(currentTargetDirPath.value, t.name)}.json` === displayPath) {
        t.hasPreview = false;
        nextTick(() => {
          t.hasPreview = true;
        });
      }
    }
  }
};
</script>

<style scoped></style>
