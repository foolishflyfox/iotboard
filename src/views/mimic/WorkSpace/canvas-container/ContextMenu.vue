<template>
  <NDropdown
    placement="bottom-start"
    trigger="manual"
    :options
    :x
    :y
    :show
    size="small"
    :on-clickoutside="hideContextMenu"
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

// defineProps<{
// }>();

const show = ref(false);
const x = ref(0);
const y = ref(0);
const mimicWorkspaceStatus = useMimicWorkspaceStatus();

function onContextMenuClick(event: MouseEvent) {
  if (_.isArray(mimicWorkspaceStatus.selectedUiId)) {
    showMultiSelectContextMenu();
  } else if (mimicWorkspaceStatus.selectedUiId === displayBaseMapId) {
    showNoSelectContextMenu();
  } else if (!_.isEmpty(mimicWorkspaceStatus)) {
    showSingleSelectContextMenu();
  }
  if (show.value) {
    x.value = event.x;
    y.value = event.y;
  }
}

/**
 * 设置保持状态，解决从一个选中元素直接右键另一个元素时，菜单消失的情况
 * 产生该问题的原因是上述情况先触发 canvas 的 @contextmenu，再触发 on-clickoutside 事件
 */
const { ready: canHideContextMenu, start: startForbidHideContextMenu } = useTimeout(100, {
  controls: true,
});
function showContextMenu() {
  show.value = true;
  startForbidHideContextMenu();
}
function hideContextMenu() {
  if (canHideContextMenu.value) {
    show.value = false;
  }
}
/** 选中多个元素的右键菜单 */
function showMultiSelectContextMenu() {
  // show.value = true;
}
/** 什么都没选中的右键菜单 (底图右键) */
function showNoSelectContextMenu() {
  show.value = false;
}
/** 选中单个元素的右键菜单 */
function showSingleSelectContextMenu() {
  showContextMenu();
}

function clickContextMenuHandler(action: string) {
  doContextMenuAction(action);
  hideContextMenu();
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
