<template>
  <div>
    <template v-if="selectedUI === null">
      <DisplayProperty />
    </template>
    <template v-else-if="_.isArray(selectedUI)">
      多元素配置:
      <div>均匀分布</div>
      <div>左/中/右对齐</div>
    </template>
    <template v-else> 单元素配置 </template>
  </div>
</template>

<script setup lang="ts">
import * as _ from 'lodash-es';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import DisplayProperty from './DisplayProperty.vue';

defineOptions({
  name: 'PropertyPanel',
});

const { selectedUI } = toRefs(useMimicWorkspaceStatus());
</script>

<style scoped></style>
