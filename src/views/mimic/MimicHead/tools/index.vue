<template>
  <div class="h-full flex-y-center tool-container">
    <div class="bg-red">工具区</div>
    <HeadIconContainer
      :svg-component="RulerLine"
      :is-active="v"
      @click="changeRulerVisible"
    />
  </div>
</template>

<script setup lang="ts">
import RulerLine from '@/components/icons/RulerLine.vue';
import HeadIconContainer from '@mimic/components/HeadIconContainer.vue';

defineOptions({
  name: 'HeadTools',
});

const v = ref(false);
function changeRulerVisible() {
  v.value = !v.value;
}
</script>

<style scoped>
.tool-container > div {
  margin: 0 3px;
}
</style>
