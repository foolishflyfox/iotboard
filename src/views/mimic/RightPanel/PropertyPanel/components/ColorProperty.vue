<template>
  <KvPropertyContainer :label="label">
    <n-color-picker style="width: 150px" v-model:value="value" />
  </KvPropertyContainer>
</template>

<script setup lang="ts">
import KvPropertyContainer from './KvPropertyContainer.vue';

defineProps<{
  label: string;
}>();

const value = defineModel<string>();
</script>

<style scoped>
@import './property-item.css';
</style>
