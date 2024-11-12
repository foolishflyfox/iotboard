<template>
  <div :style="{ height: `${studioHeight}px` }" class="px-1em">
    <DisplayHead v-if="mimicWorkspaceStatus.curEditorType === 'display'" />
  </div>
</template>

<script setup lang="ts">
import { studioHeight } from '@mimic/settings';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import DisplayHead from './DisplayHead.vue';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
</script>

<style scoped></style>
