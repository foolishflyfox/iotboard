<template>
  <PropertyContainer :label="label" :route-name="helpRouteName" @keydown.stop>
    <!-- <n-input :value="value" /> -->
    <!-- <v-ace-editor
      v-model:value="innerValue"
      lang="json"
      theme="chrome"
      style="height: 100px; width: 100%"
      :options="{ useWorker: true }"
    /> -->
    <n-button type="primary" ghost size="small">
      编辑
      <template #icon>
        <n-icon><DocumentEdit16Regular /></n-icon> </template
    ></n-button>
  </PropertyContainer>
</template>

<script setup lang="ts">
import PropertyContainer from './containers/PropertyContainer.vue';
import { VAceEditor } from 'vue3-ace-editor';
import { NButton, NIcon } from 'naive-ui';
import '@mimic/utils/ace-config';
import { DocumentEdit16Regular } from '@vicons/fluent';

const props = defineProps<{
  label?: string;
  value?: string;
  helpRouteName?: string;
}>();

const innerValue = computed({
  get: () => props.value as string,
  set: v => {},
});

const emit = defineEmits<{
  'update:value': [v: string];
}>();
</script>

<style scoped>
:deep(.vjs-tree) {
  width: 100%;
}
</style>
