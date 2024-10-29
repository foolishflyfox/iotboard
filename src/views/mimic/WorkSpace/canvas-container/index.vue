<template>
  <div
    class="bg-white flex-1"
    id="mimicCanvasContainer"
    ref="dropZoneRef"
    @contextmenu="contextMenuRef?.onContextMenuClick"
    @drop="onDrop"
  />
  <ContextMenu ref="contextMenuRef" />
</template>

<script setup lang="ts">
import {
  Rect,
  App,
  EditorEvent,
  ResizeEvent,
  PropertyEvent,
} from 'leafer-editor';
import { Ruler } from 'leafer-x-ruler';
import '@leafer-in/view';
import { useMimicWorkspaceStatus } from '@/views/mimic/stores';
import { Custom, CustomRect, CustomPen, CustomGauge } from '@mimic/custom';
import { selectHandler } from '@mimic/event-handler';
import { displayBaseMapId } from '@mimic/constant';
import { mimicVar } from '@mimic/global';
import { viewAutoFit } from '@mimic/utils';
import ContextMenu from './ContextMenu.vue';
import { useDropZone } from '@vueuse/core';

defineOptions({
  name: 'CanvasContainer',
});

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const { rulerVisible } = toRefs(mimicWorkspaceStatus);

const contextMenuRef = ref<InstanceType<typeof ContextMenu>>();

const dropZoneRef = ref<HTMLElement>();

useDropZone(dropZoneRef);

function onDrop(e: MouseEvent) {
  // console.log('onDrop ', v);
  console.log('onDrop ', mimicVar.draggingCustomMeta);
  if (mimicVar.draggingCustomMeta?.component && mimicVar.app) {
    // const customClass: any = ;
    // const custom: any =
    mimicVar.app.tree.add(
      new mimicVar.draggingCustomMeta.component({
        ...mimicVar.app.getPagePointByClient(e),
        draggable: true,
        editable: true,
      }),
    );
  }
}

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
  mimicVar.app = app;
  app.tree.on(ResizeEvent.RESIZE, viewAutoFit);
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
  const displayBaseMap = new Rect({
    id: displayBaseMapId,
    width: 500,
    height: 300,
    fill: '#00bfff33',
    data: {
      sizeType: 'custom',
    },
    event: {
      [PropertyEvent.CHANGE]: (v: PropertyEvent) => {
        if (v.attrName === 'width' || v.attrName === 'height') {
          nextTick(viewAutoFit);
        }
      },
    },
  });
  app.tree.add(displayBaseMap);

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
    id: '12332',
    x: 150,
    y: 30,
    width: 80,
    height: 80,
    draggable: true,
    editable: true,
  });

  app.tree.add(myObj);
  // app.tree.add(myObj);

  // app.tree.zoom('fit', 23);
  viewAutoFit();
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

  const gauge = new CustomGauge({
    x: 50,
    y: 20,
    width: 80,
    height: 80,
    draggable: true,
    editable: true,
  });
  app.tree.add(gauge);
  // console.log('XXX', gauge.toJSON());
  // console.log(app.toJSON());
});
</script>

<style scoped></style>
