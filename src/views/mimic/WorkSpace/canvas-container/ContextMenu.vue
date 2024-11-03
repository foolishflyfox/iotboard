<template>
  <NDropdown
    placement="bottom-start"
    trigger="manual"
    :options
    :x
    :y
    :show
    size="small"
    :on-clickoutside="hideMenu"
    @select="clickContextMenuHandler"
  />
</template>

<script setup lang="ts">
import { NDropdown } from 'naive-ui';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import * as _ from 'lodash-es';
import { displayBaseMapId } from '@mimic/constant';
import { useTimeout } from '@vueuse/core';
import { doContextMenuAction } from './context-menu-action';
import { useContextShowHide } from '@mimic/hooks';

// defineProps<{
// }>();

const { x, y, show, showMenu, hideMenu } = useContextShowHide();
const mimicWorkspaceStatus = useMimicWorkspaceStatus();

function onContextMenuClick(event: MouseEvent) {
  if (_.isArray(mimicWorkspaceStatus.selectedUiId)) {
    showMultiSelectContextMenu();
  } else if (mimicWorkspaceStatus.selectedUiId === displayBaseMapId) {
    showNoSelectContextMenu();
  } else if (!_.isEmpty(mimicWorkspaceStatus)) {
    /** 选中单个元素的右键菜单 */
    showMenu(event);
  }
  if (show.value) {
    x.value = event.x;
    y.value = event.y;
  }
}

const { ready: canHideContextMenu, start: startForbidHideContextMenu } = useTimeout(100, {
  controls: true,
});

/** 选中多个元素的右键菜单 */
function showMultiSelectContextMenu() {
  // show.value = true;
}
/** 什么都没选中的右键菜单 (底图右键) */
function showNoSelectContextMenu() {
  show.value = false;
}

function clickContextMenuHandler(action: string) {
  doContextMenuAction(action);
  hideMenu();
}

const options = [
  {
    label: '克隆',
    key: 'copy',
  },
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

defineExpose({
  onContextMenuClick,
});
</script>

<style scoped>
.red-txt {
  color: red;
}
</style>
