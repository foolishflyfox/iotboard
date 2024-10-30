<template>
  <PropertyContainer :label="label" :route-name="helpRouteName" @keydown.stop>
    <!-- <n-input :value="value" /> -->

    <n-button type="primary" ghost size="tiny" @click="showEditModal = true">
      编辑
      <template #icon>
        <n-icon><DocumentEdit16Regular /></n-icon>
      </template>
    </n-button>
  </PropertyContainer>
  <n-modal v-model:show="showEditModal">
    <n-card style="width: 600px; height: 600px" :title="label" role="dialog" aria-modal="true">
      <v-ace-editor
        v-model:value="innerValue"
        lang="json"
        theme="chrome"
        style="height: 100%; width: 100%"
        :options="{ useWorker: true }"
      />
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import PropertyContainer from './containers/PropertyContainer.vue';
import { VAceEditor } from 'vue3-ace-editor';
import { NButton, NIcon, NModal, NCard } from 'naive-ui';
import '@mimic/utils/ace-config';
import { DocumentEdit16Regular } from '@vicons/fluent';

const props = defineProps<{
  label?: string;
  value?: string;
  helpRouteName?: string;
}>();

const showEditModal = ref(false);

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
