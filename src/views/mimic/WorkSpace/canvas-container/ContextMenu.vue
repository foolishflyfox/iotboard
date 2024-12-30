<template>
  <NDropdown
    class="w-200px"
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
import { NDropdown, type SelectOption } from 'naive-ui';
import { useMimicDisplayStatus } from '@mimic/stores';
import * as _ from 'lodash-es';
import { displayBaseMapId } from '@mimic/constant';
import { doContextMenuAction } from './context-menu-action';
import { useContextShowHide } from '@mimic/hooks';
import { ContextMenuItem } from '@/components';

const { x, y, show, showMenu, hideMenu } = useContextShowHide();
const mimicDisplayStatus = useMimicDisplayStatus();

function onContextMenuClick(event: MouseEvent) {
  event.preventDefault();
  if (_.isArray(mimicDisplayStatus.selectedUiId)) {
    showMultiSelectContextMenu(event);
  } else if (mimicDisplayStatus.selectedUiId === displayBaseMapId) {
    showNoSelectContextMenu(event);
  } else if (!_.isEmpty(mimicDisplayStatus)) {
    /** 选中单个元素的右键菜单 */
    showMenu(event);
  }
}

/** 选中多个元素的右键菜单 */
function showMultiSelectContextMenu(event: MouseEvent) {
  // show.value = true;
  showMenu(event);
}
/** 什么都没选中的右键菜单 (底图右键) */
function showNoSelectContextMenu(event: MouseEvent) {
  // show.value = false;
  showMenu(event);
}

function clickContextMenuHandler(action: string) {
  doContextMenuAction(action);
  hideMenu();
}

const { contextMenuItemDisabled } = toRefs(mimicDisplayStatus);

const options = computed(() => {
  const result: SelectOption[] = [{
    label: () => h(ContextMenuItem, { label: '复制', hotkey: '⌘C' },),
    key: 'copy',
  }, {
    label: () => h(ContextMenuItem, { label: '粘贴', hotkey: '⌘V' },),
    key: 'paste',
  }, {
    label: () => h(ContextMenuItem, { label: '克隆', hotkey: '⇧⌘C' },),
    key: 'clone',
    show: false
  }, {
    label: () => h(ContextMenuItem, { label: '删除', hotkey: 'Delete' },),
    key: 'delete',
  }, {
    label: () => h(ContextMenuItem, { label: '锁定', hotkey: '⌘L' },),
    key: 'lock',
  }, {
    type: 'divider',
    key: 'd1',
  }, {
    label: '导出 png',
    key: 'png',
  }, {
    label: '导出 jpg',
    key: 'jpg'
  }, {
    type: 'divider',
    key: 'd2',
  }, {
    label: () => h(ContextMenuItem, { label: '移到顶层', hotkey: '⇧⌘↑' },),
    key: 'top',
  }, {
    label: () => h(ContextMenuItem, { label: '移到底层', hotkey: '⇧⌘↓' },),
    key: 'bottom'
  }, {
    label: () => h(ContextMenuItem, { label: '上移', hotkey: '⌘↑' },),
    key: 'up',
  }, {
    label: () => h(ContextMenuItem, { label: '下移', hotkey: '⌘↓' },),
    key: 'down',
  }, {
    type: 'divider',
    key: 'd3'
  }, {
    label: '组合',
    key: 'group'
  }, {
    label: '解散组合',
    key: 'ungroup'
  }, {
    type: 'divider',
    key: 'd4'
  }, {
    label: '复制样式',
    key: 'copyStyle'
  }, {
    label: '粘贴样式',
    key: 'pasteStyle'
  }];
  result.forEach(e => e.disabled = contextMenuItemDisabled.value[e.key as any]);
  return result;
});

defineExpose({
  onContextMenuClick,
});
</script>

<style scoped>
.red-txt {
  color: red;
}
</style>
