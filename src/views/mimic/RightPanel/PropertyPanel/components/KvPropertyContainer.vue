<template>
  <div class="kv-property">
    <span class="property-label">{{ label }}</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<style scoped>
@import './property-item.css';

.kv-property {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3px 10px;
  /* background-color: orange; */
}
</style>
