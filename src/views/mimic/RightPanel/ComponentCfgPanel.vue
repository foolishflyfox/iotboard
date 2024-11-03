<template>
  <div>选中的元素: {{ selectedUiIds }}</div>
</template>

<script setup lang="ts">
import { useMimicWorkspaceStatus } from '@mimic/stores';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const { selectedUiIds } = toRefs(mimicWorkspaceStatus.componentEditor);
</script>

<style scoped></style>
