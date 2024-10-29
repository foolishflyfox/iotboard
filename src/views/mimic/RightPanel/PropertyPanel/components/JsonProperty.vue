<template>
  <PropertyContainer :label="label" :route-name="helpRouteName" @keydown.stop>
    <!-- <n-input :value="value" /> -->
    <v-ace-editor
      v-model:value="testData"
      lang="json"
      theme="chrome"
      style="height: 100px; width: 100%"
      :options="{ useWorker: true }"
    />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { NInput } from 'naive-ui';
import PropertyContainer from './containers/PropertyContainer.vue';
import { VAceEditor } from 'vue3-ace-editor';
import '@mimic/utils/ace-config';

defineProps<{
  label?: string;
  value?: string;
  helpRouteName?: string;
}>();

const emit = defineEmits<{
  'update:value': [v: string];
}>();

const testData = ref("{x: 1, y:'abc'}");
</script>

<style scoped>
:deep(.vjs-tree) {
  width: 100%;
}
</style>
