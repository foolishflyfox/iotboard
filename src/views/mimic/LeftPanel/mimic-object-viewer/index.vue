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
      <template #2>
        <slot />
      </template>
    </n-split>
    <context-menu
      ref="contextMenuRef"
      :editorType
      @new-folder="
        v => {
          newFolderName = '';
          targetFolderPath = v;
          showNewFolderModal = true;
        }
      "
      @rename-folder="
        v => {
          newFolderName = '';
          targetFolderPath = v;
          showRenameFolderModal = true;
        }
      "
      @delete-folder="
        v => {
          targetFolderPath = v;
          showDeleteFolderModal = true;
        }
      "
      @new-code-component="v => emit('newCodeComponent', v)"
      @new-graph-component="v => emit('newGraphComponent', v)"
    />
    <!-- 新建文件夹对话框 -->
    <QueryDialog
      title="新建"
      v-model:show-modal="showNewFolderModal"
      :positive-btn-disabled="_.isEmpty(newFolderName)"
      @positive-click="emit('newFolder', targetFolderPath, newFolderName)"
    >
      <div class="flex-y-center">
        <div class="w-120px">文件夹名:</div>
        <n-input v-model:value="newFolderName" placeholder="请输入文件夹名" />
      </div>
    </QueryDialog>
    <!-- 重命名文件夹对话框 -->
    <QueryDialog
      title="重命名"
      v-model:showModal="showRenameFolderModal"
      :positive-btn-disabled="_.isEmpty(newFolderName)"
      @positive-click="emit('renameFolder', targetFolderPath, newFolderName)"
    >
      <div class="flex-y-center">
        <div class="w-120px">新文件夹名:</div>
        <n-input v-model:value="newFolderName" placeholder="请输入新文件夹名" />
      </div>
    </QueryDialog>
    <!-- 删除文件夹对话框 -->
    <QueryDialog
      title="删除"
      type="warning"
      v-model:showModal="showDeleteFolderModal"
      @positive-click="emit('deleteFolder', targetFolderPath)"
    >
      <div>删除文件夹【 {{ targetFolderPath }} 】?</div>
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
  name: 'MimicObjectTree',
});

const props = defineProps<{
  editorType: EditorType;
  fileTreeNodes: FileTreeNode[];
}>();

const emit = defineEmits<{
  newFolder: [folderPath: string, newFolderName: string];
  newCodeComponent: [folderPath: string];
  newGraphComponent: [folderPath: string];
  renameFolder: [folderPath: string, newFolderName: string];
  deleteFolder: [folderPath: string];
}>();

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

const data = computed(() => props.fileTreeNodes.map(e => convertToTreeOption(e)!));

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
const newFolderName = ref('');
const showNewFolderModal = ref(false);
const showRenameFolderModal = ref(false);
const showDeleteFolderModal = ref(false);
</script>

<style scoped></style>
