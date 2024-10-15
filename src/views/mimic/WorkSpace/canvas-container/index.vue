<template>
  <div class="bg-yellow-100" id="mimicCanvasContainer"></div>
</template>

<script setup lang="ts">
import { Leafer, Rect, App } from 'leafer-ui';
import { Ruler } from 'leafer-x-ruler';

defineOptions({
  name: 'CanvasContainer',
});

onMounted(() => {
  const app = new App({
    view: 'mimicCanvasContainer',
    tree: {},
    editor: {},
  });
  const ruler = new Ruler(app);

  // 添加自定义主题
  ruler.addTheme('custom1', {
    backgroundColor: '#fff',
    textColor: 'gray',
    borderColor: 'gray',
    highlightColor: 'rgba(22,93,255,0.75)',
  });

  // 切换主题
  ruler.changeTheme('custom1');

  const rect = new Rect({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true,
  });

  app.tree.add(rect);
});
</script>

<style scoped></style>
