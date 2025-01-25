<template>
  <div :style="{ height: `${studioHeight}px` }" class="px-1px flex border-b-gray-200 border-b-1px">
    <div
      v-for="item of mimicWorkspaceStatus.openedTargets"
      :key="item.path"
      class="fw-500 text-16px mx-5px px-8px rounded-t-lg flex-y-center"
      :style="{ backgroundColor: _.isEqual(item, currentTarget) ? '#00bfffbb' : '#b0b0b0' }"
      @click="changeCurrentTarget(item)"
    >
      <div
        v-if="mimicWorkspaceStatus.unsavedDisplayPaths.has(item.path)"
        class="w-8px h-8px rounded-4 bg-#333 mr-3px"
      />
      <NIcon size="16" class="mr-3px" :component="editorTypeIconDict[item.editorType]" />
      <span class="mr-3px cursor-default">
        {{ path.parse(item.path).name }}
      </span>
      <NIcon size="16" color="#fd4a4e" class="cursor-pointer" @click.stop="closeTarget(item)">
        <CloseFilled />
      </NIcon>
    </div>
  </div>
  <QueryDialog
    title="关闭"
    v-model:show-modal="showUnsavedDisplayDealModal"
    type="warning"
  >
    <template #positive-action>
      <NButton
        v-if="false"
        type="primary"
        size="small"
      >
        保存
      </NButton>
      <NButton
        type="warning"
        size="small"
        @click="() => {
          mimicWorkspaceStatus.closeOpenedTarget(toCloseTarget);
          showUnsavedDisplayDealModal = false;
        }"
      >
        确定
      </NButton>
    </template>
    <div>确定关闭未保存图纸 【{{ toCloseTarget.path }}】？</div>
  </QueryDialog>
</template>

<script setup lang="ts">
import { studioHeight } from '@mimic/settings';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import * as path from 'pathe';
import { CloseFilled } from '@vicons/carbon';
import { ViewModuleRound } from '@vicons/material';
import { ImagesOutline } from '@vicons/ionicons5';
import { NIcon, NButton } from 'naive-ui';
import { AppGeneric24Filled } from '@vicons/fluent';
import type { EditorType, OpenedTarget } from '@mimic/types';
import type { Component } from 'vue';
import { Components } from '@vicons/tabler';
import * as _ from 'lodash-es';
import { QueryDialog } from '@/components';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const { currentTarget } = toRefs(mimicWorkspaceStatus);
const mimicDisplayStatus = useMimicDisplayStatus();
const editorTypeIconDict: Record<EditorType, Component> = {
  display: AppGeneric24Filled,
  module: ViewModuleRound,
  component: Components,
  asset: ImagesOutline,
};

function changeCurrentTarget(openedTarget: OpenedTarget) {
  mimicWorkspaceStatus.setCurrentTaget(openedTarget);
  mimicDisplayStatus.selectedUiId = null;
}

const showUnsavedDisplayDealModal = ref(false);

let toCloseTarget: OpenedTarget;
function closeTarget(openedTarget: OpenedTarget) {
  if (mimicWorkspaceStatus.unsavedDisplayPaths.has(openedTarget.path)) {
    showUnsavedDisplayDealModal.value = true;
    toCloseTarget = openedTarget;
  } else {
    mimicWorkspaceStatus.closeOpenedTarget(openedTarget);
  }
}

function closeCurrentTabHandler(event: BeforeUnloadEvent) {
  if (mimicWorkspaceStatus.unsavedDisplayPaths.size > 0) {
    const message = '您有未保存的更改，确定要离开吗？';
    event.returnValue = message;
    return message;
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', closeCurrentTabHandler);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', closeCurrentTabHandler);
});
</script>

<style scoped></style>
