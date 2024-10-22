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
} from 'leafer-editor';
import { Ruler } from 'leafer-x-ruler';
import '@leafer-in/view';
import { useMimicWorkspaceStatus } from '@/stores/mimic-workspace-status';
import { CustomRect, CustomPen } from '@mimic/custom';
import { Custom } from '../../custom/Custom';
import { CustomGauge } from '../../custom/CustomGauge';

defineOptions({
  name: 'CanvasContainer',
});

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const { rulerVisible } = toRefs(mimicWorkspaceStatus);

onMounted(() => {
  const app = new App({
    view: 'mimicCanvasContainer',
    // ground: {},
    tree: { usePartRender: false },
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
    width: 200,
    height: 200,
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
  app.tree.add(myObj);

  app.tree.zoom('fit', 80);
  console.log(app.toJSON());

  console.log('app.id = ', app.id);
  console.log('tree.id = ', app.tree.id);
  console.log('rect.id = ', rect.id);
  console.log('myObj.id = ', myObj.id);
  console.log('@@@1', app.findId('12332'));
  console.log('@@@2', app.tree.findId('12332'));
  console.log('@@@3', app.ground);
  console.log('@@@4', app.tree.tag);
  console.log('@@@5', app.find('Leafer'));
  for (const leafer of app.find('Leafer')) {
    console.log('name =', leafer.name, 'zIndex', leafer.zIndex);
  }
  console.log('1: ', rect.zIndex);
  console.log('2: ', myObj.zIndex);
  console.log('@@@6', myObj.toJSON());
  // setTimeout(() => {
  //   myObj.zIndex = -1;
  // }, 3000);

  const customPen = new CustomPen({
    size: 30,
    fill: 'blue',
    draggable: true,
    editable: true,
  });

  app.tree.add(customPen);

  setTimeout(() => {
    customPen.size = 100; // 2秒后放大尺寸
  }, 2000);

  const custom = new Custom({
    x: 130,
    y: 120,
    width: 200,
    height: 50,
    draggable: true,
    editable: true,
  });

  app.tree.add(custom);

  const gauge = new CustomGauge({
    x: 0,
    y: 0,
    width: 400,
    height: 400,
    draggable: true,
  });
  app.tree.add(gauge);
});
</script>

<style scoped></style>
