<template>
  <n-dropdown
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
import { NDropdown, type TreeOption } from 'naive-ui';
import * as _ from 'lodash-es';
import { useContextShowHide } from '@mimic/hooks';
import type { EditorType, FileTreeNode } from '@mimic/types';
import { findFileTreeNodeByPath } from './utils';

const props = defineProps<{
  editorType: EditorType;
}>();

const { x, y, show, showMenu, hideMenu } = useContextShowHide();
const targetDirDeleteDisabled = ref(false);
const targetDirPath = ref('');

function onFileTreeContextMenuClick(
  event: MouseEvent,
  treeOption?: TreeOption,
  fileTreeNodes?: FileTreeNode[],
) {
  if (treeOption && fileTreeNodes) {
    const treeNode = findFileTreeNodeByPath(fileTreeNodes, treeOption.key as string);
    targetDirDeleteDisabled.value = Boolean(treeNode?.children?.length);
    console.log('option =', treeOption);
    console.log('fileTreeNodes =', fileTreeNodes);
    targetDirPath.value = treeOption.key as string;
  } else {
    targetDirPath.value = '';
  }
  showMenu(event);
}

const emit = defineEmits<{
  newFolder: [folderPath: string];
  newDisplay: [folderPath: string];
  newModule: [folderPath: string];
  newCodeComponent: [folderPath: string];
  newGraphComponent: [folderPath: string];
  renameFolder: [folderPath: string];
  deleteFolder: [folderPath: string];
}>();

function newFolder() {
  emit('newFolder', targetDirPath.value);
}

function newDisplay() {
  emit('newDisplay', targetDirPath.value);
}

function newModule() {
  emit('newModule', targetDirPath.value);
}

function newCodeComponent() {
  emit('newCodeComponent', targetDirPath.value);
}

function newGraphComponent() {
  emit('newGraphComponent', targetDirPath.value);
}

function renameFolderClick() {
  emit('renameFolder', targetDirPath.value);
}

function deleteFolder() {
  emit('deleteFolder', targetDirPath.value);
}

const actionHandlers = {
  newFolder,
  newDisplay,
  newModule,
  newCodeComponent,
  newGraphComponent,
  renameFolder: renameFolderClick,
  deleteFolder,
};

function clickContextMenuHandler(action: string) {
  hideMenu();
  const actionHandler = actionHandlers[action];
  if (!actionHandler) console.error(`没有 ${action} 的处理函数`);
  else actionHandler();
}

const options = computed(() => [
  {
    label: '新建',
    key: 'new',
    children: [
      {
        label: '文件夹',
        key: 'newFolder',
      },
      {
        label: '图纸',
        key: 'newDisplay',
        show: props.editorType === 'display',
      },
      {
        label: '模块',
        key: 'newModule',
        show: props.editorType === 'module',
      },
      {
        label: '代码组件',
        key: 'newCodeComponent',
        show: props.editorType === 'component',
      },
      {
        label: '图形组件',
        key: 'newGraphComponent',
        show: props.editorType === 'component',
      },
    ],
  },
  {
    label: () => h('div', { style: { color: 'red' } }, '删除'),
    key: 'deleteFolder',
    disabled: targetDirDeleteDisabled.value,
    show: targetDirPath.value !== '',
  },
  {
    label: '重命名',
    key: 'renameFolder',
    show: targetDirPath.value !== '',
  },
]);

defineExpose({
  onFileTreeContextMenuClick,
});
</script>

<style scoped>
.red-txt {
  color: red;
}
</style>
