<template>
  <div>选中的元素: {{ selectedUiId }}</div>
</template>

<script setup lang="ts">
import { useMimicWorkspaceStatus } from '@mimic/stores';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const { selectedUiId } = toRefs(mimicWorkspaceStatus.componentEditor);
</script>

<style scoped></style>
