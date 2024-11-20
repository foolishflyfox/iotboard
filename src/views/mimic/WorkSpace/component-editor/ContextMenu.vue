<template>
  <NDropdown
    placement="bottom-start"
    trigger="manual"
    :options
    size="small"
    :x
    :y
    :show
    @clickoutside="hideMenu"
    @select="clickContextMenuHandler"
  />
</template>

<script setup lang="ts">
// todo: 该上下文应该不使用了，待删除
import { NDropdown } from 'naive-ui';
import { useMimicComponentStatus } from '@mimic/stores';
import { useContextShowHide } from '@mimic/hooks';
import { doComponentEditorAction } from './component-editor-action';

defineOptions({
  name: 'ComponentEditorContextMenu',
});
const mimicComponentStatus = useMimicComponentStatus();
// const { selectedUiIds } = toRefs(mimicComponentStatus);

const options = [
  {
    label: () => h('div', { style: { color: 'red' } }, '删除'),
    key: 'delete',
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '导出图片',
    key: 'exportImage',
    children: [
      {
        label: 'png',
        key: 'png',
      },
      {
        label: 'jpg',
        key: 'jpg',
      },
    ],
  },
];

const { x, y, show, showMenu, hideMenu } = useContextShowHide();

function onContextMenuClick(event: MouseEvent) {
  // if (selectedUiIds.value.length === 1) {
  //   showMenu(event);
  // }
}

function clickContextMenuHandler(action: string) {
  doComponentEditorAction(action);
  hideMenu();
}

defineExpose({
  onContextMenuClick,
});
</script>

<style scoped></style>
