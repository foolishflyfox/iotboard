<template>
  <div class="h-full">
    <n-input type="text" round placeholder="搜索元素" size="small" @keydown.stop>
      <template #suffix>
        <n-icon :component="Search" />
      </template>
    </n-input>
    <n-collapse
      class="mt-10px"
      :default-expanded-names="_.keys(elementCategories)"
      display-directive="show"
    >
      <n-collapse-item v-for="nm of _.keys(elementCategories)" :name="nm">
        <template #header>
          <div class="font-bold">
            {{ elementCategories[nm].label }}
          </div>
        </template>
        <n-space>
          <ElementItem v-for="e of elementCategories[nm].elements" v-bind="e" />
        </n-space>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { NCollapse, NCollapseItem, NIcon, NInput, NSpace } from 'naive-ui';
import { Search } from '@vicons/ionicons5';
import * as _ from 'lodash-es';
import { elementCategories } from './elements';
import ElementItem from './ElementItem.vue';
</script>

<style scoped></style>
