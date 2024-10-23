<template>
  <div class="bg-yellow-100" id="mimicCanvasContainer"></div>
</template>

<script setup lang="ts">
import {
  Leafer,
  Rect,
  App,
  LeafHelper,
  ZoomEvent,
  registerUI,
  EditorEvent,
} from 'leafer-editor';
import { Ruler } from 'leafer-x-ruler';
import '@leafer-in/view';
import { useMimicWorkspaceStatus } from '@/views/mimic/stores';
import { Custom, CustomRect, CustomPen, CustomGauge } from '@mimic/custom';
import { selectHandler } from '@mimic/event-handler';

defineOptions({
  name: 'CanvasContainer',
});

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const { rulerVisible } = toRefs(mimicWorkspaceStatus);

onMounted(() => {
  const app = new App({
    view: 'mimicCanvasContainer',
    // ground: {},
    tree: { usePartRender: true },
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
  app.tree.name = 'tree';
  app.tree.zIndex = 0;
  app.editor.on(EditorEvent.SELECT, selectHandler);
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
    // id: '12332',
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true,
    editable: true,
  });

  const myObj = new CustomRect({
    top: 20,
    id: '12332',
    x: 100,
    y: 100,
    width: 150,
    height: 300,
    fill: 'orange',
    draggable: true,
    editable: true,
  });

  app.tree.add(rect);
  // app.tree.add(myObj);

  app.tree.zoom('fit', 25);
  console.log(app.toJSON());
  // setTimeout(() => {
  //   myObj.zIndex = -1;
  // }, 3000);

  const customPen = new CustomPen({
    size: 30,
    fill: 'blue',
    draggable: true,
    editable: true,
  });

  // app.tree.add(customPen);
  // console.log(customPen.toString());
  // app.tree.add({
  //   tag: 'CustomPen',
  //   size: 30,
  //   draggable: true,
  //   editable: true,
  //   fill: 'blue',
  //   children: [
  //     {
  //       tag: 'Path',
  //       path: [23, 0, 0, 30, 30, 10, 27, 15, 15, 7.5],
  //       windingRule: 'evenodd',
  //       fill: '#FF4B4B',
  //     },
  //     { tag: 'Path', x: 15, y: 15, path: [27, 0, 0, 6], fill: '#FEB027' },
  //   ],
  // });

  // setTimeout(() => {
  //   customPen.size = 100; // 2秒后放大尺寸
  // }, 2000);

  const custom = new Custom({
    x: 130,
    y: 120,
    width: 200,
    height: 50,
    draggable: true,
    editable: true,
  });

  // app.tree.add(custom);
  // app.tree.add({
  //   tag: 'CustomGauge',
  //   x: 137.324411555908,
  //   y: -34.330186233129325,
  //   width: 374.3107786966027,
  //   height: 340.8214230785311,
  //   rotation: 22.25,
  //   draggable: true,
  //   editable: true,
  // });

  const gauge = new CustomGauge({
    x: 50,
    y: 0,
    width: 80,
    height: 80,
    draggable: true,
    editable: true,
  });
  app.tree.add(gauge);
  // console.log(gauge.toString());
  // app.tree.add({
  //   tag: 'CustomGauge',
  //   x: 136.1777825312438,
  //   y: -14.158673381395346,
  //   width: 400,
  //   height: 400,
  //   rotation: 19.52,
  //   draggable: true,
  //   editable: true,
  // });

  // console.log('###', myObj.toJSON());
  // (window as any).guage = gauge;
});
</script>

<style scoped></style>
