<template>
  <div>选中的元素: {{ selectedUiIds }}</div>
</template>

<script setup lang="ts">
import { useMimicComponentStatus } from '@mimic/stores';

const mimicComponentStatus = useMimicComponentStatus();
const { selectedUiIds } = toRefs(mimicComponentStatus);
</script>

<style scoped></style>
