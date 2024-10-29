<template>
  <div class="h-full">
    <n-input type="text" round placeholder="搜索组件" size="small" @keydown.stop>
      <template #suffix>
        <n-icon :component="Search" />
      </template>
    </n-input>
    <n-collapse
      class="mt-10px"
      :default-expanded-names="_.keys(componentCategories)"
      display-directive="show"
    >
      <n-collapse-item v-for="nm of _.keys(groups)" :name="nm">
        <template #header>
          <div class="font-bold">
            {{ componentCategories[nm as CustomCategory] }}
          </div>
        </template>
        <MimicComponentItem v-for="c of groups[nm]" :custom-meta="c" />
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { NCollapse, NCollapseItem, NIcon, NInput } from 'naive-ui';
import { Search } from '@vicons/ionicons5';
import {
  componentCategories,
  customMetas,
  type CustomCategory,
  type CustomMeta,
} from '@mimic/utils';
import * as _ from 'lodash-es';
import MimicComponentItem from './MimicComponentItem.vue';

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
</script>

<style scoped></style>
