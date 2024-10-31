<template>
  <PropertyContainer :label="label" :route-name="helpRouteName" @keydown.stop>
    <!-- <n-input :value="value" /> -->

    <n-button type="primary" ghost size="tiny" @click="showEditModal">
      编辑
      <template #icon>
        <n-icon><DocumentEdit16Regular /></n-icon>
      </template>
    </n-button>
  </PropertyContainer>
  <n-modal
    v-model:show="isShowEditModal"
    preset="dialog"
    class="w-620px!"
    :title="label"
    :show-icon="false"
    positive-text="确定"
    negative-text="取消"
    @positive-click="handlePositiveClick"
  >
    <v-ace-editor
      v-model:value="innerValue"
      lang="json"
      theme="tomorrow"
      class="h-550px w-full"
      :options="{ useWorker: true }"
    />
  </n-modal>
</template>

<script setup lang="ts">
import PropertyContainer from './containers/PropertyContainer.vue';
import { VAceEditor } from 'vue3-ace-editor';
import { NButton, NIcon, NModal, NCard } from 'naive-ui';
import '@mimic/utils/ace-config';
import { DocumentEdit16Regular } from '@vicons/fluent';
import 'ace-builds/src-noconflict/theme-tomorrow';
import { isJSON } from '@/utils';

const props = defineProps<{
  label?: string;
  value?: string;
  helpRouteName?: string;
}>();

const isShowEditModal = ref(false);
const innerValue = ref<string>('');

function showEditModal() {
  isShowEditModal.value = true;
  innerValue.value = props.value || '';
}

const emit = defineEmits<{
  'update:value': [v: string];
}>();

function handlePositiveClick() {
  if (!isJSON(innerValue.value)) {
    window.$message?.error('JSON 字符串格式不正确');
    return false;
  }
  emit('update:value', innerValue.value);
}
</script>

<style scoped>
:deep(.vjs-tree) {
  width: 100%;
}
:deep(.ace_content) {
  background-color: #fafafa;
}
</style>
