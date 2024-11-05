<template>
  <div class="h-full">
    <n-input type="text" round placeholder="搜索组件" size="small" @keydown.stop>
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
              console.log('XXX');
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
    <context-menu ref="contextMenuRef" />
  </div>
</template>

<script setup lang="ts">
import { NIcon, NInput, NSplit, NTree, type TreeOption } from 'naive-ui';
import { Search } from '@vicons/ionicons5';
import { Folder20Filled, FolderOpen20Filled } from '@vicons/fluent';
import {
  componentCategories,
  convertToTreeOption,
  customMetas,
  type CustomMeta,
} from '@mimic/utils';
import { type FileTreeNode } from '@mimic/types';
import * as _ from 'lodash-es';
import ContextMenu from './ContextMenu.vue';

defineOptions({
  name: 'MimicComponentTree',
});

const groups: Record<string, CustomMeta[]> = {};
_.keys(componentCategories).forEach((k: string) => (groups[k] = []));
_.values(customMetas).forEach((c: CustomMeta) => {
  if (c.category in groups) {
    groups[c.category].push(c);
  } else {
    console.error(
      `组件 ${c.name}[${c.label}] 的类型 ${c.category} 未在 componentCategories 中定义`,
    );
  }
});

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
      console.log('点击组件文件夹');
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
</script>

<style scoped></style>
