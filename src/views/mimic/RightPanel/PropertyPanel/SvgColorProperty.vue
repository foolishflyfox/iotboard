<template>
  <PropertyContainer label="svg 颜色">
    <NButton
      ghost
      strong
      type="primary"
      size="small"
      class="ml-5px"
      @click="showSvgColorModal"
    >
      编辑
    </NButton>
    <SvgColorModal v-if="svgColorModalVisible" v-model:show-modal="svgColorModalVisible" />
  </PropertyContainer>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';
import { PropertyContainer } from './components/containers';
import SvgColorModal from './components/SvgColorModal.vue';

const svgColorModalVisible = ref(false);
function showSvgColorModal() {
  svgColorModalVisible.value = true;
}
</script>

<style scoped>

</style>
