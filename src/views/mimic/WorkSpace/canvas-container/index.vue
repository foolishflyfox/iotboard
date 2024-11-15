<template>
  <div
    class="flex-1 bg-gray-300"
    id="mimicCanvasContainer"
    ref="displayEditorWorkspace"
    @contextmenu="contextMenuRef?.onContextMenuClick"
    @drop="onDisplayEditorDrop"
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
import { registerComponent } from '@mimic/custom/registrar';

const loadScript = () => {
  loadjs('/mytest.js', {
    success: () => {
      console.log('script load success');
      (window as any).foo({ x: 666, getUniqueId });
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

async function onDisplayEditorDrop(e: MouseEvent) {
  if (mimicVar.draggingType === 'component') {
    if (mimicVar.draggingTag && !_.isEmpty(mimicVar.draggingTag)) {
      console.log(`将组件 ${mimicVar.draggingTag} 拖放到图纸`);
      const componentClass = await registerComponent(mimicVar.draggingTag);
      const newElement = new componentClass({
        ...mimicVar.displayEditor.app?.getPagePointByClient(e),
        draggable: true,
        editable: true,
      });
      if (_.isEmpty(newElement.id)) {
        newElement.id = getUniqueId();
      }
      mimicVar.displayEditor.app?.tree.add(newElement);
    }
  }
  if (mimicVar.draggingCustomMeta?.component && mimicVar.displayEditor.app) {
    const newElement = new mimicVar.draggingCustomMeta.component({
      ...mimicVar.displayEditor.app.getPagePointByClient(e),
      draggable: true,
      editable: true,
    });
    if (_.isEmpty(newElement.id)) {
      newElement.id = getUniqueId();
    }
    mimicVar.displayEditor.app.tree.add(newElement);
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
  mimicVar.displayEditor.app = app;
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

  watch(
    () => mimicWorkspaceStatus.currentTarget,
    nv => {
      console.log('处理图纸', nv);
    },
    {
      immediate: true,
    },
  );

  // 添加底图
  const displayBaseMap = new Rect({
    id: displayBaseMapId,
    width: 500,
    height: 300,
    fill: '#FFFFFFFF',
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
  // app.tree.add(displayBaseMap);
  (window as any).app = app;

  // const myObj = new CustomRect({
  //   x: 150,
  //   y: 30,
  //   width: 80,
  //   height: 80,
  //   draggable: true,
  //   editable: true,
  //   stroke: { type: 'solid', color: '#00bfff' },
  // });

  // app.tree.add(myObj);
  // viewAutoFit();
});
</script>

<style scoped></style>
