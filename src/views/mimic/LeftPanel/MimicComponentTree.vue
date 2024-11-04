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
        <n-tree block-line :data="data" v-model:expanded-keys="expandedKeys" :renderPrefix />
      </template>
      <template #2> 组件显示 </template>
    </n-split>
  </div>
</template>

<script setup lang="ts">
import { NIcon, NInput, NSplit, NTree, type TreeOption } from 'naive-ui';
import { Search } from '@vicons/ionicons5';
import { Folder20Filled, FolderOpen20Filled } from '@vicons/fluent';
import { componentCategories, customMetas, type CustomMeta } from '@mimic/utils';
import * as _ from 'lodash-es';

const groups: Record<string, CustomMeta[]> = {};
_.keys(componentCategories).forEach(k => (groups[k] = []));
_.values(customMetas).forEach(c => {
  if (c.category in groups) {
    groups[c.category].push(c);
  } else {
    console.error(
      `组件 ${c.name}[${c.label}] 的类型 ${c.category} 未在 componentCategories 中定义`,
    );
  }
});

const data = [
  {
    label: '基础',
    key: 'base',
    children: [],
  },
  {
    label: '工业',
    key: 'industry',
    children: [
      {
        label: '仪表',
        key: 'meter',
        children: [],
      },
    ],
  },
];

const expandedKeys = ref<string[]>(['base', 'industry']);

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
