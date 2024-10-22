<template>
  <div class="h-full flex-y-center opt-container">
    <!-- 导入时指定必须为 .iot.json 后缀 -->
    <div>导入</div>
    <!-- 支持 png / jpg / svg / gif 导出 -->
    <div>导出</div>
    <HeadVerticalDivider />
    <div>撤销</div>
    <div>重做</div>
    <HeadVerticalDivider />
    <div>格式化</div>
    <div>字体族</div>
    <div>填充</div>
    <div>颜色</div>
    <HeadVerticalDivider />
    <div>线样式</div>
    <div>线宽</div>
    <HeadVerticalDivider />
  </div>
</template>

<script setup lang="ts">
import HeadVerticalDivider from '../components/HeadVerticalDivider.vue';
defineOptions({
  name: 'HeadOperators',
});
</script>

<style scoped>
.opt-container > div {
  margin: 0 3px;
}
</style>
