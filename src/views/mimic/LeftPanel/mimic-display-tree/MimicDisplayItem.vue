<template>
  <div class="inline-block bg-[#fff8] rounded-lg">
    <img :src="imgSrc" width="42" class="p-4px" />
    <div class="text-12px text-[#555] font-medium text-center cursor-default w-42px ellipsis-text">
      {{ fileName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDataUrl } from '@/utils';

const props = defineProps<{
  folderPath: string;
  fileName: string;
  hasPreview?: boolean;
}>();

const imgSrc = computed(() => {
  return props.hasPreview
    ? `${getDataUrl()}/display/${props.folderPath}/${props.fileName}.png`
    : 'preview/miss.png';
});
</script>

<style scoped></style>
