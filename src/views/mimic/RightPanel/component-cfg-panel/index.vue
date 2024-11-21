<template>
  <div class="mx-5px my-5px">
    <n-button
      ghost
      strong
      type="primary"
      size="small"
      class="ml-5px"
      @click="showComponentEditModal"
    >
      <n-icon size="20">
        <WindowDevEdit20Regular />
      </n-icon>
      编辑
    </n-button>
  </div>
  <!-- 使用 v-if 是为了关闭模态框后使元素消失，重新显示后执行组件构建流程 -->
  <ComponentEditModal
    v-if="componentEditModalVisible"
    v-model:showModal="componentEditModalVisible"
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
