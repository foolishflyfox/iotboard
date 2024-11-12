<template>
  <MimicObjectViewer
    editor-type="display"
    @new-display="newDisplay"
    @change-selected-folder="onChangeSelectedFolder"
    ref="mimicObjectViewerRef"
  >
    <div>【{{ currentTargetDirPath }}】图纸显示(不包含文件夹)</div>
  </MimicObjectViewer>
  <QueryDialog
    title="新建"
    v-model:show-modal="showNewDisplayModal"
    :positive-btn-disabled="_.isEmpty(newDisplayName)"
    @positive-click="confirmCreateDisplay"
  >
    <n-space vertical>
      <div class="flex-y-center">
        <div class="w-80px">父文件夹:</div>
        <span>{{ targetFolderPath }}</span>
      </div>
      <div class="flex-y-center">
        <div class="w-80px">图纸名:</div>
        <n-input
          v-model:value="newDisplayName"
          placeholder="请输入图纸名"
          ref="displayNameInputRef"
          size="small"
          class="flex-1"
          @keydown.enter="confirmCreateDisplay"
        />
      </div>
    </n-space>
  </QueryDialog>
</template>

<script setup lang="ts">
import { QueryDialog } from '@/components';
import { MimicObjectViewer } from '../mimic-object-viewer';
import { NInput, NSpace } from 'naive-ui';
import * as _ from 'lodash-es';
import { mimicFileApi } from '@/service/api';
import { initDisplayData } from '@mimic/display';

defineOptions({
  name: 'MimicDisplayTree',
});

const mimicObjectViewerRef = ref<InstanceType<typeof MimicObjectViewer>>();

const currentTargetDirPath = ref<string | null>();
function onChangeSelectedFolder(targetDirPath: string | null) {
  currentTargetDirPath.value = targetDirPath;
}

const targetFolderPath = ref<string>();
const showNewDisplayModal = ref(false);
const displayNameInputRef = ref<InstanceType<typeof NInput>>();
const newDisplayName = ref('');
function newDisplay(dirPath) {
  showNewDisplayModal.value = true;
  targetFolderPath.value = dirPath;
  newDisplayName.value = '';
  nextTick(() => displayNameInputRef.value?.focus());
}
async function confirmCreateDisplay() {
  if (!_.isEmpty(newDisplayName.value)) {
    console.log(`在 ${targetFolderPath.value} 下新建图纸 ${newDisplayName.value}`);
    showNewDisplayModal.value = false;
    await mimicFileApi.createDisplay(
      `${targetFolderPath.value}/${newDisplayName.value}.json`,
      initDisplayData,
    );
    window.$message?.success(`创建图纸 ${targetFolderPath.value}/${newDisplayName.value} 成功`);
  }
}
</script>

<style scoped></style>
