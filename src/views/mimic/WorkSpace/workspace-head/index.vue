<template>
  <div :style="{ height: `${studioHeight}px` }" class="px-1em flex">
    <div
      v-for="item of mimicWorkspaceStatus.openedTargets"
      class="bg-[#b0b0b0] fw-500 text-16px mx-5px px-8px rounded-t-lg flex-y-center"
    >
      <n-icon size="16" class="mr-5px" :component="editorTypeIconDict[item.editorType]" />
      <span class="mr-3px cursor-default">
        {{ path.basename(item.path) }}
      </span>
      <n-icon size="16" color="#fd4a4e" class="cursor-pointer">
        <CloseFilled />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { studioHeight } from '@mimic/settings';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import path from 'path-browserify';
import { CloseFilled, GroupObjects } from '@vicons/carbon';
import { NIcon } from 'naive-ui';
import { AppGeneric24Filled } from '@vicons/fluent';
import type { EditorType } from '@mimic/types';
import type { Component } from 'vue';
import { Components } from '@vicons/tabler';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const editorTypeIconDict: Record<EditorType, Component> = {
  display: AppGeneric24Filled,
  module: GroupObjects,
  component: Components,
};
</script>

<style scoped></style>
