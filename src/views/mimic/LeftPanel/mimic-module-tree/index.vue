<template>
  <MimicObjectViewer
    editor-type="module"
    @new-module="newModule"
    @change-selected-folder="onChangeSelectedFolder"
  >
    <div>【{{ currentTargetDirPath }}】模块显示(不包含文件夹)</div>
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
          父文件夹: |{{ _.isEmpty(newModuleName) }}|
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
import { MimicObjectViewer } from '../mimic-object-viewer';
import { QueryDialog } from '@/components';
import * as _ from 'lodash-es';
import { NInput, NSpace } from 'naive-ui';
import * as path from 'pathe';

defineOptions({
  name: 'MimicModuleTree',
});

const moduleNameInputRef = ref<InstanceType<typeof NInput>>();
const showNewModuleModal = ref(false);
const newModuleName = ref('');
const targetFolderPath = ref('');

const currentTargetDirPath = ref<string | null>();
function onChangeSelectedFolder(targetDirPath: string | null) {
  currentTargetDirPath.value = targetDirPath;
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
    const modulePath = path.join(targetFolderPath.value, newModuleName.value);
    console.log('新建模块', modulePath);
    newModuleName.value = '';
  }
}
</script>

<style scoped></style>
