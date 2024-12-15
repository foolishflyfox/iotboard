<template>
  <div class="mx-5px my-5px">
    <NButton
      ghost
      strong
      type="primary"
      size="small"
      class="ml-5px"
      @click="showComponentEditModal"
    >
      <NIcon size="20">
        <WindowDevEdit20Regular />
      </NIcon>
      编辑
    </NButton>
  </div>
  <ComponentEditModal
    v-if="componentEditModalVisible"
    v-model:show-modal="componentEditModalVisible"
  />
</template>

<script setup lang="ts">
import { useMimicComponentStatus } from '@mimic/stores';
import { NButton, NIcon } from 'naive-ui';
import { WindowDevEdit20Regular } from '@vicons/fluent';
import ComponentEditModal from './ComponentEditModal.vue';

defineOptions({
  name: 'ComponentCfgPanel',
});

const mimicComponentStatus = useMimicComponentStatus();
const componentEditModalVisible = ref(false);
function showComponentEditModal() {
  componentEditModalVisible.value = true;
}
</script>

<style scoped></style>
