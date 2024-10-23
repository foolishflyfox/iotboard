<template>
  <KvPropertyContainer :label="label">
    <n-color-picker style="width: 150px" :value />
  </KvPropertyContainer>
</template>

<script setup lang="ts">
import KvPropertyContainer from './KvPropertyContainer.vue';

defineProps<{
  label: string;
  value: string;
}>();
</script>

<style scoped>
@import './property-item.css';
</style>
