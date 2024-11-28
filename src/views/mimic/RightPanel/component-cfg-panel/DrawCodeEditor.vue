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
      :options="aceEditorOptions"
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
import '@mimic/utils/ace-config';
import { VAceEditor } from 'vue3-ace-editor';
import VCodeBlock from '@wdns/vue-code-block';
import type { Ace } from 'ace-builds';

const props = withDefaults(
  defineProps<{
    value: string;
    prefixCode?: string;
    postCode?: string;
  }>(),
  { postCode: '}' },
);

const emit = defineEmits<{
  'update:value': [newValue: string];
}>();
const innerValue = ref(props.value);
watch(innerValue, nv => {
  emit('update:value', nv);
});

const aceEditorOptions: Partial<Ace.EditorOptions> = {
  useWorker: true, // 启用语法检查,必须为true
  enableBasicAutocompletion: true, // 自动补全
  enableLiveAutocompletion: true, // 智能补全
  enableSnippets: true, // 启用代码段
  showPrintMargin: false, // 去掉灰色的线，printMarginColumn
  highlightActiveLine: true, // 高亮行
  highlightSelectedWord: true, // 高亮选中的字符
  tabSize: 4, // tab锁进字符
  fontSize: 14, // 设置字号
  wrap: false, // 是否换行
  // readonly: false, // 是否可编辑
};
</script>

<style scoped></style>
