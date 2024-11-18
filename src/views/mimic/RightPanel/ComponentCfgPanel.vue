<template>
  <div class="mx-5px my-5px">
    <n-button ghost strong type="primary" size="small" class="ml-5px">
      <n-icon size="20">
        <WindowDevEdit20Regular />
      </n-icon>
      编辑
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { useMimicComponentStatus } from '@mimic/stores';
import { NButton, NIcon } from 'naive-ui';
import { WindowDevEdit20Regular } from '@vicons/fluent';

const mimicComponentStatus = useMimicComponentStatus();
const { selectedUiIds } = toRefs(mimicComponentStatus);
</script>

<style scoped></style>
