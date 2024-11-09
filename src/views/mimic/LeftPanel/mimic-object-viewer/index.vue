<template>
  <!-- todo: 分析 65px 魔法数的原因 -->
  <div class="flex flex-col" style="height: calc(100vh - 65px)">
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
      class="flex-1"
      direction="vertical"
      :resize-trigger-size="2"
      :default-size="0.5"
      :min="0.4"
      :max="0.8"
    >
      <template #1>
        <div
          class="h-full overflow-auto"
          @contextmenu="
            e => {
              e.preventDefault();
              contextMenuRef?.onFileTreeContextMenuClick(e);
            }
          "
        >
          <n-tree
            v-if="isShowTree"
            block-line
            :data="data"
            v-model:expanded-keys="expandedKeys"
            v-model:selected-keys="selectedKeys"
            :renderPrefix
            :node-props="treeNodeProps"
          />
        </div>
      </template>
      <template #2>
        <div>
          <div class="bg-[#ccc] my-5px p-2px font-bold">文件夹: {{ selectedFolder }}</div>
          <slot />
        </div>
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
      @new-display="v => emit('newDisplay', v)"
      @new-module="v => emit('newModule', v)"
      @new-code-component="v => emit('newCodeComponent', v)"
      @new-graph-component="v => emit('newGraphComponent', v)"
    />
    <!-- 新建文件夹对话框 -->
    <QueryDialog
      title="新建"
      v-model:show-modal="showNewFolderModal"
      :positive-btn-disabled="_.isEmpty(newFolderName)"
      @positive-click="confirmCreateFolder(targetFolderPath, newFolderName)"
    >
      <div class="flex-y-center">
        <div class="w-120px">文件夹名:</div>
        <n-input
          v-model:value="newFolderName"
          placeholder="请输入文件夹名"
          ref="folderNameInputRef"
          @keydown.enter="confirmCreateFolder(targetFolderPath, newFolderName)"
        />
      </div>
    </QueryDialog>
    <!-- 重命名文件夹对话框 -->
    <QueryDialog
      title="重命名"
      v-model:showModal="showRenameFolderModal"
      :positive-btn-disabled="_.isEmpty(newFolderName)"
      @positive-click="confirmRenameFolder(targetFolderPath, newFolderName)"
    >
      <n-space vertical>
        <div class="flex-y-center">
          <div class="w-100px text-right pr-15px">原文件名:</div>
          <span class="px-3px">{{ path.basename(targetFolderPath) }}</span>
        </div>
        <div class="flex-y-center">
          <div class="w-100px text-right pr-15px">新文件夹名:</div>
          <n-input
            class="flex-1"
            v-model:value="newFolderName"
            placeholder="请输入新文件夹名"
            size="small"
            ref="folderRenameInputRef"
            @keydown.enter="confirmRenameFolder(targetFolderPath, newFolderName)"
          />
        </div>
      </n-space>
    </QueryDialog>
    <!-- 删除文件夹对话框 -->
    <QueryDialog
      title="删除"
      type="warning"
      v-model:showModal="showDeleteFolderModal"
      @positive-click="deleteFolder(targetFolderPath)"
    >
      <div>删除文件夹【 {{ targetFolderPath }} 】?</div>
    </QueryDialog>
  </div>
</template>

<script setup lang="ts">
import { NIcon, NInput, NSplit, NTree, NSpace, type TreeOption } from 'naive-ui';
import { Search } from '@vicons/ionicons5';
import { Folder20Filled, FolderOpen20Filled } from '@vicons/fluent';
import { convertToTreeOption } from '@mimic/utils';
import { editorTypeName, type EditorType, type FileTreeNode } from '@mimic/types';
import * as _ from 'lodash-es';
import ContextMenu from './ContextMenu.vue';
import { QueryDialog } from '@/components';
import path from 'path-browserify';
import { mimicFileApi } from '@/service/api';
import { findFileTreeNodeByPath } from './utils';

defineOptions({
  name: 'MimicObjectTree',
});

const props = defineProps<{
  editorType: EditorType;
}>();

/** 后端返回的树 */
const fileTreeNodes: Ref<FileTreeNode[]> = ref([]);

async function updateFileTreeNodes() {
  fileTreeNodes.value = await mimicFileApi.queryTree(props.editorType);
}

onMounted(() => {
  updateFileTreeNodes();
});

async function newFolder(targetDirPath: string, newFolderName: string) {
  await mimicFileApi.mkdir(props.editorType, targetDirPath, newFolderName);
  window.$message?.success(`创建 ${newFolderName} 成功`);
  await updateFileTreeNodes();
  openFolder(targetDirPath);
}

async function renameFolder(targetDirPath: string, newFolderName: string) {
  await mimicFileApi.renameDir(props.editorType, targetDirPath, newFolderName);
  window.$message?.success(`重命名为 ${newFolderName} 成功`);
  changeSelectFolder(path.join(path.dirname(targetDirPath), newFolderName), targetDirPath);
  await updateFileTreeNodes();
}

async function deleteFolder(targetDirPath) {
  await mimicFileApi.rmdir(props.editorType, targetDirPath);
  window.$message?.success(`删除 ${targetDirPath} 成功`);
  unselectFolder(targetDirPath);
  await updateFileTreeNodes();
  // 没有子文件夹的文件夹，如果是展开状态应该缩回去
  const parentDirPath = path.dirname(targetDirPath);
  if (parentDirPath !== '.') {
    const parentDir = findFileTreeNodeByPath(fileTreeNodes.value, parentDirPath);
    const subDirCnt = (parentDir?.children || []).filter(e => !e.name.endsWith('.json')).length;
    if (subDirCnt === 0) {
      _.remove(expandedKeys.value, k => k === parentDirPath);
    }
  }
}

const emit = defineEmits<{
  newDisplay: [folderPath: string];
  newModule: [folderPath: string];
  newCodeComponent: [folderPath: string];
  newGraphComponent: [folderPath: string];
  changeSelectedFolder: [folderPath: string | null];
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
      // selectedKeys.value = [option.key as string];
      contextMenuRef.value?.onFileTreeContextMenuClick(e, option, fileTreeNodes.value);
    },
  };
};

// isShowTree 变量主要为了删除 tree 组件，并重新渲染，否则存在 data 被更新了，但是 ui 没变化的bug
const isShowTree = ref(true);
const data = computed(() => {
  const r = fileTreeNodes.value.map(e => convertToTreeOption(e)!);
  isShowTree.value = false;
  nextTick(() => {
    isShowTree.value = true;
  });
  return r;
});

const expandedKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
const selectedFolder = computed(() => {
  if (_.isEmpty(selectedKeys.value)) return null;
  else return selectedKeys.value[0];
});

watch(selectedFolder, nv => {
  emit('changeSelectedFolder', nv);
});

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

const folderNameInputRef = ref<InstanceType<typeof NInput>>();
watchEffect(() => {
  if (showNewFolderModal.value) {
    folderNameInputRef.value?.focus();
  }
});
const folderRenameInputRef = ref<InstanceType<typeof NInput>>();
watchEffect(() => {
  if (showRenameFolderModal.value) {
    folderRenameInputRef.value?.focus();
  }
});

function confirmCreateFolder(targetFolderPath, newFolderName) {
  if (!_.isEmpty(newFolderName)) {
    newFolder(targetFolderPath, newFolderName);
    showNewFolderModal.value = false;
  }
}

function confirmRenameFolder(targetFolderPath, newFolderName) {
  if (!_.isEmpty(newFolderName)) {
    renameFolder(targetFolderPath, newFolderName);
    showRenameFolderModal.value = false;
  }
}
function openFolder(folderPath: string) {
  if (!expandedKeys.value.includes(folderPath)) {
    expandedKeys.value.push(folderPath);
  }
}
function changeSelectFolder(newSelectFolderPath: string, oldSelectFolderPath?: string) {
  if (oldSelectFolderPath) {
    // 当前选中需要与 oldSelectFolderPath 相同
    if (!selectedKeys.value.includes(oldSelectFolderPath)) {
      return;
    }
  }
  selectedKeys.value = [newSelectFolderPath];
}
function unselectFolder(folderPath: string) {
  if (selectedKeys.value.includes(folderPath)) {
    selectedKeys.value = [];
  }
}
</script>

<style scoped></style>
