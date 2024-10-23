<template>
  <div class="kv-property">
    <span v-if="!isEmpty(label)" class="property-label w-5em">{{ label }}</span>
    <div class="flex-1 flex justify-end">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es';
defineProps<{
  label?: string;
}>();
</script>

<style scoped>
@import '../property-item.css';

.kv-property {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3px 10px;
  /* background-color: orange; */
}
.single-v-property {
}
</style>
