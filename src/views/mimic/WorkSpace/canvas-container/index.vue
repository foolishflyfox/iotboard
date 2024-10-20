<template>
  <div class="bg-yellow-100" id="mimicCanvasContainer"></div>
</template>

<script setup lang="ts">
import { Leafer, Rect, App, LeafHelper, ZoomEvent } from 'leafer-editor';
import { Ruler } from 'leafer-x-ruler';
import '@leafer-in/view';
import { useMimicWorkspaceStatus } from '@/stores/mimic-workspace-status';

defineOptions({
  name: 'CanvasContainer',
});

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const { rulerVisible } = toRefs(mimicWorkspaceStatus);

onMounted(() => {
  const app = new App({
    view: 'mimicCanvasContainer',
    // ground: {},
    tree: {},
    editor: {
      // circle: {
      //   pointType: 'button',
      //   cursor: 'pointer',
      //   event: {
      //     tap: function () {
      //       alert('button');
      //     },
      //   },
      // }, // 变为自定义按钮
    },
  });
  const ruler = new Ruler(app);

  watchEffect(() => {
    ruler.enabled = rulerVisible.value;
  });

  // 添加自定义主题
  ruler.addTheme('custom1', {
    backgroundColor: '#fff',
    textColor: '#000',
    borderColor: '#000',
    highlightColor: 'rgba(22,93,255,0.3)',
  });

  // 切换主题
  ruler.changeTheme('custom1');

  // 添加底图
  app.tree.add(Rect.one({ width: 500, height: 300, fill: 'white' }));

  const rect = new Rect({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true,
    editable: true,
  });

  app.tree.add(rect);

  app.tree.zoom('fit', 80);
});
</script>

<style scoped></style>
