<template>
  <div class="h-full">
    <n-input
      type="text"
      round
      :placeholder="`搜索${editorTypeName[editorType]}`"
      size="small"
      @keydown.stop
    >
      <template #suffix>
        <n-icon :component="Search" />
      </template>
    </n-input>
    <n-split
      direction="vertical"
      :resize-trigger-size="2"
      :default-size="0.5"
      :min="0.4"
      :max="0.8"
    >
      <template #1>
        <div
          class="h-full"
          @contextmenu="
            e => {
              e.preventDefault();
              contextMenuRef?.onContextMenuClick(e);
            }
          "
        >
          <n-tree
            block-line
            :data="data"
            v-model:expanded-keys="expandedKeys"
            :renderPrefix
            :node-props="treeNodeProps"
          />
        </div>
      </template>
      <template #2> 组件显示 </template>
    </n-split>
    <context-menu ref="contextMenuRef" :editorType @new-folder="v => emit('newFolder', v)" />
    <!-- 重命名设置对话框 -->
    <QueryDialog
      title="重命名?"
      v-model:showModal="showRenameFolderModal"
      :positive-btn-disabled="_.isEmpty(newFolderName)"
      @positive-click="emit('renameFolder', targetFolderPath, newFolderName)"
    >
      <div class="flex-y-center">
        <div class="w-120px">新文件夹名:</div>
        <n-input v-model:value="newFolderName" placeholder="请输入新文件夹名" />
      </div>
    </QueryDialog>
  </div>
</template>

<script setup lang="ts">
import { NIcon, NInput, NSplit, NTree, type TreeOption } from 'naive-ui';
import { Search } from '@vicons/ionicons5';
import { Folder20Filled, FolderOpen20Filled } from '@vicons/fluent';
import { convertToTreeOption } from '@mimic/utils';
import { editorTypeName, type EditorType, type FileTreeNode } from '@mimic/types';
import * as _ from 'lodash-es';
import ContextMenu from './ContextMenu.vue';
import { QueryDialog } from '@/components';

defineOptions({
  name: 'MimicComponentTree',
});

const props = defineProps<{
  editorType: EditorType;
}>();

const emit = defineEmits<{
  newFolder: [folderPath: string];
  newCodeComponent: [folderPath: string];
  newGraphComponent: [folderPath: string];
  renameFolder: [folderPath: string, newFolderName: string];
  deleteFolder: [folderPath: string];
}>();

/** 后端返回的树 */
const fileTreeNodes: FileTreeNode[] = [
  {
    name: '基础',
    children: [],
  },
  {
    name: '工业',
    children: [
      {
        name: '仪表盘',
        children: [
          {
            name: 'gauge',
          },
        ],
      },
    ],
  },
];
const contextMenuRef = ref<InstanceType<typeof ContextMenu>>();
const treeNodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      console.log(`点击 ${props.editorType} 文件夹`);
    },
    onContextmenu(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      contextMenuRef.value?.onContextMenuClick(e, option);
    },
  };
};

const data = fileTreeNodes.map(e => convertToTreeOption(e)!);

const expandedKeys = ref<string[]>([]);

function renderPrefix({ option }: { option: TreeOption }) {
  const isOpen = expandedKeys.value.includes(option.key as string);
  return h(NIcon, {
    size: 22,
    color: isOpen ? '#71aef7' : '#e0ae40',
    component: isOpen ? FolderOpen20Filled : Folder20Filled,
  });
}

const targetFolderPath = ref('');
const showRenameFolderModal = ref(false);
const newFolderName = ref('');
</script>

<style scoped></style>
