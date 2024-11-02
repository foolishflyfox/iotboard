<template>
  <div
    class="bg-white flex-1"
    id="mimicCanvasContainer"
    ref="displayEditorWorkspace"
    @contextmenu="contextMenuRef?.onContextMenuClick"
    @drop="onDrop"
  />
  <ContextMenu ref="contextMenuRef" />
</template>

<script setup lang="ts">
import { Rect, App, EditorEvent, ResizeEvent, PropertyEvent, KeyEvent } from 'leafer-editor';
import { Ruler } from 'leafer-x-ruler';
import '@leafer-in/view';
import { useMimicWorkspaceStatus } from '@/views/mimic/stores';
import { Custom, CustomRect, CustomPen, CustomGauge } from '@mimic/custom';
import { selectHandler, keyHolderHandler } from '@mimic/event-handler';
import { displayBaseMapId, rulerTheme } from '@mimic/constant';
import { mimicVar } from '@mimic/global';
import { viewAutoFit } from '@mimic/utils';
import { getUniqueId } from '@/utils';
import ContextMenu from './ContextMenu.vue';
import { useDropZone } from '@vueuse/core';
import * as _ from 'lodash-es';
import loadjs from 'loadjs';

const loadScript = () => {
  loadjs('/mytest.js', {
    success: () => {
      console.log('script load success');
      (window as any).foo(12345);
    },
    error: () => {
      console.log('script load fail');
    },
  });
};

loadScript();

defineOptions({
  name: 'CanvasContainer',
});

const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const { rulerVisible } = toRefs(mimicWorkspaceStatus);

const contextMenuRef = ref<InstanceType<typeof ContextMenu>>();

const displayEditorWorkspace = ref<HTMLElement>();

useDropZone(displayEditorWorkspace);

function onDrop(e: MouseEvent) {
  if (mimicVar.draggingCustomMeta?.component && mimicVar.app) {
    // const customClass: any = ;
    // const custom: any =
    const newElement = new mimicVar.draggingCustomMeta.component({
      ...mimicVar.app.getPagePointByClient(e),
      draggable: true,
      editable: true,
    });
    if (_.isEmpty(newElement.id)) {
      newElement.id = getUniqueId();
    }
    mimicVar.app.tree.add(newElement);
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
  app.on(KeyEvent.HOLD, keyHolderHandler);
  const ruler = new Ruler(app);

  watchEffect(() => {
    ruler.enabled = rulerVisible.value;
  });

  // 添加自定义主题
  ruler.addTheme('custom1', rulerTheme);
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
  (window as any).app = app;

  const myObj = new CustomRect({
    x: 150,
    y: 30,
    width: 80,
    height: 80,
    draggable: true,
    editable: true,
    stroke: { type: 'solid', color: '#00bfff' },
  });

  app.tree.add(myObj);
  viewAutoFit();

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

  // const gauge = new TestGauge({
  //   x: 50,
  //   y: 20,
  //   width: 80,
  //   height: 80,
  //   draggable: true,
  //   editable: true,
  // });
  // app.tree.add(gauge);
  // (window as any).gauge = gauge;
  // console.log('XXX', gauge.toJSON());
  // console.log(app.toJSON());
});
</script>

<style scoped></style>
