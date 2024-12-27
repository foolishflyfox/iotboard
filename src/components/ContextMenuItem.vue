<template>
  <div class="flex justify-between">
    <div>
      {{ label }}
    </div>
    <div>
      {{ hotkey }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  hotkey?: string;
}>();
</script>

<style scoped>

</style>
