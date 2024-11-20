<template>
  <hr class="border-gray-300" />
  <div class="h-full flex-col">
    <div>
      <VCodeBlock
        v-if="prefixCode"
        class="fixed-code"
        :code="prefixCode"
        highlightjs
        lang="javascript"
        theme="atom-one-light"
        :copy-button="false"
      />
    </div>
    <v-ace-editor
      v-model:value="innerValue"
      lang="javascript"
      theme="tomorrow"
      :options="{ useWorker: true }"
      class="w-full flex-1"
    />
    <div>
      <VCodeBlock
        class="fixed-code"
        :code="postCode"
        highlightjs
        lang="javascript"
        theme="atom-one-light"
        :copy-button="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VAceEditor } from 'vue3-ace-editor';
import VCodeBlock from '@wdns/vue-code-block';

const props = withDefaults(
  defineProps<{
    value: string;
    prefixCode?: string;
    postCode?: string;
  }>(),
  { postCode: '}' },
);

const innerValue = ref('');

onMounted(() => {
  innerValue.value = props.value;
});
</script>

<style scoped></style>
