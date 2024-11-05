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
  <QueryDialog
    title="重命名?"
    v-model:showModal="showRenameFolderModal"
    :positive-btn-disabled="_.isEmpty(newFolderName)"
    @positive-click="renameFolder"
  >
    <div class="flex-y-center">
      <div class="w-120px">新文件夹名:</div>
      <n-input v-model:value="newFolderName" placeholder="请输入新文件夹名" />
    </div>
  </QueryDialog>
</template>

<script setup lang="ts">
import { NDropdown, NInput, NSpace, type TreeOption } from 'naive-ui';
import * as _ from 'lodash-es';
import { useContextShowHide } from '@mimic/hooks';
import { QueryDialog } from '@/components';

const { x, y, show, showMenu, hideMenu } = useContextShowHide();
const targetDirDeleteDisabled = ref(false);
const targetDirPath = ref('');

function onContextMenuClick(event: MouseEvent, treeOption?: TreeOption) {
  if (treeOption) {
    targetDirDeleteDisabled.value = Boolean(treeOption.children?.length);
    console.log('option =', treeOption);
    targetDirPath.value = treeOption.key as string;
  } else {
    targetDirPath.value = '';
  }
  showMenu(event);
}

function newFolder() {
  if (targetDirPath.value === '') {
    console.log(`根目录下新建文件夹`);
  } else {
    console.log(`${targetDirPath.value}目录下新建文件夹`);
  }
}

function newCodeComponent() {
  console.log('新建代码组件');
}

function newGraphComponent() {
  console.log('新建图形组件');
}

const newFolderName = ref('');
const showRenameFolderModal = ref(false);
function renameFolderClick() {
  newFolderName.value = '';
  showRenameFolderModal.value = true;
}
function renameFolder() {
  console.log('向后端发送重命名文件夹请求:', newFolderName.value);
}

function deleteFolder() {
  window.$dialog?.info({
    title: '删除?',
    content: `确认删除文件夹【 ${targetDirPath.value} 】`,
    positiveText: '确认',
    negativeText: '取消',
    maskClosable: false,
    async onPositiveClick() {
      console.log('删除文件夹', targetDirPath.value);
    },
  });
}

const actionHandlers = {
  newFolder,
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
        label: '代码组件',
        key: 'newCodeComponent',
      },
      {
        label: '图形组件',
        key: 'newGraphComponent',
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
  onContextMenuClick,
});
</script>

<style scoped>
.red-txt {
  color: red;
}
</style>
