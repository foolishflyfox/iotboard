<template>
  <div>单文件配置: {{ mimicWorkspaceStatus.selectedUiId }}</div>
</template>

<script setup lang="ts">
import { useMimicWorkspaceStatus } from '@mimic/stores';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
</script>

<style scoped></style>
