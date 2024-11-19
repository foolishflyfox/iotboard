<template>
  <n-modal
    :show="showModal"
    preset="dialog"
    @close="close"
    :show-icon="false"
    class="flex flex-col"
    :style="modalStyle"
    content-class="flex-1 bg-pink-1"
  >
    <template #header>
      <div>编辑组件</div>
    </template>
    <template #close>
      <n-space size="small">
        <n-icon
          size="20"
          class="cursor-pointer"
          :component="isFullView ? Contract : Expand"
          @click="isFullView = !isFullView"
        />
        <n-icon size="20" class="cursor-pointer" @click="close">
          <Close />
        </n-icon>
      </n-space>
    </template>
    <div>默认显示: todo - 测试自定义 bound 等的作用，并写说明文档</div>
    <template #action>
      <n-space>
        <n-button type="primary" size="small">刷新</n-button>
        <n-button type="primary" size="small">确定</n-button>
        <n-button type="primary" size="small">取消</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NSpace, NButton, NIcon } from 'naive-ui';
import { Close, Expand, Contract } from '@vicons/ionicons5';

defineProps<{
  showModal?: boolean;
}>();

const fullViewStyle = {
  width: '100vw',
  height: '100vh',
};
const normalViewStyle = {
  width: '900px',
  height: '800px',
};

const isFullView = ref(false);
const modalStyle = computed(() => (isFullView.value ? fullViewStyle : normalViewStyle));

const emit = defineEmits<{
  'update:showModal': [v: boolean];
}>();

function close() {
  emit('update:showModal', false);
}
</script>

<style scoped></style>
