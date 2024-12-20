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
</template>

<script setup lang="ts">
import { studioHeight } from '@mimic/settings';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import * as path from 'pathe';
import { CloseFilled, GroupObjects } from '@vicons/carbon';
import { ImagesOutline } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { AppGeneric24Filled } from '@vicons/fluent';
import type { EditorType, OpenedTarget } from '@mimic/types';
import type { Component } from 'vue';
import { Components } from '@vicons/tabler';
import * as _ from 'lodash-es';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const { currentTarget } = toRefs(mimicWorkspaceStatus);
const mimicDisplayStatus = useMimicDisplayStatus();
const editorTypeIconDict: Record<EditorType, Component> = {
  display: AppGeneric24Filled,
  module: GroupObjects,
  component: Components,
  asset: ImagesOutline,
};

function changeCurrentTarget(openedTarget: OpenedTarget) {
  mimicWorkspaceStatus.setCurrentTaget(openedTarget);
  mimicDisplayStatus.selectedUiId = null;
}
function closeTarget(openedTarget: OpenedTarget) {
  console.log('关闭目标');
  mimicWorkspaceStatus.closeOpenedTarget(openedTarget);
}
</script>

<style scoped></style>
