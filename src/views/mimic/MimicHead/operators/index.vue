<template>
  <div class="h-full flex-y-center opt-container">
    <div>操作区</div>
    <div>撤销</div>
    <div>重做</div>
    <div>格式化</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HeadOperators',
});
</script>

<style scoped>
.opt-container > div {
  margin: 0 3px;
}
</style>
