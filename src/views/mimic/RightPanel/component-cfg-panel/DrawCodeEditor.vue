<template>
  <v-ace-editor
    v-model:value="innerValue"
    lang="javascript"
    theme="tomorrow"
    :options="{ useWorker: true }"
    class="h-full w-full"
  />
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
