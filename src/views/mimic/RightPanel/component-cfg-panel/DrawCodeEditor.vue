<template>
  <hr class="border-gray-300" />
  <div class="h-full flex-col">
    <div>
      <slot name="prefixCode"></slot>
    </div>
    <v-ace-editor
      v-model:value="innerValue"
      lang="javascript"
      theme="tomorrow"
      :options="{ useWorker: true }"
      class="w-full flex-1"
    />
    <div>
      <slot name="postCode"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VAceEditor } from 'vue3-ace-editor';

const props = defineProps<{
  value: string;
}>();

const innerValue = ref('');

onMounted(() => {
  innerValue.value = props.value;
});
</script>

<style scoped></style>
